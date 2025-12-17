// ===== СЦЕНА =====
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // небо

// ===== КАМЕРА =====
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 1, 5);

// ===== РЕНДЕР =====
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ===== СВЕТ =====
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5);
scene.add(light);

const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);

// ===== ЗЕМЛЯ =====
const groundGeo = new THREE.BoxGeometry(50, 1, 50);
const groundMat = new THREE.MeshStandardMaterial({ color: 0x228b22 });
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.position.y = -0.5;
scene.add(ground);

// ===== КУБ =====
const cubeGeo = new THREE.BoxGeometry(1, 1, 1);
const cubeMat = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
const cube = new THREE.Mesh(cubeGeo, cubeMat);
cube.position.set(0, 0.5, 0);
scene.add(cube);

// ===== УПРАВЛЕНИЕ =====
const keys = {
  w: false,
  a: false,
  s: false,
  d: false
};

document.addEventListener("keydown", (e) => {
  if (e.key === "w") keys.w = true;
  if (e.key === "a") keys.a = true;
  if (e.key === "s") keys.s = true;
  if (e.key === "d") keys.d = true;

  if (e.code === "Space" && onGround) {
    yVelocity = jumpPower;
    onGround = false;
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "w") keys.w = false;
  if (e.key === "a") keys.a = false;
  if (e.key === "s") keys.s = false;
  if (e.key === "d") keys.d = false;
});

// ===== МЫШЬ =====
let yaw = 0;
let pitch = 0;

document.body.addEventListener("click", () => {
  document.body.requestPointerLock();
});

document.addEventListener("mousemove", (e) => {
  if (document.pointerLockElement === document.body) {
    yaw -= e.movementX * 0.002;
    pitch -= e.movementY * 0.002;

    pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch));

    camera.rotation.set(pitch, yaw, 0);
  }
});

// ===== ДВИЖЕНИЕ =====
const speed = 0.1;

function movePlayer() {
  const dir = new THREE.Vector3();
  camera.getWorldDirection(dir);
  dir.y = 0;
  dir.normalize();

  const right = new THREE.Vector3();
  right.crossVectors(camera.up, dir).normalize();

  if (keys.w) camera.position.add(dir.clone().multiplyScalar(speed));
  if (keys.s) camera.position.add(dir.clone().multiplyScalar(-speed));
  if (keys.a) camera.position.add(right.clone().multiplyScalar(speed));
  if (keys.d) camera.position.add(right.clone().multiplyScalar(-speed));
}

// ===== ГРАВИТАЦИЯ =====
let yVelocity = 0;
const gravity = 0.02;
const jumpPower = 0.35;
const groundLevel = 1;
let onGround = false;

function applyGravity() {
  yVelocity -= gravity;
  camera.position.y += yVelocity;

  if (camera.position.y <= groundLevel) {
    camera.position.y = groundLevel;
    yVelocity = 0;
    onGround = true;
  }
}

// ===== АНИМАЦИЯ =====
function animate() {
  requestAnimationFrame(animate);

  movePlayer();
  applyGravity();

  renderer.render(scene, camera);
}

animate();

// ===== RESIZE =====
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
