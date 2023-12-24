document.addEventListener('DOMContentLoaded', () => {
    // 模拟从服务器获取数据
    const simulatedFiles = [
        {name: 'file1.txt', mtime: '2023-01-01T12:00:00Z'},
        {name: 'file2.txt', mtime: '2023-01-02T09:30:00Z'},
    ];

    // 模拟处理文件列表
    handleFileList(simulatedFiles);
});

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
