// INTEGRATION TODO:
// 4. ADD ALL THE CODE COMMENTS!!!
// 6. Make the highlight around my headshot not so bright
// 7. Support for multiple resolutions

// Constant values
const CAMERA_FOV = 30
const CAMERA_Z = 80
const PLANE_Z = 0
const PARTICLE_SIZE = 0.05;
const PARTICLE_SEPARATION = 0.5;
const DOT_SIZE = { SMALL: 1, BIG: 2, DEBUG: 3 }
const COLOR_MODE = { DARK: 0xffffff, LIGHT: 0x000000, DEBUG: 0xFF0000 }

// feature flags
const COLOR_WAVE = false

// Global variables
var ani;

/**
 * One-off utility functions
 */
class Utils {
    /**
     *
     * @param {float} degrees
     * @returns degrees converted to radians
     */
    static degreesToRadians(degrees) {
        return (degrees * Math.PI )/ 180
    }

    /**
     *
     * @param {float} min
     * @param {float} max
     * @returns A random number between provided min and max
     */
    static getRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

    /**
     *
     * @param {float} min minimum range
     * @param {float} max maximum range
     * @param {float} value value to be 'clamped'
     * @returns The same value, bounded by the provided max and min
     */
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

    /**
     *
     * @returns An internal reference to the THREE JS Camera object
     */
    getCamera() {
        return this.cam;
    }

    /**
     *
     * @param {float} aspect new aspect ratio
     */
    updateAspect(aspect) {
        this.cam.aspect
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

    /**
     *
     * @returns An internal reference to the THREE JS Renderer object
     */
    getRenderer() {
        return this.rend;
    }

    /**
     *
     * @param {float} width new width for the renderer
     * @param {float} height new height for the renderer
     */
    setSize(width, height) {
        this.rend.setSize(width, height)
    }
}

/**
 * Represents the dimensions of a euclidean plane defined by a 'slice' of the
 * camera frustrum that is defined by a certain Z axis.
 */
class Plane {
    constructor(pixelHeight, pixelWidth) {
        this.pixelHeight = pixelHeight;
        this.pixelWidth = pixelWidth;
        this.aspectRatio = this.pixelHeight / this.pixelWidth;
        // calculate the boundaries of this plane in THREE.JS co-ordinates
        this.top = Math.tan(Utils.degreesToRadians(CAMERA_FOV / 2)) * (CAMERA_Z - PLANE_Z);
        this.bottom = this.top * -1;
        this.right = this.top * this.aspectRatio;
        this.left = this.right * -1;
    }

