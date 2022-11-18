<?php

require __DIR__ . '/vendor/autoload.php';

use App\Helpers\CustomUserHelper;
use Nacho\Models\Request;
use Nacho\Models\Route;
use Nacho\Nacho;

define('VIEWS_DIR', $_SERVER['DOCUMENT_ROOT'] . '/src/Views');
if (is_file($_SERVER['DOCUMENT_ROOT'] . '/users.json')) {
    define('FILE_PATH', $_SERVER['DOCUMENT_ROOT'] . '/users.json');
} elseif (getenv('USER_FILE')) {
    define('FILE_PATH', $_SERVER['DOCUMENT_ROOT'] . '/' . getenv('USER_FILE'));
} else {
    throw new \Exception('I don\'t know where the users are stored');
}
define('MONTHS', ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);

if (isset($_SERVER['REDIRECT_URL'])) {
    $path = $_SERVER['REDIRECT_URL'];
} else {
    $path = $_SERVER['REQUEST_URI'];
}

function endswith($string, $test)
{
    $length = strlen($test);
    if (!$length) {
        return true;
    }
    return substr($string, -$length) === $test;
}

function startsWith($haystack, $needle)
{
    $length = strlen($needle);
    return substr($haystack, 0, $length) === $needle;
}

if (endswith($path, '/') && $path !== '/') {
    $path = substr($path, 0, strlen($path) - 1);
}

function getRoute($path)
{
    $routes = json_decode(
        file_get_contents($_SERVER['DOCUMENT_ROOT'] . '/config/routes.json'),
        true
    );
    if ($path !== '/') {
        $path = substr($path, 1, strlen($path));
    }
    foreach ($routes as $route) {
        $tmpRoute = new Route($route);
        if ($tmpRoute->match($path)) {
            return $tmpRoute;
        }
    }
    return null;
}

function getContent($route)
{
    $request = new Request($route);
    $userHandler = new CustomUserHelper();
    $nacho = new Nacho($request, $userHandler);
    $controllerDir = $route->getController();
    $cnt = new $controllerDir($nacho);
    $function = $route->getFunction();
    if (!method_exists($cnt, $function)) {
        header('Http/1.1 404');
        return "${function} does not exist in ${controllerDir}";
    }
    $request = new Request($route);
    return $cnt->$function($request);
}

if (!startsWith($path, '/api')) {
    echo file_get_contents('public/index.html');
    return '';
}
$route = getRoute($path);
if (!$route) {
    $route = getRoute('/');
}
$content = getContent($route);
if ($content) {
    echo $content;
} else {
    $route = getRoute('/');
    $content = getContent($route);
    echo $content;
}
