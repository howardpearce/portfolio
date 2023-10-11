// variables that need global context for interacting with other parts of the website
var currentColorIsDark = false;
var currentColorIsLight = false;
let grid;
let renderer;
let camera;
let canvas;

// constants
const CIRCLE_SPEED = 0.075;
const DRIFT_SPEED = 0.05;
const GUARD = 0.05;
const SCENE_WIDTH = 14;
const SCENE_HEIGHT = 16;
const LIGHT_COLOR = 0xD9D9D9;
const DARK_COLOR = 0x1E1E1E;
const MOBILE_SCREEN_SIZE = 860;

class DotGrid {
  constructor(screenWidth, sceneWidth, sceneHeight, screenHeight, particleSeparation, bufferGeometry) {
    this.screenWidth = screenWidth;
    this.sceneWidth = sceneWidth;
    this.sceneHeight = sceneHeight;
    this.screenHeight = screenHeight;
    this.particleSeparation = particleSeparation;
    this.particleCount = Math.round((this.sceneWidth / this.particleSeparation) * (this.sceneHeight / this.particleSeparation));
    this.originalParticlePosition = new Float32Array(this.numberOfParticles * 3);
    this.currentParticlePosition = new Float32Array(this.numberOfParticles * 3);
    this.particleColors = new Float32Array(this.numberOfParticles * 3);
    this.bufferGeometry = bufferGeometry;
  }

  initializePosition() {
    var startX = this.sceneWidth / -2;
    var startY = this.sceneHeight / 2;
    var endX = this.sceneWidth / 2;
    var endY = this.sceneWidth / -2;
    var x = startX;
    var y = startY;
    var z = -5;
    var index = 0;
    // for every particle, set its position
    for (let i = 0; i < this.numberOfRowsRequired; i+=1) {
      for ( let j = 0; j < this.particlesPerRow; j+=1) {
        this.currentParticlePosition[index] = x;
        this.currentParticlePosition[index+1] = y;
        this.currentParticlePosition[index+2] = z;
        this.originalParticlePosition[index] = x;
        this.originalParticlePosition[index+1] = y;
        this.originalParticlePosition[index+2] = z;
        x += this.particleSeparation;
        index += 3;
      }
      y -= this.particleSeparation;
      x = startX;
    }
    this.bufferGeometry.setAttribute('position', new THREE.BufferAttribute(this.currentParticlePosition, 3));
  }

  initializeColor(color) {
    const particleColor = new THREE.Color(color);
    var index = 0;
    for (let i = 0; i < this.numberOfRowsRequired; i+=1) {
      for ( let j = 0; j < this.particlesPerRow; j+=1) {
        this.particleColors[index] = particleColor.r;
        this.particleColors[index+1] = particleColor.g;
        this.particleColors[index+2] = particleColor.b;
        index += 3;
      }
      // for the last 30 rows, change the color to make a gradient from light to dark
      if (i > this.numberOfRowsRequired - 30) {
        color -= 0x070707;
        particleColor.setHex(color);
      }
    }

    this.bufferGeometry.setAttribute('color', new THREE.BufferAttribute(this.particleColors, 3));
  }

  changeColor(color) {
    var originalColor = color;
    const colorToChangeTo = new THREE.Color(color);
    var colorArray = this.bufferGeometry.attributes.color.array;
    var index = 0;
    for (let i = 0; i < this.numberOfRowsRequired; i+=1) {
      for ( let j = 0; j < this.particlesPerRow; j+=1) {
        colorArray[index] = colorToChangeTo.r;
        colorArray[index+1] = colorToChangeTo.g;
        colorArray[index+2] = colorToChangeTo.b;
        index += 3;
      }
      // for the last 30 rows, change the color to make a gradient from light to dark
      if (i > this.numberOfRowsRequired - 30) {
        if (originalColor > 0xCCCCCC) {
          color -= 0x070707;
        } else {
          color += 0x070707;
        }
        colorToChangeTo.setHex(color);
      }
    }
  }

  get particlesPerRow() {
    return Math.round(this.sceneWidth / this.particleSeparation);
  }

  get numberOfRowsRequired() {
    return Math.round(this.sceneHeight / this.particleSeparation);
  }

  get numberOfParticles() {
    return this.particlesPerRow * this.numberOfRowsRequired;
  }

}

