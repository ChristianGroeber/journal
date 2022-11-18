<?php

namespace App\Models;

use App\Helpers\JournalConfiguration;

class Media
{
    private string $name;
    private string $month;
    private string $day;
    private array $sizes;

    public function __construct(string $name, string $month, string $day, array $sizes = [])
    {
        $this->name = $name;
        $this->month = $month;
        $this->day = $day;
        $this->sizes = $sizes;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getMonth(): string
    {
        return $this->month;
    }

    public function getDay(): string
    {
        return $this->day;
    }

    public function addSize(string $size): void
    {
        $this->sizes[] = $size;
    }

    public function getSizes(): array
    {
        return $this->sizes;
    }

    public function getMediaPath(?string $size = null): string
    {
        return JournalConfiguration::mediaBaseUrl(). DIRECTORY_SEPARATOR . $this->month . DIRECTORY_SEPARATOR . $this->day . DIRECTORY_SEPARATOR . ($size ? $size . DIRECTORY_SEPARATOR : '') . $this->name;
    }

    public function getAbsolutePath(?string $size = null): string
    {
        return $_SERVER['DOCUMENT_ROOT'] . $this->getMediaPath($size);
    }

    public function getDirectory(?string $size = null): string
    {
        return JournalConfiguration::mediaBaseUrl() . DIRECTORY_SEPARATOR . $this->month . DIRECTORY_SEPARATOR . $this->day . DIRECTORY_SEPARATOR . ($size ? $size . DIRECTORY_SEPARATOR: '');
    }

    public function getAbsoluteDirectory(?string $size = null): string
    {
        return $_SERVER['DOCUMENT_ROOT'] . $this->getDirectory($size);
    }
}