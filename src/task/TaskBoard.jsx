import { useState } from "react";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";
import AddTaskModal from "./addTaskModal";

export default function TaskBoard() {
    const defaultTask = {
        'id': crypto.randomUUID(),
        'title': 'Learn React',
        'description': 'I want to learn React such taht can trat it like my slave and make it to whetever i want to do.',
        'tags': ['web', 'react', 'js'],
        'priority': 'High',
        'isFavourite': true,
    }
    const [tasks, setTasks] = useState([defaultTask]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [taskToUpdate, setTaskToUpdate] = useState(null);

    function handleAddEditTask(newTask, isAdd) {
        if (isAdd) {
            setTasks([...tasks, newTask]);
        } else {
            setTasks(
                tasks.map((task) => {
                    if (task.id === newTask.id) {
                        return newTask;
                    }
                    return task;
                })
            )
        }
        setShowAddModal(false);
    }

    function handleEditTask(task) {
        setTaskToUpdate(task);
        setShowAddModal(true);
    }

    function handleCloseClick() {
        setShowAddModal(false);
        setTaskToUpdate(null);
    }

    function handleDeleteTask(taskId) {
        const tasksAfterDelete = tasks.filter(task => task.id !== taskId);
        setTasks(tasksAfterDelete);
    }

    function handleDeleteAllClick() {
        tasks.length = 0;
        setTasks([...tasks]);
    }

    return (
        <>
            <section className="mb-20" id="tasks">
                {showAddModal && <AddTaskModal
                    onSave={handleAddEditTask}
                    onCloseClick={handleCloseClick}
                    taskToUpdate={taskToUpdate}
                />}
                <div className="container mx-auto">
                    <div className="p-2 flex justify-end">
                        <SearchTask />
                    </div>

                    <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
                        <TaskActions
                            onAddClick={() => setShowAddModal(true)}
                            onDeleteAllClick={handleDeleteAllClick}
                        />
                        <TaskList
                            tasks={tasks}
                            onEdit={handleEditTask}
                            onDelete={handleDeleteTask}
                        />
                    </div>
                </div>
            </section>
        </>
    );
}