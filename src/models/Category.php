<?php

class Category {
    private $categoryID;
    private $categoryName;
    private $categoryDescription;

    public function __construct(
        string $categoryName,
        string $categoryDescription,
        int $categoryID = null
    ) {
        $this -> categoryName = $categoryName;
        $this -> categoryDescription = $categoryDescription;
        $this -> categoryID = $categoryID;
    }

    /**
     * @return int|null
     */
    public function getCategoryID(): int
    {
        return $this->categoryID;
    }

    /**
     * @return string
     */
    public function getCategoryName(): string
    {
        return $this->categoryName;
    }

    /**
     * @return string
     */
    public function getCategoryDescription(): string
    {
        return $this->categoryDescription;
    }


}