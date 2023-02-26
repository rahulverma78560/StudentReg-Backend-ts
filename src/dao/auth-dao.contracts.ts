export interface AuthDaoContract<T> {
  register(data: any): Promise<void>;
  find(userName: string): Promise<T[]>;
  findAll(): Promise<T[]>;
}
