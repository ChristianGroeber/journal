FROM php:8.4-apache

ARG UID=1000
ARG GID=1000

MAINTAINER 'pixlmint'

ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/
RUN chmod +x /usr/local/bin/install-php-extensions

RUN apt update && apt install -y mediainfo cron ffmpeg python3

RUN install-php-extensions gd
RUN install-php-extensions dbase
RUN install-php-extensions ssh2
RUN install-php-extensions bcmath
RUN install-php-extensions exif
RUN install-php-extensions @composer
RUN install-php-extensions zip
RUN install-php-extensions opcache
RUN install-php-extensions xdebug

RUN groupadd -o -g ${GID} journal
RUN useradd -M -N -u ${UID} -g ${GID} journal

COPY docker/crontab /etc/cron.d/container_crontab
COPY docker/apache2.conf /etc/apache2/apache2.conf
COPY docker/cron_start.sh /root/cron_start.sh
COPY docker/startup.sh /root/startup.sh
COPY docker/dev_startup.sh /root/dev_startup.sh

RUN echo "{\"UID\":\"${UID}\",\"GID\":\"${GID}\"}" > /etc/cron_env.json

# apache
RUN a2dismod mpm_event && \
  a2enmod mpm_prefork && \
  a2enmod rewrite && \
  a2enmod headers && \
  a2enmod authz_groupfile && \
  a2enmod expires && \
  a2enmod substitute && \
  a2enmod proxy && \
  a2enmod proxy_http

RUN chmod +x /root/dev_startup.sh
RUN chmod +x /root/startup.sh
RUN chmod +x /root/cron_start.sh

CMD ["/bin/bash", "-c", "/root/dev_startup.sh"]
