FROM python:3.10
# setup environment variable  
ENV DockerHOME=/home/app/webapp  

# set work directory  
RUN mkdir -p $DockerHOME  

# where your code lives  
WORKDIR $DockerHOME  

# set environment variables  
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1  

# install dependencies  
RUN pip install --upgrade pip  
RUN apt update && apt install --reinstall ca-certificates

# copy whole project to your docker home directory. 
COPY . $DockerHOME
COPY .certs $DockerHOME
# run this command to install all dependencies  
RUN pip install -r requirements.txt  

# start server  
CMD python proxy.py
