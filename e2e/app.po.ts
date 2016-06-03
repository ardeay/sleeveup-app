export class SleeveupPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('sleeveup-app h1')).getText();
  }
}
