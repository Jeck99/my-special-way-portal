import LoginPage from './pageobjects/login.po';
import NavbarPage from './pageobjects/navbar.po';
import { testEnvironment } from './config/config';
import StudentPage from './pageobjects/students.po';
import ClassesPage from './pageobjects/classes.po';
import ClassDetailsPage from './pageobjects/class-details.po';
import { Selector, t } from 'testcafe';

const loginPage = new LoginPage();
const navbar = new NavbarPage();
const studentPage = new StudentPage();
const classesPage = new ClassesPage();
const classDetailsPage = new ClassDetailsPage();

const classOneName = 'Class1';
const classTwoName = 'Class2';
const studentOneName = 'StudentOne';
const studentTwoName = 'StudentTwo';

fixture(`Student tests`)
  .page(testEnvironment.feUrl)
  .beforeEach(async () => {
    await loginPage.loginAsPrinciple();
  });

async function classExists(className: string) {
  return await classesPage.classNameCell.withExactText(className).exists;
}

async function studentExists(studentName: string) {
  const studentNameSelector = Selector('.username').withExactText(studentName);
  return await studentNameSelector.exists;
}

function getDeleteClassButtonSelector(className: string) {
  return Selector(`[data-test-id=delete-class-button-${className}]`);
}

function getDeleteStudentButtonSelector(studentName: string) {
  return Selector(`[data-test-id=delete-user-button-${studentName}]`);
}

async function deleteClass(className: string) {
  await t
    .click(getDeleteClassButtonSelector(className))
    .click(classesPage.deleteClassDialogDeleteButton)
    .expect(classesPage.classNameCell.withExactText(className).exists)
    .notOk();
}

async function deleteStudent(studentName: string) {
  await t
    .click(getDeleteStudentButtonSelector(studentName))
    .click(studentPage.confirmDeleteButton)
    .expect(getDeleteStudentButtonSelector(studentName).exists)
    .notOk();
}

async function createClass(className: string) {
  if (await classExists(className)) {
    await deleteClass(className);
  }
  await t
    .click(classesPage.addClassButton)
    .typeText(classDetailsPage.classNameInput, className)
    .click(classDetailsPage.gradeSelect)
    .click(classDetailsPage.gradeSelectOption)
    .click(classDetailsPage.backToClassButton);
}

async function createStudent(studentName: string, className: string) {
  await t.click(studentPage.newStudentButton);
  await t.typeText(studentPage.firstName, studentName);
  await t.typeText(studentPage.lastName, studentName);
  await t.click(studentPage.classId);
  await t.click(studentPage.classIdOption.withExactText(className));
  await t.typeText(studentPage.username, studentName);
  await t.typeText(studentPage.password, studentName);
  await t.click(studentPage.saveButton);
  await t.expect(studentExists(studentName));
}

async function createStudentForClass(studentName: string, className: string) {
  if (await studentExists(studentName)) {
    await deleteStudent(studentName);
  }
  await createStudent(studentName, className);
}

/*test('new and existing student form error messages display correctly', async () => {
  await navbar.navigateToStudentsPage();
  await t
    .click(studentPage.newStudentButton)
    .click(studentPage.firstName)
    .click(studentPage.lastName)
    .click(studentPage.classId)
    .pressKey('tab') // just to close the drop down
    .click(studentPage.password)
    .click(studentPage.username)
    .pressKey('tab') // just to leave the previous field.Z
    .expect(studentPage.firstNameErr().exists)
    .ok()
    .expect(studentPage.lastNameErr().exists)
    .ok()
    .expect(studentPage.usernameErr().exists)
    .ok()
    .expect(studentPage.classIdErr().exists)
    .ok()
    .expect(studentPage.passwordErr().exists)
    .ok()
    .typeText(studentPage.username, 'a')
    .expect(studentPage.usernameFormatErr().exists)
    .ok()
    .expect(studentPage.saveButton.hasAttribute('disabled'))
    .ok();
});*/

test('teacher should show only students that are in his class', async () => {
  await navbar.navigateToClassesPage();
  await createClass(classOneName);
  await createClass(classTwoName);
  await navbar.navigateToStudentsPage();
  await createStudentForClass(studentOneName, classOneName);
  await createStudentForClass(studentTwoName, classTwoName);
});
