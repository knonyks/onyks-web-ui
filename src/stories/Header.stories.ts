import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = 
{
    title: 'ONYKS WebUI/Stable/Header',
    component: 'onyks-header',
    tags: ['autodocs'],
    
    render: (args) => html`
    <div style="background-color: var(--onyks-surface); padding: 1rem;">
      <onyks-header size="${args.size}">${args.text}</onyks-header>
    </div>`,
    argTypes: 
    {
      size: 
      {
        control: 
        { 
          type: 'select' 
        },
        options: ['s', 'm', 'l', 'xl', '2xl', '3xl', '4xl'],
        table: 
        {
          category: 'properties'
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
            return `<onyks-header size="${args.size}">${args.text}</onyks-header>`;
          }
        },
      }
    },
};

export default meta;
type Story = StoryObj;

export const Base: Story = {
  args: {
    size: 'm',
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam \
    hendrerit a orci sit amet molestie. Suspendisse mollis ullamcorper mauris."
  }
};
