<?php

namespace App\Contracts;

use App\Models\Media;

interface MediaProcessor
{
    public static function getMimeType(): string;

    public function deleteMedia(Media $media): bool;

    public function storeMedia(string $mediaPath, array $file, ?string $month = null, ?string $day = null): array;

    public function loadMedia(string $month, string $day): array;
}