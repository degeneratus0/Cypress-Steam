const stringUtilities = require('../utilities/stringUtilities.js');

const discount = "[class*='game_purchase'] [class='discount_pct']";
const originalPrice = "[class*='game_purchase'] [class='discount_original_price']";
const discountPrice = "[class*='game_purchase'] [class='discount_final_price']";

export function compareGameToInfoOnPage(game){
    cy.log("Comparing stored game's price info with the price on the game's page");
    cy.get(discount).first().then((e) => expect(parseInt(e.text())).to.equal(game.discount));
    cy.get(discountPrice).first().then((e) => expect(stringUtilities.parseMoney(e.text())).to.equal(game.discountPrice));
    cy.get(originalPrice).first().then((e) => expect(stringUtilities.parseMoney(e.text())).to.equal(game.originalPrice));
}