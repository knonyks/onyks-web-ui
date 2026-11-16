import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { OnyksSchemas } from '../utils/styles';

const meta: Meta = {
    title: 'ONYKS WebUI/Loading Bar',
    component: 'onyks-loading-bar',
    tags: ['autodocs'],
    argTypes: 
    {
        max: 
        {
            control: 'number',
            description: 'Maximum value of the bar (e.g., 120).',
            table: { category: 'properties' }
        },
        'current-state': {
            control: 'number',
            description: 'Current value of the bar (e.g., 60).',
            table: { category: 'properties' }
        },
        background: {
            control: 'select',
            options: OnyksSchemas.background,
            description: 'Color of the progress bar.',
            table: { category: 'properties' }
        },
        size: {
            control: 'select',
            options: ['s', 'm', 'l', 'xl'],
            description: 'Thickness of the bar.',
            table: { category: 'properties' }
        },
        striped: {
            control: 'boolean',
            description: 'Adds a diagonal striped texture.',
            table: { category: 'properties' }
        },
        animated: {
            control: 'boolean',
            description: 'Animates the striped texture (requires `striped` to be enabled).',
            table: { category: 'properties' }
        },
        radius:
        {   
            control: { type: 'select' },
            options: OnyksSchemas.radius,
            table:
            {
                category: 'properties'
            }
        },
    },
    render: (args) => html`
        <onyks-loading-bar 
            max=${args.max} 
            current-state=${args['current-state']}
            background=${args.background}
            size=${args.size}
            ?striped=${args.striped}
            ?animated=${args.animated}
            radius=${args.radius}
        ></onyks-loading-bar>
    `
};

export default meta;
type Story = StoryObj;

export const Default: Story = 
{
    args: 
    {
        max: 120,
        'current-state': 60,
        background: 'blue',
        size: 'm',
        striped: false,
        animated: false,
        radius: 'm'
    }
};

export const Colors: Story = {
    render: () => html`
        <onyks-container align="center" justify="center" type="stack" gap="m">
            <onyks-loading-bar max="100" current-state="80" background="red" size="m"></onyks-loading-bar>
            <onyks-loading-bar max="100" current-state="60" background="blue" size="m"></onyks-loading-bar>
            <onyks-loading-bar max="100" current-state="40" background="green" size="m"></onyks-loading-bar>
            <onyks-loading-bar max="100" current-state="70" background="yellow" size="m"></onyks-loading-bar>
            <onyks-loading-bar max="100" current-state="30" background="gray" size="m"></onyks-loading-bar>
        </onyks-container>
    `
};

export const InteractiveSimulation: Story = {
    render: () => html`
        <onyks-container type="stack" justify="center" align="start" gap="m">
            <onyks-loading-bar id="bar" max="100" current-state="0" color="blue" size="l" striped animated></onyks-loading-bar>
            
            <onyks-container gap="m" type="group">
                <onyks-button background="lime" size="s"
                    
                    @click=${() => 
                    {
                        const bar = document.getElementById('bar') as (HTMLElement & { currentState: number | string; background: string }) | null;
                        if (!bar) return;
                        
                        let current = 0;
                        bar.currentState = 0
                        
                        const interval = setInterval(() => 
                        {
                            current += Math.floor(Math.random() * 15) + 5; 
                            if (current >= 100) 
                            {
                                current = 100;
                                clearInterval(interval);
                                bar.background = 'indigo'
                            }
                            bar.currentState = current.toString()
                        }, 500);
                    }}
                >
                    Start download
                </onyks-button >
                <onyks-button background="indigo" size="s" 
                    @click=${() => {
                        const bar = document.getElementById('bar') as (HTMLElement & { currentState: number | string; background: string }) | null;
                        if (!bar) return;
                        bar.currentState = 0
                        bar.background = 'lime'                 
                    }}
                >
                    Reset
                </onyks-button>
            </onyks-container>
        </onyks-container>
    `,
    parameters: 
    {
        docs: 
        {
            description: 
            {
                story: 'Click the button to see how the bar smoothly reacts to `current-state` attribute changes in real-time.'
            },
            source:
            {
                transform: (_originalCode: string) => 
                {
                    return `
<script>
    let start = document.querySelector("#start")
    let reset = document.querySelector("#reset")
    
    start.addEventListener('click', () => 
    {
        const bar = document.querySelector('onyks-loading-bar');
        if (!bar) return;
        
        let current = 0;
        bar.currentState = 0
        
        const interval = setInterval(() => 
        {
            current += Math.floor(Math.random() * 15) + 5; 
            if (current >= 100) 
            {
                current = 100;
                clearInterval(interval);
                bar.background = 'indigo'
            }
            bar.currentState = current.toString()
        }, 500);
    })

    reset.addEventListener('click', () => 
    {
        const bar = document.querySelector('onyks-loading-bar');
        if (!bar) return;
        bar.currentState = 0
        bar.background = 'lime'                 
    })
</script>

<onyks-container type="stack" justify="center" align="start" gap="m">
    <onyks-loading-bar id="bar" max="100" current-state="0" color="blue" size="l" striped animated></onyks-loading-bar>

    <onyks-container gap="m" type="group">
        <onyks-button background="lime" size="s" id="start">Start download</onyks-button>
        <onyks-button background="indigo" size="s" id="reset">Reset</onyks-button>
    </onyks-container>
</onyks-container>
                    `;
                }
            },
        }
    }
};