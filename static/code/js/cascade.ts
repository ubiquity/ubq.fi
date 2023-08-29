import { isArrayLike } from "./is-array-like";
import { outer } from "./outer";
import { textCascader } from "./text-cascader";

export function cascade({ self, elements, speed, classname, foreach }: { self: HTMLElement; elements: any; speed: any; classname: any; foreach: any; }) {
  if (!elements) return false;
  if (!classname) classname = "Active";
  if (!speed) speed = 1000 / 16;
  if (!isArrayLike(elements)) elements = [elements];
  let x = -1;
  const xx = elements.length;
  while (++x < xx) {
    if (elements[x].length !== void 0) {
      //   DOM List of elements
      let y = -1;
      const yy = elements[x].length;
      while (++y < yy) {
        if (!elements[x][y].children.length) textCascader(elements[x][y]);
        outer({
          q: elements[x][y].children,
          amount: elements[x][y].children.length,
          classname: classname,
          speed: speed,
          index: -1,
          foreach: foreach,
        });
      }
    } else {
      if (!elements[x].children.length) textCascader(elements[x]);
      outer({
        q: elements[x].children,
        amount: elements[x].children.length,
        classname: classname,
        speed: speed,
        index: -1,
        foreach: foreach,
      });
    }
  }
  return self;
}
