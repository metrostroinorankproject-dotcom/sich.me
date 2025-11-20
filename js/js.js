window.addEventListener('scroll', function () {
    const header = this.document.querySelector('header');
    if (this.window.scrollY > 0) {
        header.classList.add('scroll');
    } else {
        header.classList.remove('scroll');
    }
});

const serverId = "36427473";
const apiUrl = `https://api.battlemetrics.com/servers/${serverId}`;

function fetchServerStatus() {
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            const players = data.data.attributes.players;
            const online = data.data.attributes.status === "online";

            document.getElementById('playerCount').textContent = players;

            const statusIndicator = document.querySelector('.status-indicator');
            const statusText = document.getElementById('span__status');

            statusIndicator.classList.remove('status-indicator-online', 'status-indicator-offline');
            if (online) {
                statusIndicator.classList.add('status-indicator-online');
                statusText.textContent = 'Онлайн';
            } else {
                statusIndicator.classList.add('status-indicator-offline');
                statusText.textContent = 'Офлайн';
            }
        })
        .catch(err => {
            console.error(err);
            document.getElementById('playerCount').textContent = '...';
            const statusIndicator = document.querySelector('.status-indicator');
            const statusText = document.getElementById('span__status');

            statusIndicator.classList.remove('status-indicator-online', 'status-indicator-offline');
            statusIndicator.style.background = 'gray';
            statusText.textContent = '...';
        });
}

fetchServerStatus();
setInterval(fetchServerStatus, 300000);

let popupBack = document.querySelector('.popup__back');
let popupPlatformsWindow = document.querySelector('.popup__platform');
let closeBtn = document.querySelector('.popup__close');

function popupPlatforms() {
    popupBack.style.display = 'flex';
    popupBack.style.opacity = '0';
    popupPlatformsWindow.style.transform = 'scale(0.8)';
    requestAnimationFrame(() => {
        popupBack.style.transition = 'opacity 0.3s ease';
        popupPlatformsWindow.style.transition = 'transform 0.3s ease';
        popupBack.style.opacity = '1';
        popupPlatformsWindow.style.transform = 'scale(1)';
    });
}

closeBtn.addEventListener('click', () => {
    popupBack.style.opacity = '0';
    popupPlatformsWindow.style.transform = 'scale(0.8)';
    setTimeout(() => {
        popupBack.style.display = 'none';
    }, 300);
});