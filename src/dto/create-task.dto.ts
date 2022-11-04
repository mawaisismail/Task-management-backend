import { TaskStatus } from '../task/task.model';

export class CreateTaskDto {
  title: string;
  description: string;
}

export class TaskWithCondition {
  status: TaskStatus;
  search: string;
}
