<?php

namespace App\Helpers;

use Nacho\Security\JsonUserHandler;
use Nacho\Security\UserHandlerInterface;

class TokenHelper 
{
    private UserHandlerInterface $userHandler;

    public function __construct()
    {
        $this->userHandler = new JsonUserHandler();
    }

    function getToken($username)
    {
        $secret = $this->getSecret();

        return md5($username . $this->userHandler->findUser($username)['tokenStamp'] . $secret);
    }

    function isTokenValid($token, $users)
    {
        foreach ($users as $user) {
            if ($token === $this->getToken($user['username'])) {
                return $user;
            }
        }
        
        return false;
    }

    // Generate a fresh token
    public function generateToken($username)
    {
        $tokenStamp = time();
        $this->userHandler->modifyUser($username, 'tokenStamp', $tokenStamp);

        return $this->getToken($username);
    }

    private function getSecret()
    {
        return file_get_contents('.secret');
    }
}