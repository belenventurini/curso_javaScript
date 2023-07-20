
//creo una clase con un constructor dandole los parametros
class Te {
    constructor(nombre, funcion, sabor, precio, color, id) {
        this.nombre = nombre
        this.funcion = funcion
        this.sabor = sabor
        this.precio = precio
        this.color = color
        this.id = id
    }
}
//creo los objetos con sus respectivas caracteristicas
const te1 = new Te('frutos del bosque', 'antioxidante', 'dulce', 550, 'colorado', 1);
const te2 = new Te('matcha', 'dijestivo', 'amargo', 1000, 'verde manzana', 2);
const te3 = new Te('negro', 'energetico', 'amargo', 550, 'oscuro', 3);

//hago un array vacio, en donde después a taves del metodo push, inserto mis objetos ahi adentro
const listaDeTes = []


agregarTesALista(te1);
agregarTesALista(te2);
agregarTesALista(te3);

//mediante un prompt solicito al usuario que elija según el numero, uno de los tres objetos 
// let te = prompt("Elija un numero de Té: (frutos del bosque = 1 ,matcha = 2 ,negro = 3)")

let cajaTeElegido = document.getElementById("cajaTeElegido");

const boton3 = document.getElementById('boton3');

boton3.addEventListener('click', () => {
    traerTePorID(3); 
});

const objeto1JSON = JSON.stringify(te1);
const objeto2JSON = JSON.stringify(te2);
const objeto3JSON = JSON.stringify(te3);
localStorage.setItem('objetoGuardado1', objeto1JSON);
localStorage.setItem('objetoGuardado2', objeto2JSON);
localStorage.setItem('objetoGuardado3', objeto3JSON);

const objetoJSONRecuperado1 = localStorage.getItem('objetoGuardado1');
const objetoRecuperado1 = JSON.parse(objetoJSONRecuperado1);

const objetoJSONRecuperado2 = localStorage.getItem('objetoGuardado2');
const objetoRecuperado2 = JSON.parse(objetoJSONRecuperado2);

const objetoJSONRecuperado3 = localStorage.getItem('objetoGuardado3');
const objetoRecuperado3 = JSON.parse(objetoJSONRecuperado3);
console.log(objetoJSONRecuperado1)
console.log(objetoRecuperado2)
console.log(objetoRecuperado3)

//funcion con metodo push para insertar mis tres objetos dentro del array
function agregarTesALista(te) {
    listaDeTes.push(te)
}

//funcion que me trae un objeto tomando como unico referente, el id.
//utilizo el metodo forEach que recorre mi array, y en la condición compara mi objeto por el id, con la validacion
// del dato ingresado, mediante prompt  
function traerTePorID(numero) {

    listaDeTes.forEach(cajaDeTe => {
        if (cajaDeTe.id == numero) {
            const mensaje = `Nombre: ${cajaDeTe.nombre}\nDescripción: ${cajaDeTe.funcion}\nPrecio: ${cajaDeTe.precio}`;
            cajaTeElegido.textContent = mensaje;
            // console.log(mensaje)
        }
    });
}




