describe('Login', () => {
    beforeEach(() => {
      cy.visit('https://demowebshop.tricentis.com/login');
    });
  
    it('Login berhasil dengan kredensial yang valid', () => {
      cy.get('#Email').type('ev3mo@example.com');
      cy.get('#Password').type('Password123');
      cy.get('.login-button').click();
      
      // Verifikasi keberhasilan login
      cy.contains('Welcome, Please Sign In').should('not.exist');
    });
  
    it('Gagal login dengan email yang salah', () => {
      cy.get('#Email').type('invalid@example.com');
      cy.get('#Password').type('Password123');
      cy.get('.login-button').click();
      
      // Verifikasi pesan kesalahan
      cy.contains('Login was unsuccessful. Please correct the errors and try again.').should('be.visible');
    });
  
    it('Gagal login dengan kata sandi yang salah', () => {
      cy.get('#Email').type('user@example.com');
      cy.get('#Password').type('WrongPassword');
      cy.get('.login-button').click();
      
      // Verifikasi pesan kesalahan
      cy.contains('Login was unsuccessful. Please correct the errors and try again.').should('be.visible');
    });
  
    it('Gagal login dengan email dan kata sandi kosong', () => {
      cy.get('.login-button').click();
      
      // Verifikasi pesan kesalahan untuk email dan kata sandi kosong
      cy.contains('Login was unsuccessful. Please correct the errors and try again.').should('be.visible');
      cy.contains('No customer account found').should('be.visible');
    });
  
    it('Gagal login dengan email tidak terdaftar', () => {
      cy.get('#Email').type('nonexistent@example.com');
      cy.get('#Password').type('Password123');
      cy.get('.login-button').click();
      
      // Verifikasi pesan kesalahan
      cy.contains('Login was unsuccessful. Please correct the errors and try again.').should('be.visible');
    });
  });
  