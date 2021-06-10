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
                            <Input className="header_search_input" name="keyword" placeholder="Tìm kiếm theo mã, số điện thoại" />
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
                            <Label for="id-intern" sm={3}>Mã TTS</Label>
                            <Col sm={9}>
                                <Input type="text" name="idIntern" id="id-intern" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="full-name" sm={3}>Họ tên</Label>
                            <Col sm={9}>
                                <Input type="text" name="fullName" id="full-name" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="birthday" sm={3}>Ngày sinh</Label>
                            <Col sm={9}>
                                <Input type="datetime" name="birthday" id="birthday" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={3}>Giới tính</Label>
                            <Col sm={9}>
                                <Input type="radio" name="sex" /> Nam {' - '}
                                <Input type="radio" name="sex" /> Nữ
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label for="home-town" sm={3}>Quê quán</Label>
                            <Col sm={9}>
                                <Input type="select" name="homeTown" id="home-town">
                                    <option>-- Chọn --</option>
                                    <option>Hà Nội</option>
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="phone" sm={3}>Số điện thoại</Label>
                            <Col sm={9}>
                                <Input type="number" name="phone" id="phone" />
                            </Col>
                        </FormGroup>
                    </Col>
                    <Col xs={6}>
                        <FormGroup row>
                            <Label for="school" sm={3}>Trường</Label>
                            <Col sm={9}>
                                <Input type="select" name="school" id="school">
                                    <option>-- Chọn --</option>
                                    <option>TLU</option>
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="specialized" sm={3}>Chuyên ngành</Label>
                            <Col sm={9}>
                                <Input type="select" name="specialized" id="specialized">
                                    <option>-- Chọn --</option>
                                    <option>TLU</option>
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="position" sm={3}>Vị trí thực tập</Label>
                            <Col sm={9}>
                                <Input type="text" name="position" id="position" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="start-date" sm={3}>Ngày bắt đầu</Label>
                            <Col sm={9}>
                                <Input type="datetime" name="startDate" id="start-date" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="email" sm={3}>Email</Label>
                            <Col sm={9}>
                                <Input type="email" name="email" id="email" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={3}>
                                <Input type="select" name="idCardType">
                                    <option>CMND</option>
                                    <option>CCCD</option>
                                </Input>
                            </Col>
                            <Col sm={9}>
                                <Input type="text" name="idCard" />
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