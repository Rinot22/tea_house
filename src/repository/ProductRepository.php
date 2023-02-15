<?php

require_once 'Repository.php';
require_once __DIR__.'/../models/Product.php';

class ProductRepository extends Repository {
    public function addProduct(int $id, string $name, string $desc, float $price, int $categoryId) {
        $stmt = $this->database->connect()->prepare('
            INSERT INTO public.products (id, name, desc, price, categoryId)
            VALUES (?, ?, ?, ?, ?)
        ');

        $stmt->execute([
           $id,
           $name,
           $desc,
           $price,
           $categoryId
        ]);
    }

    public function getProducts() {
        $stmt = $this->database->connect()->prepare('
            select name, description, price, weight, categories.c_name, types.t_name, origins.o_name
            from (((products
                inner join categories on products.id_category = categories.id)
                inner join types on products.id_type = types.id)
                inner join origins on products.id_origins = origins.id)
        ');

        $stmt->execute();

        while ($res = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $products[] = array(
                'title' => $res['name'],
                'desc' => $res['description'],
                'price' => $res['price'],
                'weight' => $res['weight'],
                'category' => $res['c_name'],
                'type' => $res['t_name'],
                'origin' => $res['o_name']
            );
        }

        $encoded_data = json_encode($products, JSON_UNESCAPED_UNICODE || JSON_PRETTY_PRINT);
        file_put_contents('public/mock/products.json', $encoded_data);

    }

    public function getProduct(int $id) {
        $stmt = $this -> database -> connect() -> prepare('
            select products.id, name, description, price, weight, categories.c_name, types.t_name, origins.o_name
            from (((products  
                inner join categories on products.id_category = categories.id)
                inner join types on products.id_type = types.id)
                inner join origins on products.id_origins = origins.id)
            where products.id = :id
        ');

        $stmt->bindParam('id', $id, PDO::PARAM_STR);
        $stmt-> execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        $product = new Product(
            $result['id'],
            $result['name'],
            $result['description'],
            $result['price'],
            $result['c_name'],
            $result['t_name'],
            $result['o_name'],
            $result['weight']
        );


        $encoded_data = json_encode($product, JSON_PRETTY_PRINT, JSON_UNESCAPED_UNICODE);
        file_put_contents('public/mock/product.json', $encoded_data);
    }
}