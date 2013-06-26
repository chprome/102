uniqueArray = function(array) {
  var arr = [];
  array.forEach(function(item, index) {
    if(arr.indexOf(array[index]) === -1) {
      arr.push(array[index]);
    }
  });
  return arr; 
};

refreshList = function() {
  $(".wrapper").empty();
  filteredphotographers.forEach(function(photographer) {
    var $html = $.handlebarTemplates.partials.photographer(photographer);
    $(".wrapper").append($html);
  });
};

initMultiselect = function() {
  $('.multiselect').multiselect({
    buttonClass: 'btn',
    buttonContainer: '<div class="btn-group" />',
    buttonWidth: 'auto',
    maxHeight: 300,
    selectAllText: " Tous",
    includeSelectAllOption: true,
    onChange: function(element, checked) {
      applyFilter();
    },
    buttonText: function(options, select) {
      var name = select.attr("i18n");
      if (options.length == 0) {
        return name+' <b class="caret"></b>';
      }
      else if (options.length > 3) {
        return name + ": "+options.length + ' sélectionnés <b class="caret"></b>';
      }
      else {
        var selected = name + ": ";
        options.each(function() {
          selected += $(this).text() + ', ';
        });
        return selected.substr(0, selected.length -2) + ' <b class="caret"></b>';
      }
    }
  });
};

sortup = function(name) {
  photographers.sort(function(a,b) {
    return a[name] - b[name];
  });
  applyFilter();
};

sortdown = function(name) {
  photographers.sort(function(a,b) {
    return b[name] - a[name];
  });
  applyFilter();
};

initSort = function() {
  $(".sortup").each(function(index, item) {
    var sort = $(item);
    sort.click(function() {
      sortup(sort.attr('sorted-attr'));
    });
  });
  $(".sortdown").each(function(index, item) {
    var sort = $(item);
    sort.click(function() {
      sortdown(sort.attr('sorted-attr'));
    });
  });
};

$(document).ready(function() {
  $(document).autoBars(function() {
    initFilters();
    refreshList();
    initMultiselect();
    initSort();
  });

  $('#resetfilter').click(function(){resetFilter()});
});