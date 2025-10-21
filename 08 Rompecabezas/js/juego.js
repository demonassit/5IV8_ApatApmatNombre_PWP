
var instrucciones = [
    "Utiliza las flechas de navegación para mover las piezas, ",
    "Para Ordenar las piezas guiate por la imagen Objetivo"
];

//vamos a guardar dentro de una variable los movimientos del rompecabezas
var movimientos = [];

//vamos a crear una matriz para saber las posiciones del rompecabezas
var rompe = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

//vamos a tener que crear una matriz donde tengamos las posiciones correctas

var rompeCorrecta = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

//necesito saber las coordenadas de la pieza vacia, la que se va a mover
var filaVacia = 2;
var columnaVacia = 2;

//necesitamos ahora si una funcion que se encargue de mostrar las intrucciones

function mostrarInstrucciones(instrucciones){
    for(var i = 0; i < instrucciones.length; i++){
        mostrarIntruccionesLista(instrucciones[i], "lista-instrucciones");
    }
} 

//esta funcion se encarga de crear el componente li y agregar la lista de dichas instrucciones

function mostrarIntruccionesLista(instruccion, idLista){
    var ul = document.getElementById(idLista);
    var li = document.createElement("li");
    li.textContent = instruccion;
    ul.appendChild(li);
}

//vamos a crear una funcion para saber que gano
function checarSiGano(){
    for(var i = 0; i < rompe.length; i++){  
        for(var j = 0; j < rompe[i].length; j++){
            var rompeActual = rompe[i][j];
            if(rompeActual !== rompeCorrecta[i][j]){
                return false;
            }
        }
    }
    return true;
}

//mostrar en html si se gano
function mostrarCartelGanador(){
    if(checarSiGano()){
        alert("Felicidades, ganaste el juego");
    }
    return false;
}

/*
    necesitamos una funcion que se encargue de poder intercambiar las posiciones de la pieza vacia vs cualquiera, para esto tenemos que hacer el uso de :
    arreglo[][] = posicion[][]
    //intercambiar
    poscion[][] = arreglo[][]
*/

function intercambiarPosicionesRompe(filaPos1, columnaPos1, filaPos2, columaPos2){
    var pos1 = rompe[filaPos1, columnaPos1];
    var pos2 = rompe[filaPos2, columaPos2];

    //intercambio
    rompe[filaPos1, columnaPos1] = pos2;
    rompe[filaPos2, columaPos2] = pos1;
}

//que se encargue de saber donde esta la pieza vacia
function actualizarPosicionVacia(nuevaFila, nuevaColumna){
    filaVacia = nuevaFila;
    columnaVacia = nuevaColumna;
}

//necesitamos tambien limitar las posiciones del rompecabezas
function posicionValida(fila, columna){
    return (fila >= 0 && fila <= 2 && columna >= 0 && columna <= 2);
}

//debemos crear una funcion que se encargue del movimiento detectando el evento de las flechas de navegacion. 
//debemos crear una matriz de idenficacion de mov, 
//arriba 38, abajo 40, izquierda 37, derecha 39

var codigosDireccion = {
    IZQUIERDA : 37,
    ARRIBA : 38,
    DERECHA : 39,
    ABAJO : 40
};  //ES FORMATO JSON

function moverEnDireccion(direccion){
    var nuevaFilaPiezaVacia;
    var nuevaColumnaPiezaVacia;

    //si se mueve
    if(direccion === codigosDireccion.ABAJO){
        nuevaFilaPiezaVacia = filaVacia + 1;
        nuevaColumnaPiezaVacia = columnaVacia;
    } else if(direccion === codigosDireccion.ARRIBA){
        nuevaFilaPiezaVacia = filaVacia - 1;
        nuevaColumnaPiezaVacia = columnaVacia;
    } else if(direccion === codigosDireccion.DERECHA){
        nuevaFilaPiezaVacia = filaVacia;
        nuevaColumnaPiezaVacia = columnaVacia + 1;
    } else if(direccion === codigosDireccion.IZQUIERDA){
        nuevaFilaPiezaVacia = filaVacia;
        nuevaColumnaPiezaVacia = columnaVacia - 1;
    }   

    //solo mando a llamar a que la posicion sea valida
    if(posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)){
        //tengo que hacer una funcion que se encargue de intercambiar las posiciones
        intercambiarPosiciones(filaVacia, columnaVacia, nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
        actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
        //tengo que guardar el ultimo movimiento
        agregarUltimoMovimiento(direccion);
    }

}

function intercambiarPosiciones(fila1, columna1, fila2, columa2){
    var pieza1 = rompe[fila1, columna1];
    var pieza2 = rompe[fila2, columa2];

    //intercambio ya debe de ser por parte de los frames y el html
    intercambiarPosicionesRompe(fila1, columna1, fila2, columa2);
    //para el html
    intercambiarPoscionesDOM('pieza'+pieza1, 'pieza'+pieza2);
    
}

function intercambiarPoscionesDOM(idPieza1, idPieza2){
    var pieza1 = document.getElementById(idPieza1);
    var pieza2 = document.getElementById(idPieza2);

    //vamos a clonarlas
    var padre = elementoPieza1.parentNode;

    //lo clono
    var clonElemento1 = elementoPieza1.cloneNode(true);
    var clonElemento2 = elementoPieza2.cloneNode(true);

    //reemplazar a los padre con sus clones
    padre.replaceChild(clonElemento1, elementoPieza2);
    padre.replaceChild(clonElemento2, elementoPieza1);
}

//debo de actualizar los movimientos en el DOM
function actualizarUltimoMovimiento(direccion){
    var ultimoMovimiento = document.getElementById("flecha");
    switch(direccion){
        case codigosDireccion.ARRIBA:
            ultimoMovimiento.textContent = "↑";
            break;
        case codigosDireccion.ABAJO:
            ultimoMovimiento.textContent = "↓";
            break;
        case codigosDireccion.DERECHA:
            ultimoMovimiento.textContent = "→";
            break;
        case codigosDireccion.IZQUIERDA:
            ultimoMovimiento.textContent = "←";
            break;
    }
}

//poder mezclar todas las piezas
function mezclarPiezas(veces){
    if(veces <= 0){
        alert("Asi no se puede");
        return;
    }

    var direcciones = [codigosDireccion.ABAJO, codigosDireccion.ARRIBA, codigosDireccion.DERECHA, codigosDireccion.IZQUIERDA];

    var direccion = direcciones[Math.floor(Math.random() * direcciones.length)];

    moverEnDireccion(direccion);

    setTimeout(function(){
        mezclarPiezas(veces - 1);
    }, 100);
}

//necesitamos saber que teclas se estan oprimiendo
function capturarTeclas(){
    document.body.onkeydown = (function(evento){
        if(evento.which === codigosDireccion.ARRIBA || evento.which === codigosDireccion.ABAJO || evento.which === codigosDireccion.DERECHA || evento.which === codigosDireccion.IZQUIERDA){
            moverEnDireccion(evento.which);
            //saber si gane
            var gano = checarSiGano();
            if(gano){
                setTimeout(function(){
                    mostrarCartelGanador();
                }
                ,500);
            }
            evento.preventDefault();
        }
    });
}

function iniciar(){
    //mezclar las piezas
    mezclarPiezas(30);
    capturarTeclas();
    //mezclarPiezas
}

iniciar();

//mandamos traer a la funcion
mostrarInstrucciones(instrucciones);