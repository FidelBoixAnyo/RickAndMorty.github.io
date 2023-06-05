 /**
 * Genera los episodios que coincidan con la búsqueda y los muestra en la página.
 */
const generateSearchEpisodes = async () => {
    const data = await getApi(URL2 + numPage);
    data.map(episode => createEpisodes(episode, valoresBusqueda));
  }
  
  /**
   * Crea una tarjeta de episodio para la búsqueda.
   * @param {Object} episode - Los datos del episodio.
   * @param {string} valoresBusqueda - El término de búsqueda.
   */
  const createEpisodes = (episode, valoresBusqueda) => {
    let nombres = episode.name.split(" ");
    document.getElementById("numPage").innerHTML = 1;
  
    if (episode.name == valoresBusqueda || nombres.includes(valoresBusqueda) || Number(episode.id) == Number(valoresBusqueda)) {
      const card = document.createElement('div');
      card.classList.add('card-episode');
  
      const containerDescription = document.createElement('div');
      containerDescription.classList.add('description-episode-card');
  
      const nameEpisode = document.createElement('input');
      nameEpisode.type="button";
      nameEpisode.className="fakeh2";
      nameEpisode.value=episode.name;
      nameEpisode.onclick = function(){
          showEpisodeInfo(episode.url);
      };

      const episodeNick=document.createElement(`p`);
      episodeNick.classList.add('description-episode-card');
      episodeNick.textContent=`Episode: ${episode.episode}`;

      containerDescription.appendChild(nameEpisode);
      containerDescription.appendChild(episodeNick);
  
      card.appendChild(containerDescription);
  
      document.getElementById('containerEpisodesCards').appendChild(card);
    }
  }
  
  /**
   * Genera los episodios según la temporada seleccionada y los muestra en la página.
   */
  const generateListedEpisodes = async () => {
    const data = await getApi(URL2 + numPage);
    data.map(episode => createListedEpisodes(episode, valoresBusqueda));
  }
  
  /**
   * Crea una tarjeta de episodio para la lista según la temporada seleccionada.
   * @param {Object} episode - Los datos del episodio.
   * @param {string} valoresBusqueda - La temporada seleccionada.
   */
  const createListedEpisodes = (episode, valoresBusqueda) => {
    document.getElementById("numPage").innerHTML = 1;
  
    var temporada = episode.episode;
    temporada = temporada.substring(0, 3);
  
    if (temporada == valoresBusqueda) {
      const card = document.createElement('div');
      card.classList.add('card-episode');
  
      const containerDescription = document.createElement('div');
      containerDescription.classList.add('description-episode-card');
  
      const nameEpisode = document.createElement('input');
      nameEpisode.type="button";
      nameEpisode.className="fakeh2";
      nameEpisode.value=episode.name;
      nameEpisode.onclick = function(){
          showEpisodeListedInfo(episode.url);
      };
       
      const air_dateEpisode = document.createElement('p');
      air_dateEpisode.textContent = "Air Date: " + episode.air_date + "\n";
  
      const episodeEpisode = document.createElement('p');
      episodeEpisode.textContent = "Episode: " + episode.episode + "\n";
  
      containerDescription.appendChild(nameEpisode);
      containerDescription.appendChild(air_dateEpisode);
      containerDescription.appendChild(episodeEpisode);
  
      card.appendChild(containerDescription);
  
      document.getElementById('containerEpisodesCardsOff').appendChild(card);
    }
  }
  
  /**
   * Saca la información del episodio.
   * @param {string} url - Url del episodio.
   */
  function showEpisodeInfo(url){

      fetch(`${url}`)
      .then(response => response.json())
      .then(episode => {
          const breakLine=document.createElement(`br`);
          
          const nameEpisode=document.createElement(`h2`);
          nameEpisode.textContent=episode.name;

          const idEpisode=document.createElement(`p`);
          idEpisode.classList.add(`tableContent`);
          idEpisode.textContent=`Id: ${episode.id}`;

          const airDateEpisode=document.createElement(`p`);
          airDateEpisode.classList.add(`tableContent`);
          airDateEpisode.textContent=`Air Date: ${episode.air_date}`;

          const episodeEpisode=document.createElement(`p`);
          episodeEpisode.classList.add(`tableContent`);
          episodeEpisode.textContent=`Episdde: ${episode.episode}`;

          const createdEpisode=document.createElement(`p`);
          createdEpisode.classList.add(`tableContent`);
          createdEpisode.textContent=`Created: ${episode.created}`;

          const infoTable=document.createElement(`div`);
          infoTable.classList.add(`resultadoTabla`);
          infoTable.appendChild(nameEpisode);
          infoTable.appendChild(idEpisode);
          infoTable.appendChild(airDateEpisode);
          infoTable.appendChild(episodeEpisode);
          infoTable.appendChild(createdEpisode);
          infoTable.appendChild(breakLine);

          const charactersEpisode=document.createElement(`h3`);
          charactersEpisode.classList.add(`selectorh3`);
          charactersEpisode.textContent=`Characters`;

          infoTable.appendChild(charactersEpisode);

          for(let i=0;i<episode.characters.length;i++){
              fetch(`${episode.characters[i]}`)
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
   * Saca la información del episodio cuando pulsemos sobre el nombre en un listado.
   * @param {string} url - Url del episodio.
   */
  function showEpisodeListedInfo(url){
    limpiar();
    document.getElementById(`anyadido`).innerHTML="";

      fetch(`${url}`)
      .then(response => response.json())
      .then(episode => {
        valoresBusqueda=episode.name;
        searchBeforeList();

          const breakLine=document.createElement(`br`);
          
          const nameEpisode=document.createElement(`h2`);
          nameEpisode.textContent=episode.name;

          const idEpisode=document.createElement(`p`);
          idEpisode.classList.add(`tableContent`);
          idEpisode.textContent=`Id: ${episode.id}`;

          const airDateEpisode=document.createElement(`p`);
          airDateEpisode.classList.add(`tableContent`);
          airDateEpisode.textContent=`Air Date: ${episode.air_date}`;

          const episodeEpisode=document.createElement(`p`);
          episodeEpisode.classList.add(`tableContent`);
          episodeEpisode.textContent=`Episdde: ${episode.episode}`;

          const createdEpisode=document.createElement(`p`);
          createdEpisode.classList.add(`tableContent`);
          createdEpisode.textContent=`Created: ${episode.created}`;

          const infoTable=document.createElement(`div`);
          infoTable.classList.add(`resultadoTabla`);
          infoTable.appendChild(nameEpisode);
          infoTable.appendChild(idEpisode);
          infoTable.appendChild(airDateEpisode);
          infoTable.appendChild(episodeEpisode);
          infoTable.appendChild(createdEpisode);
          infoTable.appendChild(breakLine);

          const charactersEpisode=document.createElement(`h3`);
          charactersEpisode.classList.add(`selectorh3`);
          charactersEpisode.textContent=`Characters`;

          infoTable.appendChild(charactersEpisode);

          for(let i=0;i<episode.characters.length;i++){
              fetch(`${episode.characters[i]}`)
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