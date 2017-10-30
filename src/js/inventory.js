// "use strict"

var inventory = new Array(6);
var inventoryWidth = 10;
var inventoryElement = document.getElementById("inventory");
var inventoryRow = document.getElementById("inventoryRow");

//Toggle the visibility of the inventory
function toggleInventory() {
    console.log("Inventory opened");
    var inventory = document.getElementById("inventory");
    toggle(inventory);
}

/**
 * Draws inventory
 */
function drawInventory() {
    console.log("Inventory Drawn");
    console.log(inventoryElement);
    inventoryElement = document.getElementById("inventory");
    for (var i = 0; i < inventory.length; i++) {
        inventory[i] = new Array(inventoryWidth)
        for (var x = 0; x < inventoryWidth; x++) {
            inventory[i][x] = null;
        }
    }
    console.log(inventoryElement);
    console.log(inventory);
}

function updateInventory(item) {
    var inventoryElement = document.getElementById("inventory");
    var pickedUpItem = true;
    if (item.name == "iron shield"){
        var data = '<li class="inventorySlot"><img class="item" src="img/shield.png" alt="Shield"><img src="img/inventorySlot.png" alt="Inventory Slot"></li>';
    }
    else if(item.name == "diamond shield"){
        var data = '<li class="inventorySlot"><img class="item" src="img/diamondShield.png" alt="Diamond Shield"><img src="img/inventorySlot.png" alt="Inventory Slot"></li>';
    }

    console.log(item);
    console.log(inventory);
    while (pickedUpItem) {
        for (i = inventory.length - 1; i > 0; i--) {
            var idName = "inventoryRow" + i;
            inventoryRow = document.getElementById(idName);
            for (x = 0; x < inventoryWidth; x++) {
                //Hier moet je een single value uit het twee dimensionale array kunnen pakken
                console.log(inventory[i][x]);
                if (inventory[i][x] === null) {
                    console.log("Inserting item on slot : " + i + " - " + x);
                    inventory[i][x] = item;
                    inventoryRow.insertAdjacentHTML('afterbegin', data);
                    pickedUpItem = false;
                    break;
                }
                else { console.log("Value was not NULL"); }
            }
            if (pickedUpItem === false) {
                break;
            }
        }
    }
    console.log(inventory);
}

