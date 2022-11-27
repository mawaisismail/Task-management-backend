import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from '../dto/task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskStatus } from './task.model';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
  ) {}

  async getAllTasks(): Promise<Task[]> {
    return await this.tasksRepository.find();
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { description, title } = createTaskDto;
    const task = this.tasksRepository.create({
      description,
      status: TaskStatus.OPEN,
      title,
    });
    await this.tasksRepository.save(task);
    return task;
  }
  async deleteTaskById(id: string): Promise<void> {
    const { affected } = await this.tasksRepository.delete(id);
    if (affected === 0) {
      throw new NotFoundException(`Task With id ${id} not Found`);
    }
  }

  async updateTask(id, status): Promise<Task> {
    const task = await this.tasksRepository.findOneBy({ id });
    if (!task) throw new NotFoundException();
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }
}
