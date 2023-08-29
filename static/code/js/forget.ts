export const forget = function (inputs: any) {
  const targets = inputs;
  if (targets.length) {
    let x = targets.length;
    while (x--) {
      let y = targets[x].children.length;
      while (y--) targets[x].children[y].className = "";
    }
  } else {
    let x = targets.children.length;
    while (x--) {
      targets.children[x].className = "";
    }
  }
};
