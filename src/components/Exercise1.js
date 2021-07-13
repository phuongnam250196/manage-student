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
            name: 'ad',
        }

        Axios.get(`${BASE_URL}/post`).then(res => {
            console.log('res', res.data);
            this.setState({
                user,
                data: res.data
            });
        }).catch(err => console.log(err));
    }

    onClickLike = (val) => {
        let { data } = this.state;
        const i = val.i;
        const index = val.index;
        data[i].comments[index].like = !data[i].comments[index].like;
        Axios.put(`${BASE_URL}/post/${data[i].id}`, data[i]).then((res) => {
            // console.log('res create', res.data);
            this.setState({
                data
            });
        });
    }

    onClickComment = (val) => {
        const i = val.i;
        const text = val.text;
        let { data, user, isEdit } = this.state;
        if (isEdit) {
            data[i].comments[val.id_comment].content = text;
            isEdit = !isEdit;
        } else {
            data[i].comments.push({
                'author': user.name,
                'content': text,
                'like': false,
            });
        }
        Axios.put(`${BASE_URL}/post/${data[i].id}`, data[i]).then((res) => {
            // console.log('res create', res.data);
            this.setState({
                data,
                isEdit
            });
        });
        
    }

    onClickDelete = (val) => {
        let { data } = this.state;
        data[val.i].comments.splice(val.index, 1);
        Axios.put(`${BASE_URL}/post/${data[val.i].id}`, data[val.i]).then((res) => {
            // console.log('res update', res.data)
            this.setState({
                data
            })
        });
        // Axios.delete(`${BASE_URL}/post/${data[val.i].id}`).then((res) => {
        //     console.log('res delete', res.data)
           
        // });
        
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
        console.log('val', val)
        let { data } = this.state;
        data[val.i].content = val.text_modal;
        Axios.put(`${BASE_URL}/post/${data[val.i].id}`, data[val.i]).then((res) => {
            console.log('res update', res.data)
            this.setState({
                data,
                text_modal: val.text_modal,
                showModal: val.showModal,
            });
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