export interface MessageQueueInterface {
  connect(): Promise<void>;
  sendMessage(queueName: string, message: any): Promise<void>;
  receiveMessage(
    queueName: string,
    callback: (message: any) => void,
  ): Promise<void>;
  disconnect(): Promise<void>;
}
