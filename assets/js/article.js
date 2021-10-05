var myModal = document.getElementById('myModal')

myModal.addEventListener('show.bs.modal', function (event) {
  if (!data) {
    return event.preventDefault() // stops modal from being shown
  }
})

$('#myTab a').on('shown.bs.tab', function () {
    // do something...
  })