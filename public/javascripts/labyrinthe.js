/**
 * Created by benoit on 02/08/17.
 */

const laby = [];

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
  for (let i = 1; i < 42; i++) {
    for (let j = 1; j < 42; j++) {
      laby[i][j] = false;
    }
  }
  */
  laby[1][2] = 'stair-up-north';
  laby[41][40] = 'stair-down-south';
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
      }
    }
  }
};
const drawLabyrinthePos = (x, y, d, id) => {
  const canvas = document.getElementById(id);
  const ctx = canvas.getContext('2d');
  ctx.save();
  ctx.beginPath();
  ctx.clearRect(10 * x, 10 * y, 10, 10);
  ctx.fillStyle = 'red';
  switch (d) {
    case 0:// west
      ctx.moveTo(10 * x + 10, 10 * y);
      ctx.lineTo(10 * x + 10, 10 * y + 10);
      ctx.lineTo(10 * x, 10 * y + 5);
      break;
    case 1:// north
      ctx.moveTo(10 * x, 10 * y + 10);
      ctx.lineTo(10 * x + 10, 10 * y + 10);
      ctx.lineTo(10 * x + 5, 10 * y);
      break;
    case 2:// east
      ctx.moveTo(10 * x, 10 * y);
      ctx.lineTo(10 * x, 10 * y + 10);
      ctx.lineTo(10 * x + 10, 10 * y + 5);
      break;
    case 3:// south
      ctx.moveTo(10 * x, 10 * y);
      ctx.lineTo(10 * x + 10, 10 * y);
      ctx.lineTo(10 * x + 5, 10 * y + 10);
      break;
  }
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

const drawInsideLabyrinthe = (laby, x, y, d) => {
  console.log('x:' + x + ', y:' + y + ', d:' + direction + ', h:' + heighCamera);
  const fronts = [];
  for (let i = -4; i < 5; i++) {
    const front = [];
    fronts.push(front);
    for (let j = -4; j < 5; j++) {
      switch (d) {
        case 0:// west
          front.push(laby[Math.min(Math.max(0, y - i), laby.length - 1)][Math.min(Math.max(0, x - j), laby[0].length - 1 )]);
          break;
        case 1:// north
          front.push(laby[Math.min(Math.max(0, y - j), laby.length - 1)][Math.min(Math.max(0, x + i), laby[0].length - 1)]);
          break;
        case 2:// east
          front.push(laby[Math.min(Math.max(0, y + i), laby.length - 1)][Math.min(Math.max(0, x + j), laby[0].length - 1)]);
          break;
        case 3:// south
          front.push(laby[Math.min(Math.max(0, y + j), laby.length - 1)][Math.min(Math.max(0, x - i), laby[0].length - 1)]);
          break;
      }
    }
  }
  drawLabyrinthePos(x, y, d, 'globalMap');
  drawLabyrinthe(fronts,'localMap');
  drawLabyrinthePos(4, 4, 2, 'localMap');

  // Now, call the createScene function that you just finished creating
  scene = createScene(fronts, d);
  scene.render();
};


// This begins the creation of a function that we will 'call' just after it's built
const createScene = (fronts, direction) => {

  // Now create a basic Babylon Scene object
  const scene = new BABYLON.Scene(engine);

  // Change the scene background color to green.
  scene.clearColor = new BABYLON.Color3(0, 0, 0);

  const camX = fronts[0].length * 4 / 2 - 2;
  const camZ = fronts.length * 4 / 2 - 3;
  // This creates and positions a free camera
  camera = new BABYLON.ArcRotateCamera("camera1", 0, 0, 1, new BABYLON.Vector3(camX, heighCamera, camZ), scene);

  // This targets the camera in the front
  camera.setTarget(new BABYLON.Vector3(camX, heighCamera + .8, camZ + 1));

  // This creates a light
  const light = new BABYLON.PointLight("light1", new BABYLON.Vector3(camX, 3, camZ), scene);

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

  for(let i = 0; i < fronts.length; i++) {
    for(let j = 0; j < fronts[0].length; j++) {
      let stair = null;
      switch(fronts[i][j]) {
        case true:
          if (j < 5) {
            const back = BABYLON.Mesh.CreatePlane("back-" + i + "-" + j, 4, scene, false, BABYLON.Mesh.DOUBLESIDE);
            back.position = new BABYLON.Vector3(4 * i, 2, 4 * j + 2);   // Using a vector
            back.material = brickTexture;
          }
          if (j > 3) {
            const front = BABYLON.Mesh.CreatePlane("front-" + i + "-" + j, 4, scene, false, BABYLON.Mesh.DOUBLESIDE);
            front.position = new BABYLON.Vector3(4 * i, 2, 4 * j - 2);   // Using a vector
            front.material = brickTexture;
          }
          if(i < 5) {
            const right = BABYLON.Mesh.CreatePlane("right-" + i + "-" + j, 4, scene, false, BABYLON.Mesh.DOUBLESIDE);
            right.position = new BABYLON.Vector3(4 * i + 2, 2, 4 * j);   // Using a vector
            right.rotation.y = Math.PI / 2;
            right.material = brickTexture;
          }
          if(i > 3) {
            const left = BABYLON.Mesh.CreatePlane("left-" + i + "-" + j, 4, scene, false, BABYLON.Mesh.DOUBLESIDE);
            left.position = new BABYLON.Vector3(4 * i - 2, 2, 4 * j);   // Using a vector
            left.rotation.y = Math.PI / 2;
            left.material = brickTexture;
          }
          break;
        case false:
          const floor = BABYLON.Mesh.CreatePlane("floor-" + i + "-" + j, 4.0, scene);
          floor.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);
          floor.position = new BABYLON.Vector3(4 * i, 0, 4 * j);
          floor.material = floorTexture;

          const ceil = BABYLON.Mesh.CreatePlane("ceil-" + i + "-" + j, 4.0, scene);
          ceil.rotation = new BABYLON.Vector3(-Math.PI / 2, 0, 0);
          ceil.position = new BABYLON.Vector3(4 * i, 4, 4 * j);
          ceil.material = brickTexture;
          break;
        case 'stair-up-west':
          stair = (direction + 2) % 4;
          break;
        case 'stair-up-north':
          stair = (direction + 1) % 4;
          break;
        case 'stair-up-east':
          stair = direction;
          break;
        case 'stair-up-south':
          stair = (direction + 3) % 4;
          break;
        case 'stair-down-west':
          stair = (direction + 2) % 4 + 4;
          break;
        case 'stair-down-north':
          stair = (direction + 1) % 4 + 4;
          break;
        case 'stair-down-east':
          stair = direction + 4;
          break;
        case 'stair-down-south':
          stair = (direction + 3) % 4 + 4;
          break;
      }
      if(stair !== null) {
        console.log('stair ' + stair);
        let prevStairStep = null;
        for (let h = 0; h < 13; h++) {
          let stairStep = BABYLON.Mesh.CreateGround("stair-step-" + i + "-" + j + "-" + h, 4, .4, 2, scene);
          stairStep.material = floorTextureStair;
          if (prevStairStep === null) {
            switch (stair % 4) {
              case 0: //back
                stairStep.position.x = 4 * i;
                stairStep.position.z = 4 * j + 1.8;
                break;
              case 1: // right
                stairStep.position.x = 4 * i - 1.8;
                stairStep.position.z = 4 * j;
                break;
              case 2: // front
                stairStep.position.x = 4 * i;
                stairStep.position.z = 4 * j - 1.8;
                break;
              case 3: // left
                stairStep.position.x = 4 * i + 1.8;
                stairStep.position.z = 4 * j;
                break;
            }
            stairStep.rotation.y = -Math.PI * (stair % 4) / 2;

            let stairCeil = BABYLON.Mesh.CreateGround("stair-ceil-" + i + "-" + j, 4, 6.24, 2, scene);
            stairCeil.parent = stairStep;
            stairCeil.position = new BABYLON.Vector3(0, stair < 4 ? 6 : 2, -2.2);
            stairCeil.rotation.x = (stair < 4 ? 1.224247425 : 0.775752575) * Math.PI;
            stairCeil.material = ceilTextureStair;

            const right = BABYLON.Mesh.CreatePlane("right-" + i + "-" + j, 4, scene, false, BABYLON.Mesh.DOUBLESIDE);
            right.position = new BABYLON.Vector3(2, stair < 4 ? 6 : -2, -1.8);   // Using a vector
            right.rotation.y = Math.PI / 2;
            right.material = brickTexture;
            right.parent = stairStep;

            const left = BABYLON.Mesh.CreatePlane("left-" + i + "-" + j, 4, scene, false, BABYLON.Mesh.DOUBLESIDE);
            left.position = new BABYLON.Vector3(-2, stair < 4 ? 6 : -2, -1.8);   // Using a vector
            left.rotation.y = Math.PI / 2;
            left.material = brickTexture;
            left.parent = stairStep;
          }
          else {
            const stairRiser = BABYLON.Mesh.CreateGround("stair-riser-" + i + "-" + j + "-" + h, 4, .34, 2, scene);
            stairRiser.material = riserTextureStair;
            stairRiser.parent = prevStairStep;
            stairRiser.position = new BABYLON.Vector3(0, stair < 4 ? .17 : -.17, -.2);
            stairRiser.rotation.x = (stair < 4 ? 1 : -1) * Math.PI / 2;

            stairStep.parent = prevStairStep;
            stairStep.position = new BABYLON.Vector3(0, stair < 4 ? .34 : -.34, -.4);
          }
          prevStairStep = stairStep;
        }
      }
    }
  }

  // Leave this function
  return scene;

};  // End of createScene function



