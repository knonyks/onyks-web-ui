import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
    title: 'ONYKS WebUI/Textfield',
    component: 'onyks-textfield',
    tags: ['autodocs'],
    render: (args) => html`
        <onyks-textfield
            size=${args.size}
            placeholder=${args.placeholder}
            type=${args.type}
            label=${args.label}
            value=${args.value}
            ?disabled=${args.disabled}
            ?error=${args.error}
        ></onyks-textfield>
    `,

    argTypes: {
        size: {
            options: ['s', 'm', 'l', 'xl'],
            control: { type: 'select' },
            description: 'Size of the textfield',
            table: { category: 'Textfield Properties' }
        },
        placeholder: {
            control: { type: 'text' },
            description: 'Placeholder text for the textfield',
            table: { category: 'Textfield Properties' }
        },
        type: {
            options: ['text', 'email', 'password', 'number'],
            control: { type: 'select' },
            description: 'Type of the textfield',
            table: { category: 'Textfield Properties' }
        },
        label: {
            control: { type: 'text' },
            description: 'Label for the textfield',
            table: { category: 'Textfield Properties' }
        },
        value: {
            control: { type: 'text' },
            description: 'Current value of the textfield',
            table: { category: 'Textfield Properties' }
        },
        disabled: {
            control: { type: 'boolean' },
            description: 'Whether the textfield is disabled',
            table: { category: 'Textfield Properties' }
        },
        error: {
            control: { type: 'boolean' },
            description: 'Whether the textfield has an error',
            table: { category: 'Textfield Properties' }
        },
    },
    
    parameters: {
      docs: {
        source: {
          transform: (_originalCode: string, storyContext: any) => {
            const { args } = storyContext;
            return `
            <onyks-textfield size="${args.size}" placeholder="${args.placeholder}" type="${args.type}" label="${args.label}" value="${args.value}" ${args.disabled ? 'disabled' : ''} ${args.error ? 'error' : ''}>
            </onyks-textfield>`;
          }
        },
      }
    },
};

export default meta;
type Story = StoryObj;

export const Textfield_Properties: Story = {
    args: {
        size: 'm',
        placeholder: 'Enter text',
        type: 'text',
        label: 'Textfield Label',
        value: 'Example text',
        disabled: false,
        error: false
    }
};