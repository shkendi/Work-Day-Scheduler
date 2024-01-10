//  Function to create time blocks
$(document).ready(function () {
  function createTimeBlocks() {
    var currentDay = dayjs().format('dddd, MMMM D YYYY')
    $('#currentDay').text(currentDay)

    var currentHour = dayjs().hour()

    // set up business hours
    var businessHours = 9

    // Set up a variable for endBusinessHours
    var endBusinessHours = 17

    $('.container').empty()

    for (var hour = 9; hour <= endBusinessHours; hour++) {
      var timeBlock = $('<div>').addClass('row time-block')
      var hourDiv = $('<div>').addClass('col-md-1 hour').text(hour)
      var eventInput = $('<textarea>').addClass(
        'col-md-10 description event-input'
      )
      var saveBtn = $('<button>')
        .addClass('col-md-1 saveBtn')
        .html('<i class="far fa-save"></i>')

      // Checking if the hour is past, present, or future and color code acordingly
      if (hour < currentHour) {
        timeBlock.addClass('past')
      } else if (hour === currentHour) {
        timeBlock.addClass('present')
      } else if (hour > currentHour) {
        timeBlock.addClass('future')
      }
      timeBlock.append(hourDiv, eventInput, saveBtn)
      $('.container').append(timeBlock)
    }
  }

  // Create time blocks on page load
  createTimeBlocks()

  function updateCurrentHour() {
    var currentHour = dayjs().format('H')
    // var currentHour = dayjs().hour('H')
    $('.time-block').each(function () {
      var blockHour = parseInt(
        $(this)
          .find('.hour')
          .text()
          .replace(/[⌃\d.]/g, '')
      )
    })
  }
  setInterval(updateCurrentHour(), 60000)
  // updateCurrentHour()

  // Save button click event to store event in local storage
  $('.time-block').on('click', function () {
    var eventText = $(this).children('.event-input').val()
    var hourIndex = $(this).children('.hour').text()
    console.log($(this).children('.event-input').val())

    localStorage.setItem(hourIndex, eventText)
  })

  // Load events from local storage on page load
  function loadEvents() {
    $('.hour').each(function () {
      var hourIndex = $(this).text()
      var storedEvent = localStorage.getItem(hourIndex)

      if (storedEvent) {
        $(this).siblings('.event-input').text(storedEvent)
      }
    })
  }

  loadEvents()
})
