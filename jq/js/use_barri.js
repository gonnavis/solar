var barri=new Barri('.main',{
	// x:260,
	// y:200,
	// d1:{x:120,y:0},
	// d2:{x:120,y:298},
	// d3:{x:-220,y:298},
});
barris.push(barri);
barri.dom.attr('data-index',barris.length-1);

jq('.main').dblclick(function(e){
	if(e.altKey){
		var barri=new Barri('.main',{
			x:e.pageX,
			y:e.pageY,
		})
		set_barri_act(barri.dom);
		barris.push(barri);
		barri.dom.attr('data-index',barris.length-1);
		set_barri_act(barri.dom);
	}
})