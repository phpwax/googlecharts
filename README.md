# Google Charts & jQuery

Using custom jQuery events and triggers you can create new or amended existing charts very easily based on a configuration array.

**All events and data are name spaced to _g**

#### Requirements

jQuery 1.5 or over & google visualization are both required for this script to work. Heres a simple inclusion for you:

    <script src='http://www.google.com/jsapi?'  type='text/javascript'></script>
    <script type='text/javascript'>
      google.load('jquery', '1.5');
      google.load('visualization', '1', {'packages':['corechart']});
    </script>

The packages you decide to include will effect what chart types are usable, for more information please check the google docs.


#### Configuration

Each element within a configuration array is meant to be a new chart. An individual charts configuration object should look like this:

    {
      selector:"#chart-example",
      type:"PieChart",
      columns:[
        {type:'string', name:'Task'},
        {type:'number', name:'Hours'}
      ],
      data:[
        ['Work', 10],
        ['Eat', 2],
        ['Sleep', 5],
        ['Other', 7]
      ],
      options:{
        title:'Activties'
      }
    }

**The main event (`_g.start`) expects the config to be an array**

Most of these are fairly obvious as what they do, but heres some details about them.

**selector**

A jQuery selector to find the `div` you want to become the chart. This element needs to have a unique id for the chart creation in `_g.chart`.

Used in `_g.start` to find each chart:

    obj = jQuery(_c.selector);

**type**

A chart type from the packages you have included.

Used in `_g.chart` when creating the google visualization object:

    chart = setup|| new google.visualization[config.type](document.getElementById(graph.attr("id")));

**columns**

Column listing, these are passed straight into googles `addColumn` function within the `_g.cols` event.

    table.addColumn(cols[a].type, cols[a].name);

**data**

A multi-dimensional array matching the layout of the columns specified in `columns`. This is used within the `_g.data` event and is passed straight into the `addRows` function:

    table.addRows(data);
    
**options**

These are drawing options used to set titles, axis setup, background colours etc and is passed in during the `_g.draw` event:

    chart.draw(table, options);
    
There is also a more advanced **events** parameter that can be used for custom event handling; however **this is untested**.

You can take a look at the example/config.js to see a functional example.


#### Standard Initialisation

Once you have a working configuration, then its really easy to display the graphs:

    jQuery(document).ready(function(){
      jQuery(document).trigger("_g.start", [_gconfig]);
    }); 
    
**_gconfig** being your configuration array variable.

That will automatically create all the graphs you have setup; that might not always be suitable, so you have do things differently if you want.

The `_g.start` event thats referenced in the code above simple loops over your configuration array and triggers events in a set order:

- [_g.config](#gconfig "_g.config")
- _g.chart
- _g.draw

