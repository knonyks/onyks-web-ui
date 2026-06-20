import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = 
{
    title: 'ONYKS WebUI/Strip Menu',
    component: 'onyks-strip-menu',
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
        icon:
        {
            table: 
            {
                category: 'parameters'
            }
        },
        marked: 
        {
            table: 
            {
                category: 'parameters'
            }
        },
        type: 
        {
            control: { type: 'select' },
            options: ['v', 'h'],
            table: 
            {
                category: 'parameters'
            }
        },
    },
    render: (args) => html`
        <onyks-strip-menu type=${args.type}>
            <onyks-strip-menu-option size=${args.size} icon=${args.icon[0]} ?marked=${args.marked[0]}></onyks-strip-menu-option>
            <onyks-strip-menu-option size=${args.size} icon=${args.icon[1]} ?marked=${args.marked[1]}></onyks-strip-menu-option>
            <onyks-strip-menu-option size=${args.size} icon=${args.icon[2]} ?marked=${args.marked[2]}></onyks-strip-menu-option>
            <onyks-strip-menu-option size=${args.size} icon=${args.icon[3]} ?marked=${args.marked[3]}></onyks-strip-menu-option>
            <onyks-strip-menu-option size=${args.size} icon=${args.icon[4]} ?marked=${args.marked[4]}></onyks-strip-menu-option>
        </onyks-strip-menu>
    `,
    parameters:
    {
        docs:
        {
            description: 
            {
            story: "Strip Menu uses Bootstrap Icons for the options. We need to find CSS code and put it in \
            the strip menu option parameter - ,,icon'' ; for example if we want to use \
            icon (https://icons.getbootstrap.com/icons/0-circle/) we have to put ,,F840'' code: icon=\"F840\"" 
            },
            source:
            {
                transform: (_originalCode: string, storyContext: any) => 
                {
                    const { args } = storyContext;
                    return `
                    <onyks-strip-menu type="${args.type}">
                        <onyks-strip-menu-option size="${args.size}" icon="${args.icon[0]}"${args.marked[0]? " marked":''}></onyks-strip-menu-option>
                        <onyks-strip-menu-option size="${args.size}" icon="${args.icon[1]}"${args.marked[1]? " marked":''}></onyks-strip-menu-option>
                        <onyks-strip-menu-option size="${args.size}" icon="${args.icon[2]}"${args.marked[2]? " marked":''}></onyks-strip-menu-option>
                        <onyks-strip-menu-option size="${args.size}" icon="${args.icon[3]}"${args.marked[3]? " marked":''}></onyks-strip-menu-option>
                        <onyks-strip-menu-option size="${args.size}" icon="${args.icon[4]}"${args.marked[4]? " marked":''}></onyks-strip-menu-option>
                    </onyks-strip-menu>
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
    type: 'v',
    size: 'm',
    icon: ['F7CD', 'F62A', 'F7B4', 'F62A', 'F7CD'],
    marked: [true, false, true, false, true]
  }
};