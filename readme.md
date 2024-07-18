# HTML to PDF converter

This is a simple nodejs script that uses the html-pdf library to convert an HTML file into a PDF.

## about html-pdf

[html-pdf](https://www.npmjs.com/package/html-pdf) is a node library that uses the [phantomjs](http://phantomjs.org/) headless browser

[html-pdf](html-pdf.md)

## 开发环境

详见 [开发环境说明](./dev-docker/readme.md)

## 构建生产环境镜像

开发完成后，直接运行 `./build.sh` 即可生成一个 `pdf-server` 的镜像。

## 运行生产环境镜像
```bash
docker run -itd --name pdf-server \
    -p 8000:80 \
    -v /my/work/pdf:/tmp/pdf \
    pdf-server
```

命令行说明
- `-itd` 运行一个容器，并进入后台运行模式
- `--name pdf-server` 指定容器名称
- `-p 8000:80` 将容器的 80 端口映射到宿主机的 8000 端口
- `-v /my/work/pdf:/tmp/pdf` 将宿主机的 `/my/work/pdf` 目录映射到容器的 `/tmp/pdf` 目录
- `pdf-server` 指定要运行的镜像名称

## 访问服务
在浏览器中输入 `http://localhost:8000/` 即可访问服务。

## 安全提示
本服务无用户权限认证机制，建议不要在公网环境公开使用。如果需要开放到公网，请配合一定的安全认证机制。