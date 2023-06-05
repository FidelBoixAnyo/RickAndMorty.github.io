/**
 * Obtiene los datos de la API mediante una solicitud asíncrona.
 * @param {string} url - La URL de la API.
 * @returns {Promise<Array>} - Una promesa que se resuelve con los resultados de la API.
 */
 const getApi = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  }
  
  /**
   * Crea una tarjeta de personaje.
   * @param {Object} character - Los datos del personaje.
   */
  const createCards = (character) => {
    document.getElementById("numPage").innerHTML = `${numPage}`;
  
    const card = document.createElement('div');
    card.classList.add('card-character');
  
    const imgCard = document.createElement('img');
    imgCard.src = character.image;
    imgCard.alt = character.name;
  
    const containerDescription = document.createElement('div');
    containerDescription.classList.add('description-card');
  
    const nameCharacter = document.createElement('h2');
    nameCharacter.textContent = "Name: " + character.name;
  
    const statusCharacter = document.createElement('p');
    statusCharacter.textContent = "Status: " + character.status;
  
    const speciesCharacter = document.createElement('p');
    speciesCharacter.textContent = "Species: " + character.species;
  
    const genderCharacter = document.createElement('p');
    genderCharacter.textContent = "Gender: " + character.gender;
  
    containerDescription.appendChild(nameCharacter);
    containerDescription.appendChild(statusCharacter);
    containerDescription.appendChild(speciesCharacter);
    containerDescription.appendChild(genderCharacter);
  
    card.appendChild(imgCard);
    card.appendChild(containerDescription);
  
    document.getElementById('containerCards').appendChild(card);
  }
  
  /**
   * Genera todos los personajes y los muestra en la página.
   */
  const generateAllCharacters = async () => {
    const data = await getApi(URL + numPage);
    data.map(character => createCards(character));
  }
  
  window.addEventListener('DOMContentLoaded', generateAllCharacters);
  
  /**
   * Genera los personajes que coincidan con la búsqueda y los muestra en la página.
   */
  const generateSearchCharacters = async () => {
    const data = await getApi(URL + numPage);
    data.map(character => createSearchCards(character, valoresBusqueda));
  }
  
  /**
   * Crea una tarjeta de personaje para la búsqueda.
   * @param {Object} character - Los datos del personaje.
   * @param {string} valoresBusqueda - El término de búsqueda.
   */
  const createSearchCards = (character, valoresBusqueda) => {
    let nombres = character.name.split(" ");
    document.getElementById("numPage").innerHTML = 1;
  
    if (character.name == valoresBusqueda || nombres.includes(valoresBusqueda) || Number(character.id) == Number(valoresBusqueda)) {
      const card = document.createElement('div');
      card.classList.add('card-character');
  
      const imgCard = document.createElement('img');
      imgCard.src = character.image;
      imgCard.alt = character.name;
  
      const containerDescription = document.createElement('div');
      containerDescription.classList.add('description-card');

      const nameCharacter = document.createElement('input');
      nameCharacter.type="button";
      nameCharacter.className="fakeh2";
      nameCharacter.value=character.name;
      nameCharacter.onclick = function(){
          showInfo(character.url);
      };

      containerDescription.appendChild(nameCharacter);
  
      card.appendChild(imgCard);
      card.appendChild(containerDescription);
  
      document.getElementById('containerCardsTable').appendChild(card);

      //XML data
      xml += '  <character>\n';
      xml += '    <image>' + character.image + '</image>\n';
      xml += '    <name>' + character.name + '</name>\n';
      xml += '    <url>' + character.url + '</url>\n';
      xml += '  </character>\n';
    }
  }
  
  /**
   * Lista los personajes según el tipo seleccionado.
   */
  const listTypeCharacter = async () => {
    const data = await getApi(URL + numPage);
    data.map(character => createListedCharacters(character, valoresBusqueda));
  }
  
  /**
   * Crea una tarjeta de personaje para la lista según el tipo seleccionado.
   * @param {Object} character - Los datos del personaje.
   * @param {string} valoresBusqueda - El tipo seleccionado.
   */
  const createListedCharacters = (character, valoresBusqueda) => {
    document.getElementById("numPage").innerHTML = 1;
    
    if (character.species == valoresBusqueda) {
      const card = document.createElement('div');
      card.classList.add('card-character');
  
      const imgCard = document.createElement('img');
      imgCard.src = character.image;
      imgCard.alt = character.name;
  
      const containerDescription = document.createElement('div');
      containerDescription.classList.add('description-card');
  
      const nameCharacter = document.createElement('input');
      nameCharacter.type="button";
      nameCharacter.className="fakeh2";
      nameCharacter.value=character.name;
      nameCharacter.onclick = function(){
          showInfoOnList(character.url);
      };

      const statusCharacter = document.createElement('p');
      statusCharacter.textContent = "Status: " + character.status;
  
      const speciesCharacter = document.createElement('p');
      speciesCharacter.textContent = "Species: " + character.species;
  
      const genderCharacter = document.createElement('p');
      genderCharacter.textContent = "Gender: " + character.gender;
  
      containerDescription.appendChild(nameCharacter);
      containerDescription.appendChild(statusCharacter);
      containerDescription.appendChild(speciesCharacter);
      containerDescription.appendChild(genderCharacter);
  
      card.appendChild(imgCard);
      card.appendChild(containerDescription);
  
      document.getElementById('containerCards').appendChild(card);
    }
  }
  
     /**
      * Saca la información del personaje al pulsar en el nombre.
      * @param {string} url - Url del personaje.
      */
     function showInfo(url){
      document.getElementById(`anyadido`).innerHTML="";
      fetch(`${url}`)
      .then(response => response.json())
      .then(character => {
          const breakLine=document.createElement(`br`);
          const breakLine2=document.createElement(`br`);
          const breakLine3=document.createElement(`br`);

          const nameCharacter=document.createElement(`h2`);
          nameCharacter.textContent=character.name;

          const idCharacter=document.createElement(`p`);
          idCharacter.classList.add(`tableContent`);
          idCharacter.textContent=`Id: ${character.id}`;

          const statusCharacter=document.createElement(`p`);
          statusCharacter.classList.add(`tableContent`);
          statusCharacter.textContent=`Status: ${character.status}`;

          const speciesCharacter=document.createElement(`p`);
          speciesCharacter.classList.add(`tableContent`);
          speciesCharacter.textContent=`Specie: ${character.species}`;

          const genderCharacter=document.createElement(`p`);
          genderCharacter.classList.add(`tableContent`);
          genderCharacter.textContent=`Gender: ${character.gender}`;

          const origin=document.createElement(`h3`);
          origin.classList.add(`selectorh3`);
          origin.textContent=`Origin`;

          const originCharacter=document.createElement(`p`);
          originCharacter.classList.add(`tableContent`);
          originCharacter.textContent=`Name: ${character.origin.name}`;

          const location=document.createElement(`h3`);
          location.classList.add(`selectorh3`);
          location.textContent=`Location`;

          const locationCharacter=document.createElement(`p`);
          locationCharacter.classList.add(`tableContent`);
          locationCharacter.textContent=`Name: ${character.location.name}`;

          const createdChracter=document.createElement(`p`);
          createdChracter.classList.add(`tableContent`);
          createdChracter.textContent=`Created: ${character.created}`;

          const episodeTitle=document.createElement(`h3`);
          episodeTitle.classList.add(`selectorh3`);
          episodeTitle.textContent=`Episodes`;

          const infoTable=document.createElement(`div`);
          infoTable.classList.add(`resultadoTabla`);
          infoTable.appendChild(nameCharacter);
          infoTable.appendChild(idCharacter);
          infoTable.appendChild(createdChracter);
          infoTable.appendChild(statusCharacter);
          infoTable.appendChild(speciesCharacter);
          infoTable.appendChild(genderCharacter);
          infoTable.appendChild(breakLine);
          infoTable.appendChild(origin);
          infoTable.appendChild(originCharacter);
          infoTable.appendChild(breakLine2);
          infoTable.appendChild(location);
          infoTable.appendChild(locationCharacter);
          infoTable.appendChild(breakLine3);
          infoTable.appendChild(episodeTitle);

          for(let i=0;i<character.episode.length;i++){
              fetch(`${character.episode[i]}`)
              .then(response => response.json())
              .then(episode => {
                  let episodename=document.createElement(`p`);
                  episodename.classList.add(`tableContent`);
                  episodename.textContent=`${episode.name}`;
                  infoTable.appendChild(episodename);
              });
          }            

          document.getElementById(`anyadido`).appendChild(infoTable);
      });
  }

      /**
       * Saca la información del personaje cuando pulsemos sobre el nombre en un listado.
       * @param {string} url - Url del personaje.
       */
      function showInfoOnList(url){
        limpiar();
        
        fetch(`${url}`)
        .then(response => response.json())
        .then(character => {
            valoresBusqueda=character.name;

            searchBeforeList();

            const breakLine=document.createElement(`br`);
            const breakLine2=document.createElement(`br`);
            const breakLine3=document.createElement(`br`);

            const nameCharacter=document.createElement(`h2`);
            nameCharacter.textContent=character.name;

            const idCharacter=document.createElement(`p`);
            idCharacter.classList.add(`tableContent`);
            idCharacter.textContent=`Id: ${character.id}`;

            const statusCharacter=document.createElement(`p`);
            statusCharacter.classList.add(`tableContent`);
            statusCharacter.textContent=`Status: ${character.status}`;

            const speciesCharacter=document.createElement(`p`);
            speciesCharacter.classList.add(`tableContent`);
            speciesCharacter.textContent=`Specie: ${character.species}`;

            const genderCharacter=document.createElement(`p`);
            genderCharacter.classList.add(`tableContent`);
            genderCharacter.textContent=`Gender: ${character.gender}`;

            const origin=document.createElement(`h3`);
            origin.classList.add(`selectorh3`);
            origin.textContent=`Origin`;

            const originCharacter=document.createElement(`p`);
            originCharacter.classList.add(`tableContent`);
            originCharacter.textContent=`Name: ${character.origin.name}`;

            const location=document.createElement(`h3`);
            location.classList.add(`selectorh3`);
            location.textContent=`Location`;

            const locationCharacter=document.createElement(`p`);
            locationCharacter.classList.add(`tableContent`);
            locationCharacter.textContent=`Name: ${character.location.name}`;

            const createdChracter=document.createElement(`p`);
            createdChracter.classList.add(`tableContent`);
            createdChracter.textContent=`Created: ${character.created}`;

            const episodeTitle=document.createElement(`h3`);
            episodeTitle.classList.add(`selectorh3`);
            episodeTitle.textContent=`Episodes`;

            const infoTable=document.createElement(`div`);
            infoTable.appendChild(nameCharacter);
            infoTable.appendChild(idCharacter);
            infoTable.appendChild(createdChracter);
            infoTable.appendChild(statusCharacter);
            infoTable.appendChild(speciesCharacter);
            infoTable.appendChild(genderCharacter);
            infoTable.appendChild(breakLine);
            infoTable.appendChild(origin);
            infoTable.appendChild(originCharacter);
            infoTable.appendChild(breakLine2);
            infoTable.appendChild(location);
            infoTable.appendChild(locationCharacter);
            infoTable.appendChild(breakLine3);
            infoTable.appendChild(episodeTitle);

            for(let i=0;i<character.episode.length;i++){
                fetch(`${character.episode[i]}`)
                .then(response => response.json())
                .then(episode => {
                    let episodename=document.createElement(`p`);
                    episodename.classList.add(`tableContent`);
                    episodename.textContent=`${episode.name}`;
                    infoTable.appendChild(episodename);
                });
            }            

            document.getElementById(`anyadido`).appendChild(infoTable);
        });
    }