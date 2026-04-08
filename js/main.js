const generateBtn = document.getElementById('generate-btn');
const paletteSizeSelect = document.getElementById('palette-size');
const paletteContainer = document.getElementById('palette-container');
const formatSelect = document.getElementById('format-select')

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

    const currentFormat = formatSelect.value;
    formatSpan.textContent = card.dataset[currentFormat];
    
    const copyBtn = document.createElement('button')
    copyBtn.className = 'copyBtn'

    copyBtn.innerHTML = '<span class="material-symbols-outlined" style="font-size 18px;">content_copy</span>'

    copyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const textToCopy = formatSpan.textContent;
        navigator.clipboard.writeText(textToCopy).then(() => {
            copyBtn.innerHTML = '<span class="material-symbols-outlined" style="font-size: 18px;">check</span>';

            setTimeout(() => {
                copyBtn.innerHTML = '<span class="material-symbols-outlined" style="font-size: 18px;">content_copy</span>';
            }, 1500);
        })
    })
    singleRow.appendChild(formatSpan);
    singleRow.appendChild(copyBtn);
    cardInfo.appendChild(singleRow);

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

function updateFormats() {
    const format = formatSelect.value;
    const cards = document.querySelectorAll('.color-card');
    cards.forEach(card => {
        const span = card.querySelector('.format-text');
        span.textContent = card.dataset[format];
    })
}
formatSelect.addEventListener('change', updateFormats);

generateBtn.addEventListener('click', () => {
    const size = parseInt(paletteSizeSelect.value);
    renderPalette(size);
    
});