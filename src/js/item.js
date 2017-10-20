
/**
 * an basic item class
 * @param {string} name name of said item 
 * @param {number} value the monetary value of this item
 * @param {THREE.Mesh} mesh the mesh of this item
 */
class Item {

    constructor (name, value, mesh) {
        this.name = name;
        this.value = value;
        this.mesh = mesh;
        this.id = name + items.length;
    }
}