<?php

namespace App\Helpers\Media;

use App\Models\Media;
use App\Models\Mime;
use Exception;

abstract class AbstractMediaHelper
{
    public function deleteMedia(Media $media): bool
    {
        if (!is_file($media->getAbsolutePath())) {
            return false;
        }

        unlink($media->getAbsolutePath());

        foreach ($media->getAllScaled() as $scaled) {
            if (is_file($media->getAbsolutePath($scaled->getScaleName()))) {
                unlink($media->getAbsolutePath($scaled->getScaleName()));
            }
        }

        return true;
    }

    public static function generateFileName(array $file)
    {
        return sha1_file($file['tmp_name']) . $file['name'];
    }

    public static function getMimeType(): string
    {
        throw new Exception('Mime Type not defined');
    }

    protected function isApplicableMediaMime(string $file): bool
    {
        $fileMime = Mime::init(mime_content_type($file));
        $testMime = Mime::init(static::getMimeType());

        return MimeHelper::compareMimeTypes($fileMime, $testMime);
    }
}