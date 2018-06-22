describe('Renderers: tui', () => {
  before(() => {
    cy.visit('/../../../example/docs-tui/BetterCounter.html');
  });

  it('should renders props correctly', () => {
    cy.get('[data-jsdoc-vuejs="section-props"]').contains('Props').should('have.class', 'subsection-title');
    cy.get('[data-jsdoc-vuejs="table-props"]').as('table-props').should('have.class', 'tui-grid-table');

    cy
      .get('@table-props')
      .find('> thead > tr > th')
      .should(($headers) => {
        expect($headers).to.have.length(5);
        expect($headers.eq(0).text()).to.contains('Name');
        expect($headers.eq(1).text()).to.contains('Type');
        expect($headers.eq(2).text()).to.contains('Default value');
        expect($headers.eq(3).text()).to.contains('Required ?');
        expect($headers.eq(4).text()).to.contains('Description');
      });

    cy
      .get('@table-props')
      .find('> tbody > tr')
      .then(($rows) => {
        const $firstRowChildren = $rows.eq(0).children();
        const $secondRowChildren = $rows.eq(1).children();

        expect($rows).to.have.length(2);

        expect($firstRowChildren.eq(0).html()).to.eq('<b>initialCounter</b>');
        expect($firstRowChildren.eq(1).html()).to.eq('Number');
        expect($firstRowChildren.eq(2).html()).to.eq('-');
        expect($firstRowChildren.eq(3).html()).to.eq('<b>Yes</b>');
        expect($firstRowChildren.eq(4).html()).to.eq('-');

        expect($secondRowChildren.eq(0).html()).to.eq('<b>step</b>');
        expect($secondRowChildren.eq(1).html()).to.eq('Number');
        expect($secondRowChildren.eq(2).html()).to.eq('<code>1</code>');
        expect($secondRowChildren.eq(3).html()).to.eq('No');
        expect($secondRowChildren.eq(4).html()).to.eq('Step');
      });
  });

  it('should renders data correctly', () => {
    cy.get('[data-jsdoc-vuejs="section-data"]').contains('Data').should('have.class', 'subsection-title');
    cy.get('[data-jsdoc-vuejs="table-data"]').as('table-data').should('have.class', 'tui-grid-table');

    cy
      .get('@table-data')
      .find('> thead > tr > th')
      .should(($headers) => {
        expect($headers).to.have.length(4);
        expect($headers.eq(0).text()).to.contains('Name');
        expect($headers.eq(1).text()).to.contains('Type');
        expect($headers.eq(2).text()).to.contains('Default value');
        expect($headers.eq(3).text()).to.contains('Description');
      });

    cy
      .get('@table-data')
      .find('> tbody > tr')
      .then(($rows) => {
        const $rowChildren = $rows.eq(0).children();

        expect($rows).to.have.length(1);

        expect($rowChildren.eq(0).html()).to.eq('<b>counter</b>');
        expect($rowChildren.eq(1).html()).to.eq('Number');
        expect($rowChildren.eq(2).html()).to.eq('-');
        expect($rowChildren.eq(3).html()).to.eq('Current counter\'s value');
      });
  });

  it('should renders computed correctly', () => {
    cy.get('[data-jsdoc-vuejs="section-computed"]').contains('Computed').should('have.class', 'subsection-title');
    cy.get('[data-jsdoc-vuejs="table-computed"]').as('table-data').should('have.class', 'tui-grid-table');

    cy
      .get('@table-data')
      .find('> thead > tr > th')
      .should(($headers) => {
        expect($headers).to.have.length(3);
        expect($headers.eq(0).text()).to.contains('Name');
        expect($headers.eq(1).text()).to.contains('Type');
        expect($headers.eq(2).text()).to.contains('Description');
      });

    cy
      .get('@table-data')
      .find('> tbody > tr')
      .then(($rows) => {
        const $rowChildren = $rows.eq(0).children();

        expect($rows).to.have.length(1);

        expect($rowChildren.eq(0).html()).to.eq('<b>message</b>');
        expect($rowChildren.eq(1).html()).to.eq('String');
        expect($rowChildren.eq(2).html()).to.eq('A message');
      });
  });

  it('should render methods properly', () => {
    cy.contains('h3', 'Methods').should('have.attr', 'class', 'subsection-title');
    cy.get('#decrement')
      .contains('decrement()')
      .contains('a[href="BetterCounter.vue.html#line43"]', 'line 43');

    cy.get('#increment')
      .contains('increment()')
      .contains('a[href="BetterCounter.vue.html#line36"]', 'line 36');

    cy.get('#showDialog')
      .contains('showDialog(counter)')
      .contains('a[href="BetterCounter.vue.html#line51"]', 'line 51');

    cy.contains('created()').should('not.exist');
  });
});
