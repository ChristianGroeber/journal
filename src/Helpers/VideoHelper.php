<?php

namespace App\Helpers;

use App\Contracts\MediaProcessor;
use App\Models\EncodingJob;
use App\Models\Media;
use Mhor\MediaInfo\MediaInfo;

class VideoHelper extends AbstractMediaHelper implements MediaProcessor
{
    const DEFAULT_HEIGHT = 720;
    const DEFAULT_FPS = 30;
    const ENCODED_DIR = 'encode';
    protected static string $fileExtension = 'webp';

    public static function getMimeType(): string
    {
        return 'video/*';
    }

    public function loadMedia(string $month, string $day): array
    {
        // TODO: Implement loadMedia() method.
    }

    protected function scale(Media $media): array
    {
        $encode = $this->getEncoderSettings($media);

        EncoderQueue::addJob($encode);

        return [self::ENCODED_DIR => $media->getMediaPath(self::ENCODED_DIR)];
    }

    private function getEncoderSettings(Media $media): EncodingJob
    {
        $mediainfo = new MediaInfo();
        $mic = $mediainfo->getInfo($media->getAbsolutePath());

        $encodingJob = new EncodingJob($media->getAbsolutePath(), $media->getAbsolutePath(self::ENCODED_DIR));

        foreach ($mic->getVideos() as $video) {
            $height = $video->get('height')->getAbsoluteValue();
            $width = $video->get('width')->getAbsoluteValue();
            $aspectRatio = $video->get('display_aspect_ratio')->getAbsoluteValue();
            $fps = $video->get('frame_rate')->getAbsoluteValue();

            if ($fps > self::DEFAULT_FPS) {
                $fps = self::DEFAULT_FPS;
            }
            if ($height > self::DEFAULT_HEIGHT) {
                $height = self::DEFAULT_HEIGHT;
                $width = round($height * $aspectRatio);
            }

            $encodingJob->setFramerate($fps);
            $encodingJob->setHeight($height);
            $encodingJob->setWidth($width);
        }

        return $encodingJob;
    }
}