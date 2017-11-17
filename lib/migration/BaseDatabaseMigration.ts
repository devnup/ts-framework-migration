import { Database } from 'ts-framework';

export default abstract class BaseDatabaseMigration {
  constructor(public name: String) {

  }

  /**
   * Checks if script finds pending documents in the database to be migrated.
   */
  public abstract async hasWork(): Promise<boolean>;

  /**
   * Maps the IDs of the documents that should be migrated. Return an empty array to prevent any migration.
   */
  public abstract async map(): Promise<any[]>;

  /**
   * Handles the migrations of the mapped documents.
   * 
   * @param data The data mapped by the migration step
   */
  public abstract async migrate(data: any[]): Promise<void>;

  /**
   * Handles the migrations of the mapped documents.
   * 
   * @param data The data mapped by the migration step
   */
  public abstract async revert(error: Error, data: any[]): Promise<void>;

  /**
   * Runs the migration step safely, reverting the changes in the case of errors.
   * 
   * @param db The database instance
   * 
   * @returns List of ids of the documents migrated.
   */
  public async run(): Promise<any[]> {
    let data: string[];

    try {
      data = await this.map();
    } catch (error) {
      // TODO: Handle mapping errors properly
      throw error;
    }

    if (data && data.length) {
      try {
        await this.migrate(data);
        return data;
      } catch (error) {
        // TODO: Handle this case properly
        await this.revert(error, data);
        throw error;
      }
    }
  }
}