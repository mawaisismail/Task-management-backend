import { TaskStatus } from '../../task/task.model';
import { IsEnum } from 'class-validator';

export class UpdateTaskDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
