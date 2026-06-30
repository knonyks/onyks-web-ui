import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = 
{
    title: 'ONYKS WebUI/Dialog',
    component: 'onyks-dialog',
    tags: ['autodocs'],
    argTypes: 
    {
      open: { control: 'boolean', table: { category: 'parameters' } },
      title: { control: 'text', table: { category: 'parameters' } },
      "corner-close": { control: 'boolean', table: { category: 'parameters' } },
      "bottom-buttons": { control: 'boolean', table: { category: 'parameters' } },
      modal: { control: 'boolean', table: { category: 'parameters' } },
      size: 
      {
        control: { type: 'select' },
        options: ['s', 'm', 'l', 'xl'],
        table: 
        {
            category: 'parameters'
        }
      },
      text: { control: 'text' },
      "dialog-close":
      {
          action: 'dialog-close',
          description: 'Emit when user closes the dialog; click on the backdrop or corner close button',
          table: 
          {
              category: 'events',
              type: { summary: 'void' },
          }
      }
    },
    render: (args) => html`
      <onyks-dialog 
      ?open=${args.open} 
      title="${args.title}" 
      ?no-title="${args.noTitle}" 
      ?corner-close="${args["corner-close"]}" 
      ?modal="${args.modal}"
      ?bottom-buttons="${args["bottom-buttons"]}"
      size="${args.size}" @dialog-close=${(e: any) => {console.log(e)}}>
        ${args.text}
      </onyks-dialog>
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
                      <script>
                        const dialog = document.querySelector('onyks-dialog')
                        dialog.addEventListener('dialog-close', console.log)
                      </script>

                      <onyks-dialog${args.open ? ' open' : ''} title="${args.title}" ${args["corner-close"] ? ' corner-close' : ''} ${args["bottom-buttons"] ? ' bottom-buttons' : ''} size="${args.size}">
                        ${args.text}
                      </onyks-dialog>
                    `;
                }
            },
        }
    },
    decorators: [
      (story) => html`<div style="min-height: 300px; padding: 2rem;">
        ${story()}
      </div>`
    ],
};

export default meta;
type Story = StoryObj;

export const Base: Story = 
{
  args: 
  {
    open: true,
    title: 'A dialog title',
    "corner-close": false,
    "bottom-buttons": false,
    modal: false,
    text: 'A dialog content',
  }
};

export const WithButtons: Story = 
{
  args: 
  {
    open: true,
    title: 'A dialog title',
    noTitle: false,
    "corner-close": false,
    "bottom-buttons": true,
    modal: false,
    text: 'A dialog content',
    size: 'm',
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
                    <onyks-dialog ${args.open ? 'open' : ''} title="${args.title}" ${args["corner-close"] ? 'corner-close' : ''} ${args.modal ? 'modal' : ''}${args["bottom-buttons"] ? 'bottom-buttons' : ''} size="${args.size}">
                      ${args.text}
                        <onyks-button slot="footer" background="red">Cancel</onyks-button>
                        <onyks-button slot="footer" background="yellow">OK</onyks-button>
                    </onyks-dialog>
                  `;
              }
          },
      }
  },
  render: (args) => html`
    <onyks-dialog ?open=${args.open} title="${args.title}" ?no-title="${args.noTitle}" ?corner-close="${args["corner-close"]}" ?modal="${args.modal}" ?bottom-buttons="${args["bottom-buttons"]}">
      ${args.text}
        <onyks-button slot="footer" background="red">Cancel</onyks-button>
        <onyks-button slot="footer" background="yellow">OK</onyks-button>
    </onyks-dialog>
  `,
};

export const WithLongContent: Story = 
{
  args: 
  {
    open: true,
    title: 'A dialog title',
    noTitle: false,
    "corner-close": false,
    "bottom-buttons": true,
    modal: false,
    size: 'm',
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
                    <onyks-dialog ${args.open ? 'open' : ''} title="${args.title}" ${args["corner-close"] ? 'corner-close' : ''} ${args.modal ? 'modal' : ''}${args["bottom-buttons"] ? 'bottom-buttons' : ''} size="${args.size}">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a est id nisi mattis pretium. 
                          In lobortis leo et arcu dignissim efficitur. Curabitur ac mattis magna. Vivamus vestibulum, urna ut 
                          vulputate commodo, lorem dui semper justo, sit amet luctus augue mauris ac metus. Maecenas tincidunt, 
                          dui pellentesque volutpat blandit, dolor quam faucibus turpis, ut gravida metus odio eget quam. Proin 
                          congue erat leo, non scelerisque metus vehicula id. Nulla vitae hendrerit sem. In placerat, 
                          leo porttitor faucibus cursus, lectus metus lacinia felis, in congue ipsum ante eu elit. 
                          Curabitur quis tellus eros. Donec imperdiet vel elit nec vestibulum. Nam vel elementum diam, id rutrum diam.</p>
                        <p>
                          Aliquam pretium molestie dictum. Nullam auctor, dui eu vestibulum vulputate, 
                          urna purus porta velit, eu porta urna est id massa. Aliquam laoreet, lacus 
                          vitae tempus rhoncus, metus augue rutrum ante, vitae tincidunt turpis arcu at 
                          mi. Duis at ante in ipsum bibendum aliquet vitae in ipsum. Etiam massa sem, 
                          lobortis eu lacinia vel, finibus vel purus. Suspendisse eu sem at elit laoreet 
                          fringilla vel id est. Quisque pharetra eleifend tincidunt. Aliquam sodales ex 
                          a malesuada aliquam. Interdum et malesuada fames ac ante ipsum primis in faucibus. 
                          Fusce a magna tempus nisl rutrum ultrices in vitae est. Morbi commodo velit at 
                          risus volutpat viverra. Phasellus consequat diam id justo rhoncus rhoncus.
                        </p>    
                        <onyks-button slot="footer" background="red">Cancel</onyks-button>
                        <onyks-button slot="footer" background="yellow">OK</onyks-button>
                    </onyks-dialog>
                  `;
              }
          },
      }
  },
  render: (args) => html`
    <onyks-dialog ?open=${args.open} title="${args.title}" ?no-title="${args.noTitle}" ?corner-close="${args["corner-close"]}" ?modal="${args.modal}" ?bottom-buttons="${args["bottom-buttons"]}">

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a est id nisi mattis pretium. 
      In lobortis leo et arcu dignissim efficitur. Curabitur ac mattis magna. Vivamus vestibulum, urna ut 
      vulputate commodo, lorem dui semper justo, sit amet luctus augue mauris ac metus. Maecenas tincidunt, 
      dui pellentesque volutpat blandit, dolor quam faucibus turpis, ut gravida metus odio eget quam. Proin 
      congue erat leo, non scelerisque metus vehicula id. Nulla vitae hendrerit sem. In placerat, 
      leo porttitor faucibus cursus, lectus metus lacinia felis, in congue ipsum ante eu elit. 
      Curabitur quis tellus eros. Donec imperdiet vel elit nec vestibulum. Nam vel elementum diam, id rutrum diam.</p>
      <p>Aliquam pretium molestie dictum. Nullam auctor, dui eu vestibulum vulputate, urna purus porta velit, eu porta urna est id massa. Aliquam laoreet, lacus vitae tempus rhoncus, metus augue rutrum ante, vitae tincidunt turpis arcu at mi. Duis at ante in ipsum bibendum aliquet vitae in ipsum. Etiam massa sem, lobortis eu lacinia vel, finibus vel purus. Suspendisse eu sem at elit laoreet fringilla vel id est. Quisque pharetra eleifend tincidunt. Aliquam sodales ex a malesuada aliquam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce a magna tempus nisl rutrum ultrices in vitae est. Morbi commodo velit at risus volutpat viverra. Phasellus consequat diam id justo rhoncus rhoncus.
      </p>      
  <onyks-button slot="footer" background="red">Cancel</onyks-button>
        <onyks-button slot="footer" background="yellow">OK</onyks-button>
    </onyks-dialog>
  `,
};

