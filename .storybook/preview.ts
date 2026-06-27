import type { Preview } from '@storybook/web-components-vite'
import '../src/index.ts'


const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order:[
        'Introduction',
        'Installation and Usage',
        'Development'
      ],
      }
    },
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo'
    }
  },
  globalTypes: 
  {
    theme: 
    {
      description: 'Global theme for the components',
      defaultValue: 'dark',
      toolbar: 
      {
        title: 'Theme',
        icon: 'paintbrush',
        items: 
        [
          { value: 'dark', title: 'Dark' },
          { value: 'light', title: 'Light' },
          { value: 'green', title: 'Green' },
          { value: 'blue', title: 'Blue' },
        ],
        dynamicTitle: true,
      },
    },
  },

  decorators: 
  [
    (story, context) => 
    {
      const selectedTheme = context.globals.theme;
      const body = document.querySelector('body');

      if (body) 
      {
        body.setAttribute('data-onyks-theme', selectedTheme);
      }

      return story();
    },
  ],
};

export default preview;