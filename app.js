// Carregar o mapa do Google Earth Engine
document.getElementById('showMap').addEventListener('click', function() {
  // Inicializa o Earth Engine
  ee.initialize();

  // Cria o mapa
  var map = new ee.Map();

  // Defina uma área de visualização (exemplo: um ponto específico)
  var geometry = ee.Geometry.Point([-47.929, -15.780]);

  // Carrega uma coleção de imagens
  var dataset = ee.ImageCollection('COPERNICUS/S2')
                 .filterBounds(geometry)
                 .filterDate('2020-01-01', '2020-12-31')
                 .first();

  // Renderiza a imagem no mapa
  map.addLayer(dataset, {bands: ['B4', 'B3', 'B2'], min: 0, max: 3000}, 'Imagem Sentinel-2');

  // Atribui o mapa ao contêiner
  map.setCenter(-47.929, -15.780, 10);
  map.render(document.getElementById('mapContainer'));
});
