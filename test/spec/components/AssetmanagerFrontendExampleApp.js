'use strict';

describe('Main', function () {
  var AssetmanagerFrontendExampleApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    AssetmanagerFrontendExampleApp = require('../../../src/scripts/components/AssetmanagerFrontendExampleApp.jsx');
    component = AssetmanagerFrontendExampleApp();
  });

  it('should create a new instance of AssetmanagerFrontendExampleApp', function () {
    expect(component).toBeDefined();
  });
});
