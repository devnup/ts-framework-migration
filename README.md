ts-framework-migration
======================

[![pipeline status](https://gitlab.devnup.com/npm/ts-framework-migration/badges/master/pipeline.svg)](https://gitlab.devnup.com/npm/ts-framework-migration/commits/master)
[![coverage report](https://gitlab.devnup.com/npm/ts-framework-migration/badges/master/coverage.svg)](https://gitlab.devnup.com/npm/ts-framework-migration/commits/master)

A minimalistic framework for typescript based applications, with async/await and decorators support.

This plugin extends the Startup Jobs to handle database migration steps.

## Getting started

Install the module locally using Yarn.

```bash
yarn install git+https://gitlab.devnup.com/npm/ts-framework-migration.git
```

Prepare the Server migration job:

```typescript
import Server from 'ts-framework';
import { DatabaseMigrationJob } from 'ts-framework-migration';

// The migration job should always be the first step
const migrationJob = new DatabaseMigrationJob({
  verbose: true,
  migration: {
    // Get this from and ENV or a config file, this should be very carefully set
    auto: process.env.NODE_ENV === 'production' ? false : true,

    // The migration pipeline, will be executed in this precise order
    pipeline: [
      new UserFullNameMigration()
    ]
  }
}),

// Your main server definition
export default class MainServer extends Server {
  constructor() {
    const config = {
      startup: {
        // Add the migration job to the startup pipeline
        pipeline: [migrationJob]
      }
    }
    super(config);
  }
}
```

Create your first migration script:
```typescript
import { User } from '../path/to/models';
import { BaseDatabaseMigration } from 'ts-framework-migration';

export default class UserFullNameMigration extends BaseDatabaseMigration {

  constructor() {
    // Set the name to use in the debug logs
    super('SampleNameMigration');
  }

  public hasWork(): Promise<boolean> {
    // Checks in the database if there's work to be done
    // Can be also a configuration number, checked against some local cached version
    // In this example, we are searching for users with the old "fullName" attribute
    return User.count({ fullName: { $exists: true } });
  }

  public async map(): Promise<any[]> {
    // This method prepares the data to be migrated
    // It's importante to pass the original docs, this will be passed to the revert method
    // In case of errors this is your only hope of reverting the database state without using a backup
    return User.count({ fullName: { $exists: true } });
  }

  public async migrate(data: any[]): Promise<void> {
    // In this step you actually perform all changes needed in data
    // So in this sample will break the "fullName" into two separate attributes: "firstName" and "lastName"

    // Let's start with the bulk operation handler
    const bulk = Users.collection.initializeUnorderedBulkOp();

    data.map(item => {
      const doc = item.toObject();
      const split = doc.fullName.split(' ');

      // For each User mapped before, let's prepare the migration query
      bulk.find({ _id: item._id }).updateOne({
        $set: {
          // Prepare user separate name attributes
          firstName: split[0],
          lastName: split[split.length - 1],
        },
        $unset: {
          // Remove old fullName attribute
          fullName: true
        }
      });
    });

    // Execute them all at once
    return bulk.execute();
  }

  public revert(error: Error, data: any[]): Promise<void> {
    // In the case of running into an exception in the "migrate()" method, the error will be passed on here
    // This is the place to try to revert any changes you tried before so the database comes back to its original state
    // The script will cause the Server to crash anyway, but it gives you a chance of undoing any work without using a full backup
    
    // Again, let's start with the bulk operation handler
    const bulk = Users.collection.initializeUnorderedBulkOp();

    data.map(item => {
      const doc = item.toObject();

      bulk.find({ _id: item._id }).updateOne({
        // Revert the "fullName" attribute
        $set: {
          fullName: doc.fullName
        },
        // Remove any separate names that were actually migrated
        $unset: {
          firstName: true,
          lastName: true,
        }
      });
    });

    // Again, execute them all at once
    return bulk.execute();
  }
}

```
<br /><br />
## Documentation

#### DatabaseMigrationJob
##### new DatabaseMigrationJob(options: DatabaseMigrationJobOptions)

- **options.verbose:** Enabled verbose logging, defaults to ```false```.
- **options.migration.auto:** Enabled auto migration in the server startup, defaults to ```false```.
- **options.migration.pipeline:** The array of migration jobs to be run, the order will be respected.


#### BaseDatabaseMigration

##### new BaseDatabaseMigration(name: string, options: any)

- **name:** The migration name for the verbose logging, can be accessed as ```this.name``` inside of the job.
- **options:** Any internal options for this script, can be accessed as ```this.options``` inside of the job.

##### async hasWork(): Promise<boolean>

This method determines whether this script has any work to be done. Return ```false``` to prevent any migration.


##### async map(): Promise<any[]<>

Maps the the documents that should be migrated, will only be called is ```hasWork()``` have returned ```true```.


##### async migrate(data: any[]): Promise<void>

Migrates the data mapped previously, this should always be done as a bulk operation.

- **data:** The data mapped before by the ```map()``` method.


##### async revert(error: Error, data: any[]): Promise<void>

This method will be called when ```migrate()``` throw any error. Here you should revert the data mapped previously. This should always be done as a bulk operation.

- **error:** The error thrown by the  ```migrate()``` method.
- **data:** The data mapped before by the ```map()``` method.

<br />
<br />
## License

The project is licensed under the [MIT License](./LICENSE.md).