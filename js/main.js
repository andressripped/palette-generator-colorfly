const generateBtn = document.getElementById('generate-btn');
const paletteSizeSelect = document.getElementById('palette-size');
const paletteContainer = document.getElementById('palette-container');

function generateRandomHSL() {
    const hue = Math.floor(Math.random() * 361);
    const saturation = Math.floor(Math.random() * 51) + 50;
    const lightness = Math.floor(Math.random() * 41) +30;
    return { h: hue, s: saturation, l: lightness};
}

function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

function createCard(colorObj) {
    const hslString = `hsl(${colorObj.h}, ${colorObj.s}%, ${colorObj.l}%)`
    const hexString = hslToHex(colorObj.h, colorObj.s, colorObj.l);

    const card = document.createElement('div');
    card.className = 'color-card';
    card.dataset.hex = hexString;
    card.dataset.hsl = hslString;

    const colorArea = document.createElement('div');
    colorArea.className = 'color-area';
    colorArea.style.backgroundColor = hslString;

    const cardInfo = document.createElement('div');
    cardInfo.className = 'card-info';

    const singleRow = document.createElement('div');
    singleRow.className = 'code-row';

    const formatSpan = document.createElement('span');
    formatSpan.className = 'format-text';
    formatSpan.textContent = card.dataset['hex'];
    
    card.appendChild(colorArea);
    card.appendChild(cardInfo);
    
    return card;
}

function renderPalette(size) {
    paletteContainer.innerHTML = '';
    for (let i = 0; i < size; i++) {
        const colorObj = generateRandomHSL();
        const card = createCard(colorObj);
        paletteContainer.appendChild(card);
    }
}

generateBtn.addEventListener('click', () => {
    const size = parseInt(paletteSizeSelect.value);
    renderPalette(size);
    
});