import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = 
{
    title: 'ONYKS WebUI/Checkbox',
    component: 'onyks-checkbox',
    tags: ['autodocs'],
    render: (args) => html`
        <onyks-container align=center justify=center type=group style="background: var(--onyks-surface-1);" padding=m gap=s>
            <onyks-checkbox ?checked=${args.checked} size=${args.size} @change=${console.log}>${args.label}</onyks-checkbox>
            <onyks-text size=${args.size}>Checkbox!</onyks-text>
        </onyks-container>
    `,

    argTypes: 
    {
        checked: 
        {
            control: { type: 'boolean' },
            description: 'Whether the checkbox is checked.',
            table: 
            {
                category: 'properties',
                type: { summary: 'boolean' }
            }
        },
        size:
        {
            control: { type: 'select' },
            options: ['s', 'm', 'l', 'xl'],
            description: 'Defines the size of the checkbox.',
            table: 
            {
                category: 'properties',
                type: { summary: '"s" | "m" | "l" | "xl"' }
            }
        },
        "change":
        {
            action: 'change',
            description: 'Emitted when the checkbox value changes.',
            table: 
            {
                category: 'events',
                type: { summary: '{ checked: boolean }' },
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
                    
                    <onyks-container align="center" justify="center" type="group" style="background: var(--onyks-surface-1);" padding="m" gap="s">
                        <onyks-checkbox size="${args.size}"${args.checked ? ' checked' : ''}>${args.label}</onyks-checkbox>
                        <onyks-text size="${args.size}">Checkbox!</onyks-text>
                    </onyks-container>`;
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
        size: 'm'
    }
};