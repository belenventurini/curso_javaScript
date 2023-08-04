
//creo una clase con un constructor dandole los parametros
class Te{ 
    constructor(nombre, funcion, sabor, precio, color, id, img) {
        this.nombre = nombre
        this.funcion = funcion
        this.sabor = sabor
        this.precio = precio
        this.color = color
        this.id = id
        this.img = img
        this.cantidad = 0; 
    }
}
//creo los objetos con sus respectivas caracteristicas
const te1 = new Te('frutos del bosque', 'relajante', 'dulce', 550, 'colorado', 1 );
const te2 = new Te('matcha', 'dijestivo', 'amargo', 1000, 'verde manzana', 2);
const te3 = new Te('negro', 'energetico', 'amargo', 550, 'marron', 3);


//Array vacio, en donde a taves del metodo push, inserto mis objetos(té) dentro
const listaDeTes = []

//funcion con metodo push para insertar mis tres objetos dentro del array
function agregarTesALista(te) {
    listaDeTes.push(te)
}
agregarTesALista(te1);
agregarTesALista(te2);
agregarTesALista(te3);


//Array de carrito de compras vacio
const carrito = [];
//funcion que agrega los productos seleccionados, al carrito de compras 
function agregarAlCarrito(teId) {
    const te = arrayObjetosRecuperado.find(te => te.id === teId);
    if (te) {
        te.cantidad++;
        carrito.push(te);
    }
}



//Convierno mi array de objetos(té) a JSON
const arrayObjetosJSON = JSON.stringify(listaDeTes);
console.log(arrayObjetosJSON)
//Guardo mi array de objetos(té) en formato JSON en el local storage
localStorage.setItem('arrayObjetosGuardado', arrayObjetosJSON);

//obtengo el array de mi localstorage, pero esta en formato string
const arrayObjetosRecuperadoJSON = localStorage.getItem('arrayObjetosGuardado');
//por lo tanto vuelvo a hacer que sea un array con .parse, guardandolo en la variable arrayObjetosRecuperado
const arrayObjetosRecuperado = JSON.parse(arrayObjetosRecuperadoJSON);


//funcion que me muestra los objetos de té, en el html, a traves de un foreach
function mostrarCards() {
    const contenedorTe = document.getElementById('contenedor');

    arrayObjetosRecuperado.forEach(te => {
        const divTe = document.createElement('div');
        divTe.id = `div-${te.id}`;
        divTe.innerHTML = `
            <h2>${te.nombre}</h2>
            <p><strong>Función:</strong> ${te.funcion}</p>
            <p><strong>Sabor:</strong> ${te.sabor}</p>
            <p><strong>Precio:</strong> $${te.precio}</p>
            <p><strong>Color:</strong> ${te.color}</p>
            
            <button class="boton-mostrar" data-id="${te.id}">Mostrar Detalles</button>
            <button class="boton-agregar" data-id="${te.id}">Agregar al Carrito</button>
            
            <!-- Agrega más propiedades aquí si lo deseas -->
        `;
        contenedorTe.appendChild(divTe);
    });


    const botonMostrar = document.querySelectorAll('.boton-mostrar');
    botonMostrar.forEach((boton, index)  => {
        boton.id = `botonMostrar-${index}`;
        boton.addEventListener('click', (event) => {
            const teId = parseInt(event.target.getAttribute('data-id'));
            traerTePorID(teId);
        });
    });

    const botonAgregar = document.querySelectorAll('.boton-agregar');
    botonAgregar.forEach((boton, index) => {
        boton.id = `botonAgregar-${index}`;
        boton.addEventListener('click', (event) => {
            

            const teId = parseInt(event.target.getAttribute('data-id'));
            agregarAlCarrito(teId);

            Swal.fire({
                title: 'Producto Agregado',
                text: 'El producto se ha añadido al carrito',
                icon: 'success',
                confirmButtonText: 'Ok'
            });
        });
    });
}
mostrarCards();

