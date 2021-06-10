import React, { Component, useState } from 'react';
import { Container, Row, Col, Form, InputGroupText, InputGroupAddon, Input, InputGroup,
    Label, FormGroup, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem  } from 'reactstrap';

import logo from './../logo.png';

const Create = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    return (
        <Container>
            <Row>
                <Col sm={2}>
                    <img src={logo}  alt="" className="header_logo" />
                </Col>
                <Col sm={8}>
                    <div className="header_search">
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText><i className="fa fa-search" aria-hidden="true"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input className="header_search_input" placeholder="Tìm kiếm theo mã, số điện thoại" />
                            <InputGroupAddon addonType="append">
                                <InputGroupText><i className="fa fa-microphone" aria-hidden="true"></i></InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                    </div>
                </Col>
                <Col sm={2}>
                    <Dropdown isOpen={dropdownOpen} toggle={toggle} className="dropdown-fix">
                        <DropdownToggle caret>
                            Chào, Nam
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem>Đổi mật khẩu</DropdownItem>
                            <DropdownItem>Thông tin</DropdownItem>
                            <DropdownItem>Đăng xuất</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </Col>
            </Row>
            <Form className="form-parent">
                <Row>
                    <Col xs={6}>
                        <FormGroup row>
                            <Label for="maTTS" sm={3}>Mã TTS</Label>
                            <Col sm={9}>
                                <Input type="text" name="email" id="maTTS" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="hoTen" sm={3}>Họ tên</Label>
                            <Col sm={9}>
                                <Input type="text" name="email" id="hoTen" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="ngaySinh" sm={3}>Ngày sinh</Label>
                            <Col sm={9}>
                                <Input type="datetime" name="email" id="ngaySinh" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={3}>Giới tính</Label>
                            <Col sm={9}>
                                <Input type="radio" name="gioiTinh" /> Nam {' - '}
                                <Input type="radio" name="gioiTinh" /> Nữ
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label for="exampleSelect" sm={3}>Quê quán</Label>
                            <Col sm={9}>
                                <Input type="select" name="select" id="exampleSelect">
                                    <option>-- Chọn --</option>
                                    <option>Hà Nội</option>
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="soDT" sm={3}>Số điện thoại</Label>
                            <Col sm={9}>
                                <Input type="number" name="soDT" id="soDT" />
                            </Col>
                        </FormGroup>
                    </Col>
                    <Col xs={6}>
                        <FormGroup row>
                            <Label for="exampleSelect" sm={3}>Trường</Label>
                            <Col sm={9}>
                                <Input type="select" name="select" id="exampleSelect">
                                    <option>-- Chọn --</option>
                                    <option>TLU</option>
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="exampleSelect" sm={3}>Chuyên ngành</Label>
                            <Col sm={9}>
                                <Input type="select" name="select" id="exampleSelect">
                                    <option>-- Chọn --</option>
                                    <option>TLU</option>
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="hoTen" sm={3}>Vị trí thực tập</Label>
                            <Col sm={9}>
                                <Input type="text" name="email" id="hoTen" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="hoTen" sm={3}>Ngày bắt đầu</Label>
                            <Col sm={9}>
                                <Input type="datetime" name="email" id="hoTen" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="hoTen" sm={3}>Email</Label>
                            <Col sm={9}>
                                <Input type="email" name="email" id="hoTen" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={3}>
                                <Input type="select">
                                    <option>CMND</option>
                                    <option>CCCD</option>
                                </Input>
                            </Col>
                            <Col sm={9}>
                                <Input type="text" name="email" id="hoTen" />
                            </Col>
                        </FormGroup>
                    </Col>
                    <Col sm={12} className="btn-sub-block">
                        <Button className="btn-child-delete">Xóa</Button>
                        <Button className="btn-child-add">Thêm</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}

export default Create;