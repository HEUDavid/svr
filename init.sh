#!/bin/sh

#echo "安装docker"
#dnf config-manager --add-repo=https://download.docker.com/linux/centos/docker-ce.repo
#dnf install https://download.docker.com/linux/centos/7/x86_64/stable/Packages/containerd.io-1.4.6-3.1.el7.x86_64.rpm -y
#dnf install docker-ce -y
## systemctl disable firewalld
#systemctl enable --now docker
#echo "install pkg"
#dnf install git -y

git clone https://github.com/HEUDavid/svr.git

echo "plz upload ssl ===================> cd /root/svr/nginx/conf.d/ssl"

echo "if ssl is ready, plz input yes..."
read ssl_ok
echo "ssl is ready? ${ssl_ok}"

echo "nginx"
docker run -itd --name nginx -p 80:80 -p 443:443 -v /root/svr/nginx/conf.d:/etc/nginx/conf.d -v /root/svr/nginx/log:/var/log/nginx -v /root/svr/nginx/html:/usr/share/nginx/html nginx

echo "mysql"
echo "input passwd for root plz"
read passwd
echo "root:${passwd}"
docker run -itd --name mysql -p 4306:3306 -v /root/svr/mysql:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=${passwd} mariadb

echo "plz create database for wordpress, if database is ready, plz input yes..."
read db_ok
echo "db is ready? ${db_ok}"

echo "wordpress ---> mdavid.cn"
docker run -itd --name mdavid.cn -p 7080:80 -v /root/svr/wordpress/mdavid.cn:/var/www/html/ wordpress

sleep 2

function get_themes()
{
    cd /root/svr/wordpress/mdavid.cn/wp-content/themes;
    git clone https://github.com/HEUDavid/adams_child.git
    git clone https://github.com/Tokinx/Adams.git
}
get_themes

echo "plz update wordpress config, if wordpress config is ready, plz input yes..."
read config_ok
echo "config is ready? ${config_ok}"

echo "end"

