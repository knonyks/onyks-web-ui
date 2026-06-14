import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = 
{
    title: 'ONYKS WebUI/Alert',
    component: 'onyks-alert',
    tags: ['autodocs'],
    
    render: (args) => html`<onyks-alert type=${args.type} size=${args.size}>${args.text}</onyks-alert>`,

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
        control: { type: 'text' }
      },
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
            return `<onyks-alert type="${args.type}" size="${args.size}">${args.text}</onyks-alert>`;
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

export const Warning: Story = {
  args: {
    ...Info.args,
    type: 'warning',
  }
};

export const Error: Story = {
  args: {
    ...Info.args,
    type: 'error',
  }
};

export const Success: Story = {
  args: {
    ...Info.args,
    type: 'success',
  }
};

export const CSSEdit: Story = {
  args: {
    ...Info.args,
    type: 'success',
  },
  render: (args) => html`
    <style>
      #custom-css::part(text)
      {
        color: red;
        text-align: justify;
      }

      #custom-css::part(icon)::before
      {
        content: 'X';
        font-family: 'Arial';
        color: purple;
      }
    </style>
    <onyks-alert type=${args.type} size=${args.size} id="custom-css">${args.text}</onyks-alert>
  `,
    parameters:
    {
      docs: 
      {
        description: 
        {
          story: 'There is a possibility to edit the text element. For example we can \
          change the color of the text or text alignment. The text element is a span element \
          with part="text" attribute. The text element is a child of the onyks-alert element. \
          Also we can edit the icon element. For example we can change the content of the icon or \
          change the color of the icon. The icon element is a span element with part="icon" attribute. \
          The icon element is a child of the onyks-alert element. The icon element has a ::before pseudo-element \
          ',
        },
        source: 
        {
          transform: (_originalCode: string, storyContext: any) => 
          {
            const { args } = storyContext;
            return `
<style>
  onyks-alert::part(text)
  {
    color: red;
    text-align: justify;
  }

  onyks-alert::part(icon)::before
  {
    content: 'X';
    font-family: 'Arial';
    color: purple;
  }
</style>

<onyks-alert type="${args.type}" size="${args.size}">${args.text}</onyks-alert>`;
          }
        },
      }
    },
};