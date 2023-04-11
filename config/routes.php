<?php

return [
    [
        'route' => '/',
        'controller' => App\Controllers\NotFoundController::class,
        'function' => 'index',
    ],
    [
        'route' => '/api/entries',
        'controller' => App\Controllers\PageController::class,
        'function' => 'index',
    ],
    [
        'route' => '/api/admin/build-cache',
        'controller' => App\Controllers\AdminController::class,
        'function' => 'buildCache',
    ],
    [
        'route' => '/api/admin/entry/edit',
        'controller' => App\Controllers\AdminController::class,
        'function' => 'edit',
    ],
    [
        'route' => '/api/admin/entry/edit/current',
        'controller' => App\Controllers\AdminController::class,
        'function' => 'editCurrent',
    ],
    [
        'route' => '/api/admin/entry/create',
        'controller' => App\Controllers\AdminController::class,
        'function' => 'createSpecific',
    ],
    [
        'route' => '/api/admin/entry/delete',
        'controller' => App\Controllers\AdminController::class,
        'function' => 'delete',
    ],
    [
        'route' => '/api/admin/entry/race-report',
        'controller' => App\Controllers\AdminController::class,
        'function' => 'uploadRaceReport',
    ],
    [
        'route' => '/api/entry/gallery',
        'controller' => App\Controllers\MediaController::class,
        'function' => 'media',
    ],
    [
        'route' => '/api/entry/gallery/upload',
        'controller' => App\Controllers\MediaController::class,
        'function' => 'uploadMedia',
    ],
    [
        'route' => '/api/admin/entry/media/load',
        'controller' => App\Controllers\MediaController::class,
        'function' => 'loadMediaForEntry',
    ],
    [
        'route' => '/api/admin/entry/media/delete',
        'controller' => App\Controllers\MediaController::class,
        'function' => 'deleteMedia',
    ],
    [
        'route' => '/api/admin/generate-backup',
        'controller' => App\Controllers\AdminController::class,
        'function' => 'generateBackup',
    ],
    [
        'route' => '/api/admin/restore-backup',
        'controller' => App\Controllers\AdminController::class,
        'function' => 'restoreFromBackup',
    ],
    [
        'route' => '/api/login',
        'controller' => App\Controllers\AuthenticationController::class,
        'function' => 'login',
    ],
    [
        'route' => '/api/auth/request-new-password',
        'controller' => App\Controllers\AuthenticationController::class,
        'function' => 'requestNewPassword',
    ],
    [
        'route' => '/api/auth/restore-password',
        'controller' => App\Controllers\AuthenticationController::class,
        'function' => 'restorePassword',
    ],
    [
        'route' => '/api/auth/generate-new-token',
        'controller' => App\Controllers\AuthenticationController::class,
        'function' => 'generateNewToken',
    ],
    [
        'route' => '/api/auth/change-password',
        'controller' => App\Controllers\AuthenticationController::class,
        'function' => 'changePassword',
    ],
    [
        'route' => '/api/auth/create-admin',
        'controller' => App\Controllers\AuthenticationController::class,
        'function' => 'createAdmin',
    ],
    [
        'route' => '/api/validate-token',
        'controller' => App\Controllers\AuthenticationController::class,
        'function' => 'validateToken',
    ],
    [
        'route' => '/api/init',
        'controller' => App\Controllers\InitController::class,
        'function' => 'init',
    ],
];