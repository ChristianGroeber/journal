<?php

return [
    'routes' => include_once('routes.php'),
    'security' => [
        'user_model' => App\Models\TokenUser::class,
        'userHandler' =>  App\Helpers\CustomUserHelper::class,
    ],
    'hooks' => [
        [
            'anchor' => 'post_find_route',
            'hook' => \App\Hooks\RouteCheckHook::class,
        ],
    ]
];