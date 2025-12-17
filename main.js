import * as THREE from 'https://unpkg.com/three@0.158.0/build/three.module.js';

// --------------------
// СЦЕНА
// --------------------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

// --------------------
// КАМЕРА
// --------------------
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 2, 5);

// --------------------
// РЕНДЕР
// --------------------
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// --------------------
// СВЕТ
// --------------------
const sun = new THREE.DirectionalLight(0xffffff, 1);
sun.position.set(5, 10, 5);
scene.add(sun);

scene.add(new THREE.AmbientLight(0xffffff, 0.4));

// --------------------
// ЗЕМЛЯ
// --------------------
const ground = new THREE.Mesh(
  new THREE.BoxGeometry(50, 1, 50),
  new THREE.MeshStandardMaterial({ color: 0x228B22 })
);
ground.position.y = -0.5;
scene.add(ground);

// --------------------
// КУБ
// --------------------
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({ color: 0x8B4513 })
);
cube.position.set(0, 0.5, 0);
scene.add(cube);

// --------------------
// POINTER LOCK (мышь)
// --------------------
document.body.addEventListener('click', () => {
  document.body.requestPointerLock();
});

// --------------------
// ПОВОРОТ КАМЕРЫ
// --------------------
let yaw = 0;
let pitch = 0;

document.addEventListener('mousemove', (e) => {
  if (document.pointerLockElement !== document.body) return;

  yaw -= e.movementX * 0.002;
  pitch -= e.movementY * 0.002;

  pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch));

  camera.rotation.order = 'YXZ';
  camera.rotation.y = yaw;
  camera.rotation.x = pitch;
});

// --------------------
// КЛАВИШИ
// --------------------
const keys = {
  w: false,
  a: false,
  s: false,
  d: false
};

document.addEventListener('keydown', (e) => {
  if (e.code === 'KeyW') keys.w = true;
  if (e.code === 'KeyA') keys.a = true;
  if (e.code === 'KeyS') keys.s = true;
  if (e.code === 'KeyD') keys.d = true;
});

document.addEventListener('keyup', (e) => {
  if (e.code === 'KeyW') keys.w = false;
  if (e.code === 'KeyA') keys.a = false;
  if (e.code === 'KeyS') keys.s = false;
  if (e.code === 'KeyD') keys.d = false;
});

// --------------------
// ДВИЖЕНИЕ
// --------------------
const speed = 0.1;

function movePlayer() {
  const dir = new THREE.Vector3();

  if (keys.w) dir.z -= 1;
  if (keys.s) dir.z += 1;
  if (keys.a) dir.x -= 1;
  if (keys.d) dir.x += 1;

  if (dir.length() === 0) return;

  dir.normalize();
  dir.applyAxisAngle(new THREE.Vector3(0, 1, 0), yaw);
  camera.position.add(dir.multiplyScalar(speed));
}

// --------------------
// RESIZE
// --------------------
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// --------------------
// ЦИКЛ
// --------------------
function animate() {
  requestAnimationFrame(animate);

  movePlayer();

  renderer.render(scene, camera);
}

animate();
