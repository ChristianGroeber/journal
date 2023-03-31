<?php

namespace App\Helpers\Media;

use App\Models\Mime;
use Exception;

abstract class AbstractMediaHelper
{
    protected function isApplicableMediaMime(string $file): bool
    {
        return MimeHelper::compareMimeTypes(Mime::init(mime_content_type($file)), Mime::init(static::getMimeType()));
    }

    public static function generateFileName(array $file)
    {
        return sha1_file($file['tmp_name']) . $file['name'];
    }

    public static function getMimeType(): string
    {
        throw new Exception('Mime Type not defined');
    }
}