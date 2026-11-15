import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
    title: 'ONYKS WebUI/Ready to use/Card',
    component: 'onyks-card',
    tags: ['autodocs'],
    render: (args) => html`
        <onyks-card
            size="${args.size}"
            title="${args.title}"
            title-size="${args['title-size']}"
            padding="${args.padding}"
            gap="${args.gap}"
            ?animated="${args.animated}">
            Some content
        </onyks-card>`,
    argTypes: 
    {
        title:
        {
            control: { type: 'text' },
            table: {category: 'properties'}
        },
        size: 
        {
            control: { type: 'select' },
            options: ['s', 'm', 'l', 'xl'],
            table: { category: 'properties' }
        },
        'title-size': 
        {
            control: { type: 'select' },
            options: ['s', 'm', 'l', 'xl'],
            table: { category: 'properties' }
        },
        padding: 
        {
            control: { type: 'select' },
            options: ['s', 'm', 'l', 'xl'],
            table: { category: 'properties' }
        },
        gap: 
        {
            control: { type: 'select' },
            options: ['s', 'm', 'l', 'xl'],
            table: { category: 'properties' }
        },
        animated: 
        {
            control: { type: 'boolean' },
            table: { category: 'properties' }
        }
    },
    
    parameters: {
      docs: {
        source: {
          transform: (_originalCode: string, storyContext: any) => {
            const { args } = storyContext;
            const animated = args.animated ? ' animated' : '';
            return `
                <onyks-card
                    size="${args.size}"
                    title="${args.title}"
                    title-size="${args['title-size']}"
                    padding="${args.padding}"
                    gap="${args.gap}"
                    ${animated}>Some content</onyks-card>
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
        title: 'Card',
        size: 'm',
        'title-size': 'm',
        padding: 'm',
        gap: 'm',
        animated: false
    }
};