# !/bin/bash

if [ -z "${USER_UID}" ]; then
     usermod -u $USER_UID journal
fi
if [ -z "${USER_GID}" ]; then
     groupmod -g $USER_GID journal
fi

mkdir /var/www/html/var
chown -R journal:journal /var/www/html

echo "{\"UID\":\"${UID}\",\"GID\":\"${GID}\"}" > /etc/cron_env.json

MY_INI_FILE=/usr/local/etc/php/conf.d/my.ini
touch $MY_INI_FILE
echo "memory_limit = 200M" >> $MY_INI_FILE
echo "upload_max_filesize = 200M" >> $MY_INI_FILE
echo "post_max_size = 200M" >> $MY_INI_FILE

/root/cron_start.sh

apache2-foreground