import fs from 'fs';
import { checks } from '../..';
import { TestGlobal, ValidEnvValues } from '../../coreTypes';

const testEnvVars = ['NODE_ENV', 'PORT', 'SESSION_SECRET'];
const coreTestPathConfig = (global as unknown as TestGlobal).coreTestPathConfig;

export const testValidEnvValues: ValidEnvValues = {
    NODE_ENV: ['development', 'production', 'test'],
    PORT: (port: string) => {
        return !isNaN(parseInt(port));
    }
};

describe('checkEnv()', () => {
    it('throws when env vars are missing', () => {
        process.env = {
            NODE_ENV: 'development'
        };

        expect(() => checks.checkEnv(testEnvVars, testValidEnvValues)).toThrowError('Env var not set: PORT');
    });

    it('throws if validEnvVar is not in .env', () => {
        process.env = {
            NODE_ENV: 'development',
            PORT: '4000',
            SESSION_SECRET: 'abc'
        };

        expect(() => checks.checkEnv(testEnvVars, { ...testValidEnvValues, FOO: ['bar'] })).toThrowError(
            'Variable from validEnvValues does not exist in your .env'
        );
    });

    it('throws when env vars have wrong value', () => {
        process.env = {
            NODE_ENV: 'development',
            PORT: 'aaa',
            SESSION_SECRET: 'abc'
        };

        expect(() => checks.checkEnv(testEnvVars, testValidEnvValues)).toThrowError('Env var has wrong value: PORT.');
    });

    it('throws when env vars have wrong type', () => {
        process.env = {
            NODE_ENV: 'random',
            PORT: '4000',
            SESSION_SECRET: 'abc'
        };

        expect(() => checks.checkEnv(testEnvVars, testValidEnvValues)).toThrowError(
            'Env var has wrong value: NODE_ENV; must be on of: development, production, test'
        );
    });

    it("doesn't throw when everything is there", () => {
        process.env = {
            NODE_ENV: 'development',
            PORT: '4000',
            SESSION_SECRET: 'abc'
        };

        expect(() => checks.checkEnv(testEnvVars, testValidEnvValues)).not.toThrowError();
    });

    it('throws if public dir does not exist', () => {
        if (coreTestPathConfig.publicDirPath && fs.existsSync(coreTestPathConfig.publicDirPath)) {
            expect(() => checks.checkPublicDir(coreTestPathConfig)).not.toThrowError();
        } else {
            expect(() => checks.checkPublicDir(coreTestPathConfig)).toThrowError();
        }
    });
});
