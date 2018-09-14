function Turnplate(config) {
	this.turnplate = config;
}
Turnplate.prototype = {
	consturctor: Turnplate,
	init: function(){
		this.defaults = {
			awardTitleSize: '16px',
			awardNameSize: '14px',
			awardColor: '#666',
			showAwardName: false,
			showAwardImg: false
		}
		// this.drawImg(this.turnplate)
		this.wheelcanvas = $("#"+ this.turnplate.canvasID);	
		this.drawTurnplate(this.turnplate);
	},
	drawTurnplate : function(turnplate) {
		var titleSize = turnplate.awardTitleSize || this.defaults.awardTitleSize,
			nameSize = turnplate.awardNameSize || this.defaults.awardNameSize,
			awardColor = turnplate.awardColor || this.defaults.awardColor,
			showAwardName = turnplate.showAwardName || this.defaults.showAwardName,
			canvas = turnplate.canvasID;
			var canvas = document.getElementById(canvas);    
			var centerPos = turnplate.turnplateRadius / 2; 
	  	if (canvas.getContext) {
		  	var ctx = canvas.getContext("2d");
		  	ctx.clearRect(0,0,turnplate.turnplateRadius,turnplate.turnplateRadius);
		  	ctx.strokeStyle = "#fff";
			ctx.font = '14px Microsoft YaHei';
		 	for(var i = 0; i < turnplate.awardList.length; i++) {
				var awardItem = turnplate.awardList[i];
				var angle = (turnplate.startAngle + awardItem.startAngel) * Math.PI / 180;
				var endAngle = (turnplate.startAngle + awardItem.endAngel) * Math.PI / 180;
			  	ctx.fillStyle = awardItem.background || "#fff";
			  	ctx.beginPath();
			  	ctx.arc(centerPos, centerPos, turnplate.outsideRadius, angle, endAngle, false);    
			  	ctx.arc(centerPos, centerPos, turnplate.insideRadius, endAngle, angle, true);
			  	ctx.stroke();  
			  	ctx.fill();
			  	ctx.save();
			  	ctx.fillStyle = awardColor;
			  	var title = awardItem.title;
			  	var line_height = 20;
			  	var centerAngle = (angle +endAngle)/2;
			    ctx.translate(centerPos + Math.cos(centerAngle) * turnplate.textRadius, centerPos + Math.sin(centerAngle) * turnplate.textRadius);
			  	ctx.rotate(centerAngle + Math.PI / 2);
			  	ctx.font = "bold "+titleSize+" Microsoft YaHei";
				ctx.fillText(title, -ctx.measureText(title).width / 2, 0.1 * line_height);
		  		if(turnplate.showAwardName){
		  			var prize = awardItem.name || '';
		  			ctx.font = nameSize+" Microsoft YaHei";
			  		ctx.fillText(prize, -ctx.measureText(prize).width / 2, 1 * line_height);
				  }
				  
			  	if(turnplate.showAwardImg){
					  	var imgMargin = turnplate.showAwardName ? 30 : 10;
					
						if(awardItem.id=="lottery1"){
							var img = document.getElementById(awardItem.id);
							img.onload = function() {
								ctx.drawImage(img,-25,imgMargin);
							}
							ctx.drawImage(img,-25,imgMargin);
						}
						if(awardItem.id=="lottery2"){
							var img = document.getElementById(awardItem.id);
							img.onload = function() {
							
								ctx.drawImage(img,-25,imgMargin);
							}
							ctx.drawImage(img,-25,imgMargin);
						}
						if(awardItem.id=="lottery3"){
							var img = document.getElementById(awardItem.id);
							img.onload = function() {
							
								ctx.drawImage(img,-25,imgMargin);
							}
							ctx.drawImage(img,-25,imgMargin);
						}
						if(awardItem.id=="lottery4"){
							var img = document.getElementById(awardItem.id);
							img.onload = function() {
								ctx.drawImage(img,-15,imgMargin);
							}
							ctx.drawImage(img,-15,imgMargin);
						}
						if(awardItem.id=="lottery5"){
							var img = document.getElementById(awardItem.id);
							img.onload = function() {
								ctx.drawImage(img,-25,imgMargin);
							}
							ctx.drawImage(img,-25,imgMargin);
						}
						if(awardItem.id=="lottery6"){
							var img = document.getElementById(awardItem.id);
							img.onload = function() {
								ctx.drawImage(img,-20,imgMargin);
							}
							ctx.drawImage(img,-20,imgMargin);
						}
						if(awardItem.id=="lottery7"){
							var img = document.getElementById(awardItem.id);
							img.onload = function() {
								ctx.drawImage(img,-25,imgMargin);
							}
							ctx.drawImage(img,-25,imgMargin);
						}
						if(awardItem.id=="lottery8"){
							var img = document.getElementById(awardItem.id);
							img.onload = function() {
								ctx.drawImage(img,-15,imgMargin);
							}
							ctx.drawImage(img,-15,imgMargin);
						}
			  	}
			  	ctx.restore();
			  }
			// var img= document.getElementById('ceshi');
			// ctx.drawImage(img,120/1.2,120/1.2,turnplate.outsideRadius*1.2,turnplate.outsideRadius*1.2);
			  // 空心
			ctx.beginPath();
			ctx.arc(centerPos,centerPos,turnplate.outsideRadius-14,0,360,false);
			ctx.lineWidth=28;
			ctx.strokeStyle="rgba(0,0,0,0.1)";
			ctx.stroke();//画空心圆
			ctx.closePath();        
	  	}
	},
	 drawImg(turnplate){
		var ele = '';
		for(var i = 0; i < turnplate.awardList.length; i++){
			var awardItem = turnplate.awardList[i];
			if(awardItem.urlImg){
				ele+='<img src="'+awardItem.urlImg+'" id="'+awardItem.id+'" class="hide" />'
			}
		}
        $('body').prepend(ele);
	},
	rotateFn: function (award,callback){
		var angles = parseFloat(award.endAngel + award.startAngel)/2 ;
		angles += parseFloat(this.turnplate.startAngle);
		if(angles<270){
			angles = 270 - angles; 
		}else{
			angles = 360 - angles + 270;
		}
		console.log(angles)
		this.wheelcanvas.stopRotate();
		this.wheelcanvas.rotate({
			angle:0,
			animateTo:angles+1800,
			duration:6000,
			easing:$.easing.easeInSine, 
			callback: function(){
				if (typeof callback === "function"){
					callback();
				}
			}
		});
	}
}