export interface Todo {
  id: string;
  title: string;
  description: string;
  status: "Todo" | "In Progress" | "Done";
  createdAt: string;
}
