/**
 * Valor del texto para referencia.
 * @type {string}
 */
 var valoresBusqueda = "";

 /**
  * Número de página para consultas.
  * @type {number}
  */
 var numPage = Math.floor((Math.random() * 42 + 1));
 
 /**
  * URL de la página de personajes.
  * @const {string}
  */
 const URL = "https://rickandmortyapi.com/api/character?page=";
 
 /**
  * URL de la página de episodios.
  * @const {string}
  */
 const URL2 = "https://rickandmortyapi.com/api/episode?page=";
 
 /**
  * URL de la página de localizaciones.
  * @const {string}
  */
 const URL3 = "https://rickandmortyapi.com/api/location?page=";
 
 /**
  * Función para avanzar a la siguiente página.
  */
 function nextPage() {
   if (numPage < 42 && numPage > 0) {
     numPage++;
     limpiar();
     generateAllCharacters();
   } else {
     alert("No hay más páginas.");
   }
 }
 
 /**
  * Función para retroceder a la página anterior.
  */
 function prePage() {
   if (numPage > 1) {
     numPage--;
     limpiar();
     generateAllCharacters();
   } else {
     alert("Estás en la primera página.");
   }
 }
 
 /**
  * Función para limpiar la información en la página.
  */
 function limpiar() {
   

  document.getElementById("containerCards").innerHTML = "";
 
  document.getElementById("containerEpisodesCards").innerHTML = "";
 
  document.getElementById("containerLocationsCards").innerHTML = "";
 
   document.getElementById("characters").innerHTML = "";
   document.getElementById("episodes").innerHTML = "";
   document.getElementById("locations").innerHTML = "";

  document.getElementById(`containerCardsTable`).innerHTML="";  
  document.getElementById(`containerEpisodesCards`).innerHTML="";  
  document.getElementById(`containerLocationsCards`).innerHTML="";
  
  document.getElementById(`containerEpisodesCardsOff`).innerHTML="";

  document.getElementById(`anyadido`).innerHTML="";

  document.getElementById(`containerLocationsCardsOut`).innerHTML="";
   
 }
 
 /**
  * Función para buscar el texto introducido.
  */
 function search() {
   /**
    * Valor de búsqueda del texto introducido.
    * @type {string}
    */
   valoresBusqueda = document.getElementById("txt-character").value;
 
   limpiar();

   document.getElementById(`XMLE`).style.visibility=`visible`;

   
   //Añadir la primera línea de characters
   xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
   xml += '<characters>\n';
 
   for (numPage = 1; numPage <= 42; numPage++) {
     let salida = "Characters:";
     document.getElementById("characters").innerHTML = salida;
 
     generateSearchCharacters();
   }
 
   for (numPage = 1; numPage <= 3; numPage++) {
     let salida = "Episodes:";
     document.getElementById("episodes").innerHTML = salida;
 
     generateSearchEpisodes();
   }
 
   for (numPage = 1; numPage <= 7; numPage++) {
     let salida = "Locations:";
     document.getElementById("locations").innerHTML = salida;
 
     generateSearchLocations();
   }
 }

 /**
  * Función para que salga a la derecha después de pulsar en un listado.
  */
 function searchBeforeList(){

  document.getElementById(`XMLE`).style.visibility=`visible`;


  for(numPage=1;numPage<=42;numPage++){
      let salida="Characters:";
      document.getElementById("characters").innerHTML=salida;

      generateSearchCharacters();
  }

  for(numPage=1;numPage<=3;numPage++){
      let salida="Episodes:";
      document.getElementById("episodes").innerHTML=salida;

      generateSearchEpisodes();
  }
  for(numPage=1;numPage<=7;numPage++){
      let salida="Locations:";
      document.getElementById("locations").innerHTML=salida;

      generateSearchLocations();
  }
}
 
 /**
  * Función para listar según la opción seleccionada en el select.
  */
 function listSelected() {
   /**
    * Valor de búsqueda seleccionado en el select.
    * @type {string}
    */
   valoresBusqueda = document.getElementById("select").value;
 
   limpiar();
 
   if (valoresBusqueda === "Human" || valoresBusqueda === "Robot" || valoresBusqueda === "Animal" || valoresBusqueda === "Alien") {
     for (numPage = 1; numPage <= 42; numPage++) {
       listTypeCharacter();
     }
   } else if (valoresBusqueda === "S01" || valoresBusqueda === "S02" || valoresBusqueda === "S03" || valoresBusqueda === "S04" || valoresBusqueda === "S05") {
     for (numPage = 1; numPage <= 3; numPage++) {
       generateListedEpisodes();
     }
   } else {
     for (numPage = 1; numPage <= 7; numPage++) {
       generateListedLocations();
     }
   }
 }
 
 /**
  * Evento de carga para cambiar el color de fondo al refrescar la página.
  */
 window.addEventListener("load", function () {
   /**
    * Colores de fondo disponibles.
    * @type {string[]}
    */
   var colors = ["#24325F99", "#526E2D99", "#917C5D99", "#545994", "#4d7666", "#deace2", "#e26bb6"];
 
   /**
    * Color de fondo aleatorio seleccionado.
    * @type {string}
    */
   var randomColor = colors[Math.floor(Math.random() * colors.length)];
 
   document.body.style.backgroundColor = randomColor;

   document.getElementById(`XMLE`).style.visibility=`hidden`;
 });
 