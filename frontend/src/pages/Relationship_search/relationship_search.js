import { Link } from "react-router-dom";
import Header_cr from "../Home/component_home/header_cr";
import DiscriptionCr from "./component_rs/discriptionCr";
import "./relationship_search.css";
import Input from "./component_rs/input";
import Footer from "../Home/component_home/footer.js";

const Relationship_search = () => {
  const test = () => {
    console.log("Hello 2");
  };

  return (
    <div>
      <div className="bg_image" key={"B1"}>
        <Header_cr />
        <div className="box1" key={"B2"}>
          <div className="box" key={"B3"}>
            <DiscriptionCr />
            <br />
            <Input />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Relationship_search;
