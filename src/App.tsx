import * as d3 from "d3";

type Vector2 = {
  x: number;
  y: number;
};

type Hexagon = {
  pointA: Vector2;
  pointB: Vector2;
  pointC: Vector2;
  pointD: Vector2;
  pointE: Vector2;
  pointF: Vector2;
};

const calculateHexFromCenterAndEdgeLength = (
  origin: Vector2,
  edgeLength: number
): Hexagon => {
  const pointA: Vector2 = {
    x: origin.x - 0.5 * edgeLength,
    y: origin.y - edgeLength,
  };
  const pointB: Vector2 = {
    x: pointA.x + edgeLength,
    y: pointA.y,
  };
  const pointC: Vector2 = {
    x: origin.x + edgeLength,
    y: origin.y,
  };
  const pointD: Vector2 = {
    x: pointB.x,
    y: origin.y + edgeLength,
  };
  const pointE: Vector2 = {
    x: pointA.x,
    y: pointD.y,
  };
  const pointF: Vector2 = {
    x: origin.x - edgeLength,
    y: origin.y,
  };
  return { pointA, pointB, pointC, pointD, pointE, pointF };
};

const convertHexToD3Path = (hex: Hexagon) => {
  return `M ${hex.pointA.x} ${hex.pointA.y} L ${hex.pointB.x} ${hex.pointB.y} ${hex.pointC.x} ${hex.pointC.y} ${hex.pointD.x} ${hex.pointD.y} ${hex.pointE.x} ${hex.pointE.y} ${hex.pointF.x} ${hex.pointF.y} z`;
};

export function App() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  var hexWidth = 500,
    hexHeight = 500,
    cols = 30,
    rows = 20;
  const hexRadius = 50;
  const points = [
    { id: "hex1", x: 150, y: 200 },
    { id: "hex2", x: 230, y: 250 },
    { id: "hex3", x: 230, y: 145 },
    { id: "hex4", x: 310, y: 200 },
    { id: "hex5", x: 310, y: 95 },
  ];

  const baseSvg = d3
    .select("#svg-container")
    .append("svg")
    .attr("width", hexWidth)
    .attr("height", hexHeight);
  const g = baseSvg.append("g");
  g.selectAll(".hexagon")
    .data(points)
    .enter()
    .append("path")
    .attr("class", "hexagon")
    .attr("d", (d) => {
      const dAsHex = calculateHexFromCenterAndEdgeLength(
        { x: d.x, y: d.y },
        hexRadius
      );
      return convertHexToD3Path(dAsHex);
    })
    .attr("stroke", "black")
    .attr("stroke-width", "1px")
    .style("fill", "teal")
    .on("mousemove", function thing(d) {
      console.log(this);
      console.log(d3.pointer(d));
    })
    .on("mouseover", mouseover)
    .on("mouseout", mouseout);

  function mouseover(d) {
    // console.log(d3.pointer(d));

    d3.select(this).transition().duration(10).style("fill-opacity", 0.3);
  }

  function mouseout(d) {
    d3.select(this).transition().duration(1000).style("fill-opacity", 1);
  }
  return (
    <>
      <figure className="md:flex bg-slate-100 rounded-xl">
        <div className="pt-6 md:p-8 text-center">
          <p className="text-lg font-medium">
            "This is some text to test out some tailwind stuff"
          </p>
        </div>
      </figure>
      <div id="svg-container"></div>
    </>
  );
}
