<?php

require_once __DIR__.'/../models/Product.php';

class AdminController {
    public function addProduct() {
        return new Product();
    }

    public function deleteProduct() {
        // TODO: remove product
    }

    public function addCategory () {

    }

    public function deleteCategory() {
        // TODO: remove prod from cart
    }
}