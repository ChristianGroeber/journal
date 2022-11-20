<?php

namespace App\Controllers;

use App\Contracts\MediaProcessor;
use App\Helpers\AbstractMediaHelper;
use App\Helpers\EncoderQueue;
use App\Helpers\ImageHelper;
use App\Helpers\JournalConfiguration;
use App\Helpers\VideoHelper;
use App\Models\Media;
use Nacho\Controllers\AbstractController;
use App\Helpers\TokenHelper;
use Nacho\Models\Request;
use Nacho\Nacho;

class MediaController extends AbstractController
{
    /** @var array|MediaProcessor[] $mediaHelpers */
    private array $mediaHelpers = [];

    public function __construct(Nacho $nacho)
    {
        parent::__construct($nacho);
        $this->mediaHelpers['img'] = new ImageHelper();
        $this->mediaHelpers['vid'] = new VideoHelper();
    }

    // /api/entry/gallery/upload
    public function uploadMedia(Request $request)
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
        if (!key_exists('entry', $_REQUEST)) {
            return $this->json(['message' => 'Please define the Entry'], 400);
        }

        $mediaDir = JournalConfiguration::mediaDir();
        $entry = $_REQUEST['entry'];
        $month = explode('/', $entry)[1];
        $day = explode('/', $entry)[2];

        if (!is_dir("${mediaDir}/${entry}")) {
            mkdir("${mediaDir}${entry}", 0777, true);
        }

        $uploadedFiles = [];
        EncoderQueue::readJobs();
        foreach ($_FILES as $file) {
            $helper = $this->getMediaHelper($file['type']);
            $uploadedFiles[] = $helper->storeMedia($file['tmp_name'], $file, $month, $day);
        }
        EncoderQueue::writeJobs();

        return $this->json(['message' => 'uploaded files', 'files' => $uploadedFiles]);
    }

    // /api/admin/entry/media/load
    public function loadMediaForEntry(Request $request)
    {
        $media = [];
        $month = explode('/', $_REQUEST['entry'])[1];
        $day = explode('/', $_REQUEST['entry'])[2];

        if (!key_exists('token', $_REQUEST)) {
            return $this->json(['message' => 'You need to be authenticated'], 401);
        }
        $tokenHelper = new TokenHelper();
        $user = $tokenHelper->isTokenValid($_REQUEST['token'], $this->nacho->getUserHandler()->getUsers());
        if (!$user) {
            return $this->json(['message' => 'The provided Token is invalid'], 401);
        }

        foreach ($this->mediaHelpers as $slug => $helper) {
            $media[] = [
                'name' => $helper::getName(),
                'media' => $helper->loadMedia($month, $day),
            ];
        }

        return $this->json(["media" => $media]);
    }

    // /api/admin/entry/media/delete
    public function deleteMedia()
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

        $img = $_GET['image'];

        $splitImg = explode('/', $img);

        $imgObj = new Media($splitImg[5], $splitImg[2], $splitImg[3]);
        $imageHelper = new ImageHelper();
        $imageHelper->deleteMedia($imgObj);

        return $this->json();
    }

    //
    public function loadMedia(Request $request)
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
            $images[] = "/images/${month}/${day}/${img}";
        }

        return $this->json(['message' => 'I should be loading your images now', 'images' => $images]);
    }

    /**
     * GET: get a list of images for a selected entry
     * Route: /api/entry/gallery
     */
    function media()
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

    private function getMediaHelper(string $mimeType): MediaProcessor
    {
        foreach ($this->mediaHelpers as $mediaHelper) {
            if (AbstractMediaHelper::compareMimeTypes($mimeType, $mediaHelper::getMimeType())) {
                return $mediaHelper;
            }
        }

        throw new \Exception('The Mime Type ' . $mimeType . ' is not supported');
    }
}