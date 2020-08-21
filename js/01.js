var cnt=0;
function dianji(btn) {
	++cnt;
	if (cnt%2==0){
		document.getElementById("aud").play();
		btn.src="image/pause.png";
	}else {
		document.getElementById("aud").pause();
		btn.src="image/play.png"; 
	}
}