const mainPage = require('../pages/mainPage.js');
const genrePage = require('../pages/genrePage.js');
const ageRestrictionPage = require('../pages/ageRestrictionPage.js');
const gamePage = require('../pages/gamePage.js');
const downloadSteamPage = require('../pages/downloadSteamPage.js');
const utilities = require('../support/utilities.js');

describe('Steam Tests', () => {
  beforeEach(() => {
    cy.log(`Navigating to ${Cypress.config().baseUrl}`).visit('/');
  });

  it('Checks if the game with max sale on the Top Sellers page have correct price on its page', 
  () => {
    cy.log("Navigating to 'Action' genre page")
    cy.get(mainPage.genreTab).click();
    cy.get(mainPage.actionLink).click();
    cy.log("Looking for 'Top Sellers' tab");
    cy.get(genrePage.saleItemBrowser).scrollIntoView();
    cy.get(genrePage.saleItemTabs, {timeout: 30000}).contains(genrePage.topSellersTabText).should('be.visible').click({scrollBehavior: 'center'});
    const maxDiscountGame = new utilities.Game();
    cy.log("Getting the game with the most discount");
    cy.get(genrePage.saleItemsDiscounted).each((element) => {
      cy.wrap(element, {log:false}).as("saleItem").find(genrePage.saleItemDiscount, {log:false})
      .then((e) => {
        let itemDiscount = parseInt(e.text());
        if (itemDiscount < maxDiscountGame.discount) {
          cy.get('@saleItem').find(genrePage.saleItemDiscountPrice)
          .then((e) => maxDiscountGame.discountPrice = utilities.parseMoney(e.text()));
          cy.get('@saleItem').find(genrePage.saleItemOriginalPrice)
          .then((e) => maxDiscountGame.originalPrice = utilities.parseMoney(e.text()));
          maxDiscountGame.discount = itemDiscount;
          cy.wrap(e).as("maxDiscountGame");
        }
      });
    });
    cy.log("Navigating to game's page");
    cy.get('@maxDiscountGame').parents(genrePage.saleItemDefault).find(genrePage.saleItemTitle).parent('a').should('have.attr', 'href')
    .then((href) => cy.visit(href));
    cy.get('body').then((body) => {
      cy.log("Checking if age restriction page exists");
      if (body.find(ageRestrictionPage.viewProductButton).length > 0) {
        cy.log("Checking if age selector exists on age restriction page");
        if (body.find(ageRestrictionPage.ageYearSelect).length > 0) {
          cy.log("Selecting old enough age");
          cy.get(ageRestrictionPage.ageYearSelect).select('1970');
        }
        else{
          cy.log("Age selector does not exist")
        }
        cy.log("Clicking the view product button");
        cy.get(ageRestrictionPage.viewProductButton).click();
      }
      else{
        cy.log("Age restriction page does not exist");
      }
    });
    cy.log("Comparing stored game's price info with the price on the game's page");
    cy.get(gamePage.discount).first().then((e) => expect(parseInt(e.text())).to.equal(maxDiscountGame.discount));
    cy.get(gamePage.discountPrice).first().then((e) => expect(utilities.parseMoney(e.text())).to.equal(maxDiscountGame.discountPrice));
    cy.get(gamePage.originalPrice).first().then((e) => expect(utilities.parseMoney(e.text())).to.equal(maxDiscountGame.originalPrice));
  });
  
  it('Checks if steam can be downloaded',
  () => {
    cy.log("Deleting downloads folder if exists");
    cy.task('deleteFolderIfExists', Cypress.config().downloadsFolder);
    cy.log("Navigating to 'Install Steam' page");
    cy.get(mainPage.installSteamLink).click();

    //workaround for download links issue: https://github.com/cypress-io/cypress/issues/14857#issuecomment-1328945376
    cy.window().then(win => {
      const triggerAutIframeLoad = () => {
        const AUT_IFRAME_SELECTOR = '.aut-iframe';
        const autIframe = win.parent.document.querySelector(AUT_IFRAME_SELECTOR);
        autIframe.dispatchEvent(new Event('load'));
        win.removeEventListener('beforeunload', triggerAutIframeLoad);
      };
      win.addEventListener('beforeunload', triggerAutIframeLoad);
    });

    cy.log("Clicking 'Install Steam' button");
    cy.get(downloadSteamPage.installSteamButton).first().click();
    cy.log("Checking if 'SteamSetup.exe' file was downloaded");
    cy.readFile(Cypress.config().downloadsFolder + '\\SteamSetup.exe', 'binary');
  });
});