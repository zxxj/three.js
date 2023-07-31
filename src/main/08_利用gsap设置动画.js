// 导入threejs
import * as THREE from 'three';

// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// 导入动画库
import gsap from 'gsap';

// 1.创建场景
const scene = new THREE.Scene();

// 2.创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// 设置相机的位置
camera.position.set(0, 0, 10);

// 添加到场景中
scene.add(camera);

// 向场景中添加物体
// 创建几何体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1); // 宽 高 深度
// 设置材质
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xcc3300 });

// 根据几何体和材质创建物体
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

// 设置物体旋转
cube.rotation.set(Math.PI / 4, 0, 0);

// 将几何体添加到场景当中
scene.add(cube);

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();

// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);

// 将webGL渲染的canvas内容追加到body
document.body.append(renderer.domElement);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);

// 将坐标轴辅助器添加到场景中
scene.add(axesHelper);

// 利用gsap设置动画
gsap.to(cube.position, { x: 5, duration: 5, ease: 'bounce.out', repeat: -1 });
gsap.to(cube.rotation, {
  x: 2 * Math.PI,
  duration: 5,
  ease: 'bounce.out',
  repeat: -1,
});

function render() {
  renderer.render(scene, camera);
  // 浏览器渲染下一帧的时候就会调用一次render函数
  requestAnimationFrame(render);
}

render();
