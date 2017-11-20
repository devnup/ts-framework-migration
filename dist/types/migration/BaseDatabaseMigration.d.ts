export default abstract class BaseDatabaseMigration {
    name: String;
    options: any;
    constructor(name: String, options?: any);
    /**
     * This method determines whether this script has any work to be done.
     */
    abstract hasWork(): Promise<boolean>;
    /**
     * Maps the the documents that should be migrated, will only be called is ```hasWork()``` have returned ```true```.
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
     * @returns List of ids of the documents migrated.
     */
    run(): Promise<any[]>;
}
