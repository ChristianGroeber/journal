<?php

namespace App\Controllers;

use App\Helpers\JournalConfiguration;
use App\Helpers\TokenHelper;
use Nacho\Controllers\AbstractController;

class InitController extends AbstractController
{
    const NO_TOKEN_SET = 'no_token_set';
    const TOKEN_VALID = 'token_valid';
    const TOKEN_INVALID = 'token_invalid';

    public function init(): string
    {
        $isTokenValid = $this->isTokenValid();

        $year = JournalConfiguration::year();

        return $this->json(['is_token_valid' => $isTokenValid, 'year' => $year]);
    }

    private function isTokenValid(): string
    {
        if (!key_exists('token', $_REQUEST)) {
            return self::NO_TOKEN_SET;
        }

        $tokenHelper = new TokenHelper();

        $users = $this->nacho->userHandler->getUsers();

        if ($tokenHelper->isTokenValid($_REQUEST['token'], $users)) {
            return self::TOKEN_VALID;
        }

        return self::TOKEN_INVALID;
    }
}