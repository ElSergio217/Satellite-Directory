//Scene Settings
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 25, window.innerWidth/window.innerHeight, 0.1, 1e7 );
camera.position.z = 3;
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0x000000);
document.body.appendChild( renderer.domElement );

//Lights
dirLight = new THREE.DirectionalLight( 0xffffff, 2 );
dirLight.position.set( -1, 0, 50 );
scene.add( dirLight );

//LensFlare
var light = new THREE.PointLight( 0xffffff, 1.5, 2000 );
var textureLoader = new THREE.TextureLoader();
var textureFlare0 = textureLoader.load( "texture/lensflare0.png" );
var lensflare = new THREE.Lensflare();
lensflare.addElement( new THREE.LensflareElement( textureFlare0, 512, 0 ));
dirLight.add( lensflare );

//Earth
var geometry = new THREE.SphereGeometry(0.5, 32, 32);
var material  = new THREE.MeshPhongMaterial()
var c1 = new THREE.Mesh( geometry, material );
c1.rotation.z = 0.41;
material.map =  new THREE.TextureLoader().load('texture/earth_atmos_2048.jpg');
material.bumpMap =  new THREE.TextureLoader().load('texture/earth_normal_2048.jpg');
material.bumpScale = 0.05;
material.lights = true;
material.specularMap = new THREE.TextureLoader().load('texture/earth_specular_2048.jpg');
scene.add(c1);

//Clouds
var cloudsGeometry = new THREE.SphereGeometry(0.5, 32, 32);
var cloudsMaterial  = new THREE.MeshPhongMaterial()
var clouds = new THREE.Mesh( cloudsGeometry, cloudsMaterial );
cloudsMaterial.map =  new THREE.TextureLoader().load('texture/earth_clouds_1024.png');
cloudsMaterial.transparent = true;
clouds.scale.set(1.005,1.005,1.005);
clouds.rotation.z = 0.41;
scene.add(clouds);

//Stars
var i, r = 6371, starsGeometry = [ new THREE.BufferGeometry(), new THREE.BufferGeometry() ];
var vertices1 = [];
var vertices2 = [];
var vertex = new THREE.Vector3();

for ( i = 0; i < 250; i ++ ) {
	vertex.x = Math.random() * 2 - 1;
	vertex.y = Math.random() * 2 - 1;
	vertex.z = Math.random() * 2 - 1;
	vertex.multiplyScalar( r );
	vertices1.push( vertex.x, vertex.y, vertex.z );
}

for ( i = 0; i < 1500; i ++ ) {
	vertex.x = Math.random() * 2 - 1;
	vertex.y = Math.random() * 2 - 1;
	vertex.z = Math.random() * 2 - 1;
	vertex.multiplyScalar( r );
	vertices2.push( vertex.x, vertex.y, vertex.z );
}

starsGeometry[ 0 ].addAttribute( 'position', new THREE.Float32BufferAttribute( vertices1, 3 ) );
starsGeometry[ 1 ].addAttribute( 'position', new THREE.Float32BufferAttribute( vertices2, 3 ) );

var stars;
var starsMaterials = [
new THREE.PointsMaterial( { color: 0x555555, size: 2, sizeAttenuation: false } ),
new THREE.PointsMaterial( { color: 0x555555, size: 1, sizeAttenuation: false } ),
new THREE.PointsMaterial( { color: 0x333333, size: 2, sizeAttenuation: false } ),
new THREE.PointsMaterial( { color: 0x3a3a3a, size: 1, sizeAttenuation: false } ),
new THREE.PointsMaterial( { color: 0x1a1a1a, size: 2, sizeAttenuation: false } ),
new THREE.PointsMaterial( { color: 0x1a1a1a, size: 1, sizeAttenuation: false } )
];

for ( i = 10; i < 30; i ++ ) {
	stars = new THREE.Points( starsGeometry[ i % 2 ], starsMaterials[ i % 6 ] );
	stars.rotation.x = Math.random() * 6;
	stars.rotation.y = Math.random() * 6;
	stars.rotation.z = Math.random() * 6;
	stars.scale.setScalar( i * 10 );
	stars.matrixAutoUpdate = false;
	stars.updateMatrix();
	scene.add( stars );
}

//Controllers
var controls = new THREE.OrbitControls( camera );
controls.enablePan=false;
controls.screenSpacePanning = false;
controls.minDistance = 3;
controls.maxDistance = 10

var animate = function () {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
	c1.rotation.y += 0.001;
	clouds.rotation.y += 1.25 * 0.001;
	controls.update();
};

animate();

function changeFeed(img){
	document.getElementById("feed").innerHTML = '<img src="'+ img +'" class="w-100">';
}