export interface StudentRegDaoContract<T> {
  write(data: T[]): Promise<void>;
  read(): Promise<T[]>;
}
