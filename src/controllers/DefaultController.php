<?php

require_once 'AppController.php';

class DefaultController extends AppController {
    public function index() {
        $this -> render('login');
    }

    public function main() {
        $this -> render('main-page');
    }

    public function profile() {
        $this -> render('profile');

    }

    public function favorites() {
        $this -> render('favorites');
    }

    public function cart() {
        $this -> render('shopping-cart');
    }
}