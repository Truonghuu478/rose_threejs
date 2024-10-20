// Scene setup
const scene = new THREE.Scene();
let clock = new THREE.Clock(); // Tạo đồng hồ để theo dõi thời gian
let isAnimating = true; // Biến điều khiển trạng thái animation

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040); // Soft ambient light
scene.add(ambientLight);

// Load GLTF/GLB Model of the rose
const loader = new THREE.GLTFLoader();
function addRose(position,url,isAnimating=true) {
  loader.load(
    url,
    function (gltf) {
      const rose = gltf.scene;

      rose.position.copy(position); // Set position
      rose.scale.set(50, 50, 50); // Adjust scale for better visibility
      scene.add(rose);

      // Animation: Rotate the rose slowly
      function animateRose() {
        requestAnimationFrame(animateRose);
        if (isAnimating) {
          let time = clock.getElapsedTime();
          rose.rotation.y += 0.003;
          rose.position.y = Math.sin(time) * 0.1;
          light.color.setHSL(Math.sin(time * 0.5), 0.5, 0.5);
        }
      }
      animateRose();
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
}

// Add 3 roses at different positions
// Hoa thứ nhất - Ở vị trí cao nhất

addRose(new THREE.Vector3(0, 30, 0),"path/rose_model.glb"); // Trục Y = 5 để lên trên

// Hoa thứ hai - Ở giữa
addRose(new THREE.Vector3(-5, -70, 0),"path/Roses.glb",false); // Trục Y = 0 ở giữa

// Hoa thứ ba - Ở vị trí thấp nhất
// addRose(new THREE.Vector3(0, -5, 0),"path/roses_bottom.glb"); // Trục Y = -5 để xuống dưới

// Camera positioning
// camera.position.set(0, 0, 20); // Set camera position
camera.position.set(0, 0, 15); // Đẩy camera ra xa một chút để phù hợp với màn hình nhỏ

// Handle window resize
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// Add particle effects
const particleGeometry = new THREE.BufferGeometry();
const particleCount = 5000;
const positions = [];

for (let i = 0; i < particleCount; i++) {
  const x = (Math.random() - 0.5) * 50;
  const y = (Math.random() - 0.5) * 50;
  const z = (Math.random() - 0.5) * 50;
  positions.push(x, y, z);
}

particleGeometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(positions, 3)
);

const particleMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.05,
  transparent: true,
  opacity: 0.8,
});

const particles = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particles);

// Render loop
function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}
render();

toggleButton.innerText = isAnimating ? "Stop Rotation" : "Start Rotation";
