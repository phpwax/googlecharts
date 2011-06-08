/*** jquery triggers **/

/**
 * init - simply creates a google data object
 */
jQuery(document).bind("_g.chart", function(e, setup){
  var graph = jQuery(e.target),
      config = graph.data("_g.config"),
      chart = setup|| new google.visualization[config.type](document.getElementById(graph.attr("id")));
      ;
  graph.data("_g.chart", chart);
});
/**
 * runs over the data & cols and calls the draw command
 */
jQuery(document).bind("_g.draw", function(e, runall){
  var graph = jQuery(e.target), table, options, chart;
  //call all of the data setup functions if asked to
  if(runall) graph.trigger("_g.options").trigger("_g.table").trigger("_g.cols").trigger("_g.events").trigger("_g.data");
  
  table = graph.data("_g.table");
  options = graph.data("_g.options");
  chart = graph.data("_g.chart");
  
  chart.draw(table, options);
});
/**
 * set the data table object
 */
jQuery(document).bind("_g.options", function(e, setup){
  var graph = jQuery(e.target),
      config = graph.data("_g.config"),
      options = setup||config.options
      ;
  graph.data("_g.options", options);
});
/**
 * set the data table object
 */
jQuery(document).bind("_g.table", function(e, setup){
  var graph = jQuery(e.target),
      table = setup||new google.visualization.DataTable();
      ;
  graph.data("_g.table", table);
});
/**
 * set the column names
 */
jQuery(document).bind("_g.cols", function(e, setup){
  var graph = jQuery(e.target),
      config = graph.data("_g.config"),
      cols = setup||config.columns,
      table = graph.data("_g.table")
      ;
  for(var a in cols) table.addColumn(cols[a].type, cols[a].name);  
});
/**
 * set the datatable on the object
 */
jQuery(document).bind("_g.data", function(e, setup){
  var graph = jQuery(e.target),
      config = graph.data("_g.config"),
      data = setup||config.data,
      table = graph.data("_g.table");
      
  table.addRows(data);    
  graph.data("_g.table", table);
});
/**
 * bind any custom events
 */
jQuery(document).bind("_g.events", function(e, setup){
  var graph = jQuery(e.target),
      config = graph.data("_g.config"),
      events = setup||config.events
      ;
  if(events && events.length){
    for(var i in events){
      var t = graph.data("_g."+events[i].target);
      google.visualization.events.addListener(t, events[i].type, events[i].func);
    }
  }
  
});

