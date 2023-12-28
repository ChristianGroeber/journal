<?php

namespace App\Hooks;

use Nacho\Helpers\ConfigurationContainer;
use PixlMint\CMS\Contracts\InitFunction;

class FeInitHook implements InitFunction
{
    private ConfigurationContainer $configuration;

    public function __construct(ConfigurationContainer $configuration)
    {
        $this->configuration = $configuration;
    }

    public function call(array $init): array
    {
        $init['feVersion'] = $this->configuration->getCustomConfig('base')['feVersion'];
        $init['feYear'] = $this->configuration->getCustomConfig('base')['feYear'];

        return $init;
    }
}