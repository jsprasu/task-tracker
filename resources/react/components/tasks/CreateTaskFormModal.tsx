import React, { useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { createTask, TaskDataType } from "../../utils/utils";

function CreateTaskFormModal(props: any) {
    const {onConfirm, onCancel} = props;
    const [loading, setLoading] = useState<boolean>(false);
    const [validated, setValidated] = useState<boolean>(false);
    const [taskTitle, setTaskTitle] = useState<string>('');
    const [taskDesc, setTaskDesc] = useState<string>('');
    const [taskStatus, setTaskStatus] = useState<string>('');

    /**
     * Handle Confirm button click.
     *
     * @param event
     */
    const handleConfirmClick = (event: React.MouseEvent<HTMLFormElement>): void => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity() !== false) {
            setLoading(true);
            let taskData: TaskDataType = {
                title: taskTitle,
                description: taskDesc,
                status: taskStatus
            };
            createTask(taskData).then((response) => {
                setLoading(false);
                onConfirm();
            });
        }

        setValidated(true);
    }

    return (
        <div>
            <Modal show={true} onHide={onCancel} backdrop="static" keyboard={false} size="lg">
                <Modal.Header closeButton>
                        <Modal.Title>Create task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form name="createTaskForm" id="createTaskForm" noValidate validated={validated} onSubmit={handleConfirmClick}>
                        <Form.Group className="mb-3" controlId="createTaskForm.title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter task title (Max: 255 characters)"
                                disabled={loading}
                                value={taskTitle}
                                onChange={(e) => {setTaskTitle(e.target.value)}}
                                required
                            />
                            <Form.Control.Feedback type="invalid">Title is required.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="createTaskForm.description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                disabled={loading}
                                value={taskDesc}
                                onChange={(e) => {setTaskDesc(e.target.value)}}
                                placeholder="Enter task description"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="createTaskForm.status">
                            <Form.Label>Status</Form.Label>
                            <Form.Select
                                aria-label="Status"
                                disabled={loading}
                                value={taskStatus}
                                onChange={(e) => {setTaskStatus(e.target.value)}}
                                className={taskStatus === '' ? 'gray-select' : ''}
                                required
                            >
                                <option value="" disabled>-- Select --</option>
                                <option value="PENDING">Pending</option>
                                <option value="COMPLETED">Completed</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">Status is required.</Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onCancel} disabled={loading}>Cancel</Button>
                    <Button variant="primary" disabled={loading} form="createTaskForm" type="submit">
                        {loading &&
                            <Spinner
                                as="span"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                        }
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default CreateTaskFormModal;
