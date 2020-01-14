//import the necessary files
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal,Button } from 'react-bootstrap';
//create a class for displaying the modal for editing an existing recipe and export it
export class MoreInfo extends React.Component {
    

            render() {
            //const handleCancel = () => showMoreInfo(!this.props.state.showMoreInfo);
                
            const onShow = this.props.onShow;
        return (
            <Modal show={onShow} onHide={() => showMoreInfoModal(!this.props.state.showMoreInfo)} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>More Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                This recipe box was built by <a href="http://snmln.com/" target="_blank" rel="noopener noreferrer">Sean Malone</a> base on the project criterea provided by freecodecamp. Using React and React bootstrap.
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => onShow(false)}>
            Close
          </Button>
                </Modal.Footer>
            </Modal>
        );
    }
};