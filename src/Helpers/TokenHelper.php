<?php

namespace App\Helpers;

class TokenHelper 
{
    function generateToken($username)
    {
        $secret = $this->getSecret();

        return md5($username . $secret);
    }

    function isTokenValid($token, $users)
    {
        foreach ($users as $user) {
            if ($token === $this->generateToken($user['username'])) {
                return $user;
            }
        }
        
        return false;
    }

    private function getSecret()
    {
        return file_get_contents('.secret');
    }
}