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

// Carregar a API de autenticação do Google
function start() {
  gapi.client.init({
    'apiKey': 'YOUR_API_KEY',  // Chave da API
    'clientId': 'YOUR_CLIENT_ID.apps.googleusercontent.com',  // Seu Client ID OAuth 2.0
    'scope': 'https://www.googleapis.com/auth/earthengine.readonly',  // Permissão para acessar o Earth Engine
    'discoveryDocs': ['https://earthengine.googleapis.com/$discovery/rest?version=v1alpha'],  // Endpoint do GEE
  }).then(function() {
    // Verificar o status de autenticação
    if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
      onSignIn();
    } else {
      document.getElementById('signInButton').style.display = 'block';
    }
  });
}

// Função chamada após a autenticação do usuário
function onSignIn() {
  gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
  document.getElementById('signInButton').style.display = 'none';  // Esconde o botão de login após autenticação
  // Inicializar o Earth Engine
  ee.initialize();
  console.log('GEE está inicializado');
  // Agora você pode consumir os dados do GEE
}

// Atualiza o estado de autenticação
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    onSignIn();
  }
}

// Inicializar a biblioteca de autenticação do Google
gapi.load('client:auth2', start);

// Função para fazer login
function handleSignInClick() {
  gapi.auth2.getAuthInstance().signIn();
}

// Função para fazer logout
function handleSignOutClick() {
  gapi.auth2.getAuthInstance().signOut();
}

