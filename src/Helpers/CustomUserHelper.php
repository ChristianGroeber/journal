<?php

namespace App\Helpers;

use Nacho\Security\JsonUserHandler;
use Nacho\Security\UserHandlerInterface;

class CustomUserHelper extends JsonUserHandler implements UserHandlerInterface
{
    public function setPassword(string $username, string $newPassword)
    {
        $user = $this->findUser($username);
        $user['password'] = password_hash(TokenHelper::getSecret() . $newPassword, PASSWORD_DEFAULT);
        $this->changeUser($user);

        return $user;
    }

    public function passwordVerify(string $username, string $password): bool
    {
        $secret = TokenHelper::getSecret();
        $user = $this->findUser($username);

        if (!$user) {
            throw new \Exception('Unable to find this user');
        }

        return password_verify($secret . $password, $user['password']);
    }

    private function changeUser(array $newUser): void
    {
        $json = $this->getUsers();
        foreach ($json as $key => $user) {
            if ($user['username'] === $newUser['username']) {
                $json[$key] = $newUser;
                break;
            }
        }
        file_put_contents(FILE_PATH, json_encode($json));
    }
}
