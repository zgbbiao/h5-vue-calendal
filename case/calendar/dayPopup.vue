<template>
    <div class="daypopup dayRList">
        <div class="daypopup-header">
            <div>
                <ul class="b_flex b_space-between">
                    <li class="b_flex-3">

                    </li>
                    <li class="b_flex-14">
                        {{ this.dayPopupTitle.split("-").join("月") + '日' }}
                    </li>
                    <li class="b_flex-3">
                        <div @click="handleHideClose">
                            <van-icon name="navclose" />
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="content"  v-if="data.length!=0">
            <ul>

                <li class="tFSet" v-if="statusFiles(item.advStatus, item.isShield) == 'a'" v-for="(item, key) in data" @click="onToDetails(item, isArrowRight)" :key="key">
                    <ul class="b_flex b_space-between clearfix">
                        <li :class="{ 'b_flex-22': isArrowRight, 'b_flex-24': !isArrowRight }">
                            <div class="tranx--15">
                                <van-tag  type="danger" class="my-ceil-span statusText" v-if="statusFilter(item.advStatus, item.isShield) == '未发布'"></van-tag>
                                <van-tag  type="danger" class="my-ceil-span statusText" v-if="statusFilter(item.advStatus, item.isShield) == '已发布'"></van-tag>
                                <van-tag  type="warning" color="#FFA725"  class="my-ceil-span statusText" v-if="statusFilter(item.advStatus, item.isShield) == '已预定'"></van-tag>
                                <van-tag  type="danger" color="#999" class="my-ceil-span statusText" v-if="statusFilter(item.advStatus, item.isShield) == '已下架'"></van-tag>
                                <span class="pl-7" :class="{
                                    'statusDanger2': statusFilter(item.advStatus, item.isShield) == '未发布',
                                    'statusDanger': statusFilter(item.advStatus, item.isShield) == '已发布',
                                    'statusWarning': statusFilter(item.advStatus, item.isShield) == '已预定',
                                    'statusHui': statusFilter(item.advStatus, item.isShield) == '已下架',

                                }">{{ statusFilter(item.advStatus, item.isShield) }}</span>
                                <span class="pl-7"></span> <span class="quanzhong-tag" v-if="isArrowRight">权重 {{ item.runWeight }}</span>
                            </div>
                            <p class="line-limit-length title" v-if="isArrowRight">{{ item.advTitle  || "未填写广告标题" }}</p>
                            <p class="time">  <span v-if="!isArrowRight">投放时间：</span>  {{ item.startTime | dateFilters }} - {{ item.endTime | dateFilters }}</p>
                            <p class="client" v-if="isArrowRight">客户：{{ item.customerName || "未填写客户"}}</p>
                            <p class="owner">创建人：{{ item.creator || "未填写创建人"}}</p>
                        </li>
                        <li class="b_flex-2"  v-if="isArrowRight" >
                            <div class="alignItemCenter" :style="setArrowStyle()">
                                <div class="calendar-popyp-await-right">
                                    <van-icon name="arrow" />
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
                <li class="tFSet" v-if="statusFiles(item.advStatus, item.isShield) == 'b'" :key="key" v-for="(item, key) in data" @click="onToDetails(item, isArrowRight)">
                    <ul class="b_flex b_space-between">
                        <li :class="{ 'b_flex-22': isArrowRight, 'b_flex-24': !isArrowRight }">
                            <div class="tranx--15">
                                <van-tag  type="danger" class="my-ceil-span statusText" v-if="statusFilter(item.advStatus, item.isShield) == '未发布'"></van-tag>
                                <van-tag  type="danger" class="my-ceil-span statusText" v-if="statusFilter(item.advStatus, item.isShield) == '已发布'"></van-tag>
                                <van-tag  type="warning" color="#FFA725"  class="my-ceil-span statusText" v-if="statusFilter(item.advStatus, item.isShield) == '已预定'"></van-tag>
                                <van-tag  type="danger" color="#999" class="my-ceil-span statusText" v-if="statusFilter(item.advStatus, item.isShield) == '已下架'"></van-tag>
                                <span class="pl-7" :class="{
                                    'statusDanger2': statusFilter(item.advStatus, item.isShield) == '未发布',
                                    'statusDanger': statusFilter(item.advStatus, item.isShield) == '已发布',
                                    'statusWarning': statusFilter(item.advStatus, item.isShield) == '已预定',
                                    'statusHui': statusFilter(item.advStatus, item.isShield) == '已下架',

                                }">{{ statusFilter(item.advStatus, item.isShield) }} </span>
                                <span class="pl-7"></span> <span class="quanzhong-tag" v-if="isArrowRight">权重 {{ item.runWeight }}</span>
                            </div>
                            <p class="line-limit-length title" v-if="isArrowRight">{{ item.advTitle  || "未填写广告标题" }}</p>
                            <p class="time">  <span v-if="!isArrowRight">投放时间：</span>  {{ item.startTime | dateFilters }} - {{ item.endTime | dateFilters }}</p>
                            <p class="client" v-if="isArrowRight">客户：{{ item.customerName || "未填写客户"}}</p>
                            <p class="owner">创建人：{{ item.creator || "未填写创建人"}}</p>
                        </li>
                        <li class="b_flex-2"  v-if="isArrowRight" :style="setArrowStyle()">
                            <div class="alignItemCenter" >
                                <div >
                                    <van-icon name="arrow" />
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
                <li class="tFSet" v-if="statusFiles(item.advStatus, item.isShield) == 'c'" :key="key" v-for="(item, key) in data" @click="onToDetails(item, isArrowRight)">
                    <ul class="b_flex b_space-between">
                        <li :class="{ 'b_flex-22': isArrowRight, 'b_flex-24': !isArrowRight }">
                            <div class="tranx--15">
                                <van-tag  type="danger" class="my-ceil-span statusText" v-if="statusFilter(item.advStatus, item.isShield) == '未发布'"></van-tag>
                                <van-tag  type="danger" class="my-ceil-span statusText" v-if="statusFilter(item.advStatus, item.isShield) == '已发布'"></van-tag>
                                <van-tag  type="warning" color="#FFA725"  class="my-ceil-span statusText" v-if="statusFilter(item.advStatus, item.isShield) == '已预定'"></van-tag>
                                <van-tag  type="danger" color="#999" class="my-ceil-span statusText" v-if="statusFilter(item.advStatus, item.isShield) == '已下架'"></van-tag>
                                <span class="pl-7" :class="{
                                    'statusDanger2': statusFilter(item.advStatus, item.isShield) == '未发布',
                                    'statusDanger': statusFilter(item.advStatus, item.isShield) == '已发布',
                                    'statusWarning': statusFilter(item.advStatus, item.isShield) == '已预定',
                                    'statusHui': statusFilter(item.advStatus, item.isShield) == '已下架',

                                }">{{ statusFilter(item.advStatus, item.isShield) }}</span>
                                <span class="pl-7"></span> <span class="quanzhong-tag" v-if="isArrowRight">权重 {{ item.runWeight }}</span>
                            </div>
                            <p class="line-limit-length title" v-if="isArrowRight">{{ item.advTitle  || "未填写广告标题" }}</p>
                            <p class="time">   <span v-if="!isArrowRight">投放时间：</span>  {{ item.startTime | dateFilters }} - {{ item.endTime | dateFilters }}</p>
                            <p class="client" v-if="isArrowRight">客户：{{ item.customerName || "未填写客户"}}</p>
                            <p class="owner">创建人：{{ item.creator || "未填写创建人"}}</p>
                        </li>
                        <li class="b_flex-2"  v-if="isArrowRight" :style="setArrowStyle()">
                            <div class="alignItemCenter" >
                                <div >
                                    <van-icon name="arrow" />
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
                <li class="tFSet" v-if="statusFiles(item.advStatus, item.isShield) == 'd'" :key="key" v-for="(item, key) in data" @click="onToDetails(item, isArrowRight)">
                    <ul class="b_flex b_space-between">
                        <li :class="{ 'b_flex-22': isArrowRight, 'b_flex-24': !isArrowRight }">
                            <div class="tranx--15">
                                <van-tag  type="danger" class="my-ceil-span statusText" v-if="statusFilter(item.advStatus, item.isShield) == '未发布'"></van-tag>
                                <van-tag  type="danger" class="my-ceil-span statusText" v-if="statusFilter(item.advStatus, item.isShield) == '已发布'"></van-tag>
                                <van-tag  type="warning" color="#FFA725"  class="my-ceil-span statusText" v-if="statusFilter(item.advStatus, item.isShield) == '已预定'"></van-tag>
                                <van-tag  type="danger" color="#999" class="my-ceil-span statusText" v-if="statusFilter(item.advStatus, item.isShield) == '已下架'"></van-tag>
                                <span class="pl-7" :class="{
                                    'statusDanger2': statusFilter(item.advStatus, item.isShield) == '未发布',
                                    'statusDanger': statusFilter(item.advStatus, item.isShield) == '已发布',
                                    'statusWarning': statusFilter(item.advStatus, item.isShield) == '已预定',
                                    'statusHui': statusFilter(item.advStatus, item.isShield) == '已下架',

                                }">{{ statusFilter(item.advStatus, item.isShield) }}</span>
                                <span class="pl-7"></span> <span class="quanzhong-tag" v-if="isArrowRight">权重 {{ item.runWeight }}</span>
                            </div>
                            <p class="line-limit-length title" v-if="isArrowRight">{{ item.advTitle  || "未填写广告标题" }}</p>
                            <p class="time"> <span v-if="!isArrowRight">投放时间：</span>  {{ item.startTime | dateFilters }} - {{ item.endTime | dateFilters }}</p>
                            <p class="client" v-if="isArrowRight">客户：{{ item.customerName || "未填写客户"}}</p>
                            <p class="owner">创建人：{{ item.creator || "未填写创建人"}}</p>
                        </li>
                        <li class="b_flex-2"  v-if="isArrowRight" :style="setArrowStyle()">
                            <div class="alignItemCenter" >
                                <div >
                                    <van-icon name="arrow" />
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div v-if="noListShow && data.length==0"
             class="mt-85">
            <!-- <no-list></no-list> -->
        </div>
    </div>
