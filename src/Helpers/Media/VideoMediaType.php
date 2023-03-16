<?php

namespace App\Helpers\Media;

use App\Contracts\MediaProcessor;
use App\Models\Media;
use App\Models\MediaDirectory;

class VideoMediaType extends AbstractMediaTypeService implements MediaProcessor
{
    const DEFAULT_HEIGHT = 720;
    const DEFAULT_FPS = 30;
    const ENCODED_DIR = 'encode';
    protected array $defaultSizes = [self::ENCODED_DIR];

    public static function getMimeType(): string
    {
        return 'video/*';
    }

    public static function getName(): string
    {
        return 'Videos';
    }

    public function deleteMedia(Media $media): bool
    {
    }

    public function storeMedia(string $sourceMediaPath, array $file, ?MediaDirectory $directory = null): array
    {
        // TODO: Implement storeMedia() method.
    }
}