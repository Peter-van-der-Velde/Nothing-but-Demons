var inventory = new Array(6);
var inventoryWidth = 10;
var inventoryElement = document.getElementById("inventory");
var inventoryRow = document.getElementById("inventoryRow");

//Toggle the visibility of the inventory
function toggleInventory(){
    console.log("Inventory opened");
    var inventory = document.getElementById("inventory");
    toggle(inventory);
}

function drawInventory(){
    console.log("Inventory Drawn");
    inventoryElement = document.getElementById("inventory");
    for (i = 0; i < inventory.length; i++){
        inventory[i] = new Array(inventoryWidth)
        if (inventoryElement.insertAdjacentHTML) {
            var idName = "inventoryRow" + i;
            inventoryElement.insertAdjacentHTML('afterbegin', "<ul id=" + idName  +">");
            inventoryRow = document.getElementById(idName);
            console.log(inventoryRow);
            for (x = inventoryWidth; x > 0; x--){
                var data = '<li class="inventorySlot"><img src="img/inventorySlot.png" alt="Inventory Slot"></li>';
                if (x == 1){
                    inventoryElement.insertAdjacentHTML('afterbegin', "<br>");
                }
                inventoryRow.insertAdjacentHTML('afterbegin', data);
            }
            inventoryElement.insertAdjacentHTML('beforeend', "</ul>");
        }
        else {
            alert ("Your browser does not support the insertAdjacentHTML method! The inventory can not be drawn!");
        }

        console.log(data);
        for (x = 0; x < inventoryWidth; x++){
            inventory[i][x]=null;
        }
    }
    console.log(inventory);
}

function updateInventory(item){
    var inventoryElement = document.getElementById("inventory");
    var pickedUpItem = true;
    var data = '<li class="inventorySlot"><img class="item" src="img/shield.png" alt="Shield"><img src="img/inventorySlot.png" alt="Inventory Slot"></li>';
    console.log(item);
    console.log(inventory);
    while(pickedUpItem){
        for (i = inventory.length -1; i > 0; i--) {
            var idName = "inventoryRow" + i;
            inventoryRow = document.getElementById(idName);
            for (x = 0; x < inventoryWidth; x++) {
                //Hier moet je een single value uit het twee dimensionale array kunnen pakken
                console.log(inventory[i][x]);
                if (inventory[i][x] === null){
                    console.log("Inserting item on slot : " + i + " - " + x);
                    inventory[i][x] = item;
                    inventoryRow.insertAdjacentHTML('afterbegin', data);
                    pickedUpItem = false;
                    break;
                }
                else{console.log("Value was not NULL");}
            }
            if(pickedUpItem === false){
                break;
            }
        }
    }
    console.log(inventory);
}

