<?php

namespace App\Controller;

class JournalFrontendController
{
    public function index(): string
    {
        return file_get_contents('dist/index.html');
    }
}