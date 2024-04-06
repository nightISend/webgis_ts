<template>
    <div id="vessal" class="main">
        
    </div>
</template>
<script setup>
    import * as THREE from 'three';
    import { onMounted } from 'vue';
    //因为setup先于挂载，将放到容器的操作放到setup里会出现div还没出现就查找div的情况，所有将放到容器的操作放到完成挂载后执行
    onMounted(()=>{
        document.getElementById('vessal').appendChild( renderer.domElement );
    })

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame( animate );

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render( scene, camera );
    }
    animate();
</script>
<style>
.main{
    width: 100%;
    height: 100%;
}
</style>