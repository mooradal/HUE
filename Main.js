HEX = document.getElementById("HEX");
RGB = document.getElementById("RGB");
HSL = document.getElementById("HSL");

HEX.addEventListener("input", function() {
	ConvertHEX();
});

RGB.addEventListener("input",function() {
	ConvertRGB();	
});

HSL.addEventListener("input", function() {
	ConvertHSL();
});

function RGBtoHSL(r,g,b) {
	Rmin = r/255 
	Gmin = g/255
	Bmin = b/255
	max = Math.max(Rmin,Gmin,Bmin)
	min = Math.min(Rmin,Gmin,Bmin)
	L = Math.round(((max+min)/2)*100)
	if (max == min) {
		S = 0
		H = 0
	} else {
		if (L/100 < 0.5) {
			S = Math.round(((max-min)/(max+min))*100)
		} else if (L/100 > 0.5) {
			S = Math.round(((max-min)/(2.0-max-min))*100)
		}
		if (Rmin == max) {
			H = (Gmin-Bmin)/(max-min)
		} else if (Gmin == max) {
			H = 2.0 + (Bmin-Rmin)/(max-min)
		} else {
			H = 4.0 + (Rmin-Gmin)/(max-min)
		}
		H = Math.round(H*60)
		if (H < 0) {
			H+=360
		}
	}
	HSL.value = H+", "+S+"%, "+L+"%"
}

function ConvertHEX() {
	pureHex = "";
	if (HEX.value.includes("#")) {
		pureHex = HEX.value.slice(1);
	} else {
		pureHEX = HEX.value;
	}
	R = parseInt(pureHex.slice(0,2),16)
	G = parseInt(pureHex.slice(2,4),16)
	B = parseInt(pureHex.slice(4,6),16)
	RGB.value = R+", "+G+", "+B
	RGBtoHSL(R,G,B)
}

function ConvertRGB() {
	RGBList = RGB.value.replace(" ","").replace(" ","")
	RGBList = RGBList.split(",")
	R = RGBList[0];
	G = RGBList[1];
	B = RGBList[2];
	RGBtoHSL(R,G,B)

	HEX1 = parseInt(R).toString(16);
	HEX2 = parseInt(G).toString(16);
	HEX3 = parseInt(B).toString(16);

	HEX.value = "#"+HEX1+HEX2+HEX3
}

