export interface BlockUnblockUserDto {
  id: string;
  to: string;
  action: 'block' | 'unblock'
}