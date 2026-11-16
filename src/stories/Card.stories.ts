import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
    title: 'ONYKS WebUI/Card',
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
            description: 'The card title.',
            control: { type: 'text' },
            table: {category: 'properties'}
        },
        size: 
        {
            description: 'The overall size of the card.',
            control: { type: 'select' },
            options: ['s', 'm', 'l', 'xl'],
            table: { category: 'properties' }
        },
        'title-size': 
        {
            description: 'The size of the card title.',
            control: { type: 'select' },
            options: ['s', 'm', 'l', 'xl'],
            table: { category: 'properties' }
        },
        padding: 
        {
            description: 'The amount of inner spacing around the card content.',
            control: { type: 'select' },
            options: ['s', 'm', 'l', 'xl'],
            table: { category: 'properties' }
        },
        gap: 
        {
            description: 'The spacing between the card title and its content.',
            control: { type: 'select' },
            options: ['s', 'm', 'l', 'xl'],
            table: { category: 'properties' }
        },
        animated: 
        {
            description: 'Whether to animate the card.',
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