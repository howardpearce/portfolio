// Constant global values
const CAMERA_FOV = 30
const CAMERA_Z = 10
const PLANE_Z = 0
const PARTICLE_SIZE = 0.02;
const PARTICLE_SEPARATION = 0.05;

const COLOR_MODE = { DARK: 0x999999, LIGHT: 0x777777 }
const DOT_SIZE = { SMALL: 0.02, BIG: 0.03 }

const LIMIT=255

// ----------------------------------------------------------------

class Vector2 {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	dot(other) {
		return this.x*other.x + this.y*other.y;
	}
}

function Shuffle(arrayToShuffle) {
	for(let e = arrayToShuffle.length-1; e > 0; e--) {
		const index = Math.round(Math.random()*(e-1));
		const temp = arrayToShuffle[e];

		arrayToShuffle[e] = arrayToShuffle[index];
		arrayToShuffle[index] = temp;
	}
}

function MakePermutation() {
	const permutation = [];
	for(let i = 0; i < LIMIT+1; i++) {
		permutation.push(i);
	}

	Shuffle(permutation);

	for(let i = 0; i < LIMIT+1; i++) {
		permutation.push(permutation[i]);
	}

	return permutation;
}
var Permutation = MakePermutation();

function GetConstantVector(v) {
	// v is the value from the permutation table
	const h = v & 3;
	if(h == 0)
		return new Vector2(1.0, 1.0);
	else if(h == 1)
		return new Vector2(-1.0, 1.0);
	else if(h == 2)
		return new Vector2(-1.0, -1.0);
	else
		return new Vector2(1.0, -1.0);
}

function Fade(t) {
	return 6*t*t*t*t*t - 15*t*t*t*t + 10*t*t*t;
}

function Lerp(t, a1, a2) {
	return a1 + t*(a2-a1);
}

function Noise2D(x, y) {
	const X = Math.floor(x) & LIMIT;
	const Y = Math.floor(y) & 255;

	const xf = x-Math.floor(x);
	const yf = y-Math.floor(y);

	const topRight = new Vector2(xf-1.0, yf-1.0);
	const topLeft = new Vector2(xf, yf-1.0);
	const bottomRight = new Vector2(xf-1.0, yf);
	const bottomLeft = new Vector2(xf, yf);

	// Select a value from the permutation array for each of the 4 corners
	const valueTopRight = Permutation[Permutation[X+1]+Y+1];
	const valueTopLeft = Permutation[Permutation[X]+Y+1];
	const valueBottomRight = Permutation[Permutation[X+1]+Y];
	const valueBottomLeft = Permutation[Permutation[X]+Y];

	const dotTopRight = topRight.dot(GetConstantVector(valueTopRight));
	const dotTopLeft = topLeft.dot(GetConstantVector(valueTopLeft));
	const dotBottomRight = bottomRight.dot(GetConstantVector(valueBottomRight));
	const dotBottomLeft = bottomLeft.dot(GetConstantVector(valueBottomLeft));

	const u = Fade(xf);
	const v = Fade(yf);

	return Lerp(u,
		Lerp(v, dotBottomLeft, dotTopLeft),
		Lerp(v, dotBottomRight, dotTopRight)
	);
}

// ---------------------------------

/**
 * One-off utility functions
 */
class Utils {
    static degreesToRadians(degrees) {
        return (degrees * Math.PI )/ 180
    }

    static getRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

    static clampRange(min, max, value) {
        if (value < min) return min;
        if (value > max) return max;
        return value
    }
}

/**
 * Wrapper for THREE.PerspectiveCamera. Takes care of basic initialization.
 * Offers basic hooks to manipulate the camera.
 */
class Camera {
    constructor(width, height, near, far) {
        this.cam = new THREE.PerspectiveCamera( CAMERA_FOV, width / height, near, far);
        this.setZ(CAMERA_Z)
    }

