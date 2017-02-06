var gv={};
gv.radian_to_degree=function(radian){
	var degree=radian*180/Math.PI;
	return degree;
}
gv.degree_to_radian=function(degree){
	var radian=Math.PI*degree/180;
	return radian;
}
gv.get_distance=function(a,b){
	b=b||{x:0,y:0};
	return Math.sqrt(
			Math.pow((a.x-b.x),2)
			+Math.pow((a.y-b.y),2)
		)
}
gv.sin=function(radian){
	var r=Math.sin(radian);
	return r;
}
gv.cos=function(radian){
	var r=Math.cos(radian);
	return r;
}
gv.tan=function(radian){
	var r=Math.tan(radian);
	return r;
}