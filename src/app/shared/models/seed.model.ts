export class Seed {
  public uid: number | null;
  public type: string;
  public variety: string;
  public displayColor: string;


  constructor(uid: number | null, type: string, variety: string) {
    this.uid = uid;
    this.type = type;
    this.variety = variety;
    this.displayColor = this.deriveDisplayColor();
  }

  // I am not confident that the model is the correct place to invoke this method,
  // but I can't think of a better place for it to reliably initialize with every
  // Seed creation

  private deriveDisplayColor(): string {
    let h = 0;
    let s = 70;
    let l = 50;

    h = ((this.variety.charCodeAt(0) % 12) * 30) + this.variety.length;

    if (this.variety.length % 2 == 0 && this.variety.length <= 30) {
      l = 50 + this.variety.length;
    } else if (this.variety.length % 2 != 0 && this.variety.length <= 30) {
      l = 50 - this.variety.length;
    }

    return `hsl(${h}, ${s}%, ${l}%)`;
  }
}