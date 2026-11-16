import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { OnyksSchemas } from '../utils/styles';

const meta: Meta = 
{
    title: 'ONYKS WebUI/Text',
    component: 'onyks-text',
    tags: ['autodocs'],
    
    render: (args) => html`

    <div style="background-color: var(--onyks-surface); padding: 1rem;">
      <onyks-text size="${args.size}" color="${args.color}">${args.text}</onyks-text>
    </div>`,

    argTypes: 
    {
      size: 
      {
        description: 'Sets the text size.',
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
        description: 'The text content displayed by the component.',
        control:
        {
            type: 'text'
        },
        table: 
        {
          category: 'slot'
        }
      },
      color:
      {
        description: 'Sets the text color using a theme color token.',
        control:
        {
          type: 'select'
        },
        options: OnyksSchemas.color,
        table: 
        {
          category: 'properties'
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
            return `<onyks-text color="${args.color}" size="${args.size}">${args.text}</onyks-text>`;
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
    hendrerit a orci sit amet molestie. Suspendisse mollis ullamcorper mauris.",
    color: 'none'
  }
};
