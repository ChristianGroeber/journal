<?php

namespace App\Helpers;

use App\Contracts\MediaProcessor;
use App\Models\Media;
use App\Models\MediaDirectory;
use App\Repository\MediaRepository;
use Nacho\ORM\RepositoryManager;

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

    public static function getName(): string
    {
        return 'Images';
    }

    public function deleteMedia(Media $media): bool
    {
        return parent::deleteMedia($media);
    }

    /**
     * @return array|Media[]
     * TODO: don't throw error if directory does not exist
     */
    public function loadMedia(MediaDirectory $directory): array
    {
        $imagesDir = $_SERVER['DOCUMENT_ROOT'] . '/media';
        $dir = $directory->printDirectory();

        $images = [];
        if (!is_dir("${imagesDir}/${dir}/1080")) {
            return [];
        }
        foreach (scandir("${imagesDir}/${dir}/1080") as $img) {
            if (!is_file("${imagesDir}/${dir}/1080/${img}")) {
                continue;
            }
            $images[] = JournalConfiguration::mediaBaseUrl() . "/${dir}/1080/${img}";
        }

        return $images;
    }

    public function storeMedia(array $file, MediaDirectory $directory): Media
    {
        $media = new Media(-1, self::generateFileName($file), $directory);

        $this->outputFile($file['tmp_name'], $media);

        $this->scale($media);

        return $media;
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

        // Save scaled down version in new path
        imagewebp($scaled, "${targetPath}/${fileName}");
    }
}
