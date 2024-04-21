import { number } from 'echarts'
import { defineStore } from 'pinia'
import { compute, element } from 'three/examples/jsm/nodes/Nodes.js'
import { ref,reactive } from 'vue'
//定义景点的数据结构
type spot={
   "name":string,
   "coordinate":number[],
   "statistic":number[],//单位万
   "content":string,
   "wardcloud":any,
   "picture":string[]
}

//定义省份的数据结构
type province={
   "name":string,
   "center":number[],
   "attractions":spot[]
}


export const useSenceStore = defineStore('ScenicStore', () => {

   //中国数据
   const chinaData= {"name":'中国',
      "attractions":{
         "name":"中国",
         "coordinate":[108.5525,34.3227],
         "content":"这是中国的内容",
         "wardcloud":[ {name:"长城",value:5},
         {name:"明清皇宫",value:2},
         {name:"秦始皇陵",value:2},
         {name:"莫高窟",value:2},
         {name:"周口店",value:2},
         {name:"布达拉宫",value:3},
         {name:"承德避暑山庄",value:1},
         {name:"曲阜孔庙",value:3},
         {name:"武当山古建筑群",value:1},
         {name:"平遥古城",value:3},
         {name:"丽江古城",value:3},
         {name:"苏州古典园林",value:1},
         {name:"颐和园",value:4},
         {name:"天坛",value:4},
         {name:"大足石刻",value:2},
         {name:"龙门石窟",value:2},
         {name:"明清皇家陵寝",value:1},
         {name:"都江堰",value:3},
         {name:"皖南古村落",value:2},],
         "statistic":[1100,1200,1300,1111,1003,1233,1333,1245,1833,1444,1234,1111],
         "pictures":["src/assets/picture/中国_1.jpg","src/assets/picture/中国_2.jpg"]
      }
   }

   //省份及其景点数据
    const chinaScenic:province[] = [
         {"name":'北京市',
         "center":[116.388,39.9075],
            "attractions":[{
               "name":"长城",
               "coordinate":[117.23333,40.683333],
               "statistic":[91, 81, 70, 78, 81, 88, 90,
                   98, 97, 100, 90,],
               "content":"这是长城的内容",
               "wardcloud":[{name:"长城词云",value:5}],
               "picture":[]
            },{
               "name":"周口店北京猿人遗址",
               "coordinate":[115.85000,39.68333],
               "statistic":[10, 9, 9, 10, 10, 9, 12, 13, 
                  10,9, 10, 9],
               "content":"这是周口店北京猿人遗址的内容",
               "wardcloud":[{name:"周口店北京猿人遗址词云",value:5}],
               "picture":[]
            }]
         },
         {"name":'浙江省',
         "center":[120.15, 29.28],
            "attractions":[{
               "name":"中国大运河",
               "coordinate":[120.214791,30.491037],
               "statistic":[72, 73, 83, 94, 104, 124, 136, 147,
                  138, 107, 116, 104],
               "content":"这是周中国大运河的内容",
               "wardcloud":[{name:"大运河词云",value:5}],
               "picture":[]
            },{
               "name":"良渚古城遗址",
               "coordinate":[30.40736,120.02889],
               "statistic":[26, 26, 27, 26, 26, 27, 27, 27, 27,
                  27, 27, 26],
               "content":"这是良渚古城遗址的内容",
               "wardcloud":[{name:"良渚词云",value:5}],
               "picture":[]
            },{
               "name":"杭州西湖",
               "coordinate":[30.2469944,120.144167],
               "statistic":[504, 510, 509, 512, 510, 512, 516, 524,
                  532, 520, 526, 512],
               "content":"这是杭州西湖的内容",
               "wardcloud":[{name:"西湖词云",value:5}],
               "picture":[]
            }]
         },
         {"name":'河南省',
         "center":[113.46, 34.25],
         "attractions":[{
            "name":"龙门石窟",
            "coordinate":[112.469722,34.555556],
            "statistic":[49, 48, 47, 49, 48, 50, 54, 56, 52,
               51, 57, 50],
            "content":"这是龙门石窟的内容",
            "wardcloud":[{name:"龙马石窟词云",value:5}],
            "picture":[]
         },{
            "name":"安阳殷墟",
            "coordinate":[114.313889,36.126667],
            "statistic":[150, 149, 150, 148, 149, 152, 153, 155,
               156, 153, 155, 152],
            "content":"这是安阳殷墟的内容",
            "wardcloud":[{name:"安阳殷墟词云",value:5}],
            "picture":[]
         },{
            "name":"登封“天地之中”历史建筑群",
            "coordinate":[112.935514,34.435],
            "statistic":[30, 29, 30, 29, 28, 29, 32, 33, 35,
               32, 34, 32],
            "content":"这是登封“天地之中”历史建筑群的内容",
            "wardcloud":[{name:"天地之中词云",value:5}],
            "picture":[]
         }]
         },
    ]

    let i=ref(0);//暂存数据的索引
    let temperment:any=reactive([chinaData]);//暂存数据
    
    return { chinaScenic,chinaData,temperment,i}
  })
  