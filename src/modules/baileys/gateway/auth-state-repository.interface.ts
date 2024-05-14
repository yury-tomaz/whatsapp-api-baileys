export interface AuthStateRepositoryInterface {
  writeData(instanceId: string, data: any, key: string): Promise<any>;
  readData(instanceId: string, key: string): Promise<any>;
  removeData(instanceId: string, key: string): Promise<any>;
}
