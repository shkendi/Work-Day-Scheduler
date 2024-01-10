//  Function to create time blocks
$(document).ready(function () {
  function createTimeBlocks() {
    var currentDay = dayjs().format('dddd, MMMM D YYYY')
    $('#currentDay').text(currentDay)

    // var currentHour = dayjs().hour()
    var currentHour = 12

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
      var $saveBtn = $('<button>')
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
      timeBlock.append(hourDiv, eventInput, $saveBtn)
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

      // if (blockHour < currentHour) {
      //   $(this).removeClass('present future').addClass('past')
      // } else if (blockHour === currentHour) {
      //   $(this).removeClass('past future').addClass('present')
      // } else {
      //   $(this).removeClass('past present').addClass('future')
      // }
    })
  }
  setInterval(updateCurrentHour(), 60000)
  // updateCurrentHour()

  // Save button click event to store event in local storage
  $('.container').on('click', function () {
    console.log('hit')
    var $eventText = $(this).siblings('.event-input').val()
    var hourIndex = $(this).siblings('.hour').text()
    console.log(hourIndex)

    localStorage.setItem(hourIndex, $eventText)
  })

  // Load events from local storage on page load
  function loadEvents() {
    $('.hour').each(function () {
      var hourIndex = $(this).text()
      var storedEvent = localStorage.getItem(hourIndex)
      if (storedEvent !== null) {
        $(this).siblings('event-input').val(storedEvent)
      }
    })
  }

  loadEvents()
})
