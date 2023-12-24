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

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});
