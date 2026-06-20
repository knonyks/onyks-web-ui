import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = 
{
    title: 'ONYKS WebUI/File Explorer',
    component: 'onyks-file-explorer',
    tags: ['autodocs'],
    argTypes: 
    {
        size: 
        {
            control: { type: 'select' },
            options: ['s', 'm', 'l', 'xl'],
            table: 
            {
                category: 'parameters'
            }
        },
        multiple: 
        {
            control: { type: 'boolean' },
            table: 
            {
                category: 'parameters'
            }
        },
        content: 
        {
            table: 
            {
                category: 'parameters'
            }
        },
        'empty-alert': 
        {
            control: { type: 'text' },
            table: 
            {
                category: 'parameters'
            }
        },
        'enter-folder': 
        {
            action: 'enter-folder',
            description: 'Emit when user enter the folder; double click on the folder',
            table: 
            {
                category: 'events',
                type: { summary: '{ folder: {type, name} }' },
                
            }
        },
        'getSelectedItems()': 
        {
            action: 'getSelectedItems()',
            description: 'Gives a list of selected files and folders',
            table: 
            {
                category: 'functions',
                type: { summary: '[{type, name}]' },
                
            }
        }
    },
    render: (args) => html`
        <onyks-file-explorer id="x"
size=${args.size} 
        ?multiple=${args.multiple} 
        .content=${args.content} 
        empty-alert=${args['empty-alert']} >
        
        </onyks-file-explorer>
        
        <onyks-button style="margin-top: var(--spacing-md)" @click=${(e) => {console.log(document.querySelector('#x').getSelectedItems())}}>Get Selected</onyks-button>
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
                        const explorer = document.querySelector('onyks-file-explorer')
                        explorer.content = [{type: 'folder', name: "Kanye West"}, {type: 'file', name: "Shakira - Waka Waka.mp3"}, {type: 'folder', name: "Marek Grechuta"}]
                    
                        const btn = document.querySelector('onyks-button')
                        btn.addEventListener('click', (e) => {
                            console.log(document.querySelector('#x').getSelectedItems()))
                        })
                    </script>

                    <onyks-file-explorer size="${args.size}"${args.multiple? ' multiple':''} empty-alert="${args['empty-alert']}"></onyks-file-explorer>       
                    
                    <onyks-button>Get Selected</onyks-button>
                    `;
                }
            },
        }
    }
};

export default meta;
type Story = StoryObj;

export const Base: Story = 
{
  args: 
  {
    size: 'm',
    multiple: false,
    content: [{type: 'folder', name: "Kanye West"}, {type: 'file', name: "Shakira - Waka Waka.mp3"}, {type: 'folder', name: "Marek Grechuta"}],
    'empty-alert': "This folder is empty!"
  }
};

export const ExampleInUseWithPathElement: Story = 
{
  args: 
  {
    size: 'm',
    multiple: false,
    content: [{type: 'folder', name: "Kanye West"}, {type: 'file', name: "Shakira - Waka Waka.mp3"}, {type: 'folder', name: "Marek Grechuta"}],
    'empty-alert': "This folder is empty!"
  },
  render: (args) => html`
    <script>
        let updateExplorer = (folderName) => 
        {
            const explorer = document.querySelector('#explorer')
            switch(folderName)
            {
                case 'Zenek Martyniuk':
                    explorer.content = [{type: 'file', name: 'Przez Twe oczy zielone.mp3'}, {type: 'file', name: 'Przekorny los.avi'}]
                    break;
                case 'Music':
                    explorer.content = [{type: 'folder', name: 'Shakira'}, {type: 'folder', name: 'Zenek Martyniuk'}]
                    break;
                case 'Shakira':
                    explorer.content = [{type: 'file', name: 'La La La (Brazil 2014).mp3'}, {type: 'file', name: 'Waka Waka.flac'}]
                    break;
            }
        }
    </script>
    <div style="display: flex; gap: var(--spacing-md); flex-direction: column;">
        <onyks-path id="path" @path-change=${(e:any) => 
        {
            console.log(e.detail.path[e.detail.path.length - 1])
            updateExplorer(e.detail.path[e.detail.path.length - 1])     
        }} .content=${['Music']}></onyks-path>
        <onyks-file-explorer id="explorer" style="width: 100%"
            .content=${[{type: 'folder', name: 'Shakira'}, {type: 'folder', name: 'Zenek Martyniuk'}]}
            @enter-folder=${(e:any) => 
            {
                const path = document.querySelector('#path')
                path.content = [...path.content, e.detail.folder.name];
                updateExplorer(e.detail.folder.name)
            }}
        >
        </onyks-file-explorer>
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
<script>
    let updateExplorer = (folderName) => 
    {
        const explorer = document.querySelector('#explorer')
        switch(folderName)
        {
            case 'Zenek Martyniuk':
                explorer.content = [{type: 'file', name: 'Przez Twe oczy zielone.mp3'}, {type: 'file', name: 'Przekorny los.avi'}]
                break;
            case 'Music':
                explorer.content = [{type: 'folder', name: 'Shakira'}, {type: 'folder', name: 'Zenek Martyniuk'}]
                break;
            case 'Shakira':
                explorer.content = [{type: 'file', name: 'La La La (Brazil 2014).mp3'}, {type: 'file', name: 'Waka Waka.flac'}]
                break;
        }
    }

    const path = document.querySelector('#path')
    path.addEventListener('path-change', (e) => {updateExplorer(e.detail.path[e.detail.path.length - 1])})
    path.content = ['Music']

    const explorer = document.querySelector('#explorer')
    explorer.content = [{type: 'folder', name: 'Shakira'}, {type: 'folder', name: 'Zenek Martyniuk'}]
    explorer.addEventListener('enter-folder', (e) => {
        const path = document.querySelector('#path')
        path.content = [...path.content, e.detail.folder.name];
        updateExplorer(e.detail.folder.name)
    })
</script>

<div style="display: flex; gap: var(--spacing-md); flex-direction: column;">
    <onyks-path id="path"></onyks-path>
    <onyks-file-explorer id="explorer" style="width: 100%"></onyks-file-explorer>
</div>
`;
                }
            },
        }
    }
};