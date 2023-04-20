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
            $content = $this->reverseEntries($content);
        }

        return $this->json($content);
    }

    private function reverseEntries(array $content): array
    {
        return array_reverse(array_map(function(array $month) {
            $month['days'] = array_reverse($month['days']);
            return $month;
        }, $content));
    }

    private function journalIsCurrentYear(): bool
    {
        $journalYear = 2022;
        $now = new \DateTime();
        $currentYear = intval($now->format('Y'));

        return $journalYear === $currentYear;
    }
}
