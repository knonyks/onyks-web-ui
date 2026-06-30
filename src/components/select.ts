import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { applyStyle } from './_styles';

@customElement('onyks-select')
export class OnyksSelect extends LitElement 
{
    @property({ type: Boolean, reflect: true }) multiple = true;
    @property({ type: String, reflect: true }) size = 'm';

    private _handleItemClick = (e: any) => 
    {
        const target = e.composedPath()[0] as OnyksSelectOption;
        
        if(this.multiple)
        {
            target.selected = !target.selected;
        }
        else
        {
            Array.from(this.querySelectorAll('onyks-select-option')).forEach((option) => 
            {
                if(option.selected && option !== target) {
                    option.selected = false;
                }
            });
            target.selected = !target.selected;
        }        
    }

    getSelectedItems()
    {
        let filtered = Array.from(this.querySelectorAll('onyks-select-option')).filter((item) => item.selected == true);
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
            background-color: var(--onyks-surface-1);
            border: 1px solid var(--onyks-surface-1-border);
            width: 400px;
            height: 400px;
            padding: var(--onyks-spacing-md);
            border-radius: var(--onyks-radius-xl);
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
            gap: var(--onyks-spacing-sm);
        }
    `, applyStyle('size')];
}

@customElement('onyks-select-option')
export class OnyksSelectOption extends LitElement 
{
    @property({ type: Boolean, reflect: true }) selected = false;
    @property({ type: String, reflect: true }) value = "";

    render() 
    {
        return html`<slot></slot>`;
    }

    static styles = css`
        :host
        {
            padding: var(--onyks-spacing-md);
            border-radius: var(--onyks-radius-md);
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
            border: 1px solid var(--onyks-surface-1-hover);
        }

        :host([selected])
        {
            background-color: var(--onyks-surface-1-selected);
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