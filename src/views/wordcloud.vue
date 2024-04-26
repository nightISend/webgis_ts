<template>
<el-container id="wordcloud" class="main">
</el-container>
</template>

<script setup lang="ts">
import { onMounted, watch }  from 'vue';
import * as echarts from 'echarts';
import 'echarts-wordcloud';
import {useSenceStore} from '@/stores/useScenicSpot';

const data=useSenceStore();
// console.log(data.temperment[data.i].attractions.wardcloud);

onMounted(()=>{
    var chart = echarts.init(document.getElementById('wordcloud'));
    chart.setOption(option,true);
    window.addEventListener("resize", function() {
        chart.resize();
    });

    watch(
        () => [data.i,data.temperment],
        (newValue, oldValue) => {
            // console.log("词云监听到数据变化")
            // console.log(data.temperment[data.i].wardcloud)
            option.series[0].data=data.temperment[data.i].wardcloud
            chart.setOption(option,true)
        },
        { deep: true }
    )
})

            var option = {
                    series: [{
                        type: 'wordCloud',
                    //maskImage: maskImage,
                        sizeRange: [15, 80],
                        rotationRange: [0, 0],
                        rotationStep: 45,
                        gridSize: 8,
                        shape: 'pentagon',
                        width: '100%',
                        height: '100%',
                        textStyle: {
                            normal: {
                                color: function () {
                                    return 'rgb(' + [
                                        Math.round(Math.random() * 160),
                                        Math.round(Math.random() * 160),
                                        Math.round(Math.random() * 160)
                                    ].join(',') + ')';
                                },
                                fontFamily: 'sans-serif',
                                fontWeight: 'normal'
                            },
                            emphasis: {
                                shadowBlur: 10,
                                shadowColor: '#333'
                            }
                        },
                        data: data.chinaData.attractions.wardcloud
                    }]
                };
</script>

<style>
.main{
    width:100%;
    height: 100%;
}
</style>