import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { FiEdit } from "react-icons/fi";
import axios from "axios";



const EditPopup = ({ content, blogId }) => {
    const [show, setShow] = useState(false);
    const [editedContent, setEditedContent] = useState(content); // Store editable content


    const handleClose = () => setShow(false);
    const handleShow = () => {
        setEditedContent(content); // Reset content when opening
        setShow(true);
    };

    const handleSave = async () => {
        const updatedData = {
            content: editedContent, // Use the updated content
        };


        try {
            const response = await axios.put(`http://localhost:5555/updateBlog/${blogId}`, updatedData);

            if (response.status === 200) {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Error updating blog:", error);
            alert("Failed to update blog. Please try again.");
        }



    };

    return (
        <>
            <Button
                style={{ backgroundColor: "#2AAA8A", borderColor: "#2AAA8A" }}
                onClick={handleShow}
            >
                <FiEdit /> &nbsp;Edit My Blog Content
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Blog Content</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Blog Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                value={editedContent}
                                onChange={(e) => setEditedContent(e.target.value)}
                                placeholder="Edit your blog content here..."
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button style={{ backgroundColor: "#2AAA8A" }} onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EditPopup;





