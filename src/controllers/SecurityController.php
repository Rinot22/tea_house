<?php

require_once 'AppController.php';
require_once __DIR__.'/../models/User.php';
require_once __DIR__.'/../repository/UserRepository.php';

class SecurityController extends AppController {
    public function login() {
        if(!$this->isPost()) {
            return $this->render('login');
        }

        $userRepository = new UserRepository();

        $email = $_POST['email'];
        $password = $_POST['password'];

        $user = $userRepository->getUser($email);

        if (!$user) {
            return $this->render('login', ['messages' => ["User doesn't exist"]]);
        }


        if ($user->getEmail() !== $email) {
            return $this->render('login', ['messages' => ["Email or password is incorrect"]]);
        }

        if (!password_verify($password, $user->getPassword())) {
            return $this->render('login', ['messages' => ["Email or password is incorrect"]]);
        }

//        return $this->render('main-page');
        $url = "http://$_SERVER[HTTP_HOST]";
        header("Location: {$url}/main");
    }

    public function registration() {
        if (!$this->isPost()) {
            return $this->render('signin');
        }

        $userRepository = new UserRepository();

        $email = $_POST['email'];
        $password = $_POST['password'];
        $name = $_POST['name'];
        $surname = $_POST['surname'];
        $id = time() + (86400 * 30);

        $user = $userRepository->getUser($email);

        if ($user) {
            return $this->render('signin', ['messages' => ["This email is already used"]]);
        }

        $userRepository->addUser($id, $name, $surname, $email, $password);
        $user = $userRepository->getUser($email);

        setcookie('id', $user -> getId(), time() + (86400 * 30), '/');
        $_SESSION['id'] = $user -> getId();

        $url = "http://$_SERVER[HTTP_HOST]";
        header("Location: {$url}/profile");
    }

}