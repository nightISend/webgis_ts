<template>
<el-container id="wordcloud" class="main">
</el-container>
</template>

<script setup lang="ts">
import { onMounted }  from 'vue';
import * as echarts from 'echarts';
import 'echarts-wordcloud';

onMounted(()=>{
    var chart = echarts.init(document.getElementById('wordcloud'));
    chart.setOption(option);
    window.addEventListener("resize", function() {
        chart.resize();
    });
})

var keywords = [{"name":"男神","value":2.64},
                {"name":"好身材","value":4.03},
                {"name":"校草","value":24.95},
                {"name":"酷","value":4.04},
                {"name":"时尚","value":5.27},
                {"name":"阳光活力","value":5.80},
                {"name":"初恋","value":3.09},
                {"name":"英俊潇洒","value":24.71}
            ];
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
                        data: keywords
                    }]
                };
</script>

<style>
.main{
    width:100%;
    height: 100%;
}
</style>