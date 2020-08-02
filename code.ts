// get selection
const selection = figma.currentPage.selection;

if (selection.length === 0) {
  figma.notify("No layers selected");
  figma.closePlugin();
}

// show UI
figma.showUI(__html__);

// UI callback
figma.ui.onmessage = (msg: message) => {
  if (msg.type === "resize") {
    const min = msg.min;
    const max = msg.max;

    selection.forEach((layer, index) => {
      const randomSize = getRandomInt(min, max);

      switch (msg.dimension) {
        case "w": {
          layer.resize(randomSize, layer.height);
          break;
        }
        case "h": {
          layer.resize(layer.width, randomSize);
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
const getRandomInt = (min: number, max: number) => {
  return Math.round(Math.random() * (max - min) + min);
};

type message = {
  type: "resize";
  dimension: string;
  max: number;
  min: number;
};