function ConvertHSL() {
	HSLList = HSL.value.replace("%","").replace("%","").replace(" ","").replace(" ","")
	HSLList = HSLList.split(",")
	H = HSLList[0];
	S = HSLList[1];
	L = HSLList[2];

	if (S == 0) {
		L = Math.round((L/100)*255)
		RGB.value = L+", "+L+", "+L
		L = parseInt(L).toString(16)
		HEX.value = "#"+L+L+L
	} else {
		if (L/100 < 0.5) {
			temp1 = L * (1.0+S)
		} else if (L/100 >= 0.5) {
			temp1 = L + S - L * S
		}
		temp2 = 2 * L - temp1
		H = H/360
		tempR = H + 0.333
		tempG = H
		tempB = H - 0.333
		
	}
}
/*
document.addEventListener("DOMContentLoaded", function(event){
	var reHexNum = {0: 0,1: 1,2: 2,3: 3,4: 4,5: 5,6: 6,7: 7,8: 8,9: 9,"A":10,"B": 11,"C": 12,"D": 13,"E":14,"F":15};
	var Hex = true;
	
	function copyHex() {
		prompt("Copy The Hex Value",HEXText.innerHTML);
  }

	function copyRGB() {
		prompt("Copy The RGB Value",RGBText.innerHTML);
	}

	function convert() {
		if (Hex == true) {toRGB();
  } else { toHex();}
}

	function func_Switch() {
		if (Hex == true) {
			Hex = false;
			current.innerHTML = "Type RGB value";
    } else {
			Hex = true;
			current.innerHTML = "Type Hex value";
    }
	}
	
  function toHex(){
	  var temp = input.value;
	    		
	  var R = parseInt(temp.slice(0,temp.search(",")));
		temp = temp.slice(temp.search(",")+1);
			 
   	var G = parseInt(temp.slice(0,temp.search(",")));
    temp = temp.slice(temp.search(",")+1);

    	var B = parseInt(temp);
    	RGBText.innerHTML = R+", "+G+", "+B;
    	var Rhex = R.toString(16);
    	var Ghex = G.toString(16);
    	var Bhex = B.toString(16);
    	if (Rhex.length < 2) {
    		Rhex = "0"+Rhex;
    	}
    	if (Ghex.length < 2) {
    		Ghex = "0"+Ghex;
    	}
    	if (Bhex.length < 2) {
    		Bhex = "0"+Bhex;
    	}
    	HEXText.innerHTML = "#"+Rhex+Ghex+Bhex;

    	if ( R < 131 && G < 131 && B < 131) {	
    		heading.style.color = "#FEFEFE";
    		current.style.color = "#FEFEFE";
		} else {
    		heading.style.color = "#232323";
    		current.style.color = "#232323";
    	}
    	if ((R > 255 || G > 255 || B > 255)) {
    		html.style.background = "#FEFEFE";
    		heading.style.color = "#232323";
    		current.style.color = "#232323";
    		HEXText.innerHTML = "#"+"------";
    		RGBText.innerHTML = "--, --, --";
    	}
    	else {html.style.background = "#"+Rhex+Ghex+Bhex;}
    	
    	if ((isNaN(R) || isNaN(G) || isNaN(B))) {
    		html.style.background = "#FEFEFE";
    		heading.style.color = "#232323";
    		current.style.color = "#232323";
    		RGBText.innerHTML = "--, --, --";
    		HEXText.innerHTML = "#"+"------";
    	}
    }
    
    function toRGB(){
    	var RGBlist = [];
    	var hexValue = input.value.toUpperCase();	
    	if (hexValue[0] == "#") {
    		hexValue = hexValue.slice(1,7);}
    		var Rhex = hexValue.slice(0,2);
    		var Ghex = hexValue.slice(2,4);
    		var Bhex = hexValue.slice(4,6);
    	
    	RGBlist.push((reHexNum[Rhex[0]]*16)+parseInt(reHexNum[Rhex[1]]),
    		(reHexNum[Ghex[0]]*16)+parseInt(reHexNum[Ghex[1]]),
    		(reHexNum[Bhex[0]]*16)+parseInt(reHexNum[Bhex[1]]));

    	RGBText.innerHTML = RGBlist[0]+", "+RGBlist[1]+", "+RGBlist[2];
    	HEXText.innerHTML = "#"+hexValue.toLowerCase();
		
    	if (RGBlist[0] < 100 && RGBlist[1] < 100 && RGBlist[2] < 100) {
    		heading.style.color = "#FEFEFE";
    		current.style.color = "#FEFEFE";
		} else {
    		heading.style.color = "#232323";
    		current.style.color = "#232323";}
		
		if (hexValue.length > 6) {
			html.style.background = "#FEFEFE";
    		heading.style.color = "#232323";
    		current.style.color = "#232323";
    		HEXText.innerHTML = "#------";
    		RGBText.innerHTML = "--, --, --";}
    	else {html.style.background = "#"+hexValue;}
       	if ((isNaN(RGBlist[0]) || isNaN(RGBlist[1]) || isNaN(RGBlist[2]))) {
	    		html.style.background = "#FEFEFE";
	    		heading.style.color = "#232323";
	    		current.style.color = "#232323";
    		RGBText.innerHTML = "--, --, --";
    		HEXText.innerHTML = "#"+"------";
    	}
	}

 	var input = document.getElementById("input");
  	var HEXText = document.getElementById("hexText");
  	var RGBText = document.getElementById("RGBText");
  	var switchButton = document.getElementById("type");
	var html = document.getElementsByTagName("html")[0];
	var heading = document.getElementById("Heading");
	var current = document.getElementById("Current");
  	input.addEventListener("input",convert);
  	switchButton.addEventListener("click",func_Switch,convert);
  	HEXText.addEventListener("click",copyHex);
  	RGBText.addEventListener("click",copyRGB);
});
*/