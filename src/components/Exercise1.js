import React, { Component } from 'react';
import { Container, Row, Col, Media, Button, Input,
    Form,FormGroup, Label } from 'reactstrap';

class Exercise1 extends Component {

    constructor(props) {
        super(props);
        this.state= {
            user: {},
            data: [],
            name: '',
            content: '',
            pos: -1,
            pos2: -1,
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
                content: 'src/components/Exercise1.js Line 2:31:  Media is defined but never used  no-unused-varsSearchng',
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
                author: 'Nguyen tran',
                content: 'src/components/Exercise1.js Line 2:31:  words to learn more about each warning',
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

    onChange = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        });
    }

    getIndex = (data, name) => {
        for (let i in data) {
            if (data[i].author === name) {
                return i;
            }
        }
        return -1;
    }

    onClickComment = () => {
        let { data, user, name, content, pos, pos2 } = this.state;
        let comment = {
            author: name,
            content,
            comments: []
        }
        console.log('inex', this.getIndex(data, name));
        let iU = this.getIndex(data, name);
        if (pos > -1 ) {
            console.log(pos, pos2, data[pos].comments);
            data.splice(pos, 1, {
                author: name,
                content,
                comments: data[pos].comments,
            });
            data[pos].comments.splice(pos2, 1, {
                author: name,
                content,
            });
            
        } else {
            
            if ( iU != -1) {
                data[iU].comments.push(comment);
                console.log('texxt', data)
            } else {
                 // console.log(iUser)
                comment.comments.push({
                    author: user.author,
                    content: content,
                    like: false,
                });
                data.push(comment);
            }
        }
        this.setState({
            data,
            name: '',
            content: '',
            pos: -1,
        });
    }

    onClickDelete = (e, i, index) => {
        let { data } = this.state;
        console.log(i, index);
        if (index == 0) {
            data.splice(i, 1);
        } else {
            data[i].comments.splice(index, 1);
        }
        this.setState({
            data
        });
    }
    
    onClickEdit = (e, i, index) => {
        let { data } = this.state;
        let commentItem = data[i].comments[index];
        console.log('data edit', data[i].author)
        this.setState({
            name: data[i].author,
            content: commentItem.content,
            pos: i,
            pos2: index,
        });
    }

    render() {
        let { data, user, name, content, pos } = this.state;
        // console.log('render', data.comments) 
     
        

        let listComment = data.map((item, i) => {
            return (
                <div key={i}>
                    <Row style={{ borderBottom: '1px solid #ddd', 'background': '#ddd'}}>
                        <h2>{ item.author }</h2>
                    </Row>
                    <Row>
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
                                            <button onClick={ (e) => this.onClickEdit(e, i, index) } className="btn ml-2 btn-primary" style={{ marginRight: '5px'}}>Edit</button>
                                            <button onClick={ (e) => this.onClickDelete(e, i, index) } className="btn ml-2 btn-danger">Del</button>
                                        </div>
                                    </div>
                                );
                            }, this)
                        }
                    </Row>
                </div>
            );
        });
        
        return (
            <Container>
                <Col md={{'size': 6, 'offset': 2}} style={{ marginTop: '50px', 'border': '1px solid #ddd', 'padding': '15px'}}>
                    { listComment }
                    <Row style={{ borderTop: '1px solid #ddd', 'display': user.id ===  12 ? 'block' : 'none'}}>
                        <h3 style={{ textAlign: 'center', 'padding': '15px 15px 0' }}>{ pos > -1 ? 'Cập nhật' : 'Thêm mới' }</h3>
                        <Form style={{ marginTop: '15px' }}>
                            <FormGroup row style={{ marginBottom: '10px' }}>
                                <Label for="full-name" sm={3}>Họ tên</Label>
                                <Col sm={9}>
                                    <Input onChange={ this.onChange } value={name} type="text" name="name" id="full-name" placeholder="Nhập họ tên" />
                                </Col>
                            </FormGroup>
                            <FormGroup row style={{ marginBottom: '10px' }}>
                                <Label for="content" sm={3}>Nội dung</Label>
                                <Col sm={9}>
                                    <Input onChange={ this.onChange } value={content} type="textarea" name="content" id="content" placeholder="Nhập nội dung" />
                                </Col>
                            </FormGroup>
                            
                            <FormGroup row>
                                <Col sm={{ size: 9, offset: 3 }}>
                                    <Button onClick={ this.onClickComment }>Bình luận</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Row>
                </Col>
            </Container>
        );
    }
}

export default Exercise1;