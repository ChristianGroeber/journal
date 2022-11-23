<?php

namespace App\Helpers\Media;

use App\Models\Media;

class VideoMediaType extends AbstractMediaTypeService implements \App\Contracts\MediaProcessor
{

    public static function getMimeType(): string
    {
        // TODO: Implement getMimeType() method.
    }

    public static function getName(): string
    {
        // TODO: Implement getName() method.
    }

    public function deleteMedia(Media $media): bool
    {
        // TODO: Implement deleteMedia() method.
    }

    public function storeMedia(string $mediaPath, array $file, ?string $month = null, ?string $day = null): array
    {
        // TODO: Implement storeMedia() method.
    }

    public function loadMedia(string $month, string $day): array
    {
        // TODO: Implement loadMedia() method.
    }
}