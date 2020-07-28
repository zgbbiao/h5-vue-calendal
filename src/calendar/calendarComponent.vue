<template>
    <div>
        <div class="calendar-flex">
            <div>
                <calendar
                        :isLowerCase="calendar1.isLowerCase"
                        :range="calendar1.range"
                        :isSelectWeek="calendar1.isSelectWeek"
                        :isSelectMonth="calendar1.isSelectMonth"
                        :multi="calendar1.multi"
                        titleAlign="left"
                        ref="calendar1"
                        :events="calendar1.events"
                        :lunar="calendar1.lunar"
                        :value="calendar1.value"
                        :begin="calendar1.begin"
                        :end="calendar1.end"
                        :weeks="calendar1.weeks"
                        :months="calendar1.months"
                        :minDate="calendar1.minDate"
                        :maxDate="calendar1.maxDate"
                        @select="calendar1.select"
                        @selectMonth="calendar1.selectMonth"
                        @selectYear="calendar1.selectYear"
                        @next="onNext"
                        @prev="onPrev"
                >
                    <template slot="header">
                        <div></div>
                    </template>
                    <template slot="week-header" slot-scope="scope">
                    <tr>
                        <td colspan="7">
                        <div>
                            <!-- <span></span> -->
                            <van-row type="flex" justify="space-between">
                                <van-col span="0"></van-col>
                                <van-col span="24" class="dMonth">
                                    <van-row type="flex" justify="space-between">
                                        <div class="prevMonth" @click="onMyPrev()"></div>
                                        <span  v-if="selectYear" @click.stop="onChangeYear(scope)" class="header-time">{{scope.year}} 年 {{scope.month +1 }} 月</span>
                                        <span  v-if="!selectYear"  class="header-time ">{{scope.year}} 年 {{scope.month +1 }} 月</span>
                                        <div class="nextMonth" @click="onMyNext()"></div>
                                    </van-row>
                                </van-col>
                                <van-col span="0">
                                    <!-- <div class="myceil">
                                        <van-row class="tAlign">
                                            <van-tag  type="danger" class="my-ceil-span"></van-tag> <span style="padding-left: 8px;">已占用</span>
                                        </van-row>
                                        <van-row class="tAlign">
                                            <van-tag color="#FFB025" class="my-ceil-span "></van-tag> <span style="padding-left: 8px;">已预定</span>
                                        </van-row>
                                    </div> -->
                                </van-col>
                            </van-row>
                        </div>
                        </td>
                    </tr>
                    </template>
                    <template slot="day"  slot-scope="scope">
                        <div class="in-block">
                            <i :class="`xiaodianidan ${localformatter(scope)}`"></i>
                            <!-- <div class="advertising"  > -->
                                <!-- <div v-for="(item, key) in list" v-show="!scope.child.disabled" v-if="item.runTime == dateFilters(scope.year +'/'+ (scope.month+1) +'/'+ scope.curday)" :class="{ 'redStatus': item.advOccupy > 0, 'yellowStatus': item.advOccupy <= 0 } "  @click="showPopup(scope)">
                                    <div>广告</div>
                                    <div v-if="item.advOccupy > 0">× {{ item.advOccupy}}</div>
                                    <div v-if="item.advOccupy <= 0">× {{ item.advReserve}}</div>
                                </div> -->
                            <!-- </div> -->
                        </div>
                    </template>
                </calendar>
                <!-- <button @click="changeEvents">异步更新Price</button> -->
                <!--<button @click="calendar1.value=[2018,1,Math.floor(Math.random()*30+1)]">动态设置日期</button>-->
                <!-- <button @click="$refs.calendar1.setToday()">返回今天</button> -->
            </div>
        </div>
    </div>
</template>

