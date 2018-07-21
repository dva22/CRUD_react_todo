import React from 'react';
import {connect} from 'react-redux';
import {Button, Modal, ModalHeader, ModalBody} from 'reactstrap';

class ModalWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };


        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        const {isAuthenticated} = this.props.auth;

         if (!isAuthenticated) return null;

        return (
            <div>
                <Button color="primary" onClick={this.toggle}>{this.props.value}</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>{this.props.value}</ModalHeader>
                    <ModalBody>
                        <this.props.component taggle={this.toggle}/>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps)(ModalWindow);
