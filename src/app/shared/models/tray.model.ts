import { Seed } from "./seed.model";

export class Tray {
  public uid: number | null;
  public trayName: string;
  public cellsShort: number;
  public cellsLong: number;
  public gridValues: Seed[][];

  constructor(uid: number | null, trayName:string, cellsShort: number, cellsLong: number, gridValues: Seed[][] = [] ) {
    this.uid = uid;
    this.trayName = trayName;
    this.cellsShort = cellsShort;
    this.cellsLong = cellsLong;
    this.gridValues = gridValues;
  }

}
