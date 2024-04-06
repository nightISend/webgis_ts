<template>
  <div class="common-layout" style="width: 100%;height: 730px;">
    <div class="title">标题</div>
    <div class="sidebox" style="border-bottom-left-radius:30px">
      <div class="boxInSide1"></div>
      <div class="boxInSide2" style="border-bottom-left-radius:30px"></div>
    </div>
    <div class="mainbox" >
      <threeMap></threeMap>
    </div>
    <div class="sidebox" style="float: right;border-bottom-right-radius:30px">
      <div class="boxInSide1"></div>
      <div class="boxInSide2"style="border-bottom-right-radius:30px"></div>
    </div>
  </div>
</template>

<script setup>
import threeMap from './components/threeMap.vue';

</script>


<style>
.title{
  height: 50px; 
  text-align: center; 
  background-color: beige;
  border-top-left-radius: 30px ;
  border-top-right-radius: 30px ;
}
.sidebox{
  height: 680px;
  width: 15%;
  background-color: darkcyan;
  float: left;
}
.mainbox{
  height: 680px;
  width: 70%;
  background-color: rgb(70, 233, 151);
  float: left;
}
.boxInSide1{
  height: 50%;
  background-color: aquamarine;
}
.boxInSide2{
  height: 50%;
  background-color: rgb(178, 216, 249);
}
</style>
