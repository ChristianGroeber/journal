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

        if (!$this->journalIsCurrentYear()) {
            $content = array_reverse($content);
        }

        return $this->json($content);
    }

    private function journalIsCurrentYear(): bool
    {
        $journalYear = 2022;
        $now = new \DateTime();
        $currentYear = intval($now->format('Y'));

        return $journalYear === $currentYear;
    }
}
