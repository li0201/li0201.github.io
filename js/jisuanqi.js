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
	document.getElementById("first").innerHTML=isnumber(number1);
	document.getElementById("second").innerHTML=isnumber(number2);
	if (isnumber(number1)&&isnumber(number2)){
		document.getElementById("demo").innerHTML=Number(number1)+Number(number2);
	}
	else document.getElementById("demo").innerHTML="0";
}