import React, { Component } from 'react';
import {
    Button , Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";

class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text_modal: "",
        }
    }

    toggle = () => {
        this.props.toggle();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            text_modal: nextProps.text_modal
        })
    }

    onChange = (e) => {
        const target = e.target;
        this.setState({
            text_modal: target.value
        })
    }

    onSubmitModal = (e, i) => {
        let { text_modal } = this.state;
        const val = {
            i, 
            text_modal, 
            showModal:false
        }
        this.props.onSubmitModal(val);
    }

    render() {
        const { showModal, iModal } = this.props;
        const { text_modal } = this.state;
        return (
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
        );
    }
}

export default ModalUser;