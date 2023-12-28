import json
import subprocess
import os
import datetime


now = datetime.datetime.now().strftime('%x %X')
print('Started transcoding at ' + now)


class Job:
    width = None
    height = None
    framerate = None
    in_file = None
    out_file = None
    is_completed = None

    def __init__(self, height, width, framerate, in_file, out_file, is_completed):
        self.height = height
        self.width = width
        self.framerate = framerate
        self.in_file = in_file
        self.out_file = out_file
        self.is_completed = is_completed

    def transcode_command(self):
        return "/usr/bin/ffmpeg -i \"" + self.in_file + "\" -s " + str(self.width) + "x" + str(self.height) + " -r " + \
               str(self.framerate) + " \"" + self.out_file + "\""

    def get_target_directory(self):
        print(self.out_file)
        spl_path = self.out_file.split('/')
        spl_path.pop(len(spl_path) - 1)
        return '/'.join(spl_path)

    def create_target_directory(self):
        if not os.path.isdir(self.get_target_directory()):
            os.mkdir(self.get_target_directory())

    def transcode(self):
        print("Starting transcoding file " + self.in_file + " -> " + self.out_file)
        with subprocess.Popen(self.transcode_command(), stdout=subprocess.PIPE, shell=True) as proc:
            print(proc.stdout.read())
            self.is_completed = True
            print("Done transcoding file " + self.in_file)

    def to_array(self):
        return {'width': self.width, 'height': self.height, 'framerate': self.framerate, 'in_file': self.in_file,
                'out_file': self.out_file, 'is_completed': self.is_completed}


file_dir = '/var/www/html/data/encoding-job.json'
jobs_file = open(file_dir, 'r')
jobs = json.loads(jobs_file.read())
jobs_file.close()

arr_jobs = []

jobs_executed = 0

for arr_job in jobs:
    job = Job(arr_job['height'], arr_job['width'], arr_job['framerate'], arr_job['in_file'], arr_job['out_file'], arr_job['is_completed'])
    if os.path.isfile(job.in_file) and not job.is_completed:
        job.create_target_directory()
        job.transcode()
        jobs_executed += 1
    arr_jobs.append(job.to_array())

print('Successfully executed ' + str(jobs_executed) + ' jobs')

jobs_file = open(file_dir, 'w')
jobs_file.write(json.dumps(arr_jobs))
jobs_file.close()
