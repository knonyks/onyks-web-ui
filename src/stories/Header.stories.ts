import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = 
{
    title: 'ONYKS WebUI/Header',
    component: 'onyks-header',
    tags: ['autodocs'],
    
    render: (args) => html`
    <div style="background-color: var(--onyks-surface);">
    <onyks-header level="${args.level}">${args.text}</onyks-header>
    </div>`,
    argTypes: 
    {
      level: 
      {
        control: 
        { 
          type: 'select' 
        },
        options: [1, 2, 3, 4, 5, 6],
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
        },
        table: 
        {
          category: 'slot'
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
            return `<onyks-header level="${args.level}">${args.text}</onyks-header>`;
          }
        },
      }
    },
};

export default meta;
type Story = StoryObj;

export const Base: Story = {
  args: {
    level: 1,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam \
    hendrerit a orci sit amet molestie. Suspendisse mollis ullamcorper mauris."
  }
};
