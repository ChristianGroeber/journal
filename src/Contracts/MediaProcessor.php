<?php

namespace App\Contracts;

use App\Models\Media;
use App\Models\MediaDirectory;

interface MediaProcessor
{
    public static function getMimeType(): string;

    public static function getName(): string;

    public function deleteMedia(Media $media): bool;

    public function storeMedia(array $file, MediaDirectory $directory): Media;

    public function loadMedia(MediaDirectory $directory): array;
}