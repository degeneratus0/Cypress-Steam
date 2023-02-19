const gameClass = require('../pages/gameClass.js');
const stringUtilities = require('../utilities/stringUtilities.js');

const saleItemBrowser = "[class*='sale_item_browser']";
const saleItemTabs = "[class*='saleitembrowser']";
const topSellersTabText = "Top Sellers";
const saleItemDefault = "[class*='SaleItemDefault']";
const saleItemTitle = "[class*='WidgetTitle']";
const saleItemsDiscounted = "[class*='SaleItemDefault'] [class*='Discounted'][class*='Container']";
const saleItemDiscount = "[class*='StoreSaleDiscountBox']";
const saleItemOriginalPrice = "[class*='StoreOriginalPrice']";
const saleItemDiscountPrice = "[class*='StoreSalePriceBox']";

export function clickTopSellersTab(){
    cy.log("Looking for 'Top Sellers' tab");
    cy.get(saleItemBrowser).scrollIntoView();
    cy.get(saleItemTabs, {timeout: 30000}).contains(topSellersTabText).should('be.visible').click({scrollBehavior: 'center'});
}

export function getGameWithTheMostDiscount(){
    cy.log("Getting the game with the most discount");
    let maxDiscountGame = new gameClass.Game();
    maxDiscountGame.gameAlias = "maxDiscountGame"
    cy.get(saleItemsDiscounted).each((element) => {
      cy.wrap(element, {log:false}).as("saleItem").find(saleItemDiscount, {log:false})
      .then((e) => {
        let itemDiscount = parseInt(e.text());
        if (itemDiscount < maxDiscountGame.discount) {
          cy.get('@saleItem').find(saleItemDiscountPrice)
          .then((e) => maxDiscountGame.discountPrice = stringUtilities.parseMoney(e.text()));
          cy.get('@saleItem').find(saleItemOriginalPrice)
          .then((e) => maxDiscountGame.originalPrice = stringUtilities.parseMoney(e.text()));
          maxDiscountGame.discount = itemDiscount;
          cy.wrap(e).as(maxDiscountGame.gameAlias);
        }
      });
    });
    return maxDiscountGame;
}

export function navigateToGamePage(gamePageAlias){
    cy.log("Navigating to game's page");
    cy.get(`@${gamePageAlias}`).parents(saleItemDefault).find(saleItemTitle).parent('a').should('have.attr', 'href')
    .then((href) => cy.visit(href));
}