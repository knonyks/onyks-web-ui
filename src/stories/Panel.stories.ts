import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

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
            options: ['left', 'right', 'top', 'bottom'],
            table: 
            {
                category: 'parameters'
            }
        },
        'all-round':
        {
            control: {type: 'boolean'},
            table: 
            {
                category: 'parameters'
            }
        }
    },
    render: (args) => html`<onyks-panel side=${args.side} ?all-round=${args['all-round']}>Example content</onyks-panel>`,
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
                    <onyks-panel side=${args.side}${args['all-round']? ' all-round':''}>Example content</onyks-panel>
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
        side: 'bottom',
        'all-round': true,
    }
};

export const MoreComplicatedExample: Story = 
{
    args: 
    {
        side: 'bottom',
        'all-round': true,
    },
    render: (args) => html`
    <style>
        #x
        {
            height: fit-content;
            width: 400px;
            text-align: justify;
            display: flex;
            flex-direction: column;
            gap: var(--spacing-md);
            padding: var(--spacing-lg);
        }
    </style>
    <onyks-panel side=${args.side} ?all-round=${args['all-round']} id="x">
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam felis velit, 
            venenatis a nulla vitae, varius finibus metus. Etiam nec enim id eros feugiat 
            finibus nec in elit. Aliquam placerat, justo nec accumsan venenatis, urna enim 
            laoreet augue, ac accumsan leo nibh ut urna. Nulla quis magna vel nisi tempor 
            posuere luctus cursus orci. Etiam egestas sem ex, sit amet suscipit sem finibus sed. 
            Maecenas aliquet nisi vitae augue lacinia, ut convallis nulla luctus. Sed varius id metus 
            id convallis. Proin dictum lorem quis tristique viverra. Quisque tristique congue lectus 
            luctus efficitur. Nam vitae arcu mauris. Aliquam erat volutpat. Donec in placerat purus. 
            Curabitur porttitor accumsan laoreet.
        </p>
        <p>
            Sed volutpat posuere tortor ac porttitor. Donec at justo at ligula 
            ultrices commodo id ut justo. In porttitor convallis eros. In id 
            consequat dolor. Phasellus scelerisque vel diam vitae pretium. 
            Suspendisse congue mauris quis sagittis feugiat. Pellentesque id leo ornare, 
            efficitur diam sit amet, consectetur magna. Pellentesque id magna malesuada, 
            vestibulum mi ut, elementum quam. 
        </p>
    </onyks-panel>`,
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
                    <style>
                        onyks-panel
                        {
                            height: fit-content;
                            width: 400px;
                            text-align: justify;
                            display: flex;
                            flex-direction: column;
                            gap: var(--spacing-md);
                            padding: var(--spacing-lg);
                        }
                    </style>

                    <onyks-panel side=${args.side}${args['all-round']? ' all-round':''}>Example content</onyks-panel>
                    `;
                }
            },
        }
    }
};