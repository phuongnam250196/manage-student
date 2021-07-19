import React, { Component } from 'react';
import { Row, Col, Button, Input,
    Form, FormGroup } from 'reactstrap';
import ItemComment from './ItemComment';

class ItemUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textItem: "",
            isEdit: false,
            id_comment: -1,
        }
    }

    onClickLike = (val) => {
        this.props.onClickLike(val);
    }

    onClickEdit = (val) => {
        this.props.onClickEdit(val);
        const { item, comments } = this.props;
        let comment = comments.find(comment => {
            return item.comments[val.index] === comment.id;
        })
        // console.log(item.comments[val.index], comment)
        this.setState({
            textItem: comment.content,
            isEdit: true,
            id_comment: comment.id
        })
    }

    onClickDelete = (val) => {
        this.props.onClickDelete(val);
    }

    onChange = (e) => {
        let target = e.target;
        let textItem = target.value;
        this.setState({
            textItem
        });
    }

    onClickComment = (e, i) => {
        const { textItem, id_comment, isEdit } = this.state;
        const val = {
            text: textItem, i
        }
        if (isEdit) {
            val.id_comment= id_comment
        }
        this.props.onClickComment(val);
        this.setState({
            textItem: "",
            isEdit: false
        })
    }

    onComment = (e, i) => {
        // console.log(i)
        this.props.onComment(i);
    }
    
    render() {
        const { item, i, user, comments } = this.props;
        const { textItem, isEdit } = this.state;
        return (
            <div style={{ marginBottom: '40px' }}>
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
                                comments.map((comm, k) => {
                                    if (comm.id === comment) {
                                        // console.log('ccc', comment, comm);
                                        return (
                                            <ItemComment 
                                                key={k} 
                                                comment={comm}
                                                index={index}
                                                user={user} 
                                                i ={i}
                                                onClickLike = { (val) => this.onClickLike(val) }
                                                onClickEdit = { (val) => this.onClickEdit(val) }
                                                onClickDelete = { (val) => this.onClickDelete(val) } 
                                            />
                                        );
                                    }
                                })
                            );
                        })
                    }
                </Row>
                <Row style={{ 'display': user.id === 12 ? 'block' : 'none' }}>
                    <Form style={{ marginTop: '15px' }}>
                        <FormGroup row style={{ marginBottom: '10px' }}>
                            <Col sm={8}>
                                <Input onChange={(e) => this.onChange(e)} value={ textItem } type="textarea" name="content" id="content" placeholder="Nhập nội dung" />
                            </Col>
                            <Col sm={4}>
                                <Button onClick={(e) => this.onClickComment(e, i)}>{isEdit ? 'Cập nhật' : 'Bình luận'}</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Row>
            </div>
        );
    }
}

export default ItemUser;