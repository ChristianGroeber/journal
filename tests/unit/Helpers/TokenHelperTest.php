<?php

namespace Tests\Helpers;

use App\Helpers\TokenHelper;
use App\Models\TokenUser;
use PHPUnit\Framework\TestCase;

class TokenHelperTest extends TestCase
{
    private TokenHelper $tokenHelper;

    protected function setUp(): void
    {
        parent::setUp();

        $this->tokenHelper = new TokenHelper();
    }

    public function testGetToken(): void
    {
        $username = 'testuser';
        $token = $this->tokenHelper->getToken($username);

        $this->assertIsString($token);
        $this->assertNotEmpty($token);
    }

//    public function testIsTokenValidWithValidToken(): void
//    {
//        $username = 'testuser';
//        $token = $this->tokenHelper->getToken($username);
//
//        $users = [
//            [
//                'username' => 'testuser',
//            ],
//            [
//                'username' => 'otheruser',
//            ],
//        ];
//
//        $result = $this->tokenHelper->isTokenValid($token, $users);
//
//        $this->assertInstanceOf(TokenUser::class, $result);
//        $this->assertSame($username, $result->getUsername());
//    }

    public function testGenerateNewToken(): void
    {
        $username = 'testuser';
        $token = $this->tokenHelper->generateNewToken($username);

        $this->assertIsString($token);
        $this->assertNotEmpty($token);
    }
}