<script>

    import calendar from '../vue-calendar-component/index.js'
    import { NavBar, Icon, Tag , Row, Col, Popup, Cell  } from 'vant';
    import dayPopup from "./dayPopup.vue"
    // import { EQadvSchedulinggetScheListOnDay } from "@/api/request.js"
    import moment from 'moment'

    export default {
        components: {
            calendar,
            "van-col": Col,
            "van-row": Row,
            "van-tag": Tag,
            "van-popup": Popup,
            "van-cell": Cell,
            "van-icon": Icon,
            dayPopup
        },
        props: {
            selectYear: {
                default: false
            },
            formatter: {
                type: Function,
                default: () => {}
            },
            minDate: {
                type: [String, Date],
                default: ''
            },
            maxDate: {
                type: [String, Date],
                default: ''
            },
            calendarOptions: {
                type: Object,
                default: () => {}
            }
        },
        data(){
            return {
            }
        },
        computed: {
            calendar1() {
                var slef = this;
                return {
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
                    multi: false,
                    range: true,
                    isSelectWeek: false,
                    isSelectMonth: false,
                    minDate: this.minDate,
                    maxDate: this.maxDate,
                    // begin: ['2020', '07', '15'],
                    select(start, end){
                        slef.$emit("select", {
                            start, end
                        })
                    },
                    selectMonth(month,year){
                        console.log(year,month)
                        slef.$emit("changeMonth", {
                            year,month
                        })
                    },
                    selectYear(year, month, day){
                        slef.$emit("changeYear", {
                            year, month, day
                        })
                    },
                    timestamp:Date.now(),
                    ...this.calendarOptions
                }
            }
        },
        methods:{
            onChangeYear (scope) {
                scope.changeYear(scope)
            },
            dateFilters (date) {
                return moment(new Date(date)).format('YYYY-MM-DD')
            },
            onNext () {
                this.$emit("next", {
                    ...arguments
                })
            },
            onPrev () {
                this.$emit("prev", {
                    ...arguments
                })
            },
            onMyPrev (e) {
                this.$refs.calendar1.onMyPrev(e)
            },
            onMyNext(e) {
                this.$refs.calendar1.onMyNext(e)
            },
            changeEvents(){
                // this.calendar1.events={
                //     // '2017-7-20':'$'+(Math.random()*1000>>0),
                //     // '2017-7-21':'$'+(Math.random()*1000>>0),
                //     // '2017-7-22':'$'+(Math.random()*1000>>0),
                // }
            },
            async getData (data) {
                // let res = await EQadvSchedulinggetScheListOnDay(data)
                // let res = { data: [] }
            },
            localformatter(scope) {
                const dayObj = this.formatter({
                    date: new Date(scope.year+'/'+(scope.month + 1)+'/'+scope.curday)
                }) || {}
                return dayObj.className ? dayObj.className : ''
            }
        }
    }
</script>

