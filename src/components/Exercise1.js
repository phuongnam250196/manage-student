import React, { Component } from 'react';
import {
    Container, Row, Col, Button , Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

import "../App.css";
import ItemUser from './modun/ItemUser';
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
            text_modal: "",
            id_comment: -1,
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

    onClickLike = (val) => {
        let { data } = this.state;
        const i = val.i;
        const index = val.index;
        data[i].comments[index].like = !data[i].comments[index].like;
        this.setState({
            data
        });
    }

    onClickComment = (val) => {
        const i = val.i;
        const text = val.text;
        let { data, user, isEdit } = this.state;
        data[i].text = text;
        if (isEdit) {
            data[i].comments[val.id_comment].content = data[i].text;
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

    onClickDelete = (val) => {
        let { data } = this.state;
        data[val.i].comments.splice(val.index, 1);
        this.setState({
            data
        });
    }

    onClickEdit = (val) => {
        let { data, text } = this.state;
        const i = val.i;
        const index = val.index;
        text = data[i].comments[index].content;
        this.setState({
            data,
            text,
            isEdit: true,
        });
    }

    toggle = () => {
        this.setState({
            showModal: !this.state.showModal,
        })
    }

    onComment = (i) => {
        let { data, text_modal } = this.state;
        // console.log('i comment', i, data[i].content);
        this.setState({
            text_modal: data[i].content,
            showModal: !this.state.showModal,
            iModal: i,
        });
    }

    onChange = (e) => {
        const target = e.target;
        this.setState({
            text_modal: target.value
        })
    }

    onSubmitModal = (e, i) => {
        let { data, text_modal } = this.state;
        data[i].content = text_modal;
        this.setState({
            data,
            text_modal,
            showModal: false,
        });
    }

    render() {
        let { data, user, showModal, iModal, text_modal } = this.state;
        // console.log('render', text, data)

        let listComment = data.map((item, i) => {
            return (
                <ItemUser 
                    key={i} 
                    item={item} 
                    i={i} 
                    user={user} 
                    onComment={ () => this.onComment(i) }
                    onClickLike={ (val) => this.onClickLike(val) }
                    onClickComment={ (val) => this.onClickComment(val) }
                    onClickEdit={ (val) => this.onClickEdit(val) }
                    onClickDelete={ (val) => this.onClickDelete(val) }
                    onComment={ (i) => this.onComment(i) }
                />
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
                            <textarea className="form-control" onChange={(e) => this.onChange(e)} value={text_modal} name="" id="" rows="3"></textarea>
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