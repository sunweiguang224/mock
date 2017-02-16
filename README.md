访问:
http://10.0.68.202:10004/mockList
服务器:
ssh newssdk@10.0.68.202
启动方法:
cd /home/newssdk/mock
nohup npm run build &
杀死进程:
netstat -p | grep 10004
kill -9 进程号
