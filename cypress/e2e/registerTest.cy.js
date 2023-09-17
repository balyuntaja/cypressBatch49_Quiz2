describe('Register', () => {
  it('passes with valid email', () => {
    const email = getRandomEmail();

    cy.visit('https://demowebshop.tricentis.com');
    //mengunjungi web registrasi akun
    cy.get('.ico-register').click();

    // Mengisi formulir registrasi
    cy.get('#gender-male').click(); 
    cy.get('#FirstName').type('John'); 
    cy.get('#LastName').type('Doe');
    cy.get('#Email').type(email); 
    cy.get('#Password').type('Password123'); 
    cy.get('#ConfirmPassword').type('Password123'); 
    cy.get('#register-button').click();

    // Verifikasi pesan keberhasilan
    cy.contains('Your registration completed').should('be.visible');
  });

  it('fails with existing email', () => {
    // menggunakan email yang sudah ada sebelumnya
    const existingEmail = 'john.doe@example.com';

    cy.visit('https://demowebshop.tricentis.com');

    cy.get('.ico-register').click();

    // Mengisi formulir registrasi dengan email yang sudah ada
    cy.get('#gender-male').click();
    cy.get('#FirstName').type('John');
    cy.get('#LastName').type('Doe');
    cy.get('#Email').type(existingEmail); // Menggunakan email yang sudah ada
    cy.get('#Password').type('Password123');
    cy.get('#ConfirmPassword').type('Password123');
    cy.get('#register-button').click();

    // Verifikasi pesan kesalahan
    cy.contains('The specified email already exists').should('be.visible');
  });

  it('fails with mismatched passwords', () => {
    const email = getRandomEmail();

    cy.visit('https://demowebshop.tricentis.com');

    cy.get('.ico-register').click();

    // Mengisi formulir registrasi dengan kata sandi yang tidak cocok
    cy.get('#gender-male').click();
    cy.get('#FirstName').type('John');
    cy.get('#LastName').type('Doe');
    cy.get('#Email').type(email);
    cy.get('#Password').type('Password123');
    cy.get('#ConfirmPassword').type('Password456');
    cy.get('#register-button').click();

    // Verifikasi pesan kesalahan
    cy.contains('The password and confirmation password do not match').should('be.visible');
  });

  it('fails with incomplete fields', () => {
    const email = getRandomEmail();

    cy.visit('https://demowebshop.tricentis.com');

    cy.get('.ico-register').click();

    // Klik tombol registrasi tanpa mengisi semua field
    cy.get('#register-button').click();

    // Verifikasi pesan kesalahan untuk field yang tidak diisi
    cy.contains('First name is required.').should('be.visible');
    cy.contains('Last name is required.').should('be.visible');
    cy.contains('Email is required.').should('be.visible');
    cy.contains('Password is required.').should('be.visible');
    cy.contains('Password is required.').should('be.visible');
  });
});

// Function to generate a random email address
function getRandomEmail() {
  // Generate a random string of 10 characters
  const randomString = Math.random().toString(36).substring(7);
  
  // Return an email address with the random string
  return `${randomString}@example.com`;
}
