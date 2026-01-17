import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

const AddStatistics = () => {
  const [jsonInput, setJsonInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("📌 Raw JSON input:", jsonInput);

      const parsed = JSON.parse(jsonInput);
      console.log("✅ Parsed JSON object:", parsed);

      const response = await axios.post("http://localhost:5000/api/statistics/bulk", { data: parsed });
      console.log("✅ Server response:", response.data);

      toast.success("Statistics uploaded successfully");
    } catch (err) {
      console.error("❌ Error in AddStatistics:", err);
      toast.error("Invalid JSON or server error");
    }
  };

  return (
    <Container style={{ padding: "20px" }}>
      <h4>Add Statistics (Bulk JSON Upload)</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Paste JSON</Form.Label>
          <Form.Control
            as="textarea"
            rows={15}
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder='[ { "title": "AREA AND POPULATION", "rows": [ {"label":"Area", "value":"4953 Sq. Kms"} ] } ]'
          />
        </Form.Group>
        <Button type="submit" className="mt-3" variant="primary">
          Save Statistics
        </Button>
      </Form>
    </Container>
  );
};

export default AddStatistics;