let direction = 2;
let x = 2;
let y = 2;
generateLabyrinthe(laby);
drawLabyrinthe(laby,'globalMap');
drawInsideLabyrinthe(laby, x, y, direction);

document.onkeyup = function (evt) {

  const moveTo = (orientation, dx, dz) => {
    switch (orientation) {
      case 0: // west
        if (x > 0 && laby[y][x - 1] === false) {
          x--;
        }
        break;
      case 1: // north
        if (y > 0 && laby[y - 1][x] === false) {
          y--;
        }
        break;
      case 2: // east
        if (x < laby[0].length && laby[y][x + 1] === false) {
          x++;
        }
        break;
      case 3: // south
        if (y < laby.length && laby[y + 1][x] === false) {
          y++;
        }
        break;
    }
    drawLabyrinthe(laby, 'globalMap');
    drawInsideLabyrinthe(laby, x, y, direction);
  };
  const rotateRight = () => {
    direction = (direction + 1) % 4;
    drawLabyrinthe(laby, 'globalMap');
    drawInsideLabyrinthe(laby, x, y, direction);
  };
  const rotateLeft = () => {
    direction = (direction + 3) % 4;
    drawLabyrinthe(laby, 'globalMap');
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
      moveTo(direction, 1, 0);
      break;
    case 83: // backward
      moveTo([2, 3, 0, 1][direction], -1, 0);
      break;
    case 68: // right
      moveTo([1, 2, 3, 0][direction], 0, 1);
      break;
    case 81: // left
      moveTo([3, 0, 1, 2][direction], 0, -1);
      break;
    case 38: // up
      heighCamera += 0.25;
      drawLabyrinthe(laby, 'globalMap');
      drawInsideLabyrinthe(laby, x, y, direction);
      break;
    case 40: // down
      heighCamera -= 0.25;
      drawLabyrinthe(laby, 'globalMap');
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