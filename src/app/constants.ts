export interface User {
  id: number,
  name: string
};
export interface Task {
  id: number,
  task: string,
  status: string
}
export interface TaskDetails {
  id: number,
  name: string,
  designation: string,
  tasks: Array<Task>
}
