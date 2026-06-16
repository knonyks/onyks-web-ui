import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = 
{
    title: 'ONYKS WebUI/Pagination Nav',
    component: 'onyks-pagination-nav',
    tags: ['autodocs'],
    
    render: (args) => html`
    <onyks-pagination-nav 
    max-index=${args['max-index']} index=${args.index} 
    max-view=${args['max-view']} 
    size=${args.size}
    @page-change=${console.log}></onyks-pagination-nav>`,

    argTypes: 
    {
        'max-index': 
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
        'index': 
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
        'max-view': 
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
        size: 
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
        "page-change":
        {
            action: 'page-change',
            description: 'Emit when user change the page; click on the index',
            table: 
            {
                category: 'events'
            }
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
            <script>
                const pageNav = document.querySelector('onyks-pagination-nav')
                pageNav.addEventListener('page-change', console.log)
            </script>
            
            <onyks-pagination-nav max-index=${args['nax-index']} index=${args.index} max-view=${args['max-view']} size=${args.size}></onyks-pagination-nav>`;
          }
        },
      }
    },
};

export default meta;
type Story = StoryObj;

export const Base: Story = {
  args: {
    'max-index': 100,
    index: 50,
    'max-view': 10,
    size: 'm',
  }
};