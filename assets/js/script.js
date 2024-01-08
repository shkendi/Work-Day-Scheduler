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

    for (var hour = businessHours; hour <= endBusinessHours; hour++) {
      var $timeBlock = $('<div>').addClass('time-block')
      var $hourDiv = $('<div>')
        .addClass('hour')
        .text(dayjs(hour, 'H').format('hA'))
      var $eventInput = $('<textarea>').addClass('event-input')
      var $saveBtn = $('<button>').addClass('save-btn').text('Save')

      // Checking if the hour is past, present, or future and color code acordingly

      if (hour < currentHour) {
        $timeBlock.addClass('past')
      } else if (hour === currentHour) {
        $timeBlock.addClass('present')
      } else {
        $timeBlock.addClass('future')
      }

      $timeBlock.append($hourDiv, $eventInput, $saveBtn)
      $('.container').append($timeBlock)
    }
  }

  // Create time blocks on page load
  createTimeBlocks()
})
