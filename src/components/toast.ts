import {LitElement, css, html} from 'lit'
import {customElement, property} from 'lit/decorators.js'

@customElement('onyks-toast')
export class OnyksToast extends LitElement 
{
    @property({type: String, reflect: true})
    size = 'm';

    @property({type: String, reflect: true})
    type = 'success';

    @property({type: Boolean, reflect: true,  attribute: 'corner-close' })
    cornerClose = false;

    @property({type: Number, reflect: true})
    duration = 0

    render() 
    {
       return html`
          <onyks-alert
            size="${this.size}"
            type="${this.type}"
            ?corner-close="${this.cornerClose}"
            @close=${this.remove}
          >
            <slot></slot>
          </onyks-alert>
       `;
    }

    private _timer: any = undefined

    connectedCallback() 
    {
        super.connectedCallback();
        if (this.duration > 0) 
        {
            this._timer = setTimeout(() => this.remove(), this.duration);
        }
    }

    disconnectedCallback() 
    {
        super.disconnectedCallback();
        clearTimeout(this._timer);
    }

    public remove() 
    {
        this.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => 
        {
            super.remove();
        }, 300);
    }

    static override styles = [css`
        :host 
        {
            display: block;
            pointer-events: auto;
            width: 100%;
            animation: slideIn 0.3s ease-out forwards;
        }

        .toast-content 
        {
            box-sizing: border-box;
            padding: var(--spacing-md, 16px);
            border-radius: var(--radius-md, 8px);
            background-color: var(--bg-surface, #ffffff);
            color: var(--text-primary, #000000);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            max-width: 100px;
            border-left: 4px solid gray;
            font-family: var(--font, sans-serif);
        }

        @keyframes slideIn 
        {
            from { opacity: 0; transform: translateY(15px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes fadeOut 
        {
            from { opacity: 1; transform: scale(1); }
            to { opacity: 0; transform: scale(0.9); }
        }
    `, ]
}


@customElement('onyks-toast-container')
export class OnyksToastContainer extends LitElement
{
    render() 
    {
       return html`<slot></slot>`;
    }

    static override styles = [css`
        :host
        {
            display: flex;
            max-width: 400px;
            width: 100%;
            gap: var(--onyks-spacing-md);
            flex-direction: column;
            justify-content: flex-end;
        }
    `]

    static addToast(content: any, duration: number = 0, cornerClose: boolean = false, size: string = 'm', type: string = 'info')
    {
        const toast = new OnyksToast()
        toast.duration = duration
        toast.innerHTML = content
        toast.cornerClose = cornerClose
        toast.size = size
        toast.type = type
        return toast
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