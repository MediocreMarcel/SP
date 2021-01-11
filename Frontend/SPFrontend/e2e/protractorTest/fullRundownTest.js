describe('full rundown test', function(){

  browser.get('http://localhost:4200/login')

  it('login test', function(){

    var user = element(by.id('userNameInputField')).sendKeys('123456');
    user.then(console.log("UserName input works"));


    var password = element(by.id('userPasswordInputField')).sendKeys('test');

    var login= element(by.id('loginButton')).click();

    browser.sleep(1000);
    /*
    var button2= element(by.id('button2')).getText();
     button2.then(console.log)
     expect(button2.getText()).toEqual('Klausur korrigieren');
     */

  });

  it('create Module Test', function(){

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



  it('create question Test', function(){

    var addQuestion= element(by.id("matCardModuleTitle", "Mathe 5")).click();

    var createQuestion = element(by.id('createQuestionButton')).click();

    var questionName= element(by.id('questionNameInput')).sendKeys('TestQuestion');

    var questionNameShort= element(by.id('questionNameShortInput')).sendKeys('TesQuest');

    var questionPoint= element(by.id('questionPointInput')).sendKeys('10');

    var questionCategory= element(by.id('questionCategoryInput')).sendKeys('Matrizen');

    var questionText= element(by.className('ql-editor ql-blank')).sendKeys('Lorem Ipsum Lorem Ipsum');

    var writeQuestion = element(by.id('writeQuestionButton')).click();

    browser.sleep(1000);

  });


  it('create exam Test', function(){

    var exam= element(by.id('createExamButtonNav')).click();


    var exam= element(by.id('addExamButton')).click();
    exam.then(console.log("Button addQuestion works"));

    browser.sleep(1000);

    var examEditor= element(by.id('examEditorButton')).click();
    examEditor.then(console.log("Button addQuestion works"));

    var examTitle = element(by.id('examTitleInput')).sendKeys('WS2021 Mathe2');
    examTitle.then(console.log("UserName input works"));

    var examCourse= element(by.id('moduleSelection')).$('[value="Mathe2"]').click();
    examCourse.then(console.log("Button addQuestion works"));

    var examPoints = element(by.id('examPointsInput')).sendKeys('100');
    examPoints.then(console.log("UserName input works"));

    var examDate = element(by.id('examPointsInput')).sendKeys('15.1.2022');
    examDate.then(console.log("UserName input works"));

    var examExamEditor= element(by.id('createExamEditorButton')).click();
    examExamEditor.then(console.log("Button addQuestion works"));

    browser.sleep(1000);



  });

});
