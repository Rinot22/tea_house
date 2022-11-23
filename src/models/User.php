<?php

class User {
    private $email;
    private $password;
    private $name;
    private $surname;
    private $cartID;
    private $phoneNumber;
    private $city;
    private $address;
    private $role;
    private $userID;

    public function __construct(
        int $userID,
        int $cartID = null,
        string $email,
        string $password,
        string $name,
        string $surname,
        string $phoneNumber,
        string $city,
        string $address = null,
        string $role
    ) {
        $this -> email = $email;
        $this -> password = $password;
        $this -> name = $name;
        $this -> surname = $surname;
        $this -> phoneNumber = $phoneNumber;
        $this -> city = $city;
        $this -> address = $address;
        $this -> role = $role;
        $this -> userID = $userID;
        $this -> cartID = $cartID;
    }

    /**
     * @return string
     */
    public function getEmail(): string
    {
        return $this->email;
    }

    /**
     * @return string
     */
    public function getPassword(): string
    {
        return $this->password;
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
    public function getSurname(): string
    {
        return $this->surname;
    }

    /**
     * @return int|null
     */
    public function getCartID(): int
    {
        return $this->cartID;
    }

    /**
     * @return string
     */
    public function getPhoneNumber(): string
    {
        return $this->phoneNumber;
    }

    /**
     * @return string
     */
    public function getCity(): string
    {
        return $this->city;
    }

    /**
     * @return string|null
     */
    public function getAddress(): string
    {
        return $this->address;
    }

    /**
     * @return string
     */
    public function getRole(): string
    {
        return $this->role;
    }

    /**
     * @return int
     */
    public function getUserID(): int
    {
        return $this->userID;
    }


}