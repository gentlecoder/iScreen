import { IScreenPage } from './app.po';

describe('i-screen App', () => {
  let page: IScreenPage;

  beforeEach(() => {
    page = new IScreenPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
