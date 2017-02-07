
// debugger
var trapes=[];
var barris=[];
var act={};
init();

function init(){
	bind_main();
	bind_trape();
	bind_barri();
	bind_rotate_key();
}
function draw(){

}
function clear_act(){
	jq('.trape_wrap, .barri_wrap').removeClass('act');
	jq('.options .sub_options').hide();
}
function set_trape_act(dom){
	clear_act();
	dom.addClass('act');
	var index=dom.attr('data-index');
	act=trapes[index];

	jq('.option.solar_true_width input').val(act.solar_true_width);
	jq('.option.solar_true_height input').val(act.solar_true_height);

	var lean_degree=(gv.radian_to_degree(act.lean_radian)).toFixed(2);
	jq('.option.lean input').val(lean_degree);
	var solar_lean_degree=(gv.radian_to_degree(act.solar_lean_radian)).toFixed(2);
	jq('.option.solar_lean input').val(solar_lean_degree);

	jq('.options .trape_options').show();
}
function set_barri_act(dom){
	clear_act();
	dom.addClass('act');
	var index=dom.attr('data-index');
	act=barris[index];

	jq('.options .barri_options').show();
}
function bind_main(){
	jq('.main').click(function(){
		clear_act();
	})
}
function bind_trape(){
	jq('.main').on('click','.trape_wrap',function(e){
		e.stopPropagation();
		set_trape_act(jq(this));
	})
}
function bind_barri(){
	jq('.main').on('click','.barri_wrap',function(e){
		e.stopPropagation();
		set_barri_act(jq(this));
	})
}
function count_solars(){
	var solars_total=0;
	for(var i=0;i<trapes.length;i++){
		var trape=trapes[i];
		solars_total+=trape.solars.length;
	}
	jq('.solars_total').html(solars_total);
}
function delete_trape(){
	act.dom.remove();
	trapes.splice(trapes.indexOf(act),1);
	for(var i=0;i<trapes.length;i++){
		var trape=trapes[i];
		trape.dom.attr('data-index',i);
	}
}
function delete_barri(){
	act.dom.remove();
	barris.splice(barris.indexOf(act),1);
	for(var i=0;i<barris.length;i++){
		var barri=barris[i];
		barri.dom.attr('data-index',i);
	}
}
function bind_rotate_key(){
	jq(document).on('keydown',function(e){
		if(e.keyCode==16||e.keyCode==17/*shift*/){
			act.dom.find('.mask').show();
		}
	})

	jq(document).on('keyup',function(e){
		if(e.keyCode==16||e.keyCode==17/*shift or ctrl*/){
			for(var i=0;i<trapes.length;i++){
				var trape=trapes[i];
				trape.dom.find('.mask').hide();
			}
		}
	})
}
// function