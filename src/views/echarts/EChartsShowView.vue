<script>
// 导入所有对象，并给这些对象合并在一起，然后起个名字叫 echarts
import * as echarts from 'echarts';

export default {
    data () {
        return {
            myChart: null,
            // 添加默认配置数据
            defaultData: {
                clothing: {
                    title: '服装销量统计',
                    xData: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
                    yData: [5, 20, 36, 10, 10, 20]
                },
                electronics: {
                    title: '电器销量统计',
                    xData: ['冰箱','彩电','洗衣机','空调','VCD','DVD'],
                    yData: [1000, 150, 5888, 3500, 50, 550]
                },
                fruits: {
                    title: '水果销量统计',
                    xData: ['草莓','榴莲','柠檬','橙子','苹果','圣女果'],
                    yData: [100, 80, 200, 500, 99, 666]
                }
            }
        }
    },
    methods: {
        changeType (type, dataset = 'clothing') {
            const data = this.defaultData[dataset];
            this.myChart.setOption({
                title: {
                    text: data.title,
                    left: 'center'
                },
                tooltip: {
                    trigger: 'axis'
                },
                toolbox: {
                    feature: {
                        saveAsImage: {},
                        dataView: {},
                        restore: {},
                        dataZoom: {},
                        magicType: {
                            type: ['line', 'bar', 'stack']
                        }
                    }
                },
                xAxis: {
                    data: data.xData,
                    axisLabel: {
                        rotate: 45
                    }
                },
                yAxis: {
                    name: '销量'
                },
                series: [{
                    name: '销量',
                    type: type,
                    data: data.yData,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }]
            });
        }
    },
    //生命周期函数
    mounted() {
        // 基于准备好的dom，初始化echarts实例
        this.myChart = echarts.init(document.getElementById('main'));
        // 监听窗口大小变化
        window.addEventListener('resize', () => {
            this.myChart.resize();
        });
        this.changeType('pie');
    },
    beforeUnmount() {
        // 组件销毁前移除事件监听
        window.removeEventListener('resize', this.myChart.resize);
        this.myChart.dispose();
    }
}
</script>

<template>
    <div class="chart-container">
        <div class="button-group">
            <el-button @click="changeType('line')" type="primary">折线图</el-button>
            <el-button @click="changeType('bar')" type="success">柱状图</el-button>
            <el-button @click="changeType('pie')" type="warning">饼图</el-button>
            <el-button @click="changeType('scatter')" type="info">散点图</el-button>
        </div>
        <div class="data-group">
            <el-button @click="changeType('line', 'electronics')" type="danger">电器销量</el-button>
            <el-button @click="changeType('pie', 'fruits')" type="primary">水果销量</el-button>
        </div>
        <div id="main"></div>
    </div>
</template>

<style lang="scss" scoped>
.chart-container {
    padding: 20px;
    
    .button-group, .data-group {
        margin-bottom: 20px;
        
        .el-button {
            margin-right: 10px;
            
            &:last-child {
                margin-right: 0;
            }
        }
    }
    
    #main {
        height: 600px;
        background-color: white;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        padding: 20px;
    }
}
</style>