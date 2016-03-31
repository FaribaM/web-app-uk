FROM ubuntu:latest

MAINTAINER @modernfidelity

RUN apt-get update -y

# Install Nginx as a Rewrite Proxy
# -----------------------------

RUN apt-get -qy install nginx
RUN apt-get -q autoclean


# Copy NGINX config for default site
COPY docker/nginx/default /etc/nginx/sites-available/default

# Copy APP folder for site
COPY build /var/www/nginx-default/

# Run sshd
# Define default command.


# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log
RUN ln -sf /dev/stderr /var/log/nginx/error.log

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

