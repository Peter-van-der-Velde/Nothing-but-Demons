
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
    drawInventory();
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
		case 27:
			toggleMenu();
			break;
		case 73:
			toggleInventory();
			updateInventory();

			break;
		default:
			//console.log("No trigger put on key " + keyCode + " (" + String.fromCharCode(keyCode) + ")");
			break;
	}
}

//toggleMenu
document.onkeydown = (e) => {
    e = e || window.event;


}

// function toggleOptionsMenu(lorem) {
    // var menu = document.getElementById("menuID");
    // var pausedMenu = document.getElementById("pausedMenu");
    // var wrapper = document.getElementById("wrapper");
    // var button1 = document.getElementById("button1");
    // var button2 = document.getElementById("button2");
    // var button3 = document.getElementById("button3");
    // if (lorem == "resume"){
        // console.log("Resuming");
        // pausedMenu.style.display = "none";
        // menu.style.display = "none";
        // wrapper.style.opacity = "1";
        // wrapper.style.backgroundColor = "transparent";
        // button1.style.display = "block";
        // button2.style.display = "block";
        // button3.style.display = "block";
    // }
    // else if(pausedMenu.style.display == "block"){
        // pausedMenu.style.display = "none";
        // menu.style.display = "block";
    // }
    // else if(menu.style.display == "block"){
        // pausedMenu.style.display = "block";
        // menu.style.display = "none";
    // }
    // else{
        // pausedMenu.style.display = "none";
        // menu.style.display = "none";
        // console.log("Something went wrong with toggling menu items");
    // }
// }

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
