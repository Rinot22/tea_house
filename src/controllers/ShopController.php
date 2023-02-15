<?php

require_once 'AppController.php';
require_once __DIR__.'/../repository/ProductRepository.php';

class ShopController extends AppController {
    public function shop() {
        $productRepository = new ProductRepository();

        $productRepository->getProducts();
        $this->render('shop');
    }

    public function product(int $id) {
        $productRepository = new ProductRepository();


        $product = $productRepository->getProduct($id);

        $this->render('product', ['product' => $product]);
    }

}