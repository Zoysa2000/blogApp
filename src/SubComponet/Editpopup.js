import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { FiEdit } from "react-icons/fi";

const EditPopup = ({ content, blogId }) => {
    const [show, setShow] = useState(false);
    const [editedContent, setEditedContent] = useState(content); // Store editable content

    console.log("Blog ID:", blogId);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setEditedContent(content); // Reset content when opening
        setShow(true);
    };

    const handleSave = () => {
        const updatedData = {
            blogId: blogId,
            content: editedContent, // Use the updated content
        };

        console.log("Updated Blog Data:", updatedData); // Debugging log
        alert(`Blog ID: ${blogId}\nUpdated Content: ${editedContent}`);

        // Close modal after saving
        handleClose();
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





