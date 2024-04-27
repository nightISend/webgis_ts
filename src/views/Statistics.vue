<template>
<el-container id="statistic" class="main">
</el-container>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted ,watch} from 'vue';
import {useSenceStore} from '@/stores/useScenicSpot';

const data=useSenceStore();

onMounted(()=>{
  var chartDom = document.getElementById('statistic')!;
  var myChart = echarts.init(chartDom);
  option && myChart.setOption(option_china);

  window.addEventListener("resize", () => {
    myChart.resize();
  });


  watch(
        () => [data.i,data.temperment],
        (newValue, oldValue) => {
            option.series[1].data=bite(data.temperment[data.i].statistic);
            option.series[0].data=data.temperment[data.i].statistic;
            myChart.setOption(option,true)
        },
        { deep: true }
    )
})
type EChartsOption = echarts.EChartsOption;
var option: EChartsOption;
var option_china:EChartsOption;




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

//景点统计图
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
      dataView: { show: false, readOnly: false },
      magicType: { show: false, type: ['line', 'bar'] },
      restore: { show: false },
      saveAsImage: { show: false }
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
      max: 600,
      interval: 200,
      axisLabel: {
        formatter: '{value}万人'
      }
    },
    {
      type: 'value',
      name: '增长比',
      min: -50,
      max: 100,
      interval: 20,
      axisLabel: {
        formatter: '{value}%'
      }
    }
  ],
  series: [
    {
      name: '客流量',
      type: 'bar',
      tooltip: {
        valueFormatter: function (value) {
          return (value as number) + '万人';
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
          return (value as number) + '%';
        }
      },
      data: bite(data.chinaData.attractions.statistic)
    }
  ]
};

//中国统计图
option_china = {
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
      dataView: { show: false, readOnly: false },
      magicType: { show: false, type: ['line', 'bar'] },
      restore: { show: false },
      saveAsImage: { show: false }
    }
  },
  legend: {
    data: ['客流量', '增长比']
  },
  xAxis: [
    {
      type: 'category',
      data: ['第一季度','第二季度','第三季度','第四季度'],
      axisPointer: {
        type: 'shadow'
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '客流量',
      min: 11,
      max: 13,
      interval: 0,
      axisLabel: {
        formatter: '{value} 亿'
      }
    },
    {
      type: 'value',
      name: '增长比',
      min: 40,
      max: 200,
      interval: 30,
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
          return (value as number) + ' 亿';
        }
      },
      data:[12.16,11.68,12.9,12.17]
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
      data: [46.5,86.9,101.9,179]
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