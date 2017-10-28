var inventoryHasBeenDrawn = false;
var waveNumber = 1;
var resolution = "";
var e = document.getElementById("selectResolution");
document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        var setResolutions = {
            '1920px,1080px' : '1920 x 1080',
            '1280px,720px' : '1280 x 720',
            '720px,576px' : '720 x 576',
            '720px,480px' : '720 x 480'
        };
        var select = document.getElementById("selectResolution");
        for(index in setResolutions){
            select.options[select.options.length] = new Option(setResolutions[index], index);
        }
        console.log(" - Resolutions filled in");

        var savedMenuWidth = localStorage.getItem('menuWidth');
        var savedMenuHeight = localStorage.getItem('menuHeight');
        var savedSelectedIndex = localStorage.getItem('selectedIndex');

        var temp = document.getElementById('menuID');
        // var e = document.getElementById("selectResolution");
        if(savedMenuWidth == ""){
            setOnce();
            console.log("Initial setup");
        }
        else{
            console.log("Height and width loaded from memory at : " + savedMenuWidth + " " + savedMenuHeight);
            temp.style.width = savedMenuWidth;
            temp.style.height = savedMenuHeight;
            console.log(savedSelectedIndex);
            e.value = savedSelectedIndex;
        }
        //checkCookie();
    }
	
}


function waveDisplay(){
    var waveContainer = document.getElementById("waveDisplay");
    var completeMessage = "<h2 class='waveComplete'>Wave complete!</h2>";
    var data = "<h2 class='itemPickUp'>Wave : " + waveNumber + "</h2>";
	var amountOfEnemies = Math.floor((Math.random() * 5) + waveNumber);
	setTimeout(function(){
		if(waveNumber != 1){
			waveContainer.insertAdjacentHTML('afterbegin', completeMessage);
		}
		setTimeout(function(){
			waveContainer.innerHTML = "";
			waveContainer.insertAdjacentHTML('afterbegin', data);
			waveNumber = waveNumber +1;
			setTimeout(function(){
				waveContainer.innerHTML = "";
				for (i = 0; i < amountOfEnemies; i++){
					var x = Math.floor((Math.random() * 10));
					var z = Math.floor((Math.random() * 10));
					newWave("peter", x, -z);
				}
				enemies.forEach(function(enemy) {
					testLevel.add(enemy.mesh);
				}, this);
			}, 10000);
		}, 3000);
	}, 1000);
}

function newWave(enemyName, x, z){
	this.enemyName = new CubeEnemy(scene = window.scene);
	this.enemyName.mesh.position.set(x, 1, z);
	// this.blockEnemy = new CubeEnemy(scene = window.scene);
	// this.blockEnemy2 = new CubeEnemy(scene = window.scene);
	// this.blockEnemy2.mesh.position.set(4, 1, -4);
	// this.blockEnemy3 = new CubeEnemy(scene = window.scene);
	// this.blockEnemy3.mesh.position.set(-4, 1, -4);
}

function broadcastPickUp(item){
    var chatWindow = document.getElementById("chatWindow");
    chatWindow.insertAdjacentHTML('beforeend', "<p class='itemPickUp'>Picked up an : " + item + "</p>" );
    setTimeout(function(){
        chatWindow.innerHTML = "";
    }, 10000);
}



function toggleMenu(){
    var menu = document.getElementById("menuID");
    var pausedMenu = document.getElementById("pausedMenu");
    console.log(pausedMenu);
    if(menu.style.display == "block"){
        //Closes the options menu and opens the pausedmenu when ESC is pressed
        menu.style.display = "none";
        pausedMenu.style.display = "block";
    }
    else if(pausedMenu.style.display == "none"){
        //Open the options menu with the press of ESC
        console.log("block");
        pausedMenu.style.display = "block";
        var openMenu = new Audio('src/audio/openMenu.wav');
        openMenu.volume = 0.1;
        openMenu.play();
    }
    else if(pausedMenu.style.display == "block"){
        //Closes the options menu with the press of ESC
        console.log("none");
        pausedMenu.style.display = "none";
    }
}

function toggle(element){
	if(element.style.display == "block"){
		element.style.display = "none";
	}
	else if(element.style.display == "none"){
		element.style.display = "block";
	}
}

function keypressTest(keyCode){
	switch(keyCode){
		case 27: //ESC
			toggleMenu();
			break;
		case 73: //i
			toggleInventory();
			if (!inventoryHasBeenDrawn){
                drawInventory();
                inventoryHasBeenDrawn = true;
            }
			break;
		default:
			console.log("No trigger put on key " + keyCode + " (" + String.fromCharCode(keyCode) + ")");
			break;
	}
}

