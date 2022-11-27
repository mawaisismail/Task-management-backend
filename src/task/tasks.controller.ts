import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { Task } from '../dto/task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Get()
  getAllTask(): Promise<Task[]> {
    return this.tasksService.getAllTasks();
  }
  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }
  @Post()
  createTask(@Body() task: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(task);
  }
  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTaskById(id);
  }

  @Patch('/:id')
  updateTask(
    @Param('id') id: string,
    @Body('status') status: string,
  ): Promise<Task> {
    return this.tasksService.updateTask(id, status);
  }
}
