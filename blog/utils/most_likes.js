const mostLikes = (blogs) => {

    var mostlikes = 0
  
    if (blogs.length === 0) { // miten tarkistan että blogi on tyhjä?
      mostlikes = -1
    } else {
  
      blogs.forEach(function (item) {

        if (item.likes >= mostlikes) {
            mostlikes = item.likes
        }
  
        result = result + item.likes
  
      });
  
  
      // result = blogs[0].likes
    }
  
    return result
  
  }
  
  module.exports = {
    mostLikes
  }