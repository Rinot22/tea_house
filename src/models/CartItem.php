<?php

require_once __DIR__.'/Product.php';

class CartItem {
    private $userID;
    private $productID;
    private $cartItemID;
    private $product;

    public function __construct(
        int $userID,
        int $productID,
        int $cartItemID,
        Product $product = null
    ) {
        $this -> userID = $userID;
        $this -> productID = $productID;
        $this -> cartItemID = $cartItemID;
        $this -> product = $product;
    }

    /**
     * @return int
     */
    public function getUserID(): int
    {
        return $this->userID;
    }

    /**
     * @return int
     */
    public function getProductID(): int
    {
        return $this->productID;
    }

    /**
     * @return int
     */
    public function getCartItemID(): int
    {
        return $this->cartItemID;
    }

    /**
     * @return Product|null
     */
    public function getProduct(): Product
    {
        return $this->product;
    }


}