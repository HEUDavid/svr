#!/bin/bash

path=/root/svr

echo "create db for wordpress, if ready, input yes..."
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

echo "update wordpress config, if ready, input yes..."
read config_ok
echo "config is ready? ${config_ok}"
