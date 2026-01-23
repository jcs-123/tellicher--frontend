// pages/admin/DataViewer.jsx
import React, { useState, useEffect } from 'react';
import { 
  Tabs, Tab, Table, Form, InputGroup, Button, 
  Spinner, Badge, Alert, Pagination, Modal, Row, Col, Card 
} from 'react-bootstrap';
import { FaSearch, FaDownload, FaEye, FaTimes, FaDatabase } from 'react-icons/fa';
import AdminLayout from '../../layouts/AdminLayout';
import axios from 'axios';

const DataViewer = () => {
  const [activeTab, setActiveTab] = useState('parishes');
  const [data, setData] = useState({});
  const [loading, setLoading] = useState({});
  const [counts, setCounts] = useState({});
  const [search, setSearch] = useState({});
  const [pagination, setPagination] = useState({});
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [databaseSummary, setDatabaseSummary] = useState(null);

  const tables = [
    { 
      key: 'parishes', 
      name: 'Parishes', 
      icon: '⛪', 
      columns: ['name', 'place', 'vicar_name', 'phone', 'state'],
      searchFields: ['name', 'place', 'vicar_name', 'address', 'forane_name']
    },
    { 
      key: 'priests', 
      name: 'Priests', 
      icon: '👨‍💼', 
      columns: ['name', 'email', 'mobile', 'designation', 'current_place'],
      searchFields: ['name', 'email', 'mobile', 'designation', 'current_place']
    },
    { 
      key: 'priest-status', 
      name: 'Priest Status', 
      icon: '📋', 
      columns: ['id', 'pstatus', 'display_order', 'state'],
      searchFields: ['pstatus', 'id']
    },
    { 
      key: 'priest-sub-status', 
      name: 'Priest Sub Status', 
      icon: '📝', 
      columns: ['id', 'main_status_id', 'status', 'display_order'],
      searchFields: ['status', 'main_status_id']
    },
    { 
      key: 'priest-secondary-sub-status', 
      name: 'Sec Sub Status', 
      icon: '📑', 
      columns: ['id', 'main_status_id', 'secondary_status_id', 'status'],
      searchFields: ['status', 'main_status_id', 'secondary_status_id']
    },
    { 
      key: 'priest-histories', 
      name: 'Priest Histories', 
      icon: '📜', 
      columns: ['priest_id', 'designation', 'start_date', 'end_date', 'category_type'],
      searchFields: ['priest_id', 'designation', 'category_type', 'category_id']
    },
    { 
      key: 'priest-educations', 
      name: 'Priest Educations', 
      icon: '🎓', 
      columns: ['web_priest_id', 'course_type', 'institution', 'start_date'],
      searchFields: ['web_priest_id', 'course_type', 'institution', 'course']
    },
    { 
      key: 'priest-designations', 
      name: 'Designations', 
      icon: '🏷️', 
      columns: ['name', 'sort_order', 'status'],
      searchFields: ['name', 'status']
    },
    { 
      key: 'institutions', 
      name: 'Institutions', 
      icon: '🏛️', 
      columns: ['name', 'place', 'estd', 'web_institution_type_id'],
      searchFields: ['name', 'place', 'web_institution_type_id']
    },
    { 
      key: 'foranes', 
      name: 'Foranes', 
      icon: '🗺️', 
      columns: ['name', 'place', 'vicar', 'archival_code'],
      searchFields: ['name', 'place', 'vicar', 'archival_code']
    },
    { 
      key: 'administration', 
      name: 'Administration', 
      icon: '⚙️', 
      columns: ['section', 'category', 'name', 'head_id'],
      searchFields: ['name', 'section', 'category', 'head_id']
    },
    { 
      key: 'priest-others', 
      name: 'Priest Others', 
      icon: '👥', 
      columns: ['name', 'designation', 'mobile', 'ordination_date'],
      searchFields: ['name', 'designation', 'mobile']
    },
  ];

  // Fetch database summary
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get('https://tellicheri.onrender.com/api/import/summary');
        if (response.data.success) {
          setDatabaseSummary(response.data);
        }
      } catch (error) {
        console.error('Error fetching database summary:', error);
      }
    };
    fetchSummary();
  }, []);

  // Fetch data for active tab
  useEffect(() => {
    const fetchData = async () => {
      const currentPage = pagination[activeTab]?.page || 1;
      const currentSearch = search[activeTab] || '';
      
      setLoading(prev => ({ ...prev, [activeTab]: true }));
      try {
        const response = await axios.get(`https://tellicheri.onrender.com/api/import/${activeTab}`, {
          params: { 
            search: currentSearch,
            page: currentPage,
            limit: 20
          }
        });
        
        if (response.data.success) {
          setData(prev => ({ ...prev, [activeTab]: response.data.data || [] }));
          setCounts(prev => ({ ...prev, [activeTab]: response.data.count || 0 }));
          setPagination(prev => ({
            ...prev,
            [activeTab]: {
              page: response.data.page || currentPage,
              totalPages: response.data.totalPages || 1,
              totalItems: response.data.count || 0
            }
          }));
        }
      } catch (error) {
        console.error(`Error fetching ${activeTab}:`, error);
        // Set empty data on error
        setData(prev => ({ ...prev, [activeTab]: [] }));
        setCounts(prev => ({ ...prev, [activeTab]: 0 }));
      } finally {
        setLoading(prev => ({ ...prev, [activeTab]: false }));
      }
    };

    fetchData();
  }, [activeTab, pagination[activeTab]?.page, search[activeTab]]);

  // Fetch counts for all tables on mount
  useEffect(() => {
    const fetchCounts = async () => {
      const newCounts = {};
      for (const table of tables) {
        try {
          const response = await axios.get(`https://tellicheri.onrender.com/api/import/${table.key}`, { 
            params: { limit: 1 } 
          });
          newCounts[table.key] = response.data.count || response.data.data?.length || 0;
        } catch {
          newCounts[table.key] = 0;
        }
      }
      setCounts(newCounts);
    };
    fetchCounts();
  }, []);

  const handleSearch = (e, tableKey) => {
    e.preventDefault();
    const searchValue = e.target.search.value;
    setSearch(prev => ({ ...prev, [tableKey]: searchValue }));
    // Reset to page 1 when searching
    setPagination(prev => ({
      ...prev,
      [tableKey]: { ...prev[tableKey], page: 1 }
    }));
  };

  const handlePageChange = (tableKey, newPage) => {
    setPagination(prev => ({
      ...prev,
      [tableKey]: { ...prev[tableKey], page: newPage }
    }));
  };

  const exportCSV = (tableKey) => {
    const tableData = data[tableKey] || [];
    if (tableData.length === 0) return;
    
    const tableConfig = tables.find(t => t.key === tableKey);
    const columns = tableConfig?.columns || [];
    
    // Get all unique columns from data
    const allColumns = [...new Set(
      tableData.flatMap(item => Object.keys(item))
    )].filter(col => !col.startsWith('_'));
    
    const csvContent = [
      allColumns.join(','),
      ...tableData.map(row => 
        allColumns.map(col => 
          JSON.stringify(row[col] || '')
        ).join(',')
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tableKey}_export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const viewRecordDetails = (record) => {
    setSelectedRecord(record);
    setShowDetailModal(true);
  };

  const formatValue = (key, value) => {
    if (value === null || value === undefined || value === '') return '-';
    
    // Format dates
    if (key.includes('_date') || key.includes('date_') || key === 'dob' || key === 'estd') {
      try {
        const date = new Date(value);
        return !isNaN(date.getTime()) ? date.toLocaleDateString() : value;
      } catch {
        return value;
      }
    }
    
    // Format boolean
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    
    // Truncate long text
    const strValue = String(value);
    return strValue.length > 100 ? strValue.substring(0, 100) + '...' : strValue;
  };

  return (
    <AdminLayout>
      <div className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1><FaDatabase /> Data Viewer - All Tables</h1>
          {databaseSummary && (
            <Badge bg="info" className="fs-6">
              Total Records: {databaseSummary.totalRecords || 0}
            </Badge>
          )}
        </div>

        {/* Database Summary Alert */}
        {databaseSummary && (
          <Alert variant="info" className="mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <strong>Database Status:</strong> {databaseSummary.totalTables} tables loaded with{' '}
                {databaseSummary.totalRecords} total records
              </div>
              <small>Last updated: {new Date(databaseSummary.timestamp).toLocaleString()}</small>
            </div>
          </Alert>
        )}

        <Tabs 
          activeKey={activeTab} 
          onSelect={(k) => setActiveTab(k)} 
          className="mb-4"
          variant="pills"
        >
          {tables.map(table => (
            <Tab 
              key={table.key}
              eventKey={table.key}
              title={
                <span className="d-flex align-items-center">
                  <span className="me-2">{table.icon}</span>
                  {table.name}
                  <Badge bg="secondary" className="ms-2" pill>
                    {counts[table.key] || 0}
                  </Badge>
                </span>
              }
            >
              <div className="mt-3">
                <Card>
                  <Card.Header className="d-flex justify-content-between align-items-center">
                    <div>
                      <h4 className="mb-0">
                        {table.icon} {table.name} Data
                        <Badge bg="primary" className="ms-2">
                          {counts[table.key] || 0} records
                        </Badge>
                      </h4>
                      <small className="text-muted">
                        Search in: {table.searchFields?.join(', ') || 'all fields'}
                      </small>
                    </div>
                    <div>
                      <Button 
                        variant="outline-success" 
                        size="sm"
                        className="me-2"
                        onClick={() => exportCSV(table.key)}
                        disabled={!data[table.key]?.length}
                      >
                        <FaDownload /> Export CSV
                      </Button>
                      <Button 
                        variant="outline-info" 
                        size="sm"
                        onClick={() => window.location.href = `https://tellicheri.onrender.com/admin/tools/import`}
                      >
                        Import More
                      </Button>
                    </div>
                  </Card.Header>
                  
                  <Card.Body>
                    {/* Search Bar */}
                    <Form onSubmit={(e) => handleSearch(e, table.key)} className="mb-3">
                      <InputGroup>
                        <InputGroup.Text>
                          <FaSearch />
                        </InputGroup.Text>
                        <Form.Control
                          name="search"
                          placeholder={`Search ${table.name.toLowerCase()}...`}
                          defaultValue={search[table.key] || ''}
                        />
                        <Button type="submit" variant="primary">
                          Search
                        </Button>
                        {search[table.key] && (
                          <Button 
                            variant="outline-secondary"
                            onClick={() => {
                              setSearch(prev => ({ ...prev, [table.key]: '' }));
                              setPagination(prev => ({
                                ...prev,
                                [table.key]: { ...prev[table.key], page: 1 }
                              }));
                            }}
                          >
                            <FaTimes />
                          </Button>
                        )}
                      </InputGroup>
                    </Form>

                    {/* Table */}
                    {loading[activeTab] ? (
                      <div className="text-center my-5">
                        <Spinner animation="border" variant="primary" />
                        <p className="mt-2">Loading {table.name} data...</p>
                      </div>
                    ) : (
                      <>
                        <div className="table-responsive" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                          <Table striped bordered hover size="sm">
                            <thead style={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1 }}>
                              <tr>
                                <th width="50">#</th>
                                {table.columns.map(col => (
                                  <th key={col} className="text-nowrap">
                                    {col.replace(/_/g, ' ').toUpperCase()}
                                  </th>
                                ))}
                                <th width="80">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {(!data[table.key] || data[table.key].length === 0) ? (
                                <tr>
                                  <td colSpan={table.columns.length + 2} className="text-center py-4">
                                    <div className="text-muted">
                                      No data found {search[table.key] ? 'for your search' : 'in this table'}
                                    </div>
                                  </td>
                                </tr>
                              ) : (
                                data[table.key].map((item, index) => {
                                  const startIndex = ((pagination[table.key]?.page || 1) - 1) * 20;
                                  return (
                                    <tr key={item.id || item._id || index}>
                                      <td>{startIndex + index + 1}</td>
                                      {table.columns.map(col => (
                                        <td 
                                          key={col} 
                                          style={{ 
                                            maxWidth: '200px', 
                                            overflow: 'hidden', 
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                          }}
                                          title={item[col] ? String(item[col]) : ''}
                                        >
                                          {formatValue(col, item[col])}
                                        </td>
                                      ))}
                                      <td>
                                        <Button
                                          variant="info"
                                          size="sm"
                                          onClick={() => viewRecordDetails(item)}
                                          title="View Details"
                                        >
                                          <FaEye />
                                        </Button>
                                      </td>
                                    </tr>
                                  );
                                })
                              )}
                            </tbody>
                          </Table>
                        </div>

                        {/* Pagination */}
                        {pagination[table.key]?.totalPages > 1 && (
                          <div className="d-flex justify-content-between align-items-center mt-3">
                            <div className="text-muted">
                              Showing page {pagination[table.key]?.page || 1} of {pagination[table.key]?.totalPages || 1}
                            </div>
                            <Pagination className="mb-0">
                              <Pagination.Prev
                                disabled={pagination[table.key]?.page <= 1}
                                onClick={() => handlePageChange(table.key, (pagination[table.key]?.page || 1) - 1)}
                              />
                              {Array.from({ length: Math.min(5, pagination[table.key]?.totalPages || 1) }, (_, i) => {
                                const pageNum = i + 1;
                                return (
                                  <Pagination.Item
                                    key={pageNum}
                                    active={pageNum === (pagination[table.key]?.page || 1)}
                                    onClick={() => handlePageChange(table.key, pageNum)}
                                  >
                                    {pageNum}
                                  </Pagination.Item>
                                );
                              })}
                              <Pagination.Next
                                disabled={(pagination[table.key]?.page || 1) >= (pagination[table.key]?.totalPages || 1)}
                                onClick={() => handlePageChange(table.key, (pagination[table.key]?.page || 1) + 1)}
                              />
                            </Pagination>
                          </div>
                        )}

                        {data[table.key]?.length > 0 && (
                          <Alert variant="info" className="mt-3">
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                Showing {data[table.key].length} records of {counts[table.key] || 0}
                              </div>
                              <Button 
                                variant="link" 
                                size="sm"
                                onClick={() => window.location.href = `/admin/data/${table.key.replace('-', '')}`}
                              >
                                View advanced filters
                              </Button>
                            </div>
                          </Alert>
                        )}
                      </>
                    )}
                  </Card.Body>
                </Card>
              </div>
            </Tab>
          ))}
        </Tabs>

        {/* Summary Cards */}
        <div className="row mt-4">
          <div className="col-12">
            <Card className="shadow-sm">
              <Card.Header className="bg-primary text-white">
                <h5 className="mb-0">📊 Database Summary</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  {tables.map(table => (
                    <Col key={table.key} xs={6} md={4} lg={2} className="mb-3">
                      <Card 
                        className={`h-100 text-center ${activeTab === table.key ? 'border-primary border-2' : ''}`}
                        style={{ cursor: 'pointer' }}
                        onClick={() => setActiveTab(table.key)}
                      >
                        <Card.Body className="d-flex flex-column justify-content-center">
                          <div className="display-5 mb-2">{table.icon}</div>
                          <Card.Title className="fs-6 mb-1">{table.name}</Card.Title>
                          <Badge 
                            bg={activeTab === table.key ? 'primary' : 'secondary'} 
                            className="mt-1"
                          >
                            {counts[table.key] || 0}
                          </Badge>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
              {databaseSummary && (
                <Card.Footer className="text-center">
                  <small className="text-muted">
                    Database contains <strong>{databaseSummary.totalRecords}</strong> records across{' '}
                    <strong>{databaseSummary.totalTables}</strong> tables
                  </small>
                </Card.Footer>
              )}
            </Card>
          </div>
        </div>

        {/* Record Detail Modal */}
        <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Record Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedRecord && (
              <div className="row">
                {Object.entries(selectedRecord).map(([key, value]) => {
                  if (key.startsWith('_')) return null; // Skip MongoDB internal fields
                  return (
                    <div key={key} className="col-md-6 mb-3">
                      <Card>
                        <Card.Header className="py-2">
                          <strong>{key.replace(/_/g, ' ').toUpperCase()}</strong>
                        </Card.Header>
                        <Card.Body className="py-2">
                          {typeof value === 'object' ? (
                            <pre className="mb-0" style={{ fontSize: '0.8rem' }}>
                              {JSON.stringify(value, null, 2)}
                            </pre>
                          ) : (
                            <div>{formatValue(key, value)}</div>
                          )}
                        </Card.Body>
                      </Card>
                    </div>
                  );
                })}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default DataViewer;