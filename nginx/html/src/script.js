// script.js

// 这是一个简单的JavaScript脚本，用于在页面加载时显示弹窗
window.onload = function () {
    // 提示框显示消息
    alert('欢迎使用JavaScript脚本！');
};

document.addEventListener('DOMContentLoaded', () => {
    async function fetchData() {
        try {
            const response = await fetch('/data');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const files = await response.json();
            handleFileList(files);
        } catch (error) {
            console.error('Fetch error:', error.message);
        }
    }

    function createFileListItem(file) {
        const li = document.createElement('li');

        const span = document.createElement('span');
        span.className = 'circle';
        li.appendChild(span);

        const link = document.createElement('a');
        link.target = '_blank';
        link.href = `/data/${file.name}`;

        const date = new Date(file.mtime);
        link.textContent = `${date.toLocaleString()} ${file.name}`;

        li.appendChild(link);
        return li;
    }

    function handleFileList(files) {
        const fileListElement = document.getElementById('fileList');
        files.forEach(file => {
            const li = createFileListItem(file);
            fileListElement.appendChild(li);
        });
    }

    fetchData();
});
