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
        $secret = self::getSecret();

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
        $tokenStamp = md5(random_bytes(100));
        $this->userHandler->modifyUser($username, 'tokenStamp', $tokenStamp);

        return $this->getToken($username);
    }

    public static function getSecret()
    {
        $secretHelper = new SecretHelper();
        return $secretHelper->getSecret();
    }
}