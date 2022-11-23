<?php

namespace App\Helpers;

use App\Models\EncodingJob;
use Nacho\Helpers\DataHandler;

class EncoderQueue
{
    const DATA_NAME = 'encode_jobs';

    public static function addJob(EncodingJob $job): void
    {
        DataHandler::getInstance()->addElement(self::DATA_NAME, $job);
    }
}