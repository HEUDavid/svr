#!/bin/bash

# 需要启动的服务项
containers=(
	"nginx"
	"v2ray"
	"python"
	"golang"
)
echo 'all containers:'
printf '%s\n' "${containers[@]}"

printf "请输入密码：\n"
read passwd
printf "请输入uuid：\n"
read uuid
echo "passwd: $passwd"
echo "uuid: $uuid"

printf "如果已确认，请输入yes...\n"
read ready
if [ "$ready" != "yes" ]; then
	printf "信息有误，退出部署...\n"
	exit 1
fi

apt update -y
# 安装必备工具
apt install -y curl git vim lrzsz wget

# 下载初始化脚本
git clone https://github.com/HEUDavid/svr.git
path=/root/svr

# 安装docker
printf "正在安装docker...\n"
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
rm get-docker.sh
# 开机自启docker
systemctl enable docker
# 启动
systemctl restart docker

if printf '%s\n' "${containers[@]}" | grep -q 'nginx'; then
	printf "请上传SSL证书至 ${path}/nginx/conf.d/ssl\n"
	printf "如果已确认，请输入yes...\n"
	read ready
	if [ "$ready" != "yes" ]; then
		printf "信息有误，退出部署...\n"
		exit 1
	fi

	printf "证书文件如下：\n"
	ls ${path}/nginx/conf.d/ssl

	printf "启动Nginx容器...\n"
	docker run -itd --name openresty --restart=always -p 80:80 -p 443:443 -v "${path}/nginx/conf.d:/etc/nginx/conf.d" -v "${path}/workspace/data:/data" openresty/openresty:latest
fi

if printf '%s\n' "${containers[@]}" | grep -q 'v2ray'; then
	printf "启动V2Ray容器...\n"
	sed -i "s/uuid_for_update/${uuid}/g" "${path}/v2ray/config.json"
	docker run -d -p 10086:10086 --name v2ray --restart=always -v "${path}/v2ray/config.json:/etc/v2fly/config.json" v2fly/v2fly-core run -c /etc/v2fly/config.json
fi

if printf '%s\n' "${containers[@]}" | grep -q 'python'; then
	printf "启动Python容器...\n"
	sed -i "s/password_for_update/${passwd}/g" "${path}/python.Dockerfile"
	docker build -f "${path}/python.Dockerfile" -t my-python-image "${path}"
	docker run -d -p 2222:22 --restart=always --name python-container -v "${path}/workspace:/workspace" my-python-image
fi

if printf '%s\n' "${containers[@]}" | grep -q 'golang'; then
	printf "启动Golang容器...\n"
	sed -i "s/password_for_update/${passwd}/g" "${path}/golang.Dockerfile"
	docker build -f "${path}/golang.Dockerfile" -t my-golang-image "${path}"
	docker run -d -p 3222:22 --restart=always --name golang-container -v "${path}/workspace:/workspace" my-golang-image
fi

printf "部署完成！\n"
