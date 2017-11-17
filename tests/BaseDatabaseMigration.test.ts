import { BaseDatabaseMigration } from '../lib';

describe('lib.migration.BaseDatabaseMigration', () => {

  it('should handle a success properly', async () => {
    /** A test migration that will always succeed */
    let hasMigrated = false;
    let hasReverted = false;
    class TestSuccessMigration extends BaseDatabaseMigration {
      constructor() {
        super('TestSuccessMigration');
      }

      async hasWork(): Promise<boolean> {
        return true;
      }
      async map(): Promise<any[]> {
        return [1, 2];
      }
      async migrate(data: any[]): Promise<void> {
        hasMigrated = true;
        return;
      }
      async revert(error: Error, data: any[]): Promise<void> {
        hasReverted = true;
        throw new Error("Method not implemented.");
      }
    }

    const step = new TestSuccessMigration();
    await step.run();
    expect(hasMigrated).toBe(true);
    expect(hasReverted).toBe(false);
  });


  it('should handle an empty map properly', async () => {
    /** A test migration that will always succeed */
    let hasMigrated = false;
    let hasReverted = false;
    class TestSuccessMigration extends BaseDatabaseMigration {
      s
      constructor() {
        super('TestSuccessMigration');
      }

      async hasWork(): Promise<boolean> {
        return true;
      }
      async map(): Promise<any[]> {
        return [];
      }
      async migrate(data: any[]): Promise<void> {
        hasMigrated = true;
        return;
      }
      async revert(error: Error, data: any[]): Promise<void> {
        hasReverted = true;
        throw new Error("Method not implemented.");
      }
    }

    const step = new TestSuccessMigration();
    await step.run();
    expect(hasMigrated).toBe(false);
    expect(hasReverted).toBe(false);
  });

  it('should handle a map error properly', async () => {
    let hasPassed = false;
    let hasCrashed = false;

    /** A test migration that will always succeed */
    class TestMapErrorMigration extends BaseDatabaseMigration {
      s
      constructor() {
        super('TestMapErrorMigration');
      }

      async hasWork(): Promise<boolean> {
        return true;
      }
      async map(): Promise<any[]> {
        hasPassed = true;
        throw new Error("Method not implemented.");
      }
      async migrate(data: any[]): Promise<void> {
        hasPassed = false;
        throw new Error("Method not implemented.");
      }
      async revert(error: Error, data: any[]): Promise<void> {
        hasPassed = false;
        throw new Error("Method not implemented.");
      }
    }

    const step = new TestMapErrorMigration();
    try {
      await step.run();
    } catch (error) {
      hasCrashed = true;
    }
    expect(hasPassed && hasCrashed).toBe(true);
  });

  it('should handle a migration error properly, reverting its actions', async () => {
    let hasMigrated = false;
    let hasReverted = false;
    let hasCrashed = false;

    /** A test migration that will always succeed */
    class TestMapErrorMigration extends BaseDatabaseMigration {
      s
      constructor() {
        super('TestMapErrorMigration');
      }

      async hasWork(): Promise<boolean> {
        return true;
      }
      async map(): Promise<any[]> {
        return [1, 2, 3];
      }
      async migrate(data: any[]): Promise<void> {
        hasMigrated = true;
        throw new Error("Method not implemented.");
      }
      async revert(error: Error, data: any[]): Promise<void> {
        hasReverted = true;
      }
    }

    const step = new TestMapErrorMigration();
    try {
      await step.run();
    } catch (error) {
      hasCrashed = true;
    }

    expect(hasCrashed).toBe(true);
    expect(hasMigrated && hasReverted).toBe(true);
  })

  it('should handle a revert error properly, reverting its actions', async () => {
    let hasPassed = false;
    let hasReverted = false;
    let hasCrashed = false;

    /** A test migration that will always succeed */
    class TestMapErrorMigration extends BaseDatabaseMigration {
      s
      constructor() {
        super('TestMapErrorMigration');
      }

      async hasWork(): Promise<boolean> {
        return true;
      }
      async map(): Promise<any[]> {
        return [1, 2, 3];
      }
      async migrate(data: any[]): Promise<void> {
        hasPassed = true;
        throw new Error("Method not implemented.");
      }
      async revert(error: Error, data: any[]): Promise<void> {
        hasReverted = true;
        throw new Error("Method not implemented.");
      }
    }

    const step = new TestMapErrorMigration();
    try {
      await step.run();
    } catch (error) {
      hasCrashed = true;
    }

    expect(hasCrashed).toBe(true);
  })

});