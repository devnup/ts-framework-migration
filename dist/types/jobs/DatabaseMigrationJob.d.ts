import Server, { BaseJob } from 'ts-framework';
export interface DatabaseMigrationJobOptions {
    verbose?: boolean;
    exitOnError?: boolean;
    migration?: {
        auto: boolean;
        pipeline: any[];
    };
}
export default class DatabaseMigrationJob extends BaseJob {
    options: DatabaseMigrationJobOptions;
    constructor(options?: DatabaseMigrationJobOptions);
    /**
     * Runs the database migrations.
     *
     * @param server The main server instance.
     */
    run(server: Server): Promise<void>;
}
