# ZIYO PDF Server 开发镜像

## 构建镜像

执行本目录下的 build.sh 脚本，构建镜像。您可以得到一个名为 pdf-server-dev 的镜像。

Dockerfile默认安装了`fonts-noto-cjk`字体，可以支持中文。如需安装其他字体，请自行修改 Dockerfile。

## 运行镜像

返回项目根目录，执行以下命令：
```sh
docker run -itd \
 --name pdf-server \
 -p 8000:80 \
 -v ./pdf-server:/app \
 -v ./pdf:/tmp/pdf \
 pdf-server-dev
```

命令行说明
- -itd: 交互式容器，后台运行
- --name: 容器名称（pdf-server）可以自定义
- -p: 端口映射 宿主机端口（8000）:容器端口（80）
- -v: 目录映射 宿主机目录（./pdf-server）:容器目录（/app）主程序目录
- -v: 目录映射 宿主机目录（./pdf）:容器目录（/tmp/pdf） 存放pdf文件的目录
- 镜像名称（pdf-server-dev）


## 进入容器
```sh
docker exec -it pdf-server bash
```

## 安装依赖
```sh
cd /app
npm install
```
## 启动服务
```sh
node pfd-server.js
```

## 访问服务
浏览器访问 [http://localhost:8000/](http://localhost:8000/) 即可看到服务API说明。
