<?php

namespace Tests\Helpers;

use App\Helpers\SecretHelper;
use App\Helpers\TokenHelper;
use App\Models\TokenUser;
use PHPUnit\Framework\TestCase;

class TokenHelperTest extends TestCase
{
    private TokenHelper $tokenHelper;
    const TEST_SECRET = 'test';

    protected function setUp(): void
    {
        parent::setUp();

        $this->tokenHelper = new TokenHelper();
        SecretHelper::setSecret(self::TEST_SECRET);
    }

    public function testGetToken(): void
    {
        $user = $this->getMockUser();

        $testToken = md5($user->getTokenStamp() . self::TEST_SECRET);

        $token = $this->tokenHelper->getToken($user);

        $this->assertIsString($token);
        $this->assertNotEmpty($token);
        $this->assertEquals($testToken, $token);
    }

    public function testGetUserByToken(): void
    {
        $users = $this->getUsersArray();

        $testToken = md5($users[1]['tokenStamp'] . self::TEST_SECRET);

        $user = $this->tokenHelper->getUserByToken($testToken, $users);

        $this->assertInstanceOf(TokenUser::class, $user);
        $this->assertEquals('testuser1', $user->getUsername());
    }

    public function testGenerateNewTokenStamp(): void
    {
        $user = $this->getMockUser();
        $user->setTokenStamp('');
        $this->tokenHelper->generateNewTokenStamp($user);

        $newStamp = $user->getTokenStamp();

        $this->assertIsString($newStamp);
        $this->assertNotEmpty($newStamp);
    }

    private function getMockUser(): TokenUser
    {
        return new TokenUser(0, 'testuser', 'ROLE_ADMIN', 'asdf', 'asdf', null, 'testuser@pixlmint.ch');
    }

    private function getUsersArray(): array
    {
        return [
            [
                'id' => 0,
                'username' => 'testuser0',
                'tokenStamp' => 'test0',
                'email' => 'testuser0@pixlmint.ch',
                'role' => 'ROLE_READER',
            ],
            [
                'id' => 1,
                'username' => 'testuser1',
                'tokenStamp' => 'test1',
                'email' => 'testuser1@pixlmint.ch',
                'role' => 'ROLE_READER',
            ],
            [
                'id' => 2,
                'username' => 'testuser2',
                'tokenStamp' => 'test2',
                'email' => 'testuser2@pixlmint.ch',
                'role' => 'ROLE_READER',
            ],
        ];
    }
}
