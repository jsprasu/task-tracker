import React from "react";
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';

function Tasks() {
    return (
        <div className="row">
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>1</td>
                    <td>Title 1</td>
                    <td><Badge bg="primary">Pending</Badge></td>
                    <td>@mdo</td>
                    </tr>
                    <tr>
                    <td>2</td>
                    <td>Title 2</td>
                    <td><Badge bg="primary">Pending</Badge></td>
                    <td>@fat</td>
                    </tr>
                    <tr>
                    <td>3</td>
                    <td>Title 3</td>
                    <td><Badge bg="success">Completed</Badge></td>
                    <td>@twitter</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}

export default Tasks;
