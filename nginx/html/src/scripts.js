function loadBackground() {
    const background = document.getElementById('background');
    fetch('src/background.html')
        .then(response => response.text())
        .then(data => {
            background.innerHTML = data;
        });
}

window.onload = loadBackground;
