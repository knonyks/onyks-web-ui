import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('onyks-loading-bar')
export class Onyks_LoadingBar extends LitElement {
    @property({ type: Number }) max = 100;
    @property({ type: Number, attribute: 'current-state' }) currentState = 0;
    @property({ type: String, reflect: true }) color: 'red' | 'blue' | 'green' | 'yellow' | 'gray' = 'blue';
    @property({ type: String, reflect: true }) size: 's' | 'm' | 'l' | 'xl' = 'm';
    @property({ type: Boolean }) striped = false;
    @property({ type: Boolean }) animated = false;
    @property({ type: Boolean, attribute: 'show-percentage' }) showPercentage = false;

    get percentage() {
        if (this.max <= 0) return 0;
        const calc = (this.currentState / this.max) * 100;
        return Math.min(100, Math.max(0, calc)); 
    }

    render() {
        const percentValue = Math.round(this.percentage);

        return html`
            <div class="wrapper">
                ${this.showPercentage ? html`
                    <div class="label-container">
                        <span class="percentage-text">${percentValue}%</span>
                    </div>
                ` : ''}
                
                <div class="track">
                    <div 
                        class="fill ${this.striped ? 'striped' : ''} ${this.animated ? 'animated' : ''}" 
                        style="width: ${this.percentage}%;"
                    ></div>
                </div>
            </div>
        `;
    }

    static styles = css`
        :host {
            display: block;
            width: 100%;
            font-family: var(--onyks-font, system-ui, sans-serif);
        }

        .wrapper {
            display: flex;
            flex-direction: column;
            gap: var(--onyks-spacing-sm, 8px);
            width: 100%;
        }

        .label-container {
            display: flex;
            justify-content: flex-end;
        }

        .percentage-text {
            font-size: var(--onyks-size-sm, 12px);
            font-weight: 600;
            color: var(--onyks-on-surface-1, #fff);
            letter-spacing: 0.5px;
        }

        .track {
            width: 100%;
            background-color: var(--onyks-surface-2, #3a3c40);
            border-radius: var(--onyks-radius-xl, 16px);
            overflow: hidden;
            position: relative;
            box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
        }

        .fill {
            height: 100%;
            border-radius: var(--onyks-radius-xl, 16px);
            transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            --bar-color: var(--onyks-blue, #3b82f6);
            background-color: var(--bar-color);
            box-shadow: 0 0 10px calc(var(--bar-color) + 40%);
        }

        :host([color="red"]) .fill { --bar-color: var(--onyks-red, #ef4444); }
        :host([color="blue"]) .fill { --bar-color: var(--onyks-blue, #3b82f6); }
        :host([color="green"]) .fill { --bar-color: var(--onyks-green, #10b981); }
        :host([color="yellow"]) .fill { --bar-color: var(--onyks-yellow, #f59e0b); }
        :host([color="gray"]) .fill { --bar-color: var(--onyks-gray, #64748b); }

        :host([size="s"]) .track { height: 6px; }
        :host([size="m"]) .track { height: 10px; }
        :host([size="l"]) .track { height: 16px; }
        :host([size="xl"]) .track { height: 24px; }

        .fill.striped {
            background-image: linear-gradient(
                45deg, 
                rgba(255, 255, 255, 0.15) 25%, 
                transparent 25%, 
                transparent 50%, 
                rgba(255, 255, 255, 0.15) 50%, 
                rgba(255, 255, 255, 0.15) 75%, 
                transparent 75%, 
                transparent
            );
            background-size: 1rem 1rem;
        }

        .fill.animated {
            animation: progress-stripes 1s linear infinite;
        }

        @keyframes progress-stripes {
            from { background-position: 1rem 0; }
            to { background-position: 0 0; }
        }
    `;
}