    setZ(z) { this.cam.position.setZ(z); }
    setX(x) { this.cam.position.setY(y); }
    setY(y) { this.cam.position.setX(x); }

    getCamera() {
        return this.cam;
    }

    updateAspect(aspect) {
        this.cam.aspect = aspect
        this.cam.updateProjectionMatrix();
    }
}

/**
 * Wrapper for THREE.WebGLRenderer. Takes care of basic initialization.
 */
class Renderer {
    constructor(containingElement) {
        this.rend = new THREE.WebGLRenderer({
            canvas: containingElement,
            alpha: true
        });
        this.rend.setPixelRatio( window.devicePixelRatio );
        this.rend.setSize( containingElement.clientWidth, containingElement.clientHeight );
        this.rend.setClearColor(0x000000, 0);
    }

    getRenderer() {
        return this.rend;
    }

    setSize(width, height) {
        this.rend.setSize(width, height)
    }
}

/**
 * Represents the dimensions of a euclidean plane defined by a 'slice' of the
 * camera frustrum that is defined by a certain Z axis.
 */
class Plane {
    constructor(pixelWidth, pixelHeight) {
        this.pixelHeight = pixelHeight;
        this.pixelWidth = pixelWidth;
        this.aspectRatio = this.pixelWidth / this.pixelHeight;
        // calculate the boundaries of this plane in THREE.JS co-ordinates
        this.top = Math.tan(Utils.degreesToRadians(CAMERA_FOV / 2)) * (CAMERA_Z - PLANE_Z);
        this.bottom = this.top * -1;
        this.right = this.top * this.aspectRatio;
        this.left = this.right * -1;
    }

    toString() {
        return `Plane {
            pixelHeight: ${this.pixelHeight},
            pixelWidth: ${this.pixelWidth},
            aspectRatio: ${this.aspectRatio},
            top: ${this.top},
            bottom: ${this.bottom},
            right: ${this.right},
            left: ${this.left},
            width: ${this.getWidth()},
            height: ${this.getHeight()}
        }`
    }

    getMaxX() {
        return this.right;
    }

    getMinX() {
        return this.left;
    }

    getMaxY() {
        return this.top;
    }

    getMinY() {
        return this.bottom;
    }

    getWidth() {
        return this.getMaxX() * 2
    }

    getHeight() {
        return this.getMaxY() * 2
    }

    setPixelSize(width, height) {
      this.pixelWidth = width;
      this.pixelHeight = height;
      this.aspectRatio = this.pixelHeight / this.pixelWidth;
      this.top = Math.tan(Utils.degreesToRadians(CAMERA_FOV / 2)) * (CAMERA_Z - PLANE_Z);
      this.bottom = this.top * -1;
      this.right = this.top * this.aspectRatio;
      this.left = this.right * -1;
    }
}


/**
 * Object that represents a rectangular grid of particles. 'Shapes' can exist within the grid
 * that are visible by increasing the x-axis on those shapes
 */
class DotGrid {
    // Resources
    // https://discourse.threejs.org/t/solved-how-do-we-size-something-using-screen-pixels/1177
    // https://www.scratchapixel.com/lessons/3d-basic-rendering/perspective-and-orthographic-projection-matrix/opengl-perspective-projection-matrix.html

    constructor(width, height) {
        this.plane = new Plane(width, height);
        this.particleSize = PARTICLE_SIZE;
        this.particleSeparation = PARTICLE_SEPARATION;
        this.currentParticlePosition = new Float32Array(this.numberOfParticles * 3);
        this.particleColors = new Float32Array(this.numberOfParticles * 3);
        this.bufferGeometry = new THREE.BufferGeometry();
        this.material = new THREE.PointsMaterial( { size: this.particleSize, vertexColors: true } );
        this.bufferGeometry.dynamic = true;
        this.particlesMesh = new THREE.Points(this.bufferGeometry, this.material);
        this.ticks = 0

        this.initializeRandomGrid()

        // generate dark color
        this.lightColor = this.generateColorArray(COLOR_MODE.DARK)
        // generate light color
        this.darkColor = this.generateColorArray(COLOR_MODE.LIGHT)

        this.setColor(COLOR_MODE.DARK);
    }

