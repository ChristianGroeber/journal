<?php

namespace App\Contracts;

use App\Models\Media;
use App\Models\MediaDirectory;

interface MediaProcessor
{
    public static function getMimeType(): string;

    public static function getName(): string;

    public function deleteMedia(Media $media): bool;

    // TODO @refactor: either $sourceMediaPath or $file have to go as they partially store the same information
    public function storeMedia(string $sourceMediaPath, array $file, ?MediaDirectory $directory = null): array;

    public function loadMedia(MediaDirectory $directory): array;
}