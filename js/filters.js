var filters = [
  {name: 'name', i18n: 'Nom'}, 
  {name: 'country', i18n: 'Nationalité'},
  {name: 'category', i18n: 'Genre'},
  {name: 'style', i18n: 'Démarche'}
];

initFilters = function() {

  $("form").empty();

  filters.forEach(function(filter, index) {

    var values = filteredphotographers.map(function(item) {
      return item[filter.name];  
    });

    if(values instanceof Array) {
      var _temp = [];
      values.forEach(function(item) {
        _temp = _temp.concat(item);
      });

      values = _temp;
    }

    values = uniqueArray(values);
    values.sort();

    appendFilter(values, filter);
  });
};

appendFilter = function(values, filter) {
  var html;
  html = $.handlebarTemplates.partials.filterselect({
    name: filter.name,
    val: values,
    i18n: filter.i18n
  });
  $("form").append(html);
}

applyFilter = function() {
  filters.forEach(function(filter) {

    var selected = $(".filter[filter-attr="+filter.name+"] option:selected");

    filter.value = [];

    selected.each(function(index, select) {
      var val = select.value;
      if(!val.indexOf('--') == 0) {
        filter.value.push(val);
      }
    });    
    
  });

  filteredphotographers = [];

  filteredphotographers = photographers.filter(function(photographer) {
    return passFilter(photographer);
  });

  refreshList();
};

passFilter = function(photographer) {
  var res = true;
  filters.forEach(function(filter) {
    res &= _valueMatch(filter, photographer);
  });
  return res;
};

_valueMatch = function(filter, photographer) {
  var res = filter.value.length == 0;

  filter.value.forEach(function(value) {
    if(photographer[filter.name] instanceof Array) {
      res |= photographer[filter.name].indexOf(value) !== -1;
    } else {
      res |= photographer[filter.name] === value;
    }
  });

  return res;
};