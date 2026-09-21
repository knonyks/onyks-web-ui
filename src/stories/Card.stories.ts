import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
    title: 'ONYKS WebUI/Card',
    component: 'onyks-card',
    tags: ['autodocs'],
    render: (args) => html`
        <onyks-container gap="m" type="grid" mobile-breakpoint="${args['mobile-breakpoint']}" cols="5" rows="5">
            <onyks-card size="${args.size}" title="${args.title}" cols="${args.cols}" rows="${args.rows}">Some content</onyks-card>
            <onyks-card title="Card 2">Some content</onyks-card>
            <onyks-card title="Card 3">Some content</onyks-card>
            <onyks-card title="Card 4">Some content</onyks-card>
            <onyks-card title="Card 5">Some content</onyks-card>
            <onyks-card title="Card 6">Some content</onyks-card>
            <onyks-card title="Card 7">Some content</onyks-card>
            <onyks-card title="Card 8">Some content</onyks-card>
            <onyks-card title="Card 9">Some content</onyks-card>
            <onyks-card title="Card 10">Some content</onyks-card>
        </onyks-container>
    `,

    argTypes: 
    {
        cols: 
        {
            control: { type: 'number', min: 0, max: 12 }
        },
        'mobile-breakpoint': 
        {
            control: { type: 'number'}
        },
        title:
        {
            control: { type: 'text' },
            table: {category: 'parameters'}
        },
        rows:
        {
            control: { type: 'number', min: 0, max: 12 },
        },
        size: 
        {
            control: { type: 'select' },
            options: ['s', 'm', 'l', 'xl'],
            table: { category: 'parameters' }
        }
    },
    
    parameters: {
      docs: {
        source: {
          transform: (_originalCode: string, storyContext: any) => {
            const { args } = storyContext;
            return `
                <onyks-container gap="m" type="grid" mobile-breakpoint="${args['mobile-breakpoint']}" cols="5" rows="5">
                    <onyks-card size="${args.size}" title="${args.title}" cols="${args.cols}" rows="${args.rows}">Some content</onyks-card>
                    <onyks-card title="Card 2">Some content</onyks-card>
                    <onyks-card title="Card 3">Some content</onyks-card>
                    <onyks-card title="Card 4">Some content</onyks-card>
                    <onyks-card title="Card 5">Some content</onyks-card>
                    <onyks-card title="Card 6">Some content</onyks-card>
                    <onyks-card title="Card 7">Some content</onyks-card>
                    <onyks-card title="Card 8">Some content</onyks-card>
                    <onyks-card title="Card 9">Some content</onyks-card>
                    <onyks-card title="Card 10">Some content</onyks-card>
                </onyks-container>
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
        cols: 1,
        'mobile-breakpoint': 300,
        title: "Card 1",
        rows: 1,
        size: 'm'
    }
};