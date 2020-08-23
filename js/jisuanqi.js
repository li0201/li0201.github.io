function isnumber(obj) {
	if (obj=="")return false;
	var reg=/^[0-9]+.?[0-9]*$/;
	if (reg.test(obj)){
		return true;
	}
	return false;
}
function init() {
	var number1=document.getElementById("input1").value;
	var number2=document.getElementById("input2").value;
	if (isnumber(number1)&&isnumber(number2)){
		document.getElementById("demo1").innerHTML=Number(number1)+Number(number2);
		document.getElementById("demo2").innerHTML=Number(number1)-Number(number2);
		document.getElementById("demo3").innerHTML=Number(number1)*Number(number2);
		document.getElementById("demo4").innerHTML=Number(number1)/Number(number2);
	}
	else {
		document.getElementById("demo1").innerHTML="0";
		document.getElementById("demo2").innerHTML="0";
		document.getElementById("demo3").innerHTML="0";
		document.getElementById("demo4").innerHTML="0";
	}
}