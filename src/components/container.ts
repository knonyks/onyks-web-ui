import {LitElement, css, html} from 'lit'
import {customElement, queryAssignedElements} from 'lit/decorators.js'
import { property } from 'lit/decorators.js';
import { OnyksStyles } from '../utils/styles';

@customElement('onyks-container')
export class OnyksContainer extends LitElement
{
    @property({ type: String, reflect: true })
    gap = '';

    @property({ type: String, reflect: true })
    padding = '';

    @property({ type: String, reflect: true })
    type = 'stack'; // grid, stack, group

    @property({ type: Number, reflect: true })
    cols = 0;

    @property({ type: Number, reflect: true })
    rows = 0;

    @property({ type: String, reflect: true })
    align = 'start'; // start, center, end

    @property({ type: String, reflect: true })
    justify = 'start'; // start, center, end, between

    @property({ type: Number, attribute: 'mobile-breakpoint', reflect: true })
    mobileBreakpoint = 300;

    @queryAssignedElements({ flatten: true })
    _assignedElements!: Array<HTMLElement>;

    private _observer = new MutationObserver(() =>
    {
        this._applyGridStyles();
    });

    connectedCallback()
    {
        super.connectedCallback();
        this._updateObservers();
    }

    disconnectedCallback()
    {
        super.disconnectedCallback();
        this._observer.disconnect();
    }

    render()
    {
        return html`
        <style>
            @media (max-width: ${this.mobileBreakpoint}px) {
                :host([type='grid']) {
                    grid-template-columns: 1fr !important;
                }

                ::slotted(*) {
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
        this._observer.observe(this, {
            subtree: true,
            attributes: true,
            attributeFilter: ['cols', 'rows', 'type', 'subcols', 'subrows']
        });
    }

    _applyGridStyles()
    {
        const assigned = this._assignedElements ?? [];

        if (this.type !== 'grid')
        {
            this.style.removeProperty('--cols');
            this.style.removeProperty('--rows');

            assigned.forEach((el) =>
            {
                el.style.removeProperty('grid-column');
                el.style.removeProperty('grid-row');
            });
            return;
        }

        const safeCols = Number.isFinite(this.cols) && this.cols > 0 ? this.cols : 1;
        const safeRows = Number.isFinite(this.rows) && this.rows > 0 ? this.rows : 1;

        this.style.setProperty('--cols', `${safeCols}`);
        this.style.setProperty('--rows', `${safeRows}`);

        assigned.forEach((el) =>
        {
            const subcols = Number(el.getAttribute('subcols'));
            const subrows = Number(el.getAttribute('subrows'));

            el.style.gridColumn = Number.isInteger(subcols) && subcols > 0 ? `span ${subcols}` : '';
            el.style.gridRow = Number.isInteger(subrows) && subrows > 0 ? `span ${subrows}` : '';
        });
    }

    updated(changedProperties: any)
    {
        super.updated(changedProperties);
        this._applyGridStyles();
        this._updateObservers();
    }

    static styles = [css`

        :host([type='stack']) 
        {
            display: flex;
            flex-direction: column;
        }

        :host([type='group']) {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
        }

        :host([type='grid']) {
            display: grid;
            grid-template-columns: repeat(var(--cols, 1), minmax(0, 1fr));
            grid-template-rows: repeat(var(--rows, 1), minmax(0, 1fr));
        }

        :host([type='grid']) ::slotted(*) {
            width: 100%;
            height: 100%;
        }

        :host([gap='s']) {
            gap: var(--onyks-spacing-sm);
        }

        :host([gap='m']) {
            gap: var(--onyks-spacing-md);
        }

        :host([gap='l']) {
            gap: var(--onyks-spacing-lg);
        }

        :host([gap='xl']) {
            gap: var(--onyks-spacing-xl);
        }

        :host([padding='s']) {
            padding: var(--onyks-spacing-sm);
        }

        :host([padding='m']) {
            padding: var(--onyks-spacing-md);
        }

        :host([padding='l']) {
            padding: var(--onyks-spacing-lg);
        }

        :host([padding='xl']) {
            padding: var(--onyks-spacing-xl);
        }

        :host([align='center']) {
            align-items: center;
        }

        :host([align='end']) {
            align-items: flex-end;
        }

        :host([justify='between']) {
            justify-content: space-between;
        }

        :host([justify='center']) {
            justify-content: center;
        }

        :host([justify='end']) {
            justify-content: flex-end;
        }

        ::slotted(*) 
        {
            text-align: initial;
            box-sizing: border-box;
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