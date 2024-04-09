import { Seed } from "./seed.model";

export class Tray {
  public uid: number | null;
  public trayName: string;
  public cellsShort: number;
  public cellsLong: number;
  public createdOn: string | null;
  public gridValues: Seed[][];

  constructor(uid: number | null, trayName:string, cellsShort: number, cellsLong: number, createdOn: Date | null, gridValues: Seed[][] = []) {
    this.uid = uid;
    this.trayName = trayName;
    this.cellsShort = cellsShort;
    this.cellsLong = cellsLong;
    if (createdOn != null) {
      this.createdOn = createdOn.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
    } else this. createdOn = null
    this.gridValues = gridValues;
  }

}
