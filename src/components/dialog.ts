import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { onyksStyleScrollbar } from './_styles';

@customElement('onyks-dialog')
export class OnyksDialog extends LitElement 
{
    @property({type: Boolean, reflect: true }) 
    open = false;

    @property({type: String, reflect: true  }) 
    title = '';

    @property({type: Boolean, reflect: true, attribute: 'corner-close' }) 
    cornerClose = false;
    
    @property({type: Boolean, reflect: true, attribute: 'bottom-buttons' }) 
    bottomButtons = false;
    
    @property({type: Boolean, reflect: true }) 
    modal = false;

    @property({type: String, reflect: true, attribute: 'scroll-target' }) 
    scrollTarget = 'body';

    @property({type: Boolean, reflect: true, attribute: 'no-title' }) 
    noTitle = false;

    private _shakeTimeout: number | undefined;

    private _close() 
    {
        this.dispatchEvent(new CustomEvent('dialog-close', { bubbles: true, composed: true }));
        this.open = false;
    }

    private _handleBackdropClick(e: Event) 
    {
        if (e.target !== e.currentTarget) return;

        if (this.modal) 
        {
            const container = this.shadowRoot?.querySelector<HTMLElement>('.dialogContainer');
            if (!container) return;

            if (this._shakeTimeout) clearTimeout(this._shakeTimeout);

            container.classList.remove('shakeActive');
            void container.offsetWidth;
            container.classList.add('shakeActive');

            this._shakeTimeout = window.setTimeout(() => 
            {
                container.classList.remove('shakeActive');
                this._shakeTimeout = undefined;
            }, 500);
            return;
        }
        this._close();
    }

    static styles = [css`
        :host
        {
            display: block;
            opacity: 0;
            transition: opacity 0.3s ease, visibility 0.3s ease;
            visibility: hidden;
            z-index: 1000;
            font-family: var(--onyks-font);
        }

        :host([open])
        {
            opacity: 1;
            visibility: visible;
        }

        .dialogBackdrop
        {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: hsla(0, 0%, 0%, 0.5);
            backdrop-filter: blur(4px);
            padding: var(--onyks-spacing-lg);
            box-sizing: border-box;
        }

        .dialogContainer.shakeActive 
        {
            animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }

        @keyframes shake 
        {
            10%, 90% {transform: translate3d(-1px, 0, 0) scale(1);}
            20%, 80% {transform: translate3d(2px, 0, 0) scale(1);}
            30%, 50%, 70% { transform: translate3d(-4px, 0, 0) scale(1);}
            40%, 60% {transform: translate3d(4px, 0, 0) scale(1);}
        }

        .dialogContainer
        {
            background: var(--onyks-surface-1);
            border: 1px solid var(--onyks-surface-1-border);
            border-radius: var(--onyks-radius-md);
            max-width: 800px;
            width: 100%;
            max-height: 400px; 
            /* height: 100%; */
            transform: scale(0.9);
            transition: transform 0.3s ease;
            display: flex;
            flex-direction: column;
        }

        :host([open]) .dialogContainer 
        {
            transform: scale(1);
        }

        .dialogTitle
        {
            padding: var(--onyks-spacing-md);
            margin: 0;
            font-size: var(--onyks-size-xl);
            user-select: none;
        }

        .dialogCloseBtn
        {
            position: absolute;
            cursor: pointer;
            right: var(--onyks-spacing-md);
            top: var(--onyks-spacing-md);
            height: fit-content;
            font-size: var(--onyks-size-xl);
            user-select: none;
        }

        .dialogCloseBtn::before
        {
            font-family: 'bootstrap-icons';
            display: block;
            content: '\\F659';
            font-weight: bold;
        }

        .dialogContent
        {
            padding: var(--onyks-spacing-md);
            height: 100%;
            box-sizing: border-box;
            flex: 1;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: var(--onyks-spacing-sm);
            /* flex-shrink: 0; */
        }

        .dialogFooter
        {
            padding: var(--onyks-spacing-md);
            display: flex;
            justify-content: flex-end;
            gap: var(--onyks-spacing-md);
            background-color: var(--onyks-surface-2);
            border-bottom-left-radius: inherit;
            border-bottom-right-radius: inherit;
            user-select: none;
        }

        .dialogFooter ::slotted(onyks-button)
        {
            min-width: 100px;
        }
    `, onyksStyleScrollbar];

    updated(changedProperties: any) 
    {
        super.updated(changedProperties);

        if (changedProperties.has('open')) 
        {
            if (this.scrollTarget === 'none') 
            {
                return;
            }

            const targetElement = document.querySelector(this.scrollTarget) as HTMLElement | null;

            if (targetElement) 
            {
                if (this.open) 
                {
                    targetElement.style.overflow = 'hidden';
                } 
                else 
                {
                    targetElement.style.overflow = '';
                }
            } 
            else 
            {
                console.warn(`OnyksDialog: No element found for scroll-target selector "${this.scrollTarget}".`);
            }
        }
    }

    disconnectedCallback() 
    {
        super.disconnectedCallback();
        if (this.open && this.scrollTarget !== 'none') 
        {
            const targetElement = document.querySelector(this.scrollTarget) as HTMLElement | null;
            if (targetElement) 
            {
                targetElement.style.overflow = '';
            }
        }
    }

    render() {
        return html`
            <div class="dialogBackdrop" @click="${this._handleBackdropClick}">
                <div class="dialogContainer" part="container">
                    ${this.noTitle ? html`<div class="dialogTitle" part="title">${this.title}</div>` : ''}

                    ${this.cornerClose ? html`<div class="dialogCloseBtn" @click="${this._close}"></div>` : ''}
                    <div class="dialogContent onyks-scrollbar" part="content">
                        <slot></slot>
                    </div>
                ${this.bottomButtons ? html`
                    <div class="dialogFooter" part="footer">
                        <slot name="footer"></slot>
                    </div>
                ` : ''}
                </div>
            </div>
        `;
    }
}


declare global 
{
    interface HTMLElementTagNameMap 
    {
        'onyks-dialog': OnyksDialog
    }
}