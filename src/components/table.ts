import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export interface TableColumn {
    key: string;
    label: string;
    hidden?: boolean; 
}

@customElement('onyks-table')
export class Onyks_Table extends LitElement {
    @property({ type: Array }) data: Record<string, any>[] = [];
    @property({ type: Array }) columns: TableColumn[] = [];
    @property({ type: Number }) scrollThreshold = 0;
    @property({ type: String }) maxHeight = '100%';
    @property({ type: String }) size: 's' | 'm' | 'l' | 'xl' = 'm';

    static styles = css`
        :host {
            display: block;
            width: 100%; 
            height: 100%; 
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
            height: 100%;
            overflow: auto;
            scrollbar-width: thin;
            scrollbar-color: var(--onyks-scroll-thumb) var(--onyks-scroll-track);
        }

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
            border-collapse: separate; 
            border-spacing: 0;
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
        const safeData = this.data || [];
        return safeData.filter(row => Object.values(row).some(val => val === true));
    }

    setColumnVisibility(key: string, hidden: boolean) {
        if (!this.columns || this.columns.length === 0) return;
        this.columns = this.columns.map(col => 
            col.key === key ? { ...col, hidden: hidden } : col
        );
    }

    refresh() {
        this.requestUpdate();
    }

    private _updateRowSelection(rowIndex: number, key: string, checked: boolean) {
        const safeData = this.data || [];
        this.data = safeData.map((row, idx) => 
            idx === rowIndex ? { ...row, [key]: checked } : row
        );

        this.dispatchEvent(new CustomEvent('checkbox-click', {
            detail: { type: 'row', rowIndex, key, checked, rowData: this.data[rowIndex] },
            bubbles: true, composed: true
        }));
    }

    private _toggleAll(key: string, checked: boolean) {
        const safeData = this.data || [];
        this.data = safeData.map(row => ({ ...row, [key]: checked }));

        this.dispatchEvent(new CustomEvent('checkbox-click', {
            detail: { type: 'all', key, checked },
            bubbles: true, composed: true
        }));
    }

    render() {
        const safeData = this.data || [];
        const safeColumns = this.columns || [];
        
        const hasData = safeData.length > 0;
        
        let cols: TableColumn[] = safeColumns.length > 0 
            ? safeColumns 
            : (hasData && safeData[0] ? Object.keys(safeData[0]).map(k => ({ key: k, label: k, hidden: false })) : []);

        const visibleCols = cols.filter(col => !col.hidden);

        return html`
            <div class="scroll-wrapper" style="max-height: ${this.maxHeight || '100%'};" @scroll=${this._handleScroll}>
                <div class="table-container">
                    ${(hasData || safeColumns.length > 0) ? html`
                        
                        <onyks-row header>
                            ${visibleCols.map(col => {
                                const isBooleanCol = hasData && safeData[0] && typeof safeData[0][col.key] === 'boolean';
                                if (isBooleanCol) {
                                    const isAllChecked = safeData.every(row => row[col.key] === true);
                                    return html`
                                        <onyks-col 
                                            header
                                            checkbox 
                                            size=${this.size || 'm'}
                                            .checked=${isAllChecked}
                                            @checkbox-change=${(e: CustomEvent) => this._toggleAll(col.key, e.detail.checked)}
                                        ></onyks-col>
                                    `;
                                }
                                return html`<onyks-col header size=${this.size || 'm'}>${col.label}</onyks-col>`;
                            })}
                        </onyks-row>

                        ${safeData.map((row, rowIndex) => html`
                            <onyks-row>
                                ${visibleCols.map(col => {
                                    const value = row[col.key]; 
                                    if (typeof value === 'boolean') {
                                        return html`
                                            <onyks-col 
                                                checkbox 
                                                size=${this.size || 'm'}
                                                .checked=${value}
                                                @checkbox-change=${(e: CustomEvent) => this._updateRowSelection(rowIndex, col.key, e.detail.checked)}
                                            ></onyks-col>
                                        `;
                                    }
                                    return html`<onyks-col size=${this.size || 'm'}>${value}</onyks-col>`;
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
    `;

    render() {
        return html`<slot></slot>`;
    }
}

@customElement('onyks-col')
export class Onyks_Col extends LitElement {
    @property({ type: Boolean, reflect: true }) header = false;
    @property({ type: Boolean, reflect: true }) checkbox = false;
    @property({ type: Boolean }) checked = false;
    @property({ type: String, reflect: true }) size: 's' | 'm' | 'l' | 'xl' = 'm';
    @property({ type: Boolean, reflect: true }) hide = false;

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

        :host([hide]) {
            display: none !important;
        }

        :host(:first-child) { padding-left: var(--onyks-spacing-xl); }
        :host(:last-child) { padding-right: var(--onyks-spacing-xl); }

        :host([checkbox]) {
            width: 1%; 
            padding-left: var(--onyks-spacing-xl);
            padding-right: var(--onyks-spacing-md);
        }

        :host([size="s"]) { font-size: var(--onyks-size-sm); }
        :host([size="m"]) { font-size: var(--onyks-size-md); }
        :host([size="l"]) { font-size: var(--onyks-size-lg); }
        :host([size="xl"]) { font-size: var(--onyks-size-xl); }

        :host([header]) {
            position: sticky;
            top: 0;
            z-index: 10;
            color: var(--onyks-accent);
            font-weight: bold;
            text-transform: uppercase;
            background-color: var(--onyks-surface-1-hover);
            border-bottom: none;
            box-shadow: inset 0 -2px 0 var(--onyks-accent); 
            background-clip: padding-box; 
        }

        :host([header]:first-child) { border-top-left-radius: var(--onyks-radius-lg); }
        :host([header]:last-child) { border-top-right-radius: var(--onyks-radius-lg); }

        :host([header][size="s"]) { font-size: calc(var(--onyks-size-sm) * 0.85); }
        :host([header][size="m"]) { font-size: var(--onyks-size-sm); }
        :host([header][size="l"]) { font-size: var(--onyks-size-md); }
        :host([header][size="xl"]) { font-size: var(--onyks-size-lg); }
        
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
                    size=${this.size || 'm'}
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
            bubbles: true, composed: true
        }));
    }
}