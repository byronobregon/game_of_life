$(document).on('turbolinks:load', function () {
  cells.setup()
})

cells = {
  reset_world: function () {
    $.ajax({
      type: "POST",
      dataType: "script",
      url: '/cells/reset_field'
    })
  },

  start_game: function () {
    $('#play').attr('data-game', 'playing')
  },

  pause_game: function () {
    $('#play').attr('data-game', 'paused')
  },

  save_state: function () {
    alive_cells = []
    $('.alive').each(function () {
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

  apply_step: function () {
    alive_candidates = []
    dead_candidates = []
    $('.alive').each(function () {
      alive_cells = 0
      $.each(cells.surrounding_cells($(this)), function (index, value) {
        cell = $('.' + value)
        if (cell.attr('data-alive') == 'true') {
          alive_cells += 1
        } else {
          dead_candidates.push(cell)
        }
      })

      if (![2, 3].includes(alive_cells)) {
        alive_candidates.push($(this))
      }
    })

    dead_candidates = cells.check_dead_cells(dead_candidates)

    $.each(cells.filter_array(alive_candidates), function (index, cell) {
      cells.update_cell(cell)
    })
    $.each(dead_candidates, function (index, cell) {
      cells.update_cell(cell)
    })
  },

  check_dead_cells: function(dead_candidates) {
    cells_for_update = []
    $.each(cells.filter_array(dead_candidates), function (index, cell) {
      alive_cells = 0
      $.each(cells.surrounding_cells(cell), function (index, value) {
        cell = $('.' + value)
        if (cell.attr('data-alive') == 'true') { alive_cells += 1 }
      })

      if (alive_cells == 3) {
        cells_for_update.push($(this))
      }
    })

    return cells_for_update
  },

  surrounding_cells: function (cell) {
    x = parseInt(cell.attr('data-x'))
    y = parseInt(cell.attr('data-y'))
    cells_around = [
      (x-1)+'-'+y, (x+1)+'-'+y, (x-1)+'-'+(y-1), x+'-'+(y-1), (x+1)+'-'+(y-1),
      (x-1)+'-'+(y+1), x+'-'+(y+1), (x+1)+'-'+(y+1)
    ]

    return cells_around
  },

  update_cell: function (cell) {
    if (cell.attr('data-alive') == 'false') {
      cell.css('background-color', '#FFFFFF')
      cell.attr('data-alive', 'true')
    } else {
      cell.css('background-color', '#383838')
      cell.attr('data-alive', 'false')
    }
    cell.toggleClass('alive')
  },

  filter_array: function (array) {
    new_array = []
    $.each(array, function (index, value) {
      if (!new_array.includes(value)) { new_array.push(value) }
    })

    return new_array
  },

  setup: function () {
    setInterval(function() {
      if ($('#play').attr('data-game') == 'playing') {
        cells.apply_step()
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

    $('#reset').on('click', function () {
      cells.reset_world()
    })
  }
}
