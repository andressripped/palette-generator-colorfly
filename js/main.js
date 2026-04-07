const generateBtn = document.getElementById('generate-btn')
const paletteSizeSelect = document.getElementById('palette-size')

function generateRandomHSL() {
    const hue = Math.floor(Math.random() * 361);
    const saturation = Math.floor(Math.random() * 51) + 50;
    const lightness = Math.floor(Math.random() * 41) +30;
    return { h: hue, s: saturation, l: lightness};
}

generateBtn.addEventListener('click', () => {
    const size = parseInt(paletteSizeSelect.value);
    console.log("Colores solicitados:", size);
    for (let i = 0; i < size; i++){
        console.log("Color crudo generado:", generateRandomHSL());
    }
});