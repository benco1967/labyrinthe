/**
 * Created by benoit on 02/08/17.
 */

/*
* 0,-1 => west
* -1, 0 => north
* 0, 1 => east
* 1, 0 => south
*/
const laby = [];
const alreadySeen = [];

let direction = 3;
let x = 2;
let y = 2;
let previousX = 2;
let previousY = 2;

Math.seedrandom('any string you like');

const generateLabyrinthe = (laby) => {
  for (let i = 0; i < 43; i++) {
    const squares = [];

    laby.push(squares);
    for (let j = 0; j < 43; j++) {
      squares.push(true);
    }
  }
  for (let i = 0; i < 42; i++) {
    laby[0][i] = 'void';
    laby[i][42] = 'void';
    laby[42][i + 1] = 'void';
    laby[i + 1][0] = 'void';
  }
  let k = 20 * 20;
  const generateWalls = (x, y) => {
    k--;
    if (k < 0) return;
    laby[y][x] = false;
    const dir = [0, 1, 2, 3];
    while (dir.length > 0 && k >= 0) {
      const rd = Math.floor(Math.random() * dir.length);
      switch (dir[rd]) {
        case 0:// west
          if (x > 2 && laby[y][x - 2] !== false) {
            laby[y][x - 1] = false;
            generateWalls(x - 2, y);
          }
          break;
        case 1:// north
          if (y > 2 && laby[y - 2][x] !== false) {
            laby[y - 1][x] = false;
            generateWalls(x, y - 2);
          }
          break;
        case 2:// east
          if (x < 40 && laby[y][x + 2] !== false) {
            laby[y][x + 1] = false;
            generateWalls(x + 2, y);
          }
          break;
        case 3:// south
          if (y < 40 && laby[y + 2][x] !== false) {
            laby[y + 1][x] = false;
            generateWalls(x, y + 2);
          }
          break;
      }
      dir.splice(rd, 1);
    }
  };
  generateWalls(2, 2);
/*
  for (let i = 2; i < 41; i++) {
    for (let j = 2; j < 41; j++) {
      laby[i][j] = false;
    }
  }
*/
  laby[1][2] = 'stair-up-north';
  laby[41][40] = 'stair-down-south';

  for(let i = 0; i < 5; i++) {
    laby[Math.floor(2 + Math.random() * 18) * 2 + 1][Math.floor(2 + Math.random() * 18) * 2 + 1] = 'ligth';
  }

/*
  laby[2 ][8 ] = 'stair-up-north';
  laby[7 ][12] = 'stair-up-east';
  laby[7 ][2 ] = 'stair-up-west';
  laby[12][7 ] = 'stair-up-south';

  laby[5 ][10] = 'stair-down-north';
  laby[10][15] = 'stair-down-east';
  laby[10][5 ] = 'stair-down-west';
  laby[15][10] = 'stair-down-south';
*/
};
const drawLabyrinthe = (laby, id) => {
  const canvas = document.getElementById(id);
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, laby[0].length * 10, laby.length * 10);
  for (let i = 0; i < laby[0].length; i++) {
    for (let j = 0; j < laby.length; j++) {
      const square = laby[j][i];
      switch (square) {
        case true:
          ctx.fillRect(10 * i, 10 * j, 10, 10);
          break;
        case false:
          ctx.clearRect(10 * i, 10 * j, 10, 10);
          break;
        case 'stair-down-east':
        case 'stair-up-east':
        case 'stair-down-west':
        case 'stair-up-west': {
          ctx.clearRect(10 * i, 10 * j, 10, 10);
          for (let l = 0; l < 5; l++) {
            ctx.fillRect(10 * i + l * 2, 10 * j, 1, 10);
          }
          break;
        }
        case 'stair-down-north':
        case 'stair-up-north':
        case 'stair-down-south':
        case 'stair-up-south': {
          ctx.clearRect(10 * i, 10 * j, 10, 10);
          for (let l = 0; l < 5; l++) {
            ctx.fillRect(10 * i, 10 * j + l * 2, 10, 1);
          }
          break;
        }
        case 'ligth':
          ctx.save();
          ctx.fillStyle = 'yellow';
          ctx.fillRect(10 * i, 10 * j, 10, 10);
          ctx.restore();
          break;
      }
    }
  }
};
const drawLabyrinthePos = (x, y, d, id) => {
  const canvas = document.getElementById(id);
  const ctx = canvas.getContext('2d');
  ctx.save();
  ctx.clearRect(10 * previousX, 10 * previousY, 10, 10);
  ctx.beginPath();
  ctx.arc(10 * previousX + 5, 10 * previousY + 5, 2, 0 , 2 * Math.PI, true);
  ctx.fillStyle = 'red';
  ctx.fill();
  previousX = x;
  previousY = y;
  ctx.clearRect(10 * x, 10 * y, 10, 10);
  ctx.beginPath();
  switch (d) {
    case 0: // east
      ctx.moveTo(10 * x, 10 * y);
      ctx.lineTo(10 * x, 10 * y + 10);
      ctx.lineTo(10 * x + 10, 10 * y + 5);
      break;
    case 1: // north
      ctx.moveTo(10 * x, 10 * y + 10);
      ctx.lineTo(10 * x + 10, 10 * y + 10);
      ctx.lineTo(10 * x + 5, 10 * y);
      break;
    case 2: // west
      ctx.moveTo(10 * x + 10, 10 * y);
      ctx.lineTo(10 * x + 10, 10 * y + 10);
      ctx.lineTo(10 * x, 10 * y + 5);
      break;
    case 3: // south
      ctx.moveTo(10 * x, 10 * y);
      ctx.lineTo(10 * x + 10, 10 * y);
      ctx.lineTo(10 * x + 5, 10 * y + 10);
      break;
  }
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.restore();
};

