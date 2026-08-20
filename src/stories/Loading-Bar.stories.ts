import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
    title: 'ONYKS WebUI/Loading Bar',
    component: 'onyks-loading-bar',
    tags: ['autodocs'],
    argTypes: {
        max: {
            control: 'number',
            description: 'Maximum value of the bar (e.g., 120).',
            table: { category: 'Logic' }
        },
        'current-state': {
            control: 'number',
            description: 'Current value of the bar (e.g., 60).',
            table: { category: 'Logic' }
        },
        color: {
            control: 'select',
            options: ['red', 'blue', 'green', 'yellow', 'gray'],
            description: 'Color of the progress bar.',
            table: { category: 'Appearance' }
        },
        size: {
            control: 'select',
            options: ['s', 'm', 'l', 'xl'],
            description: 'Thickness of the bar.',
            table: { category: 'Appearance' }
        },
        striped: {
            control: 'boolean',
            description: 'Adds a diagonal striped texture.',
            table: { category: 'Appearance' }
        },
        animated: {
            control: 'boolean',
            description: 'Animates the striped texture (requires `striped` to be enabled).',
            table: { category: 'Appearance' }
        },
        'show-percentage': {
            control: 'boolean',
            description: 'Displays the percentage progress text above the bar.',
            table: { category: 'Appearance' }
        }
    },
    render: (args) => html`
        <onyks-loading-bar 
            max=${args.max} 
            current-state=${args['current-state']}
            color=${args.color}
            size=${args.size}
            ?striped=${args.striped}
            ?animated=${args.animated}
            ?show-percentage=${args['show-percentage']}
        ></onyks-loading-bar>
    `
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    args: {
        max: 120,
        'current-state': 60,
        color: 'blue',
        size: 'm',
        striped: false,
        animated: false,
        'show-percentage': false
    }
};

export const WithPercentageAndStripes: Story = {
    args: {
        max: 200,
        'current-state': 150,
        color: 'green',
        size: 'l',
        striped: true,
        animated: true,
        'show-percentage': true
    }
};

export const Colors: Story = {
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 20px;">
            <onyks-loading-bar max="100" current-state="80" color="red" size="m"></onyks-loading-bar>
            <onyks-loading-bar max="100" current-state="60" color="blue" size="m"></onyks-loading-bar>
            <onyks-loading-bar max="100" current-state="40" color="green" size="m"></onyks-loading-bar>
            <onyks-loading-bar max="100" current-state="70" color="yellow" size="m"></onyks-loading-bar>
            <onyks-loading-bar max="100" current-state="30" color="gray" size="m"></onyks-loading-bar>
        </div>
    `
};

export const InteractiveSimulation: Story = {
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 20px;">
            <onyks-loading-bar id="sim-bar" max="100" current-state="0" color="blue" size="l" striped animated show-percentage></onyks-loading-bar>
            
            <div style="display: flex; gap: 10px;">
                <button 
                    style="padding: 8px 16px; cursor: pointer; background: var(--onyks-blue); color: white; border: none; border-radius: 4px;"
                    @click=${() => {
                        const bar = document.getElementById('sim-bar');
                        if (!bar) return; 
                        
                        let current = 0;
                        bar.setAttribute('current-state', '0');
                        
                        const interval = setInterval(() => {
                            current += Math.floor(Math.random() * 15) + 5; 
                            if (current >= 100) {
                                current = 100;
                                clearInterval(interval);
                                bar.setAttribute('color', 'green'); 
                                bar.removeAttribute('animated'); 
                            }
                            bar.setAttribute('current-state', current.toString());
                        }, 500);
                    }}
                >
                    Start download
                </button>
                <button 
                    style="padding: 8px 16px; cursor: pointer; background: var(--onyks-surface-2); color: white; border: none; border-radius: 4px;"
                    @click=${() => {
                        const bar = document.getElementById('sim-bar');
                        if (!bar) return; 
                        
                        bar.setAttribute('current-state', '0');
                        bar.setAttribute('color', 'blue');
                        bar.setAttribute('animated', 'true');
                    }}
                >
                    Reset
                </button>
            </div>
        </div>
    `,
    parameters: {
        docs: {
            description: {
                story: 'Click the button to see how the bar smoothly reacts to `current-state` attribute changes in real-time.'
            }
        }
    }
};