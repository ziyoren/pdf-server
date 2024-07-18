FROM ubuntu:18.04
# node-v8.17.0-linux-x64 可以从dev-docker目录下解压得到
COPY node-v8.17.0-linux-x64 /usr/local/node 
# phantomjs-2.1.1-linux-x86_64 请解压dev-docker/phantomjs-2.1.1-linux-x86_64.tar.bz2获取
COPY phantomjs-2.1.1-linux-x86_64 /usr/local/phantomjs
COPY pdf-server/. /app
WORKDIR /app
EXPOSE 80

RUN apt-get update && apt-get install -y libssl-dev zlib1g-dev openssl libfontconfig1 fonts-noto-cjk \
  && ldconfig \
  && apt-get clean \
  && rm -fr /var/lib/apt/lists/*

ENV LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/lib64
ENV PHANTOMJS_BIN=/usr/local/phantomjs/bin/phantomjs
ENV PATH=/usr/local/node/bin:/usr/local/phantomjs/bin:$PATH

CMD [ "node", "pdf-server.js" ]