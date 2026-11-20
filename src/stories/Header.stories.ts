import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { OnyksSchemas } from '../utils/styles';

const meta: Meta = 
{
    title: 'ONYKS WebUI/Header',
    component: 'onyks-header',
    tags: ['autodocs'],
    
    render: (args) => html`
    <div style="background-color: var(--onyks-surface); padding: 1rem;">
      <onyks-header size="${args.size}" color="${args.color}" ?underline=${args.underline}>${args.text}</onyks-header>
    </div>`,
    argTypes: 
    {
      size: 
      {
        description: 'Sets the size of the header.',
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
        description: 'Text displayed inside the header.',
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
        description: 'Sets the color of the header.',
        control:
        {
            type: 'select',

        },
        options: OnyksSchemas.color,
        table: 
        {
          category: 'properties'
        }
      },
      underline:
      {
        description: 'Adds an underline to the header.',
        control:
        {
          type: 'boolean'
        },
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
            return `<onyks-header size="${args.size}" color="${args.color}">${args.text}</onyks-header>`;
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
    hendrerit a orci sit amet molestie. Suspendisse mollis ullamcorper mauris.",
    color: 'none',
    underline: false
  }
};
