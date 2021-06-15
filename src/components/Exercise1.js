import React, { Component } from 'react';
import { Container, Row, Col, Media, Button, Input,
    Form,FormGroup, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Exercise1 extends Component {

    constructor(props) {
        super(props);
        this.state= {
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

    onChange = (e ,i) => {
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

    onClickComment = (e, i) => {
        console.log(i);

        let { data, user, isEdit } = this.state;
        let id_comment = data[i].id_comment;

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
        console.log('data create', data[i]);
        this.setState({
            data,
            isEdit
        });
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
                    <Row style={{ borderBottom: '1px solid #ddd', 'background': '#ddd'}}>
                        <Col xs={item.author === user.name ? 8 : 12} style={{ 'padding': '10px' }}>
                            <h2>{ item.author }</h2>
                            <p style={{ marginBottom: '0px', }}>{ item.content }</p>
                        </Col>
                        <Col xs={4} style={{ textAlign: 'right', 'display': item.author === user.name ? 'block' : 'none' }}><Button color="info" onClick={ (e) => this.onComment(e, i) } style={{ 'color': '#fff', textTransform: 'uppercase', marginTop: '20px' }}>Sửa</Button></Col>
                    </Row>
                    <Row style={{'border': '1px solid #ddd'}}>
                        { 
                            item.comments.map((comment, index) => {
                                return (
                                    <div key={index} className="comment-list" style={{borderBottom: '1px solid #ddd'}}>
                                        <div className="comment-content">
                                            <h4>{ comment.user }</h4>
                                            <p>{ comment.content }</p>
                                        </div>
                                        <div className="comment-like">
                                            <button onClick={ (e) => this.onClickLike(e, i, index) } className={`btn ${comment.like ? 'btn-success': 'btn-secondary'}`} style={{ marginRight: '5px'}}>Like</button>
                                            <button onClick={ (e) => this.onClickEdit(e, i, index) } className="btn ml-2 btn-primary" style={{ marginRight: '5px', 'display': comment.author === user.name ? 'inline-block' : 'none' }}>Edit</button>
                                            <button onClick={ (e) => this.onClickDelete(e, i, index) } className="btn ml-2 btn-danger">Del</button>
                                        </div>
                                    </div>
                                );
                            }, this)
                        }
                    </Row>
                    <Row style={{ 'display': user.id ===  12 ? 'block' : 'none'}}>
                        <Form style={{ marginTop: '15px' }}>
                            <FormGroup row style={{ marginBottom: '10px' }}>
                                <Col sm={8}>
                                    <Input onChange={ (e) => this.onChange(e, i) } value={ item.text } type="textarea" name="content" id="content" placeholder="Nhập nội dung" />
                                </Col>
                                <Col sm={4}>
                                    <Button onClick={ (e) => this.onClickComment(e, i) }>{ isEdit ? 'Cập nhật' : 'Bình luận'}</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Row>
                </div>
            );
        });
        
        return (
            <Container>
                <Col md={{'size': 6, 'offset': 2}} style={{ marginTop: '50px', 'padding': '15px'}}>
                    { listComment }
                </Col>
                <div>
                    
                    <Modal isOpen={ showModal } toggle={ this.toggle } className="">
                        <ModalHeader toggle={ this.toggle }>Sửa bình luận</ModalHeader>
                        <ModalBody>
                            <textarea className="form-control" onChange={ (e) => this.onChange(e, iModal) } value={ iModal < 0 ?  '' : text } name="" id="" rows="3"></textarea>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={ (e) => this.onSubmitModal(e, iModal) }>Cập nhật</Button>{' '}
                            <Button color="secondary" onClick={ this.toggle }>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </Container>
        );
    }
}

export default Exercise1;