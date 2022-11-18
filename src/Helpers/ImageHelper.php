<?php

namespace App\Helpers;

use App\Contracts\MediaProcessor;
use App\Models\Media;

class ImageHelper extends AbstractMediaHelper implements MediaProcessor
{
    protected array $defaultSizes = [100, 500, 1080];

    public function getDefaultSizes(): array
    {
        return $this->defaultSizes;
    }

    public static function getMimeType(): string
    {
        return 'image/*';
    }

    public function deleteMedia(Media $media): bool
    {
        return parent::deleteMedia($media);
    }

    public function loadMedia(string $month, string $day): array
    {
        $imagesDir = $_SERVER['DOCUMENT_ROOT'] . '/images';
        $entry = $_REQUEST['entry'];

        $images = [];
        foreach (scandir("${imagesDir}${entry}/1080") as $img) {
            if (!is_file("${imagesDir}${entry}/1080/${img}")) {
                continue;
            }
            $images[] = "/images${entry}/1080/${img}";
        }

        return $images;
    }

    protected function outputFile(string $mediaPath, Media $media)
    {
        // Rotate Image
        $image = imagecreatefromjpeg($mediaPath);
        $exif = exif_read_data($mediaPath);
        if (!empty($exif['Orientation'])) {
            switch ($exif['Orientation']) {
                case 8:
                    $image = imagerotate($image, 90, 0);
                    break;
                case 3:
                    $image = imagerotate($image, 180, 0);
                    break;
                case 6:
                    $image = imagerotate($image, -90, 0);
                    break;
            }
        }

        // Save rotated image
        imagewebp($image, $media->getAbsolutePath());
    }

    protected function scale(Media $media): array
    {
        $scaled = [];
        // create scaled versions of image
        foreach ($this->getDefaultSizes() as $size) {
            $this->compressImage($media->getAbsolutePath(), $size);
            $scaled[$size] = $media->getMediaPath($size);
        }

        return $scaled;
    }

    private function compressImage(string $imagePath, int $size): void
    {
        // Find out path of original image
        $splImgPath = explode('/', $imagePath);
        array_pop($splImgPath);
        $targetPath = implode('/', $splImgPath) . "/${size}";
        $splImgPath = explode('/', $imagePath);
        $fileName = array_pop($splImgPath);

        // Scale down image
        $imgObject = imagecreatefromstring(file_get_contents($imagePath));
        $scaled = imagescale($imgObject, $size);

        // Create new path if it does not exist yet
        if (!is_dir($targetPath)) {
            mkdir($targetPath, 0777, true);
        }

        // Save scaled down version in new path
        imagewebp($scaled, "${targetPath}/${fileName}");
    }
}
