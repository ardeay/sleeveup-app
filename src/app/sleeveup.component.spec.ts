import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { SleeveupAppComponent } from '../app/sleeveup.component';

beforeEachProviders(() => [SleeveupAppComponent]);

describe('App: Sleeveup', () => {
  it('should create the app',
      inject([SleeveupAppComponent], (app: SleeveupAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'sleeveup works!\'',
      inject([SleeveupAppComponent], (app: SleeveupAppComponent) => {
    expect(app.title).toEqual('sleeveup works!');
  }));
});
