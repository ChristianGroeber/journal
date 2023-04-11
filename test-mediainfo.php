<?php

require __DIR__ . '/vendor/autoload.php';

use Mhor\MediaInfo\MediaInfo;

const IN_FILE = __DIR__ . '/docker/transcoder/in2.mp4';

$mediainfo = new MediaInfo();
$mic = $mediainfo->getInfo(IN_FILE);

const DEFAULT_FPS = 30;
const DEFAULT_HEIGHT = 720;

$output = [
    'height' => false,
    'width' => false,
    'framerate' => false,
];


foreach ($mic->getVideos() as $video) {
    $height = $video->get('height')->getAbsoluteValue();
    $width = $video->get('width')->getAbsoluteValue();
    $aspectRatio = $video->get('display_aspect_ratio')->getAbsoluteValue();
    $fps = $video->get('frame_rate')->getAbsoluteValue();

    if ($fps > DEFAULT_FPS) {
        $fps = DEFAULT_FPS;
    }
    if ($height > DEFAULT_HEIGHT) {
        $height = DEFAULT_HEIGHT;
        $width = round($height * $aspectRatio);
    }

    $output['framerate'] = $fps;
    $output['height'] = $height;
    $output['width'] = $width;
}

print_r($output);
