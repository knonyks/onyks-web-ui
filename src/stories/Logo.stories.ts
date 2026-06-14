import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = 
{
    title: 'ONYKS WebUI/Logo',
    component: 'onyks-logo',
    tags: ['autodocs'],
    
    parameters:
    {
        docs:
        {
            description: 
            {
                story: 'Element of ONYKS Logo is usefull only for the members of \
                ONYKS Student Scientific Club. There is recommendation to change \
                only one of height or width. The element adjust automatically the \
                other parameter with the right aspect ratio for the chosen parameter; \
                for example: if we change width, height changes automatically - it also \
                works in the revert relation.',
            },
            source:
            {
                transform: (_originalCode: string, storyContext: any) => 
                {
                    const { args } = storyContext;
                    return `<onyks-logo${args.invert ? ' invert' : ''}></onyks-logo>`;
                }
            },
        }
    },
    argTypes:
    {
        invert: 
        {
            control: { type: 'boolean' },
            table: 
            {
                category: 'parameters'
            }
        }
  },
};

export default meta;
type Story = StoryObj;

export const Base: Story = 
{
    args: 
    {
        invert: true
    }
};

export const CSSEdit: Story = 
{
    parameters:
    {
      docs: 
      {
        description: 
        {
          story: 'There is a possibility to edit the image element of the logo. \
          For example we can add a drop shadow or change the color of the logo. \
          The image element is an svg element with part="logo" attribute.',
        },
        source: 
        {
          transform: (_originalCode: string, storyContext: any) => 
          {
            return `
<style>
    onyks-logo::part(logo)
    {
        filter: drop-shadow(16px 16px 20px red) invert(75%);
    }
</style>

<onyks-logo></onyks-logo>`;
          }
        },
      }
    },
    render: (_args) => html`
    <style>
      #custom-css::part(logo)
      {
        filter: drop-shadow(16px 16px 20px red) invert(75%);
      }
    </style>
    <onyks-logo id="custom-css"></onyks-logo>
    `
};