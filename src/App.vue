<template>
<el-container style="width: 100%;height: 730px;">
  <el-main>
    <threeMap></threeMap>

    <!-- 左边框 -->
    <el-row class="sidebox1">
      <!-- 列表框 -->
      <el-col :span="24" class="list">
        <div style="width: 250px;height: 130px; background-color: #C1FCF6; float: left;border-radius:10% 25%;">
          <li v-for="item in data.temperment" style="width: 90%;font-family: Arial,SimSun ;">
            {{ item.name }}
          </li>
        </div>
        <div style="width: 150px;height: 100px;float:right;">
          <el-button id="next" type="primary" style="float: left;" >下一个</el-button>
        </div>
      </el-col>
      <!-- 词云 -->
      <el-col :span="24"><div class="ChiYun"><wordcloud></wordcloud></div></el-col>
      <!-- 统计图 -->
      <el-col :span="24"><div class="cartogram"><Statistics></Statistics></div></el-col>
    </el-row>
    
    <!-- 右边框 -->
    <el-row class="sidebox2">
      <!-- 文本 -->
      <!-- 标题 -->
      <el-col :span="24" class="textTitle">{{ entity.name }}</el-col>
      <el-col :span="24" class="textbox"><p class="fontClass">{{ entity.content }}</p>
      </el-col>
      <!-- 图片 -->
      <el-col :span="24" class="picture">
          <el-carousel height="250px">
            <el-carousel-item v-for="item in entity.pictures" :key="item" >
              <img :src="item" class="image">
            </el-carousel-item>
        </el-carousel>
    </el-col>
    </el-row>
  </el-main>
</el-container>

</template>

<script setup lang="ts">
import { onMounted,ref,watch } from 'vue';
import threeMap from './components/threeMap.vue';
import {useSenceStore} from '@/stores/useScenicSpot';
import Statistics from './views/Statistics.vue'
import wordcloud from './views/wordcloud.vue'


let data=useSenceStore();
let entity=ref(data.chinaData.attractions);

onMounted(()=>{
  console.log( document.getElementById('next'))
  document.getElementById("next")?.addEventListener("click",nextclick);

  watch(
        () => [data.i,data.temperment],
        (newValue, oldValue) => {
          // console.log('app.vue 发现变动')
          entity.value=data.temperment[data.i];
        },
        { deep: true }
    )
})

//按钮事件，用于控制 存储数据的索引
function nextclick(){
    if(data.i+1<data.temperment.length){
      data.i+=1;
    }
    else{
      data.i=0;
    }
  }
</script>


<style>
/* 左边框 */
.sidebox1{
  top: 50px;
  height: 650px;
  width: 400px;
  /* background-color: darkcyan; */
  position: absolute;
  left: 30px;
}
/* 右边框 */
.sidebox2{
  top: 50px;
  height: 650px;
  width: 300px;
  /* background-color: rgb(29, 239, 131); */
  position: absolute;
  float: right;
  right: 30px;
  box-shadow: 12px 12px 12px 0 rgba(0, 0, 0, 0.1)
}
/* 词云框 */
.ChiYun{
  width: 80%;
  height: 240px;
  text-align: center;
  background-color:#98DCED;
  border-radius: 30px;
  opacity:0.8;
  box-shadow: 12px 12px 12px 0 rgba(0, 0, 0, 0.1)
}
/* 列表 */
.list{
  width: 300px;
  height: 130px;
  /* background-color:#409EFF; */
  border-radius:12px;
  opacity:0.8;
}
/* 统计图 */
.cartogram{
  width: inherit;
  height: 270px;
  background-color:#98DCED;
  opacity:0.9;
  border-radius: 10px 40px 40px 10px;;
  /* border-bottom-right-radius:4px; */
  box-shadow: 12px 12px 12px 0 rgba(0, 0, 0, 0.1);
}
/* 右框标题 */
.textTitle{
  width: 90%;
  height: 20px;
  top:100px;
  opacity:0.8;
  text-align: center;
  background-color: #B2FFE8;
  border-top-left-radius:10px;
  border-top-right-radius:10px;
  float: right;
}
/* 右文本 */
.textbox{
  width: 90%;
  height: 380px;
  background-color:#98DCED;
  opacity:0.8;
  border-bottom-left-radius:15px;
  border-bottom-right-radius:15px;
  float: right;
}
/* 字体 */
.fontClass{
font-size:15px;
font-family: Arial,SimSun ;
color: #303133;
}
/* 图片框 */
.picture{
  width: inherit;
  height: 250px;
  background-color:#84BAE0;
  border-radius: 10px;
  opacity:0.8;
}
/* 走马灯 */
.image{
  max-width: 100%;
  height: auto;
}
</style>
