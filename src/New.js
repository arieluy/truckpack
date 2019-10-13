const myState = {
    truck: { length: 480, width: 192, height: 168, items: [] },
    items: [
        {
            length: 100,
            width: 100,
            height: 100,
            x: 13,
            y: 359,
            z: 10,
            name: "item",
            color: "grey",
            stackable: true
        }
    ],
    selectedIndex: 0,
    collidesList: [false],
    inventory: [],
    stacks: []
};
export { myState };
