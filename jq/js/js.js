
// debugger
var act={};
init();

function init(){
	bind_document();
	bind_trape();
	bind_barri();
}
function draw(){

}
function clear_act(){
	jq('.trape_wrap, .barri_wrap').removeClass('act');
}
function set_trape_act(dom){
	clear_act();
	dom.addClass('act');
	var index=dom.attr('data-index');
	act=Trape.prototype.trapes[index];
	Trape.prototype.trape_act=act;

	jq('.option.solar_true_width input').val(act.solar_true_width);
	jq('.option.solar_true_height input').val(act.solar_true_height);

	var lean_degree=(gv.radian_to_degree(act.lean_radian)).toFixed(2);
	jq('.option.lean input').val(lean_degree);
	var solar_lean_degree=(gv.radian_to_degree(act.solar_lean_radian)).toFixed(2);
	jq('.option.solar_lean input').val(solar_lean_degree);
}
function set_barri_act(dom){
	clear_act();
	dom.addClass('act');
	var index=dom.attr('data-index');
	act=Barri.prototype.barris[index];
	Barri.prototype.barri_act=act;
}
function bind_document(){
	jq(document).click(function(){
		clear_act();
	})
}
function bind_trape(){
	jq(document).on('click','.trape_wrap',function(e){
		e.stopPropagation();
		set_trape_act(jq(this));
	})
}
function bind_barri(){
	jq(document).on('click','.barri_wrap',function(e){
		e.stopPropagation();
		set_barri_act(jq(this));
	})
}