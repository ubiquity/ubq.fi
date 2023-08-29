import { isArrayLike } from "./is-array-like";
import { outer } from "./outer";
import { textCascader } from "./text-cascader";

export function cascade({
  self,
  elements,
  speed,
  classname: className,
  foreach,
}: {
  self?: Element;
  elements?: HTMLCollection | HTMLElement;
  speed?: number;
  classname?: string;
  foreach?: (element: HTMLElement) => void;
}) {

  console.trace(className);

  if (!elements) {
    return false;
  }
  if (!className) {
    className = "Active";
  }
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
          query: elements[x][y].children,
          amount: elements[x][y].children.length,
          className: className,
          speed: speed,
          index: -1,
          foreach: foreach,
        });
      }
    } else {
      if (!elements[x].children.length) {
        textCascader(elements[x]);
      }
      outer({
        query: elements[x].children,
        amount: elements[x].children.length,
        className: className,
        speed: speed,
        index: -1,
        foreach: foreach,
      });
    }
  }
  return self;
}
