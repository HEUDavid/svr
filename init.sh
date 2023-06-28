#!/bin/sh

# 系统更新
#yum update

# 安装必备工具
yum install git vim lrzsz -y

# echo "安装docker"
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# 开机自启
systemctl enable docker

# 启动
systemctl start docker

# 下载初始化脚本
git clone https://github.com/HEUDavid/svr.git

path=/root/svr

echo "plz upload ssl ===================> cd ${path}/nginx/conf.d/ssl"

echo "if ssl is ready, plz input yes..."
read ssl_ok
echo "ssl is ready? ${ssl_ok}"

echo "nginx"
docker run -itd --name nginx --restart=always -p 80:80 -p 443:443 -v ${path}/nginx/conf.d:/etc/nginx/conf.d -v ${path}/nginx/log:/var/log/nginx -v ${path}/nginx/html:/usr/share/nginx/html nginx

echo "mysql"
echo "input passwd for root plz"
read passwd
echo "root:${passwd}"
docker run -itd --name mysql --restart=always -p 4306:3306 -v ${path}/mysql:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=${passwd} mariadb

echo "my_dev"
docker build -t my-dev-image .
docker run -d -p 2222:22 --name my-dev-container -v ${path}/workspace:/workspace my-dev-image

echo "end"
