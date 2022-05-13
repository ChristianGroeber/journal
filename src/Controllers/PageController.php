<?php

namespace App\Controllers;

use App\Helpers\CacheHelper;
use Nacho\Controllers\AbstractController;

/**
 * Class PageController
 */
class PageController extends AbstractController
{
    public function index()
    {
        $cacheFile = $_SERVER['DOCUMENT_ROOT'] . '/cache/content.json';
        if (!is_file($cacheFile)) {
            $cacheHelper = new CacheHelper($this->nacho);
            $cacheHelper->build();
        }
        $content = json_decode(file_get_contents($cacheFile), true)['content'];

        return $this->json($content);
    }
}
