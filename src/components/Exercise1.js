import React, { Component } from 'react';
import { Container, Row, Col, Media, Button, Input,
    Form,FormGroup, Label } from 'reactstrap';

class Exercise1 extends Component {

    constructor(props) {
        super(props);
        this.state= {
            user: {},
            data: {
                comments: [],
            },
            name: '',
            content: '',
            pos: -1,
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        let user = {
            id: 12,
            name: 'Nam tran',
            description: 'Học reactJS bắt đầu',
        }
        let data = {
            comments: [
                {
                    'user': 'Nam tran',
                    'content': 'ReactJS là gì?',
                    'like': false,
                },
                {
                    'user': 'Levantoi',
                    'content': 'Javascript học như thé nào?',
                    'like': false,
                },
                {
                    'user': 'Hùng đặng',
                    'content': '.NET là số 1.',
                    'like': true,
                }
            ],
        }

        this.setState({
            user,
            data
        });
    }

    onClickLike = (e, index) => {
        // console.log(e, index);
        let { data } = this.state;
        data.comments[index].like = !data.comments[index].like;
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

    onClickComment = () => {
        let { data, name, content, pos } = this.state;
        let comment = {
            user: name,
            content,
            like: false,
        }
        if (pos > -1 ) {
            data.comments.splice(pos, 1, comment);
        } else {
            data.comments.push(comment);
        }
        this.setState({
            data,
            name: '',
            content: '',
            pos: -1,
        });
    }

    onClickDelete = (e, i) => {
        let { data } = this.state;
        data.comments.splice(i, 1);
        this.setState({
            data
        });
    }
    
    onClickEdit = (e, i) => {
        let { data } = this.state;
        let commentItem = data.comments[i];
        console.log('data edit', data.comments[i], i)
        this.setState({
            name: commentItem.user,
            content: commentItem.content,
            pos: i,
        });
    }

    render() {
        let { data, user, name, content, pos } = this.state;
        // console.log('render', data.comments) 
        let commentItem = data.comments.map((comment, index) => {
            return (
                <div key={index} className="comment-list" style={{borderBottom: '1px solid #ddd'}}>
                    <div className="comment-content">
                        <h4>{ comment.user }</h4>
                        <p>{ comment.content }</p>
                    </div>
                    <div className="comment-like">
                        <button onClick={ (e) => this.onClickLike(e, index) } className={`btn ${comment.like ? 'btn-success': 'btn-secondary'}`} style={{ marginRight: '5px'}}>Like</button>
                        <button onClick={ (e) => this.onClickEdit(e, index) } className="btn ml-2 btn-primary" style={{ marginRight: '5px'}}>Edit</button>
                        <button onClick={ (e) => this.onClickDelete(e, index) } className="btn ml-2 btn-danger">Del</button>
                    </div>
                </div>
            );
        });
        return (
            <Container>
                <Col md={{'size': 6, 'offset': 2}} style={{ marginTop: '50px', 'border': '1px solid #ddd', 'padding': '15px'}}>
                    <Row style={{ borderBottom: '1px solid #ddd', 'background': '#ddd'}}>
                        <h2>{ user.name }</h2>
                        <p>{ user.description }</p>
                    </Row>
                    <Row>
                        {/* <Media>
                            <Media right href="#">Lien</Media>
                            <Media body>
                                <Media heading>
                                Media heading
                                </Media>
                                Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                            </Media>
                        </Media> */}
                        { commentItem }
                        
                    </Row>
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