export interface HttpAdapter {
  get<T>(url: string): Promise<{ data: T }>;
}