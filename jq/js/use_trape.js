var trape=new Trape('.main',{
	x:260,
	y:200,
	// d1:{x:120,y:0},
	// d2:{x:120,y:298},
	// d3:{x:-220,y:298},
});
trapes.push(trape);
trape.dom.attr('data-index',trapes.length-1);
set_trape_act(trape.dom);
// var trape2=new Trape('.main',{x:270,y:270});

// trape.set_act();
// trape2.rotate(Math.PI/2);
// trape2.draw();
// trape2.draw_solars();

jq('.options').dblclick(function(e){
	e.stopPropagation();
})

jq('.main').dblclick(function(e){
	if(!e.altKey){
		var trape=new Trape('.main',{
			x:e.pageX,
			y:e.pageY,
		})
		trapes.push(trape);
		trape.dom.attr('data-index',trapes.length-1);
		set_trape_act(trape.dom);
	}
})

jq(document).mousemove(function(){
	// console.log(trape.radian.toFixed(3)+' '+trape.degree.toFixed(0));
})

jq('.option.calc_solars').click(function(){
	for(var i=0;i<trapes.length;i++){
		var trape=trapes[i];
		trape.draw_solars();
	}
})

jq('.option.rotate_left').click(function(){
	act.rotate(Math.PI/2);
	act.draw();
})

jq('.option.rotate_right').click(function(){
	act.rotate(-Math.PI/2);
	act.draw();
})

jq('.option.solar_true_width input').change(function(){
	act.set_solar_width(jq(this).val());
})

jq('.option.solar_true_height input').change(function(){
	act.set_solar_height(jq(this).val());
})

jq('.option.lean input').change(function(){
	var degree=jq('.option.lean input').val();
	if(degree<0||degree>=90){
		alert('角度需大于等于0度、小于90度');
		return;
	}
	act.set_lean_radian(gv.degree_to_radian(degree));
})

jq('.option.lean .btn').click(function(){
	act.toggle_lean_arrows();
})

jq('.option.solar_lean input').change(function(){
	var degree=jq('.option.solar_lean input').val();
	if(degree<0||degree>=90){
		alert('角度需大于等于0度、小于90度');
		return;
	}
	act.set_solar_lean_radian(gv.degree_to_radian(degree));
})

jq('.option.solar_lean .btn').click(function(){
	act.toggle_solar_lean_arrows();
})