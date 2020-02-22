/*
 * truckpack.js
 * Manages the list of items for the truck packer.
 */


export class Item {
    constructor(name, width, length, height, x, y, color, stackable) {
        this.width = width;
        this.length = length;
        this.height = height;

        this.rotated = false;

        this.x = x;
        this.y = y;
        this.z = 0;

        this.name = name;

        this.color = color;
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

class StackedItem extends Item {
    constructor(item1, item2) {
        super(item1.name+"+"+item2.name,
                   Math.max(item1.width, item2.width),
                   Math.max(item1.length, item2.length), 
                   item1.height + item2.height,
                   item2.x,
                   item2.y,
                   item1.color,
                   false);
        this.item1 = item1;
        this.item2 = item2;
        // TODO possibly need to update z position of something
    }

    unstack() {
        // update item1, item2 original positions to be current pos
        this.item1.updateLocation(this.x, this.y);
        this.item2.updateLocation(this.x, this.y);
        // return original items
        return {item1: this.item1, 
                item2: this.item2};
    }
}

export class ItemManager {
    constructor(truckX, truckY, truckZ) {
        this.itemList = [];
        this.truckX = truckX;
        this.truckY = truckY;
        this.truckZ = truckZ;
        this.collidesList = [];
        this.inventory = {};
    }

    // Check if two items intersecting
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

    // Updates the dimensions of the truck.
    updateTruckDims(x, y, z) {
        this.truckX = x;
        this.truckY = y;
        this.truckZ = z;
    }

    // Adds an item to the truck and checks it for collisions.
    addItem(item) {
        this.itemList.push(item);
        this.collidesList.push(false);
        this.checkItemForCollisions(this.itemList.length - 1);
        // add to inventory
        if (!(item.name in this.inventory)) {
            this.inventory[item.name] = item;
        }
    }

    // Removes an item from the ItemManager.
    removeItem(index) {
        this.itemList.splice(index, 1);
    }

    // Updates the location of an item at a particular index. 
    updateItem(index, newX, newY) {
        this.itemList[index].updateLocation(newX, newY);
        this.checkItemForCollisions(index);
    }

    // Checks a certain item for collisions against all other items
    checkItemForCollisions(index) {
        console.log("checking for collisions");
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
        console.log(this.collidesList);
    }

    // Stacks two items and adds the new StackedItem to the list.
    stackItems(index1, index2) {
        console.log("stacking items");
        let item1 = this.itemList[index1];
        let item2 = this.itemList[index2];

        // check if items can be stacked 
        // would new item exceed height?
        if (item1.z + item1.height + item2.height > this.truckZ) {
            return null;
        }
        // create new item
        let stackedItem = new StackedItem(item1, item2);
        // take old items out of the list and replace with new stacked item
        console.log(this.itemList);
        this.removeItem(index1);
        // need to do some extra logic to remove right index
        if (index2 > index1) {
            // will have shifted by 1
            this.removeItem(index2 - 1);
        } else {
            this.removeItem(index2)
        }
        this.addItem(stackedItem);
        console.log(this.itemList);
    }

    unstackItems(stackedIndex) {
        // get the stacked item
        let stackedItem = this.itemList[stackedIndex];
        console.log(stackedItem);
        let items = stackedItem.unstack();
        this.removeItem(stackedIndex);
        this.addItem(items.item1);
        this.addItem(items.item2);
    }

};
