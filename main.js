import * as THREE from 'https://unpkg.com/three@0.158.0/build/three.module.js';

// -------------------
// СЦЕНА
// -------------------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

// -------------------
// КАМЕРА
// -------------------
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 2, 5);

// -------------------
// РЕНДЕР
// -------------------
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// -------------------
// СВЕТ
// -------------------
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5);
scene.add(light);

scene.add(new THREE.AmbientLight(0xffffff, 0.4));

// -------------------
// ЗЕМЛЯ (платформа)
// -------------------
const groundGeometry = new THREE.BoxGeometry(20, 1, 20);
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.position.y = -0.5;
scene.add(ground);

// -------------------
// КУБ ДЛЯ ПРОВЕРКИ
// -------------------
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(0, 0.5, 0);
scene.add(cube);

// -------------------
// ИЗМЕНЕНИЕ РАЗМЕРА
// -------------------
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// -------------------
// АНИМАЦИЯ
// -------------------
function animate() {
  requestAnimationFrame(animate);

  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
