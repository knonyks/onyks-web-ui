import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { background } from 'storybook/theming';

const meta: Meta = 
{
    title: 'ONYKS WebUI/Button',
    component: 'onyks-button',
    tags: ['autodocs'],
    
    render: (args) => html`<onyks-button
    size=${args.size}
    background=${args.background}
    href=${args.href}
    ?disabled=${args.disabled}
    type=${args.type}
    >
    ${args.text}</onyks-alert>`,

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
        background: 
        {
            control: 
            { 
                type: 'select' 
            },
            options: ['red', 'green', 'blue', 'yellow'],
            table: 
            {
                category: 'parameters'
            }
        },
        type: 
        {
            control: 
            { 
                type: 'select' 
            },
            options: ['button', 'submit', 'reset'],
            table: 
            {
                category: 'parameters'
            }
        },
        href: 
        {
            control: 
            { 
                type: 'text' 
            },
            table: 
            {
                category: 'parameters'
            }
        },
        disabled: 
        {
            control: 
            { 
                type: 'boolean' 
            },
            table: 
            {
                category: 'parameters'
            }
        },
        text: 
        {
            control: { type: 'text' }
        },
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
            return `<onyks-button size="${args.size}" type="${args.type}" background="${args.background}" href="${args.href}"${args.disabled? ' disabled': ''}>${args.text}</onyks-alert>`;
          }
        },
      }
    },
};

export default meta;
type Story = StoryObj;

export const Info: Story = {
  args: {
    type: 'button',
    size: 'm',
    text: "Click me!",
    background: 'yellow',
    href: 'https://google.com',
    disabled: false
  }
};