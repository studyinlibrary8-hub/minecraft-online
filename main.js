// ======================
// СЦЕНА
// ======================
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // голубое небо

// ======================
// КАМЕРА
// ======================
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(5, 5, 10);
camera.lookAt(0, 0, 0);

// ======================
// РЕНДЕР
// ======================
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ======================
// СВЕТ
// ======================
const sun = new THREE.DirectionalLight(0xffffff, 1);
sun.position.set(10, 20, 10);
scene.add(sun);

const ambient = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambient);

// ======================
// БЛОКИ
// ======================
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00aa00 });

// Земля
for (let x = -10; x <= 10; x++) {
    for (let z = -10; z <= 10; z++) {
        const block = new THREE.Mesh(geometry, material);
        block.position.set(x, 0, z);
        scene.add(block);
    }
}

// ======================
// УПРАВЛЕНИЕ (WASD)
// ======================
const keys = {};

document.addEventListener("keydown", (e) => {
    keys[e.key.toLowerCase()] = true;
});

document.addEventListener("keyup", (e) => {
    keys[e.key.toLowerCase()] = false;
});

function movePlayer() {
    const speed = 0.15;

    if (keys["w"]) camera.position.z -= speed;
    if (keys["s"]) camera.position.z += speed;
    if (keys["a"]) camera.position.x -= speed;
    if (keys["d"]) camera.position.x += speed;
}

// ======================
// АНИМАЦИЯ
// ======================
function animate() {
    requestAnimationFrame(animate);
    movePlayer();
    camera.lookAt(
        camera.position.x,
        camera.position.y - 1,
        camera.position.z - 1
    );
    renderer.render(scene, camera);
}

animate();

// ======================
// ИЗМЕНЕНИЕ РАЗМЕРА ОКНА
// ======================
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
// ======================
// СЦЕНА
// ======================
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // голубое небо

// ======================
// КАМЕРА
// ======================
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(5, 5, 10);
camera.lookAt(0, 0, 0);

// ======================
// РЕНДЕР
// ======================
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ======================
// СВЕТ
// ======================
const sun = new THREE.DirectionalLight(0xffffff, 1);
sun.position.set(10, 20, 10);
scene.add(sun);

const ambient = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambient);

// ======================
// БЛОКИ
// ======================
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00aa00 });

// Земля
for (let x = -10; x <= 10; x++) {
    for (let z = -10; z <= 10; z++) {
        const block = new THREE.Mesh(geometry, material);
        block.position.set(x, 0, z);
        scene.add(block);
    }
}

// ======================
// УПРАВЛЕНИЕ (WASD)
// ======================
const keys = {};

document.addEventListener("keydown", (e) => {
    keys[e.key.toLowerCase()] = true;
});

document.addEventListener("keyup", (e) => {
    keys[e.key.toLowerCase()] = false;
});

function movePlayer() {
    const speed = 0.15;

    if (keys["w"]) camera.position.z -= speed;
    if (keys["s"]) camera.position.z += speed;
    if (keys["a"]) camera.position.x -= speed;
    if (keys["d"]) camera.position.x += speed;
}

// ======================
// АНИМАЦИЯ
// ======================
function animate() {
    requestAnimationFrame(animate);
    movePlayer();
    camera.lookAt(
        camera.position.x,
        camera.position.y - 1,
        camera.position.z - 1
    );
    renderer.render(scene, camera);
}

animate();

// ======================
// ИЗМЕНЕНИЕ РАЗМЕРА ОКНА
// ======================
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
