<?php

namespace App\Helpers;

class SecretHelper
{
    public function getSecret()
    {
        if (is_file('.secret')) {
            return file_get_contents('.secret');
        }
        
        $secretVar = getenv('SECRET');

        if (!$secretVar) {
            throw new \Exception('SECRET is not defined');
        }

        return $secretVar;
    }
}