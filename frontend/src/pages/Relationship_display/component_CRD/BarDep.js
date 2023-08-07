import React from "react";
import * as d3 from "d3";

class BarDep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.grade = "";
    console.log("1");
  }
  name = this.props.dataParentToChild[1][0];
  HD = this.props.dataParentToChild[1][1];
  D = this.props.dataParentToChild[1][2];
  C = this.props.dataParentToChild[1][3];
  P = this.props.dataParentToChild[1][4];
  F = this.props.dataParentToChild[1][5];

  componentDidMount() {
    console.log("2");

    const dataset = [
      this.HD * 100,
      this.D * 100,
      this.C * 100,
      this.P * 100,
      this.F * 100,
    ];
    const label = [
      "HD" + "\xa0\xa0\xa0" + parseInt(this.HD * 100) + "%",
      "D " + "\xa0\xa0\xa0\xa0\xa0" + parseInt(this.D * 100) + "%",
      "C " + "\xa0\xa0\xa0\xa0\xa0" + parseInt(this.C * 100) + "%",
      "P " + "\xa0\xa0\xa0\xa0\xa0" + parseInt(this.P * 100) + "%",
      "F " + "\xa0\xa0\xa0\xa0\xa0" + parseInt(this.F * 100) + "%",
    ];

    const w = 380;
    const h = 150;
    const svg = d3
      .select(this.refs.chart)
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .attr("class", "bar");

    svg
      .selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("rx", 5)
      .attr("fill", function (d, i) {
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
      // .attr("class", "sBar")
      .on("click", function (d, i) {
        console.log(i);
      })
      .attr("y", (d, i) => i * 25) //the padding between each rect
      .attr("x", (d, i) => {
        return 93; //the begining postion of the rect
      })
      .attr("height", 16) //the width of the rect
      .attr("width", (d, i) => 5 * d * 0.8) //make the rect longer than the original
      /* 1.5 needs to be changed considering the hightest value in data */
      .append("title")
      .text((d) => d);
    svg
      .selectAll("text")
      .data(label)
      .enter()
      .append("text")
      .attr("class", "dBar")
      // .style("font-size", 12)
      .style("font-family", "Lato-Bold")
      .attr("fill", "#2699fb")
      .attr("y", (d, i) => i * 25 + 15)
      .attr("x", (d, i) => 30) //the starting position of text
      .text((d) => d);
  }

  render() {
    const styles = {
      container: {
        display: "grid",
        justifyItems: "center",
        textAlign: "center",
        paddingLeft: "1vw",
        paddingTop: "2vh",
      },
    };
    console.log("3");

    return (
      <div ref="chart" style={styles.container}>
        <h3 className="course_name">
          Dependency: {this.props.dataParentToChild[0]} {this.name}
        </h3>
      </div>
    );
  }
}
export default BarDep;
