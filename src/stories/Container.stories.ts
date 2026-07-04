import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = 
{
    title: 'ONYKS WebUI/Container',
    component: 'onyks-container',
    tags: ['autodocs'],
    
    render: (args) => html`
    <onyks-container
        gap="${args.gap}"
        padding="${args.padding}"
        type="${args.type}"
        cols="${args.cols}"
        align="${args.align}"
        justify="${args.justify}"
    >
        <onyks-button background="red">First</onyks-button>
        <onyks-button background="blue">Second</onyks-button>
        <onyks-button background="green">Third</onyks-button>
    </onyks-container>
    `,

    argTypes: 
    {
        gap: 
        {
            control:
            { 
                type: 'select' 
            },
            options: ['s', 'm', 'l', 'xl'],
            table: 
            {
                category: 'parameters'
            }
        },
        padding: 
        {
            control:
            { 
                type: 'select' 
            },
            options: ['s', 'm', 'l', 'xl'],
            table: 
            {
                category: 'parameters'
            }
        },
        type: 
        {
            control:
            { 
                type: 'select' 
            },
            options: ['grid', 'stack', 'group'],
            table: 
            {
                category: 'parameters'
            }
        },
        cols:
        {
            control:
            { 
                type: 'number' 
            },
            table:
            {
                category: 'parameters'
            }
        },
        align:
        {
            control:
            {
                type: 'select'
            },
            options: ['start', 'center', 'end'],
            table:
            {
                category: 'parameters'
            }
        },
        justify:
        {
            control:
            {
                type: 'select'
            },
            options: ['start', 'center', 'end', 'between'],
            table:
            {
                category: 'parameters'
            }
        }
    }
};

export default meta;
type Story = StoryObj;

export const Base: Story = {
  args: {
    gap: 'm',
    padding: 'm',
    type: 'stack',
    cols: 0,
    align: 'start',
    justify: 'start'
  },
};

export const WithOtherElements: Story = {
  args: {
    gap: 'm',
    padding: 'm',
    type: 'stack',
    cols: 0,
    align: 'start',
    justify: 'start'
  },
  render: (args) => html`
      <div style="background-color: var(--onyks-surface);">
  <onyks-container
      gap="${args.gap}"
      padding="${args.padding}"
      type="${args.type}"
      cols="${args.cols}"
      align="${args.align}"
      justify="${args.justify}"
  >
        <onyks-text size="m">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam \
        hendrerit a orci sit amet molestie. Suspendisse mollis ullamcorper mauris.</onyks-text>
    
        <onyks-text size="m">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam \
        hendrerit a orci sit amet molestie. Suspendisse mollis ullamcorper mauris.</onyks-text>
    
        <onyks-text size="m">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam \
        hendrerit a orci sit amet molestie. Suspendisse mollis ullamcorper mauris.</onyks-text>

  </onyks-container>
    </div>    
  `,
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
  <onyks-container gap="${args.gap}" padding="${args.padding}" type="${args.type}" cols="${args.cols}" align="${args.align}" justify="${args.justify}">
    <onyks-text size="m">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam \
    hendrerit a orci sit amet molestie. Suspendisse mollis ullamcorper mauris.</onyks-text>
    <onyks-text size="m">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam \
    hendrerit a orci sit amet molestie. Suspendisse mollis ullamcorper mauris.</onyks-text>
    <onyks-text size="m">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam \
    hendrerit a orci sit amet molestie. Suspendisse mollis ullamcorper mauris.</onyks-text>
  </onyks-container>
            
            `;
          }
        },
      }
    },
};