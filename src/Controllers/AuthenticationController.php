<?php

namespace App\Controllers;

use Nacho\Controllers\AbstractController;
use App\Helpers\TokenHelper;
use Nacho\Exceptions\UserDoesNotExistException;

class AuthenticationController extends AbstractController
{
    public function login($request)
    {
        $tokenHelper = new TokenHelper();
        $username = $_REQUEST['username'];
        $password = $_REQUEST['password'];
        if (strtolower($request->requestMethod) === 'post') {
            try {
                if ($this->nacho->userHandler->passwordVerify($username, $password)) {
                    $token = $tokenHelper->getToken($username);
                    return $this->json(['token' => $token]);
                } else {
                    return $this->json(['message' => 'This password/ username is not valid'], 400);
                }
            } catch (UserDoesNotExistException $e) {
                return $this->json(['message' => 'This password/ username is not valid'], 400);
            }
        }

        return $this->json([], 405);
    }

    public function validateToken()
    {
        $tokenHelper = new TokenHelper();
        $isValid = $tokenHelper->isTokenValid($_REQUEST['token'], $this->nacho->userHandler->getUsers());

        return $this->json(['success' => $isValid !== false]);
    }

    public function requestNewPassword($request)
    {
        if (strtolower($request->requestMethod) !== 'post') {
            return $this->json([], 405);
        }
        $username = $_REQUEST['username'];
        $resetLink = md5(random_bytes(100));
        $user = $this->nacho->userHandler->findUser($username);

        if (!$user) {
            return $this->json([], 400);
        }

        $this->nacho->userHandler->modifyUser($username, 'resetLink', $resetLink);

        $message = "Click <a href='" . $_SERVER['SERVER_NAME'] . '/auth/restore-password?token=' . $resetLink . "'>here</a> to set a new Password";

        $success = mail($user['email'], 'Reset Password', $message);

        return $this->json(['success' => $success]);
    }

    public function restorePassword($request)
    {
        if (strtolower($request->requestMethod) !== 'post') {
            return $this->json([], 405);
        }

        $username = $_REQUEST['username'];
        $token = $_REQUEST['token'];
        $password1 = $_REQUEST['password1'];
        $password2 = $_REQUEST['password2'];

        $user = $this->nacho->userHandler->findUser($username);

        if ($password1 !== $password2 || !$user || $token !== $user['resetLink'] || $user['resetLink'] === '') {
            return $this->json([], 400);
        }

        $user = $this->nacho->userHandler->setPassword($username, $password1);
        $tokenHelper = new TokenHelper();

        $token = $tokenHelper->generateToken($username);

        $this->nacho->userHandler->modifyUser($username, 'resetLink', '');

        return $this->json(['token' => $token]);
    }

    public function generateNewToken($request)
    {
        if (strtolower($request->requestMethod) !== 'post') {
            return $this->json([], 405);
        }
        $username = $_REQUEST['username'];
        $token = $_REQUEST['token'];
        if (!$username || !$token) {
            return $this->json(['message' => 'Define Token and Username'], 400);
        }
        $tokenHelper = new TokenHelper();
        if (!$tokenHelper->isTokenValid($token, $this->nacho->userHandler->getUsers())) {
            return $this->json([], 400);
        }

        $newToken = $tokenHelper->generateToken($username);

        return $this->json(['token' => $newToken]);
    }

    public function changePassword($request)
    {
        if (strtolower($request->requestMethod) !== 'post') {
            return $this->json([], 405);
        }

        $user = $this->nacho->userHandler->findUser($_REQUEST['username']);

        if (!password_verify($_REQUEST['currentPassword'], $user['password'])) {
            return $this->json(['message' => 'Invalid Password'], 400);
        }

        if ($_REQUEST['newPassword1'] !== $_REQUEST['newPassword2']) {
            return $this->json(['message' => 'The Passwords have to match'], 400);
        } else {
            $this->nacho->userHandler->changePassword($user['username'], $_REQUEST['currentPassword'], $_REQUEST['newPassword1']);
        }

        $tokenHelper = new TokenHelper();
        $newToken = $tokenHelper->generateToken($user['username']);
        
        return $this->json(['token' => $newToken]);
    }

    public function adminCreated()
    {
        return $this->json(['adminCreated' => is_file(FILE_PATH)]);
    }

    public function createAdmin()
    {
        if (is_file(FILE_PATH)) {
            return $this->json(['message' => 'The users file already exists'], 400);
        }
        $username = $_REQUEST['username'];
        $password = $_REQUEST['password'];

        $user = [
            "username" => $username,
            "role" => "Editor",
            "password" => "",
        ];
        $guest = [
            "username" => "Guest",
            "role" => "Guest",
            "password" => "",
        ];

        file_put_contents(FILE_PATH, json_encode([$user, $guest]));

        $this->nacho->userHandler->setPassword($username, $password);

        return $this->json(['adminCreated' => true]);
    }
}
