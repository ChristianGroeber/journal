<?php

use App\Controller\JournalFrontendController;
use App\Hooks\FeInitHook;

return [
    "plugins" => [
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
        [
            'route' => '/api/info',
            'controller' => JournalFrontendController::class,
            'function' => 'info',
        ],
    ],
    'base' => [
        'frontendController' => JournalFrontendController::class,
        'debugEnabled' => false,
        'feVersion' => '2024.4',
        'feYear' => 2024,
    ],
    'hooks' => [
        [
            'anchor' => 'init',
            'hook' => FeInitHook::class,
        ],
    ],
];
