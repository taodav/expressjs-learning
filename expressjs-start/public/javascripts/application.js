$(document).ready(function(){
  $("form").on("submit", function(event){
    // event.preventDefault()
    var data = $(this).serialize()


    console.log(data)


  })
})


