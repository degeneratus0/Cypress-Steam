const mainPage = require('../pages/mainPage.js');
const genrePage = require('../pages/genrePage.js');
const ageRestrictionPage = require('../pages/ageRestrictionPage.js');
const gamePage = require('../pages/gamePage.js');
const downloadSteamPage = require('../pages/downloadSteamPage.js');
const fileUtilities = require('../utilities/fileUtilities.js');

describe('Steam Tests', () => {
  beforeEach(() => {
    cy.log(`Navigating to ${Cypress.config().baseUrl}`).visit('/');
  });

  it('Checks if the game with max sale on the Top Sellers page have correct price on its page', 
  () => {
    mainPage.navigateToActionTab();

    genrePage.clickTopSellersTab();
    const maxDiscountGame = genrePage.getGameWithTheMostDiscount();
    genrePage.navigateToGamePage(maxDiscountGame.gameAlias);

    ageRestrictionPage.passAgeRestriction();

    gamePage.compareGameToInfoOnPage(maxDiscountGame);});
  
  it('Checks if steam can be downloaded',
  () => {
    fileUtilities.deleteFolderIfExists();
    mainPage.navigateToInstallSteamPage();
    downloadSteamPage.clickDownloadButton();
    fileUtilities.checkIfFileWasDownloaded("SteamSetup.exe");
  });
});