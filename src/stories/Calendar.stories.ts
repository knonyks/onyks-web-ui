import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
    title: 'ONYKS WebUI/Calendar',
    component: 'onyks-calendar',
    tags: ['autodocs'],
    render: (args) => html`
        <onyks-calendar 
        value=${args.value}
        @change=${args.change}
        size=${args.size}
        max=${args.max}
        min=${args.min}></onyks-calendar>
    `,

    argTypes: 
    {
        value:
        {
            control: { type: 'text' },
            description: 'Value of the date',
            table: { category: 'parameters' }
        },
        size:
        {
            control: { type: 'select' },
            options: ['s', 'm', 'l', 'xl'],
            description: 'Predefined sizes for the element',
            table: { category: 'parameters' }
        },
        max:
        {
            control: { type: 'text' },
            description: 'Maximum date value that can be selected',
            table: { category: 'parameters' }
        },
        min:
        {
            control: { type: 'text' },
            description: 'Minimum date value that can be selected',
            table: { category: 'parameters' }
        },
        "change":
        {
            action: 'change',
            description: 'Emit when user change the day; click on the calendar',
            table: 
            { category: 'events' }
        }
    },
    
    parameters: {
      docs: {
        source: {
          transform: (_originalCode: string, storyContext: any) => {
            const { args } = storyContext;
            return `
                <onyks-calendar value="${args.value}" size="${args.size}" min="${args.min}" max="${args.max}"></onyks-calendar>
            `;
          }
        },
      }
    },
};

export default meta;
type Story = StoryObj;

export const Base: Story = {
    args: {
        value: "2018-07-22",
        size: 'l',
        min: '',
        max: '',
    }
};