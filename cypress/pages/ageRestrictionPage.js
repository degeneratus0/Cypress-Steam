const viewProductButton = "#view_product_page_btn";
const ageYearSelect = "#ageYear";

export function passAgeRestriction(){
    cy.get('body').then((body) => {
        cy.log("Checking if age restriction page exists");
        if (body.find(viewProductButton).length > 0) {
          cy.log("Checking if age selector exists on age restriction page");
          if (body.find(ageYearSelect).length > 0) {
            cy.log("Selecting old enough age");
            cy.get(ageYearSelect).select('1970');
          }
          else{
            cy.log("Age selector does not exist")
          }
          cy.log("Clicking the view product button");
          cy.get(viewProductButton).click();
        }
        else{
          cy.log("Age restriction page does not exist");
        }
      });
}