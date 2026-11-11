import { AfterScenario, BeforeWorker } from './fixtures/fixtures';
import { clearEvidenciaFolder, takeScreenshot } from './utils/utils';
import TestContext from '../base/TestContext';
import { logger } from '../base/logger';

BeforeWorker(async () => {
    logger.info("--- INICIO DE EJECUCIÓN DE PRUEBAS ---");
    clearEvidenciaFolder();
    TestContext.getInstance().createEnvironmentVariables();
    logger.info(`Entorno de pruebas: ${process.env.NODE_ENV ?? 'default'}`);
});

AfterScenario(async ({ page, $testInfo }) => {
    logger.info(`Escenario terminado: "${$testInfo.title}" - Estado: ${$testInfo.status}`);
    if ($testInfo.status !== 'passed') {
        try {
            await takeScreenshot(page, `failed_${$testInfo.title}`);
            logger.info(`Screenshot tomado para escenario fallido: "${$testInfo.title}"`);
        } catch (err) {
            logger.error(`No se pudo tomar screenshot en afterScenario: ${String(err)}`);
        }
    }
    if ($testInfo.status === 'passed') {
        logger.info(`Escenario exitoso: "${$testInfo.title}"`);
    }
});