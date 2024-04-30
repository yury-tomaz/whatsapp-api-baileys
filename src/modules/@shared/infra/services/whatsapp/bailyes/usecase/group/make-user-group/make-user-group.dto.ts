export interface MakeUserGroupDto {
  id: string;
  groupId: string;
  users: string[];
  type: 'add'| 'demote' | 'remove' |'promote'
}