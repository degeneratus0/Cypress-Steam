export class Game{
    constructor(discount = 0, originalPrice = 0, discountPrice = 0){
      this.discount = discount;
      this.originalPrice = originalPrice;
      this.discountPrice = discountPrice;
    }
}

export function parseMoney(value){
    return parseFloat(value.replace('$', ''))
}