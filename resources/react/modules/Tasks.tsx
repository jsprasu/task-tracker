import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import { Alert, Button, Pagination, Spinner } from "react-bootstrap";
import { deleteTask, getTasks } from "../utils/utils";
import StatusBadge from "../components/common/StatusBadge";
import { Eye, Trash } from "react-bootstrap-icons";
import TaskInterface from "../interfaces/TaskInterface";
import TaskViewModal from "../components/tasks/TaskViewModal";
import ConfirmationPopup from "../components/common/ConfirmationPopup";
import CreateTaskFormModal from "../components/tasks/CreateTaskFormModal";

function Tasks() {
    const [tasks, setTasks] = useState<TaskInterface[]>([]);
    const [loadingTasks, setLoadingTasks] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [size, setSize] = useState<number>(20);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [paginationItems, setPaginationItems] = useState<any[]>([]);
    const [viewTaskId, setViewTaskId] = useState<number|null>(null);
    const [deleteTaskId, setDeleteTaskId] = useState<number|null>(null);
    const [isTaskCreateFormOpen, setIsTaskCreateFormOpen] = useState<boolean>(false);

    /**
     * Prepare pagination page items based on response data.
     */
    const preparePaginationItems = (): void => {
        setPaginationItems([]);
        let items: any[] = [];

        for (let number = 1; number <= totalPages; number++) {
            items.push(
              <Pagination.Item key={number} active={number === page} onClick={() => handlePageItemClick(number)}>
                {number}
              </Pagination.Item>,
            );

            if (items.length === totalPages) {
                setPaginationItems(items);
            }
        }
    }

    /**
     * Handle pagination page item click.
     *
     * @param pageNumber
     */
    const handlePageItemClick = (pageNumber: number): void => {
        setPage(pageNumber);
    }

    /**
     * Load tasks data by calling the API endpoint.
     */
    const loadTasksData = (): void => {
        setLoadingTasks(true);
        setTotalPages(1);
        getTasks(page, size).then((tasksData) => {
            setTasks(tasksData.data);
            setTotalPages(tasksData.last_page);
            setLoadingTasks(false);
        });
    }

    /**
     * Handle task view click.
     *
     * @param taskId
     */
    const handleViewTask = (taskId: number): void => {
        setViewTaskId(taskId);
    };

    /**
     * Handle task delete action button click.
     *
     * @param taskId
     */
    const handleDeleteTask = (taskId: number): void => {
        setDeleteTaskId(taskId);
    }

    /**
     * Delete a task by calling the API endpoint.
     */
    const deleteTaskItem = (): void => {
        deleteTask(deleteTaskId ?? 0).then(() => {
            setDeleteTaskId(null);
            loadTasksData();
        });
    }

    /**
     * Show task create form.
     */
    const showTaskCreateForm = (): void => {
        setIsTaskCreateFormOpen(true);
    }

    /**
     * Handle task create button click.
     */
    const handleTaskCreate = (): void => {
        setIsTaskCreateFormOpen(false);

        if (page === 1) {
            loadTasksData();
        } else {
            setPage(1);
        }
    }

    useEffect(() => {
        loadTasksData();
    }, [page]);

    useEffect(() => {
        preparePaginationItems();
    }, [totalPages]);

    return (
        <div className="mg-t-50">
            <div className="header row row-lg-1 row-md-1 mg-t-20 mg-b-20">
                <div className="col-6">
                    <h2>Tasks</h2>
                </div>
                <div className="col-6 text-end">
                    <Button variant="primary" onClick={showTaskCreateForm}>Create task</Button>
                </div>
            </div>
            {loadingTasks &&
                <div className="row d-flex tasks-loading-spinner">
                    <div className="text-center">
                        <Spinner as="span" role="status" />
                    </div>
                </div>
            }
            {!loadingTasks && tasks.length == 0 &&
                <div className="row">
                    <div className="text-center mg-t-20">
                        <Alert variant={'dark'}>
                            There are no tasks available.
                        </Alert>
                    </div>
                </div>
            }
            {!loadingTasks && tasks.length > 0 &&
                <div>
                    <div className="table-max-height mg-b-20">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                <th className="text-center" style={{width: '5%'}}>#</th>
                                <th>Title</th>
                                <th className="text-center" style={{width: '15%'}}>Status</th>
                                <th className="text-center" style={{width: '15%'}}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.map(( task, index ) => {
                                    return (
                                        <tr key={index}>
                                            <td className="text-center">{task.id}</td>
                                            <td>
                                                <Alert.Link className="task-link" href="#" onClick={() => handleViewTask(task.id)}>
                                                    {task.title}
                                                </Alert.Link>
                                            </td>
                                            <td className="text-center">
                                                <StatusBadge taskStatus={task.status} />
                                            </td>
                                            <td className="text-center">
                                                <Button className="task-action-btn" variant="outline-dark" title="View task" onClick={() => handleViewTask(task.id)}>
                                                    <Eye />
                                                </Button>{' '}
                                                <Button className="task-action-btn" variant="outline-dark" title="Delete task" onClick={() => handleDeleteTask(task.id)}>
                                                    <Trash />
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </div>
                    <div className="center-pagination">
                        <Pagination>{paginationItems}</Pagination>
                    </div>
                </div>
            }

            {viewTaskId &&
                <TaskViewModal
                    taskId={viewTaskId}
                    onClose={() => {setViewTaskId(null)}}
                />
            }

            {deleteTaskId &&
                <ConfirmationPopup
                    title="Delete task"
                    message="This task will be deleted from the application. Do you want to proceed?"
                    confirmText="Delete"
                    cancelText="Cancel"
                    onConfirm={deleteTaskItem}
                    onCancel={() => {setDeleteTaskId(null)}}
                />
            }

            {isTaskCreateFormOpen &&
                <CreateTaskFormModal
                    onCancel={() => {setIsTaskCreateFormOpen(false)}}
                    onConfirm={handleTaskCreate}
                />
            }
        </div>
    );
}

export default Tasks;
