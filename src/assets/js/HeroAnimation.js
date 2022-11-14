var currentColorIsDark = false;
var currentColorIsLight = false;

// constants
const CIRCLE_SPEED = 0.1;
const DRIFT_SPEED = 0.05;
const GUARD = 0.05;
const SCENE_WIDTH = 14;
const SCENE_HEIGHT = 22;

class DotGrid {
  constructor(screenWidth, sceneWidth, sceneHeight, screenHeight, particleSeparation) {
    this.screenWidth = screenWidth;
    this.sceneWidth = sceneWidth;
    this.sceneHeight = sceneHeight;
    this.screenHeight = screenHeight;
    this.particleSeparation = particleSeparation;
    this.particleCount = Math.round((this.sceneWidth / this.particleSeparation) * (this.sceneHeight / this.particleSeparation));
    this.originalParticlePosition = new Float32Array(this.numberOfParticles * 3);
    this.currentParticlePosition = new Float32Array(this.numberOfParticles * 3);
    this.particleColors = new Float32Array(this.numberOfParticles * 3);
  }

  initializeParticles() {
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
        //console.log(x.toFixed(2) + "," + y.toFixed(2));
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
  const canvas = document.querySelector("#hero-graphic");
  var width = canvas.clientWidth;
  var height = canvas.clientHeight;

  var grid = new DotGrid(width, SCENE_WIDTH, SCENE_HEIGHT, height, 0.125);
  grid.initializeParticles();

  console.log(grid);
  console.log("Particles per row: " + grid.particlesPerRow);
  console.log("Number of rows required: " + grid.numberOfRowsRequired);

  var waveCenterX = 0;
  var waveCenterY = 0;
  var radius = 0.1;

  // color of each particle
  var particleColors = [];
  var darkParticleColors = [];

  const bufferGeometry = new THREE.BufferGeometry();

  // grab CSS variables for color and convert them to usable hex
  var bodyStyle = getComputedStyle(document.body);
  var dotColor = bodyStyle.getPropertyValue("--primary-color");
  dotColor = parseInt(dotColor.trim().replace("#", ''), 16);

  // set up scene
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(115, width / height, 0.1, 9999 );
  const renderer = new THREE.WebGLRenderer( { alpha: true } );

  configureScene();
  createColorArray(dotColor);
  createParticleArray();
  addLighting();

  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });

  animate();

  /* FUNCTION DECLARATIONS DOWN BELOW ------------------------------------------------------------- */

  function createParticleArray() {
    // initialize array of dots
    const material = new THREE.PointsMaterial( { size: 0.01, vertexColors: true } );
    bufferGeometry.setAttribute('position', new THREE.BufferAttribute(grid.currentParticlePosition, 3));
    bufferGeometry.dynamic = true;
    var particlesMesh = new THREE.Points(bufferGeometry, material);
    scene.add(particlesMesh);
  }

  function createColorArray(color) {
    //colors = [0xEC7063, 0x884EA0, 0x5DADE2, 0x76D7C4, 0x58D68D, 0xF7DC6F, 0xF8C471, 0xF0B27A ];
    //j = 0;
    const particleColor = new THREE.Color(0xffffff);
    for (let i = 0; i < grid.numberOfParticles; i+= 1) {

      particleColor.setHex(0xffffff);
      particleColors.push(particleColor.r, particleColor.g, particleColor.b)

    }
    bufferGeometry.setAttribute('color', new THREE.Float32BufferAttribute(particleColors, 3));
  }

  function changeColor(color) {
    const colorToChangeTo = new THREE.Color(color);
    var colorArray = bufferGeometry.attributes.color.array;
    for (let i = 0; i < grid.numberOfParticles * 3; i += 3) {
      colorArray[i] = colorToChangeTo.r;
      colorArray[i+1] = colorToChangeTo.g;
      colorArray[i+2] = colorToChangeTo.b;
    }
  }

  function configureScene() {
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(width, height);
    canvas.appendChild(renderer.domElement);
  }

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
      changeColor(0x000000);
      currentColorIsLight = false;
    }

    if (currentColorIsDark == true) {
      changeColor(0xD9D9D9);
      currentColorIsDark = false;
    }

    bufferGeometry.attributes.position.needsUpdate = true;
    bufferGeometry.attributes.color.needsUpdate = true;
  }

}

 // Cannot start until HTML has been rendered
 document.addEventListener("DOMContentLoaded", animation);
