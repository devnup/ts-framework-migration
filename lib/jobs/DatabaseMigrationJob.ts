import Server, { Logger } from 'ts-framework';
import BaseDatabaseMigration from '../migration/BaseDatabaseMigration';
import AsyncUtil from '../util/AsyncUtil';

export interface DatabaseMigrationJobOptions {
  verbose?: boolean,
  migration?: {
    auto: boolean,
    pipeline: any[],
  }
}

export default class DatabaseMigrationJob {
  options: DatabaseMigrationJobOptions;

  constructor(options: DatabaseMigrationJobOptions = {}) {
    // 'DatabaseMigrationJob', options);
  }

  /**
   * Runs the database migrations.
   * 
   * @param server The main server instance.
   */
  public async run(server: Server): Promise<void> {
    if (!this.options.migration) {
      server.logger.warn('MainDatabase: No migration pipeline specified');
    } else {
      const pipeline = this.options.migration.pipeline;

      const hasWorkQueue = await Promise.all(pipeline.map((step: BaseDatabaseMigration) => {
        return step.hasWork().then(count => ({ name: step.name, count }));
      })) as any[];

      const hasWork = hasWorkQueue.reduce((tot, next) => tot + next.count, 0);
      const details = hasWorkQueue.reduce((result, next) => ({ ...result, [next.name]: next.count }), {});

      if (hasWork && this.options.migration.auto) {
        server.logger.debug('MainDatabase: Starting migration pipeline', details);

        if (this.options.verbose) {
          Logger.info(
            '\n-------------------------------------------------------------------------------------------------\n' +
            '                                                               \n' +
            '              NOTICE: The database will be migrated            \n' +
            '                                                               \n' +
            hasWorkQueue.map(work => `              ${work.name}:\t\t${work.count} document(s)\n`).join('') +
            '                                                               \n' +
            '\n-------------------------------------------------------------------------------------------------\n');
        }

        // Run the migrations in series for expliciting defining the order of the execution
        // This may be important because migrations may depend on one another
        await AsyncUtil.mapSeries(pipeline, async (step) => step.run());
      } else if (hasWork) {
        server.logger.error('Database needs migration', details);
        process.exit(-1);
      } else {
        Logger.silly(`Database needs no migration, all models are updated`);
      }
    }
  }
}