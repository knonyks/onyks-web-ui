import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
    title: 'ONYKS WebUI/Checkbox',
    component: 'onyks-checkbox',
    tags: ['autodocs'],
    render: (args) => html`
        <onyks-checkbox 
            ?checked=${args.checked}
            size=${args.size}
        >
            ${args.label} </onyks-checkbox>
    `,

    argTypes: {
        checked: {
            control: { type: 'boolean' },
            description: 'Whether the checkbox is checked',
            table: { category: 'Checkbox Properties' }
        },
        size: {
            control: { type: 'select' },
            options: ['s', 'm', 'l', 'xl'],
            description: 'Size of the checkbox',
            table: { category: 'Checkbox Properties' }
        },
        label: {
            control: { type: 'text' },
            description: 'Label for the checkbox',
            table: { category: 'Checkbox Properties' }
        }
    },

    parameters: {
      docs: {
        source: {
          transform: (_originalCode: string, storyContext: any) => {
            const { args } = storyContext;
            return `
            <onyks-checkbox size="${args.size}"${args.checked ? ' checked' : ''}>
                ${args.label}
            </onyks-checkbox>`;
          }
        },
      }
    },
};

export default meta;
type Story = StoryObj;

export const Checkbox: Story = {
    args: {
        checked: false,
        size: 'm',
        label: 'Checkbox Label'
    }
};