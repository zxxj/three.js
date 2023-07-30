// 导入threejs
import * as THREE from 'three';

console.log(THREE);

// 目标: 了解threejs最基本的内容

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

// 将几何体添加到场景当中
scene.add(cube);

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();

// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);

// 将webGL渲染的canvas内容追加到body
document.body.append(renderer.domElement);

// 使用渲染器,通过相机将场景渲染进来
renderer.render(scene, camera);
