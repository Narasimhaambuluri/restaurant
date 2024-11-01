import React from "react";
import { Parallax } from "react-parallax";
import "./pages.css";

import Background1 from "../images/background1.jpg";
import Background2 from "../images/background2.jpg";
import Background3 from "../images/background3.jpg";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div>
      <Parallax
        bgImage={Background1}
        strength={300}
        bgImageStyle={{
          width: "100%",
          height: "100%",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="section-1">
          <Navbar />
          <div className="title">Taste the City.</div>
        </div>
      </Parallax>
      <Parallax
        bgImage={Background2}
        strength={300}
        bgImageStyle={{
          width: "100%",
          height: "100%",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="section-2"></div>
      </Parallax>
      <Parallax
        bgImage={Background3}
        strength={300}
        bgImageStyle={{
          width: "100%",
          height: "100%",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="section-3"></div>
      </Parallax>
    </div>
  );
}

export default Home;
