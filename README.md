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

You can take a look at the `example/config.js` to see a functional example.


#### Standard Initialisation

Once you have a working configuration, then its really easy to display the graphs:

    jQuery(document).ready(function(){
      jQuery(document).trigger("_g.start", [_gconfig]);
    }); 
    
**_gconfig** being your configuration array variable.

That will automatically create all the graphs you have setup. The `_g.start` event thats referenced in the code above simple loops over your configuration array and triggers events in a set order:

- _g.config
- _g.chart
- _g.draw

You might want to do things differently, only turning on charts at certain points or events etc, which you can do by triggering the events yourself.

#### Custom Initialisation

All the events used by `_g.start` can be called separately whenever you like as long as you pass along the correct data. 

**Example of only triggering a chart on click**

Instead of running `_g.start` you could do this:

    jQuery("a.chart").click(function(e){
      e.preventDefault();
      var config = _gconfig[0], obj = jQuery(config.selector);
      obj.trigger("_g.config", _c).trigger("_g.chart").trigger("_g.draw", [true]);  
    });

This is simply getting the first chart from the config array and creating it in the same way `_g.start` would.

**Example of changing config after being drawn**

After running `_g.start` as normal you could use a click event to change the data set or columns names etc quite easily:

    jQuery("a.update").click(function(e){
      e.preventDefault();
      var relatedchart = jQuery(this).data("chart"), 
          newcols = [{type:'string', name:'Ingredient'}, {type:'number', name:'Quantity'}], 
          newdata = [['Eggs', 3], ['Onions', 1]],
          newoptions = {title:'Recipe'};
      relatedchart.trigger("_g.options", newoptions).trigger("_g.cols", newcols).trigger("_g.data", newdata).trigger("_g.draw");
    }); 
    
It does assume that the clicked a tag has the chart div (the results of finding the `selector`) assigned to its data. 

If it finds that then it changes the name of the chart, the columns and data to the new ones set and then triggers a redraw.

