function isnumber(obj) {
	if (obj=="")return false;
	var reg=/^\s*-?[0-9]+(\.?[0-9]+)*\s*$/;
	if (reg.test(obj)){
		return true;
	}
	return false;
}
function isinteger(numb) {
	return Math.floor(numb) === numb;
}
function tointeger(num1,num2) {
	var ret={num_1:0,num_2:0,times:0};
	if (isinteger(num1)&&isinteger(num2)){
		ret.num_1=num1;
		ret.num_2=num2;
		return ret;
	}
	while (!isinteger(num1)||!isinteger(num2)){
		++ret.times;
		num1*=10;
		num2*=10;
	}
	ret.num_1=num1;
	ret.num_2=num2;
	ret.times=Math.pow(10,ret.times);
	return ret;
}
function ys(num1,num2) {
	var k=tointeger(num1,num2);
	var add=(k.num_1+k.num_2)/k.times;
	var subtact=(k.num_1-k.num_2)/k.times;
	var multiply=(k.num_1*k.num_2)/(k.times*k.times);
	var divide=(k.num_1/k.num_2);
	var ans={add,subtact,multiply,divide};
	return ans;
}
function init() {
	var number1=document.getElementById("input1").value;
	var number2=document.getElementById("input2").value;
	if (isnumber(number1)&&isnumber(number2)){
		var result=ys(number1,number2);
		document.getElementById("demo1").innerHTML=result.add;
		document.getElementById("demo2").innerHTML=result.subtact;
		document.getElementById("demo3").innerHTML=result.multiply;
		document.getElementById("demo4").innerHTML=result.divide;
	}
	else {
		window.alert("请输入正确格式的数字");
		/*document.getElementById("demo1").innerHTML="0";
		document.getElementById("demo2").innerHTML="0";
		document.getElementById("demo3").innerHTML="0";
		document.getElementById("demo4").innerHTML="0";*/
	}
}