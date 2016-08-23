/*MEMORY HELLO KITTY*/
var obrazy_kitty = [];
function wylosuj_obrazy_kitty(){
	var obraz;
	var numer;
	var czy_jest = 0;
	numer = Math.floor(Math.random()*15);
	obraz = "<img src = \"obrazy_kitty/o"+numer+".png\" />";
	obrazy_kitty.push(obraz);
	while( obrazy_kitty.length < 30 ){
		
		numer = Math.floor(Math.random()*15);
		obraz = "<img src = \"obrazy_kitty/o"+numer+".png\" />";
		for (i=0;i < obrazy_kitty.length ; i++){
			if(obrazy_kitty[i] == obraz) czy_jest++;
		}
		
		if(czy_jest >= 2){
			czy_jest = 0;
		}
		else{
			obrazy_kitty.push(obraz);
		}
	}
}

function hover_kafelka_kitty(nr){	
	document.getElementById(nr).style.color = "red";
	document.getElementById(nr).style.cursor = "pointer";
}
function opuszczenie_kafelka_kitty(nr){
	document.getElementById(nr).style.color = "pink";
}

function czysc(){
	document.getElementById("plansza").style.height = "";
	document.getElementById("plansza").style.padding = "";
	document.getElementById("plansza").style.border = "";
	document.getElementById("plansza").style.backgroundColor = "";
	document.getElementById("plansza").innerHTML = "";
	start();
}

function gratulacje_kitty(){
	for(i=0;i<30;i++){
		obrazy_kitty.pop();
	}
	document.getElementById("plansza").style.fontSize = "32px";
	document.getElementById("plansza").innerHTML = "<div class = \"gratki\"> GRATULACJE!<br />Odkryto wszystkie Hello Kitty</div><div class = \"jeszcze_raz\" onclick = \"graj_kitty_1()\">Jeszcze raz?</div><div class = \"menu\" onclick = \"czysc()\">Menu</div><div style = \"clear:both;\"></div>";
	wylosuj_obrazy_kitty();
}

var id = [];
var ukryte_kafelki = 0;
function sprawdz_kafelki_kitty(nr){
	//zabezpieczenie przed ponownym klikniciem w ten sam kafelek
	id.push(nr);
	document.getElementById(id[0]).setAttribute("onclick",";");

	if( id.length == 2 ){
		document.getElementById(id[1]).setAttribute("onclick",";");
		for (i=0 ; i<30 ; i++){
			if( (i != id[0])&&(i != id[1])){
				document.getElementById(i).setAttribute("onclick",";");
			}
		}
		//ukryj kafelki jeżeli ich zawartość jest taka sama
		if(obrazy_kitty[id[0]] == obrazy_kitty[id[1]]){
			setTimeout(function(){
				document.getElementById(id[0]).style.visibility = "hidden";
				document.getElementById(id[1]).style.visibility = "hidden";
				id.pop();
				id.pop();			
			},1000);//1s
			ukryte_kafelki++;	
		}
		//przywróć kafelkom domyslny wyglą jeżeli ich zawartość jest różna
		else{
			setTimeout(function() {
				document.getElementById(id[0]).innerText = "?";
				document.getElementById(id[1]).innerText = "?";
				id.pop();
				id.pop();
			}, 1000); // 1s
		}
		
		setTimeout(function(){
			for (i=0 ; i<30 ; i++){
				document.getElementById(i).setAttribute("onclick","zamien_kafelek_kitty("+i+")");
			}
		},1000);
	}
	
	if(ukryte_kafelki == 15){
		setTimeout("gratulacje_kitty()",1500);
		ukryte_kafelki = 0;
	}
}	

function zamien_kafelek_kitty(nr){
	//przyporządkowuje obraz kafelkowi o pobranym id, z tablicy obrazów od id kafelka
	document.getElementById(nr).innerHTML = obrazy_kitty[nr];
	sprawdz_kafelki_kitty(nr);
	
}

function graj_kitty_2(){
	wylosuj_obrazy_kitty();
	var zawartosc_diva = "";
	document.getElementById("plansza").style.height = "430px";
	document.getElementById("start").style.display = "none";
	document.getElementById("plansza").innerHTML = "";
	for(i=0; i<30; i++){
		zawartosc_diva += "<div class = \"kafelek_kitty\" id = \""+i+"\" onmouseover = \"hover_kafelka_kitty("+i+")\" onmouseout = \"opuszczenie_kafelka_kitty("+i+")\" onclick = \"zamien_kafelek_kitty("+i+")\" >?</div>";
		if ((i+1)%6 == 0) zawartosc_diva += "<div style =\"clear:both\"></div>"; 
	}
	document.getElementById("plansza").innerHTML = zawartosc_diva;
	
}

function graj_kitty_1(){
	document.getElementById("plansza").style.height = "489px";
	document.getElementById("plansza").style.width = "510px";
	document.getElementById("plansza").style.padding = "30px";
	document.getElementById("plansza").style.border = "4px solid red";
	document.getElementById("plansza").style.backgroundColor = "#dedede";
	
	var zawartosc_diva = "";
	
	for(i=0; i<30; i++){
		zawartosc_diva += "<div class = \"kafelek_kitty\" >?</div>";
		if ((i+1)%6 == 0) zawartosc_diva += "<div style =\"clear:both\"></div>"; 
		var przycisk = "<input type = \"submit_kitty\" value = \"Rozpocznij grę\" id = \"start\" onclick = \"graj_kitty_2()\" />";
	}
	
	zawartosc_diva += przycisk; 
	document.getElementById("plansza").innerHTML = zawartosc_diva;
}