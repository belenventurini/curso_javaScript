//Una función que suma los números pares hasta un límite 
function sumaNumerosPares(limite) {
    let suma = 0;

    for (let i = 0; i <= limite; i++) {
        if (i % 2 === 0) {
            suma += i;
        }
    }
    return suma;
}

// Invoca la función y muestra el resultado por alert
let numero = parseFloat(prompt("SUMA DE NUMEROS PARES...Ingrese un numero:"));
resultado = sumaNumerosPares(numero); 
alert(`La suma de los números pares hasta el numero ${numero} es: ${resultado}`);