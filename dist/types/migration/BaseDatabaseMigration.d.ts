export default abstract class BaseDatabaseMigration {
    name: String;
    options: any;
    constructor(name: String, options?: any);
    /**
     * Checks if script finds pending documents in the database to be migrated.
     */
    abstract hasWork(): Promise<boolean>;
    /**
     * Maps the IDs of the documents that should be migrated. Return an empty array to prevent any migration.
     */
    abstract map(): Promise<any[]>;
    /**
     * Handles the migrations of the mapped documents.
     *
     * @param data The data mapped by the migration step
     */
    abstract migrate(data: any[]): Promise<void>;
    /**
     * Handles the migrations of the mapped documents.
     *
     * @param data The data mapped by the migration step
     */
    abstract revert(error: Error, data: any[]): Promise<void>;
    /**
     * Runs the migration step safely, reverting the changes in the case of errors.
     *
     * @param db The database instance
     *
     * @returns List of ids of the documents migrated.
     */
    run(): Promise<any[]>;
}
