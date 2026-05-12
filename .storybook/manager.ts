import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

addons.setConfig({
  theme: create({
    base: 'light',

    brandTitle: 'ONYKS WebUI', 
    brandUrl: 'https://github.com/knonyks/onyks-web-ui',
    
    brandImage: './logo.png', 
    brandTarget: '_self',
  }),
});