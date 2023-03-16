<?php

namespace App\Models;

// TODO @refactor: Pick a more suited name for this class
class MediaDirectory
{
    private string $month;
    private string $day;

    public function __construct(string $month, string $day)
    {
        $this->month = $month;
        $this->day = $day;
    }

    public function getMonth(): string
    {
        return $this->month;
    }

    public function getDay(): string
    {
        return $this->day;
    }
}