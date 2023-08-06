
//creo una clase con un constructor dandole los parametros
class Te{ 
    constructor(nombre, funcion, sabor, precio, color, id, imgCard, img ) {
        this.nombre = nombre
        this.funcion = funcion
        this.sabor = sabor
        this.precio = precio
        this.color = color
        this.id = id
        this.imgCard = imgCard
        this.img = img
        this.cantidad = 0; 
    }
}
//creo los objetos con sus respectivas caracteristicas
const te1 = new Te('Té frutos del bosque', 'relajante', 'dulce', 550, 'colorado', 1 , 'relajante.png', 'te_frutos_bosque.jpg'  );
const te2 = new Te('Té matcha', 'dijestivo', 'amargo', 1000, 'verde manzana', 2, 'diges.png', 'matcha.jpg');
const te3 = new Te('Té negro', 'energetico', 'amargo', 550, 'marron', 3, 'energia.png', 'te_negro.jpg' );


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
            <img src="img/${te.imgCard}" alt="${te.nombre}" /> 
            <p>${te.funcion}</p>

            <button class="boton-mostrar" data-id="${te.id}">Mostrar Detalles</button>
            <button class="boton-agregar" data-id="${te.id}">Agregar al Carrito</button>
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
        let mensaje = '<div class="titulo-carrito">Productos en el carrito:</div>\n' ;
        carrito.forEach((te, index) => {
            mensaje += `
            <div class="info-producto">
            <div>Nombre: ${te.nombre}</div>
            <div>Cantidad: ${te.cantidad}</div>
            <div class="botones-contenedor">
                <button class="botones-carrito" id="sumar-${index}" onclick="aumentarCantidad(${index})">+</button>
                <button class="botones-carrito" id="restar-${index}" onclick="disminuirCantidad(${index})">-</button>
                <button class="botones-carrito boton-eliminar" id="eliminar-${index}" onclick="eliminarProducto(${index})">Eliminar</button>
            </div>
        </div>\n`;
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


//funcion para que cuando hago click en el boton muestre la info de los té 
function traerTePorID(numero) {
    //aca creo un div para cajaTeElegido
    const cajaTeElegido = document.getElementById('caja-te-elegido');

    //uso un foreach para recorrer todo mi array listaDeTes
    listaDeTes.forEach(cajaDeTe => {
        //cajaDeTe por su id(propiedad proveniente de mis objetos)
        if (cajaDeTe.id == numero) {
            const mensaje =  `Nombre: ${cajaDeTe.nombre}<br>Funcion: ${cajaDeTe.funcion}
            <br>Sabor: ${cajaDeTe.sabor}<br>Color: ${cajaDeTe.color}<br>Precio: ${cajaDeTe.precio}`;//guardo los datos de mis objetos en la variable mensaje
            cajaTeElegido.innerHTML = mensaje;  //mi variable ´mensaje´ a traves de la propiedad InnerHTML me 
                                                //permite leer los datos y asignarla al div(padre) cajaTeElegido

            //aca creo un div para el bloque de texto
            const divBloqueTexto = document.createElement('div');
            divBloqueTexto.id = `div-BloqueTexto${cajaDeTe.id}`; 
            divBloqueTexto.innerHTML = mensaje;

            //aca estoy agregando el div hijo que cree arriba(divBloqueTexto) al padre (cajaTeElegido)
            cajaTeElegido.innerHTML = '';
            cajaTeElegido.appendChild(divBloqueTexto);

            //creo el elemento de la imagen guardandola en la constante imagenTe
            const imagenTe = document.createElement('img');
            imagenTe.src = `img/${cajaDeTe.img}`;
            imagenTe.alt = cajaDeTe.nombre; //esto es para q en caso de que no cargue la imagen, aparezca el nombre

            //después creo un div para la imagen (la guardo en la variable divImagen)
            const divImagen = document.createElement('div');
            divImagen.className = 'bloque-imagen'; //le pongo una clase a mi div

            divImagen.appendChild(imagenTe);//(el elemento creado imagenTe, se lo asigno a mi div creado: divImagen)
            cajaTeElegido.appendChild(divImagen);//luego ese divImagen se lo asigno al div padre( cajaTeElegido )
        }
    });
}

fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
    .then(response => response.json())
    .then(data => {
        // Aquí tienes los datos obtenidos de la API (data)
        console.log(data);

        const drinksArray = data.drinks.map(drink => ({
            idDrink: drink.idDrink,
            strDrink: drink.strDrink,
            strTags: drink.strTags,
            strVideo: drink.strVideo,
            strDrinkThumb: drink.strDrinkThumb // URL de la imagen del cóctel
        }));

        const cocktailData = {
            drinks: drinksArray
        };

        localStorage.setItem('cocktailData', JSON.stringify(cocktailData));

        // Llamar a la función para mostrar los cócteles
        displayCocktails(drinksArray);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

// Función para mostrar los cócteles en la página
function displayCocktails(drinksArray) {
    const divPadre = document.getElementById('divCocteles');

    drinksArray.forEach(drink => {
        const divHijo = document.createElement('div');
        divHijo.classList.add('divHijoCoctel');

        const nombreCocktail = document.createElement('h3');
        nombreCocktail.textContent = drink.strDrink;

        const tagsCocktail = document.createElement('p');
        tagsCocktail.textContent = drink.strTags;

        const imagenCocktail = document.createElement('img');
        imagenCocktail.src = drink.strDrinkThumb; // URL de la imagen del cóctel
        imagenCocktail.alt = drink.strDrink;

        divHijo.appendChild(nombreCocktail);
        divHijo.appendChild(tagsCocktail);
        divHijo.appendChild(imagenCocktail);

        divPadre.appendChild(divHijo);
    });
}


//fetch para la API de cocteles
/*fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
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
        {idDrink: '11007', strDrink: 'Margarita', strDrinkAlternate: null, strTags: 'IBA,ContemporaryClassic', strVideo: null },
        {idDrink: '11118', strDrink: 'Blue Margarita', strDrinkAlternate: null, strTags: null, strVideo: null},
        {idDrink: '17216', strDrink: "Tommy's Margarita", strDrinkAlternate: null, strTags: 'IBA,NewEra', strVideo: null},
        {idDrink: '16158', strDrink: 'Whitecap Margarita', strDrinkAlternate: null, strTags: null, strVideo: null}, 
        
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
*/




