export  default interface ListInstancesUsecaseOutpuDto{
  sessionId: string;
  isOn: boolean;
  name: string;
  belongsTo:  string | undefined;
}