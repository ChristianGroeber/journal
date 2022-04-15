<?php

namespace App\Controllers;

use Nacho\Controllers\AbstractController;
use App\Helpers\TokenHelper;

class AuthenticationController extends AbstractController
{
    public function login($request)
    {
        $tokenHelper = new TokenHelper();
        $username = $_REQUEST['username'];
        if (strtolower($request->requestMethod) === 'post') {
            $user = $this->nacho->userHandler->findUser($username);
            if ($user && password_verify($_REQUEST['password'], $user['password'])) {
                $token = $tokenHelper->getToken($username);
                return $this->json(['token' => $token]);
            } else {
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
}