</template>
<script>
    import { NavBar, Icon, Tag , Row, Col, Popup, Cell  } from 'vant';
    import moment from 'moment'
    // import noList from '@/components/common/noList.vue'
    import {mapState} from 'vuex';

    export default {
        name: "dayPopup",
        components: {
            "van-col": Col,
            "van-row": Row,
            "van-tag": Tag,
            "van-popup": Popup,
            "van-cell": Cell,
            "van-icon": Icon,
            // noList
        },
        props: {
            data: {
                default: () => {
                    return []
                }
            },
            dayPopupTitle: {
                default: ""
            },
            isArrowRight: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                noListShow: false,
                isIos8X: this.btools.ver && this.btools.ver[1].replace(/_/g,".").indexOf("8.") != -1
            }
        },
        created() {
        },
        filters: {
            dateFilters (val) {
                // console.log(val);
                // return  moment(new Date(val)).format('MM-DD').split("-").join("月") + "日"
                val = val.replace(/-/ig, '/')
                var ymd = new Date(val)
                console.log(val)
                console.log(ymd)
                var y = ymd.getFullYear()
                var m = ymd.getMonth()  +1
                var d = ymd.getDate()
                var h = ymd.getHours()
                var minu = ymd.getMinutes()
                var s = ymd.getSeconds()

                var tag = "-"
                var tag2 = ":"
                function f(v) {
                    return v >= 10 ? v : '0' + v
                }
                console.log(m,  d, h ,minu)
                // return f(m) + '月' + tag + f(d) + '日'
                return f(m) + '月' + f(d) + '日'
            }
        },
        methods: {
            setArrowStyle() {
                if (!this.isIos8X) return '';
                if (this.isArrowRight) {
                    return "padding-top: 40px;"
                }
                return ''
            },
            onToDetails({ uid }, isRoute) {
                if (!isRoute) {
                    return false
                }
                this.$router.push({ name: 'listDetails', params: { uid: uid } })
            },
            statusFilter(val, isShield) {
                var text = ""
                if (isShield == 1) {
                    val = 5
                }
                if (val == 1 ) {
                    text = '已预定'
                }
                else if (val == 3 || val == 4 || val == 5 || val == 6) {
                    text = '已发布'
                }
                else if (val == 7) {
                    text = '已下架'
                }
                else if (val == 2 || val == '0') {
                    text = '未发布'
                }
                return text
            },
            statusFiles (status, isShield) {
                // a已发布：3=投放中，4=不在投放时间段，6=未上架
                // b未发布：0=草稿非预定，2=审核中
                // c与预定：1=草稿预定
                // d已下架：7=已下架
                if (isShield == 1) {
                    status = 5
                }
                var text = 'a'
                if (status == '0') {
                    text = 'b';
                } else if (status == '1') {
                    text = 'c';
                }
                else if (status == '2') {
                    text = 'b';
                }
                else if (status == '3') {
                    text = 'a';
                }
                else if (status == '4') {
                    text = 'a';
                }
                else if (status == '5') {
                    text = 'a';
                }
                else if (status == '6') {
                    text = 'a';
                }
                else if (status == '7') {
                    text = 'd';
                }
                // switch (status) {
                //     case 0:
                //         text = 'b';
                //         break;
                //     case 1:
                //         text = 'c';
                //         break;
                //     case 2:
                //         text = 'b';
                //         break;
                //     case 3:
                //         text = 'a';
                //         break;
                //     case 4:
                //         text = 'a';
                //         break;
                //     case 5:
                //         text = 'a';
                //         break;
                //     case 6:
                //         text = 'a';
                //         break;
                //     case 7:
                //         text = 'd';
                //         break;
                // }
                return text
            },
            handleHideClose () {
                this.$emit("close", {

                })
            }
        },
        computed: {
            ...mapState({
                user: state => state.user
            }),
            isC () {
                // return this.user.roles[0].attach  == 'adv_sales'
                // return this.user.roles[0].attach  == 'adv_admin'
                // return this.user.roles[0].attach  == 'adv_sales'
                let arr = this.user.roles.map(v => v.attach);
                if (arr.indexOf("adv_sales") != -1) return true;
                else return false;
            }
        }
    }
