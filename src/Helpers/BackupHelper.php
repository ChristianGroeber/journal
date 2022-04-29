<?php

namespace App\Helpers;

use ZipArchive;

class BackupHelper
{
    private array $toBackup;

    public function __construct()
    {
        $this->toBackup = [
            $_SERVER['DOCUMENT_ROOT'] . '/content',
            $_SERVER['DOCUMENT_ROOT'] . '/images',
            $_SERVER['DOCUMENT_ROOT'] . '/users.json',
            $_SERVER['DOCUMENT_ROOT'] . '/secret',
        ];
    }

    public function generateBackup(): string
    {
        $zip = new ZipArchive();
        $archiveName = $_SERVER['DOCUMENT_ROOT'] . '/backup/' . time() . '.zip';
        if ($zip->open($archiveName, ZipArchive::CREATE)) {
            foreach ($this->toBackup as $strToBackup) {
                $this->addToZipRecursive($zip, $strToBackup);
            }
        }
        return substr($archiveName, strlen($_SERVER['DOCUMENT_ROOT']));
    }

    private function addToZipRecursive(ZipArchive $zip, string $toBackup)
    {
        if (is_dir($toBackup)) {
            foreach (scandir($toBackup) as $newToBackup) {
                if ($newToBackup !== '.' && $newToBackup !== '..') {
                    $zip = $this->addToZipRecursive($zip, $toBackup . '/' . $newToBackup);
                }
            }
        } else {
            $prefix = $_SERVER['DOCUMENT_ROOT'];
            if (substr($toBackup, 0, strlen($prefix)) == $prefix) {
                $str = substr($toBackup, strlen($prefix));
            }
            $zip->addFile($toBackup, $str);
        }

        return $zip;
    }
}
