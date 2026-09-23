import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';



const meta: Meta = 
{
    title: 'ONYKS WebUI/Toast',
    component: 'onyks-toast',
    tags: ['autodocs'],
    
    render: (_args) => html`
        <onyks-container type="stack" gap="m">
            <onyks-toast-container id="toast-container">
                <onyks-toast corner-close>Without set duration time</onyks-toast>
                <onyks-toast duration="3000">With 3 seconds duration time</onyks-toast>
                

                <onyks-toast type="info" duration="5000">
                    <onyks-container type="stack" style="width: 100%;" gap="s">
                        <onyks-text>The data are being sending...</onyks-text>
                        <onyks-text></onyks-text>
                        <onyks-loading-bar size="l" current-state="60" max="120" color="green" animated striped></onyks-loading-bar>
                    </onyks-container>
                </onyks-toast>
            </onyks-toast-container>

            <onyks-container type="group" gap="m">
                <onyks-button background="blue" @click="${() =>
                {
                    let container = document.querySelector("#toast-container")
                    console.log('ss')
                    let alert = document.createElement('onyks-toast')
                    alert.type = 'error'
                    alert.innerHTML = 'There is an error!';
                    container?.appendChild(alert)
                }}">Example 1</onyks-button>
                <onyks-button background="yellow" @click="${() =>
                {
                    let container: any = document.querySelector("#toast-container")
                    let toast = document.createElement('onyks-toast')
                    toast.type = 'warning'

                    let content = document.createElement('onyks-container')
                    content.gap = 'm'
                    content.type = 'stack'
                    content.style.width = '100%'

                    let text = document.createElement('onyks-text')
                    text.innerHTML = 'Downloading...'

                    let loading: any = document.createElement('onyks-loading-bar')
                    loading.size = 'l'
                    loading.maxValue = 100
                    loading.striped = true
                    loading.animated = true
                    loading.background = 'yellow'
                    
                    let x = setInterval(() => 
                    {
                      loading.currentState += 20
                      if(loading.currentState == 100)
                      {
                        clearInterval(x)
                        setTimeout(() => {
                          toast.remove()
                        }, 300)
                      }
                    }, 1000)
                    
                    content.appendChild(text)
                    content.appendChild(loading)
                    toast.appendChild(content)
                    container.appendChild(toast)
                }}">Example 2</onyks-button>
            </onyks-container>
        </onyks-container>


    `,

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
            // const { _args } = storyContext;
            return `        <onyks-container type="stack" gap="m">
            <onyks-toast-container id="toast-container">
                <onyks-toast corner-close>Without set duration time</onyks-toast>
                <onyks-toast duration="3000">With 3 seconds duration time</onyks-toast>
                

                <onyks-toast type="info" duration="5000">
                    <onyks-container type="stack" style="width: 100%;" gap="s">
                        <onyks-text>The data are being sending...</onyks-text>
                        <onyks-text></onyks-text>
                        <onyks-loading-bar size="l" current-state="60" max="120" color="green" animated striped></onyks-loading-bar>
                    </onyks-container>
                </onyks-toast>
            </onyks-toast-container>

            <onyks-container type="group" gap="m">
                <onyks-button background="blue" @click="${() =>
                {
                    let container: any = document.querySelector("#toast-container")
                    console.log('ss')
                    let alert = document.createElement('onyks-toast')
                    alert.type = 'error'
                    alert.innerHTML = 'There is an error!';
                    container.appendChild(alert)
                }}">Example 1</onyks-button>
                <onyks-button background="yellow" @click="${() =>
                {
                    let container: any = document.querySelector("#toast-container")
                    let toast = document.createElement('onyks-toast')
                    toast.type = 'warning'

                    let content = document.createElement('onyks-container')
                    content.gap = 'm'
                    content.type = 'stack'
                    content.style.width = '100%'

                    let text = document.createElement('onyks-text')
                    text.innerHTML = 'Downloading...'

                    let loading: any = document.createElement('onyks-loading-bar')
                    loading.size = 'l'
                    loading.maxValue = 100
                    loading.striped = true
                    loading.animated = true
                    loading.background = 'yellow'
                    
                    let x = setInterval(() => 
                    {
                      loading.currentState += 20
                      if(loading.currentState == 100)
                      {
                        clearInterval(x)
                        setTimeout(() => {
                          toast.remove()
                        }, 300)
                      }
                    }, 1000)
                    
                    content.appendChild(text)
                    content.appendChild(loading)
                    toast.appendChild(content)
                    container.appendChild(toast)
                }}">Example 2</onyks-button>
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