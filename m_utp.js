/* MEMORY UTP */
var obrazy_utp = [];
function wylosuj_obrazy_utp(){
	var obraz;
	var numer;
	var czy_jest = 0;

	numer = Math.floor(Math.random()*10);
	obraz = "<img src = \"obrazy_utp/o"+numer+".png\" />";
	obrazy_utp.push(obraz);
	while( obrazy_utp.length < 20){
		
		numer = Math.floor(Math.random()*10);
		obraz = "<img src = \"obrazy_utp/o"+numer+".png\" />";
		for (i=0;i < obrazy_utp.length ; i++){
			if(obrazy_utp[i] == obraz) czy_jest++;
		}
		
		if(czy_jest >= 2){
			czy_jest = 0;
		}
		else{
			obrazy_utp.push(obraz);
		}
	}
}

function hover_kafelka_utp(nr){	
	document.getElementById(nr).style.color = "red";
	document.getElementById(nr).style.cursor = "pointer";
}
function opuszczenie_kafelka_utp(nr){
	document.getElementById(nr).style.color = "#8a0e0d";
}

function czysc(){
	document.getElementById("plansza").style.height = "";
	document.getElementById("plansza").style.padding = "";
	document.getElementById("plansza").style.border = "";
	document.getElementById("plansza").style.backgroundColor = "";
	document.getElementById("plansza").innerHTML = "";
	start();
}

function gratulacje_utp(){
	for(i=0;i<20;i++){
		obrazy_utp.pop();
	}
	document.getElementById("plansza").style.fontSize = "32px";
	document.getElementById("plansza").innerHTML = "<div class = \"gratki\">GRATULACJE!<br />Plansza UTP zdobyta!</div><div class = \"jeszcze_raz\" onclick = \"graj_utp_1()\">Jeszcze raz?</div><div class = \"menu\" onclick = \"czysc()\">Menu</div><div style = \"clear:both;\"></div>";
}

var id = []; 
var ukryte_kafelki = 0;
function sprawdz_kafelki_utp(nr){
	//zabezpieczenie przed ponownym klikniciem w ten sam kafelek - zablokowanie onclick-a
	id.push(nr);
	document.getElementById(id[0]).setAttribute("onclick",";");
	
	if( id.length == 2 ){
		//zablokowanie onclick-a 2 elementowi w tablicy
		document.getElementById(id[1]).setAttribute("onclick",";");
		//zablokowanie onclick-a pozostałym elementom tablicy
		for (i=0 ; i<20 ; i++){
			if( (i != id[0])&&(i != id[1])){
				document.getElementById(i).setAttribute("onclick",";");
			}
		}
		//ukryj kafelki jeżeli ich zawartość jest taka sama
		if(obrazy_utp[id[0]] == obrazy_utp[id[1]]){
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
		//odblokowanie onclick-a
		setTimeout(function(){
			for (i=0 ; i<20 ; i++){
				document.getElementById(i).setAttribute("onclick","zamien_kafelek_utp("+i+")");
			}
		},1000);
	}
	
	if(ukryte_kafelki == 10){
		setTimeout("gratulacje_utp()",1500);
		ukryte_kafelki = 0;
	}
	
}	

function zamien_kafelek_utp(nr){
	//przyporządkowuje obraz kafelkowi o pobranym id, z tablicy obrazów od id kafelka
	document.getElementById(nr).innerHTML = obrazy_utp[nr];
	sprawdz_kafelki_utp(nr);
	
}

function graj_utp_2(){
	wylosuj_obrazy_utp();
	var zawartosc_diva = "";
	document.getElementById("plansza").style.height = "340px";
	document.getElementById("start_utp").style.display = "none";
	document.getElementById("plansza").innerHTML = "";
	
	for(i=0; i<20; i++){
		zawartosc_diva += "<div class = \"kafelek_utp\" id = \""+i+"\" onmouseover = \"hover_kafelka_utp("+i+")\" onmouseout = \"opuszczenie_kafelka_utp("+i+")\" onclick = \"zamien_kafelek_utp("+i+")\" >?</div>";
		if ((i+1)%5 == 0) zawartosc_diva += "<div style =\"clear:both\"></div>"; 
	}
	document.getElementById("plansza").innerHTML = zawartosc_diva;
	
}

function graj_utp_1(){
	document.getElementById("plansza").style.height = "410px";
	document.getElementById("plansza").style.padding = "30px";
	document.getElementById("plansza").style.border = "4px solid #8a0e0d";
	document.getElementById("plansza").style.backgroundColor = "#dedede";
	var zawartosc_diva = "";
	
	for(i=0; i<20; i++){
		zawartosc_diva += "<div class = \"kafelek_utp\" >?</div>";
		if ((i+1)%5 == 0) zawartosc_diva += "<div style =\"clear:both\"></div>"; 
		var przycisk = "<input type = \"submit_utp\" value = \"Rozpocznij grę\" id = \"start_utp\" onclick = \"graj_utp_2()\" />";
	}
	
	zawartosc_diva += przycisk; 
	
	document.getElementById("plansza").innerHTML = zawartosc_diva;
}

function start(){
	var utp = "<div id = \"utp\" onclick = \"graj_utp_1()\" >UTP</div>";
	var kitty = "<div id = \"kitty\" onclick = \"graj_kitty_1()\" >Hello Kitty</div>";
	var pokemon = "<div id = \"pokemon\" onclick = \"graj_pokemon_1()\" >Pokemon</div>";
	document.getElementById("plansza").innerHTML = "<fieldset><legend>Wybierz plansze</legend>"+utp+kitty+pokemon+"</fieldset>";
}

window.onload = start;








