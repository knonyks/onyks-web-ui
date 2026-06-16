import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = 
{
    title: 'ONYKS WebUI/Avatar',
    component: 'onyks-avatar',
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
        src:
        {
            control: { type: 'select' },
            options: ['😍', '😁', '🥵', '🥶'],
            table: 
            {
                category: 'parameters'
            }
        },
        shape: 
        {
            control: { type: 'select' },
            options: ['circle', 'square'],
            table: 
            {
                category: 'parameters'
            }
        }
    },
    render: (args) => html`<onyks-avatar size=${args.size} src=${args.src} shape=${args.shape}></onyks-avatar>`,
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
    src: '😍',
    shape: 'circle',
    size: 'm'
  }
};