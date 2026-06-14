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
            @path-change=${(e: CustomEvent<{ path: string[] }>) => 
            {
                console.log('Path changed:', e.detail.path);
            }}
        ></onyks-path>
    `,
    argTypes: 
    {
        content:
        {
            table: 
            {
                category: 'parameters'
            }
        },
        size: 
        {
            control: { type: 'select' },
            options: ['s', 'm', 'l', 'xl'],
            table: 
            {
                category: 'parameters'
            }
        },
        disabled: 
        {
            control: { type: 'boolean' },
            table: 
            {
                category: 'parameters'
            }
        },
        "path-change":
        {
            action: 'path-change',
            description: 'Emit when user change the path; click on the folder',
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
                transform: (originalCode: string, storyContext: any) => 
                {
                    const { args } = storyContext;
                    return `
                    <script>
                        const path = document.querySelector('onyks-path');
                        path.content = ${JSON.stringify(args.content)};
                        path.addEventListener('path-change', (event) => 
                        {
                            console.log('Path changed:', event.detail.path);
                        });
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