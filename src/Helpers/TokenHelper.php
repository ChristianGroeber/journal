<?php

namespace App\Helpers;

use App\Models\TokenUser;
use Nacho\Exceptions\UserDoesNotExistException;
use Nacho\ORM\ModelInterface;
use Nacho\ORM\RepositoryManager;
use Nacho\ORM\TemporaryModel;
use Nacho\Security\JsonUserHandler;
use Nacho\Contracts\UserHandlerInterface;
use Nacho\Security\UserInterface;
use Nacho\Security\UserRepository;

class TokenHelper
{
    public function getToken(TokenUser $user): string
    {
        $secret = SecretHelper::getSecret();
        $tokenStamp = $user->getTokenStamp();

        return md5($tokenStamp . $secret);
    }

    public function isTokenValid($token, $users): bool
    {
        try {
            $this->getUserByToken($token, $users);
            return true;
        } catch (UserDoesNotExistException $e) {
        }
        return false;
    }

    // TODO: Unit test this function
    public function getUserByToken(string $token, array $users): UserInterface|ModelInterface
    {
        foreach ($users as $user) {
            if ($token === $this->getToken($user['username'])) {
                return TokenUser::init(new TemporaryModel($user), 0);
            }
        }

        throw new UserDoesNotExistException('This User does not exist or the provided token is invalid');
    }

    public function generateNewTokenStamp(TokenUser &$user): void
    {
        $tokenStamp = md5(random_bytes(100));

        $user->setTokenStamp($tokenStamp);
    }
}