import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = 
{
    title: 'ONYKS WebUI/Navigation',
    component: 'onyks-nav',
    tags: ['autodocs'],
    argTypes: 
    {
        size: 
        {
            control: { type: 'select' },
            options: ['s', 'm', 'l', 'xl'],
            table: 
            {
                category: 'parameters'
            }
        },
        "mobile-breakpoint": 
        {
            control: { type: 'number' },
            table: 
            {
                category: 'parameters'
            }
        },
        "max-view-items": 
        {
            control: { type: 'number' },
            table: 
            {
                category: 'parameters'
            }
        }
    },
    render: (_args) => html`
    <div style="height: 500px;">
        <onyks-nav size=${_args.size} mobile-breakpoint=${_args['mobile-breakpoint']} max-view-items=${_args['max-view-items']} style="position: relative;">
            <onyks-logo style="height: 60px; padding: var(--spacing-md); box-sizing: border-box; position: absolute; left: 0;"></onyks-logo>
            <a href="https://google.com" slot="nav">Element No. 1</a>
            <div slot="nav">Element No. 2</div>
            <div slot="nav">Element No. 3</div>
            <div slot="nav">Element No. 4</div>
            <div slot="nav">Element No. 5</div>
            <div slot="nav">Element No. 6</div>
            <div slot="nav">Element No. 7</div>
            <div slot="nav">Element No. 8</div>
            <div slot="nav">Element No. 9</div>
            <a href="https://google.com" slot="nav">Element No. 1</a>
            <div slot="nav">Element No. 2</div>
            <div slot="nav">Element No. 3</div>
            <div slot="nav">Element No. 4</div>
            <div slot="nav">Element No. 5</div>
            <div slot="nav">Element No. 6</div>
            <div slot="nav">Element No. 7</div>
            <div slot="nav">Element No. 8</div>
            <div slot="nav">Element No. 9</div>
        </onyks-nav>
    </div>`,
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
                    <onyks-avatar size="${args.size}" src="${args.src}" shape="${args.shape}"></onyks-avatar>
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
    size: 'm',
    'mobile-breakpoint': 900,
    'max-view-items': 3
  }
};