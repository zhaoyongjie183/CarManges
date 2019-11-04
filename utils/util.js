const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatDate=date=>{
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-') 
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getUrlParam=(name, url)=> {
  var reg = new RegExp('(^|&)' + name + '=(.*)(&[^&=]+=)');
  var regLast = new RegExp('(^|&)' + name + '=(.*)($)');
  var r = url.substr(1).match(reg) || url.substr(1).match(regLast);
  if (r != null) {
    var l = r[2].match(/&[^&=]+=/)
    if (l) {
      return decodeURIComponent(r[2].split(l[0])[0]);
    } else return decodeURIComponent(r[2]);
  }
  return null;
}

module.exports = {
  formatTime: formatTime,
  getUrlParam: getUrlParam,
  formatDate: formatDate
}
