/*MEMORY POKEMON*/
var obrazy_pokemon = [];
function wylosuj_obrazy_pokemon(){
	var obraz;
	var numer;
	var czy_jest = 0;

	numer = Math.floor(Math.random()*21);
	obraz = "<img src = \"obrazy_pokemon/o"+numer+".png\" />";
	obrazy_kitty.push(obraz);
	while( obrazy_pokemon.length < 42 ){
		
		numer = Math.floor(Math.random()*21);
		obraz = "<img src = \"obrazy_pokemon/o"+numer+".png\" />";
		for (i=0;i < obrazy_pokemon.length ; i++){
			if(obrazy_pokemon[i] == obraz) czy_jest++;
		}
		
		if(czy_jest >= 2){
			czy_jest = 0;
		}
		else{
			obrazy_pokemon.push(obraz);
		}
	}
}

function hover_kafelka_pokemon(nr){	
	document.getElementById(nr).style.color = "red";
	document.getElementById(nr).style.cursor = "pointer";
}
function opuszczenie_kafelka_pokemon(nr){
	document.getElementById(nr).style.color = "#fbbc05";
}

function czysc(){
	document.getElementById("plansza").style.height = "";
	document.getElementById("plansza").style.width = "";
	document.getElementById("plansza").style.padding = "";
	document.getElementById("plansza").style.border = "";
	document.getElementById("plansza").style.backgroundColor = "";
	document.getElementById("plansza").innerHTML = "";
	start();
}

function gratulacje_pokemon(){
	for(i=0;i<42;i++){
		obrazy_pokemon.pop();
	}
	document.getElementById("plansza").style.fontSize = "32px";
	document.getElementById("plansza").innerHTML = "<div class = \"gratki\"> GRATULACJE!<br />Masz już wszytskie Pokemony</div><div class = \"jeszcze_raz\" onclick = \"graj_pokemon_1()\">Jeszcze raz?</div><div class = \"menu\" onclick = \"czysc()\">Menu</div><div style = \"clear:both;\"></div>";
}

var id = [];
var ukryte_kafelki = 0;
function sprawdz_kafelki_pokemon(nr){
	
	//zabezpieczenie przed ponownym klikniciem w ten sam kafelek
	id.push(nr);
	document.getElementById(id[0]).setAttribute("onclick",";");
	if(id[0] == id[1]){
		id.pop();
	}
	
	if( id.length == 2 ){
		document.getElementById(id[1]).setAttribute("onclick",";");
		for (i=0 ; i<42 ; i++){
			if( (i != id[0])&&(i != id[1])){
				document.getElementById(i).setAttribute("onclick",";");
			}
		}
		//ukryj kafelki jeżeli ich zawartość jest taka sama
		if(obrazy_pokemon[id[0]] == obrazy_pokemon[id[1]]){
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
			for (i=0 ; i<42 ; i++){
				document.getElementById(i).setAttribute("onclick","zamien_kafelek_pokemon("+i+")");
			}
		},1000);
	}
	
	if(ukryte_kafelki == 21){
		setTimeout("gratulacje_pokemon()",1500);
		ukryte_kafelki = 0;
	}
}	

function zamien_kafelek_pokemon(nr){
	//przyporządkowuje obraz kafelkowi o pobranym id, z tablicy obrazów od id kafelka
	document.getElementById(nr).innerHTML = obrazy_pokemon[nr];
	sprawdz_kafelki_pokemon(nr);
	
}

function graj_pokemon_2(){
	wylosuj_obrazy_pokemon();
	var zawartosc_diva = "";
	document.getElementById("plansza").style.height = "500px";
	document.getElementById("start").style.display = "none";
	document.getElementById("plansza").innerHTML = "";
	for(i=0; i<42; i++){
		zawartosc_diva += "<div class = \"kafelek_pokemon\" id = \""+i+"\" onmouseover = \"hover_kafelka_pokemon("+i+")\" onmouseout = \"opuszczenie_kafelka_pokemon("+i+")\" onclick = \"zamien_kafelek_pokemon("+i+")\" >?</div>";
		if ((i+1)%7 == 0) zawartosc_diva += "<div style =\"clear:both\"></div>"; 
	}
	document.getElementById("plansza").innerHTML = zawartosc_diva;
	
}

function graj_pokemon_1(){
	document.getElementById("plansza").style.height = "560px";
	document.getElementById("plansza").style.width = "590px";
	document.getElementById("plansza").style.padding = "30px";
	document.getElementById("plansza").style.border = "4px solid #fbbc05";
	document.getElementById("plansza").style.backgroundColor = "#dedede";
	

	var zawartosc_diva = "";
	
	for(i=0; i<42; i++){
		zawartosc_diva += "<div class = \"kafelek_pokemon\" >?</div>";
		if ((i+1)%7 == 0) zawartosc_diva += "<div style =\"clear:both\"></div>"; 
		var przycisk = "<input type = \"submit_pokemon\" value = \"Rozpocznij grę\" id = \"start\" onclick = \"graj_pokemon_2()\" />";
	}
	
	zawartosc_diva += przycisk; 
	
	document.getElementById("plansza").innerHTML = zawartosc_diva;
	
}
/*KONIEC MEMORY POKEMON*/