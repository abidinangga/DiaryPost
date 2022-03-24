function date(data) {
    let newDate = data.toISOString().substring(0, 10);
    return newDate;
  }
  module.exports= {date};