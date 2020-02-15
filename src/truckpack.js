/*
 * truckpack.js
 * Manages the list of items for the truck packer.
 */


class Item {
    constructor(name, width, length, height, x, y, color, stackable) {
        this.width = width;
        this.length = length;
        this.height = height;

        this.rotated = false;

        this.x = x;
        this.y = y;
        this.z = 0;

        this.name = name;
        this.stackable = stackable;
    }

    updateLocation(x, y) {
        this.x = x;
        this.y = y;
    }

    updateZPosition(z) {
        this.z = z;
    }

    rotate() {
        this.rotated = !this.rotated;
    }
};

class ItemManager {
    constructor(truckX, truckY, truckZ) {
        this.itemList = [];
        this.truckX = truckX;
        this.truckY = truckY;
        this.truckZ = truckZ;
        this.collidesList = [];
    }

    _intersect(item1, item2) {
        return !(
            item2.x > item1.x + item1.width ||
            item2.x + item2.width < item1.x ||
            item2.y > item1.y + item1.length ||
            item2.y + item2.length < item1.y
        );
    }

    // Moves the item to a new index and checks it for collisions
    // against all other items.
    moveItemAtIndex(index, x, y) {
        this.itemList[index].updateLocation(x, y);
        this.checkItemForCollisions(index);
    }

    updateTruckDims(x, y, z) {
        this.truckX = x;
        this.truckY = y;
        this.truckZ = z;
    }

    addItem(item) {
        this.itemList.push(item);
        this.collidesList.push(false);
        this.checkItemForCollisions(this.itemList.length - 1);
    }

    removeItem(index) {
        this.itemList.splice(index, 1);
    }

    updateItem(index, newX, newY) {
        this.itemList[index].updateLocation(newX, newY);
    }

    // Checks a certain item for collisions against all other items
    checkItemForCollisions(index) {
        let item1 = this.itemList[index];
        let collided = false;
        for (let i = 0; i < this.itemList.length; i++) {
            let item2 = this.itemList[i];
            if (i !== index && this._intersect(item1, item2)) {
                // items collide
                this.collidesList[i] = true;
                collided = true;
            }
            else if (i !== index) {
                this.collidesList[i] = false;
            }
        }
        this.collidesList[index] = collided;
    }

};

module.exports = {
    Item: Item,
    ItemManager: ItemManager
};
