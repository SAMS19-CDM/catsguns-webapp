// Referencias a los elementos del DOM
const startBtn = document.getElementById('startBtn'); // Botón de inicio en la página principal
const miningPage = document.getElementById('miningPage'); // Página de minería
const welcomePage = document.getElementById('welcome'); // Página de bienvenida
const timerDisplay = document.getElementById('timer'); // Mostrará el tiempo restante
const balanceDisplay = document.getElementById('balance'); // Muestra el balance principal
const minedAmountDisplay = document.getElementById('minedAmount'); // Muestra la cantidad de minería por segundo
const miningBtn = document.getElementById('miningBtn'); // Botón de "Start Mining" o "Claim"
const backBtnMining = document.getElementById('backBtnMining'); // Botón para volver a la página principal

// Variables globales
let miningStarted = false; // Indica si la minería está en proceso
let timerInterval; // Intervalo del temporizador
let miningAmount = 0; // Monto acumulado de minería
let mainBalance = 0; // Balance principal
let secondsLeft = 14400; // 4 horas en segundos (14400)

// Función para mostrar la página de minería al hacer clic en "Start"
startBtn.addEventListener('click', () => {
  welcomePage.style.display = 'none';  // Ocultar la página de bienvenida
  miningPage.style.display = 'block';  // Mostrar la página de minería
});

// Función para comenzar la minería (contemporizador y acumulación de balance)
function startMining() {
  timerInterval = setInterval(() => {
    secondsLeft--;
    const hours = Math.floor(secondsLeft / 3600);
    const minutes = Math.floor((secondsLeft % 3600) / 60);
    const seconds = secondsLeft % 60;

    // Mostrar el tiempo restante
    timerDisplay.textContent = `${hours}:${minutes}:${seconds}`;

    // Si el contador llega a 0, detener la minería
    if (secondsLeft <= 0) {
      clearInterval(timerInterval); // Detener el intervalo del temporizador
    }

    // Incrementar el balance de minería por segundo
    miningAmount += 0.002; // Por cada segundo se ganan 0.002 CG
    updateUI(); // Actualizar la interfaz de usuario
  }, 1000);
}

// Función para actualizar la UI con el balance principal y el progreso de la minería
function updateUI() {
  balanceDisplay.textContent = `Balance Principal: ${mainBalance.toFixed(3)} CG`;
  minedAmountDisplay.textContent = `Mining: ${miningAmount.toFixed(3)} CG`;
  timerDisplay.textContent = formatTime(secondsLeft);  // Formatear y mostrar el tiempo
}

// Función para formatear el tiempo de la cuenta regresiva (horas:minutos:segundos)
function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours}:${minutes}:${secs}`;
}

// Función para cambiar el botón de "Start Mining" a "Claim" y viceversa
miningBtn.addEventListener('click', () => {
  if (!miningStarted) {
    // Comienza la minería
    miningStarted = true;
    startMining(); // Inicia la minería
    miningBtn.textContent = "Claim"; // Cambiar el texto del botón a "Claim"
  } else {
    // Al hacer clic en "Claim":
    // Sumar el balance minado al balance principal
    mainBalance += miningAmount;

    // Reiniciar el balance de minería y el contador de tiempo
    miningAmount = 0;
    secondsLeft = 14400;  // Reinicia el tiempo a 4 horas

    // Detener la minería y actualizar el botón
    clearInterval(timerInterval);
    miningStarted = false;
    miningBtn.textContent = "Start Mining";  // Cambiar a "Start Mining"

    // Actualizar la UI con el nuevo balance
    updateUI();
  }
});
