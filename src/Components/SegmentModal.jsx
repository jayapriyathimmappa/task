import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import "./Assets/style.css";
import Offcanvas from "react-bootstrap/Offcanvas";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";

const schemaOptions = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Gender", value: "gender" },
  { label: "Age", value: "age" },
  { label: "Account Name", value: "account_name" },
  { label: "City", value: "city" },
  { label: "State", value: "state" },
];

export default function SegmentModal({ show, handleClose }) {
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [availableSchemas, setAvailableSchemas] = useState(schemaOptions);

  const handleSchemaAdd = (event) => {
    event.preventDefault();
    const schema = event.target.elements.schema.value;
    console.log(schema);
    const selectedSchema = schemaOptions.find((opt) => opt.value === schema);
    setSelectedSchemas([...selectedSchemas, selectedSchema]);
    setAvailableSchemas(availableSchemas.filter((opt) => opt.value !== schema));
    event.target.reset();
  };

  const handleSchemaRemove = (index) => {
    const removedSchema = selectedSchemas[index];
    setSelectedSchemas(selectedSchemas.filter((_, i) => i !== index));
    setAvailableSchemas([...availableSchemas, removedSchema]);
  };

  const handleSaveSegment = async () => {
    const data = {
      segment_name: segmentName,
      schema: selectedSchemas.map((schema) => ({
        [schema.value]: schema.label,
      })),
    };
    console.log(data);

    try {
      await axios.post("https://webhook.site/your-webhook-url", data);
      handleClose();
    } catch (error) {
      console.error("Error saving segment:", error);
    }
  };

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="end"
      backdrop="static"
      style={{ width: 450 }}
    >
      <Offcanvas.Header className="title">
        <Offcanvas.Title>
          <ChevronLeftOutlinedIcon
            onClick={handleClose}
            style={{ cursor: "pointer", marginRight: "15px" }}
          />
          Saving Segments
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="flex-concept">
        <Form onSubmit={handleSchemaAdd}>
          <Form.Group>
            <Form.Label>Enter the Name of the segment</Form.Label>
            <Form.Control
              type="text"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
              required
            />
          </Form.Group>
          <div className="title2">
            <p>
              To save your segment, you need to add the schemas to build the
              query.
            </p>
          </div>
          <div
            className="mt-3 p-3 border"
            // style={{ backgroundColor: "lightblue" }}
          >
            {selectedSchemas.map((schema, index) => (
              <Form.Group key={index} className="grouping">
                <Form.Control as="select" value={schema.value} readOnly>
                  <option value={schema.value}>{schema.label}</option>
                </Form.Control>
                <Button
                  // variant="danger"
                  size="sm"
                  className="deleteBtn"
                  onClick={() => handleSchemaRemove(index)}
                >
                  &mdash;
                </Button>
              </Form.Group>
            ))}
          </div>
          <Form.Group>
            <Form.Label>Add Schema to Segment</Form.Label>
            <Form.Control as="select" name="schema" required>
              <option value="">
                --Select-- <i class="bi bi-caret-down"></i>
              </option>

              {availableSchemas.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button type="submit" variant="link" className="schema">
            + Add New Schema
          </Button>
        </Form>
        <div className="outerFooter">
          <div className="footer">
            <Button
              variant="primary"
              className="saveBtn"
              onClick={handleSaveSegment}
            >
              Save Segment
            </Button>
            <Button variant="light" className="cancelBtn" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
