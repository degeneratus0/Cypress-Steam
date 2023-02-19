export function deleteFolderIfExists() {
    cy.log("Deleting downloads folder if exists");
    cy.task('deleteFolderIfExists', Cypress.config().downloadsFolder);
}
export function checkIfFileWasDownloaded(fileName){
    cy.log(`Checking if '${fileName}' file was downloaded`);
    cy.readFile(Cypress.config().downloadsFolder + '\\' + fileName, 'binary');
}