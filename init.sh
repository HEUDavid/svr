#!/bin/sh

echo "安装docker"
dnf config-manager --add-repo=https://download.docker.com/linux/centos/docker-ce.repo
dnf install https://download.docker.com/linux/centos/7/x86_64/stable/Packages/containerd.io-1.4.6-3.1.el7.x86_64.rpm -y
dnf install docker-ce -y
# systemctl disable firewalld
systemctl enable --now docker


echo "install pkg"
dnf install git -y

echo "nginx"
git clone https://github.com/HEUDavid/svr.git
docker run -itd --name nginx -p 80:80 -p 443:443 -v /root/svr/nginx/conf.d:/etc/nginx/conf.d -v /root/svr/nginx/log:/var/log/nginx -v /root/svr/nginx/html:/usr/share/nginx/html nginx

echo "wordpress"
docker run -itd --name mdavid.cn -p 7080:80 -v /root/svr/www/mdavid.cn:/var/www/html/ wordpress

echo "db"
docker run -itd --name mysql -p 4306:3306 -v /root/svr/mysql:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 mariadb


