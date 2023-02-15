<?php

require_once __DIR__.'/Product.php';

class CartItem {
    private $cartID;
    private $userID;
    private $productID;

    /**
     * @param $cartID
     * @param $userID
     * @param $productID
     */
    public function __construct(int $cartID, int $userID, int $productID)
    {
        $this->cartID = $cartID;
        $this->userID = $userID;
        $this->productID = $productID;
    }

    /**
     * @return int
     */
    public function getCartID(): int
    {
        return $this->cartID;
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


}