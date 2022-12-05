<?php

namespace App\Models;

use Nacho\Contracts\ArrayableInterface;
use Nacho\ORM\ModelInterface;
use Nacho\Security\AbstractUser;
use Nacho\Security\UserInterface;

class TokenUser extends AbstractUser implements UserInterface, ModelInterface, ArrayableInterface
{
    private string $tokenStamp = '';

    public static function init(array $data, int $id): ModelInterface
    {
        return new TokenUser($id, $data['username'], $data['role'], $data['tokenStamp'], $data['password']);
    }

    public function __construct(int $id, string $username, string $role, string $tokenStamp, ?string $password)
    {
        parent::__construct($id, $username, $role, $password);
        $this->tokenStamp = $tokenStamp;
    }

    public function getTokenStamp(): string
    {
        return $this->tokenStamp;
    }

    public function setTokenStamp(string $tokenStamp): void
    {
        $this->tokenStamp = $tokenStamp;
    }

}