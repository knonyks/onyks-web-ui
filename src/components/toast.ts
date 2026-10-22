import {LitElement, css, html} from 'lit'
import type {TemplateResult} from 'lit'
import {customElement, property, state} from 'lit/decorators.js'
import { OnyksStyles } from '../utils/styles';
import { repeat } from 'lit/directives/repeat.js';

export type OnyksToastType = 'info' | 'success' | 'error' | 'warning';

export interface OnyksToastDetail 
{
    message: string | TemplateResult;
    type?: OnyksToastType;
    duration?: number;
}

declare global 
{
    interface WindowEventMap 
    {
        'show-toast': CustomEvent<OnyksToastDetail>;
    }
}

@customElement('onyks-toast')
export class OnyksToast extends LitElement 
{
    @property({ attribute: false }) message = '';
    @property({ type: String, reflect: true }) type = 'info';
    @property({ type: Number }) duration = 4000;
    @property({ type: Boolean, reflect: true }) closing = false;

    private _timer: ReturnType<typeof setTimeout> | undefined;
    
    static styles = css`
        :host 
        {
            display: block;
            animation: slideIn 0.3s ease forwards;
            pointer-events: auto;
        }

        @keyframes slideIn
        {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        :host([closing]) 
        {
            animation: slideOut 0.3s ease forwards;
        }

        @keyframes slideOut 
        {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(20px); }
        }
  `;

    connectedCallback() 
    {
        super.connectedCallback();
        this._startTimer();
    }

    disconnectedCallback() 
    {
        super.disconnectedCallback();
        this._clearTimer();
    }

    _startTimer() 
    {
        if (this.duration > 0) 
        {
            this._timer = setTimeout(() => this._close(), this.duration);
        }
    }

    _clearTimer() 
    {
        clearTimeout(this._timer);
    }

    _close() 
    {
        if (this.closing) return;
        this._clearTimer();
        this.closing = true;

        this.addEventListener('animationend', (e) => 
        {
            if (e.target !== this) return;
            this.dispatchEvent(
            new CustomEvent('toast-remove', 
                {
                    bubbles: true,
                    composed: true,
                    detail: { id: this.id },
                })
            );
        }, { once: true });
    }

  render() 
  {
    return html`
    <onyks-alert role="status" type="${this.type}" closable @close="${this._close}">
        ${this.message}
    </onyks-alert>
    `;
  }
}


@customElement('onyks-toast-container')
export class OnyksToastContainer extends LitElement
{
    @property({ type: String, reflect: true }) gap = 'm';
    @state() toasts: Array<{ id: number; message: string | TemplateResult; type: OnyksToastType; duration: number }> = [];

    static show(message: string | TemplateResult, type: OnyksToastType = 'info', duration = 4000): void 
    {
        window.dispatchEvent(new CustomEvent<OnyksToastDetail>('show-toast', 
            {
                detail: { message, type, duration },
            })
        );
    } 

    static success(message: string | TemplateResult, duration = 4000): void 
    {
        this.show(message, 'success', duration);
    }

    static error(message: string | TemplateResult, duration = 4000): void 
    {
        this.show(message, 'error', duration);
    }

    static info(message: string | TemplateResult, duration = 4000): void 
    {
        this.show(message, 'info', duration);
    }

    static styles = [css`
        :host 
        {
            z-index: 9999;
            display: flex;
            flex-direction: column;
            max-width: 360px;
            width: 100%;
            height: 300px;
            pointer-events: none;
        }
  `, OnyksStyles.gap()];

    connectedCallback() 
    {
        super.connectedCallback();
        this.setAttribute('aria-live', 'polite');
        window.addEventListener('show-toast', this._onShowToast);
    }

    disconnectedCallback() 
    {
        super.disconnectedCallback();
        window.removeEventListener('show-toast', this._onShowToast);
    }

    _onShowToast = (e: any) => 
    {
        const { message, type, duration = 4000 } = e.detail;
        const id = Date.now() + Math.random();
        this.toasts = [...this.toasts, { id, message, type, duration }];
    };

    async _removeToast(e: CustomEvent<{ id: string }>)
    {
        const id = Number(e.detail.id);
        const positions = new Map(
            Array.from(this.renderRoot.querySelectorAll('onyks-toast'), toast =>
                [toast, toast.getBoundingClientRect().top] as const)
        );

        this.toasts = this.toasts.filter(t => t.id !== id);
        await this.updateComplete;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        for (const toast of this.renderRoot.querySelectorAll('onyks-toast'))
        {
            const previousTop = positions.get(toast);
            if (previousTop === undefined) continue;

            const offset = previousTop - toast.getBoundingClientRect().top;
            if (offset === 0) continue;

            toast.animate(
                [
                    { transform: `translateY(${offset}px)` },
                    { transform: 'translateY(0)' },
                ],
                { duration: 300, easing: 'ease-out' }
            );
        }
    }

    render() 
    {
        return html`
        ${repeat(
          this.toasts,
          (t) => t.id,
          (t) => html`
                <onyks-toast
                .id="${t.id}"
                .message="${t.message}"
                .type="${t.type}"
                .duration="${t.duration}"
                @toast-remove="${this._removeToast}"
                ></onyks-toast>
            `)}
        `;
    }
}

declare global 
{
    interface HTMLElementTagNameMap 
    {
        'onyks-toast': OnyksToast,
        'onyks-toast-container': OnyksToastContainer
    }
}