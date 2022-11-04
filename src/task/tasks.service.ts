import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto, TaskWithCondition } from '../dto/create-task.dto';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTask(): Task[] {
    return this.tasks;
  }
  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
  getTaskById(id: string): Task {
    const task = this.tasks.find((userId) => userId.id === id);
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }
  deleteTaskById(id: string) {
    const task = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return task;
  }
  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    this.tasks = this.tasks.map((task) =>
      task.id === id ? { ...task, status: status } : task,
    );
    return task;
  }

  getTasksWithCondition = (taskWithCondition: TaskWithCondition): Task[] => {
    const { search, status } = taskWithCondition;
    let tasks = this.getAllTask();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter((tasks) => {
        if (
          tasks.status.includes(search) ||
          tasks.description.includes(search)
        ) {
          return true;
        }
        return false;
      });
    }
    return tasks;
  };
}
