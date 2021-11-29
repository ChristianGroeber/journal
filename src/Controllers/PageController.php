<?php


namespace App\Controllers;

use Nacho\Controllers\AbstractController;

/**
 * Class PageController
 */
class PageController extends AbstractController
{
    public function index()
    {
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
            $page['content'] = base64_encode($this->nacho->renderPage($page));
            array_push($months[$month]['days'], $page);
        }

        return $this->json($months);
    }

    public function sortByDate($a, $b)
    {
        if (is_int(array_search($a['title'], MONTHS))) {
            return -1;
        }
        if (is_int(array_search($b['title'], MONTHS))) {
            return 1;
        }
        $t1 = strtotime($a['title']);
        $t2 = strtotime($b['title']);

        return $t2 - $t1;
    }
}
