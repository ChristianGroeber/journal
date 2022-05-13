<?php

namespace App\Controllers;

use DateTime;
use App\Helpers\ImageHelper;
use App\Helpers\NavRenderer;
use App\Helpers\TokenHelper;
use App\Helpers\BackupHelper;
use App\Helpers\CacheHelper;
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
            file_put_contents($page['file'], $this->nacho->createMetaString($page['meta']) . base64_decode($_REQUEST['content']));
            $cacheHelper = new CacheHelper($this->nacho);
            $cacheHelper->build();

            return $this->json(['message' => 'successfully saved content', 'file' => $page['file']]);
        }

        return $this->json($page);
    }

    function createSpecific()
    {
        $dateFile = $_REQUEST['entry'];
        $entryId = $this->createFileIfNotExists(new DateTime($dateFile));
        return $this->json(['entryId' => $entryId]);
    }

    public function delete($request)
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
        if (!key_exists('entry', $_GET)) {
            return $this->json($_GET, 400);
        }

        $file = $_SERVER['DOCUMENT_ROOT'] . '/content' . $_GET['entry'] . '.md';

        if (is_file($file)) {
            unlink($file);
        } else {
            return $this->json(['file' => $file], 404);
        }

        return $this->json(['message' => "successfully deleted ${file}"]);
    }

    public function buildCache()
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
        $cacheHelper = new CacheHelper($this->nacho);
        $file = $cacheHelper->build();
        return $this->json(['file' => $file]);
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

    public function generateBackup()
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

        $backupHelper = new BackupHelper();
        $zip = $backupHelper->generateBackup();

        return $this->json(['file' => $zip]);
    }

    private function getCurrentFile()
    {
        $now = new \DateTime();
        return $this->createFileIfNotExists($now);
    }

    private function createFileIfNotExists(DateTime $dateEntry)
    {
        $title = $dateEntry->format('Y-m-d') . '.md';
        $month = $dateEntry->format('F');
        $folderDir = $_SERVER['DOCUMENT_ROOT'] . "/content/${month}";
        $fileDir = "${folderDir}/${title}";
        // check if file exists, if not create it
        $content =
            "---\ntitle: " .
            rtrim($title, '.md') .
            "\ndate: " .
            $dateEntry->format('Y-m-d H:i') .
            "\n---\n";
        if (!is_dir($folderDir)) {
            mkdir($folderDir);
        }
        if (!is_file($fileDir)) {
            file_put_contents($fileDir, $content);
        }

        return "/${month}/" . rtrim($title, '.md');
    }
}
