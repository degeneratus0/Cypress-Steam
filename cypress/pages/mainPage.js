const genreTab = '#genre_tab';
const actionLink = "[class*='popup_menu_subheader'][data-genre-group*='action'] a";

const installSteamLink = "a[class*='installsteam']";

export function navigateToActionTab(){
    cy.log("Navigating to 'Action' genre page")
    cy.get(genreTab).click();
    cy.get(actionLink).click();
}

export function navigateToInstallSteamPage(){
    cy.log("Navigating to 'Install Steam' page");
    cy.get(installSteamLink).click();
}