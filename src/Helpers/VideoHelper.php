<?php

namespace App\Helpers;

use App\Contracts\MediaProcessor;
use App\Models\EncodingJob;
use App\Models\Media;
use App\Models\MediaSize;
use App\Repository\EncodingJobRepository;
use Mhor\MediaInfo\Container\MediaInfoContainer;
use Mhor\MediaInfo\MediaInfo;
use Mhor\MediaInfo\Type\Video;
use Nacho\ORM\RepositoryInterface;
use Nacho\ORM\RepositoryManager;

class VideoHelper extends AbstractMediaHelper implements MediaProcessor
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

    public function loadMedia(string $month, string $day): array
    {
        $mediaDir = JournalConfiguration::mediaDir();
        $media = [];
        foreach (scandir("${mediaDir}/${month}/${day}") as $file) {
            if ($file === '.' || $file === '..' || is_dir("${mediaDir}/${month}/${day}/${file}")) {
                continue;
            }
            if ($this->isApplicableMediaMime("${mediaDir}/${month}/${day}/${file}")) {
                $media[] = JournalConfiguration::mediaBaseUrl() . "/${month}/${day}/${file}";
            }
        }

        return $media;
    }

    protected function scale(Media $media): array
    {
        $encode = $this->getEncoderSettings($media);

        self::getEncoderQueueRepository()->set($encode);

        return [self::ENCODED_DIR => $media->getMediaPath(self::ENCODED_DIR) . '.webm'];
    }

    private function getEncoderSettings(Media $media): EncodingJob
    {
        $mediainfo = new MediaInfo();
        $mic = $mediainfo->getInfo($media->getAbsolutePath());

        $encodingJob = new EncodingJob(-1, $media->getAbsolutePath(), $media->getAbsolutePath(self::ENCODED_DIR) . '.webm');
        $video = $this->getVideo($mic);

        $size = new MediaSize($video->get('height')->getAbsoluteValue(), $video->get('width')->getAbsoluteValue());
        $aspectRatio = $video->get('display_aspect_ratio')->getAbsoluteValue();
        $fps = $video->get('frame_rate')->getAbsoluteValue();

        if ($fps > self::DEFAULT_FPS) {
            $fps = self::DEFAULT_FPS;
        }
        if ($size->getHeight() > self::DEFAULT_HEIGHT) {
            $size->setHeight(self::DEFAULT_HEIGHT);
            $size->setWidth(round($size->getHeight() * $aspectRatio));
        }

        $encodingJob->setFramerate($fps);
        $encodingJob->setHeight($size->getHeight());
        $encodingJob->setWidth($size->getWidth());

        return $encodingJob;
    }

    private function getVideo(MediaInfoContainer $mic): ?Video
    {
        foreach ($mic->getVideos() as $video) {
            return $video;
        }

        return null;
    }

    private static function getEncoderQueueRepository(): EncodingJobRepository|RepositoryInterface
    {
        return RepositoryManager::getInstance()->getRepository(EncodingJobRepository::class);
    }
}