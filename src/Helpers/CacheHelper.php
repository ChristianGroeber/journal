<?php

namespace App\Helpers;

use Nacho\Nacho;

class CacheHelper
{
    private Nacho $nacho;

    public function __construct($nacho) {
        $this->nacho = $nacho;
    }

    public function build()
    {
        $content = $this->renderContent();
        $renderDate = date('Y-m-d H:i:s', time());
        $fileName = $_SERVER['DOCUMENT_ROOT'] . '/cache/content.json';
        file_put_contents($fileName, json_encode(['renderDate' => $renderDate, 'content' => $content]));

        return $fileName;
    }

    private function renderContent()
    {
        $this->nacho->readPages();
        $pages = $this->nacho->getPages();
        usort($pages, [$this, 'sortByDate']);
        $months = [];
        foreach ($pages as $page) {
            $month = explode('/', $page['id'])[1];
            if (!key_exists($month, $months)) {
                $months[$month] = [
                    'name' => $month,
                    'days' => [],
                ];
            }
            if (!$page['raw_content']) {
                continue;
            }
            $page['content'] = $this->nacho->renderPage($page);
            array_push($months[$month]['days'], $page);
        }

        return $months;
    }

    private function sortByDate($a, $b)
    {
        if (is_int(array_search($a['meta']['title'], MONTHS))) {
            return -1;
        }
        if (is_int(array_search($b['meta']['title'], MONTHS))) {
            return 1;
        }
        $t1 = strtotime($a['meta']['title']);
        $t2 = strtotime($b['meta']['title']);

        return $t2 - $t1;
    }
}
