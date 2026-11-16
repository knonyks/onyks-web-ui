import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { OnyksSchemas } from '../utils/styles';

const meta: Meta = 
{
    title: 'ONYKS WebUI/Panel',
    component: 'onyks-panel',
    tags: ['autodocs'],
    argTypes: 
    {
        side: 
        {
            control: { type: 'select' },
            options: OnyksSchemas.side,
            table: 
            {
                category: 'parameters'
            }
        },
        radius:
        {   
            control: { type: 'select' },
            options: OnyksSchemas.radius,
            table:
            {
                category: 'parameters'
            }
        },
        padding:
        {
            control: { type: 'select' },
            options: OnyksSchemas.padding,
            table:
            {
                category: 'parameters'
            }
        }
    },
    render: (args) => html`<onyks-panel side=${args.side} radius=${args['radius']} padding=${args.padding}>Example content</onyks-panel>`,
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
                    <onyks-panel side="${args.side}" radius="${args['radius']}" padding="${args.padding}">Example content</onyks-panel>
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
        side: 'left',
        'radius': 'm',
        padding: 'm',
    }
};

export const MoreComplicatedExample: Story = 
{
    args: 
    {
        side: 'left',
        'radius': 'm',
        padding: 's',
        icon: ['F7CD', 'F62A', 'F7B4', 'F62A', 'F7CD'],
    },
    render: (args) => html`
    <onyks-panel side=${args.side} radius=${args['radius']} padding=${args.padding}>
        <onyks-container gap=s>
            <onyks-strip-menu-option size=m icon=${args.icon[0]}></onyks-strip-menu-option>
            <onyks-strip-menu-option size=m icon=${args.icon[1]}></onyks-strip-menu-option>
            <onyks-strip-menu-option size=m icon=${args.icon[2]}></onyks-strip-menu-option>
            <onyks-strip-menu-option size=m icon=${args.icon[3]}></onyks-strip-menu-option>
            <onyks-strip-menu-option size=m icon=${args.icon[4]}></onyks-strip-menu-option>
        </onyks-container>
    </onyks-panel>`,
//     parameters:
//     {
//         docs:
//         {
//             source:
//             {
//                 transform: (_originalCode: string, storyContext: any) => 
//                 {
//                     const { args } = storyContext;
//                     return `
//                     <style>
//                         onyks-panel
//                         {
//                             height: fit-content;
//                             width: 400px;
//                             text-align: justify;
//                             display: flex;
//                             flex-direction: column;
//                             gap: var(--onyks-spacing-md);
//                             padding: var(--onyks-spacing-lg);
//                         }

//                         onyks-panel *
//                         {
//                             margin: 0;
//                             padding: 0;
//                         }
//                     </style>

//                     <onyks-panel side=${args.side} radius=${args['radius']} padding=${args.padding}${args['all-round']? ' all-round':''}>Example content</onyks-panel>
//                     `;
//                 }
//             },
//         }
//     }
};