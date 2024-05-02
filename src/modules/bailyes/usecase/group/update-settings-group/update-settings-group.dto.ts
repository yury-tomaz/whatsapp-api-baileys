export interface UpdateSettingsGroupDto {
  id: string;
  groupId: string;
  action: 'announcement' | 'not_announcement' | 'unlocked' | 'locked';
}