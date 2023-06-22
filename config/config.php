<?php

return [
    "plugins" => [
        [
            'name' => 'pixlcms-journal-plugin',
            'install_method' => 'composer',
            'enabled' => true,
            'config' => require_once('vendor/pixlmint/pixlcms-journal-plugin/config/config.php'),
        ],
    ],
    'base' => [
        'frontendController' => \App\Controller\JournalFrontendController::class,
    ],
];