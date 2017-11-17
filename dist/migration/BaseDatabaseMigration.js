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
class BaseDatabaseMigration {
    constructor(name, options = {}) {
        this.name = name;
        this.options = options;
    }
    /**
     * Runs the migration step safely, reverting the changes in the case of errors.
     *
     * @param db The database instance
     *
     * @returns List of ids of the documents migrated.
     */
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            let data;
            try {
                data = yield this.map();
            }
            catch (error) {
                // TODO: Handle mapping errors properly
                throw error;
            }
            if (data && data.length) {
                try {
                    yield this.migrate(data);
                    return data;
                }
                catch (error) {
                    // TODO: Handle this case properly
                    yield this.revert(error, data);
                    throw error;
                }
            }
        });
    }
}
exports.default = BaseDatabaseMigration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZURhdGFiYXNlTWlncmF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL21pZ3JhdGlvbi9CYXNlRGF0YWJhc2VNaWdyYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUVBO0lBQ0UsWUFBbUIsSUFBWSxFQUFTLFVBQWUsRUFBRTtRQUF0QyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVMsWUFBTyxHQUFQLE9BQU8sQ0FBVTtJQUV6RCxDQUFDO0lBMEJEOzs7Ozs7T0FNRztJQUNVLEdBQUc7O1lBQ2QsSUFBSSxJQUFjLENBQUM7WUFFbkIsSUFBSSxDQUFDO2dCQUNILElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUMxQixDQUFDO1lBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDZix1Q0FBdUM7Z0JBQ3ZDLE1BQU0sS0FBSyxDQUFDO1lBQ2QsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDeEIsSUFBSSxDQUFDO29CQUNILE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDekIsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDZCxDQUFDO2dCQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ2Ysa0NBQWtDO29CQUNsQyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUMvQixNQUFNLEtBQUssQ0FBQztnQkFDZCxDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7S0FBQTtDQUNGO0FBekRELHdDQXlEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERhdGFiYXNlIH0gZnJvbSAndHMtZnJhbWV3b3JrJztcblxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgQmFzZURhdGFiYXNlTWlncmF0aW9uIHtcbiAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IFN0cmluZywgcHVibGljIG9wdGlvbnM6IGFueSA9IHt9KSB7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgc2NyaXB0IGZpbmRzIHBlbmRpbmcgZG9jdW1lbnRzIGluIHRoZSBkYXRhYmFzZSB0byBiZSBtaWdyYXRlZC5cbiAgICovXG4gIHB1YmxpYyBhYnN0cmFjdCBhc3luYyBoYXNXb3JrKCk6IFByb21pc2U8Ym9vbGVhbj47XG5cbiAgLyoqXG4gICAqIE1hcHMgdGhlIElEcyBvZiB0aGUgZG9jdW1lbnRzIHRoYXQgc2hvdWxkIGJlIG1pZ3JhdGVkLiBSZXR1cm4gYW4gZW1wdHkgYXJyYXkgdG8gcHJldmVudCBhbnkgbWlncmF0aW9uLlxuICAgKi9cbiAgcHVibGljIGFic3RyYWN0IGFzeW5jIG1hcCgpOiBQcm9taXNlPGFueVtdPjtcblxuICAvKipcbiAgICogSGFuZGxlcyB0aGUgbWlncmF0aW9ucyBvZiB0aGUgbWFwcGVkIGRvY3VtZW50cy5cbiAgICogXG4gICAqIEBwYXJhbSBkYXRhIFRoZSBkYXRhIG1hcHBlZCBieSB0aGUgbWlncmF0aW9uIHN0ZXBcbiAgICovXG4gIHB1YmxpYyBhYnN0cmFjdCBhc3luYyBtaWdyYXRlKGRhdGE6IGFueVtdKTogUHJvbWlzZTx2b2lkPjtcblxuICAvKipcbiAgICogSGFuZGxlcyB0aGUgbWlncmF0aW9ucyBvZiB0aGUgbWFwcGVkIGRvY3VtZW50cy5cbiAgICogXG4gICAqIEBwYXJhbSBkYXRhIFRoZSBkYXRhIG1hcHBlZCBieSB0aGUgbWlncmF0aW9uIHN0ZXBcbiAgICovXG4gIHB1YmxpYyBhYnN0cmFjdCBhc3luYyByZXZlcnQoZXJyb3I6IEVycm9yLCBkYXRhOiBhbnlbXSk6IFByb21pc2U8dm9pZD47XG5cbiAgLyoqXG4gICAqIFJ1bnMgdGhlIG1pZ3JhdGlvbiBzdGVwIHNhZmVseSwgcmV2ZXJ0aW5nIHRoZSBjaGFuZ2VzIGluIHRoZSBjYXNlIG9mIGVycm9ycy5cbiAgICogXG4gICAqIEBwYXJhbSBkYiBUaGUgZGF0YWJhc2UgaW5zdGFuY2VcbiAgICogXG4gICAqIEByZXR1cm5zIExpc3Qgb2YgaWRzIG9mIHRoZSBkb2N1bWVudHMgbWlncmF0ZWQuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgcnVuKCk6IFByb21pc2U8YW55W10+IHtcbiAgICBsZXQgZGF0YTogc3RyaW5nW107XG5cbiAgICB0cnkge1xuICAgICAgZGF0YSA9IGF3YWl0IHRoaXMubWFwKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIC8vIFRPRE86IEhhbmRsZSBtYXBwaW5nIGVycm9ycyBwcm9wZXJseVxuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuXG4gICAgaWYgKGRhdGEgJiYgZGF0YS5sZW5ndGgpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IHRoaXMubWlncmF0ZShkYXRhKTtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAvLyBUT0RPOiBIYW5kbGUgdGhpcyBjYXNlIHByb3Blcmx5XG4gICAgICAgIGF3YWl0IHRoaXMucmV2ZXJ0KGVycm9yLCBkYXRhKTtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9XG4gICAgfVxuICB9XG59Il19