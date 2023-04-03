<?php

namespace App\Controllers;

use App\Contracts\MediaProcessor;
use App\Helpers\JournalConfiguration;
use App\Helpers\Media\ImageMediaType;
use App\Helpers\Media\MimeHelper;
use App\Helpers\Media\VideoMediaType;
use App\Models\Media;
use App\Models\MediaDirectory;
use App\Models\Mime;
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
        $this->mediaHelpers['img'] = new ImageMediaType();
        $this->mediaHelpers['vid'] = new VideoMediaType();
    }

    /**
     * GET: /api/entry/gallery/upload
     */
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
        $mediaDirectory = new MediaDirectory($month, $day);

        if (!is_dir("${mediaDir}/${entry}")) {
            mkdir("${mediaDir}${entry}", 0777, true);
        }

        $uploadedFiles = [];

        foreach ($_FILES as $file) {
            $helper = $this->getMediaHelper(Mime::init($file['type']));
            $media = $helper->storeMedia($file, $mediaDirectory);
            $tmpArr = $media->toFrontendArray();
            $tmpArr['scaled']['default'] = $media->getMediaPath($helper->getDefaultScaled());
            $uploadedFiles[] = $tmpArr;
        }

        return $this->json(['message' => 'uploaded files', 'files' => $uploadedFiles]);
    }

    // /api/admin/entry/media/load
    public function loadMediaForEntry(Request $request)
    {
        $media = [];
        $entryStr = ltrim($_REQUEST['entry'], DIRECTORY_SEPARATOR);
        $entry = explode(DIRECTORY_SEPARATOR, $entryStr);
        $directory = new MediaDirectory($entry[0], $entry[1]);

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
                'slug' => $slug,
                'media' => $helper->loadMedia($directory),
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

        $img = $_GET['media'];

        $splitMedia = explode('/', $img);

        // TODO: write index function that takes the relative (or absolute) path as argument and returns a media object alongside all its scaled media
        $media = new Media($splitMedia[5], $splitMedia[2], $splitMedia[3]);
        foreach ($this->mediaHelpers as $helper) {
            $helper->deleteMedia($media);
        }

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

    // /api/admin/media/index
    public function indexMedia(Request $request)
    {
        if (!key_exists('token', $request->getBody())) {
            return $this->json(['message' => 'You need to be authenticated'], 401);
        }
        $tokenHelper = new TokenHelper();
        $token = $request->getBody()['token'];
        $user = $tokenHelper->isTokenValid($token, $this->nacho->getUserHandler()->getUsers());
        if (!$user) {
            return $this->json(['message' => 'The provided Token is invalid'], 401);
        }


    }

    private function getMediaHelper(Mime $mime): MediaProcessor
    {
        foreach ($this->mediaHelpers as $mediaHelper) {
            $testMime = Mime::init($mediaHelper::getMimeType());
            if (MimeHelper::compareMimeTypes($testMime, $mime)) {
                return $mediaHelper;
            }
        }

        throw new \Exception('The Mime Type ' . $mime->printMime() . ' is not supported');
    }
}
