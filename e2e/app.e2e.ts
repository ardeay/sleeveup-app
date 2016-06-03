import { SleeveupPage } from './app.po';

describe('sleeveup App', function() {
  let page: SleeveupPage;

  beforeEach(() => {
    page = new SleeveupPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('sleeveup works!');
  });
});
