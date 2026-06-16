import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = 
{
    title: 'ONYKS WebUI/Window Bar & Buttons',
    component: 'onyks-window-bar',
    tags: ['autodocs'],
    argTypes: 
    {
        text: 
        {
            control: { type: 'text' },
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
    },
    render: (args) => html`
        <onyks-window-bar text=${args.text} size=${args.size}>
            <onyks-window-bar-button type="minimize" size=${args.size}></onyks-window-bar-button>
            <onyks-window-bar-button type="fullscreen" size=${args.size}></onyks-window-bar-button>
            <onyks-window-bar-button type="close" size=${args.size}></onyks-window-bar-button>
        </onyks-window-bar>`,
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
                    dasd
                    `;
                }
            },
        }
    }
};

export default meta;
type Story = StoryObj;

export const Base: Story = 
{
    args: 
    {
        text: 'A title of the window!',
        size: 's'
    }
};