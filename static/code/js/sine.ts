(function () {
  function showAxes(ctx) {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const xMin = 0;
    ctx.beginPath();
    ctx.strokeStyle = "rgb(128,128,128)";
    ctx.moveTo(xMin, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();
  }
  function plotSine(ctx, xOffset, yOffset) {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#808080";
    let x = 4;
    let y = 0;
    const amplitude = 40;
    const frequency = 20;
    ctx.moveTo(x, 50);
    while (x < width) {
      y = height / 2 + amplitude * Math.sin((x + xOffset) / frequency);
      ctx.lineTo(x, y);
      x++;
    }
    ctx.stroke();
    ctx.save();
    ctx.stroke();
    ctx.restore();
  }
  function draw() {
    const canvas = document.getElementById("sine");
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, 640, 640);
    showAxes(context);
    context.save();
    plotSine(context, step, 50);
    context.restore();
    ++step;
    window.requestAnimationFrame(draw);
  }
  function init() {
    window.requestAnimationFrame(draw);
  }
  let step = -1;
  init();
})();
