// Crear un array vacío llamado 'toDoItems'
// Tu codigo acá:

var toDoItems = [];

// En la página 'index.html' hay un elemento span cuyo texto es 'Aplicación creada por:'.
// Usando querySelector seleccionar dicho span por su id ('createdBy') y luego usando innerHTML
// agregar tu nombre al final del texto actual. Ej: 'Aplicación creada por Franco'
// Tu código acá:

var span = document.querySelector("#createdBy");
/* <span id="createdBy">Aplicación creada por:</span>; */

span.innerHTML = span.innerHTML + " Ivan Miranda";
/* <span id="createdBy">Aplicación creada por: Ivan Miranda</span>; */

// Crear una clase denominada 'ToDo' cuyo constructor debe recibir un único parámetro del tipo string
// con el nombre 'description' que será justamente la descripción del ToDo.
// Agregar dos propiedades a la clase:
// 1) 'description' : debe ser igual a la descripción pasada como parámetro al constructor
// 2) 'complete'    : debe setearse en false
// Ayuda: usar 'this' en el constructor

// Eventualmente, cada elemento que genere sera un nuevo toDo
function ToDo(description) {
  // Tu código acá:
  this.description = description;
  this.complete = false;
}

// Agregar un método denominado 'completeToDo' al prototipo de la clase ToDo
// No requiere ningún argumento
// Debe setear el atributo 'complete' del ToDo en true

// Tu código acá:

ToDo.prototype.completeToDo = function () {
  this.complete = !this.complete;
  // para poder tildar y destildar una tarea
};

// Agregar dos parámetros a la función 'buildToDo':
//    1) Un objeto de la clase ToDo
//    2) Index numérico
//
// La función debe realizar lo siguiente:
//    1) Crear un elemento 'div' y asignárselo a una variable denominada 'toDoShell'
//    2) Asignarle a 'toDoShell' la clase 'toDoShell'
//    3) Crear un elemento 'span' y asignárselo a una variable denominada 'toDoText'
//    4) Utilizando el objeto toDo pasado como argumento, setear el 'toDoText' innerHTML
//       asignándole el valor de la propiedad 'description' del objeto ToDo.
//    5) Asignarle como id del 'toDoText' el valor 'index' recibido como argumento
//    6) En función del atributo 'complete' del objeto ToDo recibido como argumento:
//          - Si es true: asignarle a 'toDoText' la clase 'completeText'
//          - Si es false: no asignarle ninguna clase
//    7) Agregar 'toDoText' como hijo de 'toDoShell'
//    8) Devolver la variable toDoShell

// Esta funcion lo que va a hacer es traernos un ToDo
// Por lo que previamente tuvo que haber un:
// let todo = new ToDo('Entrenar');
// y con este todo es que se invoca buildToDo
// El index nos va a permitir colocarle una identificacion unica a cada elemento

function buildToDo(todo, index) {
  // Tu código acá:

  var toDoShell = document.createElement("div");
  toDoShell.className = "toDoShell";
  // <div class='toDoShell'></div>

  var toDoText = document.createElement("span");
  // <span></span>

  toDoText.innerHTML = todo.description;
  // recordar que todo es un objeto, que tiene dentro las propiedades description y complete.
  // todo = {description, complete}

  toDoText.id = index;

  if (todo.complete === true) {
    toDoText.className = "completeText";
    //  Si buscamos en los estilos, veremos que completeText lo que hace es colocarle la raya de tachado en color gris.
    // Por lo tanto si nuestro toDoItem esta completo se tacha, sino no
  }

  toDoText.addEventListener("click", completeToDo);

  toDoShell.appendChild(toDoText);

  return toDoShell;

  // <div class='toDoShell'>
  //   <span id=index>todo.description</span>
  // </div>

  // Esto es lo que nosotros eventualmente vamos a querer appendear (el rectangulo con la informacion debajo del input), porque todavia no agregamos nada a nuestro html (hasta que no invoquemos esta funcion y appendiemos en algun lado lo que devuelve)
}

// La función 'buildToDos' debe crear un array de objetos toDo y devolverlo
// Recibirá como parámetro un array de objetos ToDo
// Utilizar el método map usando la función previamente creada ('buildToDo')
// Recordar que map lo que hace es devolver justamente un nuevo array, no hay necesidad de crear uno nuevo.
// Devolver el nuevo array

