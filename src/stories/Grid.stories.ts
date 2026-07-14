import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
    title: 'ONYKS WebUI/Grid',
    component: 'onyks-grid',
    tags: ['autodocs'],
    render: (args) => html`
        <onyks-grid 
            cols=${args.cols} 
            gap=${args.gap} 
            mobile-breakpoint=${args.mobileBreakpoint}
        >
            <onyks-card title="Background Card">1x1</onyks-card>
            
            <onyks-card 
                title="Main Card" 
                span=${args.cardSpan} 
                rows=${args.cardRows}
                size=${args.cardTitleSize}
            >
                Change the parameters in the Controls panel below to see the dynamic grid adjustment and header sizes (size).
            </onyks-card>

            <onyks-card title="Background Card">1x1</onyks-card>
            <onyks-card title="Background Card">1x1</onyks-card>
            <onyks-card title="Background Card">1x1</onyks-card>
            <onyks-card title="Background Card">1x1</onyks-card>
        </onyks-grid>
    `,

    argTypes: {
        cols: {
            control: { type: 'number', min: 0, max: 12 },
            description: 'Amount of columns (0 = auto-fit z CSS)',
            table: { category: 'Grid Properties' }
        },
        gap: {
            control: { type: 'select' },
            options: ['s', 'm', 'l', 'xl'],
            description: 'Amount of space between grid items',
            table: { category: 'Grid Properties' }
        },
        mobileBreakpoint: {
            control: { type: 'number' },
            description: 'Screen width (in pixels), at which the grid switches to a single-column mode',
            table: { category: 'Grid Properties' }
        },

        cardSpan: {
            control: { type: 'number', min: 1, max: 12 },
            description: 'Width of the main card expressed in number of columns',
            name: 'Card: Span',
            table: { category: 'Card Properties' }
        },
        cardRows: {
            control: { type: 'number', min: 1, max: 12 },
            description: 'Height of the main card expressed in number of grid rows',
            name: 'Card: Rows',
            table: { category: 'Card Properties' }
        },
        cardTitleSize: {
            control: { type: 'select' },
            options: ['s', 'm', 'l', 'xl'],
            description: 'Size of the red header inside the card',
            name: 'Card: Size (Title)',
            table: { category: 'Card Properties' }
        }
    },
    
    parameters: {
      docs: {
        source: {
          transform: (_originalCode: string, storyContext: any) => {
            const { args } = storyContext;
            return `
            <onyks-grid cols="${args.cols}" gap="${args.gap}" mobile-breakpoint="${args.mobileBreakpoint}">
                <onyks-card title="Background Card">...</onyks-card>
                <onyks-card title="Main Card" span="${args.cardSpan}" rows="${args.cardRows}" size="${args.cardTitleSize}">
                    Something ...
                </onyks-card>
                <onyks-card title="Background Card">...</onyks-card>
            </onyks-grid>`;
          }
        },
      }
    },
};

export default meta;
type Story = StoryObj;

export const Interactive_Grid: Story = {
    args: {
        cols: 3,
        gap: 'm',
        mobileBreakpoint: 900,
        cardSpan: 2,
        cardRows: 2,
        cardTitleSize: 'm'
    }
};

export const AutoFit: Story = {
    args: {
        cols: 0,
        gap: 'm',
        mobileBreakpoint: 900,
        cardSpan: 1,
        cardRows: 1,
        cardTitleSize: 'm'
    }
};