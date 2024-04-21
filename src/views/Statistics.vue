<template>
<el-container id="statistic" class="main">
</el-container>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted ,watch} from 'vue';
import {useSenceStore} from '@/stores/useScenicSpot';
import { any } from 'three/examples/jsm/nodes/Nodes.js';

const data=useSenceStore();

onMounted(()=>{
  var chartDom = document.getElementById('statistic')!;
  var myChart = echarts.init(chartDom);
  option && myChart.setOption(option);

  window.addEventListener("resize", () => {
    myChart.resize();
  });


  watch(
        () => data.i,
        (newValue, oldValue) => {
            console.log("统计图监听到数据变化")
            console.log(data.temperment[data.i].statistic)
            let s2=bite(data.temperment[data.i].statistic)
            console.log(option.series)
            option.series[1].data=bite(data.temperment[data.i].statistic);
            option.series[0].data=data.temperment[data.i].statistic;
            myChart.setOption(option,true)
        },
        { deep: true }
    )
})
type EChartsOption = echarts.EChartsOption;
var option: EChartsOption;




//计算比率
function bite(element:number[]){
  let bite_array=[];
  for(let i=0;i<element.length;i++){
    if(i==0){
      bite_array.push(0);
    }
    else{
      bite_array.push((element[i]-element[i-1])/element[i]*100);
    }
  }
  return bite_array;
}

option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999'
      }
    }
  },
  toolbox: {
    feature: {
      dataView: { show: true, readOnly: false },
      magicType: { show: true, type: ['line', 'bar'] },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  legend: {
    data: ['客流量', '增长比']
  },
  xAxis: [
    {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月','8月','9月','10月','11月','12月'],
      axisPointer: {
        type: 'shadow'
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '客流量',
      min: 0,
      max: 1500,
      interval: 200,
      axisLabel: {
        formatter: '{value} 万人'
      }
    },
    {
      type: 'value',
      name: '增长比',
      min: -50,
      max: 100,
      interval: 20,
      axisLabel: {
        formatter: '{value} %'
      }
    }
  ],
  series: [
    {
      name: '客流量',
      type: 'bar',
      tooltip: {
        valueFormatter: function (value) {
          return (value as number) + ' ml';
        }
      },
      data:data.chinaData.attractions.statistic
    },
    {
      name: '增长比',
      type: 'line',
      yAxisIndex: 1,
      tooltip: {
        valueFormatter: function (value) {
          return (value as number) + ' %';
        }
      },
      data: bite(data.chinaData.attractions.statistic)
    }
  ]
};

</script>

<style>
.main{
    width:100%;
    height: 100%;
}
</style>