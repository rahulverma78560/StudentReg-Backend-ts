export interface StudentRegBoContract<T> {
  regStudent(data: T): Promise<T>;
  deleteStudent(id: string): Promise<T>;
  getStudentsList(): Promise<T[]>;
}
