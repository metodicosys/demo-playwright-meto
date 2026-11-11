import { Given, When, Then } from '../fixtures/fixtures';
import EnvironmentConfig from '../../base/EnvironmentConfig';
import { logger } from '../../base/logger';

Given('I am on the login page', async ({ loginPage }) => {
  await loginPage.open(EnvironmentConfig.baseUrl);
  logger.info(`Navegando a la página de login: ${EnvironmentConfig.baseUrl}`);
});

When('I enter valid credentials', async ({ loginPage }) => {
  await loginPage.enterCredentials(EnvironmentConfig.username, EnvironmentConfig.password);
});

When('I click the login button', async ({ loginPage }) => {
  await loginPage.submit();
});

Then('I should be redirected to the dashboard', async ({ loginPage }) => {
  await loginPage.waitForDashboard();
});
