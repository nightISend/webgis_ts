<template>
    <div id="vessal" class="main">
        
    </div>
</template>
<script setup lang="ts">
    import * as THREE from 'three';
    import { onMounted } from 'vue';
    import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
    import * as d3 from "d3";
import { transferPanelEmits } from 'element-plus/es/components/transfer/src/transfer-panel.mjs';


    //因为setup先于挂载，将放到容器的操作放到setup里会出现div还没出现就查找div的情况，所有将渲染器放到容器的操作放到完成挂载后执行
    onMounted(()=>{
        document.getElementById('vessal').appendChild( renderer.domElement );
        animate();
        loadmap();
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

    camera.position.z = 60;

    //添加轨道控制器，当页面要重新渲染时控制器也要更新
    const controls = new OrbitControls( camera, renderer.domElement );
    //自动旋转
    function animate() {
        requestAnimationFrame( animate ); //每次页面刷新就会调用animated方法，无限嵌套
        controls.update();
        renderer.render( scene, camera );//调整立方体的xy轴使其选择，并重新渲染
    }

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

    //加载中国geojosn数据
    async function loadmap(){
        const loader = new THREE.FileLoader();
        //接收中国包含子区域的shp及中国边界，返回的res对象是一个响应式数组,只有0和1有数据，因为有2个数据，数组里是josn数据
        let res= await Promise.all([
            loader.loadAsync('src/assets/geojosn/CHN.json'),
            loader.loadAsync('src/assets/geojosn/CHN_border.json')
        ]);

        if(res instanceof Array){
            createmap(res[0]);
        }

    }

    //创建d3投影坐标系用于放置坐标
    const projection =d3
        .geoMercator()//设置投影方法，球形墨卡托投影
        .scale(84)//缩放
        .center([108.5525,34.3227])//中心
        .translate([0,0])//移动

    //创建用于存放3d地图工程
    let chinaobj=new THREE.Object3D()

    //创建地图，通过读取geojosn数据获得每一个坐标点数据
    function createmap(res:any){
        var res=JSON.parse(res);
        // console.log(res);
        res.features.forEach((element:any)=> {//遍历feature里的每一个数据的类型
            // console.log(element)
            let provinceobj=new THREE.Object3D();//用于存放每一个省份的地图对象
            if(element.geometry.type=='MultiPolygon'){
                element.geometry.coordinates.forEach((MultiPolygon:any)=>{//遍历feature里每一个多面体的的数据
                    MultiPolygon.forEach((polygon:any)=>{//遍历多面体里每一个单面体的的数据
                        const shape = new THREE.Shape();
                        let arr:number[]=[];
                        polygon.forEach((coord:any)=>{//遍历每一个单面体的坐标
                            console.log(coord)
                            let z=projection(coord);
                             console.log(z)
                            if(coord.index==0){
                                shape.moveTo(z[0],-z[1])
                            }
                            else{
                                shape.lineTo(z[0],-z[1])
                            }
                            // let arr1=[coord[0],-coord[1],-1]
                            arr.push(z[0],-z[1],1)
                            // console.log(arr)
                        })
                        // let mesh=createExtrudeGeometry(shape,arr,element);
                        // provinceobj.add(mesh);
                    })
                })
            }
            else if(element.geometry.type=='Polygon'){
                element.geometry.coordinates.forEach((polygon:any)=>{
                        polygon.forEach((coord:any)=>{
                            // console.log(coord)
                        })
                })
            }
            chinaobj.add(provinceobj);
        });
        scene.add(chinaobj);//把地图添加到创建，在创建缓冲几何体时，线会被添加进chinaobj
    }

    
    //创建挤压缓冲几何体（ExtrudeGeometry），将二维地图做成三维,放回一个mesh对象
    function createExtrudeGeometry(shape:any,arr:number[],element:any){
        //地图材质的参数
        let meshmaterrial={
            color:0x00ff00,
            transparent:true,
            opacity:0.8,
            blending:THREE.AdditiveBlending
        }
        //边界材质的参数
        let linematerrial={
            color:0x00ffff,
            blending:THREE.AdditiveBlending
        }
        const geometry = new THREE.ExtrudeGeometry( shape );
        const material = new THREE.MeshBasicMaterial( meshmaterrial );//创建材质
        const mesh = new THREE.Mesh( geometry, material ) ;
        //给画出来的省份名字
        if(element.properties.name){
            mesh.name=element.properties.name;
        }
        //画线
        let buffer=new THREE.BufferGeometry();
        buffer.setAttribute(
            'position',
            new THREE.BufferAttribute(new Float64Array(arr),3));
        let line=new THREE.Line(buffer,new THREE.LineBasicMaterial(linematerrial));
        //把线添加到工程
        chinaobj.add(line);//添加边界数据
        return mesh;
    }
</script>
<style>
.main{
    width: 100%;
    height: 100%;
}
</style>