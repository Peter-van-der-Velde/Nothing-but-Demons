var inventory = new Array(6);
var inventoryWidth = 10;
var inventoryElement = document.getElementById("inventory");
var data = '<p>HELLOS</p>';

//Toggle the visibility of the inventory
function toggleInventory(){
	console.log("Inventory opened");
	var inventory = document.getElementById("inventory");
	toggle(inventory);
}

//Making an inventory and filling each entry in the inventory with a NULL value
function updateInventory(){
	for (i=0; i < 6; i++){
		inventory[i]=new Array(inventoryWidth)
		if (inventoryElement.insertAdjacentHTML) {
			inventoryElement.insertAdjacentHTML('beforeend', "test");
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

console.log(inventory);