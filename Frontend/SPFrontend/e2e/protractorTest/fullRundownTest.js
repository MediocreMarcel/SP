describe('full rundown test', function(){

  var d = new Date(); // for now
  var ident = d.getHours().toString() + ":" + d.getMinutes().toString() + "_" +
    d.getDate() + "/" + d.getMonth()+1 + "/" + d.getFullYear() ;

  browser.get('http://localhost:4200/login')

  it('login test', function() {

     element(by.id('userNameInputField')).sendKeys('123456');

     element(by.id('userPasswordInputField')).sendKeys('test');

     element(by.id('loginButton')).click().
      then(async() => {
        expect(await browser.getCurrentUrl()).toEqual("http://localhost:4200/home")
      });

  });



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



  it('create question Test', function() {

     element(by.id("Test" + ident)).click();

     element(by.id('createQuestionButton')).click();

     element(by.id('questionNameInput')).sendKeys('TestQuestion' + ident);

     element(by.id('questionNameShortInput')).sendKeys('TesQuest');

     element(by.id('questionCategoryInput')).sendKeys('TestCategory');

     element(by.className('ql-editor ql-blank')).sendKeys('Lorem Ipsum Lorem Ipsum');

     element(by.id('criteriaInput')).sendKeys('Criteria Test');

     element(by.id('pointsInput')).sendKeys('10');

     element(by.id('addEvaluationCriteriaButton')).click();

     element(by.id('writeQuestionButton')).click();

     element(by.id('TestCategory')).click();

     element(by.id('TestQuestion' + ident)).getText().
    then(function (attr) {
      expect(attr).toBe("TestQuestion" + ident)

    });

  });


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

  it('exam editor Test', function() {

     element(by.id('Test' + ident)).click();

    let dragQuestion = element(by.id('TestQuestion' + ident));

    let dropQuestion= element(by.id('questionDropList'));

    browser.actions().mouseDown(dragQuestion.getWebElement()).mouseMove(dropQuestion.getWebElement()).mouseUp().perform();

     element(by.id('saveExamButton')).click();

     element(by.id('startExamButton')).click();

     element(by.id('selectFileButton')).click();


    browser.sleep(15000);


     element(by.id('startExamStudentButton')).click();

     element(by.id('correctExamButtonNav')).click();

     element(by.id('Test' + ident)).getText().
    then(function (attr) {
      expect(attr).toBe("Test" + ident)

    });



  });

  it('exam correction Test', function() {


     element(by.id('Test' + ident)).click();

     element(by.id('startCorrectureButton')).click();

    let i;

    for (i = 0; i < 2; i++){
        element(by.id('questionCheckbox')).click();
       element(by.id('nextStudentButton')).click();

    }
     element(by.id('endCorrectureButton')).click();

     element(by.id('Test' + ident)).getText().
    then(function (attr) {
      expect(attr).toBe("Test" + ident)

    });


  });






});