    resetSize(width, height) {
        this.currentParticlePosition = new Float32Array(this.numberOfParticles * 3);
        this.particleColors = new Float32Array(this.numberOfParticles * 3);
        this.bufferGeometry = new THREE.BufferGeometry();
        this.material = new THREE.PointsMaterial( { size: this.particleSize, vertexColors: true } );
        this.bufferGeometry.dynamic = true;
        this.particlesMesh = new THREE.Points(this.bufferGeometry, this.material);
    }

    /**
     * Generates an array of colors used for the DotGrid's PointMaterial mesh.
     */
    generateColorArray(color) {
      var colorArray = new Float32Array(this.numberOfParticles * 3);
      const particleColor = new THREE.Color(color);
      var index = 0;
      for (let i = 0; i < this.numberOfRowsRequired; i++) {
          for ( let j = 0; j < this.particlesPerRow; j++) {
              colorArray[index] = particleColor.r;
              colorArray[index+1] = particleColor.g;
              colorArray[index+2] = particleColor.b;
              index += 3;
          }
      }

      return colorArray
    }

    animate() {

        this.ticks++

        var index = 0;
        for(var i = 0; i <= this.numberOfRowsRequired - 1 ; i++) {
            var x = this.plane.getMinX() + (this.particleSize / 2);
            for (var j = 0; j <= this.particlesPerRow - 1; j++) {
                var n = 0.065 * Noise2D(this.currentParticlePosition[index], this.currentParticlePosition[index + 1])
                var a = Math.PI * 2 * n
                this.currentParticlePosition[index] -= Math.cos(a) * 0.005
                this.currentParticlePosition[index+1] += Math.sin(a-0.2) * 0.005

                // reset if out of screen
                if (this.currentParticlePosition[index] <= this.plane.left) {
                    this.currentParticlePosition[index] = this.plane.right * 1.5
                    this.currentParticlePosition[index+1] = Utils.getRandomNumber(this.plane.bottom * 1.15, this.plane.top * 1.15);
                }

                if (this.ticks > 6000) {
                    this.ticks = 0
                    console.log("tick")
                }

                index += 3;
            }
        }

        this.bufferGeometry.attributes.position.needsUpdate = true;
    }

    /**
     * Initialize the dot grid randomly, such that each dot is randomly positioned.
     */
    initializeRandomGrid() {
        var index = 0;
        for(var i = 0; i <= this.numberOfRowsRequired - 1 ; i++) {
            var x = this.plane.getMinX() + (this.particleSize / 2);
            for (var j = 0; j <= this.particlesPerRow - 1; j++) {
                this.currentParticlePosition[index] = Utils.getRandomNumber(this.plane.left, this.plane.right * 1.5);
                this.currentParticlePosition[index+1] = Utils.getRandomNumber(this.plane.bottom, this.plane.top);
                this.currentParticlePosition[index+2] = PLANE_Z;

                index += 3;
            }
        }
        this.bufferGeometry.setAttribute('position', new THREE.BufferAttribute(this.currentParticlePosition, 3));
    }

    /**
    * Applies a color for each dot in the grid. TODO: UPDATE THIS DOC
    * @param {*} color color to use (uses THREE.Color)
    */
    setColor(color) {
      switch(color) {
          case COLOR_MODE.DARK:
            this.bufferGeometry.setAttribute('color', new THREE.BufferAttribute(this.lightColor, 3));
            this.material.size = DOT_SIZE.SMALL
            break;
          case COLOR_MODE.LIGHT:
            this.bufferGeometry.setAttribute('color', new THREE.BufferAttribute(this.darkColor, 3));
            this.material.size = DOT_SIZE.BIG
            break;
        }
    }

