<?php

require_once 'Repository.php';
require_once __DIR__.'/../models/User.php';

class UserRepository extends Repository {
    public function getUser(string $email): ?User {
        $stmt = $this->database->connect()->prepare('
            SELECT * FROM public.users WHERE email = :email
        ');

        $stmt->bindParam('email', $email, PDO::PARAM_STR);
        $stmt->execute();

        $user=$stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user) {
            return null;
        }

        return new User(
            $user['id'],
            $user['email'],
            $user['password'],
            $user['name'],
            $user['surname']
        );
    }

    public function addUser(int $id, string $name, string $surname, string $email, string $password) {
        $stmt = $this->database->connect()->prepare('
            INSERT INTO public.users (id, name, surname, email, password)
            VALUES (?, ?, ?, ?, ?)
        ');

        $stmt->execute([
            $id,
            $name,
            $surname,
            $email,
            password_hash($password, PASSWORD_DEFAULT)
        ]);
    }
}