let prevTitle = document.title

window.addEventListener('blur', () => {
  prevTitle = document.title
  document.title = '¿Ya hiciste todos tus calculos?🤔'
})

window.addEventListener('focus', () => {
  document.title = prevTitle
})
