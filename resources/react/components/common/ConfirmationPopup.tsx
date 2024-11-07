import React, { useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";

function ConfirmationPopup(props: any) {
    const {title, message, confirmText, cancelText, onConfirm, onCancel} = props;
    const [loading, setLoading] = useState<boolean>(false);

    /**
     * Handle confirm button click.
     */
    const handleConfirmClick = (): void => {
        setLoading(true);
        onConfirm();
    }

    return (
        <div>
            <Modal show={true} onHide={onCancel} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {message}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onCancel} disabled={loading}>{cancelText}</Button>
                    <Button variant="primary" onClick={handleConfirmClick} disabled={loading}>
                        {loading &&
                            <Spinner
                                as="span"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                        }
                        {confirmText}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ConfirmationPopup;