function buildToDos(toDos) {
  // toDos es un array = [toDo1, toDo2, toDo3...] --> [{description, complete}, {description, complete}, {description, complete}...]
  //                      index -> ''  -> ''
  // Tu código acá:

  // return toDos.map(buildToDo) --> esta manera funciona, mientras se cumpla que los 2 datos del callback del map me van a servir para la invocacion de mi funcion.

  return toDos.map(function (element, index) {
    return buildToDo(element, index);
    //             todo = toDo
  });

  // Con map lo que queremos es que por cada elemento de toDos, se genere lo que devuelve la funcion buildToDo (div's) para que mas adelante pueda recorrer el arreglo con todos los div's y simplemente tenga que mostrarlos en pantalla.

  // Esto devuelve la funcion:

  //  [<div class='toDoShell'><span id=0>todo.description1</span></div>,

  //   <div class='toDoShell'><span id=1>todo.description2</span></div>,

  //   <div class='toDoShell'><span id=2>todo.description3</span></div>]

  // Todavia no lo appendeamos a ningun lado
}

// La función 'displayToDos' se va a encargar de que se vean los toDo's en pantalla (recorre el array devuelto en buildToDos() y los muestra)
//  1) Seleccionr el elemento cuyo id es 'toDoContainer' y almacenarlo en una variable denominada 'toDoContainer'
//  2) Setear el innerHTML de 'toDoContainer' como un string vacio ("")
//  3) Llamar a la función previemante creada 'buildToDos' pasándole como argumento el array toDoItems
//  4) Iterar sobre el resultado devuelto por la función 'buildToDos' e ir agregndo cada elemento a 'toDoContainer'
//  5) Al final de este archivo, antes de la línea que dice "NO CAMBIES NADA DE ACÁ PARA ABAJO" escribe una
//     línea para hacer el llamado a esta funcion (displayToDos)
//  6) Abrir o en el caso de ya tenerlo abierto, recargar, la página

function displayToDos() {
  var toDoContainer = document.getElementById("toDoContainer");
  toDoContainer.innerHTML = "";

  var fn = buildToDos(toDoItems);

  // fn.forEach(el => toDoContainer.appendChild(el))

  for (var i = 0; i < fn.length; i++) {
    toDoContainer.appendChild(fn[i]);
  }

  // fn = [<div class='toDoShell'><span id=0>todo.description1</span></div>,

  //   <div class='toDoShell'><span id=1>todo.description2</span></div>,

  //   <div class='toDoShell'><span id=2>todo.description3</span></div>]

  // el for recorre el array devuelto por la funcion buildToDos y va agregando (ahora si a nuestro html) cada elemento dentro del div cuyo id es 'toDoContainer' quedando :

  // <div id="toDoContainer">
  //   <div class='toDoShell'><span id=0>todo.description1</span></div>
  //   <div class='toDoShell'><span id=1>todo.description2</span></div>
  //    <div class='toDoShell'><span id=2>todo.description3</span></div>
  // </div>;

  // Se generan estas 3 lineas con toda esta informacion dentro del primer div, que ademas podria o no tener el span del indice o tener o no una clase adicional que sera la que tache el elemento cuando este completado.
}

// La función 'addToDo' agregará un nuevo ToDo al array 'toDoItems' (todavia este array esta vacio)
// [NOTA: Algunas cuestiones a tener en cuenta sobre el elemento 'input' de HTML (Ya que 'toDoInput' es un input)
// Todos los elementos input tienen una propiedad llamada 'value' que nos permite acceder al texto que se encuentre
// actualmente escrito dentro del input]
//  1) Crear un nuevo ToDo usando la clase ToDo y pasándole el valor del input 'toDoInput' como parámetro
//  2) Agregar el objeto ToDo recién creado al array toDoItems
//  3) Setear el valor del input toDoInput como un string vacio ("") (Esto se realiza para que en el input se borre lo que se encontraba escrito, para asi poder seguir agregando otra informacion)
//  4) Llamar a la función displayToDos para que se actualicen los toDos mostrados en pantalla