</script>
<style lang="less" scoped>
    .daypopup{
        background: #FFFFFF;
        border-radius: 5px;
        width: 310px;
        height: 480.5px;
        overflow: hidden;
        position: relative;
        box-sizing: border-box;
        .daypopup-header{
            font-family: PingFangSC-Semibold;
            font-size: 17px;
            color: #333333;
            letter-spacing: 0;
            line-height: 16px;
            height: 44.5px;
            width: 100%;
            background: #fff;
            line-height: 44.5px;
            position: absolute;
            z-index: 2;
            top: 0;
            box-sizing: border-box;
            &::after{
                position: absolute;
                content: '';
                right: 0;
                bottom: 0;
                height: 2px;
                width: 100%;
                background: #EEE;
                transform: translate(0,-0.5px) scaleY(0.5);
            }
        }
        .content{
            position: absolute;
            padding: 0px 15px 0px 30px;
            padding-top: 46.5px;
            text-align: left;
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            overflow-y: auto;
            .alignItemCenter{
                margin-right: -4px;
            }
            .van-icon-arrow:before{
                content: "\F007";
                color: #CCC;
            }
            .tFSet{
                >ul>li{
                }
            }
            li{
                position: relative;
                padding-top: 12px;
                padding-bottom: 12px;
                &.tFSet::after{
                    position: absolute;
                    content: '';
                    right: -15px;
                    bottom: 0;
                    height: 2px;
                    width: 295px;
                    background: #EEE;
                    transform: translate(0,-0.5px) scaleY(0.5);
                }
                &:last-child{
                    padding-bottom: 15px;
                    &::after{
                        display: none;
                    }
                }
            }
            .title{
                font-family: PingFangSC-Regular;
                font-size: 16px;
                color: #333333;
                letter-spacing: 0;
                line-height: 26px;
                padding-top: 5px;
                max-width: 200px;
                overflow: hidden;
                white-space:nowrap;
                text-overflow:ellipsis;
            }
            .time, .owner, .client{
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #666666;
                letter-spacing: 0;
                padding-top: 3px;
                line-height: 18px;
                max-width: 220px;
                overflow: hidden;
                white-space:nowrap;
                text-overflow:ellipsis;
            }
            .time{
                padding-top: 2px;
            }
        }
    }
    .dayRList .my-ceil-span{
        padding: 4px;
    }
    .tFSet{
        font-size: 0;
        span{
            display: inline-block;
            vertical-align: middle;
        }
        .statusDanger{
            font-size: 16px;
            transform: translateY(0px);
        }
    }
</style>