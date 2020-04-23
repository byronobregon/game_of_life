$(document).on('turbolinks:load', function () {
  cells.setup()
})

cells = {
  start_game: function () {
    $('#play').attr('data-game', 'playing')
  },

  pause_game: function () {
    $('#play').attr('data-game', 'paused')
  },

  save_state: function () {
    alive_cells = []
    $('.cell').each(function () {
      if ($(this).attr('data-alive') == 'true') {
        alive_cells.push($(this).attr('data-id'))
      }
    })

    $.ajax({
      type: "POST",
      dataType: "script",
      url: '/cells/save_state',
      data: { cells: alive_cells }
    })
  },

  update_cell: function (cell) {
    if (cell.attr('data-alive') == 'false') {
      cell.css('background-color', '#FFFFFF')
      cell.attr('data-alive', 'true')
    } else {
      cell.css('background-color', '#383838')
      cell.attr('data-alive', 'false')
    }
  },

  setup: function () {
    setInterval(function() {
      if ($('#play').attr('data-game') == 'playing') {
        console.log('hola mundo')
      }
    }, 250)

    $('.cell').on('click', function () {
      cells.update_cell($(this))
    })

    $('#save').on('click', function () {
      cells.save_state()
    })

    $('#pause').on('click', function () {
      cells.pause_game()
    })

    $('#play').on('click', function () {
      cells.start_game()
    })
  }
}
