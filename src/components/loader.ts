import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js'; // Jeśli używasz TypeScript/Dekoratorów

@customElement('onyks-loader')
export class OnyksLoader extends LitElement 
{
    @property({ type: Boolean, attribute: 'is-loading' }) 
    isLoading = false;
    
    @property({ type: Boolean, attribute: 'full-page' }) 
    fullPage = false;
    
    @property({ type: Boolean, attribute: 'reset-scroll' }) 
    resetScroll = false;
    
    @property({ type: String, attribute: 'scroll-container' }) 
    scrollContainer = '';

    static styles = css`
        :host 
        {
            display: contents;
        }

        .loader-overlay 
        {
            position: absolute;
            inset: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            background: var(--onyks-surface);
            backdrop-filter: blur(3px);
            z-index: 10;
            border-radius: inherit;

            /* Like Vue's <Transition> */
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
            transition: opacity 0.3s ease, visibility 0.3s ease;
        }


        .loader-overlay.is-loading 
        {
            opacity: 1;
            visibility: visible;
            pointer-events: all;
        }

        .loader-overlay.is-full-page 
        {
            position: fixed;
            z-index: 9999;
            background: var(--onyks-surface);
        }

        .spinner 
        {
            width: 48px;
            height: 48px;
            border: 4px solid var(--onyks-on-surface);
            border-top: 4px solid var(--onyks-accent);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes spin 
        {
            0% 
            { 
                transform: rotate(0deg); 
            }
            100% 
            { 
                transform: rotate(360deg); 
            }
        }
  `;


    updated(changedProperties: any) 
    {
        if (changedProperties.has('isLoading')) 
        {
            const wasLoading = changedProperties.get('isLoading');
            const isNowLoading = this.isLoading;

            if (this.fullPage) 
            {
                document.body.style.overflow = isNowLoading ? 'hidden' : '';
            }

            if (wasLoading && !isNowLoading && this.resetScroll) 
            {
                this.handleScrollReset();
            }
        }
    }


    async handleScrollReset() 
    {
        await this.updateComplete;
    
        setTimeout(() => 
        {
            if (this.scrollContainer) 
            {
                const container = document.querySelector(this.scrollContainer);
                if (container) 
                {
                    container.scrollTo({ top: 0, behavior: 'instant' });
                }
            } 
            else 
            {
                window.scrollTo({ top: 0, behavior: 'instant' });
            }
        }, 0);
    }

    disconnectedCallback() 
    {
        super.disconnectedCallback();
        if (this.fullPage) 
        {
            document.body.style.overflow = '';
        }
    }

    render() 
    {
        return html`
            <div class="loader-overlay ${this.fullPage ? 'is-full-page' : ''} ${this.isLoading ? 'is-loading' : ''}">
                <div class="spinner"></div>
            </div>
        `;
    }
}

declare global 
{
    interface HTMLElementTagNameMap 
    {
        'onyks-loader': OnyksLoader
    }
}