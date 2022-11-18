# !/bin/bash

# Read Jobs that have to get done

# Get Video Framerate and Height x Width
fps=mediainfo in.mp4 | grep "Frame rate"
print fps

# Transcode Video
# ffmpeg -i in.mp4 -s 1080x720 -r 30 out2.webm

# Move Transcoded Video into defined Target Directory