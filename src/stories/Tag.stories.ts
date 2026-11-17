import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { OnyksSchemas } from '../utils/styles';

const meta: Meta = 
{
    title: 'ONYKS WebUI/Tag',
    component: 'onyks-tag',
    tags: ['autodocs'],
    
    render: (args) => html`
      <onyks-container type="stack" gap="m">
        <onyks-tag size="${args.size}" icon="${args.icon}" background="${args.background}" ?closable=${args.closable}>${args.text}</onyks-tag>
        <onyks-tag size="${args.size}" icon="${args.icon}" background="${args.background}" ?closable=${args.closable}>Example text</onyks-tag>
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
          category: 'properties'
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
          category: 'properties'
        }
      },
      text:
      {
        control:
        {
          type: 'text'
        },
        table:
        {
          category: 'slot'
        }
      },
      icon:
      {
        control:
        {
          type: 'text'
        },
        table:
        {
          category: 'properties'
        }
      },
      background:
      {
        control:
        {
          type: 'select'
        },
        options: OnyksSchemas.background,
        table:
        {
          category: 'properties'
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
    icon: 'F5B2',
    background: 'green',
  },
  parameters: {
    docs: {
      description: {
        story: 'The tag element uses Bootstrap Icons. To display an icon, find its CSS code point and pass it to the `icon` parameter. For example, the [0-circle icon](https://icons.getbootstrap.com/icons/0-circle/) has code point `F840`, so set `icon="F840"`.',
      },
      source: {
        transform: (_code: any, storyContext: any) => {
          const { args } = storyContext;

          return `
            <onyks-container type="stack" gap="m">
              <onyks-tag size="${args.size}" icon="${args.icon}" background="${args.background}"${args.closable? ' closable':''}>${args.text}</onyks-tag>
              <onyks-tag size="${args.size}" icon="${args.icon}" background="${args.background}"${args.closable? ' closable':''}>Example text</onyks-tag>
            </onyks-container>
          `;
        },
      },
    },
  },
};

