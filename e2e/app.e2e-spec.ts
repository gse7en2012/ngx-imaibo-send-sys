import { NgxImaiboSendSysPage } from './app.po';

describe('ngx-imaibo-send-sys App', () => {
  let page: NgxImaiboSendSysPage;

  beforeEach(() => {
    page = new NgxImaiboSendSysPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
