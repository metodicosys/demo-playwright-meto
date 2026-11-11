import * as fs from 'fs';
import * as path from 'path';

type ContextData = Record<string, any>;

class TestContext {
    private static instance: TestContext;
    private contextData: ContextData = {};
    private currentEnvironment: string = (process.env.NODE_ENV || 'desa').trim();
    private environmentConfig: Record<string, any> = {};

    private constructor() {}

    public static getInstance(): TestContext {
        if (!TestContext.instance) {
            TestContext.instance = new TestContext();
        }
    return TestContext.instance;
    }

    public put(key: string, value: any): void {
        this.contextData[key] = value;
    }

    public get<T>(key: string, defaultValue?: T): T | undefined {
        return this.contextData[key] ?? defaultValue;
    }

    public contains(key: string): boolean {
        return key in this.contextData;
    }

     public remove(key: string): void {
        delete this.contextData[key];
    }

    public clear(): void {
        this.contextData = {};
    }

    public loadEnvironmentConfig(config: Record<string, any>): void {
        this.environmentConfig = config;
        this.currentEnvironment = (process.env.NODE_ENV || 'desa').trim();
    }

       public getEnvVariable(key: string): string | undefined {
        if (this.environmentConfig[this.currentEnvironment]?.[key]) {
            return this.environmentConfig[this.currentEnvironment][key];
        }

        if (this.environmentConfig.default?.[key]) {
            return this.environmentConfig.default[key];
        }

        return process.env[key];
    }

    // Lee y parsea environments.conf y carga la configuración
    public createEnvironmentVariables(): void {
        const filePath = path.resolve(process.cwd(), 'environments.conf');
        const content = fs.readFileSync(filePath, 'utf-8');
        const envs: Record<string, any> = {};
        const envBlockRegex = /(\w+)\s*\{([^}]*)\}/g;
        let match;
        while ((match = envBlockRegex.exec(content)) !== null) {
            const envName = match[1];
            const envBlock = match[2];
            const vars: Record<string, string> = {};
            envBlock.split('\n').forEach(line => {
                const kv = line.match(/(\w+\.\w+)\s*=\s*"([^"]+)"/);
                if (kv) {
                    vars[kv[1]] = kv[2];
                }
            });
            envs[envName] = vars;
        }
        this.loadEnvironmentConfig(envs);
    }

    public static getStringEnvironmentProperty(testContext: TestContext, property: string): string | undefined {
        return testContext.getEnvVariable(property);
    }

    public static getBooleanEnvironmentProperty(testContext: TestContext, property: string): boolean {
        return Boolean(testContext.getEnvVariable(property) === 'true');
    }
}   

export default TestContext;