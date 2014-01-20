describe("E2E: Testing Routes", function() {

  beforeEach(function() {
    browser().navigateTo('/');
  });

  it('should have a working /heroes route', function() {
    browser().navigateTo('#/heroes');
    expect(browser().location().path()).toBe("/heroes");
   // expect(element('#heroeslabel').count).toBe(1)
  });

  it('should have a working /weapons route', function() {
    browser().navigateTo('#/weapons');
    expect(browser().location().path()).toBe("/weapons");
   // expect(element('#weaponslabel').count).toBe(1)
    
  });

  it('should have a working /races route', function() {
    browser().navigateTo('#/races');
    expect(browser().location().path()).toBe("/races");
   // expect(element('#raceslabel').count).toBe(1)
    
  });

  it('should have a working /jobs route', function() {
    browser().navigateTo('#/jobs');
    expect(browser().location().path()).toBe("/jobs");
   // expect(element("jobslabel").count).toBe(1)
    
  });

  it('should jump to the /index path when / is accessed', function() {
    browser().navigateTo('#/index');
    expect(browser().location().path()).toBe("/");
   // expect(element("#mainlabel").count).toBe(1)
    
  });




});