FROM christiangroeber/php-server:7.4.2

COPY . /var/www/html

WORKDIR /var/www/html

RUN groupadd -o -g 100 journal_group
RUN useradd -M -N -u 99 -g 100 journal_user

RUN cp docker/apache2.conf /etc/apache2/apache2.conf

RUN mkdir -p cache secret

RUN chown -R journal_user:journal_group .