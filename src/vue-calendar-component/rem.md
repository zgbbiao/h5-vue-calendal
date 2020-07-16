

## event

1. onSwipeLeft  滑动
滑动需要依赖 添加 <script src='https://cdn.bootcss.com/touchjs/0.2.14/touch.min.js'>

2. onSwipeRight  翻页滑动

滑动需要依赖 添加 <script src='https://cdn.bootcss.com/touchjs/0.2.14/touch.min.js'>

3. selectYear 选择年份回调

4. selectMonth 选择月份回调

5. select 选中日期回调


## attr

1. showPrev
是否展示上页点

2. showNext 是否展示下一页点击

3. months 月份表

4. weeks 星期表

5. end 选择结束时间

6. disabled; 屏蔽的日期

7. zero  // 是否小于10补零

8. begin // 开始选择日期

9. value // 默认日期

10. range // 范围模式

11. multi 多选模式


        // 是否点击选择星期
12. selectWeek: {
            type: Boolean,
            default: false
        },
        // 是否点击选择月份
13. selectMonth: {
            type: Boolean,
            default: false
        }

## slot

1. header 头部内容

2. day  在日期下面填充内容

3. week-header 在周的文字下面新增一行，可以加上  <!-- <tr> <td colspan="7">  </td> </tr> -->

## pops

```
 // 多选模式
        multi: {
            type: Boolean,
            default: false
        },
        // 范围模式
        range:{
            type: Boolean,
            default: false
        },
        // 默认日期
        value: {
            type: Array,
            default: function(){
                return []
            }
        },
        // 开始选择日期
        begin:  {
            type: Array,
            default: function(){
                return []
            }
        },
        // 结束选择日期
        end:  {
            type: Array,
            default: function(){
                return []
            }
        },

        // 是否小于10补零
        zero:{
            type: Boolean,
            default: false
        },
        // 屏蔽的日期
        disabled:{
            type: Array,
            default: function(){
                return []
            }
        },
        // 是否显示农历
        lunar: {
            type: Boolean,
            default: false
        },

        // 自定义星期名称
        weeks: {
            type: Array,
            default:function(){
                return window.navigator.language.toLowerCase() == "zh-cn"?['日', '一', '二', '三', '四', '五', '六']:['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            }
        },
        // 自定义月份
        months:{
            type: Array,
            default:function(){
                return defaultMoths
            }
        },
        isLowerCase: {
            default: function () {
                return false
            }
        },
        // 自定义事件
        events:  {
            type: Object,
            default: function(){
                return {}
            }
        },
        showPrev: {
            default: function () {
                return false
            }
        },
        showNext: {
            default: function () {
                return false
            }
        },
        titleAlign: {
            default: function () {
                return "center"
            }
        },
        onSwipeLeft: {
            type: "Function",
            default: function () {
                return function () {

                }
            }
        },
        onSwipeRight: {
            type: "Function",
            default: function () {
                return function () {

                }
            }
        }
```


使用配置示例

```
// calendar3:{
                //     display:"2018/02/16",
                //     show:false,
                //     zero:true,
                //     value:[2018,2,16], //默认日期
                //     lunar:true, //显示农历
                //     select:(value)=>{
                //         this.calendar3.show=false;
                //         this.calendar3.value=value;
                //         this.calendar3.display=value.join("/");
                //     }
                // },
                // calendar4:{
                //     display:"2018/02/16 ~ 2019/02/16",
                //     show:false,
                //     range:true,
                //     zero:true,
                //     value:[[2018,2,16],[2019,2,16]], //默认日期
                //     lunar:true, //显示农历
                //     select:(begin,end)=>{
                //         console.log(begin,end)
                //         this.calendar4.show=false;
                //         this.calendar4.value=[begin,end];
                //         this.calendar4.display=begin.join("/")+" ~ "+end.join("/");
                //     }
                // },
                // 多选
                // calendar5:{
                //     display:"2017/11/2,2017/12/2",
                //     multi:true,
                //     show:false,
                //     zero:true,
                //     value:[[2017,11,1],[2017,11,2]], //默认日期
                //     disabled:[[2017,12,24],[2017,12,25]], //默认日期
                //     lunar:true, //显示农历
                //     select:(value)=>{
                //
                //         let displayValue=[]
                //         value.forEach(v=>{
                //             displayValue.push(v[0]+"/"+(v[1])+"/"+v[2])
                //         })
                //         console.log(displayValue);
                //         this.calendar5.display=displayValue.join(",");
                //         // this.calendar5.show=false;
                //         this.calendar5.value=value;
                //
                //     }
                // },

                
                calendar1:{
                    value:[], //默认日期
                    // lunar:true, //显示农历
                    // weeks:['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                    // months:['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    events:{
                        // '2018-11-20':'$408',
                        // '2017-7-20':'$408',
                        // '2017-7-21':'$460',
                        // '2017-7-22':'$500',
                    },
                    isLowerCase: true,
                    range: true,
                    selectWeek: true,
                    selectMonth: false,
                    // begin: ['2020', '07', '15'],
                    select(start, end){
                        console.log(start, end)
                        slef.$emit("select", {
                            ...arguments
                        })
                    },
                    selectMonth(month,year){
                        console.log(year,month)
                    },
                    selectYear(year, month, day){
                        slef.$emit("changeYear", {
                            year, month, day
                        })
                    },
                    timestamp:Date.now(),
                }
```