function addToDo() {
  var input = document.querySelector("#toDoInput");
  if (input.value !== "") {
    var nuevoToDo = new ToDo(input.value); // {description: input.value, complete: false}
    toDoItems.push(nuevoToDo);
  }

  input.value = "";
  displayToDos();
  // Una vez que se termino de agregar un nuevo toDo al array toDoItems, este se actualiza y se invoca a la funcion displayToDos(), que lo que hacia era recorrer el toDoItems para appendearlos al html y mostrarlos en pantalla. Por cada elemento que se agregue se repite el proceso.
}

// Agregar un 'Event Listener' para que cada vez que el botón 'AGREGAR' sea clickeado
// se ejecute la función 'addToDo'
//   1) Seleccionar el elemento cuyo id es 'addButton'
//   2) Agregarle un 'click' event listener, pasándole la función 'addToDo' como callback

var add = document.querySelector("#addButton");
add.addEventListener("click", addToDo);

// Por cada click en el boton va a ejecutar el addToDo
// Que hacia el addToDo --> se fija en el input si tiene un value o no, si no tiene no hace nada, si tiene lo agrega a toDoItems, limpia el input y ejecuta el displayToDos
// Que hacia el displayToDos --> recorre el toDoItems que tendra un nuevo elemento cada vez que agregue uno en el input para generarle el div que necesita para mostrarse en pantalla

// La función completeToDo se va a ejecutar cuando queramos completar un todo
// [NOTA: Algunas cuestiones a tener en cuenta
// Todo Event Listener recibe como parámetro el objeto 'event' conteniendo un montón de información que incluye
// el tipo del evento, que elemento fue el que lo llamó, los valores de dicho elemento, etc.
// En este paso vamos a utilizarlo para encontrar el index del item que disparó el evento (Esta parte ya se
// encuentra desarrollada pero está comentada dentro de la función por lo que va a ser necesario que la descomenten)]
//   1) Utilizando el index suministrdo, llamar a 'completeToDo' (Recuerden que habíamos creado dcho método en el
//      prototipo de la clase ToDo) sobre el elemento correspondiente del array toDoItems
//   2) Llamar a displayToDos para actualizar los elementos que se van a mostrar en pantalla
//   3) En la función 'buildToDo' agregar un 'click' event listener al elemento 'toDoText', pasándole
//      esta función como callback (ya que esta funcion todavia no la estamos ejecutando en ningun lado, le tenemos que hacer su event listener a ese span/elemento en particular - definido en buildToDo -> toDoText. Una vez hecho, podre visualizar el cambio a completo)

// Como es que tomamos el elemento que esta siendo ejecutado.
// cual es el evento? --> 'click
// cual es el event.target? --> el div o el elemento que fue clickeado
// cual es el event.target.id? --> el id (index) del elemento que fue clickeado
// (cuando hago click sobre los span estoy haciendo click sobre sus index que nosotros le colocamos)

function completeToDo(event) {
  const index = event.target.id;
  // tomo esos index (linea 222)
  // y ahora los tengo que completar (tacharlos)
  toDoItems[index].completeToDo();
  // anda al arreglo y toma el elemento que haya disparado el event.target y ejecutale completeToDo (setearlo a su opuesto)
  displayToDos();
  // llamamos a esta funcion para que se muestre en pantalla el cambio
}

// **********************************************EXTRA CREDITOS:********************************************** //

/*    Investigá sobre el tipo 'checkbox' del elemento input y realizar lo siguiente en la función 'buildToDo':
        a) Crer un checkbox en la función 'buildToDo'
        b) Asignarle como id a dicho checkbox el valor del index y quitar el id del index de toDoText
        c) Agregarle al checkbox el 'click' event listener de completeToDo y quitárle el event listener a toDoText
        d) Asignarle la clase 'completeCheckbox' al checkbox
        e) Dentro del bloque 'if' de la función buildToDo, si es true, setear el atributo 'checked' en true en el checkbox
        f) Agregar el checkbox sobre el elemento 'toDoShell'
*/
// ********************************************** ----------- ********************************************** //

// Acá debes insertar la llamada a 'displayToDos'
displayToDos();

// ---------------------------- NO CAMBIES NADA DE ACÁ PARA ABAJO ----------------------------- //
if (typeof module !== "undefined") {
  module.exports = {
    toDoItems: toDoItems,
    ToDo: ToDo,
    buildToDos: buildToDos,
    buildToDo: buildToDo,
    completeToDo: completeToDo,
    displayToDos: displayToDos,
    addToDo: addToDo,
  };
}
