var _g_config = [
  {
    selector:"#pie-example",
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
];

jQuery(document).ready(function(){
  
  for(var x in _g_config){
    var _c = _g_config[x], _obj = jQuery(_c.selector);
    if(_obj && _obj.length){
      console.log("running graph - "+_c.selector);
      //set the config on the objects data, trigger the init 
      _obj.data("_g.config", _c).trigger("_g.chart").trigger("_g.draw", [true]).trigger("_g.draw");
    }
  }
  
});