// Сцена
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // небо

// Камера
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(5, 5, 5);

// Рендер
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Свет
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 20, 10);
scene.add(light);

// Блок (куб)
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00aa00 });
const block = new THREE.Mesh(geometry, material);
scene.add(block);

for (let x = -10; x <= 10; x++) {
    for (let z = -10; z <= 10; z++) {
        const ground = new THREE.Mesh(geometry, material);
        ground.position.set(x, 0, z);
        scene.add(ground);
    }
}

// Анимация
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
const keys = {};

document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

function move() {
    if (keys["w"]) camera.position.z -= 0.1;
    if (keys["s"]) camera.position.z += 0.1;
    if (keys["a"]) camera.position.x -= 0.1;
    if (keys["d"]) camera.position.x += 0.1;
}

function animate() {
    requestAnimationFrame(animate);
    move();
    renderer.render(scene, camera);
}
