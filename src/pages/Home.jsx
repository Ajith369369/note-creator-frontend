import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import noteCreatorLogo from "../assets/images/note-creator-square-logo.jpeg";
import "./Home.scss";

function Home() {
  const [token, setToken] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
    }
  }, []);

  return (
    <>
      <div
        className="container-fluid bg-success p-4 logo-page d-flex justify-content-center align-items-center"
        style={{ width: "100%" }}
      >
        <Row className="m-0 py-4">
          <Col
            md={6}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <div className="ms-3">
              <h1 className="text-center text-dark" style={{ fontSize: "76px" }}>
                Note Creator
              </h1>
              <h4 className="text-center">One stop destination for your notes</h4>
              <div className="d-flex justify-content-center align-items-center">
                {!token ? (
                  <Link to={"/login"}>
                    <button className="btn btn-outline-light my-4">
                      Get Started
                      <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                    </button>
                  </Link>
                ) : (
                  <Link to={"/profile-home/introduction"}>
                    <button className="btn btn-outline-light my-4">
                      Manage Notes
                      <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </Col>
          <Col
            md={6}
            className="d-flex flex-column justify-content-center align-items-center flex-column"
          >
            <img src={noteCreatorLogo} alt="" height={"400px"} />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Home;
