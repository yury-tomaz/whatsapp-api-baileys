import { v4 as uuidv4 } from "uuid";
import ValueObject from "./value-object.interface";


export default class Id implements ValueObject {
  private readonly _id: string;

  constructor(id?: string) {
    this._id = id || uuidv4();
  }

  get id(): string {
    return this._id;
  }
}