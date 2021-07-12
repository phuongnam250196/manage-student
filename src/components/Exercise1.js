import React, { Component } from 'react';
import {
    Container, Row, Col, Media, Button, Input,
    Form, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

import "../App.css";
class Exercise1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            data: [],
            isEdit: false,
            showModal: false,
            iModal: -1,
            text: '',
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        let user = {
            id: 12,
            name: 'Admin',
        }
        let data = [
            {
                author: 'Nam tran',
                content: 'Thực hành react với state, thêm bình luận.',
                text: '',
                id_comment: -1,
                comments: [
                    {
                        'author': 'Nam tran',
                        'content': 'ReactJS là gì?',
                        'like': false,
                    },
                    {
                        'author': 'Levantoi',
                        'content': 'Javascript học như thé nào?',
                        'like': false,
                    },
                    {
                        'author': 'Hùng đặng',
                        'content': '.NET là số 1.',
                        'like': true,
                    }
                ],
            },
            {
                author: 'Admin',
                content: 'Trả lời bình luận khi có quyền.',
                text: '',
                id_comment: -1,
                comments: [
                    {
                        'author': 'Nam tran',
                        'content': 'ReactJS là gì?',
                        'like': false,
                    },
                    {
                        'author': 'Levantoi',
                        'content': 'Javascript học như thé nào?',
                        'like': false,
                    },
                    {
                        'author': 'Hùng đặng',
                        'content': '.NET là số 1.',
                        'like': true,
                    }
                ],
            }
        ];


        this.setState({
            user,
            data
        });
    }

    onClickLike = (e, i, index) => {
        // console.log(e, index);
        let { data } = this.state;
        data[i].comments[index].like = !data[i].comments[index].like;
        this.setState({
            data
        });
    }

    onChange = (e, i) => {
        let { data, iModal, text } = this.state;
        let target = e.target;
        if (iModal < 0) {
            data[i].text = target.value;
        } else {
            text = target.value;
        }
        this.setState({
            data,
            text
        });
    }

    handleValidation() {
        let { fields } = this.state;
        console.log('fields', fields)
        let errors = {};
        let formIsValid = true;


        if (!fields["text"]) {
            formIsValid = false;
            errors["text"] = "Không được để trống";
        }
        
        this.setState({
            errors
        });
        return formIsValid;
    }

    onClickComment = (e, i) => {
        console.log('i', i);

        let { data, user, isEdit } = this.state;
        let id_comment = data[i].id_comment;
        if (data[i].text) {

            if (isEdit) {
                data[i].comments[id_comment].content = data[i].text;
                data[i].id_comment = -1;
                isEdit = !isEdit;
            } else {
                data[i].comments.push({
                    'author': user.name,
                    'content': data[i].text,
                    'like': false,
                });
            }
            data[i].text = '';
            this.setState({
                data,
                isEdit
            });
        }
    }

    onClickDelete = (e, i, index) => {
        let { data } = this.state;
        data[i].comments.splice(index, 1);
        this.setState({
            data
        });
    }

    onClickEdit = (e, i, index) => {
        let { data } = this.state;
        data[i].text = data[i].comments[index].content;
        data[i].id_comment = index;
        console.log('data edit', i, data[i].id_comment);
        this.setState({
            data,
            isEdit: true,
        });
    }

    toggle = () => {
        this.setState({
            showModal: !this.state.showModal,
        })
    }

    onComment = (e, i) => {
        let { data, iModal, text } = this.state;
        iModal = i;
        text = data[i].content;

        this.setState({
            iModal,
            data,
            text,
            showModal: !this.state.showModal,
        });
    }

    onSubmitModal = (e, i) => {
        let { data, text } = this.state;
        data[i].content = text;
        this.setState({
            data,
            text,
            showModal: false,
        });
    }

    render() {
        let { data, user, isEdit, showModal, iModal, text } = this.state;
        console.log('render', data, iModal)

        let listComment = data.map((item, i) => {
            return (
                <div key={i} style={{ marginBottom: '40px' }}>
                    <Row style={{ borderBottom: '1px solid #ddd', 'background': '#ddd' }}>
                        <Col xs={item.author === user.name ? 8 : 12} style={{ 'padding': '10px' }}>
                            <h2>{item.author}</h2>
                            <p style={{ marginBottom: '0px', }}>{item.content}</p>
                        </Col>
                        <Col xs={4} style={{ textAlign: 'right', 'display': item.author === user.name ? 'block' : 'none' }}><Button color="info" onClick={(e) => this.onComment(e, i)} style={{ 'color': '#fff', textTransform: 'uppercase', marginTop: '20px' }}>Sửa</Button></Col>
                    </Row>
                    <Row style={{ 'border': '1px solid #ddd' }}>
                        {
                            item.comments.map((comment, index) => {
                                return (
                                    <div key={index} className="comment-list" style={{ borderBottom: '1px solid #ddd' }}>
                                        <div className="comment-content">
                                            <h4>{comment.user}</h4>
                                            <p>{comment.content}</p>
                                        </div>
                                        <div className="comment-like">
                                            <svg onClick={(e) => this.onClickLike(e, i, index)} style={{ marginRight: '5px', 'color': comment.like ? 'green' : 'gray' }} className="icon icon-thumbs-up"><use xlinkHref="#icon-thumbs-up"><symbol id="icon-thumbs-up" viewBox="0 0 25 28">
                                                <path d="M4 21c0-0.547-0.453-1-1-1-0.562 0-1 0.453-1 1 0 0.562 0.438 1 1 1 0.547 0 1-0.438 1-1zM6.5 13v10c0 0.547-0.453 1-1 1h-4.5c-0.547 0-1-0.453-1-1v-10c0-0.547 0.453-1 1-1h4.5c0.547 0 1 0.453 1 1zM25 13c0 0.828-0.328 1.719-0.859 2.328 0.172 0.5 0.234 0.969 0.234 1.188 0.031 0.781-0.203 1.516-0.672 2.141 0.172 0.578 0.172 1.203 0 1.828-0.156 0.578-0.453 1.094-0.844 1.469 0.094 1.172-0.172 2.125-0.766 2.828-0.672 0.797-1.703 1.203-3.078 1.219h-2.016c-2.234 0-4.344-0.734-6.031-1.313-0.984-0.344-1.922-0.672-2.469-0.688-0.531-0.016-1-0.453-1-1v-10.016c0-0.516 0.438-0.953 0.953-1 0.578-0.047 2.078-1.906 2.766-2.812 0.562-0.719 1.094-1.391 1.578-1.875 0.609-0.609 0.781-1.547 0.969-2.453 0.172-0.922 0.359-1.891 1.031-2.547 0.187-0.187 0.438-0.297 0.703-0.297 3.5 0 3.5 2.797 3.5 4 0 1.281-0.453 2.188-0.875 3-0.172 0.344-0.328 0.5-0.453 1h4.328c1.625 0 3 1.375 3 3z" />
                                            </symbol></use></svg>

                                            <svg onClick={(e) => this.onClickEdit(e, i, index)} style={{ marginRight: '5px', 'display': comment.author === user.name ? 'inline-block' : 'none' }} className="icon icon-pencil"><use xlinkHref="#icon-pencil"><symbol id="icon-pencil" viewBox="0 0 24 28">
                                                <path d="M5.672 24l1.422-1.422-3.672-3.672-1.422 1.422v1.672h2v2h1.672zM13.844 9.5c0-0.203-0.141-0.344-0.344-0.344-0.094 0-0.187 0.031-0.266 0.109l-8.469 8.469c-0.078 0.078-0.109 0.172-0.109 0.266 0 0.203 0.141 0.344 0.344 0.344 0.094 0 0.187-0.031 0.266-0.109l8.469-8.469c0.078-0.078 0.109-0.172 0.109-0.266zM13 6.5l6.5 6.5-13 13h-6.5v-6.5zM23.672 8c0 0.531-0.219 1.047-0.578 1.406l-2.594 2.594-6.5-6.5 2.594-2.578c0.359-0.375 0.875-0.594 1.406-0.594s1.047 0.219 1.422 0.594l3.672 3.656c0.359 0.375 0.578 0.891 0.578 1.422z" />
                                            </symbol></use></svg>


                                            <svg onClick={(e) => this.onClickDelete(e, i, index)} style={{ 'display': comment.author === user.name ? 'inline-block' : 'none' }} className="icon icon-trash-o"><use xlinkHref="#icon-trash-o"><symbol id="icon-trash-o" viewBox="0 0 22 28">
                                                <path d="M8 11.5v9c0 0.281-0.219 0.5-0.5 0.5h-1c-0.281 0-0.5-0.219-0.5-0.5v-9c0-0.281 0.219-0.5 0.5-0.5h1c0.281 0 0.5 0.219 0.5 0.5zM12 11.5v9c0 0.281-0.219 0.5-0.5 0.5h-1c-0.281 0-0.5-0.219-0.5-0.5v-9c0-0.281 0.219-0.5 0.5-0.5h1c0.281 0 0.5 0.219 0.5 0.5zM16 11.5v9c0 0.281-0.219 0.5-0.5 0.5h-1c-0.281 0-0.5-0.219-0.5-0.5v-9c0-0.281 0.219-0.5 0.5-0.5h1c0.281 0 0.5 0.219 0.5 0.5zM18 22.813v-14.812h-14v14.812c0 0.75 0.422 1.188 0.5 1.188h13c0.078 0 0.5-0.438 0.5-1.188zM7.5 6h7l-0.75-1.828c-0.047-0.063-0.187-0.156-0.266-0.172h-4.953c-0.094 0.016-0.219 0.109-0.266 0.172zM22 6.5v1c0 0.281-0.219 0.5-0.5 0.5h-1.5v14.812c0 1.719-1.125 3.187-2.5 3.187h-13c-1.375 0-2.5-1.406-2.5-3.125v-14.875h-1.5c-0.281 0-0.5-0.219-0.5-0.5v-1c0-0.281 0.219-0.5 0.5-0.5h4.828l1.094-2.609c0.313-0.766 1.25-1.391 2.078-1.391h5c0.828 0 1.766 0.625 2.078 1.391l1.094 2.609h4.828c0.281 0 0.5 0.219 0.5 0.5z" />
                                            </symbol></use></svg>
                                        </div>
                                    </div>
                                );
                            }, this)
                        }
                    </Row>
                    <Row style={{ 'display': user.id === 12 ? 'block' : 'none' }}>
                        <Form style={{ marginTop: '15px' }}>
                            <FormGroup row style={{ marginBottom: '10px' }}>
                                <Col sm={8}>
                                    <Input onChange={(e) => this.onChange(e, i)} value={item.text} type="textarea" name="content" id="content" placeholder="Nhập nội dung" />
                                </Col>
                                <Col sm={4}>
                                    <Button onClick={(e) => this.onClickComment(e, i)}>{isEdit ? 'Cập nhật' : 'Bình luận'}</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Row>
                </div>
            );
        });

        return (
            <Container>
                <Col md={{ 'size': 6, 'offset': 2 }} style={{ marginTop: '50px', 'padding': '15px' }}>
                    {listComment}
                </Col>
                <div>

                    <Modal isOpen={showModal} toggle={this.toggle} className="">
                        <ModalHeader toggle={this.toggle}>Sửa bình luận</ModalHeader>
                        <ModalBody>
                            <textarea className="form-control" onChange={(e) => this.onChange(e, iModal)} value={iModal < 0 ? '' : text} name="" id="" rows="3"></textarea>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={(e) => this.onSubmitModal(e, iModal)}>Cập nhật</Button>{' '}
                            <Button color="secondary" onClick={this.toggle}>Hủy</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </Container>
        );
    }
}

export default Exercise1;