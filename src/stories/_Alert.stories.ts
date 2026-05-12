import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = 
{
    title: 'Onyks WebUI/Alert',
    component: 'onyks-alert',
    tags: ['autodocs'],
    argTypes: {
    type: {
      control: { type: 'select' },
      options: ['info', 'warning', 'error', 'success'],
    },
    size: {
      control: { type: 'select' },
      options: ['s', 'm', 'l', 'xl'],
    },
  },
};

export default meta;
type Story = StoryObj;

export const Info: Story = {
  args: {
    type: 'info',
    size: 'm',
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam hendrerit a orci sit amet molestie. Suspendisse mollis ullamcorper mauris."
  },
  render: (args) => html`
    <onyks-alert
      type="${args.type}"
      size="${args.size}"
    >${args.text}
    </onyks-alert>
  `,
};

export const Warning: Story = {
  args: {
    ...Info.args,
    type: "warning",
  },
  render: Info.render,
};

export const Error: Story = {
  args: {
    ...Info.args,
    type: "error",
  },
  render: Info.render,
};

export const Success: Story = {
  args: {
    ...Info.args,
    type: "success",
  },
  render: Info.render,
};