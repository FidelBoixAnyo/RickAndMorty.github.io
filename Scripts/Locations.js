 /**
 * Genera las localizaciones que coincidan con la búsqueda y las muestra en la página.
 */
const generateSearchLocations = async () => {
    const data = await getApi(URL3 + numPage);
    data.map(locations => createLocations(locations, valoresBusqueda));
  }
  
  /**
   * Crea una tarjeta de localización para la búsqueda.
   * @param {Object} locations - Los datos de la localización.
   * @param {string} valoresBusqueda - El término de búsqueda.
   */
  const createLocations = (locations, valoresBusqueda) => {
    let nombres = locations.name.split(" ");
    document.getElementById("numPage").innerHTML = 1;
  
    if (locations.name == valoresBusqueda || nombres.includes(valoresBusqueda) || Number(locations.id) == Number(valoresBusqueda)) {
      const card = document.createElement('div');
      card.classList.add('card-location');
  
      const containerDescription = document.createElement('div');
      containerDescription.classList.add('description-location-card');
  
      const nameLocation = document.createElement('input');
      nameLocation.type="button";
      nameLocation.className="fakeh2";
      nameLocation.value=locations.name;
      nameLocation.onclick = function(){
          showLocationInfo(locations.url);
      };
  
      const typeLocation = document.createElement('p');
      typeLocation.textContent = "Type: " + locations.type;
  
      const dimensionLocation = document.createElement('p');
      dimensionLocation.textContent = "Dimension: " + locations.dimension;
  
      containerDescription.appendChild(nameLocation);
      containerDescription.appendChild(typeLocation);
      containerDescription.appendChild(dimensionLocation);
  
      card.appendChild(containerDescription);
  
      document.getElementById('containerLocationsCards').appendChild(card);
    }
  }
  
  /**
   * Genera las localizaciones según la página actual y las muestra en la página.
   */
  const generateListedLocations = async () => {
    const data = await getApi(URL3 + numPage);
    data.map(locations => createListedLocations(locations));
  }
  
  /**
   * Crea una tarjeta de localización para la lista.
   * @param {Object} locations - Los datos de la localización.
   */
  const createListedLocations = (locations) => {
    document.getElementById("numPage").innerHTML = 1;
  
    const card = document.createElement('div');
    card.classList.add('card-location');
  
    const containerDescription = document.createElement('div');
    containerDescription.classList.add('description-location-card');
  
    const nameLocation = document.createElement('input');
    nameLocation.type="button";
    nameLocation.className="fakeh2";
    nameLocation.value=locations.name;
    nameLocation.onclick = function(){
        showListedLocationInfo(locations.url);
    };
  
    const typeLocation = document.createElement('p');
    typeLocation.textContent = "Type: " + locations.type;
  
    const dimensionLocation = document.createElement('p');
    dimensionLocation.textContent = "Dimension: " + locations.dimension;
  
    containerDescription.appendChild(nameLocation);
    containerDescription.appendChild(typeLocation);
    containerDescription.appendChild(dimensionLocation);
  
    card.appendChild(containerDescription);
  
    document.getElementById('containerLocationsCardsOut').appendChild(card);
  }
  
  /**
   * Saca la información de la localización cuando pulsemos sobre el nombre.
   * @param {string} url - Url del episodio.
   */
  function showLocationInfo(url){
    document.getElementById(`anyadido`).innerHTML="";

    fetch(`${url}`)
      .then(response => response.json())
      .then(location => {
          const breakLine=document.createElement(`br`);
          
          const nameLocation=document.createElement(`h2`);
          nameLocation.textContent=location.name;

          const idLocation=document.createElement(`p`);
          idLocation.classList.add(`tableContent`);
          idLocation.textContent=`Id: ${location.id}`;

          const typeLocation=document.createElement(`p`);
          typeLocation.classList.add(`tableContent`);
          typeLocation.textContent=`Type: ${location.type}`;

          const dimensionLocation=document.createElement(`p`);
          dimensionLocation.classList.add(`tableContent`);
          dimensionLocation.textContent=`Dimension: ${location.dimension}`;

          const createdLocation=document.createElement(`p`);
          createdLocation.classList.add(`tableContent`);
          createdLocation.textContent=`Created: ${location.created}`;

          const infoTable=document.createElement(`div`);
          infoTable.classList.add(`resultadoTabla`);
          infoTable.appendChild(nameLocation);
          infoTable.appendChild(idLocation);
          infoTable.appendChild(typeLocation);
          infoTable.appendChild(dimensionLocation);
          infoTable.appendChild(createdLocation);
          infoTable.appendChild(breakLine);

          const residentsTittle=document.createElement(`h3`);
          residentsTittle.classList.add(`selectorh3`);
          residentsTittle.textContent=`Residents`;

          infoTable.appendChild(residentsTittle);

          for(let i=0;i<location.residents.length;i++){
              fetch(`${location.residents[i]}`)
              .then(response => response.json())
              .then(character => {
                  let characterName=document.createElement(`p`);
                  characterName.classList.add(`tableContent`);
                  characterName.textContent=`${character.name}`;
                  infoTable.appendChild(characterName);
              });
          }            

          document.getElementById(`anyadido`).appendChild(infoTable);
      });
  }

  /**
   * Saca la información de la localización cuando pulsemos sobre el nombre en un listado.
   * @param {string} url - Url del episodio.
   */
  function showListedLocationInfo(url){
    limpiar();

      fetch(`${url}`)
      .then(response => response.json())
      .then(location => {
        valoresBusqueda=location.name;
        searchBeforeList();

          const breakLine=document.createElement(`br`);
          
          const nameLocation=document.createElement(`h2`);
          nameLocation.textContent=location.name;

          const idLocation=document.createElement(`p`);
          idLocation.classList.add(`tableContent`);
          idLocation.textContent=`Id: ${location.id}`;

          const typeLocation=document.createElement(`p`);
          typeLocation.classList.add(`tableContent`);
          typeLocation.textContent=`Type: ${location.type}`;

          const dimensionLocation=document.createElement(`p`);
          dimensionLocation.classList.add(`tableContent`);
          dimensionLocation.textContent=`Dimension: ${location.dimension}`;

          const createdLocation=document.createElement(`p`);
          createdLocation.classList.add(`tableContent`);
          createdLocation.textContent=`Created: ${location.created}`;

          const infoTable=document.createElement(`div`);
          infoTable.classList.add(`resultadoTabla`);
          infoTable.appendChild(nameLocation);
          infoTable.appendChild(idLocation);
          infoTable.appendChild(typeLocation);
          infoTable.appendChild(dimensionLocation);
          infoTable.appendChild(createdLocation);
          infoTable.appendChild(breakLine);

          const residentsTittle=document.createElement(`h3`);
          residentsTittle.classList.add(`selectorh3`);
          residentsTittle.textContent=`Residents`;

          infoTable.appendChild(residentsTittle);

          for(let i=0;i<location.residents.length;i++){
              fetch(`${location.residents[i]}`)
              .then(response => response.json())
              .then(character => {
                  let characterName=document.createElement(`p`);
                  characterName.classList.add(`tableContent`);
                  characterName.textContent=`${character.name}`;
                  infoTable.appendChild(characterName);
              });
          }            

          document.getElementById(`anyadido`).appendChild(infoTable);
      });
  }