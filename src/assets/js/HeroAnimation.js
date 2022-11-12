 var currentColorIsDark = false;
 var currentColorIsLight = false;

 var animation = function () {
  // container for animation
  const canvas = document.querySelector("#hero-graphic");
  var width = canvas.clientWidth;
  var height = canvas.clientHeight;

  // constants
  const CIRCLE_SPEED = 0.1;
  const DRIFT_SPEED = 0.05;
  const GUARD = 0.05;
  const SCENE_WIDTH = 50;
  const SCENE_HEIGHT = 10;
  const NEGATIVE_BOUND_Y = -5;
  const POSITIVE_BOUND_Y = NEGATIVE_BOUND_Y + SCENE_HEIGHT;
  const NEGATIVE_BOUND_X = -25;
  const POSITIVE_BOUND_X = NEGATIVE_BOUND_X + SCENE_WIDTH;

  // look at screen height. Change distance between each particle depending on screen size.
  // linear function derived from points (1126, 0.65), (700, 0.1)
  const getParticleSeparation = (inputHeight) => Math.max(0.04, inputHeight * -0.00008215962441314555 + 0.1575117370892018);
  var PARTICLE_SEPARATION = getParticleSeparation(height);

  // FIXME: Multiplying by 1.3 since rounding causes us to come up just a little bit short on the number of particles required.
  var particleCount = Math.round((SCENE_WIDTH / PARTICLE_SEPARATION) * (SCENE_HEIGHT / PARTICLE_SEPARATION) * 1.3);
  var waveCenterX = 0;
  var waveCenterY = 0;
  var radius = 0.1;

  // the original position of every particle in the array
  const originalParticlePosition = new Float32Array(particleCount * 3);
  // the current position (after being moved)
  var currentParticlePosition = new Float32Array(particleCount * 3);
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
  const camera = new THREE.PerspectiveCamera(90, width / height, 0.1, 9999 );
  const renderer = new THREE.WebGLRenderer( { alpha: true } );

  configureScene();
  createColorArray(dotColor);
  createParticleArray();
  addLighting();

  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });

  console.log(bufferGeometry);
  console.log(particleCount);

  animate();

  /* FUNCTION DECLARATIONS DOWN BELOW ------------------------------------------------------------- */

  function createParticleArray() {
    // initialize array of dots
    const material = new THREE.PointsMaterial( { size: 0.01, vertexColors: true } );

    // populate array with values (create a rectangular grid)
    var x = NEGATIVE_BOUND_X;
    var y = POSITIVE_BOUND_Y;
    var z = -5;
    // for every particle, set its position
    for (let i = 0; i < particleCount * 3; i+=3) {
      currentParticlePosition[i] = x;
      currentParticlePosition[i+1] = y;
      currentParticlePosition[i+2] = z;
      originalParticlePosition[i] = x;
      originalParticlePosition[i+1] = y;
      originalParticlePosition[i+2] = z;
      // wrap around at end of line
      if (x > POSITIVE_BOUND_X) {
        x = NEGATIVE_BOUND_X;
        y -= PARTICLE_SEPARATION;
      } else {
        x += PARTICLE_SEPARATION;
      }
    }

    bufferGeometry.setAttribute('position', new THREE.BufferAttribute(currentParticlePosition, 3));
    bufferGeometry.dynamic = true;
    var particlesMesh = new THREE.Points(bufferGeometry, material);
    scene.add(particlesMesh);
  }

  function createColorArray(color) {
    const particleColor = new THREE.Color(color);
    for (let i = 0; i < particleCount; i+= 1) {
      particleColor.setHex(color);
      particleColors.push(particleColor.r, particleColor.g, particleColor.b)
    }
    bufferGeometry.setAttribute('color', new THREE.Float32BufferAttribute(particleColors, 3));
  }

  function changeColor(color) {
    console.log("Switching to color " + color);
    const colorToChangeTo = new THREE.Color(color);
    var colorArray = bufferGeometry.attributes.color.array;
    for (let i = 0; i < particleCount * 3; i += 3) {
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
      position[index] = originalParticlePosition[index];
    }
  }

  function animateParticles() {
    for (let i = 0; i < particleCount * 3; i+=3) {
      var currentPosition = bufferGeometry.attributes.position.array;
      // calculate the difference between its origin and current location in all 3 dimensions
      var diffX = originalParticlePosition[i] - currentPosition[i];
      var diffY = originalParticlePosition[i+1] - currentPosition[i+1];
      var diffZ = originalParticlePosition[i+2] - currentPosition[i+2];
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
    for (let i = 0; i < particleCount * 3; i+=3) {
      var distance = distanceFromCenter(currentPosition[i], currentPosition[i+1]);
      var normalizedDistance = radius - distance;
      if ( Math.abs(normalizedDistance) < 0.8 ) {
        currentPosition[i+2] = originalParticlePosition[i+2] + (Math.cos(normalizedDistance * 2) / 2);
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
