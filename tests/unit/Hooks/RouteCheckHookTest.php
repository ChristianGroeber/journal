<?php

namespace Tests\unit\Hooks;

use App\Controllers\FrontendController;
use App\Hooks\RouteCheckHook;
use Nacho\Models\Route;
use PHPUnit\Framework\TestCase;

class RouteCheckHookTest extends TestCase
{
    public function testCallChangesControllerForNonApiRoutes()
    {
        $hook = new RouteCheckHook();
        $route = new Route(['route' => 'home', 'controller' => 'HomeController', 'function' => 'index']);

        $newRoute = $hook->call($route);

        $this->assertEquals(FrontendController::class, $newRoute->getController());
    }

    public function testCallDoesNotChangeControllerForApiRoutes()
    {
        $hook = new RouteCheckHook();
        $route = new Route(['route' => '/api/users', 'controller' => 'UserController', 'function' => 'index']);

        $newRoute = $hook->call($route);

        $this->assertEquals('UserController', $newRoute->getController());
        $this->assertEquals('index', $newRoute->getFunction());
        $this->assertEquals('UserController', $newRoute->getController());
    }
}

