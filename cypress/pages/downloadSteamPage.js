const cypressUtilities = require('../utilities/cypressUtilities.js');

const installSteamButton = "a[class*='install_steam']";

export function clickDownloadButton(){
    cypressUtilities.prepareToDownload();
    cy.log("Clicking 'Install Steam' button");
    cy.get(installSteamButton).first().click();
}