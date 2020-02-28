//VARIABLES GLOBALES
var scene;
var unjugador;
var dosjugadores;
var jugador;
var jugador1;
var jugador2;
var camara;
var camara1;
var camara2;
var controls;
var objects = [];
var clock;
var deltaTime;	
var keys = {};

//MUNDO LISTO
var isWorldReady = [ false, false ];

//VARIABLES COLISION
var raycaster;
var objetosConColision = [];

$(document).ready(function(){

	setupScene();

	//INICIALIZAMOS EL RAYCASTER
	raycaster = new THREE.Raycaster();

	camera.misRayos = [
		new THREE.Vector3(0,0,1),
		new THREE.Vector3(0,0,-1),
		new THREE.Vector3(1,0,0),
		new THREE.Vector3(-1,0,0)
	];

	loadOBJWithMTL("assets/", "box.obj", "box.mtl", (object) => {
			var caja2 = object.clone();
			var caja3 = object.clone();
			var caja4 = object.clone();
			var caja5 = object.clone();
			var caja6 = object.clone();
			var caja7 = object.clone();
			var caja8 = object.clone();
			object.position.z = -60;
			caja2.position.z = 60;

			caja3.rotation.y = THREE.Math.degToRad(90);
			caja3.position.x = 30;

			caja4.rotation.y = THREE.Math.degToRad(90);
			caja4.position.x = 30;
			caja4.position.z = 30;

			caja5.rotation.y = THREE.Math.degToRad(90);
			caja5.position.x = 30;
			caja5.position.z = -30;

			caja6.rotation.y = THREE.Math.degToRad(90);
			caja6.position.x = -30;

			caja7.rotation.y = THREE.Math.degToRad(90);
			caja7.position.x = -30;
			caja7.position.z = 30;

			caja8.rotation.y = THREE.Math.degToRad(90);
			caja8.position.x = -30;
			caja8.position.z = -30;

			scene.add(object);
			scene.add(caja2);
			scene.add(caja3);
			scene.add(caja4);
			scene.add(caja5);
			scene.add(caja6);
			scene.add(caja7);
			scene.add(caja8);

			objetosConColision.push(object);
			objetosConColision.push(caja2);
			objetosConColision.push(caja3);
			objetosConColision.push(caja4);
			objetosConColision.push(caja5);
			objetosConColision.push(caja6);
			objetosConColision.push(caja7);
			objetosConColision.push(caja8);
			

		isWorldReady[0] = true;
	});

	loadOBJWithMTL("assets/", "jetski.obj", "jetski.mtl", (object) => {
		object.position.z = -10;
		object.rotation.x = THREE.Math.degToRad(-90);

		scene.add(object);
		isWorldReady[1] = true;
	});

	render();

	document.addEventListener('keydown', onKeyDown);
	document.addEventListener('keyup', onKeyUp);

});

function loadOBJWithMTL(path, objFile, mtlFile, onLoadCallback) {
	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.setPath(path);
	mtlLoader.load(mtlFile, (materials) => {
			
		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials(materials);
		objLoader.setPath(path);
		objLoader.load(objFile, (object) => {
			onLoadCallback(object);
		});

	});
}

function onKeyDown(event) {
	keys[String.fromCharCode(event.keyCode)] = true;
}
function onKeyUp(event) {
	keys[String.fromCharCode(event.keyCode)] = false;
}

	
function render() {
	requestAnimationFrame(render);
	deltaTime = clock.getDelta();	

	var yaw = 0;
	var forward = 0;
	if (keys["A"]) {
		yaw = 5;
	} else if (keys["D"]) {
		yaw = -5;
	}
	if (keys["W"]) {
		forward = -20;
	} else if (keys["S"]) {
		forward = 20;
	}

	if (isWorldReady[0] && isWorldReady[1]) {

		//ARREGLO QUE VA A ESTAR REVISANDO CONSTANTEMENTE LOS RAYOS
		for (var i = 0; i < camera.misRayos.length; i++){

			var rayo = camera.misRayos[i];

			raycaster.set(camera.position, rayo);

			var colision = raycaster.intersectObjects(
				objetosConColision,
				true
			);

			if ( colision.length > 0 ) {
				if (colision[0].distance < 1) {
					//SI HAY COLISION
					console.log("Estoy colisionando");
					//objetosConColision[i].rotation.y = THREE.Math.degToRad(90);
					//colision.parent(name)
					//colision[0].object.parent.tocando = true;
					debugger;
						
				}
			}
		}
			
		camera.rotation.y += yaw * deltaTime;
		camera.translateZ(forward * deltaTime);
	}
		
	
	renderer.render(scene, camera);
}

function setupScene() {		
	var visibleSize = { width: window.innerWidth-200, height: window.innerHeight-60};
	clock = new THREE.Clock();		
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, visibleSize.width / visibleSize.height, 0.1, 100);
	camera.position.z = 2;
	camera.position.y = 5;

	renderer = new THREE.WebGLRenderer( {precision: "mediump" } );
	renderer.setClearColor(new THREE.Color(0, 0, 0));
	renderer.setPixelRatio(visibleSize.width / visibleSize.height);
	renderer.setSize(visibleSize.width, visibleSize.height);

	var ambientLight = new THREE.AmbientLight(new THREE.Color(1, 1, 1), 1.0);
	scene.add(ambientLight);

	var directionalLight = new THREE.DirectionalLight(new THREE.Color(1, 1, 0), 0.4);
	directionalLight.position.set(0, 0, 1);
	scene.add(directionalLight);

	var grid = new THREE.GridHelper(50, 10, 0xffffff, 0xffffff);
	grid.position.y = -1;
	scene.add(grid);

	$("#scene-section").append(renderer.domElement);
}