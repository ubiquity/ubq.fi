export function textCascader(target) {
  let x = -1;
  const y = target.textContent.length;
  const _span = document.createElement("SPAN");
  const div = document.createElement("DIV");
  const cursor = target;
  while (++x < y) {
    const span = _span.cloneNode();
    span.textContent = cursor.textContent[x];
    div.appendChild(span);
  }
  cursor.innerHTML = div.innerHTML;
}
