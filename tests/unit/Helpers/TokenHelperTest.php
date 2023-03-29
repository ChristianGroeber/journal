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
        $user = $this->getMockUser();

        $token = $this->tokenHelper->getToken($user);

        $this->assertIsString($token);
        $this->assertNotEmpty($token);
        $this->assertEquals('6a204bd89f3c8348afd5c77c717a097a', $token);
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
}
