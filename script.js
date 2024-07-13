import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const background = new THREE.Color("white");
scene.background = background;
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer(1000, 1000);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const loader = new GLTFLoader();
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 0, 10);
scene.add(light);
loader.load(
  "model.glb",
  function (gltf) {
    for (let i = 0; i < gltf.scene.children.length; i++) {}

    scene.add(gltf.scene);
    gltf.scene.add(new THREE.AmbientLight(0xffffff, 1));
    gltf.scene.position.set(10, -2, 10);
    camera.lookAt(gltf.scene.position);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 0, 5);
controls.update();
function animate() {
  requestAnimationFrame(animate);
  controls.autoRotate = true;
  controls.update();
  renderer.render(scene, camera);
}
animate();
