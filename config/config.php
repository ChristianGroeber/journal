<?php

if (is_file('journal.local.php')) {
    $journalConf = include_once('journal.local.php');
} else {
    $journalConf = include_once('journal.php');
}

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
    ],
    'journal' => $journalConf,
];