// Get the canvas element from our HTML above
const canvasApp = document.getElementById("insideView");

// Load the BABYLON 3D engine
const engine = new BABYLON.Engine(canvasApp, true);
let scene = null;
let heighCamera = 2.5;
let camera = null;
let light = null;

const getCameraPos = (x, y, d) => {
  let cameraX = -x * 4;
  let cameraZ = y * 4;
  switch(direction) {
    case 0: // east
      cameraX += 1;
      break;
    case 1: // north
      cameraZ += 1;
      break;
    case 2: // west
      cameraX -= 1;
      break;
    case 3: // south
      cameraZ -= 1;
      break;
  }
  const targetX = x * 4;
  const targetZ = y * 4;
  return {
    camera: new BABYLON.Vector3(cameraX, heighCamera, cameraZ),
    target: new BABYLON.Vector3(-x * 4, heighCamera - .25, y * 4)
  };
}

const drawInsideLabyrinthe = (laby, x, y, d) => {
  console.log('x:' + x + ', y:' + y + ', d:' + direction + ', h:' + heighCamera);
  drawLabyrinthePos(x, y, d, 'globalMap');

  // Now, call the createScene function that you just finished creating
  if(scene === null) {
    scene = createScene(laby, x, y, d);
  }
  else {
    const pos = getCameraPos(x, y, d);
    camera.setPosition(pos.camera);
    camera.setTarget(pos.target);
    light.position = pos.camera;
  }
  scene.render();
};

/*
 * x > 0 => east
 * z > 0 => south
 */
