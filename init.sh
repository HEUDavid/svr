#!/bin/sh

# 系统更新
yum update -y

# 安装必备工具
yum install curl git vim lrzsz -y

# 安装docker
printf "正在安装docker...\n"
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
rm get-docker.sh

# 开机自启docker
systemctl enable docker

# 启动
systemctl start docker

# 下载初始化脚本
git clone https://github.com/HEUDavid/svr.git
path=/root/svr

printf "请上传SSL证书至 ${path}/nginx/conf.d/ssl\n"
printf "如果准备好，请输入yes...\n"
read ssl_ok
if [ "$ssl_ok" != "yes" ]; then
  printf "SSL证书未准备好，退出部署...\n"
  exit 1
fi

# Nginx容器启动
printf "启动Nginx容器...\n"
docker run -itd --name nginx --restart=always -p 80:80 -p 443:443 -v "${path}/nginx/conf.d:/etc/nginx/conf.d" -v "${path}/nginx/log:/var/log/nginx" -v "${path}/nginx/html:/usr/share/nginx/html" nginx

# MySQL容器启动
printf "启动MySQL容器...\n"
printf "请输入root用户的密码：\n"
read -s passwd
docker run -itd --name mysql --restart=always -p 4306:3306 -v "${path}/mysql:/var/lib/mysql" -e MYSQL_ROOT_PASSWORD="${passwd}" mariadb

# V2Ray容器启动
printf "启动V2Ray容器...\n"
printf "请先修改${path}/v2ray/config.json文件中的uuid字段\n"
read uuid_ok
if [ "$uuid_ok" != "yes" ]; then
  printf "请先修改uuid字段，然后重新执行脚本...\n"
  exit 1
fi

docker run -d -p 10086:10086 --name v2ray --restart=always -v "${path}/v2ray/config.json:/etc/v2fly/config.json" -v "${path}/v2ray/log:/var/log/v2ray" v2fly/v2fly-core run -c /etc/v2fly/config.json

# 自定义镜像启动
printf "启动自定义镜像...\n"
printf "请先修改ssh登录密码\n"
read passwd_ok
if [ "$passwd_ok" != "yes" ]; then
  printf "请先修改ssh登录密码，然后重新执行脚本...\n"
  exit 1
fi

docker build -t my-python-image -f python.Dockerfile "${path}"
docker build -t my-golang-image -f golang.Dockerfile "${path}"

docker run -d -p 2222:22 --name python-container -v "${path}/workspace:/workspace" my-python-image
docker run -d -p 3222:22 --name golang-container -v "${path}/workspace:/workspace" my-golang-image

printf "部署完成！\n"
