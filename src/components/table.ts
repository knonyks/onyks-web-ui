import { LitElement, css, html, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('onyks-table')
export class Onyks_Table extends LitElement {
@property({ type: Array }) data: Record<string, any>[] = [];
    @property({ type: Array }) columns: { key: string, label: string }[] = [];
    @property({ type: Number }) scrollThreshold = 0;

    static styles = css`
        :host {
            display: block;
            width: 100%; 
            max-width: 100%;
            margin: 0 auto;
            height: 200px;
            background-color: var(--surface-element);
            border: 1px solid var(--surface-border);
            border-radius: var(--radius-lg);
            box-shadow: 0 10px 30px rgba(0,0,0,0.4);
            box-sizing: border-box;
            overflow: hidden;
        }

        .scroll-wrapper {
            width: 100%;
            height: 100%;
            overflow: auto;
            scrollbar-width: thin;
            scrollbar-color: var(--surface-border) var(--surface-element);
        }

        .scroll-wrapper::-webkit-scrollbar { width: 10px; height: 10px; }
        .scroll-wrapper::-webkit-scrollbar-track { background: var(--surface-element); }
        .scroll-wrapper::-webkit-scrollbar-corner { background: var(--surface-element); }
        .scroll-wrapper::-webkit-scrollbar-thumb {
            background-color: var(--surface-border);
            border-radius: var(--radius-md);
            border: 2px solid var(--surface-element);
        }
        .scroll-wrapper::-webkit-scrollbar-thumb:hover { background-color: var(--color-primary); }

        .table-container {
            display: table;
            width: 100%;
            min-width: max-content;
            border-collapse: separate;
            table-layout: fixed;
        }
    `;

    private resizeObserver = new ResizeObserver(() => this.syncWidths());
    connectedCallback() {
        super.connectedCallback();
        this.resizeObserver.observe(this); 
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.resizeObserver.disconnect();
    }

    protected updated(changedProperties: PropertyValues) {
        super.updated(changedProperties);
        if (changedProperties.has('data') || changedProperties.has('columns')) {
            this.syncWidths();
        }
    }

    syncWidths() {
        requestAnimationFrame(() => {
            const lightHeaders = Array.from(this.querySelectorAll('onyks-row[header] onyks-col:not([checkbox])'));
            const shadowHeaders = Array.from(this.shadowRoot?.querySelectorAll('onyks-row[header] onyks-col:not([checkbox])') || []);
            
            const headers = [...lightHeaders, ...shadowHeaders] as HTMLElement[];
            if (!headers.length) return;
            this.style.removeProperty('--max-header-width');
            let maxWidth = 0;
            headers.forEach(header => {
                header.style.width = 'max-content'; 
                const width = header.getBoundingClientRect().width;
                header.style.width = '';

                if (width > maxWidth) {
                    maxWidth = width;
                }
            });

            if (maxWidth > 0) {
                this.style.setProperty('--max-header-width', `${maxWidth}px`);
            }
        });
    }

    private _handleScroll(e: Event) {
        const target = e.target as HTMLElement;
        const distanceToBottom = target.scrollHeight - target.scrollTop - target.clientHeight;
        if (distanceToBottom <= this.scrollThreshold) {
            this.dispatchEvent(new CustomEvent('scroll-end', {
                bubbles: true,
                composed: true
            }));
        }
    }

    getSelectedRows() {
        const allData = this.getTableData();
        return allData.filter(row => Object.values(row).some(val => val === true));
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
    // 1. Sprawdzamy co dokładnie otrzymaliśmy
    const hasColumns = this.columns && this.columns.length > 0;
    const hasData = this.data && this.data.length > 0;

    // 2. Jeśli mamy kolumny ALBO dane, renderujemy tabelę dynamicznie. W przeciwnym razie slot.
    const useProgrammatic = hasColumns || hasData;

    // 3. Budujemy definicje kolumn
    const cols = hasColumns 
        ? this.columns 
        : hasData ? Object.keys(this.data[0]).map(k => ({ key: k, label: k })) : [];

    return html`
        <div class="scroll-wrapper" @scroll=${this._handleScroll}>
            <div class="table-container">
                ${useProgrammatic ? html`
                    
                    <onyks-row header>
                        ${cols.map(col => {
                            // BEZPIECZNE SPRAWDZENIE: czy mamy dane, żeby odgadnąć czy to checkbox?
                            const isBooleanCol = hasData && typeof this.data[0][col.key] === 'boolean';
                            
                            if (isBooleanCol) {
                                const isAllChecked = this.data.every(row => row[col.key] === true);
                                
                                return html`
                                    <onyks-col 
                                        checkbox 
                                        .checked=${isAllChecked}
                                        @onyks-checkbox-change=${(e: CustomEvent) => this._toggleAll(col.key, e.detail.checked)}
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
                                            @onyks-checkbox-change=${(e: CustomEvent) => this._updateRowSelection(rowIndex, col.key, e.detail.checked)}
                                        ></onyks-col>
                                    `;
                                }
                                
                                return html`<onyks-col>${value}</onyks-col>`;
                            })}
                        </onyks-row>
                    `)}

                ` : html`
                    <slot></slot> 
                `}
            </div>
        </div>
    `;
}

    getTableData() {
        if (this.data && this.data.length > 0) {
            return this.data;
        }
        const headerRow = this.querySelector('onyks-row[header]');
        const headerCols = headerRow ? Array.from(headerRow.querySelectorAll('onyks-col')) : [];
        const keys = headerCols.map((col, i) => col.textContent?.trim() || `kolumna_${i}`);
        const rows = Array.from(this.querySelectorAll('onyks-row:not([header])'));
        
        return rows.map(row => {
            const cols = Array.from(row.querySelectorAll('onyks-col'));
            const rowData: Record<string, any> = {};
            
            cols.forEach((col, i) => {
                const key = keys[i];
                if (col.hasAttribute('checkbox')) {
                    const checkbox = col.shadowRoot?.querySelector('input[type="checkbox"]') as HTMLInputElement;
                    rowData[key] = checkbox ? checkbox.checked : col.hasAttribute('checked');
                } else {
                    rowData[key] = col.textContent?.trim() || '';
                }
            });
            return rowData;
        });
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
            background-color: var(--surface-hover);
        }

        :host([header]) {
            position: sticky;
            top: 0;
            z-index: 10;
            background-color: var(--surface-element);
            border-bottom: 2px solid var(--color-primary);
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
            padding: var(--spacing-md) var(--spacing-lg);
            border-bottom: 1px solid var(--surface-border);
            vertical-align: middle;
            text-align: center;
            color: var(--text-secondary); /* Zmiana z text-3 */

            width: 100%;
            min-width: var(--max-header-width, auto);
            max-width: none;
            
            box-sizing: border-box;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        :host(:last-child) { border-right: none; }

        :host-context(onyks-row[header]) {
            color: var(--color-primary);
            font-weight: 700;
            font-size: 0.85rem;
            text-transform: uppercase;
            border-bottom: 2px solid var(--color-primary);
            background-color: var(--surface-hover);
            
            width: 100%; 
            min-width: var(--max-header-width, auto);
            max-width: none;
            
            white-space: nowrap; 
            text-align: center;
            overflow: visible;
        }

        :host([checkbox]) {
            width: 48px;
            min-width: 48px;
            max-width: 48px;
        }

        input[type="checkbox"] {
            appearance: none;
            background-color: var(--surface-element);
            margin: 0;
            width: 18px;
            height: 18px;
            border: 2px solid var(--surface-border);
            border-radius: var(--radius-sm);
            display: inline-grid;
            place-content: center;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        input[type="checkbox"]:hover {
            border-color: var(--color-primary);
        }

        input[type="checkbox"]::before {
            content: "";
            width: 10px;
            height: 10px;
            transform: scale(0);
            transition: 120ms transform ease-in-out;
            background-color: var(--color-primary);
            transform-origin: center;
            clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
        }

        input[type="checkbox"]:checked::before {
            transform: scale(1);
        }

        input[type="checkbox"]:checked {
            border-color: var(--color-primary);
        }
    `;

    render() {
        if (this.checkbox) {
            return html`
                <input 
                    type="checkbox" 
                    .checked=${this.checked} 
                    @change=${this._handleChange} 
                />
            `;
        }
        return html`<slot @slotchange=${this.handleSlotChange}></slot>`;
    }
    
    private _handleChange(e: Event) {
        const target = e.target as HTMLInputElement;
        this.checked = target.checked;
        this.dispatchEvent(new CustomEvent('onyks-checkbox-change', {
            detail: { checked: this.checked },
            bubbles: true,
            composed: true
        }));
    }

    handleSlotChange(e: Event) {
        if (this.checkbox) return;
        const slot = e.target as HTMLSlotElement;
        const nodes = slot.assignedNodes();
        const text = nodes.map(n => n.textContent).join('').trim();
        this.title = text;
    }
}