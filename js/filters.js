_102.filters = [
    {name: 'name', i18n: 'Nom'}, 
    {name: 'country', i18n: 'Nationalité'},
    {name: 'category', i18n: 'Genre'},
    {name: 'style', i18n: 'Démarche'}
];

_102.initFilters = function() {

    jQuery("form").empty();

    _102.filters.forEach(function(filter, index) {

        var values = _102.filteredphotographers.map(function(item) {
            return item[filter.name];  
        });

        if(values instanceof Array) {
            var _temp = [];
            values.forEach(function(item) {
                _temp = _temp.concat(item);
            });

            values = _temp;
        }

        values = _102.uniqueArray(values);
        values.sort();

        _102.appendFilter(values, filter);
    });
};

_102.appendFilter = function(values, filter) {

    var html;
    html = jQuery.handlebarTemplates.partials.filterselect({
        name: filter.name,
        val: values,
        i18n: filter.i18n
    });
    jQuery("form").append(html);
};

_102.applyFilter = function() {
    _102.filters.forEach(function(filter) {

        var selected = jQuery(".filter[filter-attr="+filter.name+"] option:selected");

        filter.value = [];

        selected.each(function(index, select) {
            var val = select.value;
            if(val.indexOf('--') !== 0) {
                filter.value.push(val);
            }
        });    
      
    });

    _102.filteredphotographers = [];

    _102.filteredphotographers = _102.photographers.filter(function(photographer) {
        return _102.passFilter(photographer);
    });

    _102.refreshList();
};

_102.passFilter = function(photographer) {
  var res = true;
  _102.filters.forEach(function(filter) {
    res &= _102._valueMatch(filter, photographer);
  });
  return res;
};

_102._valueMatch = function(filter, photographer) {
  var res = filter.value.length === 0;

  filter.value.forEach(function(value) {
    if(photographer[filter.name] instanceof Array) {
      res |= photographer[filter.name].indexOf(value) !== -1;
    } else {
      res |= photographer[filter.name] === value;
    }
  });

  return res;
};