// 导入threejs
import * as THREE from 'three';

// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// 导入dat.gui库
import * as dat from 'dat.gui';

// 导入动画库
import { gsap } from 'gsap';

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

// 创建datGUI
const gui = new dat.GUI();

// 修改物体的位置
// 向gui调试器中添加cube物体的x轴, 设置的最小值为0, 最大值为5
// step(): 不设置的话调试器中默认是1
// name: 设置当前调试的属性名字
// onChange: 当前移动位置的回调
// onFinishChange: 当前移动完成(鼠标松开)的回调
gui
  .add(cube.position, 'x')
  .min(0)
  .max(5)
  .step(0.01)
  .name('移动x轴')
  .onChange((value) => console.log('当前x轴的移动位置:', value))
  .onFinishChange((value) => console.log('完全停下来的位置:', value));

// addddColor: 添加颜色
// onChange: 颜色盘的回调
// cube.material.color.set(): 设置物体的材质

// 修改物体的颜色
const params = {
  color: '#0f0',
  changeCube: () => {
    gsap.to(cube.position, { x: 5, duration: 2, repeat: -1 });
  },
};

gui.addColor(params, 'color').onChange((currentColor) => {
  console.log(currentColor);
  // 设置物体的材质
  cube.material.color.set(currentColor);
});

// 控制物体的显示/隐藏
gui.add(cube, 'visible').name('显示/隐藏');

// 创建文件夹
const folder = gui.addFolder('操作cube');
// 向文件夹中添加操作内容
folder.add(cube.material, 'wireframe'); // 设置cube的材质, 更改为线性材质

// 设置按钮, 点击这个按钮触发某个事件
folder.add(params, 'changeCube').name('点击触发动画');

console.log(cube);

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
// 将其设置为true以启用阻尼（惯性），这将给控制器带来重量感。默认值为false。
controls.enableDamping = true;

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);

// 将坐标轴辅助器添加到场景中
scene.add(axesHelper);

function render() {
  controls.update();
  renderer.render(scene, camera);
  // 浏览器渲染下一帧的时候就会调用一次render函数
  requestAnimationFrame(render);
}

render();
