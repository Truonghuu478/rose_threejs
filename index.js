// Scene, Camera, Renderer Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffaaff, 1.5, 100);
pointLight.position.set(5, 10, 5);
scene.add(pointLight);

// Function to create a flower
function createFlower() {
    const flowerGeometry = new THREE.ConeGeometry(0.5, 1, 8); // Petal shape
    const flowerMaterial = new THREE.MeshStandardMaterial({ color: 0xff69b4 });
    const flower = new THREE.Mesh(flowerGeometry, flowerMaterial);
    flower.rotation.x = Math.PI / 2;
    flower.scale.set(0.5, 0.5, 0.5); // Initial scale
    return flower;
}

// Create multiple flowers
const flowers = [];
for (let i = 0; i < 10; i++) {
    const flower = createFlower();
    flower.position.set(
        (Math.random() - 0.5) * 10, // Random x position
        (Math.random() - 0.5) * 10, // Random y position
        (Math.random() - 0.5) * 10  // Random z position
    );
    flowers.push(flower);
    scene.add(flower);
}

// Blooming Animation
function animate() {
    requestAnimationFrame(animate);

    flowers.forEach(flower => {
        // Bloom effect - increase the scale
        if (flower.scale.x < 1) {
            flower.scale.x += 0.01;
            flower.scale.y += 0.01;
            flower.scale.z += 0.01;
        }

        // Add some slight rotation and shimmer to the flower
        flower.rotation.z += 0.01;
    });

    pointLight.intensity = 1.5 + Math.sin(Date.now() * 0.005) * 0.5;

    renderer.render(scene, camera);
}

camera.position.z = 15;
animate();

// Handle Window Resize
window.addEventListener('resize', function() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
