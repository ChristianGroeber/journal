<?php

namespace App\Helpers;

use App\Models\TokenUser;
use Nacho\ORM\RepositoryManager;
use Nacho\Security\JsonUserHandler;
use Nacho\Contracts\UserHandlerInterface;
use Nacho\Security\UserInterface;
use Nacho\Security\UserRepository;

class TokenHelper 
{
    private UserHandlerInterface $userHandler;

    public function __construct()
    {
        $this->userHandler = new JsonUserHandler();
    }

    function getToken($username): string
    {
        $secret = self::getSecret();

        return md5($username . $this->userHandler->findUser($username)->getTokenStamp() . $secret);
    }

    public function isTokenValid($token, $users): bool|UserInterface
    {
        foreach ($users as $user) {
            if ($token === $this->getToken($user['username'])) {
                return $user;
            }
        }
        
        return false;
    }

    // Generate a fresh token
    public function generateToken($username)
    {
        $tokenStamp = md5(random_bytes(100));

        /** @var TokenUser $user */
        $user = $this->userHandler->findUser($username);
        $user->setTokenStamp($tokenStamp);

        RepositoryManager::getInstance()->getRepository(UserRepository::class)->set($user);

        return $this->getToken($username);
    }

    public static function getSecret()
    {
        $secretHelper = new SecretHelper();
        return $secretHelper->getSecret();
    }
}