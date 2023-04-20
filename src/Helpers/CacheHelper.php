<?php

namespace App\Helpers;

use Nacho\Models\PicoPage;
use Nacho\Nacho;

class CacheHelper
{
    private Nacho $nacho;

    public function __construct($nacho) {
        $this->nacho = $nacho;
    }

    public function build(): string
    {
        $content = $this->renderContent();
        $renderDate = date('Y-m-d H:i:s', time());
        $fileName = $_SERVER['DOCUMENT_ROOT'] . '/cache/content.json';
        file_put_contents($fileName, json_encode(['renderDate' => $renderDate, 'content' => $content]));

        return $fileName;
    }

    private function renderContent(): array
    {
        $this->nacho->getMarkdownHelper()->readPages();
        $pages = $this->nacho->getMarkdownHelper()->getPages();
        usort($pages, [$this, 'sortByDate']);
        $months = [];
        foreach ($pages as $page) {
            $month = explode('/', $page->id)[1];
            if (!key_exists($month, $months)) {
                $months[$month] = [
                    'name' => $month,
                    'days' => [],
                ];
            }
            if ($this->isEmptyContent($page)) {
                continue;
            }
            $page->content = $this->nacho->getMarkdownHelper()->renderPage($page);
            $months[$month]['days'][] = $page;
        }

        return $months;
    }

    private function sortByDate(PicoPage $a, PicoPage $b): int
    {
        if (is_int(array_search($a->meta->title, MONTHS))) {
            return -1;
        }
        if (is_int(array_search($b->meta->title, MONTHS))) {
            return 1;
        }
        $t1 = strtotime($a->meta->title);
        $t2 = strtotime($b->meta->title);

        return $t2 - $t1;
    }

    private function isEmptyContent(PicoPage $page): bool
    {
        return !$page->raw_content && !key_exists('raceReport', (array) $page->meta);
    }
}
