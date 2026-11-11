import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { loadEnvFile } from "node:process";

const envFile = resolve(process.cwd(), ".env");
if (existsSync(envFile)) {
  loadEnvFile(envFile);
}

export default class EnvironmentConfig {
    static get baseUrl(): string {
        return this.getRequiredVariable(
            `BASE_URL_${this.environment.toUpperCase()}`
        );
    }

    static get environment(): string {
        return (process.env.NODE_ENV || 'desa').toLowerCase();
    }

    static get role(): string {
        return (process.env.ROLE || 'admin').toLowerCase();
    }

    static get username(): string {
        return this.getRequiredVariable(
            `demo_web_${this.environment}_${this.role}_username`
        );
    }

    static get password(): string {
        return this.getRequiredVariable(
            `demo_web_${this.environment}_${this.role}_password`
        );
    }

    private static getRequiredVariable(variableName: string): string {
        const value = process.env[variableName];
        if (!value) {
            throw new Error(
                `No se encontró la variable de entorno requerida: ${variableName}`
            );
        }
        return value;
    }
}