import React, { useState } from "react";
import "./App.css";
import { Container, Button } from "react-bootstrap";
import SegmentModal from "./Components/SegmentModal";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";

function App() {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  return (
    <div className="background">
      <div className="header">
        <ChevronLeftOutlinedIcon className="icon" />
        View Audience
      </div>
      <Container className="mt-5">
        <Button variant="primary" className="segment" onClick={handleShow}>
          Save Segment
        </Button>

        <SegmentModal show={showModal} handleClose={handleClose} />
      </Container>
    </div>
  );
}

export default App;
