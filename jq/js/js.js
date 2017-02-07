
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
	delete_solars_by_barri();
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
function delete_solars_by_barri(){
	for(var i=0;i<barris.length;i++){
		var barri=barris[i];
		for(var j=0;j<trapes.length;j++){
			var trape=trapes[j];
			for(var k=0;k<trape.solars.length;k++){
				var solar=trape.solars[k];

				for(var l=0;l<4;l++){
					var dot=solar.global['d'+l];
					var is_in=gv.point_in_polygon(
						[dot.x,dot.y],
						[
							[barri.d0.x,barri.d0.y],
							[barri.d1.x,barri.d1.y],
							[barri.d2.x,barri.d2.y],
							[barri.d3.x,barri.d3.y],
						]
					);
					if(is_in){
						solar.is_delete=true;
					}
				}

				for(var l=0;l<4;l++){
					var dot=barri['d'+l];
					var is_in=gv.point_in_polygon(
						[dot.x,dot.y],
						[
							[solar.global.d0.x,solar.global.d0.y],
							[solar.global.d1.x,solar.global.d1.y],
							[solar.global.d2.x,solar.global.d2.y],
							[solar.global.d3.x,solar.global.d3.y],
						]
					);
					if(is_in){
						solar.is_delete=true;
					}
				}

			}
		}
	}
	for(var i=0;i<barris.length;i++){
		var barri=barris[i];
		for(var j=0;j<trapes.length;j++){
			var trape=trapes[j];
			for(var k=0;k<trape.solars.length;){
				var solar=trape.solars[k];
				if(solar.is_delete){
					trape.solars.splice(k,1);
				}
				else{
					k++;
				}
			}
			trape.draw_solars();
		}
	}
}