<?php

namespace App\Models;

use App\Helpers\JournalConfiguration;
use Nacho\Contracts\ArrayableInterface;

class Media implements ArrayableInterface
{
    private string $name;
    private string $month;
    private string $day;
    /** @var array|ScaledMedia[] */
    private array $scaled;

    public function __construct(string $name, string $month, string $day, array $scaled = [])
    {
        $this->name = $name;
        $this->month = $month;
        $this->day = $day;
        $this->scaled = $scaled;
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

    public function addScaled(ScaledMedia $scaled): void
    {
        $this->scaled[] = $scaled;
    }

    public function getScaled(string $size): ?ScaledMedia
    {
        foreach ($this->scaled as $scaled) {
            if ($scaled->getScaleName() === $size) {
                return $scaled;
            }
        }

        return null;
    }

    public function getMediaPath(?string $size = null): string
    {
        return implode(DIRECTORY_SEPARATOR, [JournalConfiguration::mediaBaseUrl(), $this->month, $this->day, $this->name . ($size ? $size . '.' . $this->getScaled($size)->getFileExtension() : '')]);
    }

    public function getAbsolutePath(?string $size = null): string
    {
        return $_SERVER['DOCUMENT_ROOT'] . $this->getMediaPath($size);
    }

    public function getDirectory(?string $size = null): string
    {
        return implode(DIRECTORY_SEPARATOR, [JournalConfiguration::mediaBaseUrl(), $this->month, $this->day, $size ?: '']);
    }

    public function getAbsoluteDirectory(?string $size = null): string
    {
        return $_SERVER['DOCUMENT_ROOT'] . $this->getDirectory($size);
    }

    public function toArray(): array
    {
        return [
            'month' => $this->month,
            'day' => $this->day,
            'name' => $this->name,
        ];
    }
}