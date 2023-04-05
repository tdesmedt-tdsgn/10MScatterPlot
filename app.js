const width = 800;
const height = 600;
const canvas = d3.select("#scatter-plot");
const regl = createREGL(canvas.node());
const xScale = d3.scaleLinear().domain([0, 1]).range([0, width]);
const yScale = d3.scaleLinear().domain([0, 1]).range([height, 0]);

const numPointsInput = d3.select("#num-points");
const numPointsValue = d3.select("#num-points-value");

function generatePoints(numPoints) {
  const points = new Float32Array(numPoints * 2);
  const colors = new Float32Array(numPoints * 3);
  for (let i = 0; i < numPoints; i++) {
    points[i * 2] = Math.random();
    points[i * 2 + 1] = Math.random();

    colors[i * 3] = Math.random();
    colors[i * 3 + 1] = Math.random();
    colors[i * 3 + 2] = Math.random();
  }
  return { points, colors };
}

const drawPoints = regl({
  frag: `
  precision mediump float;
  varying vec3 fragColor;
  void main() {
    gl_FragColor = vec4(fragColor, 0.9);
  }`,

  vert: `
  precision mediump float;
  attribute vec2 position;
  attribute vec3 color;
  uniform vec2 scale;
  uniform vec2 translate;
  varying vec3 fragColor;
  void main() {
    vec2 scaledPosition = position * scale + translate;
    gl_Position = vec4(2.0 * scaledPosition.x - 1.0, 1.0 - 2.0 * scaledPosition.y, 0, 1);
    gl_PointSize = 2.0;
    fragColor = color;
  }`,

  attributes: {
    position: regl.prop("points"),
    color: regl.prop("colors"),
  },

  uniforms: {
    scale: regl.prop("scale"),
    translate: regl.prop("translate"),
  },

  count: regl.prop("count"),
  primitive: "points",
});

function updateNumPoints() {
  const numPoints = numPointsInput.node().value;
  numPointsValue.text(numPoints);
  render({ pointsData: generatePoints(numPoints) });
}

const zoom = d3.zoom().scaleExtent([1, 100]).on("zoom", (event) => {
  const transform = event.transform;
  render({
    pointsData: currentPointsData,
    translate: [transform.x / width, transform.y / height],
    scale: [transform.k, transform.k],
  });
});

canvas.call(zoom);

let currentPointsData = generatePoints(numPointsInput.node().value);

function render({ pointsData, translate = [0, 0], scale = [1, 1] }) {
  currentPointsData = pointsData;
  regl.clear({ color: [1, 1, 1, 1], depth: 1 });
  drawPoints({
    points: regl.buffer(pointsData.points),
    colors: regl.buffer(pointsData.colors),
    count: pointsData.points.length / 2,
    translate,
    scale,
  });
}

numPointsInput.on("input", updateNumPoints);
updateNumPoints();
