import React, { Component } from 'react';
import { Container, Row, Col, Form, InputGroupText, InputGroupAddon, Input, InputGroup,
   Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Table  } from 'reactstrap';

import logo from './../logo.png';

class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dropdownOpen: false,
            // prevState: false,
        }
    }

    

    render() {

        const toggle = () => {
            this.setState({
                dropdownOpen: !this.state.dropdownOpen,
            })
        }

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
                        <Dropdown isOpen={this.state.dropdownOpen} toggle={toggle} className="dropdown-fix">
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
                <Row>
                    <Col sm={1}></Col>
                    <Col sm={10}>
                        <Table bordered striped hover className="table-list">
                            <thead>
                                <tr>
                                    <th>Mã TTS</th>
                                    <th>Họ tên <i className="fa fa-caret-down" aria-hidden="true"></i></th>
                                    <th>Năm sinh <i className="fa fa-caret-down" aria-hidden="true"></i></th>
                                    <th>Số điện thoại</th>
                                    <th>Vị trí <i className="fa fa-caret-down" aria-hidden="true"></i></th>
                                    <th>Ngày bắt đầu <i className="fa fa-caret-down" aria-hidden="true"></i></th>
                                    <th>Đóng phụ phí</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">A25288</th>
                                    <td>Nam trần</td>
                                    <td>1996</td>
                                    <td>0987166233</td>
                                    <td>Frontend React</td>
                                    <td>21/12/2021</td>
                                    <td><Input type="checkbox" /></td>
                                    <td>
                                        <button className="btn btn-success fix-btn">Sửa</button>
                                        <button className="btn btn-danger fix-btn">Xóa</button>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">A25288</th>
                                    <td>Nam trần</td>
                                    <td>1996</td>
                                    <td>0987166233</td>
                                    <td>Frontend React</td>
                                    <td>21/12/2021</td>
                                    <td><Input type="checkbox" /></td>
                                    <td>
                                        <button className="btn btn-success fix-btn">Sửa</button>
                                        <button className="btn btn-danger fix-btn">Xóa</button>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                    <Col sm={1}></Col>
                </Row>
            </Container>
        );
    }
}

export default List;