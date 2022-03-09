<?php

namespace App\Controllers;

use DateTime;
use App\Helpers\ImageHelper;
use App\Helpers\NavRenderer;
use App\Helpers\TokenHelper;
use Nacho\Controllers\AbstractController;
use Nacho\Nacho;

class AdminController extends AbstractController
{
    public function __construct(Nacho $nacho)
    {
        parent::__construct($nacho);
        // if (!$this->isGranted('Editor')) {
        //     header('Http/1.1 302');
        //     header('Location: /login?required_page=' . $_SERVER['REDIRECT_URL']);
        //     die();
        // }
    }

    /**
     * GET:  fetch the markdown for a file
     * POST: save edited file
     */
    function edit($request)
    {
        if (!key_exists('token', $_REQUEST)) {
            return $this->json(['message' => 'You need to be authenticated'], 401);
        }
        $tokenHelper = new TokenHelper();
        $token = $_REQUEST['token'];
        $user = $tokenHelper->isTokenValid($token, $this->nacho->getUserHandler()->getUsers());
        if (!$user) {
            return $this->json(['message' => 'The provided Token is invalid'], 401);
        }
        $strPage = $_REQUEST['entry'];
        $page = $this->nacho->getPage($strPage);

        if (!$page || !is_file($page['file'])) {
            return $this->json(['message' => 'Unable to find this file']);
        }

        if (strtolower($request->requestMethod) === 'post') {
            file_put_contents($page['file'], $this->nacho->createMetaString($page['meta']) . $_REQUEST['content']);

            return $this->json(['message' => 'successfully saved content', 'file' => $page['file']]);
        }

        return $this->json($page);
    }

    public function delete($request)
    {
        if (key_exists('file', $_REQUEST)) {
            $file = $_REQUEST['file'];
        } elseif (key_exists('dir', $_REQUEST)) {
            $file = $_REQUEST['dir'];
        } else {
        //    returnHome();
        }
        if (
            substr($file, 0, strlen($_SERVER['DOCUMENT_ROOT'])) !==
            $_SERVER['DOCUMENT_ROOT']
        ) {
         //   returnHome();
        }

        function rmdirRecursive($dir)
        {
            foreach (scandir($dir) as $sub) {
                if ($sub !== '.' && $sub !== '..') {
                    $newDir = $dir . '/' . $sub;
                    if (is_file($newDir)) {
                        echo "deleting ${dir}<br>";
                        unlink($newDir);
                    } elseif (is_dir($newDir)) {
                        rmdirRecursive($newDir);
                    }
                }
            }
            rmdir($dir);
        }

        if (is_file($file)) {
            echo "deleting ${file}<br>";
            unlink($file);
        } elseif (is_dir($file)) {
            rmdirRecursive($file);
        }
        //returnHome();
    }

    public function uploadOriginal($request)
    {
        if (strtoupper($request->requestMethod) !== 'POST') {
            return $this->json(['only post allowed'], 405);
        }
        $imagesDir = $request->documentRoot . '/images/home';
        $month = $_REQUEST['month'];
        $original = $_FILES['original'];
        $key = array_search($month, MONTHS);

        $imageHelper = new ImageHelper();
        $imageHelper->compressImage($original['tmp_name'], 1000, "${imagesDir}/${key}_${month}", 'tmp.original.jpg');

        return $this->json(['file' => "/images/home/${key}_${month}/tmp.original.jpg"]);
    }

    public function editCurrent($request)
    {
        $file = $this->getCurrentFile();

        return $this->json(['entryId' => rtrim($file, '.md')]);
    }

    public function publishStatus($request)
    {
        if (strtoupper($request->requestMethod) !== 'POST') {
            return $this->json(['post requests only'], 405);
        }
        $contentDir = $_SERVER['DOCUMENT_ROOT'] . '/content';
        $fileName = $this->getCurrentFile();

        $content = file_get_contents("${contentDir}/${fileName}");

        $content .= $_REQUEST['status'] . "\n\n";
        file_put_contents("${contentDir}/${fileName}", $content);

        return $this->json(['message' => 'Successfully added status']);
    }

    public function appendImage($request)
    {
        if (strtoupper($request->requestMethod) !== 'POST') {
            return $this->json(['post requests only'], 405);
        }

        $image = $_FILES['image'];
        $imageHelper = new ImageHelper();
        $generated = $imageHelper->storeEntryImage($image['tmp_name']);

        $contentDir = $_SERVER['DOCUMENT_ROOT'] . '/content';
        $file = $this->getCurrentFile();
        $content = file_get_contents("${contentDir}${file}");
        $content .= "![image](" . $generated[1] . ")\n\n";
        file_put_contents("${contentDir}${file}", $content);

        return $this->json(['message' => 'Successfully appended Image']);
    }

    private function getCurrentFile()
    {
        // get name of current file
        $now = new \DateTime();
        $title = $now->format('Y-m-d') . '.md';
        $month = $now->format('F');
        $folderDir = $_SERVER['DOCUMENT_ROOT'] . "/content/${month}";
        $fileDir = "${folderDir}/${title}";
        // check if file exists, if not create it
        $content =
            "---\ntitle: " .
            rtrim($title, '.md') .
            "\ndate: " .
            $now->format('Y-m-d H:i') .
            "\n---\n";
        if (!is_dir($folderDir)) {
            mkdir($folderDir);
        }
        if (!is_file($fileDir)) {
            file_put_contents($fileDir, $content);
        }

        return "/${month}/${title}";
    }
}
