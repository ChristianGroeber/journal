<?php

namespace App\Helpers;

use App\Models\EncodingJob;
use Nacho\Helpers\DataHandler;

class EncoderQueue
{
    const DATA_NAME = 'encode_jobs';

    public static function addJob(EncodingJob $job): void
    {
        $jobs = DataHandler::getInstance()->readData(self::DATA_NAME);
        $jobs[] = $job->toArray();
        DataHandler::getInstance()->writeData(self::DATA_NAME, $jobs);
    }
}