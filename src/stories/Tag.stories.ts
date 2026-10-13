import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = 
{
    title: 'ONYKS WebUI/Tag',
    component: 'onyks-tag',
    tags: ['autodocs'],
    
    render: (args) => html`
    
      <onyks-container type="stack" gap="m">
        <onyks-tag size=${args.size} ?closable=${args.closable}>${args.text}</onyks-tag>

        <onyks-tag size=${args.size} ?closable=${args.closable}>DASDASDASDHJDJQHE1J2H3I21H3IU12H3UI12H3UI12H3IU1H24U1H2U4IH12IU</onyks-tag>
      </onyks-container>
    
    
    `,

    argTypes: 
    {
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
      closable:
      {
        control:
        {
          type: 'boolean'
        },
        table:
        {
          category: 'parameters'
        }
      },
    }
};

export default meta;
type Story = StoryObj;

export const Info: Story = {
  args: {
    size: 'm',
    text: 'Sample Tag',
    closable: true,
  }
};

