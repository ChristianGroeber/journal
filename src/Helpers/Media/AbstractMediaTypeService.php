<?php

namespace App\Helpers\Media;

use App\Contracts\MediaProcessor;
use App\Helpers\JournalConfiguration;
use App\Models\Media;
use App\Models\MediaDirectory;
use App\Repository\MediaRepository;
use Nacho\ORM\RepositoryInterface;
use Nacho\ORM\RepositoryManager;

// TODO: Media Files need to work independently of their file extensions.
class AbstractMediaTypeService
{
    protected array $defaultSizes = [];

    public function deleteMedia(Media $media): bool
    {
        $basePath = JournalConfiguration::mediaDir() . DIRECTORY_SEPARATOR . $media->getMonth() . '/' . $media->getDay() . '/';

        unlink($basePath . $media->getName());
        foreach ($this->defaultSizes as $size) {
            $path = $basePath . $size . '/' . $media->getName();
            if (is_file($path)) {
                unlink($path);
            }
        }

        return true;
    }

    public function storeMedia(string $sourceMediaPath, array $file, ?MediaDirectory $directory = null): array
    {
        $now = new \DateTime();
        if (!$directory) {
            // TODO @refactor: This should be a static function somewhere
            $month = $now->format('F');
            $day = $now->format('Y-m-d');
            $directory = new MediaDirectory($month, $day);
        }
        $fileName = sha1_file($sourceMediaPath) . '-' . $file['name'];
        $baseFileName = $now->getTimestamp();
        $mediaDir = JournalConfiguration::mediaDir();

        $finalMediaDir = $mediaDir . DIRECTORY_SEPARATOR . $directory->getMonth() . DIRECTORY_SEPARATOR . $directory->getDay();
        if (!is_dir($finalMediaDir)) {
            mkdir($finalMediaDir, 0777, true);
        }

        $media = new Media( $baseFileName . '-' . $fileName, $directory);

        $this->outputFile($sourceMediaPath, $media);
        $this->generateScaleDirs($media);

        return $this->scale($media);
    }

    public static function compareMimeTypes(string $in, string $compare): bool
    {
        return explode('/', $in)[0] === explode('/', $compare)[0];
    }

    public function loadMedia(string $day): Media
    {
        return $this->getRepository()->getByDay($day);
    }

    protected function getRepository(): MediaRepository|RepositoryInterface
    {
        return RepositoryManager::getInstance()->getRepository(MediaRepository::class);
    }

    protected function isApplicableMediaMime(string $path): bool
    {
        if (!($this instanceof MediaProcessor)) {
            throw new \Exception('This Class needs to implement the MediaProcessor Interface');
        }

        $mime = mime_content_type($path);

        return self::compareMimeTypes($mime, static::getMimeType());
    }

    protected function outputFile(string $mediaPath, Media $media): void
    {
        move_uploaded_file($mediaPath, $media->getAbsolutePath());
    }

    protected function scale(Media $media): array
    {
        throw new \Exception('This Class does not support the scale Function');
    }

    protected function generateScaleDirs(Media $media): void
    {
        foreach ($this->defaultSizes as $size) {
            $dir = $media->getAbsoluteDirectory($size);
            if (!is_dir($dir)) {
                mkdir($dir, 0777, true);
            }
        }
    }
}