    /**
     *
     * @returns A string representation of the plane
     */
    toString() {
        return `Plane {
            pixelHeight: ${this.pixelHeight},
            pixelWidth: ${this.pixelWidth},
            aspectRation: ${this.aspectRatio},
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
}

/**
 * ProjectedObjects are objects that exist within the 'Dot Grid'. They are made visible
 * by 'colliding' with dots. Where a ProjectedObject collides with a dot, it raises its
 * z-axis such that you can see it. For easier understanding, google 'pin art'
 */
class ProjectedObject {

    /**
     *
     * @param {float} xPos X Position of object center
     * @param {float} yPos Y Position of object center
     * @param {float} width Width of the object
     * @param {float} height Heigh of the obejct
     */
    constructor(xPos, yPos, width, height) {
        this.x = xPos;
        this.y = yPos;
        this.width = width;
        this.heigh = height;
    }

    /**
     * Given an co-ordinate in [X,Y], determine if it intersects with this object
     * @param {float} xPos X position of the co-ordinate
     * @param {float} yPos Y position of the co-ordinate
     * @returns true if the co-ordinate shares the same space as this object (is inside of it)
     */
    colliding(xPos, yPos) {
        return null
    }

    /**
     * Given an co-ordinate in [X,Y], return the Z value for that co-ordinate to describe this
     * object on the dot grid.
     * @param {float} xPos X position of the co-ordinate
     * @param {float} yPos Y position of the co-ordinate
     * @returns new Z position for the co-ordinatge
     */
    getProjection(xPos, yPos) {
        return null
    }

    /**
     * Every ProjectedObject should have some kind of animation defined. Even if it does nothing.
     */
    animate() {}

    /**
     *
     * @param {float} xPos new x position
     * @param {float} yPos new y position
     */
    setPosition(xPos, yPos) {
      this.x = xPos;
      this.y = yPos;
    }
}

/**
 * Object that represents a rippling 'wave' that travels as a circle
 */
class Wave extends ProjectedObject {

    /**
     *
     * @param {float} xPos X position of the cetner of the wave
     * @param {float} yPos Y position of the center of the wave
     * @param {float} waveWidth 'width' of the wave (the size of the ripple)
     * @param {float} growthRate how fast the radius should expand
     */
    constructor(xPos, yPos, waveWidth, growthRate) {
        super(xPos, yPos, 0, 0)

        this.radius = 0
        this.growthRate = growthRate
        this.waveWidth = waveWidth
        this.gaussianCoefficient = 0  // Coefficient in gaussian equation to determine how wide it is

        while (true) {
            this.gaussianCoefficient += 0.01
            if (this.gaussian(waveWidth) < 0.02) {
                console.log("Gaussian coefficent calculated to be " + this.gaussianCoefficient)
                break
            }
        }
    }

    /**
     * @inheritdoc
     */
    animate() {
        this.setRadius(this.radius + this.growthRate)
    }

    /**
     * @inheritdoc
     */
    colliding(xPos, yPos) {
        if (this.distanceFromWaveCenter(xPos, yPos) < this.waveWidth) {
            return true;
        }
    }

    /**
     * How far is an [X, Y] co-ordinate from the middle of the 'wave ripple'
     * @param {float} xPos
     * @param {float} yPos
     * @returns euclidean distance from the middle of the 'wave ripple'
     */
    distanceFromWaveCenter(xPos, yPos) {
        return Math.abs(this.radius - this.distanceFromCenter(xPos, yPos))
    }

    /**
     * @inheritDoc
     */
    getProjection(xPos, yPos) {
        // No point in doing this if the object isn't colliding
        if (!this.colliding(xPos, yPos)) {
            return PLANE_Z;
        }
        // Apply a hacky scalar based on radius to prevent weird fisheye effect.
        return PLANE_Z + (this.gaussian(this.distanceFromWaveCenter(xPos, yPos)) * Math.min(1, 15/this.radius))
    }

    /**
     * Reset the wave
     */
    reset() {
        this.setRadius(0)
    }

    /**
     * Set the radius of the wave to a given size
     * @param {float} value new value for radius
     */
    setRadius(value) {
        this.radius = value
        this.width = value
        this.height = value
    }

    /**
     * Implementation of the Gaussian function (a nice hump shape).
     * @param {float} x input to gaussian function
     * @returns output of gaussian function (bounded between 3 and 0)
     */
    gaussian(x) {
        return 4*Math.exp(-1*(0.5*Math.pow((this.gaussianCoefficient*x), 2)))
    }

    /**
     * How far is an [X, Y] co-ordinate from the middle of the wave
     * @param {float} xPos X Co-ordinate of point
     * @param {float} yPos Y Co-ordinate of point
     * @returns Euclidean distance of the given X,Y co-ordinates to the center of the WAve
     */
    distanceFromCenter(xPos, yPos) {
        return Math.sqrt(Math.pow(Math.abs(xPos - this.x), 2) + Math.pow(Math.abs(yPos - this.y), 2))
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

    // TODO:
    // Refactor this to be dependent on resolution. Maintain constant 'dot' density.
    // Add more shapes to bed in the dot grid
    //   - A cube
    //   - A wave
    //   - ???
    //   - Add controls to switch the object on it (also represented by dots)
    // Shapes should be inserted by some kind of manager class rather than internally

    constructor(width, height) {
        this.plane = new Plane(height, width);

        this.particleSize = PARTICLE_SIZE;
        this.particleSeparation = PARTICLE_SEPARATION;
        this.particleCount = Math.round(this.particlesPerRow * this.numberOfRowsRequired);
        this.currentParticlePosition = new Float32Array(this.numberOfParticles * 3);
        this.particleColors = new Float32Array(this.numberOfParticles * 3);
        this.particleScale = new Float32Array(this.numberOfParticles);

        // generate dark color
        this.lightColor = this.generateColorArray(COLOR_MODE.DARK)
        // generate light color
        this.darkColor = this.generateColorArray(COLOR_MODE.LIGHT)

        // Create the THREE JS objects for the dot grid
        this.bufferGeometry = new THREE.BufferGeometry();
        // removing size attentuation changed my life
        this.material = new THREE.PointsMaterial( { size: this.particleSize, sizeAttenuation: false, vertexColors: true } );
        this.bufferGeometry.dynamic = true;
        this.particlesMesh = new THREE.Points(this.bufferGeometry, this.material);

        // Shapes to be used in the dot grid
        this.wave = new Wave(0, 0, 4, 0.075);
        this.shapes = [];
        this.shapes.push(this.wave)
    }

    /**
     * Animate the dot grid and any shapes within it
     */
    animate() {
        this.wave.animate();
        var index = 0;
        for(var i = 0; i <= this.numberOfRowsRequired - 1 ; i++) {
            var x = this.plane.getMinX() + (this.particleSize / 2);
            for (var j = 0; j <= this.particlesPerRow - 1; j++) {
                // this can't be efficient
                this.shapes.forEach((shape) => {
                    this.currentParticlePosition[index+2] = shape.getProjection(this.currentParticlePosition[index], this.currentParticlePosition[index+1])
                })
                index += 3;
            }
        }

        // If the radius is slightly bigger than the dot grid, reset it.
        if (this.wave.radius > this.plane.getWidth() * 1.25 && this.wave.radius > this.plane.getHeight() * 1.25) {
            this.wave.reset();
            // select a new center for the wave
            var newX = (Math.random() - 0.5) * this.plane.getWidth();
            var newY = (Math.random() - 0.5) * this.plane.getHeight();
            this.wave.setPosition(newX, newY);
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
                this.currentParticlePosition[index] = Utils.getRandomNumber(this.plane.left, this.plane.right);
                this.currentParticlePosition[index+1] = Utils.getRandomNumber(this.plane.bottom, this.plane.top);
                this.currentParticlePosition[index+2] = PLANE_Z;
                index += 3;
            }
        }
        this.bufferGeometry.setAttribute('position', new THREE.BufferAttribute(this.currentParticlePosition, 3));
    }

    /**
     * Adjust the position of each dot randomly
     */
    randomWalk() {
        var index = 0;
        for(var i = 0; i <= this.numberOfRowsRequired - 1 ; i++) {
            var x = this.plane.getMinX() + (this.particleSize / 2);
            for (var j = 0; j <= this.particlesPerRow - 1; j++) {
                // Walk randomly!
                var speed = 0.02;
                this.currentParticlePosition[index] += Utils.getRandomNumber(-1 * speed, speed);
                this.currentParticlePosition[index+1] += Utils.getRandomNumber(-1 * speed, speed);
                // Not too far!
                this.currentParticlePosition[index] = Utils.clampRange(this.plane.left, this.plane.right, this.currentParticlePosition[index])
                this.currentParticlePosition[index+1] = Utils.clampRange(this.plane.bottom, this.plane.top, this.currentParticlePosition[index+1])
                index += 3;
            }
        }
        this.bufferGeometry.attributes.position.needsUpdate = true;
    }

    /**
     * Initialize the dot grid with structure.
     */
    initializeSquareGrid() {
        var y = this.plane.getMaxY();
        var z = PLANE_Z;
        var index = 0;
        // for every particle, set its position
        for(var i = 0; i <= this.numberOfRowsRequired - 1 ; i++) {
            var x = this.plane.getMinX() + (this.particleSize / 2) + 2; // +2 is for extra space on the left. Prevents dots from disappearing if they move too much in Z axis
            for (var j = 0; j <= this.particlesPerRow - 1; j++) {
                this.currentParticlePosition[index] = x;
                this.currentParticlePosition[index+1] = y;
                this.currentParticlePosition[index+2] = z;
                x += this.particleSeparation;
                index += 3;
            }
            y -= this.particleSeparation;
        }
        this.bufferGeometry.setAttribute('position', new THREE.BufferAttribute(this.currentParticlePosition, 3));
    }

    /**
     * Generates an array of colors used for the DotGrid's PointMaterial mesh.
     */
    generateColorArray(color) {
        var colorArray = new Float32Array(this.numberOfRowsRequired * this.particlesPerRow * 3);
        var particleColor = new THREE.Color(color);
        var tempColor = color;
        var gradient;

        var index = 0;
        for (let i = 0; i < this.numberOfRowsRequired; i++) {
            for ( let j = 0; j < this.particlesPerRow; j++) {
              colorArray[index] = particleColor.r;
              colorArray[index+1] = particleColor.g;
              colorArray[index+2] = particleColor.b;
              index += 3;
            }
            // for the last 30 rows, change the color to make a gradient from light to dark
            // TODO: Lots is hardcoded here. Consider making this more stable.
            if (i > this.numberOfRowsRequired - 30) {
              tempColor -= gradient;
              particleColor.setHex(tempColor);
            }
        }
        return colorArray
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

    /**
     *
     * @returns A string representation of the object
     */
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
    constructor(container) {
        this.scene = new THREE.Scene();
        this.container = container
        this.camera = new Camera(this.container.clientWidth, this.container.clientHeight, 0.1, 1000);
        this.renderer = new Renderer(this.container);

        this.grid = new DotGrid(this.container.clientHeight, this.container.clientWidth)
        this.grid.initializeSquareGrid();
        this.grid.setColor(COLOR_MODE.DARK);

        this.scene.add(this.grid.getGrid())
    }
}

/**
 * Animation loop. I wanted this to be a part of the Animation class but ThreeJS doesn't play nice with OOP.
 * TODO: Add configurable framerate?
 */
function animate() {
    ani.frame = requestAnimationFrame(animate);
    ani.renderer.getRenderer().render(ani.scene, ani.camera.getCamera());
    ani.grid.animate();
}

var HERO_GRAPHIC_ID = '#hero-graphic';
// Cannot start until HTML has been rendered
isElementLoaded(HERO_GRAPHIC_ID).then((heroGraphic) => {
  ani = new Animation(heroGraphic);
  animate();
})
