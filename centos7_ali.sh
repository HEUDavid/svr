#!/bin/sh

echo "fs.inotify.max_user_watches=524288" >> /etc/sysctl.conf
sysctl -p

# 系统更新
yum update -y

# 安装必备工具
yum install curl git vim lrzsz -y

# 下载初始化脚本
git clone https://github.com/HEUDavid/svr.git
path=/root/svr

printf "请输入密码：\n"
read passwd
echo "passwd: ${passwd}"

# 安装docker
printf "正在安装docker...\n"
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
rm get-docker.sh

# 开机自启docker
systemctl enable docker

# 启动
systemctl start docker

# 自定义镜像启动
printf "启动自定义镜像...\n"
sed -i "s/password_for_update/${passwd}/g" "${path}/python.Dockerfile"
sed -i "s/password_for_update/${passwd}/g" "${path}/golang.Dockerfile"

docker build -f "${path}/python.Dockerfile" -t my-python-image "${path}"
docker build -f "${path}/golang.Dockerfile" -t my-golang-image "${path}"

docker run -d -p 2222:22 --restart=always --name python-container -v "${path}/workspace:/workspace" my-python-image
docker run -d -p 3222:22 --restart=always --name golang-container -v "${path}/workspace:/workspace" my-golang-image

printf "部署完成！\n"
