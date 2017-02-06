

function Trape(parent,option){
	var s=this;
	Trape.prototype.trapes.push(s);
	var option=option||{};
	s.dom=jq('.proto.trape_wrap').clone().removeClass('proto').show();
	s.x=option.x||300;
	s.y=option.y||300;
	s.d0=option.d0||{x:0,y:0};
	s.d1=option.d1||{x:100,y:0};
	s.d2=option.d2||{x:120,y:90};
	s.d3=option.d3||{x:-20,y:90};
	s.act_dot_index;
	s.radian=0;
	s.degree=0;
	s.precison=6;
	s.solar_true_width=30;
	s.solar_true_height=20;
	s.is_show_lean_arrows=false;
	s.is_show_solar_lean_arrows=false;
	s.lean_direction='up';
	s.lean_radian=0;
	s.solar_lean_direction='up';
	s.solar_lean_radian=0;
	s.init(parent);
}

Trape.prototype={
	trapes:[],
	init:function(parent){
		var s=this;

		jq(parent).append(s.dom);

		s.set_act();

		s.draw();

		s.bind_dots();
		s.bind_polygon();
		s.bind_top_line();
		s.bind_bottom_line();
		s.bind_left_line();
		s.bind_right_line();
		s.bind_mask();
		s.bind_rotate_key();
		s.bind_trape();
		s.bind_lean_arrows();
		s.bind_solar_lean_arrows();
	},
	get_data:function(){
		var s=this;

		s.height=s.d3.y-s.d0.y;

		s.trape_top_width=gv.get_distance(s.d0,s.d1)
		s.trape_bottom_width=gv.get_distance(s.d3,s.d2)

		for(var i=0;i<4;i++){
			s['d'+i].lx=gv.cos(s.get_dot_radian(s['d'+i])+s.radian)
				*gv.get_distance(s['d'+i]);
			s['d'+i].ly=-(gv.sin(s.get_dot_radian(s['d'+i])+s.radian)
				*gv.get_distance(s['d'+i]));

			s['d'+i].wx=s.x+s['d'+i].lx;
			s['d'+i].wy=s.y+s['d'+i].ly;
		}
	},
	set_act:function(){
		var s=this;
		for(var i=0;i<Trape.prototype.trapes.length;i++){
			var trape=Trape.prototype.trapes[i];
			trape.dom.removeClass('act');
		}
		Trape.prototype.trape_act=s;
		s.dom.addClass('act');

		jq('.option.solar_true_width input').val(Trape.prototype.trape_act.solar_true_width);
		jq('.option.solar_true_height input').val(Trape.prototype.trape_act.solar_true_height);

		var lean_degree=(gv.radian_to_degree(Trape.prototype.trape_act.lean_radian)).toFixed(2);
		jq('.option.lean input').val(lean_degree);
		var solar_lean_degree=(gv.radian_to_degree(Trape.prototype.trape_act.solar_lean_radian)).toFixed(2);
		jq('.option.solar_lean input').val(solar_lean_degree);
	},
	draw:function(){
		var s=this;
		s.get_data();

		s.dom.find('.trape').css('transform','translate('+s.x+'px,'+s.y+'px) rotate('+-s.radian+'rad)');
		// s.dom.find('.trape').css('transform','translate('+s.x+'px,'+s.y+'px) rotate(60deg)');

		if(s.is_show_lean_arrows){
			s.dom.find('.lean_arrows').show();
		}
		else{
			s.dom.find('.lean_arrows').hide();
		}
		s.dom.find('.lean_arrows .arrow').removeClass('act');
		s.dom.find('.lean_arrows .arrow[data-direction='+s.lean_direction+']').addClass('act');
		
		if(s.is_show_solar_lean_arrows){
			s.dom.find('.solar_lean_arrows').show();
		}
		else{
			s.dom.find('.solar_lean_arrows').hide();
		}
		s.dom.find('.solar_lean_arrows .arrow').removeClass('act');
		s.dom.find('.solar_lean_arrows .arrow[data-direction='+s.solar_lean_direction+']').addClass('act');

		s.draw_polygon();
		s.draw_dots();
		s.draw_solars();
	},
	draw_polygon:function(){
		var s=this;
		var points='';

		for(var i=0;i<4;i++){
			points+=(s['d'+i].x)+','+(s['d'+i].y)+' ';
		}
		s.dom.find('.trape_fill').attr('points',points);

		var top_line=s.dom.find('.top');
		top_line.attr('x1',s.d0.x);
		top_line.attr('y1',s.d0.y);
		top_line.attr('x2',s.d1.x);
		top_line.attr('y2',s.d1.y);

		var right_line=s.dom.find('.right');
		right_line.attr('x1',s.d1.x);
		right_line.attr('y1',s.d1.y);
		right_line.attr('x2',s.d2.x);
		right_line.attr('y2',s.d2.y);

		var bottom_line=s.dom.find('.bottom');
		bottom_line.attr('x1',s.d2.x);
		bottom_line.attr('y1',s.d2.y);
		bottom_line.attr('x2',s.d3.x);
		bottom_line.attr('y2',s.d3.y);

		var left_line=s.dom.find('.left');
		left_line.attr('x1',s.d3.x);
		left_line.attr('y1',s.d3.y);
		left_line.attr('x2',s.d0.x);
		left_line.attr('y2',s.d0.y);
	},
	draw_dots:function(){
		var s=this;
		s.dom.find('.dot').eq(0).attr('cx',s.d0.x)
		s.dom.find('.dot').eq(0).attr('cy',s.d0.y)
		s.dom.find('.dot').eq(1).attr('cx',s.d1.x)
		s.dom.find('.dot').eq(1).attr('cy',s.d1.y)
		s.dom.find('.dot').eq(2).attr('cx',s.d2.x)
		s.dom.find('.dot').eq(2).attr('cy',s.d2.y)
		s.dom.find('.dot').eq(3).attr('cx',s.d3.x)
		s.dom.find('.dot').eq(3).attr('cy',s.d3.y)
	},
	draw_solars:function(){
		var s=this;

		// init

			var s=s;

			s.solars=[];

			s.solar_width=s.solar_true_width;
			var solar_result_lean_radian=0;
			if(s.lean_direction==s.solar_lean_direction){
				solar_result_lean_radian=s.lean_radian+s.solar_lean_radian;
			}
			else{
				solar_result_lean_radian=s.lean_radian-s.solar_lean_radian;
			}
			s.solar_height=Math.round(Math.cos(solar_result_lean_radian)*s.solar_true_height);
			if(s.solar_height==0){
				s.solar_height=1;
			}

			s.outter_rect={};
			s.outter_rect.left=Math.min(s.d0.x,s.d3.x);
			s.outter_rect.right=Math.max(s.d1.x,s.d2.x);
			s.outter_rect.width=s.outter_rect.right-s.outter_rect.left;
			s.outter_rect.height=s.d3.y;

		// add all solars

			var solars_top_padding;
			var solars_left_padding;

			if(s.trape_bottom_width>=s.trape_top_width){
				solars_top_padding=s.height%s.solar_height;
			}
			else{
				solars_top_padding=0;
			}

			if(Math.abs(s.d0.x-s.d3.x) <= Math.abs(s.d1.x-s.d2.x) ){

				s.small_rect={};
				s.small_rect.left=Math.min(s.d0.x,s.d3.x);
				s.small_rect.right=Math.max(s.d0.x,s.d3.x);
				s.small_rect.width=s.small_rect.right-s.small_rect.left;
				s.small_rect.height=s.d3.y;

				s.big_rect={};
				s.big_rect.left=Math.max(s.d0.x,s.d3.x);
				s.big_rect.right=Math.max(s.d1.x,s.d2.x);
				s.big_rect.width=s.big_rect.right-s.big_rect.left;
				s.big_rect.height=s.d3.y;

				big_solars_left_padding=0;
				small_solars_left_padding=s.small_rect.width%s.solar_width;
			}
			else{

				s.small_rect={};
				s.small_rect.left=Math.min(s.d1.x,s.d2.x);
				s.small_rect.right=Math.max(s.d1.x,s.d2.x);
				s.small_rect.width=s.small_rect.right-s.small_rect.left;
				s.small_rect.height=s.d3.y;

				s.big_rect={};
				s.big_rect.left=Math.min(s.d0.x,s.d3.x);
				s.big_rect.right=Math.min(s.d1.x,s.d2.x);
				s.big_rect.width=s.big_rect.right-s.big_rect.left;
				s.big_rect.height=s.d3.y;

				big_solars_left_padding=s.big_rect.width%s.solar_width;
				small_solars_left_padding=0;
			}

			// big_rect
				var solars_bottom=solars_top_padding;
				while(solars_bottom+s.solar_height<=s.big_rect.height){
					var solars_right=s.big_rect.left+big_solars_left_padding;
					while(solars_right+s.solar_width<=s.big_rect.right){
						s.solars.push({
							x:solars_right,
							y:solars_bottom,
						})
						solars_right+=s.solar_width;
					}
					solars_bottom+=s.solar_height;
				}
			// small_rect
				var solars_bottom=solars_top_padding;
				while(solars_bottom+s.solar_height<=s.small_rect.height){
					var solars_right=s.small_rect.left+small_solars_left_padding;
					while(solars_right+s.solar_width<=s.small_rect.right){
						s.solars.push({
							x:solars_right,
							y:solars_bottom,
						})
						solars_right+=s.solar_width;
					}
					solars_bottom+=s.solar_height;
				}

		// delete overflow solars
			for(var i=0;i<s.solars.length;i++){
				var solar=s.solars[i];

				// debugger;
				var left_most;
				if(s.d0.x>=s.d3.x){
					var x=s.d0.x-s.d3.x;
					var x1=x*solar.y/s.height;
					left_most=-x1;
					if(solar.x<left_most){
						solar.is_delete=true;
						continue;
					}
				}
				else{
					var x=s.d3.x-s.d0.x;
					var x1=x*(solar.y+s.solar_height)/s.height;
					left_most=x1;
					if(solar.x<left_most){
						solar.is_delete=true;
						continue;
					}
				}

				var right_most;
				if(s.d2.x>=s.d1.x){
					var x=s.d2.x-s.d1.x;
					var x1=x*solar.y/s.height;
					right_most=s.d1.x+x1;
					if(solar.x+s.solar_width>right_most){
						solar.is_delete=true;
						continue;
					}
				}
				else{
					var x=s.d1.x-s.d2.x;
					var x1=x*(solar.y+s.solar_height)/s.height;
					right_most=s.d1.x-x1;
					if(solar.x+s.solar_width>right_most){
						solar.is_delete=true;
						continue;
					}
				}
			}
			for(var i=0;i<s.solars.length;){
				var solar=s.solars[i];

				if(solar.is_delete){
					s.solars.splice(i,1);
				}
				else{
					i++;
				}
			}

		// count
			s.count_solars();

		// draw
			s.dom.find('.solar').remove();
			for(var i=0;i<s.solars.length;i++){
				var solar=s.solars[i];

				var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'polygon'); //Create a path in SVG's namespace
				newElement.setAttribute("class",'solar');
				newElement.setAttribute("points",
							solar.x+','+solar.y
							+' '+(solar.x+s.solar_width)+','+solar.y
							+' '+(solar.x+s.solar_width)+','+(solar.y+s.solar_height)
							+' '+solar.x+','+(solar.y+s.solar_height)
						); //Set path's data
				newElement.style.fill = "rgba(0,0,0,.5)"; //Set stroke colour
				newElement.style.stroke = "black"; //Set stroke colour
				newElement.style.strokeWidth = "1"; //Set stroke colour

				s.dom.find('svg g.solars')[0].appendChild(newElement);
				if(s.is_flip){
					s.dom.find('svg g.rotater').css('transform','rotate('+-s.degree+'deg) scaleY(-1)');
				}
				else{
					s.dom.find('svg g.rotater').css('transform','rotate('+-s.degree+'deg)');
				}
			}
	},
	count_solars:function(){
		var solars_total=0;
		for(var i=0;i<Trape.prototype.trapes.length;i++){
			var trape=Trape.prototype.trapes[i];
			solars_total+=trape.solars.length;
		}
		jq('.solars_total').html(solars_total);
	},
	bind_dots:function(){
		var s=this;

		s.dom.find('.dot').each(function(i,elem){

			elem=jq(elem);
			var startX = 0, startY = 0, x = 0, y = 0;

			var origin_width=0;
			var origin_x=0

			elem.on('mousedown', function(e) {
				e.preventDefault();
				startX = e.pageX;
				startY = e.pageY;

				s.act_dot_index=i;
				if(i==0){
					origin_width=s.trape_top_width;
					origin_x=s.d0.x;
				}
				else if(i==1){
					origin_width=s.trape_top_width;
					origin_x=s.d1.x;
				}
				else if(i==2){
					origin_width=s.trape_bottom_width;
					origin_x=s.d2.x;
				}
				else if(i==3){
					origin_width=s.trape_bottom_width;
					origin_x=s.d3.x;
				}

				jq(document).on('mousemove', mousemove);
				jq(document).on('mouseup', mouseup);
				// s.dom.find('.solars').hide();
				s.set_act();
			});

			function mousemove(e) {

				// console.log('mousemove i: '+i);
				if(i==0){
					var mx=e.pageX-startX;
					var my=-(e.pageY-startY);

					var a=s.radian;
					var tan=gv.tan(a);
					if(s.radian==Math.PI/2){
						r=my;
					}
					else if(s.radian==3*Math.PI/2){
						r=-my;
					}
					else{
						var o=tan*my;
						var p=o+mx;
						var r=gv.cos(a)*p;
					}

					s.d0.x=origin_x+r;

					if(s.d0.x>s.d1.x){
						s.d0.x=s.d1.x-4;
					}
				}
				else if(i==1){
					var mx=e.pageX-startX;
					var my=-(e.pageY-startY);

					var a=s.radian;
					var tan=gv.tan(a);
					if(s.radian==Math.PI/2){
						r=my;
					}
					else if(s.radian==3*Math.PI/2){
						r=-my;
					}
					else{
						var o=tan*my;
						var p=o+mx;
						var r=gv.cos(a)*p;
					}

					s.d1.x=origin_x+r;

					if(s.d1.x<s.d0.x){
						s.d1.x=s.d0.x+4;
					}
				}
				else if(i==2){
					var mx=e.pageX-startX;
					var my=-(e.pageY-startY);

					var a=s.radian;
					var tan=gv.tan(a);
					if(s.radian==Math.PI/2){
						r=my;
					}
					else if(s.radian==3*Math.PI/2){
						r=-my;
					}
					else{
						var o=tan*my;
						var p=o+mx;
						var r=gv.cos(a)*p;
					}

					s.d2.x=origin_x+r;

					if(s.d2.x<s.d3.x){
						s.d2.x=s.d3.x+4;
					}
				}
				else if(i==3){
					var mx=e.pageX-startX;
					var my=-(e.pageY-startY);

					var a=s.radian;
					var tan=gv.tan(a);
					if(s.radian==Math.PI/2){
						r=my;
					}
					else if(s.radian==3*Math.PI/2){
						r=-my;
					}
					else{
						var o=tan*my;
						var p=o+mx;
						var r=gv.cos(a)*p;
					}


					s.d3.x=origin_x+r;

					if(s.d3.x>s.d2.x){
						s.d3.x=s.d2.x-4;
					}
				}

				s.draw();
			}

			function mouseup() {

				if(s.act_dot_index==0){
					var drag_distance=-(s.d0.x);
					for(var i=0;i<4;i++){
						s['d'+i].x+=drag_distance;
					}
					s.x-=gv.cos(s.radian)*drag_distance;
					s.y+=gv.sin(s.radian)*drag_distance;
					s.draw();
				}

				jq(document).off('mousemove', mousemove);
				jq(document).off('mouseup', mouseup);
				// s.dom.find('.solars').show();
			}
		})
	},
	bind_polygon:function(){
		var s=this;

		s.dom.find('polygon').each(function(i,elem){

			elem=jq(elem);
			var startX = 0, startY = 0, x = 0, y = 0;

			elem.on('mousedown', function(e) {
				e.preventDefault();
				startX = e.pageX;
				startY = e.pageY;
				jq(document).on('mousemove', mousemove);
				jq(document).on('mouseup', mouseup);
				// s.dom.find('.solars').hide();
				s.set_act();
			});

			function mousemove(e) {
				x = e.pageX - startX;
				y = e.pageY - startY;
				startX = e.pageX;
				startY = e.pageY;

				s.x+=x;
				s.y+=y;

				s.draw();
			}

			function mouseup() {
				jq(document).off('mousemove', mousemove);
				jq(document).off('mouseup', mouseup);
				// s.dom.find('.solars').show();
			}
		})
	},
	bind_top_line:function(){
		var s=this;

		s.dom.find('line.top').each(function(i,elem){

			elem=jq(elem);
			var startX = 0, startY = 0, x = 0, y = 0;

			var origin_height=0;

			elem.on('mousedown', function(e) {
				e.preventDefault();
				startX = e.pageX;
				startY = e.pageY;

				origin_height=s.d3.y;

				jq(document).on('mousemove', mousemove);
				jq(document).on('mouseup', mouseup);
			});

			function mousemove(e) {

				var mx=e.pageX-(startX);
				var my=-(e.pageY-startY);

				var a=s.radian-(Math.PI/2);
				var o=gv.tan(a)*my;
				var p=o+mx;
				var r=gv.cos(a)*p;
				s.d0.y=r;
				s.d1.y=r;

				if(s.d2.y-s.d0.y<4){
					s.d0.y=s.d2.y-4;
					s.d1.y=s.d2.y-4;
				}

				s.draw();
			}

			function mouseup() {

				var drag_distance=-s.d0.y;
				for(var i=0;i<4;i++){
					s['d'+i].y+=drag_distance;
				}

				var a=s.radian+(Math.PI/2);
				s.x+=gv.cos(a)*drag_distance;
				s.y-=gv.sin(a)*drag_distance;
				s.draw();

				jq(document).off('mousemove', mousemove);
				jq(document).off('mouseup', mouseup);
			}
		})
	},
	bind_bottom_line:function(){
		var s=this;

		s.dom.find('line.bottom').each(function(i,elem){

			elem=jq(elem);
			var startX = 0, startY = 0, x = 0, y = 0;

			var origin_height=0;

			elem.on('mousedown', function(e) {
				e.preventDefault();
				startX = e.pageX;
				startY = e.pageY;

				origin_height=s.d3.y;

				jq(document).on('mousemove', mousemove);
				jq(document).on('mouseup', mouseup);
			});

			function mousemove(e) {

				var mx=e.pageX-(startX);
				var my=-(e.pageY-startY);

				var a=s.radian-(Math.PI/2);
				var o=gv.tan(a)*my;
				var p=o+mx;
				var r=gv.cos(a)*p;
				s.d2.y=origin_height+r;
				s.d3.y=origin_height+r;

				if(s.d2.y<4){
					s.d2.y=4;
					s.d3.y=4;
				}

				s.draw();
			}

			function mouseup() {
				jq(document).off('mousemove', mousemove);
				jq(document).off('mouseup', mouseup);
			}
		})
	},
	bind_left_line:function(){
		var s=this;

		s.dom.find('line.left').each(function(i,elem){

			elem=jq(elem);
			var startX = 0, startY = 0, x = 0, y = 0;

			var origin_d0_x=0;
			var origin_d3_x=0;

			elem.on('mousedown', function(e) {
				e.preventDefault();
				startX = e.pageX;
				startY = e.pageY;

				origin_d0_x=s.d0.x;
				origin_d3_x=s.d3.x;

				jq(document).on('mousemove', mousemove);
				jq(document).on('mouseup', mouseup);
			});

			function mousemove(e) {

				var mx=e.pageX-(startX);
				var my=-(e.pageY-startY);

				var a=s.radian;
				var o=gv.tan(a)*my;
				var p=o+mx;
				var r=gv.cos(a)*p;

				s.d0.x=origin_d0_x+r;
				s.d3.x=origin_d3_x+r;

				if(s.d1.x-s.d0.x<4){
					s.d0.x=s.d1.x-4;
					var distance=s.d0.x-origin_d0_x;
					s.d3.x=origin_d3_x+distance;
				}

				if(s.d2.x-s.d3.x<4){
					s.d3.x=s.d2.x-4;
					var distance=s.d3.x-origin_d3_x;
					s.d0.x=origin_d0_x+distance;
				}

				s.draw();
			}

			function mouseup() {

				var drag_distance=-s.d0.x;
				for(var i=0;i<4;i++){
					s['d'+i].x+=drag_distance;
				}

				var a=s.radian;
				s.x-=gv.cos(a)*drag_distance;
				s.y+=gv.sin(a)*drag_distance;
				s.draw();

				jq(document).off('mousemove', mousemove);
				jq(document).off('mouseup', mouseup);
			}
		})
	},
	bind_right_line:function(){
		var s=this;

		s.dom.find('line.right').each(function(i,elem){

			elem=jq(elem);
			var startX = 0, startY = 0, x = 0, y = 0;

			var origin_d1_x=0;
			var origin_d2_x=0;

			elem.on('mousedown', function(e) {
				e.preventDefault();
				startX = e.pageX;
				startY = e.pageY;

				origin_d1_x=s.d1.x;
				origin_d2_x=s.d2.x;

				jq(document).on('mousemove', mousemove);
				jq(document).on('mouseup', mouseup);
			});

			function mousemove(e) {

				var mx=e.pageX-(startX);
				var my=-(e.pageY-startY);

				var a=s.radian;
				var o=gv.tan(a)*my;
				var p=o+mx;
				var r=gv.cos(a)*p;

				s.d1.x=origin_d1_x+r;
				s.d2.x=origin_d2_x+r;

				if(s.d1.x-s.d0.x<4){
					s.d1.x=s.d0.x+4;
					var distance=s.d1.x-origin_d1_x;
					s.d2.x=origin_d2_x+distance;
				}

				if(s.d2.x-s.d3.x<4){
					s.d2.x=s.d3.x+4;
					var distance=s.d2.x-origin_d2_x;
					s.d1.x=origin_d1_x+distance;
				}

				s.draw();
			}

			function mouseup() {
				jq(document).off('mousemove', mousemove);
				jq(document).off('mouseup', mouseup);
			}
		})
	},
	bind_mask:function(){
		var s=this;

		s.dom.find('.mask').each(function(i,elem){

			elem=jq(elem);
			var startX = 0, startY = 0, x = 0, y = 0;

			elem.on('mousedown', function(e) {
				// log(1);
				e.preventDefault();
				startX = e.pageX;
				startY = e.pageY;
				jq(document).on('mousemove', mousemove);
				jq(document).on('mouseup', mouseup);
			});

			function mousemove(e) {
				// log(2);
				x = e.pageX - startX;
				y = e.pageY - startY;
				startX = e.pageX;
				startY = e.pageY;

				s.rotate(x/300);
			}

			function mouseup() {
				jq(document).off('mousemove', mousemove);
				jq(document).off('mouseup', mouseup);
			}
		})
	},
	bind_rotate_key:function(){
		var s=this;

		jq(document).on('keydown',function(e){
			if(e.keyCode==16||e.keyCode==17/*shift or ctrl*/){
				Trape.prototype.trape_act.dom.find('.mask').show();
			}
		})

		jq(document).on('keyup',function(e){
			if(e.keyCode==16||e.keyCode==17/*shift or ctrl*/){
				for(var i=0;i<Trape.prototype.trapes.length;i++){
					var trape=Trape.prototype.trapes[i];
					trape.dom.find('.mask').hide();
				}
			}
		})
	},
	bind_trape:function(){
		var s=this;
		s.dom.on('mousedown',function(){
			s.dom.find('.solars').hide();
		})
		jq(document).on('mouseup',function(){
			jq('.solars').show();
		})
	},
	mod_radian:function(radian){
		radian=radian%(2*Math.PI);
		if(radian<0){
			radian=2*Math.PI+radian;
		}
		return radian;
	},
	get_dot_radian:function(dot,origin){
		/* params
			dot: a point
			origin: a point
		*/
		var s=this;
		var radian;
		origin=origin||{x:0,y:0};
		var hypotenuse=gv.get_distance(origin,dot);
		if(hypotenuse==0){
			return 0;
		}
		var opposite=origin.y-dot.y;
		var asin=Math.asin(opposite/hypotenuse);
		radian=asin;
		if(dot.x<origin.x){
			radian=Math.PI-asin;
		}
		if(dot.x>origin.x&&dot.y>origin.y){
			radian=Math.PI*2+asin;
		}
		radian=s.mod_radian(radian);
		return radian;
	},
	set_dot_radian:function(dot,radian,origin){
		/* params
			dot: a point
			origin: a point
		*/
		var s=this;
		origin=origin||{x:0,y:0};
		var hypotenuse=gv.get_distance(dot,origin);
		var opposite=hypotenuse*gv.sin(radian);
		var adjacent=hypotenuse*gv.cos(radian);
		dot.x=adjacent+origin.x;
		dot.y=-opposite+origin.y;
	},
	rotate_dot:function(dot,radian,origin){
		/* params
			origin: point
		*/
		var s=this;
		origin=origin||{x:0,y:0};
		var new_radian=s.get_dot_radian(dot,origin)+radian;
		s.set_dot_radian(dot,new_radian,origin);
	},
	rotate:function(radian){
		var s=this;

		s.radian+=radian;
		s.radian=s.mod_radian(s.radian);

		s.draw();
	},
	delete:function(){
		var s=this;
		s.dom.remove();
		Trape.prototype.trapes.splice(Trape.prototype.trapes.indexOf(s),1);
		s.count_solars();
	},


	show_lean_arrows:function(){
		var s=this;
		s.is_show_lean_arrows=true;
		s.draw();
	},
	hide_lean_arrows:function(){
		var s=this;
		s.is_show_lean_arrows=false;
		s.draw();
	},
	toggle_lean_arrows:function(){
		var s=this;
		if(s.is_show_lean_arrows){
			s.is_show_lean_arrows=false;
		}
		else{
			s.is_show_lean_arrows=true;
		}
		s.draw();
	},
	set_lean_radian:function(radian){
		var s=this;
		s.lean_radian=radian;
		s.draw();
	},
	bind_lean_arrows:function(){
		var s=this;
		s.dom.find('.lean_arrows .arrow').click(function(){
			s.lean_direction=jq(this).attr('data-direction');
			s.is_show_lean_arrows=false;
			s.draw();
		})
	},


	show_solar_lean_arrows:function(){
		var s=this;
		s.is_show_solar_lean_arrows=true;
		s.draw();
	},
	hide_solar_lean_arrows:function(){
		var s=this;
		s.is_show_solar_lean_arrows=false;
		s.draw();
	},
	toggle_solar_lean_arrows:function(){
		var s=this;
		if(s.is_show_solar_lean_arrows){
			s.is_show_solar_lean_arrows=false;
		}
		else{
			s.is_show_solar_lean_arrows=true;
		}
		s.draw();
	},
	set_solar_lean_radian:function(radian){
		var s=this;
		s.solar_lean_radian=radian;
		s.draw();
	},
	bind_solar_lean_arrows:function(){
		var s=this;
		s.dom.find('.solar_lean_arrows .arrow').click(function(){
			s.solar_lean_direction=jq(this).attr('data-direction');
			s.is_show_solar_lean_arrows=false;
			s.draw();
		})
	},


	set_solar_width:function(width){
		var s=this;
		s.solar_true_width=parseFloat(width);
		s.draw_solars();
	},
	set_solar_height:function(height){
		var s=this;
		s.solar_true_height=parseFloat(height);
		s.draw_solars();
	},
}
