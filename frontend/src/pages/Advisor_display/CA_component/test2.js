import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import ForceGraph2D from "react-force-graph-2d";

var data = {
  nodes: [
    { id: "A", color: "red", val: 20 },
    { id: "B", color: "red", val: 20 },
    { id: "C", color: "red", val: 20 },
    { id: "D", color: "red", val: 20 },
  ],
  links: [
    { source: "B", target: "C", value: 8 },
    { source: "C", target: "D", value: 10 },
    { source: "D", target: "A", value: 6 },
    { source: "B", target: "A", value: 6 },
    { source: "B", target: "D", value: 6 },
  ],
};

function Test2() {
  const forceRef = useRef(null);
  useEffect(() => {
    forceRef.current.d3Force("charge").strength(-400);
  });
  return (
    <ForceGraph2D
      width={800}
      height={600}
      backgroundColor="white"
      graphData={data}
      nodeAutoColorBy="group"
      nodeLabel="id"
      linkCurvature="curvature"
      enablePointerInteraction={true}
      linkDirectionalParticleWidth={1}
      ref={forceRef}
      nodeCanvasObjectMode={() => "before"}
      nodeCanvasObject={(node, ctx, globalScale) => {
        const label = node.id;
        const fontSize = "14px";
        ctx.font = `${fontSize}px Lato-Bold`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "black"; //node.color;
        ctx.fillText(label, node.x, node.y);
        // } else if (globalScale >= 4.5) {
        //   ctx.fillText(label, node.x, node.y + 3.5);
        // }
      }}
    />
  );
}
export default Test2;
// const rootElement = document.getElementById("root");
// ReactDOM.render(<Test2 />, rootElement);
