<?php

namespace App\Models;

use App\Helpers\JournalConfiguration;
use Nacho\Contracts\ArrayableInterface;
use Nacho\ORM\AbstractModel;
use Nacho\ORM\ModelInterface;
use Nacho\ORM\TemporaryModel;

class Media extends AbstractModel implements ArrayableInterface, ModelInterface
{
    private string $name;
    private string $month;
    private string $day;
    /** @var array|ScaledMedia[] */
    private array $scaled;

    public function __construct(int $id, string $name, MediaDirectory $directory, array $scaled = [])
    {
        $this->id = $id;
        $this->name = $name;
        $this->month = $directory->getMonth();
        $this->day = $directory->getDay();
        $this->scaled = $scaled;
    }

    public static function init(TemporaryModel $data, int $id): ModelInterface
    {
        $scaled = array_map(function(array $scale) {
            return new ScaledMedia($scale->get('scaleName'), $scale->get('fileExtension'));
        }, $data->get('scaled'));

        $mediaDirectory = new MediaDirectory($data->get('month'), $data->get('day'));

        return new Media($id, $data->get('name'), $mediaDirectory, $scaled);
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
        if ($size) {
            return implode(DIRECTORY_SEPARATOR, [JournalConfiguration::mediaBaseUrl(), $this->month, $this->day, $size, $this->name . $this->getScaled($size)->getFileExtension()]);
        }
        return implode(DIRECTORY_SEPARATOR, [JournalConfiguration::mediaBaseUrl(), $this->month, $this->day, $this->name]);
    }

    public function getAbsolutePath(?string $size = null): string
    {
        return $_SERVER['DOCUMENT_ROOT'] . $this->getMediaPath($size);
    }

    public function getDirectory(?string $size = null): string
    {
        if ($size) {
            return implode(DIRECTORY_SEPARATOR, [JournalConfiguration::mediaBaseUrl(), $this->month, $this->day, $size]);
        }
        return implode(DIRECTORY_SEPARATOR, [JournalConfiguration::mediaBaseUrl(), $this->month, $this->day]);
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
            'scaled' => $this->scaled,
        ];
    }
}