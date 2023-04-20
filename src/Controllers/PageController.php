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
        $cacheHelper = new CacheHelper($this->nacho);
        $cache = $cacheHelper->read();
        if (!$cache) {
            $cacheHelper->build();
            $cache = $cacheHelper->read();
        }
        $content = $cache->getContent();

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
