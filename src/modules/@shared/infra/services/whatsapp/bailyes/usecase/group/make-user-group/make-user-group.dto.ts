export interface MakeUserGroupDto {
  id: string;
  users: string[];
  type: 'add'| 'demote' | 'remove' |'promote'
}