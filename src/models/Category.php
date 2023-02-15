<?php

class Category {
    private $categoryID;
    private $categoryName;

    public function __construct(
        string $categoryName,
        int $categoryID
    ) {
        $this -> categoryName = $categoryName;
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


}