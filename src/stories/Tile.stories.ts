import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = 
{
    title: 'ONYKS WebUI/Tile',
    component: 'onyks-tile',
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
        gap:
        {
            control: { type: 'select' },
            options: ['s', 'm', 'l', 'xl'],
            table:
            {
                category: 'parameters'
            }
        },
        padding:
        {
            control: { type: 'select' },
            options: ['s', 'm', 'l', 'xl'],
            table:
            {
                category: 'parameters'
            }
        },
        icon:
        {
            table: 
            {
                category: 'parameters'
            }
        },
        selected: 
        {
            table: 
            {
                category: 'parameters'
            }
        },
        text:
        {
            control: { type: 'text' },
            table:
            {
                category: 'parameters'
            }
        }
    },
    render: (args) => html`
        <onyks-container gap="m" type="group">
            ${args.icon.map((icon: any, index: any) => html`
                <onyks-tile size=${args.size} gap=${args.gap} padding=${args.padding} icon=${icon} ?selected=${args.selected[index]}>${args.text}</onyks-tile>
            `)}
        </onyks-container>
    `,
    parameters:
    {
        docs:
        {
            description: 
            {
            story: "Tile uses Bootstrap Icons for the options. We need to find CSS code (Code point) and put it in \
            the strip menu option parameter - ,,icon'' ; for example if we want to use \
            icon (https://icons.getbootstrap.com/icons/0-circle/) we have to put ,,F840'' code: icon=\"F840\"" 
            },
            source:
            {
                transform: (_originalCode: string, storyContext: any) => 
                {
                    const { args } = storyContext;
                    return `
                    <onyks-container gap="m" type="group">
                        ${args.icon.map((icon: any, index: any) => `
                            <onyks-tile size="${args.size}" gap="${args.gap}" padding="${args.padding}" icon="${icon}"${args.selected[index] ? ' selected' : ''}>${args.text}</onyks-tile>
                        `).join('')}
                    </onyks-container>
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
    gap: 'm',
    padding: 'm',
    icon: ['F7CD', 'F62A', 'F7B4', 'F62A', 'F7CD'],
    selected: [true, false, true, false, true],
    text: 'Tile'
  }
};