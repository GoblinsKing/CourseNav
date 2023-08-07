import Header_ca from "../Home/component_home/header_ca";
import DiscriptionCa from "./ca_component/discriptionCa.js";
import "./advisor.css";
import AddCourse from "../../Components/AddCourse";
import Footer from "../Home/component_home/footer.js";

const Advisor_search = () => {
  const test = function () {
    console.log("first");
  };
  return (
    <div>
      <div className="bg_image1">
        <Header_ca />
        <div className="box_ca1">
          <div className="box_ca">
            <DiscriptionCa />
            <br />
            {/* <div className="colca">
            <div className="code_place">Course name/code</div>
            <div className="grade_place">Grade</div>
          </div> */}
            {/* input should be here */}
            <div
              style={{
                width: "60%",
                backgroundColor: "transparent",
                margin: "0 auto",
              }}
            >
              <AddCourse />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Advisor_search;
