var _gconfig = [
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
  },
  {
    selector:"#area-example",
    type:"AreaChart",
    columns:[
      {type:'string', name:'Month'},
      {type:'number', name:'Visits'},
      {type:'number', name:'Conversions'}      
    ],
    data:[
      ['Jan 2011', 100, 1],
      ['Feb 2011', 500, 30],
      ['March 2011', 20, 0],
      ['April 2011', 323, 5]
    ],
    options:{
      title:'Stats',
      legend:"bottom",
      pointSize:5
    }
    /*
    ,events:[
      {target:'table', event:'clicked', func:function(){alert("yes!");}}
    ]
    */
  }
];

jQuery(document).ready(function(){
  
  jQuery(document).trigger("_g.start", [_gconfig]);
  
});