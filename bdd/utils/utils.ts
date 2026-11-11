import * as fs from 'node:fs';
import * as path from 'node:path';
import type { Page } from '@playwright/test';

export const takeScreenshot = async (page: Page, name = 'Screenshot'): Promise<void> => {
    const screenshotsPath = path.join(process.cwd(), 'screenshots');
    fs.mkdirSync(screenshotsPath, { recursive: true });

    const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '');
    const filePath = path.join(screenshotsPath, `${name}_${timestamp}.png`);

    await page.screenshot({ path: filePath });
};

export const clearEvidenciaFolder = (): void => {
    const evidenciaPath = path.join(process.cwd(), 'screenshots');

    if (!fs.existsSync(evidenciaPath)) {
        fs.mkdirSync(evidenciaPath, { recursive: true });
        return;
    }

    fs.readdirSync(evidenciaPath).forEach(file => {
        const filePath = path.join(evidenciaPath, file);

        try {
            if (fs.lstatSync(filePath).isDirectory()) {
                fs.rmSync(filePath, { recursive: true, force: true });
            } else {
                fs.unlinkSync(filePath);
            }
        } catch (err) {
            console.error(`Error al eliminar el archivo o directorio: ${filePath}`, err);
        }
    });
};