// This begins the creation of a function that we will 'call' just after it's built
const createScene = (laby, x, y, direction) => {

  // Now create a basic Babylon Scene object
  const scene = new BABYLON.Scene(engine);

  // Change the scene background color to green.
  scene.clearColor = new BABYLON.Color3(0, 0, 0);

  const pos = getCameraPos(x, y, direction);
  // This creates and positions a free camera
  camera = new BABYLON.ArcRotateCamera("camera1", 0, 0, 1, pos.camera, scene);

  // This targets the camera in the front
  camera.setTarget(pos.target);

  // This creates a light
  light = new BABYLON.PointLight("light1", pos.camera, scene);

  light.diffuse = new BABYLON.Color3(1, 1, .9);
  light.specular = new BABYLON.Color3(.25, .25, .2);
  light.range = 20;

  // Let's try our built-in 'ground' shape.  Params: name, width, depth, subdivisions, scene

  const floorTexture = new BABYLON.StandardMaterial("floorTexture", scene);
  floorTexture.diffuseTexture = new BABYLON.Texture("/images/floor3.jpg", scene);
  floorTexture.diffuseTexture.uScale = 1;
  floorTexture.diffuseTexture.vScale = 1;

  const ceilTextureStair = new BABYLON.StandardMaterial("ceilTexture", scene);
  ceilTextureStair.diffuseTexture = new BABYLON.Texture("/images/brick-3.jpg", scene);
  ceilTextureStair.diffuseTexture.vScale = 1.56;

  const brickTexture = new BABYLON.StandardMaterial("brickTexture", scene);
  brickTexture.diffuseTexture = new BABYLON.Texture("/images/brick-3.jpg", scene);

  const riserTextureStair = new BABYLON.StandardMaterial("riserTexture", scene);
  riserTextureStair.diffuseTexture = new BABYLON.Texture("/images/brick-3.jpg", scene);
  riserTextureStair.diffuseTexture.vScale = 0.085;

  const floorTextureStair = new BABYLON.StandardMaterial("stepTexture", scene);
  floorTextureStair.diffuseTexture = new BABYLON.Texture("/images/floor.jpg", scene);
  floorTextureStair.diffuseTexture.uScale = 1.5;
  floorTextureStair.diffuseTexture.vScale = .15;

  const wall = (i, j, d, h) => {
    const y = h || 2;
    switch(d) {
      case 0: // east
        const right = BABYLON.Mesh.CreatePlane("right-" + i + "-" + j, 4, scene);
        right.position = new BABYLON.Vector3(-4 * j + 2, y, 4 * i);   // Using a vector
        right.rotation.y = Math.PI / 2;
        right.material = brickTexture;
        break;
      case 1: // north
        const front = BABYLON.Mesh.CreatePlane("front-" + i + "-" + j, 4, scene);
        front.position = new BABYLON.Vector3(-4 * j, y, 4 * i - 2);   // Using a vector
        front.rotation.y = Math.PI;
        front.material = brickTexture;
        break;
      case 2: // west
        const left = BABYLON.Mesh.CreatePlane("left-" + i + "-" + j, 4, scene);
        left.position = new BABYLON.Vector3(-4 * j - 2, y, 4 * i);   // Using a vector
        left.rotation.y = -Math.PI / 2;
        left.material = brickTexture;
        break;
      case 3: // south
        const back = BABYLON.Mesh.CreatePlane("back-" + i + "-" + j, 4, scene);
        back.position = new BABYLON.Vector3(-4 * j, y, 4 * i + 2);   // Using a vector
        back.material = brickTexture;
        break;
    }
  };
  const floorTile = (i, j) => {
    const floor = BABYLON.Mesh.CreateGround("floor-" + i + "-" + j, 4.0, 4.0, 2, scene);
    floor.position = new BABYLON.Vector3(-4 * j, 0, 4 * i);
    floor.material = floorTexture;

    const ceil = BABYLON.Mesh.CreatePlane("ceil-" + i + "-" + j, 4.0, scene);
    ceil.rotation = new BABYLON.Vector3(-Math.PI / 2, 0, 0);
    ceil.position = new BABYLON.Vector3(-4 * j, 4, 4 * i);
    ceil.material = brickTexture;
  };
  const stairTile = (i, j, stairDirection) => {
    let prevStairStep = null;
    for (let h = 0; h < 10; h++) {
      let stairStep = BABYLON.Mesh.CreateGround("stair-step-" + i + "-" + j + "-" + h, 4, .4, 2, scene);
      stairStep.material = floorTextureStair;
      if (prevStairStep === null) {
        switch (stairDirection % 4) {
          case 0: // east
            stairStep.position.x = -4 * j + 1.8;
            stairStep.position.z = 4 * i;
            break;
          case 1: // north
            stairStep.position.x = -4 * j;
            stairStep.position.z = 4 * i + 1.8;
            break;
          case 2: // west
            stairStep.position.x = -4 * j - 1.8;
            stairStep.position.z = 4 * i;
            break;
          case 3: // south
            stairStep.position.x = -4 * j;
            stairStep.position.z = 4 * i - 1.8;
            break;
        }
        stairStep.rotation.y = -Math.PI * (stairDirection % 4 - 1) / 2;

        let stairCeil = BABYLON.MeshBuilder.CreatePlane("stair-ceil-" + i + "-" + j, {
          width: 4, height: 5.656854249
        }, scene);
        stairCeil.parent = stairStep;
        stairCeil.position = new BABYLON.Vector3(0, stairDirection < 4 ? 6 : 2, -1.8);
        stairCeil.rotation.x = (stairDirection < 4 ? 1.75 : 1.25) * Math.PI;
        stairCeil.material = ceilTextureStair;

        wall(i, j, stairDirection % 2 + 1, 2);
        wall(i, j, (stairDirection % 2 + 3) % 4, 2);
        wall(i, j, stairDirection % 2 + 1, stairDirection < 4 ? 6 : -2);
        wall(i, j, (stairDirection % 2 + 3) % 4, stairDirection < 4 ? 6 : -2);
      }
      else {
        const stairRiser = BABYLON.Mesh.CreateGround("stair-riser-" + i + "-" + j + "-" + h, 4, .4, 2, scene);
        stairRiser.material = riserTextureStair;
        stairRiser.parent = prevStairStep;
        stairRiser.position = new BABYLON.Vector3(0, stairDirection < 4 ? .2 : -.2, -.2);
        stairRiser.rotation.x = (stairDirection < 4 ? 1 : -1) * Math.PI / 2;

        stairStep.parent = prevStairStep;
        stairStep.position = new BABYLON.Vector3(0, stairDirection < 4 ? .4 : -.4, -.4);
      }
      prevStairStep = stairStep;
    }
  };

  for(let i = 0; i < laby.length; i++) {
    for(let j = 0; j < laby[0].length; j++) {
      switch(laby[i][j]) {
        case 'ligth':
          const diffuse = new BABYLON.Color3(.5, .5, .45);
          const specular = new BABYLON.Color3(.25, .25, .2);
          if(j > 0 && laby[i][j - 1] !== true) {
            const light = new BABYLON.PointLight("light-" + i + "-" + (j - 1), new BABYLON.Vector3(4 * i, 3, 4 * j - 2.2), scene);
            light.diffuse = diffuse;
            light.specular = specular;
            light.range = 5;
          }
          if(j < (laby.length - 1) && laby[i][j + 1] !== true) {
            const light = new BABYLON.PointLight("light-" + i + "-" + (j + 1), new BABYLON.Vector3(4 * i, 3, 4 * j + 2.2), scene);
            light.diffuse = diffuse;
            light.specular = specular;
            light.range = 5;
          }
          if(i > 0 && laby[i - 1][j] !== true) {
            const light = new BABYLON.PointLight("light-" + (i - 1) + "-" + j, new BABYLON.Vector3(4 * i - 2.2, 3, 4 * j), scene);
            light.diffuse = diffuse;
            light.specular = specular;
            light.range = 5;
          }
          if(i < (laby.length - 1) && laby[i + 1][j] !== true) {
            const light = new BABYLON.PointLight("light-" + (i + 1) + "-" + j, new BABYLON.Vector3(4 * i + 2.2, 3, 4 * j), scene);
            light.diffuse = diffuse;
            light.specular = specular;
            light.range = 5;
          }
          break;
        case true:
          break;
        case false:
          floorTile(i, j);
          if(laby[i][j-1] !== false) { //east
            wall(i, j, 0);
          }
          if(laby[i-1][j] !== false) { //north
            wall(i, j, 1);
          }
          if(laby[i][j+1] !== false) { //west
            wall(i, j, 2);
          }
          if(laby[i+1][j] !== false) { //south
            wall(i, j, 3);
          }
          break;
        case 'stair-up-east':
          stairTile(i, j, 0);
          break;
        case 'stair-up-north':
          stairTile(i, j, 1);
          break;
        case 'stair-up-west':
          stairTile(i, j, 2);
          break;
        case 'stair-up-south':
          stairTile(i, j, 3);
          break;
        case 'stair-down-east':
          stairTile(i, j, 4);
          break;
        case 'stair-down-north':
          stairTile(i, j, 5);
          break;
        case 'stair-down-west':
          stairTile(i, j, 6);
          break;
        case 'stair-down-south':
          stairTile(i, j, 7);
          break;
      }
    }
  }

  // Leave this function
  return scene;

};  // End of createScene function

