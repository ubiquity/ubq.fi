export function outer(o: { query?: any; amount?: any; className?: string; speed: any; index?: number; foreach: any }) {
  const inner = function (i) {
    if (i.amount == ++i.index) {
      return clearTimeout(inner);
    }
    const cursor = i.q[i.index];
    const tagname = cursor.tagName;
    if (tagname === "style") {
      return setTimeout(function () {
        inner(o);
      }, o.speed);
    }
    if (tagname === "svg" || tagname === "g" || tagname === "path") {
      cursor.setAttribute("class", i.classname);
    } else {
      cursor.className += " " + i.classname;
    }
    setTimeout(function () {
      inner(o);
    }, o.speed);
    o.foreach && o.foreach(cursor);
  };
  return inner(o);
}
