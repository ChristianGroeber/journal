<?php

use App\Controller\JournalFrontendController;
use PixlMint\JournalPlugin\Hooks\InitHook;

return [
    "plugins" => [
        [
            'name' => 'pixl-cms',
            'install_method' => 'composer',
            'enabled' => true,
            'config' => require_once('vendor/pixlmint/pixl-cms/config/config.php'),
        ],
        [
            'name' => 'pixlcms-journal-plugin',
            'install_method' => 'composer',
            'enabled' => true,
            'config' => require_once('vendor/pixlmint/pixlcms-journal-plugin/config/config.php'),
        ],
        [
            'name' => 'pixlcms-media-plugin',
            'install_method' => 'composer',
            'enabled' => true,
            'config' => require_once('vendor/pixlmint/pixlcms-media-plugin/config/config.php'),
        ],
    ],
    'routes' => [
        [
            'route' => '/',
            'controller' => JournalFrontendController::class,
            'function' => 'index',
        ],
    ],
    'base' => [
        'frontendController' => JournalFrontendController::class,
        'debugEnabled' => false,
        'feVersion' => '2024.7',
        'feYear' => 2024,
    ],
    'hooks' => [
        [
            'anchor' => 'init',
            'hook' => InitHook::class,
        ],
    ],
];
