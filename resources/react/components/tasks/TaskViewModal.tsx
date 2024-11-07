import React, { useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import TaskInterface from "./../../interfaces/TaskInterface";
import { convertUtcTimeToLocalTime, getTask } from "./../../utils/utils";

function TaskViewModal(props: any) {
    const {taskId, onClose} = props;
    const [task, setTask] = useState<TaskInterface|null>(null);

    useEffect(() => {
        getTask(taskId).then((taskData) => {
            setTask(taskData);
        });
    }, []);

    return (
        <div>
            <Modal show={true} onHide={onClose} backdrop="static" keyboard={false} size="lg">
                {!task &&
                    <div>
                        <Modal.Header closeButton>
                            <Modal.Title></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="row">
                                <div className="text-center">
                                    <Spinner as="span" role="status" />
                                </div>
                            </div>
                        </Modal.Body>
                    </div>
                }
                {task &&
                    <div>
                        <Modal.Header closeButton>
                            <Modal.Title>{task.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p className="task-show-label">
                                <b>Description</b>
                            </p>
                            <p dangerouslySetInnerHTML={{__html: task.description ?? ''}} />
                            <div className="mg-t-20 task-show-label">
                                <small>
                                    <b>Created at</b>: {convertUtcTimeToLocalTime(task.created_at ?? '')}
                                </small>
                            </div>
                            <div className="task-show-label">
                                <small>
                                    <b>Updated at</b>: {convertUtcTimeToLocalTime(task.updated_at ?? '')}
                                </small>
                            </div>
                        </Modal.Body>
                    </div>
                }
            </Modal>
        </div>
    );
}

export default TaskViewModal;
