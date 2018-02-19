// const dummy = (blogs) => {

//   const one = 1

//   return one

// }

// module.exports = {
//   dummy
// }


const totalLikes = (blogs) => {

  var result = 0

  if (blogs.length === 0) { // miten tarkistan että blogi on tyhjä?
    result = 0
  } else {

    blogs.forEach(function (item) {

      result = result + item.likes

    });


    // result = blogs[0].likes
  }

  return result

}

module.exports = {
  totalLikes
}