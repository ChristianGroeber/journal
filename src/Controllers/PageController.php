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
        $directory = $_SERVER['DOCUMENT_ROOT'] . '/content';
        $tmp = scandir($directory);
        $pages = [];
        foreach ($tmp as $subPage) {
            if (endswith($subPage, '.gitignore')) {
                continue;
            }
            if (!is_file($directory . '/' . $subPage)) {
                continue;
            }

            $pageDir = '/' . rtrim($subPage, '.md');
            $nachoPage = $this->nacho->getPage($pageDir);

            if (is_bool($nachoPage)) {
                header('HTTP/1.1 404');
                return $this->json(['message' => 'Unable to find This page']);
            }

            $nachoPage['content'] = base64_encode($this->nacho->renderPage($nachoPage));
            array_push($pages, $nachoPage);
        }

        usort($pages, [$this, 'sortByDate']);

        return $this->json($pages);
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
