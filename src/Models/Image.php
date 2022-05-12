<?php

namespace App\Models;

class Image
{
    private string $name;
    private string $month;
    private string $day;

    public function __construct(string $name, string $month, string $day)
    {
        $this->name = $name;
        $this->month = $month;
        $this->day = $day;
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

    public function getImagePath()
    {
        return $this->month . '/' . $this->day . '/' . $this->name;
    }
}