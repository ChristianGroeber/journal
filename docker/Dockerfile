FROM christiannxtlvl/php-server:7.4

ARG UID
ARG GID

COPY . /var/www/html

WORKDIR /var/www/html

RUN groupadd -o -g $GID journal_group
RUN useradd -M -N -u $UID -g $GID journal_user

RUN cp docker/apache2.conf /etc/apache2/apache2.conf

RUN mkdir -p cache secret

RUN chown -R journal_user:journal_group .