import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = 
{
    title: 'ONYKS WebUI/Checkbox',
    component: 'onyks-checkbox',
    tags: ['autodocs'],
    render: (args) => html`
        

        <onyks-checkbox 
            ?checked=${args.checked}
            size=${args.size}
            @change=${console.log}
        >
            ${args.label} </onyks-checkbox>
    `,

    argTypes: 
    {
        checked: 
        {
            control: { type: 'boolean' },
            table: { category: 'parameter' }
        },
        size:
        {
            control: { type: 'select' },
            options: ['s', 'm', 'l', 'xl'],
            table: { category: 'parameter' }
        },
        label: 
        {
            control: { type: 'text' },
            table: { category: 'parameter' }
        },
        "change":
        {
            action: 'change',
            description: 'Emitted when the checkbox was changed.',
            table: 
            {
                category: 'events',
                type: { summary: '{ checked: true/false }' },
            }
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
                    return `
                    <script>
                        let checkbox = document.querySelector('onyks-checkbox')
                        checkbox.addEventListener('change', console.log)
                    </script>
                    
                    <onyks-checkbox size="${args.size}"${args.checked ? ' checked' : ''}>${args.label}</onyks-checkbox>`;
                }
            },
        }
    },
};

export default meta;
type Story = StoryObj;

export const Base: Story = 
{
    args: 
    {
        checked: false,
        size: 'm',
        label: 'Checkbox Label'
    }
};