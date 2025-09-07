<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import img from '@/assets/02-1.jpg'

export default {
  mounted() {
    this.initPanorama();
  },
  methods: {
    initPanorama() {
      // 获取容器
      const container = this.$refs.panoramaContainer;

      // 创建场景
      const scene = new THREE.Scene();

      // 创建摄像机
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(0, 0, 0.1); // 使摄像机在球体内部

      // 创建渲染器
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(renderer.domElement);

      renderer.xr.enabled = true;
      document.body.appendChild(VRButton.createButton(renderer));

      // 加载全景图纹理
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(img, (texture) => {
        const geometry = new THREE.SphereGeometry(500, 60, 40);
        const material = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.BackSide, // 让纹理显示在球体内部
        });
        texture.wrapS = THREE.RepeatWrapping;
        texture.repeat.x = -1; // ✅ 水平翻转
        // material.map.rotation = Math.PI;
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);
        animate();
      });

      // 轨道控制器（支持鼠标拖拽和手机滑动）
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;  // 启用阻尼，平滑过渡
      controls.dampingFactor = 0.2;  // 阻尼因子，数值越大，平滑效果越明显
      controls.enableZoom = false;   // 禁用缩放
      controls.enablePan = false;    // 禁用平移
      controls.rotateSpeed = -0.3;   // 调整旋转速度

      // const stats = new Stats();
      // document.body.appendChild(stats.dom);
      // 动画循环
      function animate() {
        // stats.begin();
        controls.update();
        renderer.render(scene, camera);
        // stats.end();
        requestAnimationFrame(animate);
      }
      renderer.setSize(window.innerWidth, window.innerHeight);
      // 监听窗口大小变化
      window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    },
  },
};

</script>

<template>
  <div ref="panoramaContainer" class="panorama-container"></div>
</template>

<style scoped>
.panorama-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>