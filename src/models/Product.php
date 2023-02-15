<?php

class Product {
    public $id;
    public $name;
    public $desc;
    public $price;
    public $category;
    public $origin;
    public $type;
    public $weight;

    /**
     * @param $id
     * @param $name
     * @param $desc
     * @param $price
     * @param $category
     * @param $origin
     * @param $type
     * @param $weight
     */
    public function __construct(int $id, string $name, string $desc, float $price, string $category, string $origin, string $type, int $weight)
    {
        $this->id = $id;
        $this->name = $name;
        $this->desc = $desc;
        $this->price = $price;
        $this->category = $category;
        $this->origin = $origin;
        $this->type = $type;
        $this->weight = $weight;
    }

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @return string
     */
    public function getDesc(): string
    {
        return $this->desc;
    }

    /**
     * @return float
     */
    public function getPrice(): float
    {
        return $this->price;
    }

    /**
     * @return string
     */
    public function getCategory(): string
    {
        return $this->category;
    }

    /**
     * @return string
     */
    public function getOrigin(): string
    {
        return $this->origin;
    }

    /**
     * @return string
     */
    public function getType(): string
    {
        return $this->type;
    }

    /**
     * @return int
     */
    public function getWeight(): int
    {
        return $this->weight;
    }



}