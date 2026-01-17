import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import AdminLayout from '../../layouts/AdminLayout';
import { motion } from 'framer-motion';

const AddBulletin = () => {
    const [formData, setFormData] = useState({
        title: '',
        year: '2025',
        month: 'JULY',
        file: null,
        coverImage: null,
        displayOrder: '',
        status: 'Published',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        if (type === 'file') {
            setFormData({ ...formData, [name]: e.target.files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  const form = new FormData();
  form.append('title', formData.title);
  form.append('year', formData.year);
  form.append('month', formData.month);
  form.append('file', formData.file);
  form.append('coverImage', formData.coverImage);
  form.append('displayOrder', formData.displayOrder);
  form.append('status', formData.status);

  try {
    const res = await fetch('https://tellicheri.onrender.com/api/bulletins/add', {
      method: 'POST',
      body: form
    });

    const result = await res.json();

    if (res.ok) {
      alert('Bulletin submitted successfully!');
      setFormData({
        title: '',
        year: '2025',
        month: 'JULY',
        file: null,
        coverImage: null,
        displayOrder: '',
        status: 'Published',
      });
    } else {
      alert(`Error: ${result.message}`);
    }
  } catch (err) {
    console.error('Submission error:', err);
    alert('Submission failed!');
  }

  setIsSubmitting(false);
};


    const months = [
        'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
        'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER',
    ];

    const years = Array.from({ length: 101 }, (_, i) => (1950 + i).toString());

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    const buttonVariants = {
        rest: { scale: 1 },
        hover: { scale: 1.05 },
        tap: { scale: 0.95 }
    };

    return (
        <AdminLayout>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <Container fluid className="py-4">
                    <motion.h5
                        className="mb-3"
                        variants={itemVariants}
                    >
                        Add <span className="text-muted">Bulletin</span>
                    </motion.h5>

                    <motion.div
                        variants={itemVariants}
                    >
                        <Form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-sm">
                            <motion.div variants={itemVariants}>
                                <Row className="mb-3">
                                    <Form.Label column sm={2}>Bulletin Title <span className="text-danger">*</span></Form.Label>
                                    <Col sm={10}>
                                        <Form.Control
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            placeholder="Enter title of Bulletin"
                                            required
                                        />
                                    </Col>
                                </Row>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Row className="mb-3">
                                    <Form.Label column sm={2}>Year</Form.Label>
                                    <Col sm={10}>
                                        <Form.Select
                                            name="year"
                                            value={formData.year}
                                            onChange={handleChange}
                                            as={motion.select}
                                            whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px #3b82f6" }}
                                        >
                                            {years.map((year) => (
                                                <option key={year} value={year}>{year}</option>
                                            ))}
                                        </Form.Select>
                                    </Col>
                                </Row>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Row className="mb-3">
                                    <Form.Label column sm={2}>Month</Form.Label>
                                    <Col sm={10}>
                                        <Form.Select
                                            name="month"
                                            value={formData.month}
                                            onChange={handleChange}
                                            as={motion.select}
                                            whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px #3b82f6" }}
                                        >
                                            {months.map((month) => (
                                                <option key={month} value={month}>{month}</option>
                                            ))}
                                        </Form.Select>
                                    </Col>
                                </Row>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Row className="mb-3">
                                    <Form.Label column sm={2}>Bulletin file <span className="text-danger">*</span></Form.Label>
                                    <Col sm={10}>
                                        <Form.Control
                                            type="file"
                                            name="file"
                                            onChange={handleChange}
                                            required
                                            as={motion.input}
                                            whileHover={{ scale: 1.01 }}
                                        />
                                    </Col>
                                </Row>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Row className="mb-3">
                                    <Form.Label column sm={2}>
                                        Bulletin Cover image <span className="text-danger">*</span>
                                        <div style={{ fontSize: '12px', color: 'red' }}>(width×height: 263×320)</div>
                                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control
                                            type="file"
                                            name="coverImage"
                                            onChange={handleChange}
                                            required
                                            as={motion.input}
                                            whileHover={{ scale: 1.01 }}
                                        />
                                    </Col>
                                </Row>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Row className="mb-3">
                                    <Form.Label column sm={2}>Display Order</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control
                                            type="text"
                                            name="displayOrder"
                                            value={formData.displayOrder}
                                            onChange={handleChange}
                                            as={motion.input}
                                            whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px #3b82f6" }}
                                        />
                                    </Col>
                                </Row>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Row className="mb-4">
                                    <Form.Label column sm={2}>Status</Form.Label>
                                    <Col sm={10}>
                                        <motion.div whileHover={{ scale: 1.02 }} style={{ display: 'inline-block', marginRight: '1rem' }}>
                                            <Form.Check
                                                inline
                                                label="Published"
                                                name="status"
                                                type="radio"
                                                id="published-radio"
                                                value="Published"
                                                checked={formData.status === 'Published'}
                                                onChange={handleChange}
                                            />
                                        </motion.div>
                                        <motion.div whileHover={{ scale: 1.02 }} style={{ display: 'inline-block' }}>
                                            <Form.Check
                                                inline
                                                label="Pending"
                                                name="status"
                                                type="radio"
                                                id="pending-radio"
                                                value="Pending"
                                                checked={formData.status === 'Pending'}
                                                onChange={handleChange}
                                            />
                                        </motion.div>
                                    </Col>
                                </Row>
                            </motion.div>

                            <Row>
                                <Col sm={{ span: 10, offset: 2 }}>
                                    <motion.div
                                        variants={buttonVariants}
                                        initial="rest"
                                        whileHover="hover"
                                        whileTap="tap"
                                    >
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    Submitting...
                                                </>
                                            ) : 'Submit'}
                                        </Button>
                                    </motion.div>
                                </Col>
                            </Row>
                        </Form>
                    </motion.div>
                </Container>
            </motion.div>
        </AdminLayout>
    );
};

export default AddBulletin;