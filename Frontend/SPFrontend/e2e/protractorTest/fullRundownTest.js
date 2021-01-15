describe('full rundown test', function(){



  browser.get('http://localhost:4200/login')

  it('login test', async() => {

    await element(by.id('userNameInputField')).sendKeys('123456');

    await element(by.id('userPasswordInputField')).sendKeys('test');

    await element(by.id('loginButton')).click().
      then(async() => {
        expect(await browser.getCurrentUrl()).toEqual("http://localhost:4200/home")
      });

  });

  it('create Module Test', async() => {

    await element(by.id('addQuestionButton')).click();

    await element(by.id('createModuleButton')).click();
//

    let courseSelectButton= element(by.id('courseSelection')).click();

    let moduleName= element(by.id('moduleName')).sendKeys('Module Test');

    let courseSelect= element(by.cssContainingText(".mat-option-text", "Wirtschaftsinformatik (B.Sc.)")).click();

    browser.sleep(1000);

    let addModule= element(by.id('addModule')).click()


     let expectCheckModule= element(by.id('Module Test')).getText().
        then(function (attr) {
          expect(attr).toBe("Module Test")

        });

  });



  it('create question Test', async() => {

    let chooseModule= element(by.id("Module Test")).click();

    let createQuestionButton = element(by.id('createQuestionButton')).click();

    let questionName= element(by.id('questionNameInput')).sendKeys('TestQuestion1');

    let questionNameShort= element(by.id('questionNameShortInput')).sendKeys('TesQuest');

    let questionCategory= element(by.id('questionCategoryInput')).sendKeys('TestCategory');

    let questionText= element(by.className('ql-editor ql-blank')).sendKeys('Lorem Ipsum Lorem Ipsum');

    let questionCriteria= element(by.id('criteriaInput')).sendKeys('Criteria Test');

    let questionPoint= element(by.id('pointsInput')).sendKeys('10');

    let evalCritButton = element(by.id('addEvaluationCriteriaButton')).click();

    let writeQuestionButton = element(by.id('writeQuestionButton')).click();

    browser.sleep(1000);

    let openQuestionTab = element(by.id('TestCategory')).click();

    let expectCheckQuestion= element(by.id('TestQuestion1')).getText().
    then(function (attr) {
      expect(attr).toBe("TestQuestion1")

    });

  });


  it('create exam Test', async() => {

    var exam= element(by.id('createExamButtonNav')).click();

    var exam= element(by.id('examEditorButton')).click();

    browser.sleep(1000);

    var examTitle = element(by.id('examTitleInput')).sendKeys('Exam Test');

    var selectExamModule= element(by.id('moduleSelectionButton')).click();

    var selectExamModuleButton= element(by.id('Module Test')).click();

    var examPoints = element(by.id('examPointsInput')).sendKeys('100');

    var dataPick = element(by.id('examDateInput')).sendKeys('Thu Jan 14 2021 00:00:00 GMT+0');


    browser.sleep(2000);

    var examExamEditor= element(by.id('createExamEditorButton')).click();

    browser.sleep(1000);

    let expectCheckExam= element(by.id('Exam Test')).getText().
    then(function (attr) {
      expect(attr).toBe("Exam Test")

    });



  });

  it('exam editor Test', async() => {

    var selectExam= element(by.id('Exam Test')).click();

    browser.sleep(2000);

    var dragQuestion = element(by.id('TestQuestion1'));

    var dropQuestion = element(by.id('questionDropList'));

    browser.actions().mouseDown(dragQuestion.getWebElement()).mouseMove(dropQuestion.getWebElement()).mouseUp().perform();

    var saveExamButton= element(by.id('saveExamButton')).click();

    let startExamButton= element(by.id('startExamButton')).click();

    let selectFileButton= element(by.id('selectFileButton')).click();

    browser.sleep(10000);

    let startExamStudentButton= element(by.id('startExamStudentButton')).click();

    let correctExamButtonNav= element(by.id('correctExamButtonNav')).click();

    let expectCheckExam= element(by.id('Exam Test')).getText().
    then(function (attr) {
      expect(attr).toBe("Exam Test")

    });


  });

  it('exam correction Test', async() => {


    let selectExamCorrect= element(by.id('Exam Test')).click();

    let questionCheckbox= element(by.id('questionCheckbox')).click();

    var i;

    for (i = 0; i < 3; i++){
      let nextStudentButton= element(by.id('nextStudentButton')).click();
      browser.sleep(500);
    }


  });


});
