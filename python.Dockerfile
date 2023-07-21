FROM python:latest


# 安装必要工具
RUN apt-get update && \
    apt-get -y upgrade && \
    apt-get install -y git vim lrzsz openssh-server curl wget


# 配置SSH
RUN mkdir /var/run/sshd
RUN echo 'root:password_for_update' | chpasswd
RUN sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config
RUN sed -i 's/#PasswordAuthentication yes/PasswordAuthentication yes/' /etc/ssh/sshd_config


RUN cat > /root/.bashrc <<EOF
# ~/.bashrc: executed by bash(1) for non-login shells.

PS1='\${debian_chroot:+(\$debian_chroot)}\[\033[01;32m\]\u\[\033[00m\] \[\033[01;34m\]\$(basename "\$PWD")\[\033[00m\] \[\033[01;91m\]%\[\033[00m\] '

LS_OPTIONS='--color=auto'
eval "\$(dircolors)"
alias ls='ls "\$LS_OPTIONS"'
alias ll='ls "\$LS_OPTIONS" -l'
alias l='ls "\$LS_OPTIONS" -lA'

alias rm='rm -i'
alias cp='cp -i'
alias mv='mv -i'

alias cdp='cd /workspace/py-project'
export TZ='Asia/Shanghai'

export PATH='/workspace/py-project/.v/bin:\$PATH'
export PYTHONPATH='/workspace/py-project/.v/lib/python3.11/site-packages:\$PYTHONPATH'

EOF


RUN git config --global user.email "admin@mdavid.cn"
RUN git config --global user.name "David Xiang"


# 暴露22端口
EXPOSE 22

# 挂载/workspace目录到宿主机
VOLUME [ "/workspace" ]

CMD ["/usr/sbin/sshd", "-D"]
