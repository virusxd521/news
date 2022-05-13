// Disable comments tests temporarily

// const selectors = {
//   comments: "[data-test-label='comments']"
// };

// describe('Post i18n', () => {
//   before(() => {
//     // Update baseUrl to include current language
//     Cypress.config('baseUrl', 'http://localhost:8080/chinese/news');
//     cy.visit('/javascript-array-length');
//   });

//   it('the comments section should not render its i18n keys', () => {
//     cy.get(`${selectors.comments} button`)
//       .invoke('text')
//       .then(text => text.trim())
//       .should('not.equal', 'comments.show-comments');

//     cy.get(`${selectors.comments} button`)
//       .click()
//       .get(`${selectors.comments} div`)
//       .invoke('text')
//       .then(text => text.trim())
//       .should('not.equal', 'comments.error');
//   });
// });
