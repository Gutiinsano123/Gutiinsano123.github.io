let intervalo;
let datos = {
  x0: 0,
  v: 0,
  t: 0,
  tiempoActual: 0,
  posiciones: [],
  tiempos: []
};

const ctxCanvas = document.getElementById('canvas').getContext('2d');
const graficoCtx = document.getElementById('grafico').getContext('2d');

let grafico;

function iniciarSimulacion() {
  datos.x0 = parseFloat(document.getElementById('x0').value);
  datos.v = parseFloat(document.getElementById('v').value);
  datos.t = parseFloat(document.getElementById('time').value);
  datos.tiempoActual = 0;
  datos.posiciones = [];
  datos.tiempos = [];

  if (grafico) grafico.destroy();

  grafico = new Chart(graficoCtx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Posición (x)',
        borderColor: 'blue',
        data: [],
        fill: false
      }]
    },
    options: {
      responsive: false,
      animation: false,
      scales: {
        x: { title: { display: true, text: 'Tiempo (s)' } },
        y: { title: { display: true, text: 'Posición (m)' } }
      }
    }
  });

  clearCanvas();
  intervalo = setInterval(simularPaso, 500);
}

function simularPaso() {
  if (datos.tiempoActual > datos.t) {
    clearInterval(intervalo);
    return;
  }

  const x = datos.x0 + datos.v * datos.tiempoActual;

  datos.posiciones.push(x);
  datos.tiempos.push(datos.tiempoActual);

  actualizarGrafico();
  dibujarObjeto(x);
  datos.tiempoActual += 1;
}

function actualizarGrafico() {
  grafico.data.labels = datos.tiempos;
  grafico.data.datasets[0].data = datos.posiciones;
  grafico.update();
}

function dibujarObjeto(x) {
  clearCanvas();
  const escala = 10;
  ctxCanvas.fillStyle = 'red';
  ctxCanvas.fillRect(x * escala, 30, 20, 20); // rectángulo rojo
}

function clearCanvas() {
  ctxCanvas.clearRect(0, 0, 600, 100);
}

function reiniciarSimulacion() {
  clearInterval(intervalo);
  datos = { x0: 0, v: 0, t: 0, tiempoActual: 0, posiciones: [], tiempos: [] };
  clearCanvas();
  if (grafico) grafico.destroy();
}
