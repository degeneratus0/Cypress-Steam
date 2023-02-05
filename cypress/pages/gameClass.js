export class Game {
    constructor(discount = 0, originalPrice = 0, discountPrice = 0, gameAlias) {
      this.discount = discount;
      this.originalPrice = originalPrice;
      this.discountPrice = discountPrice;
      this.gameAlias = gameAlias;
    }
}