<style lang="less">
    /*demo*/
    .calendar-flex{
        box-sizing: border-box;

        display: -webkit-box;
        -webkit-box-pack: start;
        -webkit-box-align: start;

        display: -webkit-flex;
        -webkit-justify-content: space-between;
        -webkit-align-items: top;

        display: flex;
        justify-content: space-between;
        align-items: top;
        flex-flow:row wrap
    }
    .calendar-flex>div{
        /*margin:10px;*/
        /*padding:20px 0;*/
        width:100%;
        min-width:300px;
        /*border: 1px solid #eee;*/
        border-radius: 2px;
        position: relative;
    }
    .calendar-flex>div>span{
        position: absolute;
        left:0px;
        top:0px;
        padding:5px 10px;
        font-family: "PingFang SC","Hiragino Sans GB","STHeiti","Microsoft YaHei","WenQuanYi Micro Hei",sans-serif;
        font-size:10px;
        border-radius:0 0 2px 0;
        background:#ea6151;
        color:#fff;
    }
    .calendar-flex>div>input{
        box-sizing: border-box;
        width:100%;
        margin-top:20px;
        border-radius: 2px;
        border:1px solid #dedede;
        padding:10px;
        font-size: 16px;
        background:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWwpAZm9udC1mYWNlIHsgZm9udC1mYW1pbHk6IGlmb250OyBzcmM6IHVybCgiLy9hdC5hbGljZG4uY29tL3QvZm9udF8xNDQyMzczODk2XzQ3NTQ0NTUuZW90PyNpZWZpeCIpIGZvcm1hdCgiZW1iZWRkZWQtb3BlbnR5cGUiKSwgdXJsKCIvL2F0LmFsaWNkbi5jb20vdC9mb250XzE0NDIzNzM4OTZfNDc1NDQ1NS53b2ZmIikgZm9ybWF0KCJ3b2ZmIiksIHVybCgiLy9hdC5hbGljZG4uY29tL3QvZm9udF8xNDQyMzczODk2XzQ3NTQ0NTUudHRmIikgZm9ybWF0KCJ0cnVldHlwZSIpLCB1cmwoIi8vYXQuYWxpY2RuLmNvbS90L2ZvbnRfMTQ0MjM3Mzg5Nl80NzU0NDU1LnN2ZyNpZm9udCIpIGZvcm1hdCgic3ZnIik7IH0KCl1dPjwvc3R5bGU+PC9kZWZzPjxnIGNsYXNzPSJ0cmFuc2Zvcm0tZ3JvdXAiPjxnIHRyYW5zZm9ybT0ic2NhbGUoMC4wMTU2MjUsIDAuMDE1NjI1KSI+PHBhdGggZD0iTTcxMS4zMDYyIDI5MC42OTcyYzI0LjI4MjEgMCA0NS4zNzY1LTE5LjcwNjkgNDUuMzc2NS00NC4wMzJWNDYuNTYwMjU1OTk5OTk5OTk1YzAtMjQuMzI1MS0yMS4wOTU0LTQ0LjA1MzUtNDUuMzc2NS00NC4wNTM1LTI0LjMwMjYgMC00My45ODggMTkuNzI4NC00My45ODggNDQuMDUzNXYyMDAuMTA0OTZDNjY3LjMxODMgMjcwLjk5MDMgNjg3LjAwMzYgMjkwLjY5NzIgNzExLjMwNjIgMjkwLjY5NzJ6TTYyMy40ODA4IDExMy40MjAzSDQwMC43NjQ5Mjh2NjYuNTEzOTJoMjIyLjcxNTkwNDAwMDAwMDAyVjExMy40MjAyODh6TTg4NC4wNTMgMTEzLjQyMDNoLTgyLjc3NDAxNnY2Ni4xNDUyOGg4NS45NDAyMjRjMjUuMjc4NSAwIDQ2LjYxMTUgMjEuMzc2IDQ2LjYxMTUgNDYuNjc3djE1My45Mjc2OEg5MC40Mzg2NTYwMDAwMDAwMXYtMTUzLjkyNzY4YzAtMjUuMyAyMS4zMzMtNDYuNjc3IDQ2LjYxMTUtNDYuNjc3aDg2LjUwMzQyNFYxMTMuNDIwMjg4aC04Mi42NDI5NDRjLTY0LjA4NiAwLTExNi41MDc2IDUyLjUwODctMTE2LjUwNzYgMTE2LjcwMzJ2Njc2LjgwMTUzNTk5OTk5OTljMCA2NC4xNzQxIDUwLjQ5MTQgMTE2LjY4MDcgMTE0LjU3NzQgMTE2LjY4MDdIODg0LjA1Mjk5MmM2NC4wNjI1IDAgMTE2LjUwNjYtNTIuNTA2NiAxMTYuNTA2Ni0xMTYuNjgwN1YyMzAuMTIzNTE5OTk5OTk5OThDMTAwMC41NTk2IDE2NS45MjkgOTQ4LjExNDQgMTEzLjQyMDMgODg0LjA1MyAxMTMuNDIwM3pNOTMzLjgyOTYgOTEwLjM1MTRjMCAyNS4zLTIxLjMzMyA0Ni42NzYtNDYuNjExNSA0Ni42NzZIMTM3LjA1MDExMTk5OTk5OTk4Yy0yNS4yNzg1IDAtNDYuNjExNS0yMS4zNzYtNDYuNjExNS00Ni42NzZWNDQ2LjQ0NTU2OEg5MzMuODI5NjMyVjkxMC4zNTEzNnpNMjY3LjEwODQgNjQ2LjE4MTljMzYuODc3MyAwIDY2Ljc1MjUtMjkuOTM5NyA2Ni43NTI1LTY2Ljg4MTUgMC0zNi45MjI0LTI5Ljg3NTItNjYuODYxMS02Ni43NTI1LTY2Ljg2MTEtMzYuODU0OCAwLTY2Ljc1MjUgMjkuOTM5Ny02Ni43NTI1IDY2Ljg2MTFDMjAwLjM1NTggNjE2LjI0MjIgMjMwLjI1MjUgNjQ2LjE4MTkgMjY3LjEwODQgNjQ2LjE4MTl6TTUxMS41NDg0IDY0Ni4xODE5YzM2Ljg1NTggMCA2Ni43NTI1LTI5LjkzOTcgNjYuNzUyNS02Ni44ODE1IDAtMzYuOTIyNC0yOS44OTU3LTY2Ljg2MTEtNjYuNzUyNS02Ni44NjExLTM2Ljg3NzMgMC02Ni43NTI1IDI5LjkzOTctNjYuNzUyNSA2Ni44NjExQzQ0NC43OTU5IDYxNi4yNDIyIDQ3NC42NzExIDY0Ni4xODE5IDUxMS41NDg0IDY0Ni4xODE5ek0yNjUuOTE2NCA4OTAuNzA5YzM2Ljg3NzMgMCA2Ni43NTE1LTI5LjkzOTcgNjYuNzUxNS02Ni44NjExIDAtMzYuOTQyOC0yOS44NzQyLTY2Ljg4MjYtNjYuNzUxNS02Ni44ODI2LTM2Ljg1NTggMC02Ni43NTI1IDI5LjkzOTctNjYuNzUyNSA2Ni44ODI2QzE5OS4xNjM5IDg2MC43NjkzIDIyOS4wNTk2IDg5MC43MDkgMjY1LjkxNjQgODkwLjcwOXpNNTExLjU0ODQgODkwLjcwOWMzNi44NTU4IDAgNjYuNzUyNS0yOS45Mzk3IDY2Ljc1MjUtNjYuODYxMSAwLTM2Ljk0MjgtMjkuODk1Ny02Ni44ODI2LTY2Ljc1MjUtNjYuODgyNi0zNi44NzczIDAtNjYuNzUyNSAyOS45Mzk3LTY2Ljc1MjUgNjYuODgyNkM0NDQuNzk1OSA4NjAuNzY5MyA0NzQuNjcxMSA4OTAuNzA5IDUxMS41NDg0IDg5MC43MDl6TTc1NS42NDEzIDY0Ni4xODE5YzM2Ljg1NjggMCA2Ni43NTM1LTI5LjkzOTcgNjYuNzUzNS02Ni44ODE1IDAtMzYuOTIyNC0yOS44OTY3LTY2Ljg2MTEtNjYuNzUzNS02Ni44NjExLTM2Ljg3NzMgMC02Ni43NTI1IDI5LjkzOTctNjYuNzUyNSA2Ni44NjExQzY4OC44ODk5IDYxNi4yNDIyIDcxOC43NjQgNjQ2LjE4MTkgNzU1LjY0MTMgNjQ2LjE4MTl6TTMxMS43MDM2IDI5MC42OTcyYzI0LjI4MTEgMCA0NS4zNzY1LTE5LjcwNjkgNDUuMzc2NS00NC4wMzJWNDYuNTYwMjU1OTk5OTk5OTk1YzAtMjQuMzI1MS0yMS4wOTQ0LTQ0LjA1MzUtNDUuMzc2NS00NC4wNTM1LTI0LjMwMTYgMC00My45ODkgMTkuNzI4NC00My45ODkgNDQuMDUzNXYyMDAuMTA0OTZDMjY3LjcxNDYgMjcwLjk5MDMgMjg3LjQwMiAyOTAuNjk3MiAzMTEuNzAzNiAyOTAuNjk3MnoiIGZpbGw9IiM1ZTdhODgiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg==) no-repeat 8px 10px;
        padding-left: 36px;
        color:#666;
    }

    /*transition*/
    .fade-enter-active,
    .fade-leave-active {
        transition: all .5s ease-in-out;
    }
    .fade-enter,.fade-leave-active{
        opacity: 0;
        transform: translateY(-10px);

    }

    /*下拉框*/
    .calendar-dropdown{
        background: #fff;
        position: absolute;
        left:0;
        top:0;
        padding:20px;
        border: 1px solid #eee;
        border-radius: 2px;
    }
    .calendar-dropdown:before {
        position: absolute;
        left:30px;
        top: -10px;
        content: "";
        border:5px solid rgba(0, 0, 0, 0);
        border-bottom-color: #DEDEDE;
    }
    .calendar-dropdown:after {
        position: absolute;
        left:30px;
        top: -9px;
        content: "";
        border:5px solid rgba(0, 0, 0, 0);
        border-bottom-color: #fff;
    }

    /*弹出框*/
    .calendar-dialog{
        position: absolute;
        left:0;
        top:0;
        right:0;
        bottom:0;
    }

    .calendar-dialog-mask{
        background:rgba(255,255,255,.5);
        width:100%;
        height:100%;
    }

    .calendar-dialog-body{
        background: #fff;
        position: absolute;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
        padding:20px;
        border: 1px solid #eee;
        border-radius: 2px;
    }
    .myceil{
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #666666;
        letter-spacing: 0;
        /*line-height: 16px;*/
        text-align: right;
    }
    .my-ceil-span{
        padding: 4px;
        border-radius: 2px;
    }
    .statusText{
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #F64E45;
        letter-spacing: 0;
        line-height: 16px;
    }
    .header-time{
        font-family: PingFangSC-Regular;
        font-size: 17px;
        color: #333333;
        letter-spacing: 0;
        line-height: 56px !important;
    }
    .dMonth{
        text-align: center;
        font-size: 0;
        height: 56px !important;
        span,
        .prevMonth,
        .nextMonth{
            display: inline-block;
            vertical-align: middle;
            height: 56px !important;
        }
        .prevMonth,
        .nextMonth{
            width: 44px;
            height: 56px;
        }
        .prevMonth{
            // background: url('../../../assets/images/icon/date_arrow_left.png') no-repeat;background-position: right 5px center;
            background-repeat: no-repeat;
            background-position: center;
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAG7SURBVGhD7di7TgJBFIDhmeXSae0LGPUJCMbgJQRW2cZHMJba2amxMNqaaEPvM2BYSAxg1ITG1sLeaKuVyu44Zz2FojQ7M2dMmC8hOzMkcP4ECMAcx3GcscbxSqLd7k4P4uxGPps5LZeLz3ishCwg7NzMRm9RRy6n5O1eDKKVIFh+Su5U4OHVqKHhwZyXy5zjWonxgD+GT4iY3+FSidGX0MjhhajX/NIW51zgUWrGAiiGB0YCqIYH2gMohwdaA6iHB9oCbAwPtASMGp5xXl+rLBgbHigH2BweKAXYHh6kDvgPw4NUAc3L65n4I+7KpdXhQarvQtF7fCAvP4dnvE89PEj3Zc5jZ3LKF9whUbho9XZxQyZVQFAt9eXAq8MRnHlHjbC7h1sSSp9CjbA3Lx+iKR9kEo8SgsX7gb90jFujlAKA7QjlAAAR8q0byk+hCTxKUERoCQC2IrQFABsRWgMAdYT2AEAZYSQAUEUYCwAUEUYDwKgI+cw7tWrpBHepGf9jK/AXbwVnvvxt+YpHXwRbx5US4wHgV4QQjyzDNpO1IuMvoe8arasCF2I75+UPK5XiAx47juM4zrhi7BOXxxBkA8axyAAAAABJRU5ErkJggg==");
            background-size: 24px 24px;
            margin-right: 5px;
        }
        .nextMonth{
            // background: url('../../../assets/images/icon/date_arrow_right.png') no-repeat;
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGySURBVGhD7da9SgNBEMDx3bsEH8F7AUGfwMKgCUJMxMZnsBILwVIhla2NmFrwGXJyOYLRoAYba8U+WGtlzGXduUwakZCYmUmR/UG43Uszf+6DU47jOM5c03icWqPRXuz2ksOM17ssFvNveJodSUCt1gx0xr+xyxX7e/cX/EKpsPaS/snMw+NUvKx/ZQ8wPAiSr6QZNR+Wcc+KJMD09TMuh8QiSG4hY4wOo1ZVa72Pp4bYbyeyh3hWEWQBYBYRpAFAOoI8AEhGsAQAiLiO7qtKG9YItgCQRsQ2wvBFsAYA7gj2AMAZIRIAuCLEAsCoCC/r5cubuVfcj43kW2hc9rVqtou5A7t6wlNDQdLtV3A9EdEAENbvju21WMVtyij1YSc5x+1ERANq0e2JVt4pblPp8MqUd7bWf1+VsYg9AyOHL2084qmJiQRwDQ/YAziHB6wBfw1vX6GfRqsSxfCALUBieMASIDU8IA+QHB6QBkgPD8gCZjE8IAkI660j+248w+2AwPCA5lPCqF1cDQgND2gCfLVnh+6ka8HhAdkzEMftpe9+t2K0vvjvh5njOI7jzBmlfgBTkhNklOVh5QAAAABJRU5ErkJggg==");
            background-size: 24px 24px;
            // background-position: 5px center;
            background-repeat: no-repeat;
            background-position: center;
            margin-left: 5px;
        }
    }
    .advertising{
        width: 45px;
        height: 45px;
        border-radius: 4px;
        color: #fff;
        box-sizing: border-box;
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #FFFFFF;
        letter-spacing: 0;
        text-align: center;
        line-height: 18px;

        .yellowStatus {
            padding: 4px;
            background: #FFA725;
            border-radius: 4px;
        }
        .redStatus{
            padding: 4px;
            background: #F64E45;
            border-radius: 4px;
        }
    }
    .in-block{
        display: inline-block;
    }
    .tAlign{
        text-align: right;
        padding-right: 14px;
        height: 20px;
        line-height: normal;
        font-size: 0;
    }
    .tAlign span{
        display: inline-block;
        vertical-align: middle;
        line-height: 20px;
        font-size: 12px;
    }
    .tAlign span.my-ceil-span{
        font-size: 0;
    }
    .myceil{
        padding: 8px 0;
        height: 56px;
    }
    .calendar td.disabled .days{
        color: #CCC;
    }

    // 修改样式---start
    .dMonth{
        // box-shadow:0px -1px 0px 0px rgba(250,250,251,1);
        border-bottom: 1px solid #FAFAFB;
        height: auto !important;
        span,
        .prevMonth,
        .nextMonth{
            display: inline-block;
            vertical-align: middle;
            height: auto !important;
        }
        .prevMonth,
        .nextMonth{
            height: auto;
        }
    }

    
    .header-time{
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(10,23,53,1);
        line-height:22px  !important;
        padding: 5px 0;
    }
    

    .calendar td.week{
        background: #fff;
        font-size:13px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(132,139,154,1);
        line-height:20px;
    }
    .days-tr{
        border: none !important;
    }
    .calendar thead .weeks {
        border-bottom: 1px solid #FAFAFB;
    }
    .calendar thead td{
        height: 34px  !important;
        line-height: 34px  !important;
    }
    .calendar td span{
        max-width: 100% !important;
        height: 28px  !important;
        line-height: 28px  !important;
    }
    .isSelectStart span{
        border-bottom-left-radius: 25px  !important;
        border-top-left-radius: 25px  !important;
    }
    .isSelectEnd span{
        border-bottom-right-radius: 25px  !important;
        border-top-right-radius: 25px  !important;
    }
    .selected span{
        background: #5585F0 !important;
    }
    .xiaodianidan{
        display: inline-block;
        width:6px;
        height:6px;
        background: transparent;
        // background:rgba(87,195,119,1);
        // border:1px solid rgba(255,255,255,1);
        transform: translateY(-7px);
    }
    .in-block{
        line-height: 6px !important;
    }
    .days-tr td{
        padding-bottom: 0 !important;
    }
    // 修改样式---end
</style>
