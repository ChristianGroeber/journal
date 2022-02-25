<?php

namespace App\Controllers;

use Nacho\Controllers\AbstractController;
use App\Helpers\TokenHelper;

class AuthenticationController extends AbstractController
{
    public function login($request)
    {
        $tokenHelper = new TokenHelper();
        $message = '';
        $status = 200;
        if (strtolower($request->requestMethod) === 'post') {
            $isValid = false;
            $foundUser = null;
            foreach ($this->nacho->userHandler->getUsers() as $user) {
                if (
                    $user['username'] === $_REQUEST['username'] &&
                    password_verify($_REQUEST['password'], $user['password'])
                ) {
                    $isValid = true;
                    $foundUser = $user;
                    break;
                }
            }

            if (!$isValid) {
                $message = 'This password/ username is not valid';
                $status = 400;
            } else {
                $token = $tokenHelper->generateToken($foundUser['username']);
                return $this->json(['token' => $token]);
            }
        }

        return $this->json([
            'message' => $message,
        ], $status);
    }

    public function validateToken()
    {
        $tokenHelper = new TokenHelper();
        $isValid = $tokenHelper->isTokenValid($_REQUEST['token'], $this->nacho->userHandler->getUsers());

        return $this->json(['success' => $isValid !== false]);
    }

    /**
     * TODO: update to use with API
     */
    public function changePassword($request)
    {
        if (!$this->isGranted('Reader')) {
            header('HTTP/1.0 401');
            return 'you need to be signed in to access this page';
        }
        $message = '';

        if (strtoupper($request->requestMethod) === 'POST') {
            if ($_REQUEST['newPassword'] !== $_REQUEST['repeatPassword']) {
                $message = 'The Passwords have to match';
            } else {
                $this->nacho->userHandler->changePassword($_REQUEST['oldPassword'], $_REQUEST['newPassword']);
                $retRoute = $request->httpReferer;
                if (!$retRoute) {
                    $retRoute = '/';
                }

                return $this->redirect($retRoute);
            }
        }

        return $this->render('security/change-password.twig', [
            'referer' => $_SERVER['HTTP_REFERER'],
            'message' => $message,
        ]);
    }
}
