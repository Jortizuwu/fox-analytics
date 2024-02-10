export interface Item {
  id: string;
  createAt: Date;
  updateAt: Date;
  deleteAt?: Date;
  title: string;
  description?: string;
  done: boolean;
}
