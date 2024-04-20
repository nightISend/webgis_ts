import { defineStore } from 'pinia'
import { compute, element } from 'three/examples/jsm/nodes/Nodes.js'
import { ref } from 'vue'
//定义景点的数据结构
type spot={
   "name":string,
   "coordinate":number[],
   "statistic":number[],
   "content":string
}

//定义省份景点的数据结构
type province={
   "name":string,
   "center":number[],
   "attractions":spot[]
}


export const useSenceStore = defineStore('ScenicStore', () => {

  let provinceName=ref("中国");
  let spotName=ref();

   const chinaData= {"name":'中国',
      "attractions":[{
         "name":"中国",
         "coordinate":[108.5525,34.3227],
         "content":"这是中国的内容",
         "statistic":[
            {
              name: "北京",
              value: "5",
            },
            {
              name: "四川",
              value: "5",
            },
            {
              name: "云南",
              value: "4",
            },
            {
              name: "河南",
              value: "4",
            },
            {
              name: "山西",
              value: "3",
            },
            {
              name: "福建",
              value: "3",
            },
            {
              name: "江西",
              value: "3",
            },
            {
              name: "山东",
              value: "2",
            },
            {
              name: "湖北",
              value: "2",
            },
            {
              name: "江苏",
              value: "2",
            },
            {
              name: "安徽",
              value: "2",
            },
            {
              name: "湖南",
              value: "2",
            },
            {
              name: "浙江",
              value: "2",
            },
            {
              name: "甘肃",
              value: "1",
            },
            {
              name: "辽宁",
              value: "1",
            },
            {
              name: "陕西",
              value: "1",
            },
            {
              name: "西藏",
              value: "1",
            },
            {
              name: "河北",
              value: "1",
            },
            {
              name: "重庆",
              value: "1",
            },
            {
              name: "澳门",
              value: "1",
            },
            {
              name: "广东",
              value: "1",
            },
            {
              name: "内蒙古",
              value: "1",
            },
            {
              name: "广西",
              value: "1",
            },
            {
              name: "新疆",
              value: "1",
            },
            {
              name: "青海",
              value: "1",
            },
            {
              name: "贵州",
              value: "1",
            },
          ],
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
         {name:"皖南古村落",value:2},]
      }]
   }
    const chinaScenic:province[] = [
         {"name":'北京市',
         "center":[116.388,39.9075],
            "attractions":[{
               "name":"长城",
               "coordinate":[117.23333,40.683333],
               "statistic":[918422, 814521, 705789, 781257, 810571, 887512, 904871,
                   987518, 971250,900248, 1004751, 902098,],
               "content":"这是长城的内容"
            },{
               "name":"周口店北京猿人遗址",
               "coordinate":[115.85000,39.68333],
               "statistic":[105410, 98541, 94578, 102365, 100548, 98574, 124580, 134269, 
                  102456,94785, 103562, 98750,],
               "content":"这是周口店北京猿人遗址的内容"
            }]
         },
         {"name":'浙江省',
         "center":[120.15, 29.28],
            "attractions":[{
               "name":"中国大运河",
               "coordinate":[120.214791,30.491037],
               "statistic":[728422, 731521, 835789, 948257, 1041571, 1247512, 1366471, 1474518,
                  1381250, 1070248, 1164751, 1042098],
               "content":"这是周中国大运河的内容"
            },{
               "name":"良渚古城遗址",
               "coordinate":[30.40736,120.02889],
               "statistic":[268210, 267542, 271520, 269840, 268740, 272103, 275481, 276521, 278921,
                  270123, 272153, 268401],
               "content":"这是良渚古城遗址的内容"
            },{
               "name":"杭州西湖",
               "coordinate":[30.2469944,120.144167],
               "statistic":[5048962, 5102301, 5091235, 5120325, 5102123, 5125429, 5164582, 5248616,
                  5321485, 5203106, 5269875, 5126329],
               "content":"这是杭州西湖的内容"
            }]
         },
         {"name":'河南省',
         "center":[113.46, 34.25],
         "attractions":[{
            "name":"龙门石窟",
            "coordinate":[112.469722,34.555556],
            "statistic":[498780, 485265, 475960, 495312, 489758, 504895, 545211, 561452, 521051,
               514020, 578450, 502045],
            "content":"这是龙门石窟的内容"
         },{
            "name":"安阳殷墟",
            "coordinate":[114.313889,36.126667],
            "statistic":[1509896, 1498756, 1502148, 1485623, 1498530, 1520421, 1532601, 1554875,
               1562349, 1532012, 1554870, 1520369],
            "content":"这是安阳殷墟的内容"
         },{
            "name":"登封“天地之中”历史建筑群",
            "coordinate":[112.935514,34.435],
            "statistic":[302512, 294587, 301574, 298410, 288412, 298745, 325470, 335612, 355129,
               326548, 346982, 321056],
            "content":"这是登封“天地之中”历史建筑群的内容"
         }]
         },
    ]

    //根据返回的名称获取数据
    function getSpot(){
      if(provinceName.value=="中国"){
         return chinaData;
      }
      else{
         chinaScenic.forEach((element)=>{
            if(element.name==provinceName.value){
               element.attractions.forEach((spot)=>{
                  if(spot.name==spotName.value){
                     return spot;
                  }
               })
            }
         })
      }
    }
    
    return { chinaScenic,chinaData,getSpot}
  })
  