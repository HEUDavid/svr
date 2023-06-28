# 基础镜像
FROM centos:7

# 设置时区
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/${TZ} /etc/localtime && echo ${TZ} > /etc/timezone


# 安装常用工具和 SSH 服务
RUN yum -y update && \
    yum -y install vim git lrzsz openssh-server && \
    yum clean all && \
    rm -rf /var/cache/yum

# 安装 Python3 和 Go
RUN yum -y install python3 golang && \
    yum clean all && \
    rm -rf /var/cache/yum


# 配置 OpenSSH 服务器
RUN ssh-keygen -t rsa -f /etc/ssh/ssh_host_rsa_key -N '' && \
    sed -i 's/#PermitRootLogin yes/PermitRootLogin yes/' /etc/ssh/sshd_config && \
    echo "root:password" | chpasswd

# 暴露22端口
EXPOSE 22

# 挂载/workspace目录到宿主机
VOLUME [ "/workspace" ]

CMD ["/usr/sbin/sshd", "-D"]
