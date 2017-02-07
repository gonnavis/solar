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
gv.point_in_polygon=function(point, vs) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
    
    var x = point[0], y = point[1];
    
    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];
        
        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    
    return inside;
}