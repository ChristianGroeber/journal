<?php

namespace App\Models;

use Nacho\Contracts\ArrayableInterface;
use Nacho\ORM\AbstractModel;
use Nacho\ORM\ModelInterface;

class Cache extends AbstractModel implements ModelInterface, ArrayableInterface
{
    private string $renderDate;
    private array $content = [];

    public static function init(array $data, int $id): ModelInterface
    {
        return new Cache($data['renderDate'], $data['content']);
    }

    public function __construct(string $renderDate, array $content)
    {
        $this->id = 0;
        $this->renderDate = $renderDate;
        $this->content = $content;
    }

    public function toArray(): array
    {
        return [
            'renderDate' => $this->renderDate,
            'content' => $this->content,
        ];
    }

    public function getContent(): array
    {
        return $this->content;
    }

    public function getRenderDate(): string
    {
        return $this->renderDate;
    }
}