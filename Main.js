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
	H = HSLList[0]/360;
	S = HSLList[1]/100;
	L = HSLList[2]/100;

	if (S == 0) {
		L = Math.round((L)*255)
		RGB.value = L+", "+L+", "+L
		L = parseInt(L).toString(16)
		HEX.value = "#"+L+L+L
	} else {
		if (L < 0.5) {
			temp1 = L * (1.0+S)
		} else if (L >= 0.5) {
			temp1 = L + S - L * S
		}
		temp2 = 2 * L - temp1
		tempR = H + 0.333
		tempG = H
		tempB = H - 0.333
		if (tempR < 0) {
			tempR ++;
		} else if (tempR > 1) {
			tempR --;
		}
		if (tempG < 0) {
			tempG ++;
		} else if (tempG > 1) {
			tempG --;
		}
		if (tempB < 0) {
			tempB ++;
		} else if (tempB > 1) {
			tempB --;
		}

		if (6*tempR < 1) {
			red = temp2+(temp1-temp2)*6*tempR
		} else if (2*tempR < 1) {
			red = temp1 
		} else if (3*tempR < 2) {
			red = temp2+(temp1-temp2)*(0.666-tempR)*6
		} else {
			red = temp2
		}
		
		if (6*tempG < 1) {
			green = temp2+(temp1-temp2)*6*tempG
		} else if (2*tempG < 1) {
			green = temp1 
		} else if (3*tempG < 2) {
			green = temp2+(temp1-temp2)*(0.666-tempG)*6
		} else {
			green = temp2
		}
		
		if (6*tempB < 1) {
			blue = temp2+(temp1-temp2)*6*tempB
		} else if (2*tempB < 1) {
			blue = temp1 
		} else if (3*tempB < 2) {
			blue = temp2+(temp1-temp2)*(0.666-tempB)*6
		} else {
			blue = temp2
		}
		
		red = Math.round(red*255)
		green = Math.round(green*255)
		blue = Math.round(blue*255)
		RGB.value = red+", "+green+", "+blue

		HEX1 = parseInt(red).toString(16);
		HEX2 = parseInt(green).toString(16);
		HEX3 = parseInt(blue).toString(16);
	
		HEX.value = "#"+HEX1+HEX2+HEX3

	}
}
