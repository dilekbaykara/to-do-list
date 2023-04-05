export interface ToDo {
  title: string;
  priority: 1 | 2;
  description: string;
  checked: true | false;
  duedate?: number;
}