var animation = function () {
  // container for animation
  canvas = document.querySelector("#hero-graphic");
  var width = canvas.clientWidth;
  var height = canvas.clientHeight;

  var waveCenterX = 0;
  var waveCenterY = 0;
  var radius = 0.1;

  // color of each particle
  var particleColors = [];
  var darkParticleColors = [];

  const bufferGeometry = new THREE.BufferGeometry();

  grid = new DotGrid(width, SCENE_WIDTH, SCENE_HEIGHT, height, 0.125, bufferGeometry);
  grid.initializePosition();
  grid.initializeColor(LIGHT_COLOR);

  // set up scene
  var scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(115, width / height, 1, 20 );
  renderer = new THREE.WebGLRenderer( { alpha: true } );

  renderer.setClearColor(0x000000, 0);
  renderer.setSize(width, height);
  canvas.appendChild(renderer.domElement);

  var material = new THREE.PointsMaterial( { size: 0.01, vertexColors: true } );
  bufferGeometry.dynamic = true;
  var particlesMesh = new THREE.Points(bufferGeometry, material);
  scene.add(particlesMesh);

  addLighting();

  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });

  animate();

  /* FUNCTION DECLARATIONS DOWN BELOW ------------------------------------------------------------- */

  function addLighting() {
    var light1 = new THREE.PointLight(0xFFFFFF);
    light1.position.x = 0;
    light1.position.y = 0;
    light1.position.z = 0;
    scene.add(light1);
  }

  function distanceFromCenter(x, y) {
    return Math.sqrt(Math.pow(x - waveCenterX, 2) + Math.pow(y - waveCenterY, 2));
  }

  function driftToOrigin(diff, index, position) {
    if (Math.abs(diff) > GUARD) {
      if (diff < 0) {
        position[index] -= DRIFT_SPEED;
      } else {
        position[index] += DRIFT_SPEED;
      }
    } else {
      position[index] = grid.originalParticlePosition[index];
    }
  }

  function animateParticles() {
    for (let i = 0; i < grid.numberOfParticles * 3; i+=3) {
      var currentPosition = bufferGeometry.attributes.position.array;
      // calculate the difference between its origin and current location in all 3 dimensions
      var diffX = grid.originalParticlePosition[i] - currentPosition[i];
      var diffY = grid.originalParticlePosition[i+1] - currentPosition[i+1];
      var diffZ = grid.originalParticlePosition[i+2] - currentPosition[i+2];
      driftToOrigin(diffX, i, currentPosition);
      driftToOrigin(diffY, i+1, currentPosition);
      driftToOrigin(diffZ, i+2, currentPosition);
    }
    bufferGeometry.attributes.position.needsUpdate = true;
  }

  function animate() {
    requestAnimationFrame( animate );
    // don't bother doing expensive math if the user can't see it!
    if (window.innerWidth >= MOBILE_SCREEN_SIZE) {
      radius += CIRCLE_SPEED;
      var currentPosition = bufferGeometry.attributes.position.array;
      //bufferGeometry.material.color.setHex(0xff0000);
      for (let i = 0; i < grid.numberOfParticles * 3; i+=3) {
        var distance = distanceFromCenter(currentPosition[i], currentPosition[i+1]);
        var normalizedDistance = radius - distance;
        if ( Math.abs(normalizedDistance) < 0.8 ) {
          currentPosition[i+2] = grid.originalParticlePosition[i+2] + (Math.cos(normalizedDistance * 2) / 2);
        }
      }

      if (radius > 40) {
        radius = 0.1;
        waveCenterX = (Math.random() - 0.5) * 40;
        waveCenterY = (Math.random() - 0.5) * 15;
      }

      animateParticles();

      if (currentColorIsLight == true) {
        grid.changeColor(0x000000);
        currentColorIsLight = false;
      }

      if (currentColorIsDark == true) {
        grid.changeColor(0xD9D9D9);
        currentColorIsDark = false;
      }

      bufferGeometry.attributes.position.needsUpdate = true;
      bufferGeometry.attributes.color.needsUpdate = true;
    }
  }

}

// Cannot start until HTML has been rendered
isElementLoaded('app-hero-section').then((heroGraphic) => {

  animation()
  window.addEventListener( 'resize', onWindowResize, false );

});

function onWindowResize(){
  if (window.innerWidth > MOBILE_SCREEN_SIZE) {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( canvas.clientWidth, canvas.clientHeight );
  }
}
