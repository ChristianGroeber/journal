<?php

namespace App\Helpers;

use App\Models\TokenUser;
use Nacho\ORM\RepositoryManager;
use Nacho\Security\JsonUserHandler;
use Nacho\Contracts\UserHandlerInterface;
use Nacho\Security\UserRepository;

class CustomUserHelper extends JsonUserHandler implements UserHandlerInterface
{
    public function setPassword(string $username, string $newPassword)
    {
        /** @var TokenUser $user */
        $user = $this->findUser($username);
        $this->setPasswordForUser($user, $newPassword);

        return $user;
    }

    public function setPasswordForUser(TokenUser $user, string $newPassword): TokenUser
    {
        $passwordHash = password_hash(TokenHelper::getSecret() . $newPassword, PASSWORD_DEFAULT);
        $user->setPassword($passwordHash);
        RepositoryManager::getInstance()->getRepository(UserRepository::class)->set($user);

        return $user;
    }

    public function passwordVerify(string $username, string $password): bool
    {
        $secret = TokenHelper::getSecret();
        $user = $this->findUser($username);

        if (!$user) {
            throw new \Exception('Unable to find this user');
        }

        return password_verify($secret . $password, $user->getPassword());
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
