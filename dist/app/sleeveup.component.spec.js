"use strict";
var testing_1 = require('@angular/core/testing');
var sleeveup_component_1 = require('../app/sleeveup.component');
testing_1.beforeEachProviders(function () { return [sleeveup_component_1.SleeveupAppComponent]; });
testing_1.describe('App: Sleeveup', function () {
    testing_1.it('should create the app', testing_1.inject([sleeveup_component_1.SleeveupAppComponent], function (app) {
        testing_1.expect(app).toBeTruthy();
    }));
    testing_1.it('should have as title \'sleeveup works!\'', testing_1.inject([sleeveup_component_1.SleeveupAppComponent], function (app) {
        testing_1.expect(app.title).toEqual('sleeveup works!');
    }));
});
//# sourceMappingURL=sleeveup.component.spec.js.map