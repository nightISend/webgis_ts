import { defineStore } from 'pinia'



export const useSenceStore = defineStore('ScenicStore', () => {
    const chinaScenic = [
        {"name":'北京市',
         "attractions":[{
            "name":"长城",
            "coordinate":[117.23333,40.683333]
         },{
            "name":"周口店北京猿人遗址",
            "coordinate":[115.85000,39.68333]
         }]
        },
        {"name":'浙江省',
         "attractions":[{
            "name":"中国大运河",
            "coordinate":[120.214791,30.491037]
         },{
            "name":"良渚古城遗址",
            "coordinate":[30.40736,120.02889]
         },{
            "name":"杭州西湖",
            "coordinate":[30.2469944,120.144167]
         }]
        },
        {"name":'河南省',
        "attractions":[{
           "name":"龙门石窟",
           "coordinate":[112.469722,34.555556]
        },{
           "name":"安阳殷墟",
           "coordinate":[114.313889,36.126667]
        },{
           "name":"登封“天地之中”历史建筑群",
           "coordinate":[112.935514,34.435]
        }]
        },
    ]
    return { chinaScenic }
  })
  