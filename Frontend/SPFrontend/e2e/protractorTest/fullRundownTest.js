describe('full rundown test', function(){

  browser.waitForAngularEnabled(false)

  browser.get('http://localhost:4200/login')

  it('login test', async() => {

    await element(by.id('userNameInputField')).sendKeys('123456');

    await element(by.id('userPasswordInputField')).sendKeys('test');

    await element(by.id('loginButton')).click().
      then(async() => {

       if (expect(await browser.getCurrentUrl()).toEqual("http://localhost:4200/home") == true){
         console.log("Login works");
       }
       else {
         console.log("Login failed");
       }

      });

  });

  it('create Module Test', async() => {

    var frage= element(by.id('addQuestionButton')).click();

    browser.sleep(1000);

    var module= element(by.id('createModuleButton')).click();


    var courseDrop= element(by.id('courseSelection')).click();


    var courseDrop= element(by.id('moduleName')).sendKeys('Mathe 5');


    browser.sleep(1000);

    var course= element(by.cssContainingText(".mat-option-text", "Wirtschaftsinformatik (B.Sc.)")).click();


    var addModule= element(by.id('addModule')).click();



    browser.sleep(1000);



  });



  it('create question Test', async() => {

    var addQuestion= element(by.id("matCardModuleTitle", "Mathe 5")).click();

    var createQuestion = element(by.id('createQuestionButton')).click();

    var questionName= element(by.id('questionNameInput')).sendKeys('TestQuestion');

    var questionNameShort= element(by.id('questionNameShortInput')).sendKeys('TesQuest');

    var questionCategory= element(by.id('questionCategoryInput')).sendKeys('Matrizen');

    var questionText= element(by.className('ql-editor ql-blank')).sendKeys('Lorem Ipsum Lorem Ipsum');

    var questionPoint= element(by.id('criteriaInput')).sendKeys('Criteria Test');

    var questionPoint= element(by.id('pointsInput')).sendKeys('10');

    var createQuestion = element(by.id('addEvaluationCriteriaButton')).click();

    var writeQuestion = element(by.id('writeQuestionButton')).click();

    browser.sleep(1000);

  });


  it('create exam Test', async() => {

    var exam= element(by.id('createExamButtonNav')).click();

    var exam= element(by.id('examEditorButton')).click();

    browser.sleep(1000);

    var examTitle = element(by.id('examTitleInput')).sendKeys('WS2021 Mathe2');

    var selectExamModule= element(by.id("moduleSelection")).click();

    var selectExamModule2= element(by.cssContainingText(".mat-option-text", "Mathe 5")).click();

    var examPoints = element(by.id('examPointsInput')).sendKeys('100');

    var examDate = element(by.id('examDateInput')).sendKeys('11.1.2022');

    browser.sleep(1000);

    var examExamEditor= element(by.id('createExamEditorButton')).click();

    browser.sleep(1000);



  });

  it('exam editor Test', async() => {

    var selectExam= element(by.id('selectExamButton', 'Prog 1 PVL')).click();

    var dragQuestion = element(by.id('editorQuestionDrag',  'Sortierverfahren Benennen'));

    var dropQuestion = element(by.id('questionDropList'));

    browser.sleep(2000);

    browser.actions().mouseDown(dragQuestion.getWebElement()).mouseMove(dropQuestion.getWebElement()).mouseUp().perform();



    browser.sleep(2000);



  });


});
