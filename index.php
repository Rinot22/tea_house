<?php

require 'Routing.php';

$path = trim($_SERVER['REQUEST_URI'], '/');
$path = parse_url($path, PHP_URL_PATH);

Routing::get('', 'DefaultController');
Routing::post('login', 'SecurityController');
Routing::post('registration', 'SecurityController');

Routing::get('main', 'DefaultController');
Routing::get('shop', 'ShopController');
Routing::get('profile', 'DefaultController');
Routing::get('favorites', 'DefaultController');
Routing::get('cart', 'DefaultController');
Routing::get('product', 'ShopController');


Routing::run($path);