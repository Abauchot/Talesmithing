export interface UseCase<TRequest, TResponse> {
  execute(request: TRequest): Promise<TResponse>;
}

export interface Repository<T> {
  findById(id: number): Promise<T | null>;
  create(data: any): Promise<T>;
  update(entity: T): Promise<T>;
  delete(id: number): Promise<void>;
}
