import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

const AddPastoralCouncil = () => {
  const [jsonInput, setJsonInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsed = JSON.parse(jsonInput);
      await axios.post("http://localhost:5000/api/pastoralCouncil/bulk", { data: parsed });
      toast.success("Pastoral council uploaded successfully");
    } catch (err) {
      console.error(err);
      toast.error("Invalid JSON or server error");
    }
  };

  return (
    <Container style={{ padding: "20px" }}>
      <h4>Add Pastoral Council (Bulk JSON Upload)</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Paste JSON</Form.Label>
          <Form.Control
            as="textarea"
            rows={15}
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder='{
  "Ex-Officio Member": [{"name":"Archbishop Mar Joseph Pamplany","designation":"President","address":""}],
  "Religious Major Superior": [],
  "Forane Vicar": [],
  "Elected Member": [],
  "Representatives of Religious": [],
  "Nominated Member": [],
  "Permanent Invitee": [],
  "Elected": []
}'
          />
        </Form.Group>
        <Button type="submit" className="mt-3" variant="primary">
          Save Pastoral Council
        </Button>
      </Form>
    </Container>
  );
};

export default AddPastoralCouncil;
