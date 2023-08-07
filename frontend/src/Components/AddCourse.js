import {
  Button,
  Autocomplete,
  TextField,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Alert,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import { advisorSearchAction } from "../actions/advisorAction";
import { useDispatch } from "react-redux";

export default function AddCourse() {
  const [courses, setCourses] = useState([]);
  const [formValues, setFormValues] = useState([{ code: "", grade: "" }]);
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formRef = React.useRef();
  const [duplicate, setDuplicate] = useState(false);

  const getCourses = () => {
    axios.get("/course/courseList").then((res) => {
      const courses = res.data.data;
      setCourses(courses);
    });
  };

  const handleChange = (index, key, event) => {
    const newFormValues = [...formValues];
    if (key === "code") {
      if (selected.includes(event.target.textContent)) {
        setDuplicate(true);
        console.log("Duplicate input!");
        // console.log(duplicate);
      } else {
        setDuplicate(false);
        const stringList = event.target.textContent.split(" ");
        newFormValues[index][key] = stringList[2];
        selected[index] = event.target.textContent;
        setSelected(selected);
        console.log(selected);
      }
    }
    if (key === "grade") {
      newFormValues[index][key] = event.target.textContent;
    }
    setFormValues(newFormValues);
  };

  const addItem = () => {
    setFormValues([...formValues, { code: "", grade: "" }]);
  };

  const deleteItem = (index) => {
    const newFormValues = [...formValues];
    newFormValues.splice(index, 1);
    setFormValues(newFormValues);
    selected.splice(index, 1);
    setSelected(selected);
    setDuplicate(false);
  };

  const handleSubmit = async (event) => {
    console.log(selected);
    event.preventDefault();
    console.log(JSON.stringify(formValues));
    for (let i = 0; i < formValues.length; i++) {
      if (formValues[i]["code"] === "") {
        setDuplicate(true);
      }
    }
    if (duplicate === true){
      console.log("Duplicate input!");
    } else {
      await dispatch(advisorSearchAction(formValues));
      navigate("/course_advisor_display", { replace: true });
      // localStorage.removeItem("advisorData");
    }
  };

  const inputStyle = {
    backgroundColor: "white",
    fontFamily: "Lato-bold",
    color: "#2196f3",
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      {
        duplicate 
        ? <Alert  severity="warning" sx={{width: "100%", spacing:"2", alignContent: "left"}}>Duplicate courses are detected, please check your input!</Alert> 
        : <></>
      }
      <TableContainer>
        <Table
          sx={{
            [`& .${tableCellClasses.root}`]: {
              borderBottom: "none",
            },
          }}
        >
          <TableBody>
            {formValues.map((key, index) => (
              <TableRow className="form-inline" key={index}>
                <TableCell sx={{ width: "60%" }}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={courses}
                    sx={{
                      width: "100%",
                      backgroundColor: "white",
                      fontWeight: "light",
                    }}
                    onChange={(event) => {
                      key = "code";
                      handleChange(index, key, event);
                    }}
                    renderInput={(params) => (
                      <TextField
                        required
                        style={inputStyle}
                        fullWidth={true}
                        onClick={getCourses}
                        {...params}
                        label="Enter course name/code"
                      />
                    )}
                  />
                </TableCell>
                <TableCell sx={{ width: "30%" }}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={["HD", "D", "C", "P", "F"]}
                    sx={{
                      width: "100%",
                      backgroundColor: "white",
                      fontWeight: "light",
                    }}
                    onChange={(event) => {
                      key = "grade";
                      handleChange(index, key, event);
                    }}
                    renderInput={(params) => (
                      <TextField
                        required
                        style={inputStyle}
                        fullWidth={true}
                        {...params}
                        label="Enter Grade"
                      />
                    )}
                  />
                </TableCell>
                <TableCell sx={{ width: "10%" }}>
                  {index ? (
                    <Button
                      style={{
                        borderRadius: 5,
                        backgroundColor: "#2699fb",
                        // padding: "18px 36px",
                        fontSize: "14",
                        textTransform: "lowercase",
                      }}
                      variant="contained"
                      size="large"
                      sx={{ width: 50, height: 50 }}
                      onClick={() => deleteItem(index)}
                    >
                      -
                    </Button>
                  ) : null}
                </TableCell>
              </TableRow>
            ))}
            <TableRow className="button-section">
              <TableCell sx={{ ml: 0, borderCollapse: "collapse" }}>
                <Button
                  style={{
                    borderRadius: 5,
                    backgroundColor: "#2699fb",
                    // padding: "18px 36px",
                    fontSize: "14",
                    textTransform: "lowercase",
                  }}
                  variant="contained"
                  size="large"
                  sx={{ ml: 0, width: 50, height: 50 }}
                  onClick={() => addItem()}
                >
                  +
                </Button>
              </TableCell>
            </TableRow>
            <TableRow className="button-section">
              <TableCell sx={{ ml: 0, borderCollapse: "collapse" }}>
                <Button
                  style={{
                    borderRadius: 5,
                    backgroundColor: "#2699fb",
                    // padding: "18px 36px",
                    fontSize: "14",
                    textTransform: "lowercase",
                  }}
                  variant="contained"
                  size="large"
                  sx={{ ml: 0, height: 50 }}
                  type="submit"
                  onClick={() => {formRef.current.reportValidity()}}
                >
                  Go Advisor
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </form>
  );
}
