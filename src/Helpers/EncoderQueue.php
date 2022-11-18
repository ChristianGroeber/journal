<?php

namespace App\Helpers;

use App\Models\EncodingJob;

class EncoderQueue
{
    private static array $jobs = [];
    const JOBS_FILE = '/data/encode_jobs.json';

    public static function writeJobs(): void
    {
        file_put_contents(self::getJobsFile(), json_encode(self::$jobs));
    }

    public static function readJobs(): void
    {
        if (!is_file(self::getJobsFile())) {
            self::$jobs = [];
        } else {
            self::$jobs = json_decode(file_get_contents(self::getJobsFile()), true);
        }
    }

    public static function clearJobs(): void
    {
        self::$jobs = [];
        self::writeJobs();
    }

    public static function addJob(EncodingJob $job): void
    {
        self::$jobs[] = $job->toArray();
    }

    private static function getJobsFile(): string
    {
        return $_SERVER['DOCUMENT_ROOT'] . self::JOBS_FILE;
    }
}