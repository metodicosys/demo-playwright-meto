import { createBdd, test as base } from 'playwright-bdd';
import LoginPage from '../pages/loginpage';

type Fixtures = {
  loginPage: LoginPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

export const { 
    Given, 
    When, 
    Then,
    AfterWorker,
    BeforeWorker,
    BeforeScenario,
    AfterScenario
 } = createBdd(test);