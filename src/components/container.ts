import {LitElement, css, html} from 'lit'
import {customElement, queryAssignedElements} from 'lit/decorators.js'
import { property } from 'lit/decorators.js';
import { OnyksStyles } from '../utils/styles';

@customElement('onyks-container')
export class OnyksContainer extends LitElement
{
    @property({type: String, reflect: true})
    gap = "";

    @property({type: String, reflect: true})
    padding = "";

    @property({type: String, reflect: true})
    type = "stack"; //grid, stack, group

    @property({type: Number, reflect: true})
    cols = 0;
    
    @property({type: Number, reflect: true})
    rows = 0;

    @property({type: String, reflect: true})
    align = "start"; //start, center, end

    @property({type: String, reflect: true})
    justify = "start"; //start, center, end, between

    @property({ type: Number, attribute: 'mobile-breakpoint' }) 
    mobileBreakpoint = 300;

    @queryAssignedElements({flatten: true})
    _assignedElements!: Array<HTMLElement>;

    private _observer = new MutationObserver((mutations) => 
    {
        this._applyGridStyles();
    });

    disconnectedCallback() 
    {
        super.disconnectedCallback();
        this._observer.disconnect();
    }

    render()
    {
        return html`
        <style>
            @media (max-width: ${this.mobileBreakpoint}px) 
            {
                :host([type="grid"])  
                {
                    grid-template-columns: 1fr !important;
                }
                ::slotted(*) 
                {
                    grid-column: auto !important;
                    grid-row: auto !important;
                    transform: none !important;
                    width: 100%;
                }
            }
        </style>
        <slot @slotchange=${this._handleSlotChange}></slot>`;
    }

    _handleSlotChange() 
    {
        this._applyGridStyles();
        this._updateObservers();
    }

    _updateObservers() 
    {
        this._observer.disconnect();

        if (this._assignedElements) 
        {
            this._assignedElements.forEach(el => 
            {
                this._observer.observe(el, 
                {
                    attributes: true,
                    attributeFilter: ['cols', 'rows'] 
                });
            });
        }
    }

    _applyGridStyles() 
    {
        if (!this._assignedElements) return;

        if (this.type === 'grid') 
        {
            this._assignedElements.forEach((el) => 
            {
                if (el.hasAttribute('cols')) 
                {
                    el.style.gridColumn = `span ${el.getAttribute('cols')}`;
                } 
                else 
                {
                    el.style.removeProperty('grid-column');
                }
            
                if (el.hasAttribute('rows')) 
                {
                    el.style.gridRow = `span ${el.getAttribute('rows')}`;
                } 
                else 
                {
                    el.style.removeProperty('grid-row');
                }
            });
        }
    }

    updated(changedProperties: any) 
    {
        super.updated(changedProperties);
        if (changedProperties.has('cols')) 
        {
            this.style.setProperty('--cols', `${this.cols}`);
        }
        if (changedProperties.has('rows')) 
        {
            this.style.setProperty('--rows', `${this.rows}`);
        }
        this._applyGridStyles();
    }

    static styles = [css`

        :host([type="stack"]) 
        {
            display: flex;
            flex-direction: column;
        }

        :host([type="group"]) 
        {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
        }

        :host([type="grid"]) 
        {
            display: grid;
            grid-template-columns: repeat(var(--cols, 1), 1fr);
            grid-template-rows: repeat(var(--rows, 1), 1fr);
        }

        :host([gap="s"]) 
        {
            gap: var(--onyks-spacing-sm); 
        }

        :host([gap="m"]) 
        {
            gap: var(--onyks-spacing-md); 
        }

        :host([gap="l"]) 
        {
            gap: var(--onyks-spacing-lg);
        }

        :host([gap="xl"]) 
        {
            gap: var(--onyks-spacing-xl);
        }

        :host([padding="s"]) 
        { 
            padding: var(--onyks-spacing-sm); 
        }
            
        :host([padding="m"]) 
        { 
            padding: var(--onyks-spacing-md); 
        }

        :host([padding="l"]) 
        { 
            padding: var(--onyks-spacing-lg); 
        }

        :host([padding="xl"]) 
        { 
            padding: var(--onyks-spacing-xl); 
        }

        :host([align="center"]) 
        {
            align-items: center; 
        }

        :host([align="end"]) 
        {
            align-items: flex-end; 
        }
        
        :host([justify="between"]) 
        {
            justify-content: space-between; 
        }

        :host([justify="center"]) 
        {
            justify-content: center; 
        }

        :host([justify="end"]) 
        {
            justify-content: flex-end; 
        }
    `, OnyksStyles.scroll(':host')];
}

declare global 
{
    interface HTMLElementTagNameMap 
    {
        'onyks-container': OnyksContainer
    }
}