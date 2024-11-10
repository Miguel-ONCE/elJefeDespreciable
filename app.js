'use strict'

const getday = new Date().getDay();

function insertImage(img) {
    const template =  `
        <img src="${img}" alt="Imagen dinámica">
    `
    return template
}

const imagenes = [
    'img/imagen4.jpg',
    'img/imagen5.jpg',
    'img/imagen6.jpg',
    'img/imagen1.jpg',
    'img/imagen2.jpg',
    'img/imagen7.jpg',
    'img/imagen3.jpg',
];

for (let day = 0; day <= 7; day++) {
    if (day == getday) {
        $('.image').append(insertImage(imagenes[day]))
        if (day == 4) {
            $('.easter_egg').append(`<img src="img/asuka.gif" alt="Asuka GIF">`)    
        }
    }
}

function exportarDatos() {

    const formulario = document.getElementById('miFormulario');
    const nombre = formulario.nombre.value;
    const edad = formulario.edad.value;

    const encabezados = 'Nombre,Edad\n';
    const datos = `${nombre},${edad}\n`;

    const blob = new Blob([encabezados + datos], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.download = 'datos.csv';

    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);

    URL.revokeObjectURL(url);
}

async function fusionarArchivos() {
    const input = document.getElementById('inputCSV');
    const archivos = input.files;
    if (archivos.length === 0) {
        alert("Por favor, selecciona al menos un archivo CSV.");
        return;
    }

    let todasLasFilas = [];
    let encabezado = null;

    for (let archivo of archivos) {
        const texto = await archivo.text();
        const lineas = texto.trim().split('\n');

        if (!encabezado) {
            encabezado = lineas[0];
            todasLasFilas.push(encabezado);
        }

        const filas = lineas.slice(1);
        todasLasFilas.push(...filas);
    }

    const contenidoCSV = todasLasFilas.join('\n');
    
    const blob = new Blob([contenidoCSV], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.download = 'archivo_fusionado.csv';

    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);

    URL.revokeObjectURL(url);
    
}   