import { DataSource, DataSourceOptions } from 'typeorm';
export declare const databaseConfig: (() => {
    type: string;
    host: string | undefined;
    port: number;
    username: string | undefined;
    password: string | undefined;
    database: string | undefined;
    entities: string[];
    migrations: string[];
    synchronize: boolean;
    logging: boolean;
    ssl: boolean;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    type: string;
    host: string | undefined;
    port: number;
    username: string | undefined;
    password: string | undefined;
    database: string | undefined;
    entities: string[];
    migrations: string[];
    synchronize: boolean;
    logging: boolean;
    ssl: boolean;
}>;
export declare const dataSourceOptions: DataSourceOptions;
export declare const AppDataSource: DataSource;