    getGrid() {
        return this.particlesMesh;
    }

    toString() {
        return `Grid {
            particlesPerRow: ${this.particlesPerRow},
            numberOfRowsRequired: ${this.numberOfRowsRequired},
            particleCount: ${this.particleCount},
            particleSize: ${this.particleSize},
            particleSeparation: ${this.particleSeparation}
            plane: ${this.plane.toString()}
        }`
    }

    get particlesPerRow() {
        return Math.round(this.plane.getWidth() / this.particleSeparation);
    }

    get numberOfRowsRequired() {
        return Math.round(this.plane.getHeight() / this.particleSeparation);
    }

    get numberOfParticles() {
        return this.particlesPerRow * this.numberOfRowsRequired;
    }
}

/**
 * Manages initialization of resources and lifecycle of ThreeJS animation.
 */
class Animation {
    constructor() {
        this.scene = new THREE.Scene();
        this.container = document.querySelector("#hero-graphic");
        this.camera = new Camera(this.container.clientWidth, this.container.clientHeight, 0.1, 1000);
        this.renderer = new Renderer(this.container);

        this.grid = new DotGrid(this.container.clientWidth, this.container.clientHeight)

        this.scene.add(this.grid.getGrid())
    }
}

/**
 * Resize the animation by manually resizing the canvas to its containing element. Also resizes and resets the ThreeJS animation.
 */
function resetAnimationSize() {
    // grab containing element for the hero animation
    var canvas = document.getElementById('hero-graphic')
    var width = window.innerWidth
    var height = window.innerHeight
    // modify the canvas
    canvas.setAttribute("width", width)
    canvas.setAttribute("style", "width: " + width + "px; height: " +  height + "px;")
    // calculate the new size
    var aspect = width / height;
    // modify the animation to use the new width
    ani.renderer.setSize(width, height)
    ani.camera.updateAspect(aspect)
    // destroy the existing geometry and objects
    ani.grid.bufferGeometry.dispose()
    ani.grid.material.dispose()
    ani.scene.remove(ani.grid.particlesMesh)
    // replace with a fresh grid
    ani.grid = new DotGrid(width, height)
    ani.scene.add(ani.grid.getGrid())
}

/**
 * When a user resizes a window, usually a series of events fires. This function waits for the user to stop resizing the window and then executes the provided function
 * @param action a function to execute after the user finishes resizing.
 * @returns resolve
 */
function waitForResizeToFinish(action) {
    return new Promise(async (resolve) => {
        now = new Date().getTime()
        while (now - lastResetTime < 200) {
            await sleep(10)
            now = new Date().getTime()
        }
        // reset for next resize event
        lastResetTime = null
        if (typeof action === 'function') {
            action()
        } else {
            console.log("Invalid argument provided for waitForResizeToFinish. An argument of type function must be provided.")
        }
        // reset the animation to have a new size
        resetAnimationSize()
        return resolve
    });
}

/**
 * Sleep for a given number of ms
 * @param {number} delay the number of ms to sleep
 * @returns Promise
 */
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

var lastResetTime = null

addEventListener("resize", (event) => {
    if (lastResetTime == null) {
        lastResetTime = new Date().getTime()
        waitForResizeToFinish(resetAnimationSize)
    } else {
        lastResetTime = new Date().getTime()
    }
});

/**
 * Animation loop. I wanted this to be a part of the Animation class but ThreeJS doesn't play nice with OOP.
 * TODO: Add configurable framerate?
 */
function animate() {
    ani.frame = requestAnimationFrame(animate);
    ani.renderer.getRenderer().render(ani.scene, ani.camera.getCamera());
    ani.grid.animate();
}

isElementLoaded('#hero-graphic').then((heroGraphic) => {
  ani = new Animation(heroGraphic);
  animate();
})



