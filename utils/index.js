const formatPhoneInternational = num => {
  let res = num.replace(/\(|\)/g, '').split(' ')

  if (res[0].length < 3) {
    res = ['+0' + res[0][1], ...res.slice(1)]
  }

  return res.join('-')
}

module.exports =  { formatPhoneInternational }
