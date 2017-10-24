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
    for (i=6; i > 0; i--){
        inventory[i]=new Array(inventoryWidth)
        if (inventoryElement.insertAdjacentHTML) {
            var idName = "inventoryRow" + i;
            inventoryElement.insertAdjacentHTML('afterbegin', "<ul id=" + idName  +">");
            inventoryRow = document.getElementById(idName);
            console.log(inventoryRow);
            for (x= inventoryWidth; x > 0; x--){
                var data = '<li class="inventorySlot">' + x + '</li>';
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
}



//Making an inventory and filling each entry in the inventory with a NULL value
function updateInventory(){
    // console.log("Inventory Drawn");
    // inventoryElement = document.getElementById("inventory");
    // for (i=6; i > 0; i--){
    //     inventory[i]=new Array(inventoryWidth)
    //     if (inventoryElement.insertAdjacentHTML) {
    //         var idName = "inventoryRow" + i;
    //         inventoryElement.insertAdjacentHTML('afterbegin', "<ul id=" + idName  +">");
    //         inventoryRow = document.getElementById(idName);
    //         console.log(inventoryRow);
    //         for (x= inventoryWidth; x > 0; x--){
    //             var data = '<li class="inventorySlot">' + x + '</li>';
    //             if (x == 1){
    //                 inventoryElement.insertAdjacentHTML('afterbegin', "<br>");
    //             }
    //             inventoryRow.insertAdjacentHTML('afterbegin', data);
    //         }
    //         inventoryElement.insertAdjacentHTML('beforeend', "</ul>");
    //     }
    //     else {
    //         alert ("Your browser does not support the insertAdjacentHTML method! The inventory can not be drawn!");
    //     }
    //
    //     console.log(data);
    //     for (x = 0; x < inventoryWidth; x++){
    //         inventory[i][x]=null;
    //     }
    // }
}

console.log(inventory);
