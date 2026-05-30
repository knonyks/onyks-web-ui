import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = 
{
    title: 'ONYKS WebUI/Logo',
    component: 'onyks-logo',
    tags: ['autodocs'],
    parameters: 
    {
        docs: 
        {
            description: 
            {
                story: 'Element of ONYKS Logo is usefull only for the members of ONYKS Student Scientific Club. There is recommendation to change only one of height or width. The element adjust automatically the other parameter with the right aspect ratio for the chosen parameter; for example: if we change width, height changes automatically - it also works in the revert relation.',
            },
        },
    },
    argTypes: 
    {
        invert: 
        {
            control: { type: 'boolean' },
            defaultValue: false,
        },
        widthFitContent: 
        { 
            name: 'Default width behaviour',
            control: 'boolean',
        },
        heightFitContent: 
        { 
            name: 'Default height behaviour',
            control: 'boolean',
        },
        width: 
        {
            type: 'number',
            control: { type: 'range', min: 50, max: 500, step: 10 },
            if: { arg: 'widthFitContent', truthy: false } 
        },
        height: 
        {
            type: 'number',
            control: { type: 'range', min: 50, max: 500, step: 10 },
            if: { arg: 'heightFitContent', truthy: false } 
        },
  },
};

export default meta;
type Story = StoryObj;

export const Base: Story = 
{
    args: 
    {
        invert: false,
        width: 200,
        height: 200,
        widthFitContent: false,
        heightFitContent: true
    },
    render: (args) => html`
        <onyks-logo ?invert=${args.invert} style="width: ${args.widthFitContent ? 'fit-content' : `${args.width}px`}; 
        height: ${args.heightFitContent ? 'fit-content' : `${args.height}px`};">
        </onyks-logo>
    `,
};