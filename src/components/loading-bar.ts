import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { OnyksStyles } from '../utils/styles';

@customElement('onyks-loading-bar')
export class OnyksLoadingBar extends LitElement 
{
    @property({ type: Number, reflect: true }) max = 100;
    @property({ type: Number, attribute: 'current-state', reflect: true }) currentState = 0;
    @property({ type: String, reflect: true }) background: 'red' | 'blue' | 'green' | 'yellow' | 'gray' = 'blue';
    @property({ type: String, reflect: true }) size: 's' | 'm' | 'l' | 'xl' = 'm';
    @property({ type: Boolean, reflect: true }) striped = false;
    @property({ type: Boolean, reflect: true }) animated = false;
    @property({ type: String, reflect: true }) radius: 's' | 'm' | 'l' | 'xl' = 'm';

    get percentage() 
    {
        if (this.max <= 0) return 0;
        const calc = (this.currentState / this.max) * 100;
        return Math.min(100, Math.max(0, calc)); 
    }

    render() 
    {
        return html`
            <div class="track">
                <div class="fill ${this.striped ? 'striped' : ''} ${this.animated ? 'animated' : ''}" 
                    style="width: ${this.percentage}%;">
                </div>
            </div>
        `;
    }

    static styles = [css`
        :host 
        {
            display: block;
            width: 100%;
        }

        .track 
        {
            width: 100%;
            background-color: var(--onyks-surface-2);
            overflow: hidden;
            position: relative;
            box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
            border: 1px solid var(--onyks-surface-1-border);
        }

        .fill {
            height: 100%;
            transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            --bar-color: var(--onyks-blue, #3b82f6);
            background-color: var(--bar-color);
            box-shadow: 0 0 10px calc(var(--bar-color) + 40%);
        }

        :host([size="s"]) .track 
        { 
            height: var(--onyks-size-sm);
        }

        :host([size="m"]) .track 
        { 
            height: var(--onyks-size-md);
        }

        :host([size="l"]) .track 
        { 
            height: var(--onyks-size-lg);
        }

        :host([size="xl"]) .track 
        {
            height:  var(--onyks-size-xl);
        }

        .fill.striped 
        {
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

        .fill.animated 
        {
            animation: progress-stripes 1s linear infinite;
        }

        @keyframes progress-stripes 
        {
            from { background-position: 1rem 0; }
            to { background-position: 0 0; }
        }
    `, OnyksStyles.radius('.track'), OnyksStyles.radius('.fill'), OnyksStyles.background('.fill')];
}