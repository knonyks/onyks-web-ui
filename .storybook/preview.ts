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
};

export default preview;