<template>
    <div id="vessal" class="main">
        
    </div>
</template>
<script setup lang="ts">
    import * as THREE from 'three';
    import { onMounted } from 'vue';
    import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
    import * as d3 from "d3";
    import { element } from 'three/examples/jsm/nodes/Nodes.js';
    import {useSenceStore} from '@/stores/useScenicSpot';

    //读取景点数据
    let data=useSenceStore();
    // console.log(data.chinaScenic)

    //因为setup先于挂载，将获取容器的操作放到setup里会出现div还没出现就查找div的情况，所有将渲染器放到容器的操作放到完成挂载后执行
    onMounted(()=>{
        document.getElementById('vessal')?.appendChild( renderer.domElement );
        animate();
        loadmap();//创建中国地图
        // addAmbientLight(0.55);
        addEventListener('mousemove',mouseEmphasizeEvent);
        addEventListener('click',mouseClickEvent);
    })

    const scene = new THREE.Scene();
    //透视摄像机.
    //第一个参数是视野角度（FOV）,表示能在显示器上看到的场景的范围，它的单位是角度(与弧度区分开)。75
    //第二个参数是长宽比（aspect ratio）。 也就是你用一个物体的宽除以它的高的值。window.innerWidth / window.innerHeight浏览器的长宽比
    //接下来的两个参数是近截面（near）和远截面（far）。0.1, 1000
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    //创建渲染器并设置渲染器的尺寸
    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor('#EBEEF5',0.3)
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio(window.devicePixelRatio);//使模型更清晰

    camera.position.z = 70;//用于调整摄像机初始高度

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
            loader.loadAsync('src/assets/geojosn/london.json')
        ]);

        if(res instanceof Array){
            createmap(res[0]);
        }

    }

    //创建d3坐标
    const projection =d3
        .geoMercator()
        .scale(84)
        .center([108.5525,34.3227])
        .translate([0,0])

    //创建用于存放3d地图工程
    let chinaobj=new THREE.Object3D()
    
    //定义省份类型，用于存放省份的坐标和名称
    type province={
        name:string,
        coordinate:any,
        center:number[]
    }

    let provinceShape:province[]=[];//在createmap方法调用时，即创建中国地图时存放各个身份的名称、边界坐标和中心坐标

    //创建地图，通过读取geojosn数据获得每一个坐标点数据，放到
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
                        let arr:number[]=[];//用于存放边界
                        let x:number=0;//用于记录各个省份的中心
                        let y:number=0;
                        polygon.forEach((coord:any,index:number)=>{//遍历每一个单面体的坐标
                            x=x+coord[0];
                            y=y+coord[1];
                            let z=projection(coord);
                            if(z){
                                if(index==0){
                                    shape.moveTo(z[0],-z[1])
                                }
                                else{
                                    shape.lineTo(z[0],-z[1])
                                }
                                arr.push(z[0],-z[1],5)
                            }
                        })
                        let mesh=createExtrudeGeometry(shape,arr,element);
                        provinceobj.add(mesh);

                        let center=[x/polygon.length,y/polygon.length];
                        let p:province={//用于临时存放省份名称和坐标
                            name:element.properties.name,
                            coordinate:polygon,
                            center:center
                        }
                        provinceShape.push(p);//将省份的polygon和名称存入数组
                    })
                })
            }
            else if(element.geometry.type=='Polygon'){
                element.geometry.coordinates.forEach((polygon:any)=>{
                        const shape = new THREE.Shape();
                        let arr:number[]=[];
                        let x:number=0;//用于记录各个省份的中心
                        let y:number=0;
                        polygon.forEach((coord:any,index:number)=>{
                            x=x+coord[0];
                            y=y+coord[1];
                            let z=projection(coord);
                            if(z){
                                if(index==0){
                                    shape.moveTo(z[0],-z[1])
                                }
                                else{
                                    shape.lineTo(z[0],-z[1])
                                }
                                arr.push(z[0],-z[1],5)
                            }
                        })
                        let mesh=createExtrudeGeometry(shape,arr,element);
                        provinceobj.add(mesh);

                        let center=[x/polygon.length,y/polygon.length];
                        let p:province={//用于临时存放省份名称和坐标
                            name:element.properties.name,
                            coordinate:polygon,
                            center:center
                        }
                        provinceShape.push(p);//将省份的polygon和名称存入数组
                })
            }

            //添加景点数据
            data.chinaScenic.forEach((element1)=>{//遍历省份
                let pro_attractions_obj=new THREE.Object3D();//用于存放每一个省份的地图对象
                element1.attractions.forEach((point)=>{//遍历省份的景点
                    let z=projection([point.coordinate[0],point.coordinate[1]]);
                    const map= new THREE.TextureLoader().load('src/assets/3.png');
                    let materrialPoint=new THREE.SpriteMaterial({
                        map:map,
                        transparent:true,
                        opacity:0.1,
                        depthWrite:false,
                        depthTest:true,
                        blending:THREE.AdditiveBlending,
                        color:'#67C23A'
                    })
                    let sprite=new THREE.Sprite(materrialPoint);
                    if(z){
                        sprite.position.set(z[0],-z[1],6)
                    }
                    sprite.name=point.name;
                    pro_attractions_obj.add(sprite);
                })
                // console.log(pro_attractions_obj);
                pro_attractions_obj.name=element1.name;
                chinaobj.add(pro_attractions_obj);
            })


            chinaobj.add(provinceobj);
        });
         scene.add(chinaobj);//把地图添加到创建，在创建缓冲几何体时，线会被添加进chinaobj
    }

    
    //创建挤压缓冲几何体（ExtrudeGeometry），将二维地图做成三维,放回一个mesh对象
    function createExtrudeGeometry(shape:any,arr:number[],element:any){
        //地图材质的参数
        let meshmaterrial=[
            new THREE.MeshBasicMaterial({
                color:'#606266',//外部颜色
                transparent:true,
                opacity:0.6,
                blending:THREE.AdditiveBlending
            }),
            new THREE.MeshBasicMaterial({
                color:'#000000',//内部颜色
                transparent:true,
                opacity:1,
                blending:THREE.AdditiveBlending
            }),
        ]
        //边界材质的参数
        let linematerrial={
            color:0x00ffff,
            blending:THREE.AdditiveBlending
        }
        //对几何体进行设置
        const extrudeSettings={
            depth: 5,
            steps: 2,
        }
        const geometry = new THREE.ExtrudeGeometry( shape ,extrudeSettings);
        const mesh = new THREE.Mesh( geometry, meshmaterrial ) ;
        //给画出来的省份名字
        if(element.properties.name){
            // console.log(element.properties.name)
            mesh.name=element.properties.name;
        }
        //画线
        let buffer=new THREE.BufferGeometry();
        buffer.setAttribute('position',new THREE.BufferAttribute(new Float32Array(arr),3));//只能用32位，不知道为什么
        let line=new THREE.Line(buffer,new THREE.LineBasicMaterial(linematerrial));
        //把线添加到工程
        chinaobj.add(line);//添加边界数据
        return mesh;
    }

    //鼠标悬浮，模型突出
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let cuurrentObj:any = null; 
    const mouseEmphasizeEvent = (e:any) => {
        // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        // 计算物体和射线的焦点
        const intersects = raycaster.intersectObjects(scene.children, true);
        // console.log(intersects[0].object)
        cuurrentObj
          ? cuurrentObj.object.scale.set(1, 1, 1)
          : (cuurrentObj = null);

        if (intersects.length) {
          //处理选中的最上层对象
          if (intersects[0].object.isObject3D) {//判断鼠标碰到的是不是object对象
            cuurrentObj = intersects[0];
            if(cuurrentObj.object.type=='Mesh'){//判断对象是不是mesh类型的
                intersects[0].object.scale.set(1.2, 1.2, 1.2);
            }
          }
        }
      };
    
    //鼠标点击，单独呈现省份模型，再次点击模型恢复中国模型
    const raycasterClick = new THREE.Raycaster();
    const mouseClick = new THREE.Vector2();
    let cuurrentObjClick:any = null;
    let isDisplayAlone=false;//判断是否单独显示省份模型
    const mouseClickEvent = (e:any) => {
        // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
            mouseClick.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouseClick.y = -(e.clientY / window.innerHeight) * 2 + 1;
            raycasterClick.setFromCamera(mouseClick, camera);
            // 计算物体和射线的焦点
            const intersects = raycasterClick.intersectObjects(scene.children, true);
            // console.log(intersects)
            cuurrentObjClick? cuurrentObjClick.object.scale.set(1, 1, 1)
            : (cuurrentObjClick = null);
            if (intersects.length) {
            //单独展示选中的模型
                if(isDisplayAlone==false){//判断是否已经单独呈现省份
                    if (intersects[0].object.isObject3D) {//判断鼠标碰到的是不是object对象
                        cuurrentObjClick = intersects[0];
                        if(cuurrentObjClick.object.type=='Mesh'){//判断对象是不是mesh类型的
                            // console.log(cuurrentObjClick.object.name)
                            isDisplayAlone=true;
                            scene.remove(chinaobj);
                            //创建居中的省份
                            let modelcenter:number[]=[];//记录模型中心坐标

                            //创建景点模型
                            data.chinaScenic.forEach((element1)=>{//遍历省份
                                modelcenter=element1.center;
                                if(element1.name==cuurrentObjClick.object.name){

                                    data.temperment=[];//清空暂存

                                    element1.attractions.forEach((point)=>{//遍历省份的景点

                                        data.temperment.push(point);//添加景点数据到暂存空间

                                        const projectionAlone=d3
                                        .geoMercator()
                                        .scale(200)
                                        .center([modelcenter[0],modelcenter[1]])
                                        .translate([0,0])
                                        let z=projectionAlone([point.coordinate[0],point.coordinate[1]]);
                                        const map= new THREE.TextureLoader().load('src/assets/3.png');
                                        let materrialPoint=new THREE.SpriteMaterial({
                                            map:map,
                                            transparent:true,
                                            depthWrite:false,
                                            depthTest:true,
                                            blending:THREE.AdditiveBlending,
                                            
                                        })
                                        let sprite=new THREE.Sprite(materrialPoint);
                                        if(z){
                                            sprite.position.set(z[0],-z[1],6)
                                        }
                                        scene.add(sprite)
                                    })
                                    console.log(data.temperment[data.i].content)
                                }
                            })

                            provinceShape.forEach((element:province)=>{
                                if(element.name==cuurrentObjClick.object.name){
                                    modelcenter=element.center;
                                    const projectionAlone=d3
                                        .geoMercator()
                                        .scale(200)
                                        .center([modelcenter[0],modelcenter[1]])
                                        .translate([0,0])
                                    //创建省份模型
                                    const shape = new THREE.Shape();
                                    element.coordinate.forEach((coord:any,index:number)=>{//遍历每一个单面体的坐标
                                        let z=projectionAlone(coord);
                                        if(z){
                                            if(index==0){
                                                shape.moveTo(z[0],-z[1])
                                            }
                                            else{
                                                shape.lineTo(z[0],-z[1])
                                            }
                                        }
                                    })
                                    let meshmaterrial=[
                                        new THREE.MeshBasicMaterial({
                                            color:'#606266',//外部颜色
                                            transparent:true,
                                            opacity:0.8,
                                            blending:THREE.AdditiveBlending
                                        }),
                                        new THREE.MeshBasicMaterial({
                                            color:'#000000',//内部颜色
                                            transparent:true,
                                            opacity:0.55,
                                            blending:THREE.AdditiveBlending
                                        }),
                                    ]
                                    const extrudeSettings={
                                        depth: 5,
                                        steps: 2,
                                    }
                                    const geometry = new THREE.ExtrudeGeometry( shape ,extrudeSettings);
                                    const mesh = new THREE.Mesh( geometry, meshmaterrial ) ;
                                    scene.add(mesh);   
                                }
                            })
                        }
                    }
                }
                else{
                    //清除单独显示的省份模型并重新展示中国模型
                    scene.clear();
                    camera.position.set(0,0,65);
                    chinaobj.add(cuurrentObjClick.object);
                    isDisplayAlone=false;
                    scene.add(chinaobj);
                }
            }
      };
    
    
</script>
<style>
.main{
    width: inherit;
    height: inherit;
}
</style>