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


    let courseSelectButton= element(by.id('courseSelection')).click();

    let moduleName= element(by.id('moduleName')).sendKeys('Mathe 5');

    let courseSelect= element(by.cssContainingText(".mat-option-text", "Wirtschaftsinformatik (B.Sc.)")).click();

    browser.sleep(1000);

    let addModule= element(by.id('addModule')).click()


   /* let a= element(by.className("mat-card-title tileTitle", 'Mathe 5')).getText().
      then(function (attr) {
        expect(attr).toBe("Mathe 4 \nWirtschaftsinformatik (B.Sc.)")

      }); */




    browser.sleep(1000);






  });



  it('create question Test', async() => {

    let addQuestion= element(by.id("Mathe 5")).click();


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

    var examTitle = element(by.id('examTitleInput')).sendKeys('WS2021 Mathe4');

    var selectExamModule= element(by.id("moduleSelection")).click();

    var selectExamModule2= element(by.cssContainingText(".mat-option-text", 'Mathe 5')).click();

    var examPoints = element(by.id('examPointsInput')).sendKeys('100');

    var dataPick = element(by.id('examDateInput')).sendKeys('Thu Jan 14 2021 00:00:00 GMT+0');

   //browser.actions().sendKeys(protractor.Key.ENTER).perform();

    browser.sleep(2000);


    var examExamEditor= element(by.cssContainingText('.mat-button-wrapper', 'Erstellen')).click();

    browser.sleep(10000);



  });

  it('exam editor Test', async() => {

    var selectExam= element(by.id('WS2021 Mathe4')).click();

    browser.sleep(2000);

    var dragQuestion = element(by.id('TestQuestion'));

    var dropQuestion = element(by.id('questionDropList'));

    browser.actions().mouseDown(dragQuestion.getWebElement()).mouseMove(dropQuestion.getWebElement()).mouseUp().perform();

    browser.sleep(2000);



  });


});
