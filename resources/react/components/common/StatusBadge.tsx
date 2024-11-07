import React from "react";
import { Badge } from "react-bootstrap";

function StatusBadge(props: any) {
    const {taskStatus} = props;

    const getRoleFromStatus = (): string => {
        let role = '';

        switch (taskStatus) {
            case 'PENDING':
                role = 'warning';
                break;
            case 'COMPLETED':
                role = 'success';
                break;
        }

        return role;
    }

    return (
        <Badge bg={getRoleFromStatus()}>{taskStatus}</Badge>
    );
}

export default StatusBadge;
