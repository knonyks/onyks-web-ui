import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = 
{
    title: 'ONYKS WebUI/Loader',
    component: 'onyks-loader',
    tags: ['autodocs'],
    
    render: (_args) => html`
    <script>
        let loader = document.querySelector("#loader")
        loader.isLoading = true
        setTimeout(() => 
        {
            loader.isLoading = false
        }, 2000)
    </script>
    <onyks-container padding="m" class="moj-scrollowany-parent" style="position: relative; overflow-y: auto; height: 300px; background-color: var(--onyks-surface);">
  
        <onyks-loader id="loader" scroll-container=".moj-scrollowany-parent"></onyks-loader>
  
        <onyks-container type="grid" cols="2" rows="2" gap="m">
            <onyks-header level="3" cols="2">Example content</onyks-header>
            <onyks-card title="Example 1" cols="1"></onyks-card>
            <onyks-card title="Example 2" cols="1"></onyks-card>
        </onyks-container>
    </onyks-container>`,

    argTypes: 
    {
      type: 
      {
        control: 
        { 
          type: 'select' 
        },
        options: ['info', 'warning', 'error', 'success'],
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
      text: 
      {
        control: { type: 'text' },
        table: 
        {
          category: 'slot'
        }
      },
    },
    parameters:
    {
      docs: 
      {
        source: 
        {
          transform: (_originalCode: string, _storyContext: any) => 
          {
            return `    <script>
        let loader = document.querySelector("#loader")
        loader.isLoading = true
        setTimeout(() => 
        {
            loader.isLoading = false
        }, 2000)
    </script>
    <onyks-container padding="m" class="moj-scrollowany-parent" style="position: relative; overflow-y: auto; height: 300px; background-color: var(--onyks-surface);">
  
        <onyks-loader id="loader" scroll-container=".moj-scrollowany-parent"></onyks-loader>
  
        <onyks-container type="grid" cols="2" rows="2" gap="m">
            <onyks-header level="3" cols="2">Example content</onyks-header>
            <onyks-card title="Example 1" cols="1"></onyks-card>
            <onyks-card title="Example 2" cols="1"></onyks-card>
        </onyks-container>
    </onyks-container>`;
          }
        },
      }
    },
};

export default meta;
type Story = StoryObj;

export const Info: Story = {
  args: {
    type: 'info',
    size: 'm',
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam \
    hendrerit a orci sit amet molestie. Suspendisse mollis ullamcorper mauris."
  }
};
