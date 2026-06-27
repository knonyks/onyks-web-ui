import {LitElement, css, html, type PropertyValues} from 'lit'
import {customElement, property} from 'lit/decorators.js'
import { onyksStyleSize } from './_styles';

@customElement('onyks-path-chain')
export class OnyksPathChain extends LitElement 
{
    render()
    {
        return html`<div class="content"><slot></slot></div>`;
    }

    static styles = css`
        :host
        {
            display: flex;
            flex-shrink: 0;
            font-family: var(--onyks-font);
        }

        .content
        {
            background-color: var(--onyks-accent);
            color: var(--onyks-on-accent);
            display: block;
            padding: var(--onyks-spacing-sm);
            border-radius: var(--onyks-radius-sm);
            cursor: pointer;
            height: fit-content;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 300px;
            color: black;
            transition: opacity 0.2s;
        }

        .content:hover
        {
            opacity: 0.6;
        }
    `;
}

@customElement('onyks-path')
export class OnyksPath extends LitElement 
{
    @property({ type: String, reflect: true }) size = "m";
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: Array }) content: string[] = [];

    protected updated(_changedProperties: PropertyValues) 
    {
        super.updated(_changedProperties);
        if (_changedProperties.has('content')) 
        {
            setTimeout(() => 
            {
                this.scrollLeft = this.scrollWidth;
            }, 0);
        }
    }

    private _handleItemClick(index: number) 
    {
        if(!this.disabled)
        {
            this.content = this.content.slice(0, index + 1);
            this.dispatchEvent(new CustomEvent('path-change', 
            {
                detail: { path: [...this.content] },
                bubbles: true,
                composed: true
            }));
        }
    }

    render()
    {
        return html`
            ${this.content.map((folder, i) => html`
                <onyks-path-chain class="item onyks-size" @click=${() => this._handleItemClick(i)}>
                    ${folder}
                </onyks-path-chain>
            `)}
        `;
    }

    static styles = [css`
        :host
        {
            background-color: var(--onyks-surface-1);
            width: 100%;
            height: fit-content;
            display: flex;
            flex-direction: row;
            border-radius: 5px;
            padding: var(--onyks-spacing-sm);
            box-sizing: border-box;
            overflow-x: auto;
            gap: var(--onyks-spacing-sm);
            border: 1px solid var(--onyks-surface-1-border);
        }

        onyks-path-chain:not(:last-child)::after 
        {
            font-family: 'bootstrap-icons' !important;
            content: '\\f231';
            color: white;
            align-items: center;
            display: flex;
            margin-left: var(--onyks-spacing-sm);
        }
    `, onyksStyleSize];
}

declare global 
{
    interface HTMLElementTagNameMap 
    {
        'onyks-path': OnyksPath,
        'onyks-path-chain': OnyksPathChain
    }
}