import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import DepartmentSidebar from '../components/SideNavDepartment';

const Mukthisree = () => {
    return (
        <Container fluid className="p-4">
            <Row>
                {/* Sidebar */}
                <Col md={3} className="ms-2">
                    <DepartmentSidebar />
                </Col>

                {/* Main Content */}
                <Col md={8}>
                    <Card className="p-4 shadow border-0 rounded">
                        <h4 className="text-danger fw-bold mb-3">MUKTHISREE</h4>

                        <p>
                            According to <strong>T.S. Eliot</strong>, “Alcohol is temporary fun with permanent consequences.” Alcohol and drugs have become
                            a serious threat to the very fabric of human life. It is distressing to see that not only men and some women, but even
                            youth and children are falling prey to the grip of these destructive substances. This menace threatens to block the
                            growth and prosperity of our great nation.
                        </p>

                        <p>
                            As families suffer due to addiction, many women—struggling under the burden of alcoholic spouses or loved ones—longed
                            for a space to voice their grief and stand united against this evil. In contrast, addicted men often show little
                            initiative in resisting this devastating habit.
                        </p>

                        <p>
                            Recognizing this painful reality, <strong>Mgr. Thomas Thaithottam</strong>, a noted social reformer of Kerala,
                            initiated the formation of <strong>Mukthisree</strong> on <strong>31st December 2017</strong>. The announcement came
                            during the Ruby Jubilee celebration of the famous Temperance Movement in the Diocese of Thalassery—originally founded
                            by <strong>Mar Sebastian Valloppilly</strong>, also known as the <em>Moses of Malabar</em>.
                        </p>

                        <p>
                            The first Director of Mukthisree was <strong>Mgr. Thomas Thaithottam</strong>, and the first President was
                            <strong> Smty. Margaret Mathew Chamakkalayil</strong>. Mukthisree became a platform for women to unite in strength and
                            purpose, raising their voices and taking action against alcohol and drug abuse in families and society.
                        </p>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Mukthisree;
