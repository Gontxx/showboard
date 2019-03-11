#!/usr/bin/env bash

echo -e "\033[32m"
echo "##############################################"
echo "#             Auto-Launch System             #"
echo "##############################################"
echo "pku2018!)#)"
echo "##############################################"
echo -e "\033[0m"

echo "当前上线服务器：39.106.6.6"
addr="root@39.106.6.6"
path="/root/web/"

npm run build
tar -cf dist.tar dist
echo "输入服务器密码，上传dist文件夹"
scp -r dist.tar $addr:$path
echo "再次输入服务器密码，确认覆盖dist"
ssh -tt "$addr" "cd $path && tar -xvf dist.tar"
