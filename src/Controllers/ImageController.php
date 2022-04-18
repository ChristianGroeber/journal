<?php

namespace App\Controllers;

use App\Helpers\ImageHelper;
use Nacho\Controllers\AbstractController;
use App\Helpers\TokenHelper;

class ImageController extends AbstractController
{
    public function uploadImages($request)
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
        $now = new \DateTime();
        $baseFileName = $now->getTimestamp();
        $imagesDir = $_SERVER['DOCUMENT_ROOT'] . '/images/';
        $entry = $_REQUEST['entry'];

        if (!is_dir("${imagesDir}${entry}")) {
            mkdir("${imagesDir}${entry}", 0777, true);
        }

        $imgHelper = new ImageHelper();
        $uploadedFiles = [];
        foreach ($_FILES as $file) {
            file_put_contents("${imagesDir}${entry}/${baseFileName}" . $file['name'], file_get_contents($file['tmp_name']));
            foreach ($imgHelper->getDefaultSizes() as $size) {
                $imgHelper->compressImage("${imagesDir}${entry}/${baseFileName}" . $file['name'], $size);
                if ($size === 1080) {
                    array_push($uploadedFiles, "/images${entry}/${size}/${baseFileName}" . $file['name']);
                }
            }
        }

        return $this->json(['message' => 'uploaded files', 'files' => $uploadedFiles]);
    }

    public function loadImages($request)
    {
        $imagesDir = $_SERVER['DOCUMENT_ROOT'] . '/images/';
        $month = $_REQUEST['month'];
        $day = $_REQUEST['day'];

        if (!is_dir("${imagesDir}${month}/${day}")) {
            return $this->json(['message' => 'There are no images'], 404);
        }

        $images = [];
        foreach (scandir("${imagesDir}${month}/${day}") as $img) {
            if (is_dir("${imagesDir}${month}/${day}/${img}")) {
                continue;
            }
            array_push($images, "/images/${month}/${day}/${img}");
        }

        return $this->json(['message' => 'I should be loading your images now', 'images' => $images]);
    }

    /**
     * GET: get a list of images for a selected entry
     */
    function images()
    {
        $strPage = $_REQUEST['page'];

        $imagesDir = $_SERVER['DOCUMENT_ROOT'] . '/images' . $strPage;
        $images = [];
        foreach (scandir($imagesDir) as $imgPath) {
            if (is_file($imagesDir . '/' . $imgPath)) {
                $images[] = '/images' . $strPage . '/' . $imgPath;
            }
        } 

        return $this->json($images);
    }
}
