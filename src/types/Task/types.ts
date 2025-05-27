export enum TodoStatus {
  TODO = "Todo",
  IN_PROGRESS = "In Progress",
  DONE = "Done",
}

export interface Todo {
  id: string;
  title: string;
  description: string;
  status: TodoStatus;
  createdAt: string;
}
