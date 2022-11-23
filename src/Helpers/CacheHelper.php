<?php

namespace App\Helpers;

use Nacho\Helpers\DataHandler;
use Nacho\Nacho;

class CacheHelper
{
    private Nacho $nacho;

    public function __construct($nacho) {
        $this->nacho = $nacho;
    }

    public function build(): void
    {
        $content = $this->renderContent();
        $renderDate = date('Y-m-d H:i:s', time());
        DataHandler::getInstance()->writeData('cache', ['renderDate' => $renderDate, 'content' => $content]);
    }

    public function read(): array
    {
        return DataHandler::getInstance()->readData('cache');
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
            if (!$page->raw_content && !key_exists('raceReport', (array) $page->meta)) {
                continue;
            }
            $page->content = $this->nacho->getMarkdownHelper()->renderPage($page);
            $months[$month]['days'][] = $page;
        }

        return $months;
    }

    private function sortByDate($a, $b): int
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
}
