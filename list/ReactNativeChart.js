

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, ScrollView} from 'react-native';
import Echarts from 'native-echarts';
const option1 = {
    color: ['red', 'green','yellow','#f60'],
    title : {
        text: '我是标题',
        subtext: '我是子标题',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['客装产品','卡项','促销套餐','单次服务']
    },
    series : [
        {
            name: '',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'客装产品'},
                {value:310, name:'卡项'},
                {value:234, name:'促销套餐'},
                {value:135, name:'单次服务'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
}


const data2_1 = ['卡项','单次服务','促销套餐','客装产品']
const data2_2 = ['卡项', '单次服务']
const data2_3 = [
      {
          name:'卡项',
          type:'line',
          stack: '卡项',
          lineStyle: {
            normal: {
              color: 'blue'
            }
          },
          data:[1000, 2000, 8000, 3000,6000, 4000, 1000]
      },
      {
          name:'单次服务',
          type:'line',
          stack: '单次服务',
          data:[8000, 0, 4000, 3000,0, 4000, 1000]
      },
      {
          name:'促销套餐',
          type:'line',
          stack: '促销套餐',
          data:[2000, 2000, 2000, 3000,7000, 1000, 5000]
      },
      {
          name:'客装产品',
          type:'line',
          stack: '客装产品',
          data:[5000, 0, 6000, 3000,0, 4000, 9000]
      }
  ]
const data2_4 = [
        {
            name:'卡项',
            type:'line',
            stack: '卡项',
            lineStyle: {
              normal: {
                color: 'green'
              }
            },
            data:[
             {
               name: 'A',
              value: 500
             },
             {
               name: 'A',
              value: 2000
             },
             {
               name: 'A',
              value: 2000
             },
             {
               name: 'A',
              value: 2000
             },
             {
               name: 'A',
              value: 2000
             },
             {
               name: 'A',
              value: 2000
             },
             {
               name: 'A',
              value: 2000
             }
            ]
        },
        {
          name:'单次服务',
          type:'line',
          stack: '单次服务',
          data:[
            {
               name: 'A',
              value: 1000
             },
             {
               name: 'A',
              value: 1000
             },
             {
               name: 'A',
              value: 2000
             },
             {
               name: 'A',
              value: 2000
             },
             {
               name: 'A',
              value: 2000
             },
             {
               name: 'A',
              value: 2000
             },
             {
               name: 'A',
              value: 2000
             }
          ]
      },
]

const option2 = {
    title: {
        text: ''
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: data2_1
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['12.01','12.02','12.03','12.04','12.05','12.06','12.07']
    },
    yAxis: {
        type: 'value'
    },
    series: data2_3
};

const option3 = {
    title: {
        text: '占比分析',
        subtext: ''
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: []
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
    },
    yAxis: {
        type: 'category',
        data: [{
          value: '小气泡',
          textStyle: {
            fontSize: 10
          }
        },{
          value: '小气泡',
          textStyle: {
            fontSize: 10
          }
        },{
          value: '小气泡小气泡小气泡',
          textStyle: {
            fontSize: 10
          }
        },{
          value: '小气泡小气泡小气泡',
          textStyle: {
            fontSize: 10
          }
        },{
          value: '小气泡',
          textStyle: {
            fontSize: 10
          }
        },{
          value: '小气泡',
          textStyle: {
            fontSize: 10
          }
        }]
    },
    series: [
        {
            name: '2011年',
            type: 'bar',
            label: {
                normal: {
                    show: true,
                    position: 'right',
                    formatter: '{c}%'
                }
            },
            itemStyle: {
              normal: {
                  // 定制显示（按顺序）
                  color: function(params) { 
                      var colorList = ['red','green','#64BD3D','#EE9201','#29AAE3', '#B74AE5','#0AAF9F','#E89589','#16A085','#4A235A','#C39BD3 ','#F9E79F','#BA4A00','#ECF0F1','#616A6B','#EAF2F8','#4A235A','#3498DB' ]; 
                      return colorList[params.dataIndex] 
                  }
              },
            },
            data: [6, 2, 7, 12, 16, 10]
        }
    ]
};




export default class Actionsheet extends Component {

  state = {
    option2: option2
  }

  componentDidMount(){
    setTimeout(() => {
      const {option2} = this.state
      this.setState({
        option2: {
            title: {
                text: ''
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: data2_2
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['12.01','12.02','12.03','12.04','12.05','12.06','12.07']
            },
            yAxis: {
                type: 'value'
            },
            series: data2_4
        }
      })
    }, 3000)
  }

  render() {
    return (
      <ScrollView>
        <Echarts option={option1} height={400} />
        <View style={{height: 100}}></View>
        <Echarts  ref={e => this.chart2 = e} option={this.state.option2} height={300}/>
        <View style={{height: 100}}></View>
        <Echarts option={option3} height={300} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingBottom: 100
  },
  chart: {
    width: 200,
    height: 200,
  },
});
