import React, { useEffect, useRef, useState, useMemo } from "react";
import ReactDOM from "react-dom";
import ForceGraph2D from "react-force-graph-2d";
import * as d3 from "d3";
import "../ca_display.css";
import { useSelector } from "react-redux";

var data1 = {
  nodes: [
    {
      id: "7202",
      name: "7202 Foundation of Computer",
      isInput: true,
      val: 20,
    },
    {
      id: "7039",
      name: "7039 Computer Network",
      isInput: true,
      val: 20,
    },
    {
      id: "7064",
      name: "7064 Operating system",
      isInput: false,
      val: 20,
    },
    {
      id: "7081",
      name: "7081 Computer System",
      isInput: false,
      val: 20,
    },
    {
      id: "7201",
      name: "7201 Algorithm & Data Structure Analysis",
      isInput: false,
      val: 20,
    },
    {
      id: "7092",
      name: "7092 Computer Network & application",
      isInput: false,
      val: 20,
    },
  ],
  links: [
    { source: "7039", target: "7092" },
    { source: "7202", target: "7081" },
    { source: "7202", target: "7201" },
    { source: "7202", target: "7064" },
    { source: "7202", target: "7039" },
  ],
};

// const Data = JSON.parse(localStorage.getItem("advisorData"));
// var data2 = {
//   nodes: Data.nodes,
//   links: Data.links,
// };

const Test = () => {
  const advisorSearch = useSelector((state) => state.advisorSearch);
  const { advisorData } = advisorSearch;
  const Data = JSON.parse(localStorage.getItem("advisorData"));
  let data2 = {
    nodes: Data.nodes,
    links: Data.links,
  };

  const forceRef = useRef();

  useEffect(() => {
    // forceRef.current.d3Force("collide", d3.forceCollide(13));
    forceRef.current.d3Force("charge").strength(-40);
    forceRef.current.d3Force("link").distance(80);
    forceRef.current.d3Force("charge").distanceMax(150);
  }, []);

  const handleClick = () => {
    console.log(1);
  };

  return (
    <div className="all">
      <div>
        <div className="cad_tatile">Course Advisor Result</div>
        <div
          style={{
            border: "1px solid #63B5FC",
            borderRadius: "15px",
            marginTop: "5px",
            width: "94%",
            Height: "75%",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            marginRight: "30%",
            marginTop: "2vh",
            marginLeft: "4vw",
          }}
        >
          <ForceGraph2D
            width={window.innerWidth * 0.65}
            height={window.innerHeight * 0.75}
            ref={forceRef}
            graphData={data2}
            cooldownTicks={50}
            onNodeClick={handleClick}
            nodeRelSize={6}
            nodeColor={(node) => {
              const inPut = node.isInput;
              if (node.isInput) {
                return "#63B5FC";
              } else return "#AAD6FD";
            }}
            nodeCanvasObjectMode={() => "after"}
            nodeCanvasObject={(node, ctx, globalScale) => {
              const label = node.id + " " + node.name;
              const fontSize = 14 / (globalScale * 1.2);
              ctx.font = `${fontSize}px Lato-Bold`;
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              ctx.fillStyle = "white"; //node.color;
              // ctx.fillText(label, node.x, node.y);
              const lineHeight = fontSize * 1.2;
              const lines = label.split(" ");
              let x = node.x;
              let y = node.y - lineHeight * 2;
              for (let i = 0; i < lines.length; ++i) {
                ctx.fillText(lines[i], x, y);
                y += lineHeight;
              }
            }}
            linkVisibility={(link) => {
              return true;
            }}
            // linkLineDash={5}
            // moving dash as alternitive
            linkWidth={0.5}
            linkColor={() => "#63B5FC"}
            // linkDirectionalParticles={(link) => 5}
            // linkDirectionalParticleColor={["#63B5FC"]}
            // linkDirectionalParticleSpeed={() => 1 * 0.01}
          />
        </div>
      </div>
      <div className="left">
        <div className="performance"></div>
      </div>
    </div>
  );
};

export default Test;
