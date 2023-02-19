//workaround for download links issue: https://github.com/cypress-io/cypress/issues/14857#issuecomment-1328945376
export function prepareToDownload() {
  cy.window().then(win => {
    const triggerAutIframeLoad = () => {
      const AUT_IFRAME_SELECTOR = '.aut-iframe';
      const autIframe = win.parent.document.querySelector(AUT_IFRAME_SELECTOR);
      autIframe.dispatchEvent(new Event('load'));
      win.removeEventListener('beforeunload', triggerAutIframeLoad);
    };
    win.addEventListener('beforeunload', triggerAutIframeLoad);
  });
}