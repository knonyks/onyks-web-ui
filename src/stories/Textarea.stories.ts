import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
    title: 'ONYKS WebUI/Textarea',
    component: 'onyks-textarea',
    tags: ['autodocs'],
    render: (args) => html`
        <onyks-textarea
            size=${args.size}
            placeholder=${args.placeholder}
            value=${args.value}
            rows=${args.rows || undefined}
            cols=${args.cols || undefined}
            minlength=${args.minlength || undefined}
            maxlength=${args.maxlength || undefined}
            ?disabled=${args.disabled} 
            ?readonly=${args.readonly} 
            ?required=${args.required} 
            ?error=${args.error} 
            resize=${args.resize}
        ></onyks-textarea>
    `,

    argTypes: {
        size: {
            options: ['s', 'm', 'l', 'xl'],
            control: { type: 'select' },
            description: 'Size of the textarea',
            table: { category: 'Textarea Properties' }
        },
        placeholder: {
            control: { type: 'text' },
            description: 'Placeholder text for the textarea',
            table: { category: 'Textarea Properties' }
        },
        value: {
            control: { type: 'text' },
            description: 'Current value of the textarea',
            table: { category: 'Textarea Properties' }
        },
        rows: {
            control: { type: 'number' },
            description: 'Number of visible text lines for the textarea',
            table: { category: 'Textarea Properties' }
        },
        cols: {
            control: { type: 'number' },
            description: 'Number of visible character columns for the textarea',
            table: { category: 'Textarea Properties' }
        },
        minlength: {
            control: { type: 'number' },
            description: 'Minimum number of characters allowed in the textarea',
            table: { category: 'Textarea Properties' }
        },
        maxlength: {
            control: { type: 'number' },
            description: 'Maximum number of characters allowed in the textarea',
            table: { category: 'Textarea Properties' }
        },
        disabled: {
            control: { type: 'boolean' },
            description: 'Whether the textarea is disabled',
            table: { category: 'Textarea Properties' }
        },
        readonly: {
            control: { type: 'boolean' },
            description: 'Whether the textarea is read-only',
            table: { category: 'Textarea Properties' }
        },
        required: {
            control: { type: 'boolean' },
            description: 'Whether the textarea is required',
            table: { category: 'Textarea Properties' }
        },
        resize: {
            options: ['none', 'both', 'horizontal', 'vertical'],
            control: { type: 'select' },
            description: 'Resize behavior of the textarea',
            table: { category: 'Textarea Properties' }
        },
        error: {
            control: { type: 'boolean' },
            description: 'Whether the textarea has an error',
            table: { category: 'Textarea Properties' }
        },
    },
    
    parameters: {
      docs: {
        source: {
          transform: (_originalCode: string, storyContext: any) => {
            const { args } = storyContext;
            return `
            <onyks-textarea 
                size="${args.size}" 
                placeholder="${args.placeholder}" 
                value="${args.value}"
                rows="${args.rows}" 
                cols="${args.cols}" 
                minlength="${args.minlength}" 
                maxlength="${args.maxlength}" 
                resize="${args.resize}"
                ${args.disabled ? 'disabled' : ''} 
                ${args.error ? 'error' : ''} 
                ${args.readonly ? 'readonly' : ''} 
                ${args.required ? 'required' : ''}
            ></onyks-textarea>`;
            }
        },
      }
    },
};

export default meta;
type Story = StoryObj;

export const Textarea_Properties: Story = {
    args: {
        size: 'm',
        placeholder: 'Placeholder',
        value: 'Example text',
        rows: 1,
        cols: 1,
        minlength: 0,
        maxlength: 100,
        disabled: false,
        readonly: false,
        required: false,
        resize: 'both',
        error: false
    }
};