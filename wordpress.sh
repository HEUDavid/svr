#!/bin/sh

path=/root/svr


echo "plz create database for wordpress, if database is ready, plz input yes..."
read db_ok
echo "db is ready? ${db_ok}"

echo "wordpress ---> mdavid.cn"
docker run -itd --name mdavid.cn --restart=always -p 7080:80 -v ${path}/wordpress/mdavid.cn:/var/www/html/ wordpress

sleep 1

function get_themes() {
  cd ${path}/wordpress/mdavid.cn/wp-content/themes
  git clone https://github.com/HEUDavid/adams_child.git
  git clone https://github.com/Tokinx/Adams.git
}
get_themes

echo "plz update wordpress config, if wordpress config is ready, plz input yes..."
read config_ok
echo "config is ready? ${config_ok}"
