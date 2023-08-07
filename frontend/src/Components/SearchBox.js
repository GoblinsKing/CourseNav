import * as React from "react";
import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import axios from "../axios";
import { connect } from "react-redux";
import {
  prerequisiteSearchAction,
  dependencySearchAction,
} from "../actions/courseAction";
import { withRouter } from "./withRouter";
import { ThemeProvider } from "@material-ui/styles";
import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  typography: {
    color: "red",
    fontFamily: ["Lato"].join(","),
  },
  palette: {
    primary: {
      light: "#2196f3",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
  },
});

const inputStyle = {
  fontFamily: "Lato-bold",
  color: "#2196f3",
};

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "", courses: [], text: "", code: [], button: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.formRef = React.createRef();
  }

  componentDidMount() {
    axios.get("course/courseList").then((res) => {
      this.setState({ message: res.data.message, courses: res.data.data });
    });
  }

  handleChange(event) {
    this.setState({ text: event.target.textContent }, () => {
      console.log(this.state.text);
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    let code = this.state.text.split(" ");
    let courseCode = code[2];
    console.log(courseCode);
    if (courseCode === "" || this.state.button === "") {
      console.log("Invalid input!");
      this.setState({ button: "" });
    } else if (courseCode !== "" && this.state.courses.includes(this.state.text) && this.state.button !== "") {
      localStorage.setItem("Course Code", courseCode);
      console.log("The Course Code is:", courseCode);

      if (this.state.button === "pre") {
        await this.props.dispatch(prerequisiteSearchAction(courseCode));
        console.log("waited");
        console.log(
          "The pre data is:",
          localStorage.getItem("prerequisiteData")
        );
        this.props.navigate("/course_relationship_display_pre", {
          replace: true,
        });
        localStorage.removeItem("requiredGrades");
      }
      if (this.state.button === "dep") {
        await this.props.dispatch(dependencySearchAction(courseCode));
        console.log("waited");
        console.log(
          "The dep data is:",
          localStorage.getItem("prerequisiteData")
        );
        this.props.navigate("/course_relationship_display_dep", {
          replace: true,
        });
        localStorage.removeItem("requiredGrades");
      }
    }
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          <form ref={this.formRef} onSubmit={this.handleSubmit}>
            <Grid>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={this.state.courses}
                sx={{
                  width: "100%",
                  backgroundColor: "white",
                  fontWeight: "light",
                }}
                onChange={this.handleChange}
                renderInput={(params) => (
                  <TextField
                    required
                    style={inputStyle}
                    fullWidth={true}
                    {...params}
                    label="Enter course name/code"
                  />
                )}
              />
            </Grid>
            <br></br>
            <Grid display="flex" justifyContent="space-between">
              <Button
                style={{
                  borderRadius: 5,
                  backgroundColor: "#2699fb",
                  // padding: "18px 36px",
                  fontSize: "14",
                  textTransform: "lowercase",
                }}
                variant="contained"
                type="submit"
                sx={{ width: 250, height: 40, marginRight: 2 }}
                onClick={() => {this.formRef.current.reportValidity(); this.setState({ button: "pre" })}}
                disableElevation
              >
                Search prerequisites
              </Button>
              <Button
                style={{
                  backgroundColor: "#2699fb",
                  textTransform: "lowercase",
                }}
                variant="contained"
                type="submit"
                sx={{ width: 250, height: 40, marginLeft: 2 }}
                onClick={() => {this.formRef.current.reportValidity(); this.setState({ button: "dep" })}}
                disableElevation
              >
                Search dependencies
              </Button>
            </Grid>
          </form>
        </div>
      </ThemeProvider>
    );
  }
}

export default withRouter(connect()(SearchBox));
