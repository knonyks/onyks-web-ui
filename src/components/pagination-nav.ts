import {LitElement, css, html} from 'lit'
import {customElement, property} from 'lit/decorators.js'
import { applyStyle, onyksStyleSize } from './_styles';

@customElement('onyks-pagination-nav')
export class OnyksPaginationNav extends LitElement 
{
    @property({type: Number, reflect: true, attribute: 'max-index'}) maxIndex = 10;
    @property({type: Number, reflect: true}) index = 1;
    @property({type: Number, reflect: true, attribute: 'max-view'}) maxView = 5;
    @property({type: Number, reflect: true}) size = "m";

    willUpdate(changedProperties: any) 
    {
        if (changedProperties.has('index') || changedProperties.has('maxIndex')) 
        {
            if (this.index < 1) 
            {
                this.index = 1;
            }
            if (this.index > this.maxIndex) 
            {
                this.index = this.maxIndex;
            }
        }
    }

    _changePage(newIndex: any) 
    {
        if (newIndex >= 1 && newIndex <= this.maxIndex && newIndex !== this.index) 
        {
            this.index = newIndex;
            
            this.dispatchEvent(new CustomEvent('page-change', 
            {
                detail: {index: this.index},
                bubbles: true,
                composed: true
            }));
        }
    }

    render() 
    {
        let startPage = Math.max(1, this.index - Math.floor(this.maxView / 2));
        let endPage = startPage + Number(this.maxView - 1);
        
        if (endPage > this.maxIndex) 
        {
            endPage = this.maxIndex;
            startPage = Math.max(1, endPage - this.maxView + 1);
        }

        const pages = [];
        for (let i = startPage; i <= endPage; i++) 
        {
            pages.push(i);
        }

        return html`
            <button class="onyks-size btn first" ?disabled="${this.index == 1}" @click="${() => this._changePage(1)}"></button>
            <button class="onyks-size btn prev" ?disabled="${this.index === 1}" @click="${() => this._changePage(Number(this.index - 1))}"></button>
            ${pages.map(p => html`
                <button class="onyks-size btn ${p === this.index ? 'active' : ''}" @click="${() => this._changePage(p)}">${p}</button>
            `)}
            <button class="onyks-size btn next" ?disabled="${this.index == this.maxIndex}" @click="${() => this._changePage(Number(this.index) + 1)}"></button>
            <button class="onyks-size btn last" ?disabled="${this.index == this.maxIndex}" @click="${() => this._changePage(Number(this.maxIndex))}"></button>
        `;
    }

    static styles = [css`
        :host
        {
            display: flex;
            flex-direction: row;
            gap: var(--onyks-spacing-sm);
            font-family: var(--onyks-font);
        }

        .btn
        {
            border-radius: var(--onyks-radius-md);
            padding: var(--onyks-spacing-sm);
            min-width: var(--onyks-spacing-xl);
            text-align: center;
            border: 3px solid var(--onyks-surface-1-border);
            background-color: var(--onyks-surface-1);
            color: inherit;
            font-size: inherit;
            cursor: pointer;
            outline: none;
            flex-shrink: 0;
            transition: background-color 0.3s ease;
        }

        .btn:hover
        {
            background-color: var(--onyks-surface-1-hover);
        }

        .active
        {
            border: 3px solid var(--onyks-accent);
            background-color: var(--onyks-surface-1-selected);
        }

        .btn:disabled 
        {
            cursor: not-allowed;
            opacity: 0.5;
        }

        .prev::before
        {
            content: '\\F563';
            font-family: 'bootstrap-icons';
            display: block;
        }

        .next::before
        {
            content: '\\F557';
            font-family: 'bootstrap-icons';
            display: block;
        }

        .last::before
        {
            content: '\\F55D';
            font-family: 'bootstrap-icons';
            display: block;
        }

        .first::before
        {
            content: '\\F551';
            font-family: 'bootstrap-icons';
            display: block;
        }
    `, onyksStyleSize];
}

declare global 
{
    interface HTMLElementTagNameMap 
    {
        'onyks-pagination-nav': OnyksPaginationNav
    }
}