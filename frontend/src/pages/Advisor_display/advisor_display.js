import Rgraph from "./CA_component/test.js";
import "./ca_display.css";
import ForceGraph from "./CA_component/test1";
import Test2 from "./CA_component/test2.js";
import Test3 from "./CA_component/test3.js";
import Header_ca from "../Home/component_home/header_ca.js";
import Test from "./CA_component/test.js";
import Footer from "../Home/component_home/footer.js";

const Advisor_display = () => {
  return (
    <div>
      <div className="bg_image">
        <Header_ca />
        <Test3 />
        {/* <ForceGraph /> */}
      </div>
      <Footer />
    </div>
  );
};

export default Advisor_display;
