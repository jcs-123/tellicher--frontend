import React, { useEffect, useState } from 'react';
import {
    Container, Row, Col, Form, Button, Table, Spinner, Card
} from 'react-bootstrap';
import logo from '../../assets/logo.png';
import AdminLayout from '../../layouts/AdminLayout';
import axios from 'axios';
import { motion } from 'framer-motion';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from "jspdf-autotable";
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun, Table as DocxTable, TableRow, TableCell } from 'docx';

const fieldOptions = [
    { key: 'name', label: 'Name' },
    { key: 'imageUrl', label: 'Photo' },
    { key: 'adminType', label: 'Administration Type' },
    { key: 'category', label: 'Category' },
    { key: 'designation', label: 'Designation' },
    { key: 'address', label: 'Address' },
    { key: 'email', label: 'Email ID' },
    { key: 'phone', label: 'Phone Number' },
    { key: 'mobile', label: 'Mobile Number' },
];

const AdminReport = () => {
    const [selectedFields, setSelectedFields] = useState(fieldOptions.map(f => f.key));
    const [adminType, setAdminType] = useState('');
    const [category, setCategory] = useState('');
    const [selectAll, setSelectAll] = useState(true);
    const [adminData, setAdminData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isExporting, setIsExporting] = useState(false);

    const handleFieldToggle = (key) => {
        if (selectedFields.includes(key)) {
            const updated = selectedFields.filter(f => f !== key);
            setSelectedFields(updated);
            setSelectAll(false);
        } else {
            const updated = [...selectedFields, key];
            setSelectedFields(updated);
            if (updated.length === fieldOptions.length) setSelectAll(true);
        }
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedFields([]);
            setSelectAll(false);
        } else {
            setSelectedFields(fieldOptions.map(f => f.key));
            setSelectAll(true);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/administration');
                setAdminData(res.data || []);
            } catch (error) {
                console.error('Failed to fetch admin data:', error);
                setAdminData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const generateExcel = () => {
        setIsExporting(true);

        // Prepare data for Excel
        const headers = ['Sl No', ...selectedFields.map(field => fieldOptions.find(f => f.key === field)?.label)];
        const data = adminData.map((item, index) => {
            const row = [index + 1];
            selectedFields.forEach(field => {
                row.push(item[field] || '-');
            });
            return row;
        });

        const worksheet = XLSX.utils.aoa_to_sheet([
            ['Archdiocese of Tellicherry - ADMINISTRATION LIST 2025'],
            [],
            headers,
            ...data
        ]);

        // Merge title cells
        worksheet['!merges'] = [
            { s: { r: 0, c: 0 }, e: { r: 0, c: headers.length } }
        ];

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Administration");

        // Export the workbook
        XLSX.writeFile(workbook, 'Administration_List.xlsx');
        setIsExporting(false);
    };

    const generatePDF = () => {
        setIsExporting(true);

        // Initialize jsPDF (landscape mode)
        const doc = new jsPDF({
            orientation: "landscape",
            unit: "mm"
        });

        // Add title and subtitle
        doc.setFontSize(16);
        doc.setTextColor(40);
        doc.text("Archdiocese of Tellicherry", doc.internal.pageSize.width / 2, 10, { align: "center" });
        doc.setFontSize(14);
        doc.text("ADMINISTRATION LIST 2025", doc.internal.pageSize.width / 2, 18, { align: "center" });

        // Prepare table data
        const headers = [
            "Sl No",
            ...selectedFields.map(field => fieldOptions.find(f => f.key === field)?.label)
        ];

        const data = adminData.map((item, index) => {
            const row = [index + 1];
            selectedFields.forEach(field => {
                // Handle image URLs specially
                if (field === 'imageUrl') {
                    row.push(item[field] ? '[Photo]' : '-');
                } else {
                    row.push(item[field] || '-');
                }
            });
            return row;
        });

        // Generate the table using autoTable
        autoTable(doc, {
            head: [headers],
            body: data,
            startY: 25,
            margin: { horizontal: 10 },
            styles: {
                fontSize: 8,
                cellPadding: 2,
                overflow: 'linebreak'
            },
            headStyles: {
                fillColor: [33, 37, 41], // Dark gray
                textColor: 255, // White
                fontStyle: 'bold'
            },
            alternateRowStyles: {
                fillColor: [240, 240, 240] // Light gray
            },
            columnStyles: {
                0: { cellWidth: 10 } // Make Sl No column narrower
            }
        });

        // Add footer with current date
        const date = new Date().toLocaleDateString();
        doc.setFontSize(10);
        doc.text(`Generated on: ${date}`, 10, doc.internal.pageSize.height - 10);

        // Save the PDF
        doc.save("Administration_List.pdf");
        setIsExporting(false);
    };

    const generateDOC = async () => {
        setIsExporting(true);

        const children = [];

        // Add title
        children.push(
            new Paragraph({
                children: [
                    new TextRun({
                        text: "Archdiocese of Tellicherry",
                        bold: true,
                        size: 28
                    })
                ],
                alignment: "center",
                spacing: { after: 200 }
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: "ADMINISTRATION LIST 2025",
                        bold: true,
                        size: 24
                    })
                ],
                alignment: "center",
                spacing: { after: 400 }
            })
        );

        // Create table rows
        const tableRows = [];

        // Add header row
        const headerCells = [
            new TableCell({
                children: [new Paragraph({ text: "Sl No", bold: true })]
            }),
            ...selectedFields.map(field =>
                new TableCell({
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: fieldOptions.find(f => f.key === field)?.label,
                                    bold: true
                                })
                            ]
                        })
                    ]
                })
            )
        ];
        tableRows.push(new TableRow({ children: headerCells }));

        // Add data rows
        adminData.forEach((item, index) => {
            const rowCells = [
                new TableCell({
                    children: [
                        new Paragraph({
                            text: (index + 1).toString()
                        })
                    ]
                })
            ];

            selectedFields.forEach(field => {
                rowCells.push(
                    new TableCell({
                        children: [
                            new Paragraph({
                                text: item[field] || '-'
                            })
                        ]
                    })
                );
            });

            tableRows.push(new TableRow({ children: rowCells }));
        });

        children.push(
            new DocxTable({
                rows: tableRows,
                width: {
                    size: 100,
                    type: "PERCENTAGE"
                }
            })
        );

        const doc = new Document({
            sections: [{
                children: children
            }]
        });

        Packer.toBlob(doc).then(blob => {
            saveAs(blob, "Administration_List.docx");
            setIsExporting(false);
        });
    };

    return (
        <AdminLayout>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Container fluid className="px-4 py-4">
                    <motion.h4
                        className="mb-3 fw-bold"
                        initial={{ y: -20 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        Administration <span className="text-muted">Report</span>
                    </motion.h4>

                    <Row className="g-3 align-items-center mb-3">
                        <Col md={3}>
                            <Form.Label>Administration Type</Form.Label>
                            <Form.Select value={adminType} onChange={(e) => setAdminType(e.target.value)}>
                                <option>--select a type--</option>
                                <option>Archeparchial Curia</option>
                                <option>Forane</option>
                            </Form.Select>
                        </Col>
                        <Col md={3}>
                            <Form.Label>Category</Form.Label>
                            <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option>--select category--</option>
                                <option>Archbishop</option>
                                <option>Syncellus</option>
                            </Form.Select>
                        </Col>
                        <Col md={6}>
                            <Row>
                                <Col xs={6}>
                                    <Form.Check
                                        type="checkbox"
                                        label="Select all fields"
                                        checked={selectAll}
                                        onChange={handleSelectAll}
                                        className="mb-2"
                                    />
                                    {fieldOptions.slice(0, 4).map(field => (
                                        <Form.Check
                                            key={field.key}
                                            type="checkbox"
                                            label={field.label}
                                            checked={selectedFields.includes(field.key)}
                                            onChange={() => handleFieldToggle(field.key)}
                                        />
                                    ))}
                                </Col>
                                <Col xs={6}>
                                    {fieldOptions.slice(4).map(field => (
                                        <Form.Check
                                            key={field.key}
                                            type="checkbox"
                                            label={field.label}
                                            checked={selectedFields.includes(field.key)}
                                            onChange={() => handleFieldToggle(field.key)}
                                        />
                                    ))}
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <div className="d-flex justify-content-start mb-3">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                variant="danger"
                                className="me-2"
                                onClick={generatePDF}
                                disabled={isExporting || loading}
                            >
                                {isExporting ? 'Creating...' : 'Create PDF'}
                            </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                variant="success"
                                className="me-2"
                                onClick={generateDOC}
                                disabled={isExporting || loading}
                            >
                                {isExporting ? 'Creating...' : 'Create DOC'}
                            </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                variant="warning"
                                className="text-white"
                                onClick={generateExcel}
                                disabled={isExporting || loading}
                            >
                                {isExporting ? 'Creating...' : 'Create Excel'}
                            </Button>
                        </motion.div>
                    </div>

                    <motion.div
                        className="text-center my-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <img src={logo} alt="logo" height={60} className="mb-2" />
                        <h5 className="fw-bold text-uppercase mb-0">Archdiocese of Tellicherry</h5>
                        <h6 className="text-primary fw-semibold text-center my-3">
                            ADMINISTRATION LIST 2025
                        </h6>
                    </motion.div>

                    {loading ? (
                        <motion.div
                            className="text-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Spinner animation="border" variant="primary" />
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card className="shadow-sm">
                                <Card.Body style={{ overflowX: 'auto' }}>
                                    <Table
                                        bordered
                                        responsive
                                        size="sm"
                                        className="text-center align-middle small"
                                    >
                                        <thead className="table-dark">
                                            <tr>
                                                <th>Sl No</th>
                                                {selectedFields.map(field => (
                                                    <th key={field}>{fieldOptions.find(f => f.key === field)?.label}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {adminData.map((person, index) => (
                                                <motion.tr
                                                    key={index}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: index * 0.05 }}
                                                >
                                                    <td>{index + 1}</td>
                                                    {selectedFields.map(field => (
                                                        <td key={field}>
                                                            {field === 'imageUrl' ? (
                                                                person.imageUrl ? (
                                                                    <img
                                                                        src={person.imageUrl}
                                                                        alt="profile"
                                                                        height={40}
                                                                        width={40}
                                                                        style={{ objectFit: 'cover', borderRadius: '4px' }}
                                                                    />
                                                                ) : (
                                                                    '-'
                                                                )
                                                            ) : (
                                                                <span style={{ fontSize: '0.85rem' }}>
                                                                    {person[field] || '-'}
                                                                </span>
                                                            )}
                                                        </td>
                                                    ))}

                                                </motion.tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </motion.div>
                    )}
                </Container>
            </motion.div>
        </AdminLayout>
    );
};

export default AdminReport;