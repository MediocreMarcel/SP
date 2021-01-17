/**
 This class describes a test to test the functionality of the main functions
 when modifications are done to theapplication
 */

/**
 * start of test
 */
describe('full rundown test', function(){

  /**
   * unique identifier that consits of the current date and time when the test ist started.
   * The identifier will be added through the test to newly added objects
   * @type {Date}
   */
  var d = new Date(); // for now
  var ident = d.getHours().toString() + ":" + d.getMinutes().toString() + "_" +
    d.getDate() + "/" + d.getMonth()+1 + "/" + d.getFullYear() ;

  /**
   * connection to the login page
   */
  browser.get('http://localhost:4200/login')


  /**
   * tests the login with the test user
   */
  it('login test', function() {

     element(by.id('userNameInputField')).sendKeys('123456');

     element(by.id('userPasswordInputField')).sendKeys('test');


    /**
     * checks if the redirection to the home page was executed correctly
     */
    element(by.id('loginButton')).click().
      then(async() => {
        expect(await browser.getCurrentUrl()).toEqual("http://localhost:4200/home")
      });

  });


  /**
   * test for the creation of a new module
   */
  it('create Module Test', function()  {

     element(by.id('addQuestionButton')).click();

     element(by.id('createModuleButton')).click();

     element(by.id('courseSelection')).click();

     element(by.id('moduleName')).sendKeys('Test' + ident);

     element(by.cssContainingText(".mat-option-text", "Wirtschaftsinformatik (B.Sc.)")).click();

     element(by.id('addModule')).click()

      element(by.id('Test' + ident)).getText().
        then(function (attr) {
          expect(attr).toBe("Test" + ident)

        });

  });


  /**
   * test for the creation of a new question
   */
  it('create question Test', function() {

     element(by.id("Test" + ident)).click();

     element(by.id('createQuestionButton')).click();

     element(by.id('questionNameInput')).sendKeys('TestQuestion' + ident);

     element(by.id('questionNameShortInput')).sendKeys(ident);

     element(by.id('questionCategoryInput')).sendKeys("TestCategory");

     element(by.className('ql-editor ql-blank')).sendKeys('Lorem Ipsum Lorem Ipsum');

     element(by.id('criteriaInput')).sendKeys('Criteria Test');

     element(by.id('pointsInput')).sendKeys('10');

     element(by.id('addEvaluationCriteriaButton')).click();

    element(by.id('writeQuestionButton')).click();

    element(by.id("TestCategory")).click();

    browser.sleep(1000)

     element(by.id(ident)).getText().
    then(function (attr) {
      expect(attr).toBe(ident)

    });

  });


  /**
   * test for creation of a new exam
   */
  it('create exam Test', function() {

     element(by.id('createExamButtonNav')).click();

     element(by.id('examEditorButton')).click();

     element(by.id('examTitleInput')).sendKeys('Test' + ident);

     element(by.id('moduleSelectionButton')).click();

     element(by.id('Test' + ident)).click();

     element(by.id('examPointsInput')).sendKeys('100');

     element(by.id('examDateInput')).sendKeys('Thu Jan 14 2021 00:00:00 GMT+0');

     element(by.id('createExamEditorButton')).click();

     element(by.id('Test' + ident)).getText().
    then(function (attr) {
      expect(attr).toBe("Test" + ident)

    });



  });

  /**
   * test for adding question to the new exam and starting the exam
   */
  it('exam editor Test', function() {

     element(by.id('Test' + ident)).click();

    let dragQuestion = element(by.id('TestQuestion' + ident));

    let dropQuestion= element(by.id('questionDropList'));

    /**
     * drags a question into the drop zone to add it to the exam
     */
     browser.actions().mouseDown(dragQuestion.getWebElement()).mouseMove(dropQuestion.getWebElement()).mouseUp().perform();

     element(by.id('saveExamButton')).click();

     element(by.id('startExamButton')).click();

     element(by.id('selectFileButton')).click();

    /**
     * is neccessary to bea able to add the external file
     * into the browser window via the file browser
     */
    browser.sleep(15000);


     element(by.id('startExamStudentButton')).click();

     element(by.id('correctExamButtonNav')).click();

     element(by.id('Test' + ident)).getText().
    then(function (attr) {
      expect(attr).toBe("Test" + ident)

    });



  });

  /**
   * simulates the correction of the test exam
   */
  it('exam correction Test', function() {


     element(by.id('Test' + ident)).click();

     element(by.id('startCorrectureButton')).click();

    let i;

    for (i = 0; i < 2; i++){
        element(by.id('questionCheckbox_0')).click();
       element(by.id('nextStudentButton')).click();

    }
     element(by.id('endCorrectureButton')).click();

     element(by.id('Test' + ident)).getText().
    then(function (attr) {
      expect(attr).toBe("Test" + ident)

    });


  });



});



