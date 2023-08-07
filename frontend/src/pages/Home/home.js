import "./home.css";
import Header from "./component_home/header";
import Footer from "./component_home/footer";
import "./component_home/header.css";
import Discription from "./component_home/discription";
import Middle from "./component_home/middle.js";

const Home = () => {
  return (
    <div>
      {/* <div class="bg_image"> */}
      {/* <img src={Hero} alt="Hero" className="image" /> */}
      <Header />
      <div className="frame">
        <div className="tframe">
          <Discription />
        </div>
        <div className="iframe">
          <iframe
            src="https://my.spline.design/roomgirlworkingcopy-a94f9ae3f1e53bfa7c79a474f6a500b9/"
            frameborder="0"
            style={{
              width: "1px",
              minWidth: "100%",
              // height: "866px",
              height: "650px",
            }}
          ></iframe>
        </div>
      </div>
      <Middle />
      <Footer />
    </div>
  );
};

export default Home;
