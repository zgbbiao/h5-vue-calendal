
```
<calendarComponent :formatter="formatter"
        ref="calendarComponent"
        v-model="visibleCalendar"
        v-if="visibleCalendar"
          :minDate="minDate"
          :maxDate="maxDate"
          :calendarOptions="calendarOptions"
          @changeMonth="changeMonth"
       @select="onSelectDate"
       @confirm="onConfirm">
        <template #top>
        </template>
       </calendarComponent>
		
		
		formatter(day) {
      // console.log('formatter', day, day.date)
      const month = day.date.getMonth() + 1;
      const date = day.date.getDate();
      if(this.queryDate.taskType === 0) {
          this.dateListTodoData.map(item => {
            if(moment(day.date).format('YYYY-MM-DD')== item) {
                day.className = 'xiaoyuandian-yellow'
            }
          })
        }else if(this.queryDate.taskType === 1){
          this.dateListToReadData.map(item => {
            if(moment(day.date).format('YYYY-MM-DD') == item) {
                day.className = 'xiaoyuandian-yellow'
            }
          })
        }
      return day;
    },
	
	
      minDate: moment(new Date(year, 1, 1)).format('YYYY/MM/DD'),
      maxDate: moment(new Date(year, 12, 31)).format('YYYY/MM/DD'),
	  this.defaultDate = [new Date(), new Date()]
	  ,
    calendarOptions() {
      return {
        multi: false,
        range: true,
        isSelectWeek: false,
        isSelectMonth: false,
        value: this.filterDateVlues(this.defaultDate)
      }
    }
	
	
    filterDateVlues(arr){
      const arr2 = []
      arr.forEach(item => {
        arr2.push([moment(item).format('YYYY')-0, moment(item).format('MM')-0, moment(item).format('DD')-0])
      })
      return arr2
    }
	
    changeMonth({ year, month }) {
      this.queryDate.month = month
      this.queryDate.year = year
      this.getDate()
    },
	
    onSelectDate(date) {
      const [start, end] = date;
      if(this.queryDate.month !== start.getMonth() + 1) {
        this.queryDate.month = start.getMonth() + 1
        this.queryDate.year = start.getFullYear()
        this.getDate()
      }
      console.log('onSelectDate', date, this.queryDate)
    },
	
	
    onConfirm(date) {
      const [start, end] = date;
      this.defaultDate=[]
      // this.visibleCalendar = false;
      let s = Format.call(start, 'yyyy/MM/dd')
      let e = Format.call(end, 'yyyy/MM/dd')
      this.defaultDate=[s,e]
      console.log(this.defaultDate)
      if(s == e) {
        this.date = [this.replaceDate(s)]
      }else {
        this.date = [this.replaceDate(s), this.replaceDate(e)]
      }
      // this.date = `${this.formatDate(start)} - ${this.formatDate(end)}`;
      this.query.dates = this.date.join(',')
      this.queryList()
      this.visibleCalendar = false
      console.log(date, this.date)
    },
```