import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import proFairLogo from "../assets/images/note-creator-logo.jpeg";
// import { homeProjectApi } from "../services/allApi";

function Home() {
  const [token, setToken] = useState("");
  const [homeProject, setHomeProject] = useState([]);

  const getHomeProject = async () => {
    const result = await homeProjectApi();
    setHomeProject(result.data);
  };

  console.log(homeProject);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
    }
    getHomeProject();
  }, []);

  return (
    <>
      <div
        className="container-fluid bg-success p-4 mb-4"
        style={{ width: "100%", height: "100vh" }}
      >
        <Row className="mt-5">
          <Col
            md={6}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <div>
              <h1 className="text-light" style={{ fontSize: "76px" }}>
                Project Fair
              </h1>
              <h6>
                One stop destination for all software development projects.
              </h6>
              {!token ? (
                <Link to={"/login"}>
                  <button className="btn btn-outline-light my-4">
                    Get Started
                    <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                  </button>
                </Link>
              ) : (
                <Link to={"/dashboard"}>
                  <button className="btn btn-outline-light my-4">
                    Manage Project
                    <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                  </button>
                </Link>
              )}
            </div>
          </Col>
          <Col
            md={6}
            className="d-flex flex-column justify-content-center align-items-center flex-column mt-5"
          >
            <img src={proFairLogo} alt="" width={"80%"} />
          </Col>
        </Row>
      </div>


    </>
  );
}

export default Home;
