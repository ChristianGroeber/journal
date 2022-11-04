<?php

namespace App\Helpers;

use ZipArchive;

class BackupHelper
{
    private array $toBackup;
    const IMAGES_DIR = '/var/www/html/images';
    const CONTENT_DIR = '/var/www/html/content';

    public function __construct()
    {
        $this->toBackup = [
            $_SERVER['DOCUMENT_ROOT'] . '/content',
            $_SERVER['DOCUMENT_ROOT'] . '/images',
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

    public function restoreFromBackup(string $backupPath): bool
    {
        $outDir = '/tmp/' . md5(time());
        $zip = new ZipArchive();
        $zip->open($backupPath);
        $zip->extractTo($outDir);
        $zip->close();
        self::clearDirectory(self::IMAGES_DIR);
        self::clearDirectory(self::CONTENT_DIR);

        move_uploaded_file($outDir . '/content', self::CONTENT_DIR);
        move_uploaded_file($outDir . '/images', self::IMAGES_DIR);

        return true;
    }

    private static function clearDirectory(string $dir)
    {
        foreach (scandir($dir) as $path) {
            self::rmdir_recursive($path);
        }
    }

    private static function rmdir_recursive(string $dir)
    {
        if (is_dir($dir)) {
            $objects = scandir($dir);
            foreach ($objects as $object) {
                if ($object != "." && $object != "..") {
                    if (is_dir($dir. DIRECTORY_SEPARATOR .$object) && !is_link($dir."/".$object))
                        self::rmdir_recursive($dir. DIRECTORY_SEPARATOR .$object);
                    else
                        unlink($dir. DIRECTORY_SEPARATOR .$object);
                }
            }
            rmdir($dir);
        } elseif (is_file($dir)) {
            unlink($dir);
        }
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
