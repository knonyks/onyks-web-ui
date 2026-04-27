import {LitElement, css, html} from 'lit'
import {customElement, property} from 'lit/decorators.js'
import { style_size } from './styles';

@customElement('onyks-pagination-nav')
export class Onyks_Pagination_Nav extends LitElement 
{
    @property({type: Number, reflect: true})
    maxIndex = 10;

    @property({type: Number, reflect: true})
    index = 1;

    @property({type: Number, reflect: true})
    maxView = 5;

    @property({type: Number, reflect: true})
    size = "m";

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
            
            this.dispatchEvent(new CustomEvent('page-changed', 
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
            <button class="btn first" ?disabled="${this.index == 1}" @click="${() => this._changePage(1)}"></button>
            <button class="btn prev" ?disabled="${this.index === 1}" @click="${() => this._changePage(Number(this.index - 1))}"></button>
            ${pages.map(p => html`
                <button class="btn ${p === this.index ? 'active' : ''}" @click="${() => this._changePage(p)}">${p}</button>
            `)}
            <button class="btn next" ?disabled="${this.index == this.maxIndex}" @click="${() => this._changePage(Number(this.index) + 1)}"></button>
            <button class="btn last" ?disabled="${this.index == this.maxIndex}" @click="${() => this._changePage(Number(this.maxIndex))}"></button>
        `;
    }

    static styles = [css`
        :host
        {
            display: flex;
            flex-direction: row;
            gap: var(--spacing-sm);
        }

        .btn
        {
            border-radius: var(--radius-md);
            padding: var(--spacing-sm);
            min-width: var(--spacing-xl);
            text-align: center;
            border: 2px solid var(--surface-border);
            background-color: var(--surface-element);
            color: inherit;
            font-size: inherit;
            cursor: pointer;
            outline: none;
        }

        .btn:hover
        {
            background-color: var(--surface-hover);
        }

        .active
        {
            border: 2px solid var(--color-primary);
            background-color: var(--surface-marked);
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

        .disabled
        {

        }
    `, style_size(":host")];
}

declare global 
{
    interface HTMLElementTagNameMap 
    {
        'onyks-pagination-nav': Onyks_Pagination_Nav
    }
}