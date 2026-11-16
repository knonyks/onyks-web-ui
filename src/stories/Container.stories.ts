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
        mobile-breakpoint="${args['mobile-breakpoint']}"
    >
        <onyks-button background="red" subcols="${args.subcols}" subrows="${args.subrows}">First</onyks-button>
        <onyks-button background="blue">Second</onyks-button>
        <onyks-button background="green">Third</onyks-button>
        <onyks-button background="red">Fourth</onyks-button>
        <onyks-button background="blue">Fifth</onyks-button>
        <onyks-button background="green">Sixth</onyks-button>
    </onyks-container>
    `,

    argTypes: 
    {
        gap: 
        {
            description: 'Defines the spacing between items inside the container.',
            control:
            { 
                type: 'select' 
            },
            options: ['s', 'm', 'l', 'xl'],
            table: 
            {
                category: 'properties'
            }
        },
        padding: 
        {
            description: 'Sets the internal spacing around the container content.',
            control:
            { 
                type: 'select' 
            },
            options: ['s', 'm', 'l', 'xl'],
            table: 
            {
                category: 'properties'
            }
        },
        type: 
        {
            description: 'Defines the layout mode of the container.',
            control:
            { 
                type: 'select' 
            },
            options: ['grid', 'stack', 'group'],
            table: 
            {
                category: 'properties'
            }
        },
        cols:
        {
            description: 'Sets the number of columns in the container grid.',
            control:
            { 
                type: 'number' 
            },
            table:
            {
                category: 'properties'
            }
        },
        align:
        {
            description: 'Aligns items along the cross axis of the container.',
            control:
            {
                type: 'select'
            },
            options: ['start', 'center', 'end'],
            table:
            {
                category: 'properties'
            }
        },
        justify:
        {
            description: 'Aligns items along the main axis of the container.',
            control:
            {
                type: 'select'
            },
            options: ['start', 'center', 'end', 'between'],
            table:
            {
                category: 'properties'
            }
        },
        'mobile-breakpoint': 
        {
            control: { type: 'number' },
            description: 'Screen width (in pixels), at which the grid switches to a single-column mode.',
            table: { category: 'properties' }
        },
        subcols:
        {
            control:
            { 
                type: 'number'
            },
            table:
            {
                category: 'subelements properties'
            },
            description: 'Sets the number of columns occupied by the child element inside the container.'
        },
        subrows:
        {
            control:
            { 
                type: 'number' 
            },
            table:
            {
                category: 'subelements properties'
            },
            description: 'Sets the number of rows occupied by the child element inside the container.'

        }
    },
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
                <onyks-container gap="${args.gap}" padding="${args.padding}" type="${args.type}"
                    cols="${args.cols}"
                    align="${args.align}"
                    justify="${args.justify}"
                    mobile-breakpoint="${args['mobile-breakpoint']}"
                >
                    <onyks-button background="red" subcols="${args.subcols}" subrows="${args.subrows}">First</onyks-button>
                    <onyks-button background="blue">Second</onyks-button>
                    <onyks-button background="green">Third</onyks-button>
                    <onyks-button background="red">Fourth</onyks-button>
                    <onyks-button background="blue">Fifth</onyks-button>
                    <onyks-button background="green">Sixth</onyks-button>
                </onyks-container>
            `
          }
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
    cols: 6,
    align: 'start',
    justify: 'start',
    'mobile-breakpoint': 300,
    subcols: 4,
    subrows: 2
  },
};

export const WithText: Story = {
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

export const MoreComplicatedExample: Story = {
    args: {
        gap: "s",
        padding: "m",
        type: "stack",
        cols: 0,
        align: "start",
        justify: "start",
        'mobile-breakpoint': 300
    },
    render: (_args) => html`
        <div style="background-color: var(--onyks-surface-1);">
            <onyks-container gap="m" padding="m" type="grid" cols="3" align="center" justify="center" mobile-breakpoint="800">
                <onyks-card title="Card No 1" subcols="2">
                    <onyks-text size="m">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam \
                    hendrerit a orci sit amet molestie. Suspendisse mollis ullamcorper mauris.</onyks-text>
                </onyks-card>
                <onyks-card title="Card No 2" subcols="1">
                    <onyks-text size="m">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam \
                    hendrerit a orci sit amet molestie. Suspendisse mollis ullamcorper mauris.</onyks-text>
                </onyks-card>
                <onyks-card title="Card No 3" subcols="3">
                    <onyks-text size="m">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam \
                    hendrerit a orci sit amet molestie. Suspendisse mollis ullamcorper mauris.</onyks-text>
                </onyks-card>
                <onyks-card title="Card No 4" subcols="1" subrows="2">
                    <onyks-text size="m">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam \
                    hendrerit a orci sit amet molestie. Suspendisse mollis ullamcorper mauris.</onyks-text>
                </onyks-card>
                <onyks-card title="Card No 5" subcols="2">
                    <onyks-text size="m">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam \
                    hendrerit a orci sit amet molestie. Suspendisse mollis ullamcorper mauris.</onyks-text>
                </onyks-card>
                <onyks-card title="Card No 6">
                    <onyks-text size="m">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam \
                    hendrerit a orci sit amet molestie. Suspendisse mollis ullamcorper mauris.</onyks-text>
                </onyks-card>
                <onyks-card title="Card No 7">
                    <onyks-text size="m">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam \
                    hendrerit a orci sit amet molestie. Suspendisse mollis ullamcorper mauris.</onyks-text>
                </onyks-card>
                <onyks-card title="Card No 8">
                    <onyks-text size="m">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam \
                    hendrerit a orci sit amet molestie. Suspendisse mollis ullamcorper mauris.</onyks-text>
                </onyks-card>
                <onyks-card title="Card No 9" subcols="2">
                    <onyks-text size="m">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam \
                    hendrerit a orci sit amet molestie. Suspendisse mollis ullamcorper mauris.</onyks-text>
                </onyks-card>
            </onyks-container>
        </div>    
  `,
};