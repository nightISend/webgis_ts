<template>
    <div id="vessal" class="main">
        
    </div>
</template>
<script setup>
    import * as THREE from 'three';
    import { onMounted } from 'vue';
    import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


    //因为setup先于挂载，将放到容器的操作放到setup里会出现div还没出现就查找div的情况，所有将渲染器放到容器的操作放到完成挂载后执行
    onMounted(()=>{
        document.getElementById('vessal').appendChild( renderer.domElement );
    })

    const scene = new THREE.Scene();
    //透视摄像机.
    //第一个参数是视野角度（FOV）,表示能在显示器上看到的场景的范围，它的单位是角度(与弧度区分开)。75
    //第二个参数是长宽比（aspect ratio）。 也就是你用一个物体的宽除以它的高的值。window.innerWidth / window.innerHeight浏览器的长宽比
    //接下来的两个参数是近截面（near）和远截面（far）。0.1, 1000
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    //创建渲染器并设置渲染器的尺寸
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio(window.devicePixelRatio);//使模型更清晰

    //创建一个立方体对象，包括长宽高，材质并添加到场景
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    camera.position.z = 5;

    //添加轨道控制器，当页面要重新渲染时控制器也要更新
    const controls = new OrbitControls( camera, renderer.domElement );
    //自动旋转
    function animate() {
        requestAnimationFrame( animate ); //每次页面刷新就会调用animated方法，无限嵌套
        controls.update();
        renderer.render( scene, camera );//调整立方体的xy轴使其选择，并重新渲染
    }
    animate();

    //重新渲染
    function update(){
        renderer.render(scene,camera);
    }

    //自适应窗体大小
    function resize(){
        camera.aspect=window.innerWidth, window.innerHeight;
        camera.updateProjectionMatrix();//用于更新设置
        renderer.setSize( window.innerWidth, window.innerHeight );
    }
    window.addEventListener('resize',resize)

    //添加环境光,给的默认颜色为白色，强度为1
    function addAmbientLight(color =0x404040, intensity = 1){
        const light = new THREE.AmbientLight( color,intensity ); // 柔和的白光
        scene.add( light );
    }

</script>
<style>
.main{
    width: 100%;
    height: 100%;
}
</style>