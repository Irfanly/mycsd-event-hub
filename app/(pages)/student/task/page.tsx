'use client';

import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const TaskManagementPage = () => {
  // Mock data for tasks
  const [tasks, setTasks] = useState({
    "Not Started": [
      {
        id: 1,
        title: "Prepare Cleaning Supplies",
        description: "Ensure all required cleaning tools are available.",
        assignee: "Alice",
      },
    ],
    "In Progress": [
      {
        id: 2,
        title: "Coordinate with Volunteers",
        description: "Organize volunteers into teams and assign tasks.",
        assignee: "Bob",
      },
    ],
    Completed: [
      {
        id: 3,
        title: "Finalize Budget",
        description: "Submit the finalized budget for approval.",
        assignee: "Charlie",
      },
    ],
  });

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    assignee: "",
    progress: "Not Started",
  });

  const handleDragEnd = (result: { source: any; destination: any; }) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceList = [...tasks[source.droppableId]];
    const destinationList = [...tasks[destination.droppableId]];

    // Remove the dragged item from the source list
    const [movedTask] = sourceList.splice(source.index, 1);

    // Add the dragged item to the destination list
    destinationList.splice(destination.index, 0, movedTask);

    // Update the state
    setTasks({
      ...tasks,
      [source.droppableId]: sourceList,
      [destination.droppableId]: destinationList,
    });
  };

  const handleAddTask = () => {
    if (newTask.title && newTask.description && newTask.assignee) {
      setTasks({
        ...tasks,
        [newTask.progress]: [
          ...tasks[newTask.progress],
          { id: Date.now(), title: newTask.title, description: newTask.description, assignee: newTask.assignee },
        ],
      });
      setNewTask({ title: "", description: "", assignee: "", progress: "Not Started" });
    }
  };

  return (
    <div className="bg-gray-50 p-8 min-h-screen flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Task Management</h1>

      {/* Add Task Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4">Add Task</Button>
        </DialogTrigger>
        <DialogContent className="p-4">
          <h2 className="text-lg font-bold mb-4">Create New Task</h2>
          <Input
            type="text"
            placeholder="Task Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="mb-2"
          />
          <Textarea
            placeholder="Task Description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            className="mb-2"
          />
          <Input
            type="text"
            placeholder="Assignee"
            value={newTask.assignee}
            onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
            className="mb-2"
          />
          <select
            value={newTask.progress}
            onChange={(e) => setNewTask({ ...newTask, progress: e.target.value })}
            className="w-full p-2 border rounded"
          >
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <Button className="mt-4" onClick={handleAddTask}>
            Add Task
          </Button>
        </DialogContent>
      </Dialog>

      {/* Drag and Drop Context */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-3 gap-4">
          {Object.keys(tasks).map((status) => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-white rounded shadow p-4"
                >
                  <h2 className="font-bold text-lg mb-4">{status}</h2>
                  {tasks[status].map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                      {(provided) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="mb-4"
                        >
                          <CardHeader className="font-bold">{task.title}</CardHeader>
                          <CardContent>
                            <p>{task.description}</p>
                            <p className="text-sm text-gray-500">Assigned to: {task.assignee}</p>
                          </CardContent>
                        </Card>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskManagementPage;
