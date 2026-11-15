import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { OnyksSchemas } from '../utils/styles';

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
    ?animated=${args.animated}
    type=${args.type}
    icon=${args.icon}
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
                category: 'properties'
            }
        },
        
        background: 
        {
            control: 
            { 
                type: 'select' 
            },
            options: OnyksSchemas.background,
            table: 
            {
                category: 'properties'
            }
        },
        icon: 
        {
            control: 
            { 
                type: 'text'
            },
            table: 
            {
                category: 'properties'
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
                category: 'properties'
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
                category: 'properties'
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
                category: 'properties'
            }
        },
        animated: 
        {
            control: 
            { 
                type: 'boolean' 
            },
            table: 
            {
                category: 'properties'
            }
        },
        text: 
        {
            control: { type: 'text' },
            table: 
            {
                category: 'slot'
            }
        },
    },
    parameters:
    {
      docs: 
      {
        description: 
            {
            story: 'The button element uses Bootstrap Icons. To display an icon, find its CSS code point and pass it to the `icon` parameter. For example, the [0-circle icon](https://icons.getbootstrap.com/icons/0-circle/) has code point `F840`, so set `icon="F840"`.'
            },
        source:
        {
          transform: (_originalCode: string, storyContext: any) => 
          {
            const { args } = storyContext;
            return `<onyks-button size="${args.size}" ${args.icon? 'icon="' + args.icon + '"': ''} type="${args.type}" background="${args.background}" href="${args.href}"${args.disabled? ' disabled': ''}${args.animated? ' animated': ''}>${args.text}</onyks-alert>`;
          }
        },
      }
    },
};

export default meta;
type Story = StoryObj;

export const Base: Story = {
  args: {
    type: 'button',
    size: 'm',
    text: "Click me!",
    background: 'yellow',
    href: 'https://google.com',
    disabled: false,
    animated: true,
    icon: 'F2C0'
  }
};