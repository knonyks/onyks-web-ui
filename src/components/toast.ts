import {LitElement, css, html} from 'lit'
import {customElement, property} from 'lit/decorators.js'

@customElement('onyks-toast')
export class Onyks_Toast extends LitElement 
{
    @property({type: String, reflect: true})
    size = 'm';

    @property({type: String, reflect: true})
    position = 'bottom-right';

    @property({type: String, reflect: true})
    type = 'success';

    @property({type: Number})
    duration = 3000;

    override connectedCallback() 
    {
        super.connectedCallback();
        
        const containerClass = `toast-container-${this.position}`;

        if (this.parentElement?.classList.contains(containerClass)) 
        {
            if (this.duration > 0) 
            {
                setTimeout(() => this.removeToast(), this.duration);
            }
            return;
        }

        this.setupContainer(containerClass);
    }

    private setupContainer(containerClass: string) 
    {
        let container = document.body.querySelector(`.${containerClass}`) as HTMLElement;

        if (!container) {
            container = document.createElement('div');
            container.className = containerClass;
            
            container.style.position = 'fixed';
            container.style.display = 'flex';
            container.style.justifyContent = 'right';
            // container.style.alignContent = 'center';
            // container.style.flexDirection = this.position.startsWith('bottom') ? 'column-reverse' : 'column';
            // container.style.gap = '12px';
            // container.style.zIndex = '9999';
            // container.style.boxSizing = 'border-box';
            // container.style.width = '100%';
            // container.style.maxWidth = '300px';
            container.style.pointerEvents = 'none';
            // container.style.width = '25%';
            // container.style.backgroundColor = 'red'

            if (this.position.includes('top'))
            {
                container.style.top = '20px';
            }
            
            if (this.position.includes('bottom'))
            {
                container.style.bottom = '20px';
                container.style.width = 'calc(100% - 40px)';
            }

            if (this.position.includes('left'))
            {
                container.style.left = '20px';
                container.style.width = 'calc(100% - 40px)';
            }

            if (this.position.includes('right'))
            {
                container.style.right = '20px';
                container.style.width = 'calc(100% - 40px)';
            }

            if (this.position.includes('center')) 
            {
                container.style.left = '50%';
                container.style.transform = 'translateX(-50%)';
            }

            document.body.appendChild(container);
        }

        container.appendChild(this);
    }

    private removeToast() 
    {
        this.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => 
        {
            this.remove();
        }, 300);
    }

    render() 
    {
       return html`<onyks-alert size="${this.size}" type="${this.type}"><slot></slot></onyks-alert>`;
    }

    static override styles = [css`
        :host 
        {
            display: block;
            width: fit-content;
            pointer-events: auto;
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

declare global 
{
    interface HTMLElementTagNameMap 
    {
        'onyks-toast': Onyks_Toast
    }
}