import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Alert, Spinner } from 'react-bootstrap';
import AdminLayout from '../../layouts/AdminLayout';

const ImportData = () => {
  const [jsonData, setJsonData] = useState({});
  const [selectedFiles, setSelectedFiles] = useState({});
  const [importStatus, setImportStatus] = useState({});
  const [activeTab, setActiveTab] = useState('tables');
  const [loading, setLoading] = useState({});
  const [tableEndpoints] = useState({
    1: 'parishes',
    2: 'priest-status',
    3: 'priest-sub-status',
    4: 'priest-secondary-sub-status',
    5: 'priests',
    6: 'priest-histories',
    7: 'priest-educations',
    8: 'priest-others',
    9: 'administration',
    10: 'institutions',
    11: 'priest-designations',
    12: 'foranes'   // ✅ This should match the backend route
  });
  
  const handleFileChange = (tableId, e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFiles(prev => ({ ...prev, [tableId]: file }));

    // Read and store file content
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = JSON.parse(event.target.result);
        setJsonData(prev => ({ ...prev, [tableId]: JSON.stringify(content, null, 2) }));
        setImportStatus(prev => ({ ...prev, [tableId]: 'File selected' }));
      } catch (error) {
        console.error("Error parsing JSON file:", error);
        setJsonData(prev => ({ ...prev, [tableId]: "Invalid JSON file" }));
        setImportStatus(prev => ({ ...prev, [tableId]: 'Error: Invalid JSON' }));
      }
    };
    reader.readAsText(file);
  };

  const handleJsonChange = (tableId, e) => {
    setJsonData(prev => ({ ...prev, [tableId]: e.target.value }));
  };

  const handleTableSubmit = async (tableId) => {
    try {
      if (!jsonData[tableId]) {
        setImportStatus(prev => ({ ...prev, [tableId]: 'Error: No data provided' }));
        return;
      }

      // Validate JSON format first
      let parsedData;
      try {
        parsedData = JSON.parse(jsonData[tableId]);
        if (!Array.isArray(parsedData)) {
          setImportStatus(prev => ({ ...prev, [tableId]: 'Error: JSON must be an array' }));
          return;
        }
      } catch (error) {
        setImportStatus(prev => ({ ...prev, [tableId]: 'Error: Invalid JSON format' }));
        return;
      }

      setLoading(prev => ({ ...prev, [tableId]: true }));

      const endpoint = `https://tellicheri.onrender.com/api/import/${tableEndpoints[tableId]}`;

      // Send data to backend API
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedData),
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const result = await response.json();

        if (response.ok) {
          setImportStatus(prev => ({ ...prev, [tableId]: `Success: ${result.message}` }));
          console.log(`Data imported for table ${tableId}:`, result);
        } else {
          setImportStatus(prev => ({ ...prev, [tableId]: `Error: ${result.message || 'Server error'}` }));
        }
      } else {
        // Handle non-JSON response (HTML error page)
        const text = await response.text();
        console.error('Non-JSON response:', text.substring(0, 200));

        if (response.ok) {
          setImportStatus(prev => ({ ...prev, [tableId]: 'Success: Data imported (non-JSON response)' }));
        } else {
          setImportStatus(prev => ({ ...prev, [tableId]: `Error: Server returned status ${response.status}` }));
        }
      }

    } catch (error) {
      console.error('Import error:', error);
      setImportStatus(prev => ({ ...prev, [tableId]: 'Error: Network error or server unavailable' }));
    } finally {
      setLoading(prev => ({ ...prev, [tableId]: false }));

      // Clear status message after 5 seconds
      setTimeout(() => {
        setImportStatus(prev => ({ ...prev, [tableId]: '' }));
      }, 5000);
    }
  };

  const tables = [
    { id: 1, name: 'Parishes' },
    { id: 2, name: 'Priest Status' },
    { id: 3, name: 'Priest Sub Status' },
    { id: 4, name: 'Priest Secondary Sub Status' },
    { id: 5, name: 'Priests' },
    { id: 6, name: 'Priest Histories' },
    { id: 7, name: 'Priest Educations' },
    { id: 8, name: 'Priest Others' },
    { id: 9, name: 'Administration' },
    { id: 10, name: 'Institutions' },
    { id: 11, name: 'Priest Designations' },
    { id: 12, name: 'Foranes' }   // ✅ new table option
  ];

  return (
    <AdminLayout>
      <Container fluid className="py-4">
        <h2 className="mb-4">Import Data</h2>

        {/* Tabs */}
        <div className="mb-4">
          <Button
            variant={activeTab === 'tables' ? 'primary' : 'outline-primary'}
            className="me-2"
            onClick={() => setActiveTab('tables')}
          >
            Table Import
          </Button>
          <Button
            variant={activeTab === 'import' ? 'primary' : 'outline-primary'}
            onClick={() => setActiveTab('import')}
          >
            Bulk JSON Import
          </Button>
        </div>

        {activeTab === 'import' ? (
          <Card>
            <Card.Header>
              <h5>Bulk JSON Import</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Upload JSON File</Form.Label>
                    <Form.Control type="file" accept=".json" onChange={(e) => handleFileChange('bulk', e)} />
                  </Form.Group>

                  {selectedFiles['bulk'] && (
                    <Alert variant="info">
                      Selected file: {selectedFiles['bulk'].name}
                    </Alert>
                  )}

                  <Button
                    variant="primary"
                    onClick={() => handleTableSubmit('bulk')}
                    className="mt-3"
                    disabled={loading['bulk']}
                  >
                    {loading['bulk'] ? <Spinner animation="border" size="sm" /> : 'Import Data'}
                  </Button>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Or paste JSON data below:</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={12}
                      value={jsonData['bulk'] || ''}
                      onChange={(e) => handleJsonChange('bulk', e)}
                      placeholder='Paste JSON data here or upload a file'
                    />
                  </Form.Group>
                  <Alert variant="info">
                    {/* For priests data, use format: [{"id":"2","name":"GEORGE1","official_name":"GEORGE",...}] */}
                  </Alert>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ) : (
          <Card>
            <Card.Header>
              <h5>Import Tables</h5>
            </Card.Header>
            <Card.Body>
              <Table responsive striped bordered>
                <thead className="table-dark">
                  <tr>
                    <th>S.No</th>
                    <th>Table Name</th>
                    <th>Upload File</th>
                    <th>JSON Data</th>
                    <th>Action</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tables.map((table) => (
                    <tr key={table.id}>
                      <td>{table.id}</td>
                      <td>{table.name}</td>
                      <td>
                        <Form.Group>
                          <Form.Control
                            type="file"
                            accept=".json"
                            onChange={(e) => handleFileChange(table.id, e)}
                            size="sm"
                          />
                        </Form.Group>
                      </td>
                      <td>
                        <Form.Group>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            value={jsonData[table.id] || ''}
                            onChange={(e) => handleJsonChange(table.id, e)}
                            placeholder={`Paste JSON for ${table.name}`}
                            size="sm"
                          />
                        </Form.Group>
                      </td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleTableSubmit(table.id)}
                          disabled={loading[table.id]}
                        >
                          {loading[table.id] ? <Spinner animation="border" size="sm" /> : 'Import'}
                        </Button>
                      </td>
                      <td>
                        {importStatus[table.id] && (
                          <Alert variant={
                            importStatus[table.id].startsWith('Success') ? 'success' :
                              importStatus[table.id].startsWith('Error') ? 'danger' : 'info'
                          } className="py-1 mb-0" style={{ fontSize: '0.8rem' }}>
                            {importStatus[table.id]}
                          </Alert>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        )}
      </Container>
    </AdminLayout>
  );
};

export default ImportData;