let canvas=document.getElementById("draw");
let ctx=canvas.getContext("2d");
let lWidth=4;
let undo=document.getElementById("undo");
autoSetSize(canvas);
setCanvasBg('white');
listenToUser(canvas);
getColor();
window.onbeforeunload=function(){
    return "Reload site?";
};
function setCanvasBg(color){
	ctx.fillStyle=color;
	ctx.fillRect(0,0,canvas.width,canvas.height);
	ctx.fillStyle="black";
}
function autoSetSize(canvas){
    canvasSetSize();
    function canvasSetSize(){
        let pageWidth=document.documentElement.clientWidth;
        let pageHeight=document.documentElement.clientHeight;
        canvas.width=pageWidth;
        canvas.height=pageHeight;
    }
    window.onresize=function(){
        canvasSetSize();
    };
}
function listenToUser(canvas){
	let painting=false;
	let lastPoint={x:undefined,y:undefined};
	canvas.onmousedown=function(e){
		this.firstDot=ctx.getImageData(0,0,canvas.width,canvas.height);
	    saveData(this.firstDot);
		painting=true;
		let x=e.clientX;
		let y=e.clientY;
		lastPoint={"x":x,"y":y};
		ctx.save();
		drawCircle(x,y,0);
	};
	canvas.onmousemove=function(e){
		if (painting){
			let x=e.clientX;
			let y=e.clientY;
			let newPoint={"x":x,"y":y};
			drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y,clear);
			lastPoint=newPoint;
		}
	};
	canvas.onmouseup=function(){
		painting=false;
	};
	canvas.mouseleave=function(){
        painting=false;
    };
}
function drawCircle(x,y,z){
	ctx.save();
	ctx.beginPath();
	ctx.arc(x,y,z,0,Math.PI*2);
	ctx.fill();
	if (clear){
		ctx.clip();
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.restore();
	}
}
function drawLine(x1,x2,y1,y2){
	ctx.lineWidth=lWidth;
	ctx.lineCap="round";
	ctx.lineJoin="round";
	if (clear) {
    	ctx.save();
    	ctx.globalCompositeOperation="destination-out";
    	ctx.moveTo(x1,y1);
		ctx.lineTo(x2,y2);
    	ctx.stroke();
    	ctx.closePath();
    	ctx.clip();
    	ctx.clearRect(0,0,canvas.width,canvas.height);
    	ctx.restore();
	}else {
		ctx.moveTo(x1,y1);
		ctx.lineTo(x2,y2);
		ctx.stroke();
		ctx.closePath();
	}
}
let eraser=document.getElementById("eraser");
let brush=document.getElementById("brush");
let clear=false;
eraser.onclick=function(){
	clear=true;
	this.classList.add("active");
    brush.classList.remove("active");
};
brush.onclick=function(){
    clear=false;
    this.classList.add("active");
    eraser.classList.remove("active");
};
let aColorBtn=document.getElementsByClassName("color-item");
let activeColor='black';
function getColor(){
	for (let i=0;i<aColorBtn.length;i++){
		aColorBtn[i].onclick=function(){
			for (let i=0;i<aColorBtn.length;i++){
				aColorBtn[i].classList.remove("active");
				this.classList.add("active");
				activeColor=this.style.backgroundColor;
				ctx.strokeStyle=activeColor;
			}
		}
	}
}
let reSetCanvas=document.getElementById("clear");
reSetCanvas.onclick=function(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
};
let range=document.getElementById("range");
range.onchage=function(){
	lWidth=this.value;
};
let save=document.getElementById("save");
save.onclick=function(){
	let imgUrl=canvas.toDataURL("image/png");
	let saveA=document.createElement("a");
	document.body.appendChild(saveA);
	saveA.href=imgUrl;
	saveA.download="zspic"+(new Date).getTime();
	saveA.target="_blank";
	saveA.click();
};
let historyData=[];
function saveData(data){
	(historyData.length===5)&&(historyData.shift());
	historyData.push(data);
}
undo.onclick=function(){
	if (historyData.length<1)return false;
	ctx.putImageData(historyData[historyData.length-1],0,0);
	historyData.pop();
};