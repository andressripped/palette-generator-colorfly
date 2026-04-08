const generateBtn = document.getElementById('generate-btn');
const paletteSizeSelect = document.getElementById('palette-size');
const paletteContainer = document.getElementById('palette-container');

function generateRandomHSL() {
    const hue = Math.floor(Math.random() * 361);
    const saturation = Math.floor(Math.random() * 51) + 50;
    const lightness = Math.floor(Math.random() * 41) +30;
    return { h: hue, s: saturation, l: lightness};
}

function createCard(colorObj) {
    const hslString = `hsl(${colorObj.h}, ${colorObj.s}%, ${colorObj.l}%)`

    const card = document.createElement('div');
    card.className = 'color-card';

    const colorArea = document.createElement('div');
    colorArea.className = 'color-area';
    colorArea.style.backgroundColor = hslString;

    card.appendChild(colorArea);
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