## 一.threejs环境配置

1.创建文件夹: Learn-threejs

2.初始化package.json: npm init 

3.安装pacel打包工具: yarn add parcel-bundler --dev

4.修改package.json的script配置:

```js
  "scripts": {
    "dev": "parcel <your entry file>", // 要打包的那些文件
    "build": "parcel build <your entry file>"
  }
```

Package.json修改后:

```js
{
  "name": "learn-threejs",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "parcel src/index.html",
    "build": "parcel build src/index.html"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "parcel-bundler": "^1.12.5"
  }
}
```

5.创建assets文件夹, 在index.html中引入css

6.安装threejs: yarn add three

7.创建main文件夹,自己目录创建main.js,并引入threejs

```js
// 导入threejs
import * as THREE from 'three';

console.log(THREE); // object
```

8.运行yarn run dev, pacel会自动打包,生成一个dist目录,并有一个本地的地址

![image-20230730145752657](/Users/zhangxinxin/Library/Application Support/typora-user-images/image-20230730145752657.png)

## 二.threejs实践

### 1.基本配置

```js
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
```

### 2.使用控制器查看3d物体 - OrbitControls

```js
// 导入threejs
import * as THREE from 'three';

// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

console.log(THREE);

// 目标: 使用控制器,查看3d物体

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

// // 使用渲染器,通过相机将场景渲染进来
// renderer.render(scene, camera);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);

function render() {
  renderer.render(scene, camera);

  // 浏览器渲染下一帧的时候就会调用一次render函数
  requestAnimationFrame(render);
}

render();

```

### 3.添加坐标轴辅助器 - axesHelper

```js
// 导入threejs
import * as THREE from 'three';

// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

console.log(THREE);

// 目标: 使用控制器,查看3d物体

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

// // 使用渲染器,通过相机将场景渲染进来
// renderer.render(scene, camera);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);

// 添加坐标轴辅助器
+ const axesHelper = new THREE.AxesHelper(5);

// 将坐标轴辅助器添加到场景中
+ scene.add(axesHelper);

function render() {
  renderer.render(scene, camera);

  // 浏览器渲染下一帧的时候就会调用一次render函数
  requestAnimationFrame(render);
}

render();
```

![image-20230730181732584](/Users/zhangxinxin/Library/Application Support/typora-user-images/image-20230730181732584.png)

### 4.修改物体的位置 - cube.position.set(X,Y,Z)

```js
// 创建几何体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1); // 宽 高 深度
// 设置材质
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xcc3300 });

// 根据几何体和材质创建物体
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

// 将几何体添加到场景当中
scene.add(cube);

// 修改物体的位置
+ cube.position.set(0, 5, 0); // x y z
```



```js
// 导入threejs
import * as THREE from 'three';

// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

console.log(THREE);

// 目标: 使用控制器,查看3d物体

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

// 修改物体的位置
+ // cube.position.set(0, 5, 0); // x y z

// 或者
+ // cube.position.x = 5;

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();

// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);

// 将webGL渲染的canvas内容追加到body
document.body.append(renderer.domElement);

// // 使用渲染器,通过相机将场景渲染进来
// renderer.render(scene, camera);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);

// 将坐标轴辅助器添加到场景中
scene.add(axesHelper);

function render() {
  // 每次渲染下一帧时,cube的x轴移动0.01
  cube.position.x += 0.01;

  // 判断当前cube的位置是否大于5
  if (cube.position.x >= 5) {
    cube.position.x = 0;
  }
  renderer.render(scene, camera);
  // 浏览器渲染下一帧的时候就会调用一次render函数
  requestAnimationFrame(render);
}

render();
```

### 5.缩放物体 - cube.scale.set(X,Y,Z)

```js
// 向场景中添加物体
// 创建几何体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1); // 宽 高 深度
// 设置材质
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xcc3300 });

// 根据几何体和材质创建物体
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

// 将几何体添加到场景当中
scene.add(cube);

// 设置缩放
cube.scale.set(2, 3, 4);

// 或者
cube.scale.x = 5;
```

