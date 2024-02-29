"use strict";
// get selection
const selection = figma.currentPage.selection;
if (selection.length === 0) {
    figma.notify("No layers selected");
    figma.closePlugin();
}
// show UI
figma.showUI(__html__);
// UI callback
figma.ui.onmessage = (msg) => {
    if (msg.type === "resize") {
        const min = msg.min;
        const max = msg.max;
        selection.forEach((node) => {
            if (!('resize' in node)) {
                return;
            }
            const randomSize = getRandomInt(min, max);
            switch (msg.dimension) {
                case "w": {
                    node.resize(randomSize, node.height);
                    break;
                }
                case "h": {
                    node.resize(node.width, randomSize);
                    break;
                }
                case "both": {
                    const randomSize2 = getRandomInt(min, max);
                    node.resize(randomSize, randomSize2);
                    break;
                }
                default:
                    throw "Exception";
            }
        });
    }
    figma.closePlugin();
};
// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
const getRandomInt = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
};
