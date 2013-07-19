var _102 = {};

_102.uniqueArray = function(array) {
    var arr = [];
    array.forEach(function(item, index) {
      if(arr.indexOf(array[index]) === -1) {
        arr.push(array[index]);
      }
    });
    return arr; 
};

_102.refreshList = function() {
  jQuery(".wrapper").empty();
  _102.filteredphotographers.forEach(function(photographer) {
    var jQueryhtml = jQuery.handlebarTemplates.partials.photographer(photographer);
    jQuery(".wrapper").append(jQueryhtml);
  });
};

_102.initMultiselect = function() {
  jQuery('.multiselect').multiselect({
    buttonClass: 'btn',
    buttonContainer: '<div class="btn-group" />',
    buttonWidth: 'auto',
    maxHeight: 300,
    selectAllText: " Tous",
    includeSelectAllOption: true,
    onChange: function(element, checked) {
      _102.applyFilter();
    },
    buttonText: function(options, select) {
      var name = select.attr("i18n");
      if (options.length === 0) {
        return name+' <b class="caret"></b>';
      }
      else  {
        return name + " ("+options.length + ")";
      }
    }
  });
};

_102.sortup = function(name) {
  _102.photographers.sort(function(a,b) {
    return a[name] - b[name];
  });
  _102.applyFilter();
};

_102.sortdown = function(name) {
  _102.photographers.sort(function(a,b) {
    return b[name] - a[name];
  });
  _102.applyFilter();
};

_102.initSort = function() {
  jQuery(".sortup").each(function(index, item) {
    var sort = jQuery(item);
    sort.click(function() {
      _102.sortup(sort.attr('sorted-attr'));
    });
  });
  jQuery(".sortdown").each(function(index, item) {
    var sort = jQuery(item);
    sort.click(function() {
      _102.sortdown(sort.attr('sorted-attr'));
    });
  });
};

jQuery(document).ready(function() {
  jQuery(document).autoBars(function() {
    _102.initFilters();
    _102.refreshList();
    _102.initMultiselect();
    _102.initSort();
  });

  jQuery('#resetfilter').click(function(){_102.resetFilter();});
});