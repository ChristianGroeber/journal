<?php

namespace App\Controller;

use Nacho\Models\HttpResponse;

class JournalFrontendController
{
    public function index(): HttpResponse
    {
        return new HttpResponse(file_get_contents('dist/index.html'));
    }

    public function info(): HttpResponse
    {
        return new HttpResponse(phpinfo());
    }
}