export class User {
  public userId: number;
  public firstName: string;
  public lastName: string;
  public email: string;


  constructor(userId:number, firstName:string, lastName:string, email:string) {
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}