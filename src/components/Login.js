import React, { Component } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';

class Login extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col xs="12" sm="3"></Col>
                    <Col xs="12" sm="6">
                        <div className="login">
                            <Form>
                                <h1 className="text-center text-uppercase">Đăng nhập</h1>
                                <FormGroup>
                                    <Label for="exampleEmail">Tài khoản</Label>
                                    <Input type="email" name="email" id="exampleEmail" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="examplePassword">Mật khẩu</Label>
                                    <Input type="password" name="password" id="examplePassword" />
                                </FormGroup>
                                
                                <FormGroup check>
                                    <Label check>
                                        <Input type="checkbox" />{' '}
                                        Nhớ thông tin
                                    </Label>
                                    <a href="/" className="forget-link">Quên mật khẩu?</a>
                                </FormGroup>
                                <div className="text-center">
                                    <Button>Đăng nhập</Button>
                                </div>
                            </Form>
                            <p className="register-block">Bạn chưa có tài khoản? <a href="/">Đăng ký</a></p>
                        </div>
                    </Col>
                    <Col xs="12" sm="3"></Col> 
                </Row>
            </Container>
        );
    }
}

export default Login;