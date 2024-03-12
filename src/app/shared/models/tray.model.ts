import { Seed } from "./seed.model";

export class Tray {
  public trayName: string;
  public cellsShort: number;
  public cellsLong: number;
  public gridValues: Seed[][];

  constructor(trayName:string, cellsShort: number, cellsLong: number) {
    this.trayName = trayName;
    this.cellsShort = cellsShort;
    this.cellsLong = cellsLong;
    this.gridValues = [];
  }

}
