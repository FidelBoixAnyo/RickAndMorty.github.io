/**
 * Contenido XML a exportar.
 * @type {string}
 */
var xml = '<?xml version="1.0" encoding="UTF-8"?>\n';

/**
 * Muestra los datos de los personajes importados como tarjetas en el contenedor.
 * @param {Array} characters - Array de objetos de personajes a mostrar.
 */
function displayImportedData(characters) {
  const container = document.getElementById('containerCardsTable');
  container.innerHTML = ''; // Limpiar el contenido existente

  characters.forEach((character) => {
    const card = document.createElement('div');
    card.classList.add('card-character');

    const imgCard = document.createElement('img');
    imgCard.src = character.image;
    imgCard.alt = character.name;

    const containerDescription = document.createElement('div');
    containerDescription.classList.add('description-card');

    const nameCharacter = document.createElement('input');
    nameCharacter.type = 'button';
    nameCharacter.className = 'fakeh2';
    nameCharacter.value = character.name;
    nameCharacter.onclick = function () {
      showInfo(character.url);
    };

    containerDescription.appendChild(nameCharacter);

    card.appendChild(imgCard);
    card.appendChild(containerDescription);

    container.appendChild(card);
  });
}

/**
 * Exporta el contenido XML.
 * @param {string} xmlContent - Contenido XML a exportar.
 */
function exportXML(xmlContent) {
  const dataURI = 'data:text/xml;charset=utf-8,' + encodeURIComponent(xmlContent);
  const a = document.createElement("a");
  a.href = dataURI;
  a.download = 'rick_and_morty_search.xml';
  a.click();
}

/**
 * Importa el contenido XML.
 */
function importXML() {

  limpiar();

  document.getElementById("characters").innerHTML="Characters";
  
  const fileInput = document.getElementById("importFile");
  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    const xmlString = event.target.result;
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");
    const characters = xmlDoc.getElementsByTagName("character");
    const importedData = [];

    for (let i = 0; i < characters.length; i++) {
      const imageElement = characters[i].getElementsByTagName("image")[0];
      const nameElement = characters[i].getElementsByTagName("name")[0];
      const urlElement = characters[i].getElementsByTagName("url")[0];

      const image = imageElement ? imageElement.textContent : "";
      const name = nameElement ? nameElement.textContent : "";
      const url = urlElement ? urlElement.textContent : "";

      importedData.push({
        name: name,
        image: image,
        url: url,
      });
    }

    filteredData = importedData;
    displayImportedData(filteredData);
  };

  reader.readAsText(file);
}

/**
 * Función para añadir la última linea necesaria en el xml y exportarlo.
 */
function executeExport() {
  xml += '</characters>\n';
  exportXML(xml);
}
