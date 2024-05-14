import { ObjectId } from 'mongodb';

export default class Baileys {
  constructor(
    public tile: string,
    public createdAt?: Date,
    public updatedAt?: Date,
    public _id?: ObjectId,
  ) {}
}
