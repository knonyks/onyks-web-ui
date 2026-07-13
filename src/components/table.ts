import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('onyks-table')
export class Onyks_Table extends LitElement {
    @property({ type: Array }) data: Record<string, any>[] = [];
    @property({ type: Array }) columns: { key: string, label: string }[] = [];
    @property({ type: Number }) scrollThreshold = 0;
    @property({ type: String }) maxHeight = '100%'; // Domyślnie dopasowuje się do kontenera

    static styles = css`
        :host {
            display: block;
            width: 100%; 
            background-color: var(--onyks-surface-1);
            border: 1px solid var(--onyks-surface-1-border);
            border-radius: var(--onyks-radius-lg);
            box-shadow: 0 10px 30px rgba(0,0,0,0.4);
            box-sizing: border-box;
            overflow: hidden;
            font-family: var(--onyks-font);
            color: var(--onyks-on-surface-1);
        }

        .scroll-wrapper {
            width: 100%;
            overflow: auto;
            /* Firefox Scrollbars */
            scrollbar-width: thin;
            scrollbar-color: var(--onyks-scroll-thumb) var(--onyks-scroll-track);
        }

        /* Webkit Scrollbars */
        .scroll-wrapper::-webkit-scrollbar { width: var(--onyks-scroll-size); height: var(--onyks-scroll-size); }
        .scroll-wrapper::-webkit-scrollbar-track { background: var(--onyks-scroll-track); }
        .scroll-wrapper::-webkit-scrollbar-corner { background: var(--onyks-scroll-track); }
        .scroll-wrapper::-webkit-scrollbar-thumb {
            background-color: var(--onyks-scroll-thumb);
            border-radius: var(--onyks-radius-md);
            border: 2px solid var(--onyks-surface-1);
        }
        .scroll-wrapper::-webkit-scrollbar-thumb:hover { background-color: var(--onyks-accent); }

        .table-container {
            display: table;
            width: 100%;
            min-width: max-content;
            border-collapse: collapse; 
        }
    `;

    private _handleScroll(e: Event) {
        const target = e.target as HTMLElement;
        const distanceToBottom = target.scrollHeight - target.scrollTop - target.clientHeight;
        if (distanceToBottom <= this.scrollThreshold) {
            this.dispatchEvent(new CustomEvent('scroll-end', { bubbles: true, composed: true }));
        }
    }

    getSelectedRows() {
        return this.data.filter(row => Object.values(row).some(val => val === true));
    }

    private _updateRowSelection(rowIndex: number, key: string, checked: boolean) {
        this.data = this.data.map((row, idx) => 
            idx === rowIndex ? { ...row, [key]: checked } : row
        );
    }

    private _toggleAll(key: string, checked: boolean) {
        this.data = this.data.map(row => ({ ...row, [key]: checked }));
    }

    render() {
        const hasData = this.data && this.data.length > 0;
        const cols = this.columns.length > 0 
            ? this.columns 
            : (hasData ? Object.keys(this.data[0]).map(k => ({ key: k, label: k })) : []);

        return html`
            <div class="scroll-wrapper" style="max-height: ${this.maxHeight};" @scroll=${this._handleScroll}>
                <div class="table-container">
                    ${(hasData || this.columns.length) ? html`
                        
                        <onyks-row header>
                            ${cols.map(col => {
                                const isBooleanCol = hasData && typeof this.data[0][col.key] === 'boolean';
                                if (isBooleanCol) {
                                    const isAllChecked = this.data.every(row => row[col.key] === true);
                                    return html`
                                        <onyks-col 
                                            checkbox 
                                            .checked=${isAllChecked}
                                            @checkbox-change=${(e: CustomEvent) => this._toggleAll(col.key, e.detail.checked)}
                                        ></onyks-col>
                                    `;
                                }
                                return html`<onyks-col>${col.label}</onyks-col>`;
                            })}
                        </onyks-row>

                        ${this.data.map((row, rowIndex) => html`
                            <onyks-row>
                                ${cols.map(col => {
                                    const value = row[col.key]; 
                                    if (typeof value === 'boolean') {
                                        return html`
                                            <onyks-col 
                                                checkbox 
                                                .checked=${value}
                                                @checkbox-change=${(e: CustomEvent) => this._updateRowSelection(rowIndex, col.key, e.detail.checked)}
                                            ></onyks-col>
                                        `;
                                    }
                                    return html`<onyks-col>${value}</onyks-col>`;
                                })}
                            </onyks-row>
                        `)}

                    ` : html`<slot></slot>`}
                </div>
            </div>
        `;
    }
}

@customElement('onyks-row')
export class Onyks_Row extends LitElement {
    @property({ type: Boolean, reflect: true }) header = false;

    static styles = css`
        :host {
            display: table-row;
            transition: background-color 0.2s ease;
        }

        :host(:not([header]):hover) {
            background-color: var(--onyks-surface-1-hover);
        }

        :host([header]) {
            position: sticky;
            top: 0;
            z-index: 10;
            background-color: var(--onyks-surface-2);
        }
    `;

    render() {
        return html`<slot></slot>`;
    }
}

@customElement('onyks-col')
export class Onyks_Col extends LitElement {
    @property({ type: Boolean, reflect: true }) checkbox = false;
    @property({ type: Boolean }) checked = false;

    static styles = css`
        :host {
            display: table-cell;
            padding: var(--onyks-spacing-md) var(--onyks-spacing-lg);
            border-bottom: 1px solid var(--onyks-surface-1-border);
            vertical-align: middle;
            text-align: center;
            color: var(--onyks-on-surface-1);
            white-space: nowrap;
        }

        :host-context(onyks-row[header]) {
            color: var(--onyks-accent);
            font-weight: bold;
            font-size: var(--onyks-size-sm);
            text-transform: uppercase;
            background-color: var(--onyks-surface-1-hover);
            border-bottom: none;
            box-shadow: inset 0 -2px 0 var(--onyks-accent); 
        }

        :host([checkbox]) {
            width: 48px;
            padding: var(--onyks-spacing-sm);
        }
        
        onyks-checkbox {
            display: inline-flex;
            justify-content: center;
            align-items: center;
        }
    `;

    render() {
        if (this.checkbox) {
            return html`
                <onyks-checkbox 
                    size="m"
                    ?checked=${this.checked} 
                    @change=${this._handleChange}
                    @click=${(e: Event) => e.stopPropagation()} 
                ></onyks-checkbox>
            `;
        }
        return html`<slot></slot>`;
    }
    
    private _handleChange(e: Event) {
        const target = e.target as HTMLInputElement;
        this.checked = target.checked;
        this.dispatchEvent(new CustomEvent('checkbox-change', {
            detail: { checked: this.checked },
            bubbles: true,
            composed: true
        }));
    }
}