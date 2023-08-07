import React from "react";
import * as d3 from "d3";
import Ca_un from "./ca_un";
import UnavailableImg from "./ca_un.png";
import "../ca_display.css";

class Distribution extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  coursename = this.props.coursename;
  HD = this.props.Grades[0];
  D = this.props.Grades[1];
  C = this.props.Grades[2];
  P = this.props.Grades[3];
  F = this.props.Grades[4];

  componentDidMount() {
    console.log(this.coursename);
    const dataset = [
      this.HD * 100,
      this.D * 100,
      this.C * 100,
      this.P * 100,
      this.F * 100,
    ];
    const label = [
      parseInt(this.HD * 100) + "%",
      parseInt(this.D * 100) + "%",
      parseInt(this.C * 100) + "%",
      parseInt(this.P * 100) + "%",
      parseInt(this.F * 100) + "%",
    ];
    const grade = ["HD", "D", "C", "P", "F"];

    const w = "100%"; //280 for fixed size
    const h = "300";
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
      .attr("x", (d, i) => i * 50 + 45)
      .attr("y", (d, i) => {
        return h - 3 * d - 80; //-30 becomes the padding form the bottom
      })
      .attr("width", 25)
      .attr("height", (d, i) => 3 * d)
      .append("title")
      .text((d) => d);
    svg
      .selectAll("text.label")
      .data(label)
      .enter()
      .append("text")
      .style("font-size", 14)
      .attr("fill", "#63B5FC")
      .attr("font-family", "Lato-Bold")
      .attr("x", (d, i) => i * 50 + 45)
      .attr("y", (d, i) => h - 60)
      .text((d) => d);

    //below are the const grade tags
    svg
      .selectAll("text.grade")
      .data(grade)
      .enter()
      .append("text")
      .style("font-size", 14)
      .attr("fill", "#63B5FC")
      .attr("font-family", "Lato-Bold")
      .attr("x", (d, i) => i * 50 + 4 + 45)
      .attr("y", (d, i) => h - 40)
      .text((d) => d);
    //   .on("click", function (d, i) {
    //     var temp = i.split(/(?<=^\S+)\s/); //Split the string of the label
    //     console.log(temp[0]);
    //     localStorage.setItem("requiredGrades", JSON.stringify(temp[0]));
    //   });
  }

  render() {
    const styles = {
      container: {
        display: "grid",
        justifyItems: "center",
      },
    };
    // let Title;
    // if (this.props.isChange === false) {
    //   Title = <div className="course_name">Overall Distribution</div>;
    // } else {
    //   if (this.props.withGrade[0] === false) {
    //     Title = <div className="course_name">as Prerequisite</div>;
    //   } else {
    //     Title = (
    //       <div className="course_name">
    //         {/* as Prerequisite for {this.props.withGrade[1]} */}
    //       </div>
    //     );
    //   }
    // }
    let Title;
    if (this.HD !== null) {
      Title = <div className="course_name">{this.coursename}</div>;
      return (
        <div ref="chart" className="overall">
          {/* <div ref="chart" style={styles.container}> */}
          {/* <div className="course_name">{this.coursename}</div> */}
          {Title}
        </div>
      );
    } else {
      // Title = <div className="course_name">Sorry! The data is unavailable</div>;
      Title = <div className="course_name">{this.coursename}</div>;
      return (
        <div>
          {Title}
          <Ca_un />
        </div>
      );
    }

    // return (
    //   <div ref="chart" className="overall">
    //     {/* <div ref="chart" style={styles.container}> */}
    //     {/* <div className="course_name">{this.coursename}</div> */}
    //     {Title}
    //   </div>
    // );
  }
}
export default Distribution;
