import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table, Spinner } from 'react-bootstrap';
import logo from '../../assets/logo.png';
import AdminLayout from '../../layouts/AdminLayout';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Document, Paragraph, Packer, TextRun, Table as DocxTable, TableRow, TableCell, WidthType, BorderStyle } from 'docx';

const ParishReport = () => {
    const fieldLabels = [
        'Sl No',
        'Parish Name',
        'Patron Name',
        'Photo',
        'Parish Type',
        'Shrine',
        'Forane',
        'Place',
        'Address',
        'Grade',
        'Phone Number',
        'Mobile',
        'Whatsapp Number',
        'Email-Id',
        'Website',
        'Vicar Name',
        'Asst. Vicar Name',
        'Area (in Sq.Km)',
        'No: of Family Units',
        'No: of Families',
        'Total Population',
        'Established Year',
        'Status'
    ];

    const fieldKeyMap = {
        'Sl No': 'sl_no',
        'Parish Name': 'name',
        'Patron Name': 'patron_name',
        'Photo': 'photo',
        'Parish Type': 'type',
        'Shrine': 'shrine',
        'Forane': 'forane_id',
        'Place': 'place',
        'Address': 'address',
        'Grade': 'grade',
        'Phone Number': 'phone',
        'Mobile': 'mobile',
        'Whatsapp Number': 'whatsapp_number',
        'Email-Id': 'email',
        'Website': 'website',
        'Vicar Name': 'vicar_id',
        'Asst. Vicar Name': 'asstvicar_id',
        'Area (in Sq.Km)': 'area',
        'No: of Family Units': 'no_family_units',
        'No: of Families': 'no_families',
        'Total Population': 'total_population',
        'Established Year': 'estb_date',
        'Status': 'status'
    };

    const [selectedFields, setSelectedFields] = useState(
        fieldLabels.reduce((acc, label) => {
            acc[label] = true;
            return acc;
        }, {})
    );
    const [isAllSelected, setIsAllSelected] = useState(true);
    const [parishData, setParishData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [reportTitle, setReportTitle] = useState('PARISH LIST 2025');

    useEffect(() => {
        fetchParishData();
    }, []);

    const fetchParishData = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://tellicheri.onrender.com/api/parishes');
            const data = await response.json();
            setParishData(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching parish data:', error);
            setLoading(false);
        }
    };

    const handleSelectAll = () => {
        const newSelection = fieldLabels.reduce((acc, label) => {
            acc[label] = !isAllSelected;
            return acc;
        }, {});
        setSelectedFields(newSelection);
        setIsAllSelected(!isAllSelected);
    };

    const handleFieldChange = (label) => {
        const updatedFields = {
            ...selectedFields,
            [label]: !selectedFields[label],
        };
        setSelectedFields(updatedFields);
        setIsAllSelected(Object.values(updatedFields).every(Boolean));
    };

    const getDisplayFields = () => fieldLabels.filter(label => selectedFields[label]);

    const generatePDF = () => {
        setIsExporting(true);

        const doc = new jsPDF({
            orientation: "landscape",
            unit: "mm"
        });

        // Add logo if available
        if (logo) {
            const imgData = logo;
            doc.addImage(imgData, 'PNG', 10, 5, 30, 15);
        }

        // Title styling
        doc.setFontSize(16);
        doc.setTextColor(40);
        doc.setFont("helvetica", "bold");
        doc.text("PARSH LIST", doc.internal.pageSize.width / 2, 15, { align: "center" });

        // Subtitle
        doc.setFontSize(14);
        doc.text("ARCHDIOCESE OF TELLICHERRY", doc.internal.pageSize.width / 2, 22, { align: "center" });

        // Report title
        doc.setFontSize(12);
        doc.text(reportTitle, doc.internal.pageSize.width / 2, 28, { align: "center" });

        // Get selected fields
        const selectedHeaders = getDisplayFields();

        // Map to display names
        const headerDisplayNames = selectedHeaders.map(header => {
            if (header === 'Sl No') return 'SI No';
            if (header === 'Shrine') return 'Skrine';
            return header;
        });

        // Prepare data
        const selectedData = parishData.map((item, index) => {
            return selectedHeaders.map(label => {
                if (label === 'Sl No') return index + 1;
                const key = fieldKeyMap[label];

                if (label === 'Photo') return item[key] ? 'Yes' : 'No';
                if (label === 'Shrine') return item[key] || 'No';

                return item[key] || '-';
            });
        });

        // Calculate column widths
        const pageWidth = doc.internal.pageSize.width - 20;
        const minColWidth = 15;
        const maxColWidth = 40;

        // Calculate optimal widths based on content
        const colWidths = selectedHeaders.map(header => {
            const contentLength = Math.max(
                header.length,
                ...selectedData.map(row => {
                    const idx = selectedHeaders.indexOf(header);
                    return String(row[idx]).length;
                })
            );

            let width = Math.min(
                maxColWidth,
                Math.max(minColWidth, contentLength * 1.5)
            );

            // Special cases
            if (header === 'Sl No') return 10;
            if (header === 'Photo') return 15;
            if (header === 'Grade') return 12;
            if (header === 'Shrine') return 15;

            return width;
        });

        // Adjust total width to fit page
        const totalWidth = colWidths.reduce((sum, width) => sum + width, 0);
        const scaleFactor = pageWidth / totalWidth;
        const adjustedWidths = colWidths.map(width => width * scaleFactor);

        // Create column styles
        const columnStyles = {};
        selectedHeaders.forEach((header, idx) => {
            columnStyles[idx] = {
                cellWidth: adjustedWidths[idx],
                halign: header === 'Sl No' || header === 'Photo' || header === 'Shrine' || header === 'Grade'
                    ? 'center' : 'left',
                valign: 'middle'
            };
        });

        // Generate table
        autoTable(doc, {
            head: [headerDisplayNames],
            body: selectedData,
            startY: 35,
            margin: { horizontal: 10 },
            styles: {
                fontSize: 8,
                cellPadding: 3,
                overflow: 'linebreak',
                valign: 'middle',
                lineColor: [50, 50, 50],
                lineWidth: 0.2,
                textColor: [0, 0, 0],
                fontStyle: 'normal'
            },
            headStyles: {
                fillColor: [70, 130, 180], // Dark gray
                textColor: [255, 255, 255], // White
                fontStyle: 'bold',
                halign: 'center',
                lineWidth: 0.5,
                lineColor: [50, 50, 50]
            },
            bodyStyles: {
                fillColor: [255, 255, 255], // White
                textColor: [0, 0, 0], // Black
                lineWidth: 0.2
            },
            columnStyles,
            alternateRowStyles: {
                fillColor: [245, 245, 245] // Light gray
            },
            didDrawPage: (data) => {
                // Footer
                const pageCount = doc.internal.getNumberOfPages();
                doc.setFontSize(8);
                doc.setTextColor(100);
                doc.text(`Page ${data.pageNumber} of ${pageCount}`,
                    doc.internal.pageSize.width - 15,
                    doc.internal.pageSize.height - 10);

                doc.text(`Generated on: ${new Date().toLocaleDateString()}`,
                    15,
                    doc.internal.pageSize.height - 10);
            }
        });

        doc.save(`${reportTitle.replace(/\s+/g, '_')}.pdf`);
        setIsExporting(false);
    };

    const generateExcel = () => {
        setIsExporting(true);

        // Prepare data
        const headers = getDisplayFields();
        const data = parishData.map((item, index) => {
            return getDisplayFields().map(label => {
                if (label === 'Sl No') return index + 1;
                const key = fieldKeyMap[label];
                return item[key] || '-';
            });
        });

        // Create worksheet
        const worksheet = XLSX.utils.aoa_to_sheet([
            [`ARCHDIOCESE OF TELLICHERRY - ${reportTitle}`],
            [],
            headers,
            ...data
        ]);

        // Merge title cells
        worksheet['!merges'] = [
            { s: { r: 0, c: 0 }, e: { r: 0, c: headers.length - 1 } }
        ];

        // Set column widths
        const colWidths = headers.map(header => ({
            wch: header === 'Sl No' ? 5 :
                header === 'Photo' ? 10 :
                    header.length > 15 ? 20 : 15
        }));
        worksheet['!cols'] = colWidths;

        // Create workbook
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Parishes");

        // Export
        XLSX.writeFile(workbook, `${reportTitle.replace(/\s+/g, '_')}.xlsx`);
        setIsExporting(false);
    };

    const generateDOC = async () => {
        setIsExporting(true);

        // Prepare data
        const headers = getDisplayFields();
        const data = parishData.map((item, index) => {
            return getDisplayFields().map(label => {
                if (label === 'Sl No') return (index + 1).toString();
                const key = fieldKeyMap[label];
                return item[key] || '-';
            });
        });

        // Create document
        const doc = new Document({
            styles: {
                paragraphStyles: [{
                    id: "normal",
                    name: "Normal",
                    run: {
                        size: 22,
                        font: "Arial"
                    },
                    paragraph: {
                        spacing: {
                            line: 276,
                        },
                    },
                }],
                tableStyles: {
                    defaultTableStyle: {
                        run: {
                            size: 20,
                            font: "Arial"
                        },
                        table: {
                            borders: {
                                top: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
                                bottom: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
                                left: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
                                right: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
                                insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                                insideVertical: { style: BorderStyle.SINGLE, size: 1, color: "000000" }
                            },
                            margins: {
                                top: 100,
                                bottom: 100,
                                left: 100,
                                right: 100
                            }
                        }
                    }
                }
            },
            sections: [{
                properties: {
                    page: {
                        margin: {
                            top: 1000,
                            right: 1000,
                            bottom: 1000,
                            left: 1000,
                        },
                    },
                },
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "PARSH LIST",
                                bold: true,
                                size: 28,
                                font: "Arial"
                            })
                        ],
                        alignment: "center",
                        spacing: { after: 200 }
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "ARCHDIOCESE OF TELLICHERRY",
                                bold: true,
                                size: 24,
                                font: "Arial"
                            })
                        ],
                        alignment: "center",
                        spacing: { after: 200 }
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: reportTitle,
                                bold: true,
                                size: 22,
                                font: "Arial"
                            })
                        ],
                        alignment: "center",
                        spacing: { after: 400 }
                    }),
                    new DocxTable({
                        rows: [
                            new TableRow({
                                children: headers.map(header =>
                                    new TableCell({
                                        children: [new Paragraph({
                                            children: [new TextRun({
                                                text: header,
                                                bold: true,
                                                size: 22
                                            })],
                                            alignment: "center"
                                        })],
                                        borders: {
                                            top: { style: BorderStyle.SINGLE, size: 6, color: "000000" },
                                            bottom: { style: BorderStyle.SINGLE, size: 6, color: "000000" },
                                            left: { style: BorderStyle.SINGLE, size: 6, color: "000000" },
                                            right: { style: BorderStyle.SINGLE, size: 6, color: "000000" }
                                        },
                                        shading: {
                                            fill: "FFFFFF",
                                            color: "000000"
                                        }
                                    })
                                ),
                                tableHeader: true
                            }),
                            ...data.map(row =>
                                new TableRow({
                                    children: row.map((cell, cellIndex) =>
                                        new TableCell({
                                            children: [new Paragraph({
                                                children: [new TextRun({
                                                    text: cell,
                                                    size: 20
                                                })],
                                                alignment: cellIndex === 0 ? "center" : "left",
                                                spacing: { line: 300 }
                                            })],
                                            borders: {
                                                top: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                                                bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                                                left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                                                right: { style: BorderStyle.SINGLE, size: 1, color: "000000" }
                                            }
                                        })
                                    )
                                })
                            )
                        ],
                        width: {
                            size: 100,
                            type: WidthType.PERCENTAGE
                        }
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: `Generated on: ${new Date().toLocaleDateString()}`,
                                size: 20,
                                italics: true
                            })
                        ],
                        alignment: "right",
                        spacing: { before: 600 }
                    })
                ]
            }]
        });

        Packer.toBlob(doc).then(blob => {
            saveAs(blob, `${reportTitle.replace(/\s+/g, '_')}.docx`);
            setIsExporting(false);
        });
    };

    return (
        <AdminLayout>
            <Container fluid className="p-4">
                <h5 className="mb-3 fw-bold">Parish <span className="text-muted">Report</span></h5>

                {/* Filters */}
                <Row className="mb-3">
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>Forane Name</Form.Label>
                            <Form.Select>
                                <option>-- Select a forane --</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>Parish Type</Form.Label>
                            <Form.Select>
                                <option>-- Select --</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>Parish Name (Max. 10 parishes)</Form.Label>
                            <Form.Control type="text" placeholder="Select a Parish" />
                        </Form.Group>
                    </Col>
                    <Col md={2}>
                        <Form.Group>
                            <Form.Label>Status</Form.Label>
                            <Form.Select>
                                <option>--select status--</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                {/* Second row */}
                <Row className="mb-3">
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>Shrine</Form.Label>
                            <Form.Select>
                                <option>--select a value--</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>Report Type</Form.Label>
                            <Form.Select>
                                <option>Parish Report</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={3} className="d-flex align-items-end">
                        <Form.Check
                            label="Select all fields"
                            checked={isAllSelected}
                            onChange={handleSelectAll}
                        />
                    </Col>
                </Row>

                {/* Checkboxes */}
                <Row className="mb-3">
                    {fieldLabels.map((label, index) => (
                        <Col xs={6} md={3} key={index}>
                            <Form.Check
                                type="checkbox"
                                label={label}
                                checked={selectedFields[label]}
                                onChange={() => handleFieldChange(label)}
                            />
                        </Col>
                    ))}
                </Row>

                {/* Report title & buttons */}
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Report Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={reportTitle}
                                onChange={(e) => setReportTitle(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={2} className="d-flex align-items-end">
                        <Button variant="primary" className="w-100" onClick={fetchParishData}>
                            Search
                        </Button>
                    </Col>
                </Row>

                {/* Export buttons */}
                <Row className="mb-4">
                    <Col md={2}>
                        <Button
                            variant="danger"
                            className="w-100"
                            onClick={generatePDF}
                            disabled={isExporting || loading}
                        >
                            {isExporting ? 'Creating PDF...' : 'Create PDF'}
                        </Button>
                    </Col>
                    <Col md={2}>
                        <Button
                            variant="success"
                            className="w-100"
                            onClick={generateDOC}
                            disabled={isExporting || loading}
                        >
                            {isExporting ? 'Creating DOC...' : 'Create DOC'}
                        </Button>
                    </Col>
                    <Col md={2}>
                        <Button
                            variant="warning"
                            className="w-100 text-white"
                            onClick={generateExcel}
                            disabled={isExporting || loading}
                        >
                            {isExporting ? 'Creating Excel...' : 'Create Excel'}
                        </Button>
                    </Col>
                </Row>

                {/* Branding */}
                <div className="text-center mt-5">
                    <img src={logo} alt="logo" height={60} className="mb-2" />
                    <h5 className="fw-bold text-uppercase mb-0">Archdiocese of Tellicherry</h5>
                    <h6 className="text-primary fw-semibold text-center my-3">
                        {reportTitle}
                    </h6>
                </div>

                {/* Table */}
                {/* Table Container */}
                <div className="table-responsive rounded-lg border border-gray-200 shadow-sm mt-6">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center p-8">
                            <Spinner animation="border" variant="primary" />
                            <p className="mt-3 text-gray-600">Loading parish data...</p>
                        </div>
                    ) : (
                        <Table bordered hover className="mb-0">
                            <thead className="bg-gray-800 text-white">
                                <tr>
                                    {getDisplayFields().map((label, idx) => (
                                        <th
                                            key={idx}
                                            className={`px-4 py-3 text-left font-medium ${['Sl No', 'Photo', 'Shrine', 'Grade'].includes(label)
                                                    ? 'text-center'
                                                    : 'text-left'
                                                }`}
                                            style={{
                                                minWidth: label === 'Sl No' ? '80px' :
                                                    label === 'Photo' ? '120px' :
                                                        label === 'Grade' ? '90px' : 'auto'
                                            }}
                                        >
                                            {label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {parishData.map((item, rowIdx) => (
                                    <tr key={rowIdx} className="hover:bg-gray-50">
                                        {getDisplayFields().map((label, colIdx) => {
                                            const key = fieldKeyMap[label];
                                            let value;

                                            if (label === 'Sl No') {
                                                value = (
                                                    <div className="text-center font-medium text-gray-700">
                                                        {rowIdx + 1}
                                                    </div>
                                                );
                                            } else if (label === 'Photo') {
                                                const photoUrl = item[key] || '';
                                                value = photoUrl ? (
                                                    <div className="flex justify-center">
                                                        <img
                                                            src={photoUrl}
                                                            alt="Parish"
                                                            className="h-10 w-10 rounded object-cover"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="text-center text-gray-400">—</div>
                                                );
                                            } else {
                                                value = item[key] || (
                                                    <span className="text-gray-400">—</span>
                                                );
                                            }

                                            return (
                                                <td
                                                    key={colIdx}
                                                    className={`px-4 py-3 ${['Sl No', 'Photo', 'Shrine', 'Grade'].includes(label)
                                                            ? 'text-center'
                                                            : 'text-left'
                                                        }`}
                                                >
                                                    {value}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </div>
            </Container>
        </AdminLayout>
    );
};

export default ParishReport;