generateLabyrinthe(laby);
drawLabyrinthe(laby,'globalMap');
drawInsideLabyrinthe(laby, x, y, direction);

document.onkeyup = function (evt) {

  const moveTo = (orientation) => {
    switch (orientation) {
      case 0: // east
        if (x < laby[0].length && laby[y][x + 1] === false) {
          x++;
        }
        break;
      case 1: // north
        if (y > 0 && laby[y - 1][x] === false) {
          y--;
        }
        break;
      case 2: // west
        if (x > 0 && laby[y][x - 1] === false) {
          x--;
        }
        break;
      case 3: // south
        if (y < laby.length && laby[y + 1][x] === false) {
          y++;
        }
        break;
    }
    drawInsideLabyrinthe(laby, x, y, direction);
  };
  const rotateRight = () => {
    direction = (direction + 3) % 4;
    drawInsideLabyrinthe(laby, x, y, direction);
  };
  const rotateLeft = () => {
    direction = (direction + 1) % 4;
    drawInsideLabyrinthe(laby, x, y, direction);
  };

  let orientation = null;
  console.log(evt.keyCode);
  switch(evt.keyCode) {
    case 69: // turn right
      rotateRight();
      break;
    case 65: // turn left
      rotateLeft();
      break;
    case 90: //forward
      moveTo(direction);
      break;
    case 83: // backward
      moveTo([2, 3, 0, 1][direction]);
      break;
    case 68: // right
      moveTo([3, 0, 1, 2][direction]);
      break;
    case 81: // left
      moveTo([1, 2, 3, 0][direction]);
      break;
    case 38: // up
      heighCamera += 0.25 * evt.shiftKey ? 10 : 1;
      drawInsideLabyrinthe(laby, x, y, direction);
      break;
    case 40: // down
      heighCamera -= 0.25 * evt.shiftKey ? 10 : 1;
      drawInsideLabyrinthe(laby, x, y, direction);
      break;
  }
};

const canvasMap = document.getElementById('globalMap');
canvasMap.onmousedown = (evt) => {
  const xx = Math.floor(evt.offsetX / 10);
  const yy = Math.floor(evt.offsetY / 10);
  if(xx > 0 && xx < laby[0].length - 1 && yy > 0 && yy < laby.length - 1) {
    laby[yy][xx] = ! laby[yy][xx];
  }
  drawLabyrinthe(laby,'globalMap');
  drawInsideLabyrinthe(laby, x, y, direction);
};