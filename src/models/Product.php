<?php

class Product {
    private $productID;
    private $productName;
    private $productDescription;
    private $productImageURL;
    private $productPrice;
    private $categoryID;

    public function __construct(
        string $productName,
        string $productDescription,
        string $productImageURL,
        float $productPrice,
        int $categoryID,
        int $productID = null
    ) {
        $this -> productName = $productName;
        $this -> productDescription = $productDescription;
        $this -> productImageURL = $productImageURL;
        $this -> productPrice = $productPrice;
        $this -> categoryID = $categoryID;
        $this -> productID = $productID;
    }

    /**
     * @return int|null
     */
    public function getProductID(): int
    {
        return $this->productID;
    }

    /**
     * @return string
     */
    public function getProductName(): string
    {
        return $this->productName;
    }

    /**
     * @return string
     */
    public function getProductDescription(): string
    {
        return $this->productDescription;
    }

    /**
     * @return string
     */
    public function getProductImageURL(): string
    {
        return $this->productImageURL;
    }

    /**
     * @return float
     */
    public function getProductPrice(): float
    {
        return $this->productPrice;
    }

    /**
     * @return int
     */
    public function getCategoryID(): int
    {
        return $this->categoryID;
    }


}