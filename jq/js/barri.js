
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
	},
	draw:function(){
		var s=this;

		s.dom.css('left',s.x+'px');
		s.dom.css('top',s.y+'px');
		s.dom.css('width',s.width+'px');
		s.dom.css('height',s.height+'px');
	},
}