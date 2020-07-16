/*
 * @Author: your name
 * @Date: 2020-07-15 11:42:48
 * @LastEditTime: 2020-07-15 14:38:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \h52\src\components\vue-calendar-component\util.js
 */ 
import moment from 'moment'
const datyTimes = 86400000; // 一天转换的毫秒数
export const Format = function (fmt) {
  const self = this;
  //author: meizz
  var o = {
    'M+': self.getMonth() + 1, //月份
    'd+': self.getDate(), //日
    'h+': self.getHours(), //小时
    'm+': self.getMinutes(), //分
    's+': self.getSeconds(), //秒
    'q+': Math.floor((self.getMonth() + 3) / 3), //季度
    S: self.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (self.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
  return fmt;
};

//通过周取日期范围   year 年   weeks 周
function weekGetDate(year, weeks) {
  var date = new Date(year, '0', '1');
  let start = '';
  let end = '';
  let _start = '';
  let _end = '';
  let cnt = 0;
  let nextYear = '';
  let nextWeek = '';
  let lastcnt = 0;
  var time = date.getTime(); // 获取当前星期几,0:星期一
  var _week = date.getDay(); //当这一年的1月1日为周日时则本年有54周,否则没有54周,没有则去除第54周的提示
  if (_week !== 0) {
    //一年53周情况
    if (weeks === 54) {
      return '今年没有54周';
    }
    cnt = 0; // 获取距离周末的天数
    if (_week === 0) {
      cnt = 7;
    } else if (_week === 1) {
      cnt = 6;
    } else if (_week === 2) {
      cnt = 5;
    } else if (_week === 3) {
      cnt = 4;
    } else if (_week === 4) {
      cnt = 3;
    } else if (_week === 5) {
      cnt = 2;
    } else if (_week === 6) {
      cnt = 1;
    }
    cnt += 1; //加1表示以星期一为一周的第一天    // 将这个长整形时间加上第N周的时间偏移
    time += cnt * 24 * 3600000; //第2周开始时间
    nextYear = new Date(parseInt(year, 10) + 1, '0', '1');
    nextWeek = nextYear.getDay();
    lastcnt = 0; //获取最后一周开始时间到周末的天数
    if (nextWeek === 0) {
      lastcnt = 6;
    } else if (nextWeek === 1) {
      lastcnt = 0;
    } else if (nextWeek === 2) {
      lastcnt = 1;
    } else if (nextWeek === 3) {
      lastcnt = 2;
    } else if (nextWeek === 4) {
      lastcnt = 3;
    } else if (nextWeek === 5) {
      lastcnt = 4;
    } else if (nextWeek === 6) {
      lastcnt = 5;
    }
    if (weeks === 1) {
      //第1周特殊处理    // 为日期对象 date 重新设置成时间 time
      start = Format.call(date, 'yyyy-MM-dd');
      date.setTime(time - 24 * 3600000);

      return start + '-----' + date;
    } else if (weeks === 53) {
      //第53周特殊处理
      start = time + (weeks - 2) * 7 * 24 * 3600000; //第53周开始时间
      end =
        time +
        (weeks - 2) * 7 * 24 * 3600000 +
        lastcnt * 24 * 3600000 -
        24 * 3600000; //第53周结束时间
      date.setTime(start);
      _start = Format.call(date, 'yyyy-MM-dd');
      date.setTime(end);
      _end = Format.call(date, 'yyyy-MM-dd');
      return _start + '---' + _end;
    } else {
      start = time + (weeks - 2) * 7 * 24 * 3600000; //第n周开始时间
      end = time + (weeks - 1) * 7 * 24 * 3600000 - 24 * 3600000; //第n周结束时间
      date.setTime(start);
      _start = Format.call(date, 'yyyy-MM-dd');
      date.setTime(end);
      _end = Format.call(date, 'yyyy-MM-dd');
      return _start + '---' + _end;
    }
  } else {
    //一年54周情况
    cnt = 0; // 获取距离周末的天数
    if (_week === 0 && weeks === 1) {
      //第一周
      cnt = 0;
    } else if (_week === 0) {
      cnt = 7;
    } else if (_week === 1) {
      cnt = 6;
    } else if (_week === 2) {
      cnt = 5;
    } else if (_week === 3) {
      cnt = 4;
    } else if (_week === 4) {
      cnt = 3;
    } else if (_week === 5) {
      cnt = 2;
    } else if (_week === 6) {
      cnt = 1;
    }
    cnt += 1; //加1表示以星期一为一周的第一天
    // 将这个长整形时间加上第N周的时间偏移
    time += 24 * 3600000; //第2周开始时间
    nextYear = new Date(parseInt(year, 10) + 1, '0', '1');
    nextWeek = nextYear.getDay();
    lastcnt = 0; //获取最后一周开始时间到周末的天数
    if (nextWeek === 0) {
      lastcnt = 6;
    } else if (nextWeek === 1) {
      lastcnt = 0;
    } else if (nextWeek === 2) {
      lastcnt = 1;
    } else if (nextWeek === 3) {
      lastcnt = 2;
    } else if (nextWeek === 4) {
      lastcnt = 3;
    } else if (nextWeek === 5) {
      lastcnt = 4;
    } else if (nextWeek === 6) {
      lastcnt = 5;
    }
    if (weeks === 1) {
      //第1周特殊处理
      start = Format.call(date, 'yyyy-MM-dd');
      date.setTime(time - 24 * 3600000);
      // alert(start +'--'+ date);
      return _start + '---' + date;
    } else if (weeks === 54) {
      //第54周特殊处理
      start = time + (weeks - 2) * 7 * 24 * 3600000; //第54周开始时间
      end =
        time +
        (weeks - 2) * 7 * 24 * 3600000 +
        lastcnt * 24 * 3600000 -
        24 * 3600000; //第53周结束时间
      date.setTime(start);
      _start = Format.call(date, 'yyyy-MM-dd');
      date.setTime(end);
      _end = Format.call(date, 'yyyy-MM-dd');
      return _start + '---' + _end;
    } else {
      start = time + (weeks - 2) * 7 * 24 * 3600000; //第n周开始时间
      end = time + (weeks - 1) * 7 * 24 * 3600000 - 24 * 3600000; //第n周结束时间
      date.setTime(start);
      _start = Format.call(date, 'yyyy-MM-dd');
      date.setTime(end);
      _end = Format.call(date, 'yyyy-MM-dd');
      return _start + '---' + _end;
    }
  }
}

export const getRangDays = function (start, end) {
  const msTimeStart = new Date(start.replace('-', '/')).getTime();
  const msTimeEnd = new Date(end.replace('-', '/')).getTime();
  let arr = [];
  let msTimes = [];
  [1, 2, 3, 4, 5, 6, 7].forEach((item) => {
    arr.push(
      moment(msTimeStart + datyTimes * item - datyTimes).format('YYYY-MM-DD')
    );
    msTimes.push(msTimeStart + datyTimes * item - datyTimes);
  });
  return {
    msTimes,
    strDates: arr,
    msTimeStart,
    msTimeEnd,
    start,
    end,
  };
};
// 获取从当天开始的连续七天时间的开始和结束时间。
export const getWeekDays = function (year, week) {
  const datestr = weekGetDate(year, week);
  return getRangDays(...datestr.split('---'));
};

export const getCurWeekDays = function(dateStr) {
  // 第一步: 获取今天是本周的第几天
const weekOfday = moment(dateStr).format('E');
// 第二步: 获取本周周一的日期
const lastMonday = moment(dateStr).subtract(weekOfday - 1, 'days').format('YYYY-MM-DD');
// 第三步: 获取本周周末的日期
const lastSunday = moment(dateStr).add(7 - weekOfday, 'days').format('YYYY-MM-DD');
  return {
    start: lastMonday,
    end: lastSunday
  }
}

export const setHashSearchParams = (hash, value, key = 'curHeadTab') => {
  let keyword = key;
  const patten = new RegExp(keyword + '=[^\\/ | ^&]+', 'ig');
  // const patten = new RegExp(keyword + '=[^\\/]', 'ig');
  if (!hash) {
    return hash + '#/searchParams=' + keyword + '=' + value;
  } else if (hash.indexOf('searchParams') === -1) {
    // 不存在searchParams， 插入searchParams
    return hash.replace(
      /#\//gi,
      '#/searchParams=' + keyword + '=' + value + '/'
    );
  } else if (
    hash.indexOf('searchParams') !== -1 &&
    hash.indexOf(keyword) === -1
  ) {
    // 存在searchParams， 但不存在[keyword]
    // 如果没有mainTab
    return hash.replace(
      /searchParams=/gi,
      'searchParams=' + keyword + '=' + value + '&'
    );
  }
  return hash.replace(patten, keyword + '=' + value);
};

export const getPerWeekDay = (dateStr) => {
  // datyTimes
  if (!dateStr) {
    return dateStr;
  }
  const d = new Date(dateStr.replace('-', '/')).getTime();
  const times = d - datyTimes * 7;
  return moment(times).format('YYYY-MM-DD');
};

export const getNextWeekDay = (dateStr) => {
  // datyTimes
  if (!dateStr) {
    return dateStr;
  }
  const d = new Date(dateStr.replace('-', '/')).getTime();
  const times = d + datyTimes * 7;
  return moment(times).format('YYYY-MM-DD');
};

export const getPerMonth = (dateStr) => {
  // datyTimes
  if (!dateStr) {
    return dateStr;
  }
  const startDate = moment(dateStr)
    .month(moment(dateStr).month() - 1)
    .startOf('month')
    .format('YYYY-MM-DD');
  const endDate = moment(dateStr)
    .month(moment(dateStr).month() - 1)
    .endOf('month')
    .format('YYYY-MM-DD');
  return {
    startDate,
    endDate,
  };
};

export const getNextMonth = (dateStr) => {
  // datyTimes
  if (!dateStr) {
    return dateStr;
  }
  const startDate = moment(dateStr)
    .month(moment(dateStr).month() + 1)
    .startOf('month')
    .format('YYYY-MM-DD');
  const endDate = moment(dateStr)
    .month(moment(dateStr).month() + 1)
    .endOf('month')
    .format('YYYY-MM-DD');
  return {
    startDate,
    endDate,
  };
};

export const getCurMonth = (dateStr) => {
  // datyTimes
  if (!dateStr) {
    return dateStr;
  }
  const startDate = moment(dateStr)
    .month(moment(dateStr).month())
    .startOf('month')
    .format('YYYY-MM-DD');
  const endDate = moment(dateStr)
    .month(moment(dateStr).month())
    .endOf('month')
    .format('YYYY-MM-DD');
  return {
    startDate,
    endDate,
  };
};

export const getSearchParams = (location, callback) => {
  let hash = location.hash;
  let obj = {};
  // 初始化页面
  // 如果存在hash， 则修改赋值给本地mainTab
  if (hash) {
    // hash = hash + '/searchParams=';
    let hashs = hash.split('/');
    let searchParams = '';
    hashs.forEach((element) => {
      const paramIndex = element.indexOf('searchParams');
      if (paramIndex !== -1) {
        searchParams = element.slice(paramIndex).replace('searchParams=', '');
      }
    });
    // str.replace(/searchParams=[^\/]+/ig, '-----')
    console.log('searchParams', searchParams);
    try {
      obj = parseQueryString('?' + searchParams);
      callback && callback(obj);
      return false;
    } catch {
      callback && callback(obj);
      return false;
    }
  }
  callback && callback(obj);
  return false;
};