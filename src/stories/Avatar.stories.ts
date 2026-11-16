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
            description: 'Sets the size of the avatar.',
            control: { type: 'select' },
            options: ['s', 'm', 'l', 'xl'],
            table: 
            {
                category: 'properties'
            }
        },
        src:
        {
            description: 'Sets the image or emoji displayed in the avatar.',
            control: { type: 'select' },
            options: ['😍', '😁', '🥵', '🥶'],
            table: 
            {
                category: 'properties'
            }
        },
        shape: 
        {
            description: 'Sets the shape of the avatar.',
            control: { type: 'select' },
            options: ['circle', 'square'],
            table: 
            {
                category: 'properties'
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