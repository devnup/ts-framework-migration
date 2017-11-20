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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZURhdGFiYXNlTWlncmF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL21pZ3JhdGlvbi9CYXNlRGF0YWJhc2VNaWdyYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUVBO0lBQ0UsWUFBbUIsSUFBWSxFQUFTLFVBQWUsRUFBRTtRQUF0QyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVMsWUFBTyxHQUFQLE9BQU8sQ0FBVTtJQUV6RCxDQUFDO0lBMEJEOzs7O09BSUc7SUFDVSxHQUFHOztZQUNkLElBQUksSUFBYyxDQUFDO1lBRW5CLElBQUksQ0FBQztnQkFDSCxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDMUIsQ0FBQztZQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsdUNBQXVDO2dCQUN2QyxNQUFNLEtBQUssQ0FBQztZQUNkLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLElBQUksQ0FBQztvQkFDSCxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ2QsQ0FBQztnQkFBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNmLGtDQUFrQztvQkFDbEMsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDL0IsTUFBTSxLQUFLLENBQUM7Z0JBQ2QsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO0tBQUE7Q0FDRjtBQXZERCx3Q0F1REMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEYXRhYmFzZSB9IGZyb20gJ3RzLWZyYW1ld29yayc7XG5cbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIEJhc2VEYXRhYmFzZU1pZ3JhdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBTdHJpbmcsIHB1YmxpYyBvcHRpb25zOiBhbnkgPSB7fSkge1xuXG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgZGV0ZXJtaW5lcyB3aGV0aGVyIHRoaXMgc2NyaXB0IGhhcyBhbnkgd29yayB0byBiZSBkb25lLlxuICAgKi9cbiAgcHVibGljIGFic3RyYWN0IGFzeW5jIGhhc1dvcmsoKTogUHJvbWlzZTxib29sZWFuPjtcblxuICAvKipcbiAgICogTWFwcyB0aGUgdGhlIGRvY3VtZW50cyB0aGF0IHNob3VsZCBiZSBtaWdyYXRlZCwgd2lsbCBvbmx5IGJlIGNhbGxlZCBpcyBgYGBoYXNXb3JrKClgYGAgaGF2ZSByZXR1cm5lZCBgYGB0cnVlYGBgLlxuICAgKi9cbiAgcHVibGljIGFic3RyYWN0IGFzeW5jIG1hcCgpOiBQcm9taXNlPGFueVtdPjtcblxuICAvKipcbiAgICogSGFuZGxlcyB0aGUgbWlncmF0aW9ucyBvZiB0aGUgbWFwcGVkIGRvY3VtZW50cy5cbiAgICogXG4gICAqIEBwYXJhbSBkYXRhIFRoZSBkYXRhIG1hcHBlZCBieSB0aGUgbWlncmF0aW9uIHN0ZXBcbiAgICovXG4gIHB1YmxpYyBhYnN0cmFjdCBhc3luYyBtaWdyYXRlKGRhdGE6IGFueVtdKTogUHJvbWlzZTx2b2lkPjtcblxuICAvKipcbiAgICogSGFuZGxlcyB0aGUgbWlncmF0aW9ucyBvZiB0aGUgbWFwcGVkIGRvY3VtZW50cy5cbiAgICogXG4gICAqIEBwYXJhbSBkYXRhIFRoZSBkYXRhIG1hcHBlZCBieSB0aGUgbWlncmF0aW9uIHN0ZXBcbiAgICovXG4gIHB1YmxpYyBhYnN0cmFjdCBhc3luYyByZXZlcnQoZXJyb3I6IEVycm9yLCBkYXRhOiBhbnlbXSk6IFByb21pc2U8dm9pZD47XG5cbiAgLyoqXG4gICAqIFJ1bnMgdGhlIG1pZ3JhdGlvbiBzdGVwIHNhZmVseSwgcmV2ZXJ0aW5nIHRoZSBjaGFuZ2VzIGluIHRoZSBjYXNlIG9mIGVycm9ycy5cbiAgICogXG4gICAqIEByZXR1cm5zIExpc3Qgb2YgaWRzIG9mIHRoZSBkb2N1bWVudHMgbWlncmF0ZWQuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgcnVuKCk6IFByb21pc2U8YW55W10+IHtcbiAgICBsZXQgZGF0YTogc3RyaW5nW107XG5cbiAgICB0cnkge1xuICAgICAgZGF0YSA9IGF3YWl0IHRoaXMubWFwKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIC8vIFRPRE86IEhhbmRsZSBtYXBwaW5nIGVycm9ycyBwcm9wZXJseVxuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuXG4gICAgaWYgKGRhdGEgJiYgZGF0YS5sZW5ndGgpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IHRoaXMubWlncmF0ZShkYXRhKTtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAvLyBUT0RPOiBIYW5kbGUgdGhpcyBjYXNlIHByb3Blcmx5XG4gICAgICAgIGF3YWl0IHRoaXMucmV2ZXJ0KGVycm9yLCBkYXRhKTtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9XG4gICAgfVxuICB9XG59Il19