import { TaskStatus } from '../task/task.model';
import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
}

export class TaskWithCondition {
  status: TaskStatus;
  search: string;
}
