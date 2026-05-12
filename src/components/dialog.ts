import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('onyks-dialog')
export class Onyks_Dialog extends LitElement {
    @property({type: Boolean, reflect: true }) opened = false;
    @property({type: String, reflect: true  }) title = ''; 
    @property({type: Boolean, reflect: true }) noTitle = false;
    @property({type: Boolean, reflect: true }) cornerClose = true;
    @property({type: Boolean, reflect: true }) modal = false;

    private _shakeTimeout: number | undefined;

    static styles = css`
        :host 
        { 
            display: block; 
            z-index: 1000;
            font-family: var(--font, inherit);
        }
        
        .backdrop {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease;
            z-index: 1000;
            padding: 20px;
            backdrop-filter: blur(4px);
        }



        :host([opened]) .backdrop {
            opacity: 1;
            visibility: visible;
        }

        .dialog-container {
            background: var(--surface-element);
            color: var(--text-primary);
            border: 1px solid var(--surface-border);
            border-radius: var(--radius-md);
            box-shadow: 0 11px 15px -7px rgba(0,0,0,.2), 0 24px 38px 3px rgba(0,0,0,.14), 0 9px 46px 8px rgba(0,0,0,.12);
            width: 100%;
            max-width: 600px;
            max-height: 80%;
            display: flex;
            flex-direction: column;
            position: relative;
            transform: scale(0.9);
            transition: transform 0.3s ease;
        }

        :host([opened]) .dialog-container {
            transform: scale(1);
        }

        .dialog-container.shake-active {
            animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }

        @keyframes shake {
            10%, 90% {transform: translate3d(-1px, 0, 0) scale(1);}
            20%, 80% {transform: translate3d(2px, 0, 0) scale(1);}
            30%, 50%, 70% { transform: translate3d(-4px, 0, 0) scale(1);}
            40%, 60% {transform: translate3d(4px, 0, 0) scale(1);}
        }

        .dialog-header {
            padding: var(--spacing-md) var(--spacing-lg);
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid var(--surface-border);
            font-size: 1.25rem;
            font-weight: 500;
            flex-shrink: 0;
            min-height: 30px;
        }

        .close-btn {
            background: none;
            border: none;
            cursor: pointer;
            font-size: 1.5rem;
            line-height: 1;
            padding: 4px 8px;
            color: var(--text-secondary);
            border-radius: var(--radius-sm);
            margin-left: auto;
            transition: all 0.2s ease;
        }

        .close-btn:hover { 
            background-color: var(--surface-hover);
            color: var(--color-primary); /* Czerwony hover oznacza zamknięcie */
        }

        .dialog-content {
            padding: var(--spacing-lg);
            overflow-y: auto;
            flex: 1;
            display: flex;
            flex-direction: column;
            color: var(--text-secondary); /* Długie teksty lepiej się czyta w lekko zgaszonym kolorze */
            line-height: 1.5;
        }

        .dialog-footer {
            padding: var(--spacing-md) var(--spacing-lg);
            border-top: 1px solid var(--surface-border);
            display: flex;
            justify-content: flex-end;
            gap: var(--spacing-md);
            flex-shrink: 0;
            background-color: var(--surface-hover); /* Subtelne odcięcie stopki */
            border-bottom-left-radius: var(--radius-md);
            border-bottom-right-radius: var(--radius-md);
        }
    `;

    private _close() {
        this.dispatchEvent(new CustomEvent('dialog-closed', { bubbles: true, composed: true }));
        this.opened = false;
    }

    private _handleBackdropClick(e: Event) {
        if (e.target !== e.currentTarget) return;

        if (this.modal) {
            const container = this.shadowRoot?.querySelector<HTMLElement>('.dialog-container');
            if (!container) return;

            if (this._shakeTimeout) clearTimeout(this._shakeTimeout);

            container.classList.remove('shake-active');
            void container.offsetWidth;
            container.classList.add('shake-active');

            this._shakeTimeout = window.setTimeout(() => {
                container.classList.remove('shake-active');
                this._shakeTimeout = undefined;
            }, 500);
            return;
        }
        this._close();
    }

    render() {
        return html`
            <div class="backdrop" @click="${this._handleBackdropClick}">
                <div class="dialog-container" role="dialog" aria-modal="true">
                    
                    ${this.noTitle ? html`
                        <div class="dialog-header">
                            <span>${this.title}</span>
                            ${this.cornerClose ? html`
                                <button class="close-btn" @click="${this._close}">&times;</button>
                            ` : ''}
                        </div>
                    ` : html`
                         ${this.cornerClose ? html`
                                <button class="close-btn" 
                                        style="position: absolute; top: 10px; right: 10px; z-index: 1;" 
                                        @click="${this._close}">&times;</button>
                         ` : ''}
                    `}

                    <div class="dialog-content">
                        <slot></slot>
                    </div>

                    <div class="dialog-footer">
                        <slot name="footer"></slot>
                    </div>
                </div>
            </div>
        `;
    }
}

@customElement('onyks-dialog-content')
export class Onyks_Dialog_Content extends LitElement 
{
    render()
    {
        return html`<slot></slot>`;
    }
}




declare global {
    interface HTMLElementTagNameMap {
        'onyks-dialog': Onyks_Dialog,
        'onyks-dialog-content': Onyks_Dialog_Content
    }
}