//toggleMenuItems
function toggleMenuItems() {
    var video = document.getElementById("video");
    var videoItems = document.getElementById("videoItems");
    var sound = document.getElementById("sound");
    var soundItems = document.getElementById("soundItems");
    var keybind = document.getElementById("keybind");
    var keybindItems = document.getElementById("keybindItems");
    video.onclick = function () {
        videoItems.style.display = "block";
        soundItems.style.display = "none";
        keybindItems.style.display = "none";
    };
    sound.onclick = function () {
        videoItems.style.display = "none";
        soundItems.style.display = "block";
        keybindItems.style.display = "none";
    };
    keybind.onclick = function () {
        videoItems.style.display = "none";
        soundItems.style.display = "none";
        keybindItems.style.display = "block";
    };
}

//Sets resolution for the first time
function setOnce(){
    var savedMenuWidth = localStorage.getItem('menuWidth');
    var savedMenuHeight = localStorage.getItem('menuHeight');
    console.log("Saved values : " + savedMenuWidth + savedMenuHeight);

    var temp = document.getElementById('menuID');
    var menuHeight = window.getComputedStyle(temp).getPropertyValue("height")
    var menuWidth = window.getComputedStyle(temp).getPropertyValue("width")

    console.log("setOnce() Height : " + menuHeight + ", Width : " + menuWidth);

    var e = document.getElementById("selectResolution");
    resolution = e.options[e.selectedIndex].value;
    console.log("setOnce() Resolution : " + resolution);
    var splitResolution = resolution.split(',');
    console.log(splitResolution);
    menuWidth = splitResolution[0];
    menuHeight = splitResolution[1];
    console.log("setOnce() Height : " + menuHeight + ", Width : " + menuWidth);
    setVolume();
}

function setVolume(){
    var backgroundPlayer = document.getElementById('backgroundPlayer');
    localStorage.setItem('lorem', valueOutputId.value/100);
    var lorem = localStorage.getItem('lorem');
    console.log(lorem);
    backgroundPlayer.volume = lorem;
    /*var savedSelectedBGVolume = localStorage.getItem('selectedBGVolume');
    backgroundPlayer.volume = valueOutputId.value / 100;
    if(savedSelectedBGVolume == ""){
        localStorage.setItem('selectedBGVolume', 50);
        console.log("SavedBGVolume was empty, filled it with" + savedSelectedBGVolume);
    }
    else{
        localStorage.setItem('selectedBGVolume', backgroundPlayer.volume);
        savedSelectedBGVolume = localStorage.getItem('selectedBGVolume');
        backgroundPlayer.volume = savedSelectedBGVolume;
    }*/
}


//Update values
function applyChanges(){
    setVolume();
    var temp = document.getElementById('menuID');
    var menuHeight = window.getComputedStyle(temp).getPropertyValue("height");
    var menuWidth = window.getComputedStyle(temp).getPropertyValue("width");
    var e = document.getElementById("selectResolution");
    resolution = e.options[e.selectedIndex].value;
    var splitResolution = resolution.split(',');
    menuWidth = splitResolution[0];
    menuHeight = splitResolution[1];
    localStorage.setItem('menuWidth', menuWidth);
    localStorage.setItem('menuHeight', menuHeight);
    localStorage.setItem('selectedIndex', resolution);
    resolution = menuWidth + "," + menuHeight;

    window.location.reload(true);
}

//toggleMute
function toggleMute() {
    var unmuteButton = document.getElementById("unmutedButton");
    var muteButton = document.getElementById("mutedButton");
    if(unmuteButton.style.display == "none"){
        unmuteButton.style.display = "block";
        muteButton.style.display = "none";
        document.getElementById('backgroundPlayer').muted = false;
    }
    else{
        unmuteButton.style.display = "none";
        muteButton.style.display = "block";
        document.getElementById('backgroundPlayer').muted = true;
    }
}

function changeOpacity(){
    //<!-- var opacity = document.getElementById('wrapper'); -->
    //<!-- var temp = window.getComputedStyle(opacity).getPropertyValue("opacity"); -->
    //<!-- console.log(temp); -->
    var temp = document.getElementById('wrapper');
    var temp2 = window.getComputedStyle(temp).getPropertyValue("background-color");
    console.log(temp2);
    if(temp2 == "rgba(0, 0, 0, 0.1)"){
        temp.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
    }
    else if(temp2 == "rgba(0, 0, 0, 0.9)"){
        temp.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
    }
}