```js
// 导入threejs
import * as THREE from 'three';

// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

console.log(THREE);

// 目标: 使用控制器,查看3d物体

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

// 设置缩放
+ cube.scale.set(2, 3, 4);

// 或者
+ cube.scale.x = 5;

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();

// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);

// 将webGL渲染的canvas内容追加到body
document.body.append(renderer.domElement);

// // 使用渲染器,通过相机将场景渲染进来
// renderer.render(scene, camera);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);

// 将坐标轴辅助器添加到场景中
scene.add(axesHelper);

function render() {
  cube.position.x += 0.01;

  if (cube.position.x >= 5) {
    cube.position.x = 0;
  }
  renderer.render(scene, camera);
  // 浏览器渲染下一帧的时候就会调用一次render函数
  requestAnimationFrame(render);
}

render();
```

### 6.设置物体的旋转-cube.rotation.set(X,Y,Z,order)

```js
// 创建几何体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1); // 宽 高 深度
// 设置材质
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xcc3300 });

// 根据几何体和材质创建物体
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

// 将几何体添加到场景当中
scene.add(cube);

// 为物体设置旋转
// cube.rotation.set(Math.PI / 4, 0, 0);

// 自定义轴的顺序
// cube.rotation.set(Math.PI / 4, 0, 0, 'YXZ');
```

```js
// 导入threejs
import * as THREE from 'three';

// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

console.log(THREE);

// 目标: 使用控制器,查看3d物体

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

// 为物体设置旋转
// cube.rotation.set(Math.PI / 4, 0, 0);

// 自定义轴的顺序
// cube.rotation.set(Math.PI / 4, 0, 0, 'YXZ');

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();

// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);

// 将webGL渲染的canvas内容追加到body
document.body.append(renderer.domElement);

// // 使用渲染器,通过相机将场景渲染进来
// renderer.render(scene, camera);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);

// 将坐标轴辅助器添加到场景中
scene.add(axesHelper);

function render() {
  cube.position.x += 0.01;

  // 设置物体的旋转
  cube.rotation.x += 0.01;

  if (cube.position.x >= 5) {
    cube.position.x = 0;
  }
  renderer.render(scene, camera);
  // 浏览器渲染下一帧的时候就会调用一次render函数
  requestAnimationFrame(render);
}

render();
```

###  7.设置clock跟踪时钟

```js
// 导入threejs
import * as THREE from 'three';

// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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

// // 使用渲染器,通过相机将场景渲染进来
// renderer.render(scene, camera);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);

// 将坐标轴辅助器添加到场景中
scene.add(axesHelper);

// 设置时钟
+ const clock = new THREE.Clock();

function render() {
  // 获取时钟运行的总时长
  + let time = clock.getElapsedTime();
  + console.log('时钟运行总时长:', time);

  // let delaTime = clock.getDelta();
  // console.log('两次获取时间的时间间隔:', delaTime);

  + let t = time % 5;
  cube.position.x = t * 1;

  // 设置物体的旋转
  cube.rotation.x += 0.01;

  renderer.render(scene, camera);
  // 浏览器渲染下一帧的时候就会调用一次render函数
  requestAnimationFrame(render);
}

render();
```

### 8.利用gsap动画库设置动画

```js
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
+ gsap.to(cube.position, { x: 5, duration: 5, ease: 'bounce.out', repeat: -1 }); // 设置物体位移

// 设置物体旋转
+ gsap.to(cube.rotation, {
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
```

### 9.gsap动画库的配置与回调

```js
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
const animateX = gsap.to(cube.position, {
  // 需要改变的属性
  x: 5,
  
  // 执行需要多长时间
  duration: 5,
  
  // 动画曲线
  ease: 'bounce.out',
  // 设置动画重复次数 无限重复 -1
  repeat: 2,

  // 设置往返运动: 去了再回来
  yoyo: true,

  // 设置延迟时间
  delay: 2,

  // 动画开始的回调
  onStart: () => console.log('动画开始'),

  // 动画结束的回调
  onComplete: () => console.log('动画结束'),
});

gsap.to(cube.rotation, {
  x: 2 * Math.PI,
  duration: 5,
  ease: 'bounce.out',
});

// 双击屏幕暂停动画
window.addEventListener('dblclick', () => {
  console.log('暂停');
  console.log(animateX);
  console.log(animateX.isActive()); // animateX.isActive() 获取当前动画的状态 true代表暂停

  if (animateX.isActive()) {
    animateX.pause(); // 暂停动画
  } else {
    animateX.resume(); // 恢复动画
  }
});

function render() {
  renderer.render(scene, camera);
  // 浏览器渲染下一帧的时候就会调用一次render函数
  requestAnimationFrame(render);
}

render();
```

