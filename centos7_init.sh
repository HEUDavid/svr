#!/bin/sh

# 系统更新
yum update -y

# 安装必备工具
yum install curl git vim lrzsz ntp -y

# 校准服务器时间，使用谷歌时间服务
timedatectl set-timezone Asia/Hong_Kong
sed -i "s/0.centos.pool.ntp.org/216.239.35.0/g" /etc/ntp.conf
sed -i "s/1.centos.pool.ntp.org/216.239.35.4/g" /etc/ntp.conf
sed -i "s/2.centos.pool.ntp.org/216.239.35.8/g" /etc/ntp.conf
sed -i "s/3.centos.pool.ntp.org/216.239.35.12/g" /etc/ntp.conf
systemctl disable chronyd
systemctl stop chronyd
systemctl enable ntpd
systemctl start ntpd
echo "CentOS 7时区设置完成！当前时间为：$(date)"

# 下载初始化脚本
git clone https://github.com/HEUDavid/svr.git

path=/root/svr
printf "请上传SSL证书至 ${path}/nginx/conf.d/ssl\n"

printf "请输入密码：\n"
read passwd
printf "请输入uuid：\n"
read uuid

printf "证书文件如下：\n"
ls ${path}/nginx/conf.d/ssl
echo "passwd: ${passwd}"
echo "uuid: ${uuid}"

printf "如果确认ok，请输入yes...\n"
read ready
if [ "$ready" != "yes" ]; then
  printf "信息有误，退出部署...\n"
  exit 1
fi

# 安装docker
printf "正在安装docker...\n"
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
rm get-docker.sh

# 开机自启docker
systemctl enable docker

# 启动
systemctl start docker

# Nginx容器启动
printf "启动Nginx容器...\n"
docker run -itd --name nginx --restart=always -p 80:80 -p 443:443 -v "${path}/nginx/conf.d:/etc/nginx/conf.d" -v "${path}/nginx/log:/var/log/nginx" -v "${path}/nginx/html:/usr/share/nginx/html" nginx

# MySQL容器启动
printf "启动MySQL容器...\n"
docker run -itd --name mysql --restart=always -p 4306:3306 -v "${path}/mysql:/var/lib/mysql" -e MYSQL_ROOT_PASSWORD="${passwd}" mariadb

# V2Ray容器启动
printf "启动V2Ray容器...\n"
sed -i "s/uuid_for_update/${uuid}/g" "${path}/v2ray/config.json"
docker run -d -p 10086:10086 --name v2ray --restart=always -v "${path}/v2ray/config.json:/etc/v2fly/config.json" -v "${path}/v2ray/log:/var/log/v2ray" v2fly/v2fly-core run -c /etc/v2fly/config.json

# 自定义镜像启动
printf "启动自定义镜像...\n"
sed -i "s/password_for_update/${passwd}/g" "${path}/python.Dockerfile"
sed -i "s/password_for_update/${passwd}/g" "${path}/golang.Dockerfile"

docker build -f "${path}/python.Dockerfile" -t my-python-image "${path}"
docker build -f "${path}/golang.Dockerfile" -t my-golang-image "${path}"

docker run -d -p 2222:22 --restart=always --name python-container -v "${path}/workspace:/workspace" my-python-image
docker run -d -p 3222:22 --restart=always --name golang-container -v "${path}/workspace:/workspace" my-golang-image

printf "部署完成！\n"