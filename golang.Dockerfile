FROM golang:latest


# 安装必要工具
RUN apt-get update && \
    apt-get -y upgrade && \
    apt-get install -y git vim lrzsz openssh-server curl wget


# 配置SSH
RUN mkdir /var/run/sshd
RUN echo 'root:password_for_update' | chpasswd
RUN sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config
RUN sed -i 's/#PasswordAuthentication yes/PasswordAuthentication yes/' /etc/ssh/sshd_config


RUN echo "export GOPATH=/go" >> ~/.bashrc && \
    echo "export PATH=$PATH:/usr/local/go/bin:$GOPATH/bin" >> ~/.bashrc


# 暴露22端口
EXPOSE 22

# 挂载/workspace目录到宿主机
VOLUME [ "/workspace" ]

CMD ["/usr/sbin/sshd", "-D"]