//Función que muestra el contenido del carrito en un alert al hacer clic en el icono del carrito
function mostrarCarrito() {
    if (carrito.length === 0) {
        alert('El carrito está vacío.');
    } else {
        let mensaje = 'Productos en el carrito:\n';
        carrito.forEach((te, index) => {
            mensaje += `
            Nombre: ${te.nombre}, Cantidad: ${te.cantidad}
            <button id="sumar-${index}" onclick="aumentarCantidad(${index})">+</button>
            <button id="restar-${index}" onclick="disminuirCantidad(${index})">-</button>
            <button id="eliminar-${index}" onclick="eliminarProducto(${index})">Eliminar</button>\n`;
        });
        Swal.fire({
            titule: 'Productos en el Carrito',
            html: mensaje,
            icon: 'info',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Continuar Comprando',
            denyButtonText: `Comprar`
        }).then((result) => {
            if (result.isConfirmed) {
                // Continuar comprando 
            } else if (result.isDenied) {
                Swal.fire({
                    title: 'Confirmar compra',
                    text: '¿Estás seguro que desea realizar la compra?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Sí, comprar',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Tu compra ha sido realizada con exito',
                            showConfirmButton: false,
                            timer: 2000
                        });
                    }
                });
            }
        });
    }
}


  //funciones de los botones dentro del alert del carrito de compras
function aumentarCantidad(index) {
    carrito[index].cantidad++;
    mostrarCarrito();
}
function disminuirCantidad(index) {
    if (carrito[index].cantidad > 0) {
        carrito[index].cantidad--;
        mostrarCarrito();
    }
}
function eliminarProducto(index) {
    carrito.splice(index, 1);
    mostrarCarrito();
}


//funcion para que cuando hace click en el boton muestre la info de los té 
function traerTePorID(numero) {
    const cajaTeElegido = document.getElementById('caja-te-elegido');

    listaDeTes.forEach(cajaDeTe => {
        if (cajaDeTe.id == numero) {
            const mensaje =  `Nombre: ${cajaDeTe.nombre}<br>Funcion: ${cajaDeTe.funcion}
            <br>Sabor: ${cajaDeTe.sabor}<br>Color: ${cajaDeTe.color}<br>Precio: ${cajaDeTe.precio}`;
            cajaTeElegido.innerHTML = mensaje;
        }
    });
}

//fetch para la API de cocteles
fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
    .then(response => response.json())
    .then(data => {
    // Aquí tienes los datos obtenidos de la API (data)
    console.log(data);
    })
    .catch(error => {
    console.error('Error fetching data:', error);
    });
//aca guardo el array que me presentó la API
    const drinksArray = [
        {idDrink: '11007', strDrink: 'Margarita', strDrinkAlternate: null, strTags: 'IBA,ContemporaryClassic', strVideo: null},
        {idDrink: '11118', strDrink: 'Blue Margarita', strDrinkAlternate: null, strTags: null, strVideo: null},
        {idDrink: '17216', strDrink: "Tommy's Margarita", strDrinkAlternate: null, strTags: 'IBA,NewEra', strVideo: null},
    ]
    const data = {
        drinks: drinksArray
    };
//el array de la api pasado a string JSON
    localStorage.setItem('cocktailData', JSON.stringify(data));
//Recupero los datos del localStorage y los convierto en un objeto JavaScript
    const storedData = localStorage.getItem('cocktailData');
    if (storedData) {
    const parsedData = JSON.parse(storedData);//con el parse
    const drinksArray = parsedData.drinks;
    
//el div padre en el que muestro los cócteles
    const divPadre = document.getElementById('divCocteles');

// Itero sobre los objetos de la matriz drinks(de la API) y creo tmb los elementos HTML
    drinksArray.forEach(drink => {
        const divHijo = document.createElement('div');
        divHijo.classList.add('divHijoCoctel'); // los div de cada coctel Puedes aplicar estilos CSS aquí

        const nombreCocktail = document.createElement('h3');
        nombreCocktail.textContent = drink.strDrink;

        const tagsCocktail = document.createElement('p');
        tagsCocktail.textContent = drink.strTags;

        // Agregar los elementos al div hijo
        divHijo.appendChild(nombreCocktail);
        divHijo.appendChild(tagsCocktail);

        // Agregar el div hijo al div padre
        divPadre.appendChild(divHijo);
    });
    }





