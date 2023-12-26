<?php

use App\Controller\JournalFrontendController;

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
    ],
    'base' => [
        'frontendController' => JournalFrontendController::class,
    ],
];