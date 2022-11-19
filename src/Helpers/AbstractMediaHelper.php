<?php

namespace App\Helpers;

use App\Contracts\MediaProcessor;
use App\Models\Media;

class AbstractMediaHelper
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

    public function storeMedia(string $mediaPath, array $file, ?string $month = null, ?string $day = null): array
    {
        $now = new \DateTime();
        if (!$month) {
            $month = $now->format('F');
        }
        if (!$day) {
            $day = $now->format('Y-m-d');
        }
        $fileName = sha1_file($mediaPath) . '-' . $file['name'];
        $baseFileName = $now->getTimestamp();
        $mediaDir = JournalConfiguration::mediaDir();
        if (!is_dir("${mediaDir}/${month}/${day}")) {
            mkdir("${mediaDir}/${month}/${day}", 0777, true);
        }

        $media = new Media($baseFileName . '-' . $fileName, $month, $day);

        $this->outputFile($mediaPath, $media);
        $this->generateScaleDirs($media);
        return $this->scale($media);
    }

    public static function compareMimeTypes(string $in, string $compare): bool
    {
        return explode('/', $in)[0] === explode('/', $compare)[0];
    }

    protected function isApplicableMediaMime(string $path): bool
    {
        if (!($this instanceof MediaProcessor)) {
            throw new \Exception('This Class needs to implement the MediaProcessor Interface');
        }

        $mime = mime_content_type($path);

        return self::compareMimeTypes($mime, static::getMimeType());
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

    protected function outputFile(string $mediaPath, Media $media)
    {
        move_uploaded_file($mediaPath, $media->getAbsolutePath());
    }

    protected function scale(Media $media): array
    {
        throw new \Exception('This Class does not support the scale Function');
    }
}