<?php

namespace Tests\Models;

use App\Models\Cache;
use Nacho\ORM\TemporaryModel;
use PHPUnit\Framework\TestCase;

class CacheTest extends TestCase
{
    public function testInit()
    {
        $data = new TemporaryModel([
            'renderDate' => '2022-03-27 12:00:00',
            'content' => ['foo' => 'bar'],
        ]);
        $cache = Cache::init($data, 1);
        $this->assertInstanceOf(Cache::class, $cache);
        $this->assertEquals('2022-03-27 12:00:00', $cache->getRenderDate());
        $this->assertEquals(['foo' => 'bar'], $cache->getContent());
    }

    public function testToArray()
    {
        $cache = new Cache('2022-03-27 12:00:00', ['foo' => 'bar']);
        $expectedArray = [
            'renderDate' => '2022-03-27 12:00:00',
            'content' => ['foo' => 'bar'],
        ];
        $this->assertEquals($expectedArray, $cache->toArray());
    }

    public function testGetContent()
    {
        $cache = new Cache('2022-03-27 12:00:00', ['foo' => 'bar']);
        $this->assertEquals(['foo' => 'bar'], $cache->getContent());
    }

    public function testGetRenderDate()
    {
        $cache = new Cache('2022-03-27 12:00:00', ['foo' => 'bar']);
        $this->assertEquals('2022-03-27 12:00:00', $cache->getRenderDate());
    }
}