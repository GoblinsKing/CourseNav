import React, { useEffect } from "react";
import * as d3 from "d3";
import "../Relationship_display.css";

const PieChart = (props) => {
  let prerequisiteInfo = JSON.parse(localStorage.getItem("prerequisiteInfo"));

  let HD = prerequisiteInfo.overallGradeDistribution[0];
  let D = prerequisiteInfo.overallGradeDistribution[1];
  let C = prerequisiteInfo.overallGradeDistribution[2];
  let P = prerequisiteInfo.overallGradeDistribution[3];
  let F = prerequisiteInfo.overallGradeDistribution[4];

  const {
    data = [
      { label: parseInt(HD * 100) + "%", value: parseFloat(HD) },
      { label: parseInt(D * 100) + "%", value: parseFloat(D) },
      { label: parseInt(C * 100) + "%", value: parseFloat(C) },
      { label: parseInt(P * 100) + "%", value: parseFloat(P) },
      { label: parseInt(F * 100) + "%", value: parseFloat(F) },
    ],
    outerRadius = 150,
    innerRadius = 70,
  } = props;

  const margin = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10,
  };

  const width = 2 * outerRadius + margin.left + margin.right;
  const height = 2 * outerRadius + margin.top + margin.bottom;

  useEffect(() => {
    drawChart();
  }, [data]);

  function drawChart() {
    // Remove the old svg
    d3.select("#pie-container").select("svg").remove();

    // Create new svg
    const svg = d3
      .select("#pie-container")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const arcGenerator = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    const pieGenerator = d3
      .pie()
      .padAngle(0)
      .value((d) => d.value);

    const arc = svg.selectAll().data(pieGenerator(data)).enter();

    // Append arcs
    arc
      .append("path")
      .attr("d", arcGenerator)
      .style("fill", function (d, i) {
        if (i === 0) {
          return "#63B5FC";
        } else if (i === 1) {
          return "#86C6FD";
        } else if (i === 2) {
          return "#AAD6FD";
        } else if (i === 3) {
          return "#CDE7FE";
        } else return "#E2F1FE";
      })
      .style("stroke", "#ffffff")
      .style("stroke-width", 0);

    // Append text labels
    arc
      .append("text")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .style("font-size", 14)
      .text((d) => d.data.label)
      .style("fill", function (d, i) {
        if (i === 0 || i === 1 || i === 2) {
          return "white";
        } else return "#2699FB";
      })
      .style("font-family", "Lato-Bold")
      .attr("transform", (d) => {
        const [x, y] = arcGenerator.centroid(d);
        return `translate(${x}, ${y})`;
      });
  }

  return (
    <div id="pie-container">
      <p className="course_name_title">COMP SCI 7306 Mining Big Data</p>
      <p className="course_name_sub"> Course 1 as prerequisite </p>
    </div>
  );
};

export default PieChart;
