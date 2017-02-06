
function Barri(parent,option){
	var s=this;
	Barri.prototype.barris.push(s);
	var option=option||{};
	s.dom=jq('.proto.barri_wrap').clone().removeClass('proto').show();
	s.x=option.x||450;
	s.y=option.y||450;
	s.width=100;
	s.height=100;
	s.init(parent);
}

Barri.prototype={
	barris:[],
	init:function(parent){
		var s=this;

		jq(parent).append(s.dom);

		s.draw();

		s.bind_barri();
		s.bind_handle();
	},
	draw:function(){
		var s=this;

		s.dom.css('left',s.x+'px');
		s.dom.css('top',s.y+'px');
		s.dom.css('width',s.width+'px');
		s.dom.css('height',s.height+'px');
	},
	bind_barri:function(){
		var s=this;
		var elem=s.dom.find('.barri');
		var startX = 0, startY = 0, x = 0, y = 0;

		var origin_x=0;
		var origin_y=0;

		elem.on('mousedown', function(e) {
			e.preventDefault();
			startX = e.pageX;
			startY = e.pageY;

			origin_x=s.x;
			origin_y=s.y;

			jq(document).on('mousemove', mousemove);
			jq(document).on('mouseup', mouseup);
		});

		function mousemove(e) {


			var mx=e.pageX-startX;
			var my=e.pageY-startY;

			s.x=origin_x+mx;
			s.y=origin_y+my;

			s.draw();
		}

		function mouseup() {
			jq(document).off('mousemove', mousemove);
			jq(document).off('mouseup', mouseup);
		}

	},
	bind_handle:function(){
		var s=this;
		var elem=s.dom.find('.handle');
		var startX = 0, startY = 0, x = 0, y = 0;

		var origin_width=0;
		var origin_height=0;

		elem.on('mousedown', function(e) {
			e.preventDefault();
			startX = e.pageX;
			startY = e.pageY;

			origin_width=s.width;
			origin_height=s.height;

			jq(document).on('mousemove', mousemove);
			jq(document).on('mouseup', mouseup);
		});

		function mousemove(e) {


			var mx=e.pageX-startX;
			var my=e.pageY-startY;

			s.width=origin_width+mx;
			s.height=origin_height+my;

			if(s.width<1){
				s.width=1;
			}
			if(s.height<1){
				s.height=1;
			}

			s.draw();
		}

		function mouseup(e) {
			jq(document).off('mousemove', mousemove);
			jq(document).off('mouseup', mouseup);
		}

	},
}