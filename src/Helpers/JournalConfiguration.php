<?php

namespace App\Helpers;

class JournalConfiguration
{
    public static function mediaDir(): string
    {
        return $_SERVER['DOCUMENT_ROOT'] . self::mediaBaseUrl();
    }

    public static function mediaBaseUrl(): string
    {
        return DIRECTORY_SEPARATOR . 'media';
    }
}