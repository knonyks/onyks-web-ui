import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { OnyksStyles } from '../utils/styles';

@customElement('onyks-card')
export class OnyksCard extends LitElement 
{
    @property({ type: String }) 
    title = "";

    @property({ type: String, reflect: true }) 
    size = 'm';

    @property({ type: String, attribute: 'title-size', reflect: true }) 
    titleSize = "m";
        
    @property({ type: String, attribute: 'padding', reflect: true })
    padding = 'm'

    @property({ type: String, attribute: 'gap', reflect: true })
    gap = 'm'

    @property({ type: Boolean, reflect: true })
    animated = false

    static styles = [css`
        :host 
        {
            display: flex;
            flex-direction: column;
            background-color: var(--onyks-surface-1);
            border: 1px solid var(--onyks-surface-1-border);
            border-radius: var(--onyks-radius-md);
            box-sizing: border-box;
            color: var(--onyks-on-surface-1);
            font-family: var(--onyks-font);
            height: 100%;
            overflow-wrap: anywhere;
            word-break: break-word;
            min-width: 0;
            transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }

        :host([animated]:hover)
        {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.4);
            border-color: var(--onyks-accent);
            z-index: 1;
        }

        ::slotted(img) 
        {
            max-width: 100%;
            height: auto;
            border-radius: var(--onyks-radius-sm);
        }
    `, OnyksStyles.size('.content'), OnyksStyles.gap(), OnyksStyles.padding()];

    render() 
    {
        return html`
            ${this.title ? html`<onyks-header class="title" size=${this.titleSize}>${this.title}</onyks-header>` : ''}
            <div class="content"><slot></slot></div>`;
    }
}

declare global 
{
    interface HTMLElementTagNameMap 
    {
        'onyks-card': OnyksCard
    }
}