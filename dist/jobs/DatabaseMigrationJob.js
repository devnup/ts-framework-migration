"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ts_framework_1 = require("ts-framework");
const AsyncUtil_1 = require("../util/AsyncUtil");
class DatabaseMigrationJob extends ts_framework_1.BaseJob {
    constructor(options = {}) {
        super('DatabaseMigrationJob', options);
        this.options = options;
    }
    /**
     * Runs the database migrations.
     *
     * @param server The main server instance.
     */
    run(server) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.options.migration && server.logger) {
                server.logger.warn('MainDatabase: No migration pipeline specified');
            }
            else if (this.options.migration) {
                const pipeline = this.options.migration.pipeline;
                const hasWorkQueue = yield Promise.all(pipeline.map((step) => {
                    return step.hasWork().then(count => ({ name: step.name, count }));
                }));
                const hasWork = hasWorkQueue.reduce((tot, next) => tot + next.count, 0);
                const details = hasWorkQueue.reduce((result, next) => (Object.assign({}, result, { [next.name]: next.count })), {});
                if (hasWork && this.options.migration.auto) {
                    if (this.options.verbose && server.logger) {
                        server.logger.debug('MainDatabase: Starting migration pipeline', details);
                        ts_framework_1.Logger.info('\n-------------------------------------------------------------------------------------------------\n' +
                            '                                                               \n' +
                            '              NOTICE: The database will be migrated            \n' +
                            '                                                               \n' +
                            hasWorkQueue.map(work => `              ${work.name}:\t\t${work.count} document(s)\n`).join('') +
                            '                                                               \n' +
                            '\n-------------------------------------------------------------------------------------------------\n');
                    }
                    else if (server.logger) {
                        server.logger.debug('MainDatabase: Starting migration pipeline', details);
                    }
                    // Run the migrations in series for expliciting defining the order of the execution
                    // This may be important because migrations may depend on one another
                    yield AsyncUtil_1.default.mapSeries(pipeline, (step) => __awaiter(this, void 0, void 0, function* () { return step.run(); }));
                }
                else if (hasWork) {
                    if (this.options.exitOnError) {
                        server.logger.error('Database needs migration', details);
                        return process.exit(1);
                    }
                    else {
                        throw new Error('Database needs migration');
                    }
                }
                else {
                    ts_framework_1.Logger.silly(`Database needs no migration, all models are updated`);
                }
            }
        });
    }
}
exports.default = DatabaseMigrationJob;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0YWJhc2VNaWdyYXRpb25Kb2IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvam9icy9EYXRhYmFzZU1pZ3JhdGlvbkpvYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0NBQXVEO0FBRXZELGlEQUEwQztBQVcxQywwQkFBMEMsU0FBUSxzQkFBTztJQUV2RCxZQUFtQixVQUF1QyxFQUFFO1FBQzFELEtBQUssQ0FBQyxzQkFBc0IsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUR0QixZQUFPLEdBQVAsT0FBTyxDQUFrQztJQUU1RCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNVLEdBQUcsQ0FBQyxNQUFjOztZQUM3QixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO1lBQ3RFLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7Z0JBRWpELE1BQU0sWUFBWSxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBMkIsRUFBRSxFQUFFO29CQUNsRixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BFLENBQUMsQ0FBQyxDQUFVLENBQUM7Z0JBRWIsTUFBTSxPQUFPLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUN4RSxNQUFNLE9BQU8sR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsbUJBQU0sTUFBTSxJQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLElBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFFcEcsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQzNDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO3dCQUMxQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQywyQ0FBMkMsRUFBRSxPQUFPLENBQUMsQ0FBQzt3QkFFMUUscUJBQU0sQ0FBQyxJQUFJLENBQ1QsdUdBQXVHOzRCQUN2RyxtRUFBbUU7NEJBQ25FLG1FQUFtRTs0QkFDbkUsbUVBQW1FOzRCQUNuRSxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsaUJBQWlCLElBQUksQ0FBQyxJQUFJLFFBQVEsSUFBSSxDQUFDLEtBQUssZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDOzRCQUMvRixtRUFBbUU7NEJBQ25FLHVHQUF1RyxDQUFDLENBQUM7b0JBRTdHLENBQUM7b0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO3dCQUN6QixNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQywyQ0FBMkMsRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFDNUUsQ0FBQztvQkFFRCxtRkFBbUY7b0JBQ25GLHFFQUFxRTtvQkFDckUsTUFBTSxtQkFBUyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBTyxJQUFJLEVBQUUsRUFBRSxnREFBQyxNQUFNLENBQU4sSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFBLEdBQUEsQ0FBQyxDQUFDO2dCQUNsRSxDQUFDO2dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUNuQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7d0JBQzdCLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLDBCQUEwQixFQUFFLE9BQU8sQ0FBQyxDQUFDO3dCQUN6RCxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDekIsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDTixNQUFNLElBQUksS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUM7b0JBQzlDLENBQUM7Z0JBQ0gsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDTixxQkFBTSxDQUFDLEtBQUssQ0FBQyxxREFBcUQsQ0FBQyxDQUFDO2dCQUN0RSxDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7S0FBQTtDQUNGO0FBeERELHVDQXdEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTZXJ2ZXIsIHsgTG9nZ2VyLCBCYXNlSm9iIH0gZnJvbSAndHMtZnJhbWV3b3JrJztcbmltcG9ydCBCYXNlRGF0YWJhc2VNaWdyYXRpb24gZnJvbSAnLi4vbWlncmF0aW9uL0Jhc2VEYXRhYmFzZU1pZ3JhdGlvbic7XG5pbXBvcnQgQXN5bmNVdGlsIGZyb20gJy4uL3V0aWwvQXN5bmNVdGlsJztcblxuZXhwb3J0IGludGVyZmFjZSBEYXRhYmFzZU1pZ3JhdGlvbkpvYk9wdGlvbnMge1xuICB2ZXJib3NlPzogYm9vbGVhbixcbiAgZXhpdE9uRXJyb3I/OiBib29sZWFuO1xuICBtaWdyYXRpb24/OiB7XG4gICAgYXV0bzogYm9vbGVhbixcbiAgICBwaXBlbGluZTogYW55W10sXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0YWJhc2VNaWdyYXRpb25Kb2IgZXh0ZW5kcyBCYXNlSm9iIHtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgb3B0aW9uczogRGF0YWJhc2VNaWdyYXRpb25Kb2JPcHRpb25zID0ge30pIHtcbiAgICBzdXBlcignRGF0YWJhc2VNaWdyYXRpb25Kb2InLCBvcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSdW5zIHRoZSBkYXRhYmFzZSBtaWdyYXRpb25zLlxuICAgKiBcbiAgICogQHBhcmFtIHNlcnZlciBUaGUgbWFpbiBzZXJ2ZXIgaW5zdGFuY2UuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgcnVuKHNlcnZlcjogU2VydmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCF0aGlzLm9wdGlvbnMubWlncmF0aW9uICYmIHNlcnZlci5sb2dnZXIpIHtcbiAgICAgIHNlcnZlci5sb2dnZXIud2FybignTWFpbkRhdGFiYXNlOiBObyBtaWdyYXRpb24gcGlwZWxpbmUgc3BlY2lmaWVkJyk7XG4gICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMubWlncmF0aW9uKSB7XG4gICAgICBjb25zdCBwaXBlbGluZSA9IHRoaXMub3B0aW9ucy5taWdyYXRpb24ucGlwZWxpbmU7XG5cbiAgICAgIGNvbnN0IGhhc1dvcmtRdWV1ZSA9IGF3YWl0IFByb21pc2UuYWxsKHBpcGVsaW5lLm1hcCgoc3RlcDogQmFzZURhdGFiYXNlTWlncmF0aW9uKSA9PiB7XG4gICAgICAgIHJldHVybiBzdGVwLmhhc1dvcmsoKS50aGVuKGNvdW50ID0+ICh7IG5hbWU6IHN0ZXAubmFtZSwgY291bnQgfSkpO1xuICAgICAgfSkpIGFzIGFueVtdO1xuXG4gICAgICBjb25zdCBoYXNXb3JrID0gaGFzV29ya1F1ZXVlLnJlZHVjZSgodG90LCBuZXh0KSA9PiB0b3QgKyBuZXh0LmNvdW50LCAwKTtcbiAgICAgIGNvbnN0IGRldGFpbHMgPSBoYXNXb3JrUXVldWUucmVkdWNlKChyZXN1bHQsIG5leHQpID0+ICh7IC4uLnJlc3VsdCwgW25leHQubmFtZV06IG5leHQuY291bnQgfSksIHt9KTtcblxuICAgICAgaWYgKGhhc1dvcmsgJiYgdGhpcy5vcHRpb25zLm1pZ3JhdGlvbi5hdXRvKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMudmVyYm9zZSAmJiBzZXJ2ZXIubG9nZ2VyKSB7XG4gICAgICAgICAgc2VydmVyLmxvZ2dlci5kZWJ1ZygnTWFpbkRhdGFiYXNlOiBTdGFydGluZyBtaWdyYXRpb24gcGlwZWxpbmUnLCBkZXRhaWxzKTtcblxuICAgICAgICAgIExvZ2dlci5pbmZvKFxuICAgICAgICAgICAgJ1xcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXG4nICtcbiAgICAgICAgICAgICcgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG4nICtcbiAgICAgICAgICAgICcgICAgICAgICAgICAgIE5PVElDRTogVGhlIGRhdGFiYXNlIHdpbGwgYmUgbWlncmF0ZWQgICAgICAgICAgICBcXG4nICtcbiAgICAgICAgICAgICcgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG4nICtcbiAgICAgICAgICAgIGhhc1dvcmtRdWV1ZS5tYXAod29yayA9PiBgICAgICAgICAgICAgICAke3dvcmsubmFtZX06XFx0XFx0JHt3b3JrLmNvdW50fSBkb2N1bWVudChzKVxcbmApLmpvaW4oJycpICtcbiAgICAgICAgICAgICcgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG4nICtcbiAgICAgICAgICAgICdcXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxuJyk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChzZXJ2ZXIubG9nZ2VyKSB7XG4gICAgICAgICAgc2VydmVyLmxvZ2dlci5kZWJ1ZygnTWFpbkRhdGFiYXNlOiBTdGFydGluZyBtaWdyYXRpb24gcGlwZWxpbmUnLCBkZXRhaWxzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJ1biB0aGUgbWlncmF0aW9ucyBpbiBzZXJpZXMgZm9yIGV4cGxpY2l0aW5nIGRlZmluaW5nIHRoZSBvcmRlciBvZiB0aGUgZXhlY3V0aW9uXG4gICAgICAgIC8vIFRoaXMgbWF5IGJlIGltcG9ydGFudCBiZWNhdXNlIG1pZ3JhdGlvbnMgbWF5IGRlcGVuZCBvbiBvbmUgYW5vdGhlclxuICAgICAgICBhd2FpdCBBc3luY1V0aWwubWFwU2VyaWVzKHBpcGVsaW5lLCBhc3luYyAoc3RlcCkgPT4gc3RlcC5ydW4oKSk7XG4gICAgICB9IGVsc2UgaWYgKGhhc1dvcmspIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5leGl0T25FcnJvcikge1xuICAgICAgICAgIHNlcnZlci5sb2dnZXIuZXJyb3IoJ0RhdGFiYXNlIG5lZWRzIG1pZ3JhdGlvbicsIGRldGFpbHMpO1xuICAgICAgICAgIHJldHVybiBwcm9jZXNzLmV4aXQoMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdEYXRhYmFzZSBuZWVkcyBtaWdyYXRpb24nKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgTG9nZ2VyLnNpbGx5KGBEYXRhYmFzZSBuZWVkcyBubyBtaWdyYXRpb24sIGFsbCBtb2RlbHMgYXJlIHVwZGF0ZWRgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0iXX0=