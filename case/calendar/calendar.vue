<template>
    <div class="calendar">
        <div class="dSlide">
            <calendar-component @select="onSelect" @next="onNext" @prev="onPrev" :selectYear="true" @changeYear="onChangeYear"></calendar-component>
        </div>
    </div>
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
    data() {
    return {
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
        onSelect (...args) {
            this.$emit('select', ...arguments)
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
</style>