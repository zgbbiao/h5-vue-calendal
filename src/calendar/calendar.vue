<template>
<van-popup
    :value="value"
    @input="$emit('input')"
    round position="top"
    :close-on-click-overlay="false"
    overlay-class="year-popup-calendar"
    style="background: transparent"
    >
    <div class="calendar-tran-bg">
        <slot name="top"></slot>
    </div>
    <div class="calendar year-popup-calendar-calendar">
        <div class="dSlide">
            <calendar-component @changeMonth="changeMonth" :minDate="minDate" :maxDate="maxDate" @select="onSelect" @next="onNext" @prev="onPrev" :calendarOptions="calendarOptions" :selectYear="true" @changeYear="onChangeYear" :formatter="formatter"></calendar-component>
        </div>
        <div class="calendar-footer">
            <van-button square type="info" block @click="handleConfirm" :disabled="!selectDates.length">确定</van-button>
        </div>
    </div>
</van-popup>
</template>
<script >
import {mapState} from 'vuex';
import calendarComponent from './calendarComponent.vue'
import moment from 'moment'

export default {
  name: 'login',
  components: {
      calendarComponent
  },
  props: {
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
            default: () => {
                return {
                    multi: false,
                    range: true,
                    isSelectWeek: false,
                    isSelectMonth: false,
                }
            }
        },
        value: {
            type: Boolean,
            default: false
        }
  },
    data() {
        return {
            selectDates: []
        }
  },
    created() {
        this.initData(new Date())
        this.getData()
    },
    methods: {
        onLeftClick () {
            this.$router.go(-1)
            return false;
        },
        onChangeYear({ year, month, day }) {
            month = month +1
            this.initData(year+'-'+ (f(month)) + '-'+ (f(day)))
            function f(v) {
                return v >= 10 ? v : '0' + v
            }
            this.$emit('changeYear', ...arguments)
            this.getData()
        },
        changeMonth({ year, month }) {
            month = month +1
            function f(v) {
                return v >= 10 ? v : '0' + v
            }
            this.$emit('changeMonth', ...arguments)
            this.getData()
        },
        onNext(obj) {
            console.log(obj);
            if ( obj[0] &&  obj[1] ) {
                obj[0] = obj[0] >= 10 ? obj[0] : '0' + obj[0]
                obj[1] = obj[1] >= 10 ? obj[1] : '0' + obj[1]
                this.initData(obj[1]+'-'+ obj[0])
                this.getData()
            }
            this.$emit('next', ...arguments)
        },
        onPrev(obj) {
            if ( obj[0]  && obj[1] ) {
                obj[0] = obj[0] >= 10 ? obj[0] : '0' + obj[0]
                obj[1] = obj[1] >= 10 ? obj[1] : '0' + obj[1]
                this.initData(obj[1]+'-'+ obj[0])
                this.getData()
            }
            this.$emit('prev', ...arguments)

        },
      initData (date) {
      },
      async getData () {
      },
        onSelect ({ start, end }) {
            console.log(start, end)
            const range = this.calendarOptions.range
            const multi = this.calendarOptions.multi
            const datearr = []
            // 如果不是多选或范围选择。
            if (!(multi || range)) {
                datearr.push(new Date(moment(`${start[0]}/${start[1] + 1}/${start[2]}`).format('YYYY/MM/DD')))
            }
            if (multi) {
                const startarr = []
                start.forEach(item => {
                    startarr.push(new Date(moment(`${item[0]}/${item[1] + 1}/${item[2]}`).format('YYYY/MM/DD')))
                })
                datearr.push(startarr)

            } else if (range) {
                datearr.push(new Date(moment(`${start[0]}/${start[1] + 1}/${start[2]}`).format('YYYY/MM/DD')))
                datearr.push(new Date(moment(`${end[0]}/${end[1] + 1}/${end[2]}`).format('YYYY/MM/DD')))
            }
            this.selectDates = datearr
            this.$emit('select', datearr)
        },
        handleConfirm() {
            const datearr = this.selectDates
            this.$emit('confirm', datearr)
        },
        clearSelectDate() {
            this.selectDates = []
        }
    },
    computed: {
        ...mapState({
        })
    }
}
</script>
<style lang="less">
.dSlide{
    height: 100vh;
    padding-top: 44px;
}
.calendar {
  .van-nav-bar__title {
    width: 80%;
  }
}

.titleClass {
  font-family: PingFangSC-Regular;
  font-size: 13px;
  color: #FFF;
  letter-spacing: 0;
  text-align: center;
  /*line-height: 20px;*/
  /*height: 100%;*/
}

.calendar {
  .van-nav-bar__title {
    white-space: normal;
  }
}
.calendar{
    position: relative !important;
    top: 0 !important;
    height: auto !important;
    z-index: 1 !important;
}
.dSlide{
    height: auto !important;
    padding: 0 !important;
}
.year-popup-calendar{
    background: transparent;
}
.year-popup-calendar-calendar{
    // padding-top: 45px;
    background: rgba(0, 0, 0, .5);
    height: calc(100vh - 45px) !important;
}
.calendar-footer{
    padding: 10px;
    background: #fff;
}
.calendar-tran-bg{
    height: 45px;
    background: transparent;
}
</style>