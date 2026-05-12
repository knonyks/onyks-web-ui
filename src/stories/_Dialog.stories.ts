import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';


const meta: Meta = 
{
    title: 'Onyks WebUI/Dialog',
    component: 'onyks-dialog',
    tags: ['autodocs'],
    argTypes: {
    
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    opened: true,
    title: 'Tytuł dialogu',
    noTitle: false,
    cornerClose: true,
    modal: true,
    text: 'Treść',
  },
  
  parameters: {
    docs: {
      source: {
        transform: (code: string) => code.replace(/<style>[\s\S]*?<\/style>\s*/gi, '').trim(),
      },
    },
  },

  decorators: [
    (story) => html`
      <style>onyks-dialog{height: 400px;}</style>
      ${story()}
    `,
  ],

  render: (args) => html`
    <onyks-dialog
      ?opened=${args.opened}
      title=${args.title}
      ?noTitle=${args.noTitle}
      ?cornerClose=${args.cornerClose}
      ?modal=${args.modal}
    >
      ${args.text}
    </onyks-dialog>
  `,
};