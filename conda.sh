dd if=/dev/zero of=/swapfile bs=1M count=2048
chmod 600 /swapfile   # 设置权限
mkswap /swapfile      # 格式化为交换空间
swapon /swapfile      # 启用交换空间
swapon --show


mkdir -p ~/miniconda3
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O ~/miniconda3/miniconda.sh
bash ~/miniconda3/miniconda.sh -b -u -p ~/miniconda3
~/miniconda3/bin/conda init bash


conda config --add channels conda-forge
conda config --get channels

conda create -n myenv python=3.9
conda activate myenv

conda install -c conda-forge ta-lib
