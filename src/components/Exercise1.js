import React, { Component } from 'react';
import {
    Container, Col, Button , Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

import "../App.css";
import ItemUser from './modun/ItemUser';
import ModalUser from './modun/ModalUser';

import { BASE_URL } from "./Libs/constant";
import Axios from "axios";

class Exercise1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            data: [],
            comments: [],
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
            name: 'iam',
        }

        Axios.get(`${BASE_URL}/post2`).then(res => {
            // console.log('res', res.data);
            this.setState({
                data: res.data
            });
        }).catch(err => console.log(err));

        Axios.get(`${BASE_URL}/comments`).then(res => {
            // console.log('comment', res.data)
            this.setState({
                user,
                comments: res.data
            })
        }).catch(err => console.log(err))
    }

    onClickLike = (val) => {
        let { data, comments } = this.state;
        const i = val.i;
        const index = val.index;
        let com = comments.find(comment => {
            return comment.id == data[i].comments[index];
        })
        com.like = !com.like;
        Axios.put(`${BASE_URL}/comments/${com.id}`, com).then(res => {
            this.setState({
                comments
            })
        }).catch(err => console.log(err))
    }

    onClickComment = (val) => {
        const i = val.i;
        const text = val.text;
        let { data, user, isEdit, comments } = this.state;
        if (isEdit) {
            let comment = comments.find(comment => {
                return comment.id === val.id_comment;
            })
            comment.content = text;
            isEdit = !isEdit;
            
            Axios.put(`${BASE_URL}/comments/${val.id_comment}`, comment).then(res => {
                this.setState({
                    comments,
                    isEdit
                })
            })
        } else {
            
            Axios.post(`${BASE_URL}/comments`, {
                'author': user.name,
                'content': text,
                'like': false,
            }).then(res => {
                data[i].comments.push(res.data.id);
                comments.push(res.data);
                Axios.put(`${BASE_URL}/post2/${data[i].id}`, data[i]).then(res2 => {
                    console.log('res', res.data, res2.data);
                    this.setState({
                        comments,
                        data
                    });
                }).catch(err => console.log(err));
            }).catch(err => console.log(err))
        }
    }

    onClickDelete = (val) => {
        let { data, comments } = this.state;
        let i = val.i;
        let index = val.index;
        let id_comment = data[i].comments[index];
        data[i].comments.splice(index, 1);
        Axios.put(`${BASE_URL}/post2/${data[i].id}`, data[i]).then(res => {
            if (res.data) {
                Axios.delete(`${BASE_URL}/comments/${id_comment}`).then(res => {
                    // console.log(res.data)
                    this.setState({
                        comments
                    })
                }).catch(err => console.log(err))
            }
        })
        
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
        let { data } = this.state;
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

    onSubmitModal = (val) => {
        let { data } = this.state;
        data[val.i].content = val.text_modal;
        Axios.put(`${BASE_URL}/post/${data[val.i].id}`, data[val.i]).then((res) => {
            // console.log('res update', res.data)
            this.setState({
                data,
                text_modal: val.text_modal,
                showModal: val.showModal,
            });
        });
        
    }

    render() {
        let { data, comments, user, showModal, iModal, text_modal } = this.state;
        // console.log('render', data)

        let listComment = data.map((item, i) => {
            return (
                <ItemUser 
                    key={i} 
                    item={item} 
                    i={i} 
                    user={user} 
                    comments={comments} 
                    onComment={ () => this.onComment(i) }
                    onClickLike={ (val) => this.onClickLike(val) }
                    onClickComment={ (val) => this.onClickComment(val) }
                    onClickEdit={ (val) => this.onClickEdit(val) }
                    onClickDelete={ (val) => this.onClickDelete(val) }
                />
            );
        });

        return (
            <Container>
                <Col md={{ 'size': 6, 'offset': 2 }} style={{ marginTop: '50px', 'padding': '15px' }}>
                    {listComment}
                </Col>
                <div>

                    <ModalUser 
                        showModal={showModal}
                        iModal={iModal}
                        text_modal={text_modal}
                        onSubmitModal={(val) => this.onSubmitModal(val)}
                        toggle={this.toggle}

                    />
                </div>
            </Container>
        );
    }
}

export default Exercise1;