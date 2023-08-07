import React from "react";
import * as d3 from "d3";

class BarPre extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requireGrade: [],
    };
    this.grade = [];
    console.log("1");
  }
  name = this.props.dataParentToChild[1][0];
  HD = this.props.dataParentToChild[1][1];
  D = this.props.dataParentToChild[1][2];
  C = this.props.dataParentToChild[1][3];
  P = this.props.dataParentToChild[1][4];
  F = this.props.dataParentToChild[1][5];
  code = this.props.dataParentToChild[0];

  componentDidMount() {
    console.log("2");
    console.log("Index of this Bar is: ", this.props.BarIndex);
    // localStorage.setItem("requiredGrades", "HD");

    const checkIndex = () => {
      let isSame = true;
      if (this.props.BarIndex !== JSON.parse(localStorage.getItem("Index"))) {
        emptyArray();
        isSame = false;
      }
      return isSame;
    };

    const addrequireGrade = (grade) => {
      this.setState((previousState) => ({
        requireGrade: [...previousState.requireGrade, grade],
      }));
      console.log("The state is: ", this.state.requireGrade);
    };

    const removeRequireGrade = (grade) => {
      var array = [...this.state.requireGrade]; // make a separate copy of the array
      var index = array.indexOf(grade);
      if (index !== -1) {
        array.splice(index, 1);
        this.setState({ requireGrade: array });
      }
      console.log("The state is: ", this.state.requireGrade);
    };

    const emptyArray = () => {
      this.setState({
        requireGrade: [],
      });
    };

    const onTrigger = () => {
      this.props.parentCallback(this.state.requireGrade);
    };

    const checkPrereq = () => {
      console.log("The prereq is: ", this.code);
      localStorage.setItem("Prereq", this.props.dataParentToChild[0]);
    };

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
      .attr("class", "bar")
      .on("click", function (d, i) {
        console.log("44444", d, i);
        if (d.target.nodeName == "text") {
        } else {
          d3.selectAll(".allCircles")
            .style("fill", "#2699fb")
            .style("font-size", 12)
            .classed("clicked", false);
          emptyArray();
        }
        // if (checkIndex === false) {
        //   console.log("Checked the index and did run here!");
        //   d3.selectAll(".allCircles")
        //     .style("fill", "#2699fb")
        //     .style("font-size", 12)
        //     .classed("clicked", false);
        // }
        // checkIndex();
        onTrigger();
        checkPrereq();
      });

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
      .attr("width", (d, i) => 5 * d * 1) //make the rect longer than the original
      /* 1.5 needs to be changed considering the hightest value in data */
      .append("title")
      .text((d) => d);
    svg
      .selectAll("text")
      .data(label)
      .enter()
      .append("text")
      .attr("class", "sBar")
      // .style("font-size", 12)
      .style("font-family", "Lato-Bold")
      .attr("fill", "#2699fb")
      .attr("y", (d, i) => i * 25 + 15)
      .attr("x", (d, i) => 30) //the starting position of text
      .text((d) => d)
      .attr("class", "allCircles") //clicked effect
      .on("mouseover", function (d, i) {
        d3.select(this).transition().duration("50").attr("fill", "#3864d1");
      })
      .on("mouseout", function (d, i) {
        d3.select(this).transition().duration("50").attr("fill", "#2699fb");
      })
      .on("click", function (d, i) {
        if (checkIndex() === false) {
          console.log("Checked the index and did run here!");
          d3.selectAll(".allCircles")
            .style("fill", "#2699fb")
            .style("font-size", 12)
            .classed("clicked", false);
        }
        var temp = i.split(/(?<=^\S+)\s/); //Split the string of the label
        console.log(temp[0]);
        localStorage.setItem("requiredGrades", JSON.stringify(temp[0]));
        //clicked effect
        console.log(d3.select(this));
        if (d3.select(this).classed("clicked")) {
          d3.select(this).classed("clicked", false);
          console.log("unClicked");
          removeRequireGrade(temp[0]);
          d3.select(this).style("fill", "#2699fb");
        } else {
          d3.select(this).classed("clicked", true);
          console.log("clicked: ", temp[0]);
          addrequireGrade(temp[0]);
          d3.select(this).style("fill", "#3864d1");
          d3.select(this).style("font-size", 13);
        }
        onTrigger();
        // d3.selectAll(".allCircles")
        //   .style("fill", "#2699fb")
        //   .style("font-size", 12);
        // d3.select(this).style("fill", "#3864d1");
      });
  }
  onclicked_chart = () => {};

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
      <div onClick={this.onclicked_chart} ref="chart" style={styles.container}>
        <h3 className="course_name_pre">
          Prerequisite: {this.props.dataParentToChild[0]} {this.name}
        </h3>
      </div>
    );
  }
}
export default BarPre;
