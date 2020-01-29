const convertDate = (date) => {
  let timeSince = (new Date()).getTime() - date;
  
  if(timeSince % 31556952000 > 0){
    if(timeSince % 31556952000 > 0 === 1){
      return Math.floor(timeSince / 31556952000) + ' year';
    } else{
      return Math.floor(timeSince / 31556952000) + ' years';
    }
  } else if(timeSince % 2592000000	 > 0){
    if(timeSince % 2592000000	 > 0 === 1){
      return Math.floor(timeSince / 2592000000) + ' a month';
    } else{
      return Math.floor(timeSince / 2592000000) + ' months';
    }
  } else if(timeSince % 86400000 > 0){
    if(timeSince % 86400000 > 0 === 1){
      return Math.floor(timeSince / 86400000) + ' day';
    } else{
      return Math.floor(timeSince / 86400000) + ' days';
    }
  } else if(timeSince % 3600000 > 0){
    if(timeSince % 3600000 > 0 === 1){
      return Math.floor(timeSince / 3600000) + ' an hour';
    } else{
      return Math.floor(timeSince / 3600000) + ' hours';
    }
  } else{
    if(timeSince % 1000 > 0 === 1){
      return Math.floor(timeSince / 1000) + ' a second';
    } else{
      return Math.floor(timeSince / 1000) + ' seconds';
    }
  }
  
}

module.exports = { convertDate };