export const CSSEdit: Story = 
{
  args: 
  {
    open: true,
    title: 'A dialog title',
    noTitle: false,
    "corner-close": false,
    "bottom-buttons": true,
    modal: false,
    text: 'A dialog content',
    size: 'm',
  },
  parameters:
  {
      docs:
      {
        description: 
        {
          story: 'There is a possibility to edit the main parts of the dialog. The user can change the \
          whole window of the dialog (container of the dialog). The title part of the dialog (title), the part which is \
          responsbile of showing content (content) and also the footer part (footer).'
        },
        source:
        {
            transform: (_originalCode: string, storyContext: any) => 
            {
                const { args } = storyContext;
                return `
                  <style>
                    onyks-dialog::part(container)
                    {
                      border: 5px solid black;
                    }

                    onyks-dialog::part(title)
                    {
                      background-color: yellow;
                      color: black;
                    }

                    onyks-dialog::part(content)
                    {
                      background-color: blue;
                    }

                    onyks-dialog::part(footer)
                    {
                      background-color: green;
                    }
                  </style>
                  
                  
                  <onyks-dialog ${args.open ? 'open' : ''} title="${args.title}" ${args["corner-close"] ? 'corner-close' : ''} ${args.modal ? 'modal' : ''}${args["bottom-buttons"] ? 'bottom-buttons' : ''} size="${args.size}">
                    ${args.text}
                      <onyks-button slot="footer" background="red">Cancel</onyks-button>
                      <onyks-button slot="footer" background="yellow">OK</onyks-button>
                  </onyks-dialog>
                `;
            }
        },
      }
  },
  render: (args) => html`
    <style>
      #myDialog::part(container)
      {
        border: 5px solid black;
      }

      #myDialog::part(title)
      {
        background-color: yellow;
        color: black;
      }

      #myDialog::part(content)
      {
        background-color: blue;
      }

      #myDialog::part(footer)
      {
        background-color: green;
      }
    </style>  
  
  <onyks-dialog id="myDialog" ?open=${args.open} title="${args.title}" ?no-title="${args.noTitle}" ?corner-close="${args["corner-close"]}" ?modal="${args.modal}" ?bottom-buttons="${args["bottom-buttons"]}">
      ${args.text}
        <onyks-button slot="footer" background="red">Cancel</onyks-button>
        <onyks-button slot="footer" background="yellow">OK</onyks-button>
    </onyks-dialog>
  `,
};
