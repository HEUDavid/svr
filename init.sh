#!/bin/sh

# 新建david用户
useradd david
passwd david

# 赋予sudo权限
usermod -aG wheel david

# 安装必备工具
sudo yum install git vim -y

# echo "安装docker"
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# 启动
systemctl start docker

# 下载初始化脚本
git clone https://github.com/HEUDavid/svr.git

echo "plz upload ssl ===================> cd /home/david/svr/nginx/conf.d/ssl"

echo "if ssl is ready, plz input yes..."
read ssl_ok
echo "ssl is ready? ${ssl_ok}"

echo "nginx"
docker run -itd --name nginx -p 80:80 -p 443:443 -v /home/david/svr/nginx/conf.d:/etc/nginx/conf.d -v /root/svr/nginx/log:/var/log/nginx -v /root/svr/nginx/html:/usr/share/nginx/html nginx

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


