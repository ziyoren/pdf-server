FROM ubuntu:18.04
COPY node-v8.17.0-linux-x64 /usr/local/node
COPY phantomjs-2.1.1-linux-x86_64 /usr/local/phantomjs
WORKDIR /app
EXPOSE 80

RUN apt-get update && apt-get install -y libssl-dev zlib1g-dev openssl libfontconfig1 fonts-noto-cjk \
  && ldconfig \
  && apt-get clean \
  && rm -fr /var/lib/apt/lists/*

ENV LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/lib64
ENV PHANTOMJS_BIN=/usr/local/phantomjs/bin/phantomjs
ENV PATH=/usr/local/node/bin:/usr/local/phantomjs/bin:$PATH

