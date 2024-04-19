<template>
<el-container style="width: 100%;height: 730px;">
  <el-main>
    <threeMap></threeMap>

    <!-- 左边框 -->
    <el-row class="sidebox1">
      <el-col :span="24"><div class="ChiYun" ><wordcloud></wordcloud></div></el-col>
      <el-col :span="24"><div class="titleCartogram"></div></el-col>
      <el-col :span="24"><div class="cartogram"><Statistics></Statistics></div></el-col>
    </el-row>
    
    <!-- 右边框 -->
    <el-row class="sidebox2">
      <el-col :span="24"><div class="textTitle">名称</div></el-col>
      <el-col :span="24"><div class="textbox"></div></el-col>
      <el-col :span="24"><div class="textbox" style="border-top-left-radius:10px;border-top-right-radius:10px;"></div></el-col>
    </el-row>
  </el-main>
</el-container>

</template>

<script setup>
import threeMap from './components/threeMap.vue';
import {useSenceStore} from './stores/useScenicSpot.ts'
import Statistics from './views/Statistics.vue'
import wordcloud from './views/wordcloud.vue'

const sence=useSenceStore();

</script>


<style>
/* 左边框 */
.sidebox1{
  top: 50px;
  height: 650px;
  width: 270px;
  /* background-color: darkcyan; */
  position: absolute;
  opacity:0.5;
  left: 30px;
}
/* 右边框 */
.sidebox2{
  top: 50px;
  height: 650px;
  width: 270px;
  /* background-color: rgb(29, 239, 131); */
  position: absolute;
  opacity:0.5;
  float: right;
  right: 30px;
  box-shadow: 12px 12px 12px 0 rgba(0, 0, 0, 0.1)
}
/* 词云框 */
.ChiYun{
  width: inherit;
  height: 250px;
  text-align: center;
  background-color:#DCDFE6;
  border-radius: 6px;
  box-shadow: 12px 12px 12px 0 rgba(0, 0, 0, 0.1)
}
/* 统计图标题 */
.titleCartogram{
  width: inherit;
  height: 20px;
  /* background-color:#409EFF; */
  margin-top: 10px;
  text-align: center;
  border-top-left-radius:4px;
  border-top-right-radius:4px;
}
/* 统计图 */
.cartogram{
  width: inherit;
  height: 370px;
  background-color:#DCDFE6;
  opacity:1;
  border-radius:4px;
  /* border-bottom-right-radius:4px; */
  box-shadow: 12px 12px 12px 0 rgba(0, 0, 0, 0.1)
}
.textTitle{
  width: inherit;
  height: 20px;
  top:100px;
  text-align: center;
  background-color: #409EFF;
  border-top-left-radius:10px;
  border-top-right-radius:10px;
}
.textbox{
  width: inherit;
  height: 320px;
  background-color:#E4E7ED;
  border-radius: 6px;
}
</style>
