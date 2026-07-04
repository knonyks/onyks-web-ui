import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = 
{
    title: 'ONYKS WebUI/Text',
    component: 'onyks-text',
    tags: ['autodocs'],
    
    render: (args) => html`

    <div style="background-color: var(--onyks-surface);">
    <onyks-text size="${args.size}">${args.text}</onyks-text>
    </div>`,

    argTypes: 
    {
      size: 
      {
        control:
        { 
          type: 'select' 
        },
        options: ['s', 'm', 'l', 'xl'],
        table: 
        {
          category: 'parameters'
        }
      },
      text:
      {
        control:
        {
            type: 'text'
        }
      }
    },
    parameters:
    {
      docs: 
      {
        source: 
        {
          transform: (_originalCode: string, storyContext: any) => 
          {
            const { args } = storyContext;
            return `<onyks-text size="${args.size}">${args.text}</onyks-text>`;
          }
        },
      }
    },
};

export default meta;
type Story = StoryObj;

export const Base: Story = {
  args: {
    size: "m",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam \
    hendrerit a orci sit amet molestie. Suspendisse mollis ullamcorper mauris."
  }
};
