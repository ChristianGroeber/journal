# PixlJournal
A minimal, lightweight, file-based journaling website built with [my own PHP framework](https://github.com/christiangroeber/Nacho) and Vue

## Backstory
In 2018, I had a little blog during my 3 Weeks in Paris where I documented my time there. 
Looking back at that I get very sentimental and I figured, since I'm not someone to have a book journal, I would much rather do something like that with my own Website.

## Installation
This document only covers the installation using docker. It is possible to do a local installation, but it really is heavily recommended to go the docker way.

If you still need to install docker, go here: [docs.docker.com/engine/install](https://docs.docker.com/engine/install/)

This image requires 3 volumes:
- **Media**: This Volume is used to store all of your media (images, videos, and in the future possibly also audio files). *Mountpoint*: `/var/www/html/media`
- **Content**: Here, all your markdown files will be stored. *Mountpoint*: `/var/www/html/content`
- **Data**: This is where the "Database" is stored (Json files, for example what users are enabled on your website). *Mountpoint*: `/var/www/html/data`

Alternatively, you can simply mount the entire project directory into a volume.

Run these commands to start the project:
- `docker volume create journal_media && docker volume create journal_content && docker volume create journal_data`
- `docker run -v journal_media:/var/www/html/media -v journal_content:/var/www/html/content -v journal_data:/var/www/html/data -p 80:80 --container-name journal christiangroeber/journal:latest`

## Troubleshooting
If you run into a problem please create an issue