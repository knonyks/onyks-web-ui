import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { applyStyle } from './_styles';

@customElement('onyks-select')
export class OnyksSelect extends LitElement 
{
    @property({ type: Boolean, reflect: true }) multiple = true;
    @property({ type: String, reflect: true }) size = 'm';

    private _handleItemClick(e: any) 
    {
        if(this.multiple)
        {
            e.composedPath()[0].marked = !e.composedPath()[0].marked
        }
        else
        {
            this.querySelectorAll('onyks-select-option')
            Array.from(this.querySelectorAll('onyks-select-option')).filter((x) => 
            {
                return x.marked == true && x != e.composedPath()[0]
            }).forEach((e) => 
            {
                e.marked = false
            })
            e.composedPath()[0].marked = !e.composedPath()[0].marked
        }        
    }

    getSelectedItems()
    {
        let filtered = Array.from(this.querySelectorAll('onyks-select-option')).filter((item) => item.marked == true);
        return filtered.map((e) => e.value)
    }

    render()
    {
        return html`
            <div class="content" @click=${this._handleItemClick}>
                <slot></slot>
            </div>
        `;
    }

    static styles = [css`
        :host
        {
            background-color: var(--select-background);
            border: 1px solid var(--select-border-color);
            width: 400px;
            height: 400px;
            padding: var(--spacing-md);
            border-radius: var(--radius-xl);
            box-sizing: border-box;
            display: block;
        }

        .content
        {
            display: flex;
            flex-direction: column;
            height: 100%;
            width: 100%;
            overflow-y: auto;
            box-sizing: border-box;
            overscroll-behavior: contain;
            gap: var(--spacing-sm);
        }
    `, applyStyle('size')];
}

@customElement('onyks-select-option')
export class OnyksSelectOption extends LitElement 
{
    @property({ type: Boolean, reflect: true }) marked = false;
    @property({ type: String, reflect: true }) value = "";

    render() 
    {
        return html`<slot></slot>`;
    }

    static styles = css`
        :host
        {
            padding: var(--spacing-md);
            border-radius: var(--radius-md);
            cursor: pointer;
            box-sizing: border-box;
            border: 1px solid transparent;
        }

        :host > * 
        {
            pointer-events: none;
        }

        :host(:hover)
        {
            border: 1px solid var(--select-option-border-color-hover);
        }

        :host([marked])
        {
            background-color: var(--select-option-background-marked);
        }
    `
}

declare global 
{
    interface HTMLElementTagNameMap 
    {
        'onyks-select': OnyksSelect,
        'onyks-select-option': OnyksSelectOption
    }
}