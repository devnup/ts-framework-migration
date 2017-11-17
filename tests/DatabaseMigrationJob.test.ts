import Server from 'ts-framework';
import { DatabaseMigrationJob } from '../lib';

describe('lib.jobs.DatabaseMigrationJob', () => {

  let server;

  beforeEach(() => {
    server = new Server({
      port: process.env.PORT as any || 3333,
      routes: {
        get: {
          '/': (req, res) => res.success({ test: 'ok' })
        }
      }
    });
  })

  afterEach(async () => {
    try {
      await server.stop();
    } catch (error) {
      console.warn(error);
    }
  })

  it('should handle an empty job successfully', async () => {
    const job = new DatabaseMigrationJob();
    await job.run(server);
  });

  it('should handle an empty migration job successfully', async () => {
    const job = new DatabaseMigrationJob({
      migration: {
        auto: true,
        pipeline: [],
      }
    });
    await job.run(server);
  });

});