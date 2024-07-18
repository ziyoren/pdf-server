#!/bin/bash

if [ ! -f "node-v8.17.0-linux-x64.tar.xz" ]; then
    wget https://nodejs.org/dist/v8.17.0/node-v8.17.0-linux-x64.tar.xz
fi

if [ ! -f "phantomjs-2.1.1-linux-x86_64.tar.bz2" ]; then
    wget https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-2.1.1-linux-x86_64.tar.bz2
fi

tar -xzf node-v8.17.0-linux-x64.tar.xz
tar -xzf phantomjs-2.1.1-linux-x86_64.tar.bz2

docker build -t pdf-server .

rm -rf node-v8.17.0-linux-x64
rm -rf phantomjs-2.1.1-linux-x86_64

# 不自动删除软件的压缩包，方便重复构建开发环境时使用。等开发完成，可手动删除。