### 10.设置控制器阻尼 - 增加真实感

```js
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
// 将其设置为true以启用阻尼（惯性），这将给控制器带来重量感。默认值为false。
+ controls.enableDamping = true;

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);

// 将坐标轴辅助器添加到场景中
scene.add(axesHelper);

// 利用gsap设置动画
const animateX = gsap.to(cube.position, {
  x: 5,
  duration: 5,
  ease: 'bounce.out',
  // 设置动画重复次数 无限重复 -1
  repeat: 2,

  // 设置往返运动: 去了再回来
  yoyo: true,

  // 设置延迟时间
  delay: 2,

  // 动画开始的回调
  onStart: () => console.log('动画开始'),

  // 动画结束的回调
  onComplete: () => console.log('动画结束'),
});

gsap.to(cube.rotation, {
  x: 2 * Math.PI,
  duration: 5,
  ease: 'bounce.out',
});

// 双击屏幕暂停动画
window.addEventListener('dblclick', () => {
  console.log('暂停');
  console.log(animateX);
  console.log(animateX.isActive()); // animateX.isActive() 获取当前动画的状态 true代表暂停

  if (animateX.isActive()) {
    animateX.pause(); // 暂停动画
  } else {
    animateX.resume(); // 恢复动画
  }
});

function render() {
+  controls.update();
  renderer.render(scene, camera);
  // 浏览器渲染下一帧的时候就会调用一次render函数
  requestAnimationFrame(render);
}

render();
```

### 11.监听窗口的变化并更新渲染

```js
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
// 将其设置为true以启用阻尼（惯性），这将给控制器带来重量感。默认值为false。
controls.enableDamping = true;

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);

// 将坐标轴辅助器添加到场景中
scene.add(axesHelper);

// 监听窗口的变化并更新渲染页面
+ window.addEventListener('resize', () => {
  console.log('窗口变化');
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight;

  // 更新摄像头的投影矩阵
  camera.updateProjectionMatrix();

  // 更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight);

  // 设置渲染器的像素比例
  renderer.setPixelRatio(window.devicePixelRatio); // window.devicePixelRatio 当前设备的像素比例
});

function render() {
  controls.update();
  renderer.render(scene, camera);
  // 浏览器渲染下一帧的时候就会调用一次render函数
  requestAnimationFrame(render);
}

render();
```

### 12.请求全屏与取消全屏

```js
// 导入threejs
import * as THREE from 'three';

// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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
// 将其设置为true以启用阻尼（惯性），这将给控制器带来重量感。默认值为false。
controls.enableDamping = true;

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);

// 将坐标轴辅助器添加到场景中
scene.add(axesHelper);

// 监听窗口的变化并更新渲染页面
window.addEventListener('resize', () => {
  console.log('窗口变化');
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight;

  // 更新摄像头的投影矩阵
  camera.updateProjectionMatrix();

  // 更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight);

  // 设置渲染器的像素比例
  renderer.setPixelRatio(window.devicePixelRatio); // window.devicePixelRatio 当前设备的像素比例
});

// 切换全屏
+ window.addEventListener('dblclick', () => {
  // 当处于全屏时会返回一个canvas,不是全屏为null
  let isFullScreen = document.fullscreenElement;

  if (!isFullScreen) {
    // 调用画布对象,请求开启全屏
    renderer.domElement.requestFullscreen();
  } else {
    // 取消全屏
    document.exitFullscreen();
  }
});

function render() {
  controls.update();
  renderer.render(scene, camera);
  // 浏览器渲染下一帧的时候就会调用一次render函数
  requestAnimationFrame(render);
}

render();
```

### 13.dat.GUI调试器的使用与配置

```js
1.npm install dat.gui --save-dev
2.// 创建datGUI
const gui = new dat.GUI();
```

```js
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
```

