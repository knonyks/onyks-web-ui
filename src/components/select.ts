import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { onyksStyleScrollbar, onyksStyleSize } from './_styles';

@customElement('onyks-select')
export class OnyksSelect extends LitElement 
{
    @property({ type: Boolean, reflect: true }) multiple = false;
    @property({ type: Boolean, reflect: true }) unselect = false;
    @property({ type: String, reflect: true }) size = 'm';

    private contentElement: HTMLElement | null = null;
    private resizeObserver: ResizeObserver | null = null;
    private mutationObserver: MutationObserver | null = null;

    private _handleItemClick = (e: any) => 
    {
        const target = e.composedPath()[0] as OnyksSelectOption;
        
        if(this.multiple)
        {
            target.selected = !target.selected;
        }
        else
        {
            if(this.unselect && target.selected) return;
            
            Array.from(this.querySelectorAll('onyks-select-option')).forEach((option) => 
            {
                if(option.selected && option !== target) {
                    option.selected = false;
                }
            });
            target.selected = !target.selected;
        }        
    }

    private _checkScroll = () => 
    {
        if (this.contentElement) {
            const hasScroll = this.contentElement.scrollHeight > this.contentElement.clientHeight;
            if (hasScroll) {
                this.shadowRoot?.querySelector('.content')?.classList.add('has-scroll');
            } else {
                this.shadowRoot?.querySelector('.content')?.classList.remove('has-scroll');
            }
        }
    }

    connectedCallback() 
    {
        super.connectedCallback();
        this.resizeObserver = new ResizeObserver(this._checkScroll);
        this.mutationObserver = new MutationObserver(this._checkScroll);
    }

    disconnectedCallback() 
    {
        super.disconnectedCallback();
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
        if (this.mutationObserver) {
            this.mutationObserver.disconnect();
        }
    }

    firstUpdated() 
    {
        this.contentElement = this.shadowRoot?.querySelector('.content') as HTMLElement;
        if (this.contentElement && this.resizeObserver) {
            this.resizeObserver.observe(this.contentElement);
        }
        
        this.mutationObserver?.observe(this, {
            childList: true,
            subtree: true
        });
        
        this._checkScroll();
    }

    getSelectedItems()
    {
        let filtered = Array.from(this.querySelectorAll('onyks-select-option')).filter((item) => item.selected == true);
        return filtered.map((e) => e.value)
    }

    render()
    {
        return html`
            <div class="content onyks-size onyks-scrollbar" @click=${this._handleItemClick}>
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

        ::slotted(*)
        {
            margin-right: 0;
        }

        .content.has-scroll ::slotted(*)
        {
            margin-right: 20px;
        }
    `, onyksStyleSize, onyksStyleScrollbar];
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
            border: 1px solid var(--onyks-surface-1-border);
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