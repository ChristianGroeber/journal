FROM christiangroeber/php-server:8.1.2

ARG UID
ARG GID

COPY . /var/www/html

WORKDIR /var/www/html

RUN composer install

RUN groupadd -o -g ${GID} journal_group
RUN useradd -M -N -u ${UID} -g ${GID} journal_user

RUN cp docker/apache2.conf /etc/apache2/apache2.conf

RUN mkdir -p cache secret

RUN chown -R journal_user:journal_group .

# Cron
RUN apt update && apt install -y mediainfo cron ffmpeg python3
COPY docker/crontab /etc/cron.d/container_crontab
COPY docker/cron_start.sh /root/cron_start.sh

RUN chmod +x /root/cron_start.sh
RUN echo "{\"UID\":\"${UID}\",\"GID\":\"${GID}\"}" > /etc/cron_env.json

CMD ["/bin/bash", "-c", "/root/cron_start.sh && apache2-foreground"]