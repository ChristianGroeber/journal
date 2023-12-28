#!/bin/bash

chmod 644 /etc/cron.d/container_crontab
crontab -u journal /etc/cron.d/container_crontab
mkdir /var/log/cron
touch /var/log/cron/cron.log
chown journal:journal /var/log/cron/cron.log

cron