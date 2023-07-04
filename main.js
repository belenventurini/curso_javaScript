
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
let te = prompt("Elija un numero de Té: (frutos del bosque = 1 ,matcha = 2 ,negro = 3)")
traerTePorID(te)



//funcion con metodo push para insertar mis tres objetos dentro del array
function agregarTesALista(te) {
    listaDeTes.push(te)
}

//funcion que me trae un objeto tomando como unico referente, el id.
//utilizo el metodo forEach que recorre mi array, y en la condición compara mi objeto por el id, con la validacion
// del dato ingresado, mediante prompt  
function traerTePorID(numero) {
    //funcion validarIngreso la guerdo en mi variable numeroValido, para así poder comparar con mi objeto
    let numeroValidado = validarIngreso(numero)
    
    listaDeTes.forEach(cajaDeTes => {
        if (cajaDeTes.id == numeroValidado) {
            console.log(cajaDeTes)
        }
    });
}
//funcion que valida el dato ingresado por el usuario a traves de prompt
//en caso de escribir un numero incorrecto 
function validarIngreso(numero) {
    while (numero < 1 || numero > 3 || numero == "") 
    {
        alert("ese numero no está en el menu")
        numero = prompt("Elija un numero de Té: (frutos del bosque = 1 ,matcha = 2 ,negro = 3)")
    }

    return numero
}


