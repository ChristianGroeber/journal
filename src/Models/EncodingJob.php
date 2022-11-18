<?php

namespace App\Models;

class EncodingJob
{
    private bool $completed;
    private ?int $framerate;
    private ?int $height;
    private ?int $width;
    private string $inFile;
    private string $outFile;

    public function __construct(string $inFile, string $outFile, ?int $framerate = null, ?int $height = null, ?int $width = null, bool $completed = false)
    {
        $this->framerate = $framerate;
        $this->height = $height;
        $this->width = $width;
        $this->inFile = $inFile;
        $this->outFile = $outFile;
        $this->completed = $completed;
    }

    public function isCompleted(): bool
    {
        return $this->completed;
    }

    public function getInFile(): string
    {
        return $this->inFile;
    }

    public function getOutFile(): string
    {
        return $this->outFile;
    }

    public function getFramerate(): ?int
    {
        return $this->framerate;
    }

    public function getHeight(): ?int
    {
        return $this->height;
    }

    public function getWidth(): ?int
    {
        return $this->width;
    }

    public function setFramerate(int $framerate): void
    {
        $this->framerate = $framerate;
    }

    public function setHeight(int $height): void
    {
        $this->height = $height;
    }

    public function setWidth(int $width): void
    {
        $this->width = $width;
    }

    public function toArray(): array
    {
        return [
            'height' => $this->height,
            'width' => $this->width,
            'framerate' => $this->framerate,
            'in_file' => $this->inFile,
            'out_file' => $this->outFile,
            'is_completed' => $this->completed,
        ];
    }
}