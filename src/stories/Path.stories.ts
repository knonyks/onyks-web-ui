import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { fn } from 'storybook/test';

const meta: Meta = 
{
    title: 'ONYKS WebUI/Path',
    component: 'onyks-path',
    tags: ['autodocs'],
    render: (args) => html`
        <onyks-path .content=${args.content} size="${args.size}" ?disabled=${args.disabled}
            @path-change=${console.log}
        ></onyks-path>
    `,
    argTypes: 
    {
        content:
        {
            description: 'An array of strings representing the path segments.',
            table: 
            {
                category: 'property'
            }
        },
        size: 
        {
            description: 'The size of the path component.',
            control: { type: 'select' },
            options: ['s', 'm', 'l', 'xl'],
            table: 
            {
                category: 'property'
            }
        },
        disabled: 
        {
            description: 'Disables interactions with the path component.',
            control: { type: 'boolean' },
            table: 
            {
                category: 'property'
            }
        },
        "path-change":
        {
            description: 'Emitted when the selected path changes. The event detail contains the updated path array.',
            action: 'path-change',
            table: 
            {
                category: 'events',
                type: { summary: '{ path: string[] }' },
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
                    return `
                    <script>
                        const path = document.querySelector('onyks-path');
                        path.content = ${JSON.stringify(args.content)};
                        path.addEventListener('path-change', console.log);
                    </script>


                    <onyks-path size="${args.size}"${args.disabled ? ' disabled' : ''}></onyks-path>`;
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
        content: ['home', 'user', 'Music', 'Zenek Martyniuk'],
        size: 'm',
        disabled: false,
        "path-change": fn(),
    },
}