import { LitElement, css, html, nothing, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { live } from 'lit/directives/live.js';

export type TableSize = 's' | 'm' | 'l' | 'xl';
export type TableRow = Record<string, any>;

export interface TableColumn {
    key: string;
    label?: string;
    hidden?: boolean;
    details?: boolean;
}

export type ExpandedTemplate = (row: TableRow, index: number) => unknown;
const columnWidth = (narrow: boolean) => (narrow ? 'max-content' : 'auto');

/* =====================================================================
 * <onyks-table>
 * ===================================================================== */
@customElement('onyks-table')
export class Onyks_Table extends LitElement {

    @property({ type: Array }) data: TableRow[] = [];
    @property({ type: Array }) columns: TableColumn[] = [];
    @property({ type: String, reflect: true }) size: TableSize = 'm';
    @property({ type: String }) maxHeight = '100%';
    @property({ type: Number }) scrollThreshold = 0;
    @property({ type: Boolean, reflect: true }) expandable = false;
    @property({ type: Boolean }) rowExpanded = false;
    @property({ attribute: false }) expandedTemplate?: ExpandedTemplate;
    @property({ attribute: false }) canExpand: (row: TableRow, index: number) => boolean = () => true;
    @property({ type: String }) rowKey = 'id';

    @state() private _clickedRows = new Map<unknown, boolean>();
    @state() private _htmlModeColumns = '';
    private _scrolledToEnd = false;

    getSelectedRows(selectionKey = 'selected'): TableRow[] {
        return this._rows.filter(row => row[selectionKey] === true);
    }

    setColumnVisibility(key: string, hidden: boolean) {
        this.columns = this._resolveColumns().map(col => (col.key === key ? { ...col, hidden } : col));
    }

    isRowExpanded(index: number): boolean {
        const row = this._rows[index];
        if (!this._canRowExpand(row, index)) return false;

        const key = this._rowId(row, index);
        return this._clickedRows.has(key) ? this._clickedRows.get(key)! : this.rowExpanded;
    }

    toggleRow(index: number, expanded?: boolean) {
        const row = this._rows[index];
        if (!this._canRowExpand(row, index)) return;

        const next = expanded ?? !this.isRowExpanded(index);
        if (next === this.isRowExpanded(index)) return;
        this._rememberRow(index, next);
    }

    expandAll() {
        this._clickedRows = new Map();
        this.rowExpanded = true;
    }

    collapseAll() {
        this._clickedRows = new Map();
        this.rowExpanded = false;
    }

    refresh() {
        this._measureHtmlColumns();
        this.requestUpdate();
    }

    renderDefaultDetails(row: TableRow) {
        const detailColumns = this._resolveColumns().filter(
            col => col.details !== false && !this._isCheckboxColumn(col.key)
        );
        return html`
            <dl class="details-list">
                ${detailColumns.map(col => {
                    const value = row[col.key];
                    const isEmpty = value === null || value === undefined || value === '';
                    return html`<dt>${col.label || col.key}</dt><dd>${isEmpty ? '—' : value}</dd>`;
                })}
            </dl>
        `;
    }


    protected willUpdate(changed: PropertyValues<this>) {
        if (changed.has('rowExpanded')) this._clickedRows = new Map();
    }

    render() {
        const isHtmlMode = this._resolveColumns().length === 0;
        return html`
            <div class="scroll" part="scroll" style="max-height: ${this.maxHeight || '100%'};" @scroll=${this._onScroll}>
                ${isHtmlMode ? this._renderHtmlMode() : this._renderJsMode()}
            </div>
        `;
    }

    private _renderHtmlMode() {
        return html`
            <div class="grid" style="grid-template-columns: ${this._htmlModeColumns || 'auto'};">
                <slot @slotchange=${this._measureHtmlColumns}></slot>
            </div>
        `;
    }

    private _renderJsMode() {
        const columns = this._resolveColumns().filter(col => !col.hidden);
        const widths = [
            ...(this.expandable ? [columnWidth(true)] : []),
            ...columns.map(col => columnWidth(this._isCheckboxColumn(col.key))),
        ].join(' ');

        return html`
            <div class="grid" style="grid-template-columns: ${widths};" @row-toggle=${this._onRowToggle}>
                ${this._renderHeaderRow(columns)}
                ${repeat(
                    this._rows,
                    (row, index) => this._rowId(row, index),
                    (row, index) => this._renderDataRow(row, index, columns)
                )}
            </div>
        `;
    }

    private _renderHeaderRow(columns: TableColumn[]) {
        return html`
            <onyks-row header part="header-row">
                ${this.expandable ? html`<onyks-col header expander size=${this.size}></onyks-col>` : nothing}
                ${columns.map(col => {
                    if (!this._isCheckboxColumn(col.key)) {
                        return html`<onyks-col header size=${this.size}>${col.label ?? col.key}</onyks-col>`;
                    }
                    const allChecked = this._rows.length > 0 && this._rows.every(row => row[col.key] === true);
                    return html`
                        <onyks-col
                            header
                            checkbox
                            size=${this.size}
                            .checked=${live(allChecked)}
                            @checkbox-change=${(e: CustomEvent) => this._setColumnValue(col.key, e.detail.checked)}
                        ></onyks-col>
                    `;
                })}
            </onyks-row>
        `;
    }

    private _renderDataRow(row: TableRow, index: number, columns: TableColumn[]) {
        const expanded = this.isRowExpanded(index);

        return html`
            <onyks-row data-index=${index} .expanded=${live(expanded)} part="row">
                ${this.expandable
                    ? this._canRowExpand(row, index)
                        ? html`<onyks-col expander size=${this.size}></onyks-col>`
                        : html`<onyks-col size=${this.size}></onyks-col>`
                    : nothing}

                ${columns.map(col => this._renderCell(row, index, col))}

                ${expanded
                    ? html`
                        <div slot="details" part="details">
                            ${this.expandedTemplate
                                ? this.expandedTemplate(row, index)
                                : this.renderDefaultDetails(row)}
                        </div>`
                    : nothing}
            </onyks-row>
        `;
    }

    private _renderCell(row: TableRow, index: number, col: TableColumn) {
        const value = row[col.key];
        if (typeof value === 'boolean') {
            return html`
                <onyks-col
                    checkbox
                    size=${this.size}
                    .checked=${live(value)}
                    @checkbox-change=${(e: CustomEvent) => this._setCellValue(index, col.key, e.detail.checked)}
                ></onyks-col>
            `;
        }
        return html`<onyks-col size=${this.size} part="cell">${value ?? ''}</onyks-col>`;
    }

    private _onRowToggle(e: CustomEvent) {
        const index = Number((e.target as HTMLElement).dataset.index);
        if (!this._rows[index]) return;
        this._rememberRow(index, e.detail.expanded);
    }

    private _rememberRow(index: number, expanded: boolean) {
        const row = this._rows[index];
        this._clickedRows = new Map(this._clickedRows).set(this._rowId(row, index), expanded);

        this.dispatchEvent(new CustomEvent('row-toggle', {
            detail: { rowIndex: index, row, expanded },
            bubbles: true,
            composed: true,
        }));
    }

    private _setCellValue(rowIndex: number, key: string, checked: boolean) {
        this.data = this._rows.map((row, i) => (i === rowIndex ? { ...row, [key]: checked } : row));
        this.dispatchEvent(new CustomEvent('checkbox-click', {
            detail: { type: 'row', rowIndex, key, checked, rowData: this.data[rowIndex] },
            bubbles: true,
            composed: true,
        }));
    }

    private _setColumnValue(key: string, checked: boolean) {
        this.data = this._rows.map(row => ({ ...row, [key]: checked }));
        this.dispatchEvent(new CustomEvent('checkbox-click', {
            detail: { type: 'all', key, checked },
            bubbles: true,
            composed: true,
        }));
    }

    private _onScroll(e: Event) {
        const el = e.currentTarget as HTMLElement;
        const atEnd = el.scrollHeight - el.scrollTop - el.clientHeight <= this.scrollThreshold;
        if (atEnd && !this._scrolledToEnd) {
            this.dispatchEvent(new CustomEvent('scroll-end', { bubbles: true, composed: true }));
        }
        this._scrolledToEnd = atEnd;
    }

    private get _rows(): TableRow[] {
        return this.data ?? [];
    }

    private _resolveColumns(): TableColumn[] {
        if (this.columns?.length) return this.columns;
        const first = this._rows[0];
        return first ? Object.keys(first).map(key => ({ key, label: key })) : [];
    }

    private _isCheckboxColumn(key: string): boolean {
        const first = this._rows[0];
        return !!first && typeof first[key] === 'boolean';
    }

    private _canRowExpand(row: TableRow | undefined, index: number): row is TableRow {
        return this.expandable && !!row && this.canExpand(row, index);
    }

    private _rowId(row: TableRow, index: number): unknown {
        return row?.[this.rowKey] ?? index;
    }

    private _measureHtmlColumns() {
        const firstRow = this.querySelector(':scope > onyks-row');
        const cells = firstRow ? Array.from(firstRow.querySelectorAll(':scope > onyks-col:not([hide])')) : [];
        this._htmlModeColumns = cells
            .map(cell => columnWidth(cell.hasAttribute('checkbox') || cell.hasAttribute('expander')))
            .join(' ');
    }

    static styles = css`
        :host {
            --_cell-font: var(--onyks-size-md);
            --_header-font: var(--onyks-size-sm);

            display: block;
            width: 100%;
            height: 100%;
            background-color: var(--onyks-surface-1);
            border: 1px solid var(--onyks-surface-1-border);
            border-radius: var(--onyks-radius-lg);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
            box-sizing: border-box;
            overflow: hidden;
            font-family: var(--onyks-font);
            color: var(--onyks-on-surface-1);
        }
        :host([size='s']) { --_cell-font: var(--onyks-size-sm); --_header-font: calc(var(--onyks-size-sm) * 0.85); }
        :host([size='l']) { --_cell-font: var(--onyks-size-lg); --_header-font: var(--onyks-size-md); }
        :host([size='xl']) { --_cell-font: var(--onyks-size-xl); --_header-font: var(--onyks-size-lg); }

        .scroll {
            width: 100%;
            height: 100%;
            overflow: auto;
            scrollbar-width: thin;
            scrollbar-color: var(--onyks-scroll-thumb) var(--onyks-scroll-track);
        }
        .scroll::-webkit-scrollbar { width: var(--onyks-scroll-size); height: var(--onyks-scroll-size); }
        .scroll::-webkit-scrollbar-track { background: var(--onyks-scroll-track); }
        .scroll::-webkit-scrollbar-corner { background: var(--onyks-scroll-track); }
        .scroll::-webkit-scrollbar-thumb {
            background-color: var(--onyks-scroll-thumb);
            border-radius: var(--onyks-radius-md);
            border: 2px solid var(--onyks-surface-1);
        }
        .scroll::-webkit-scrollbar-thumb:hover { background-color: var(--onyks-accent); }

        .grid {
            display: grid;
            width: 100%;
            min-width: max-content;
        }

        .details-list {
            display: grid;
            grid-template-columns: max-content 1fr;
            margin: 0;
        }
        .details-list dt,
        .details-list dd {
            margin: 0;
            padding: var(--onyks-spacing-md) var(--onyks-spacing-lg) var(--onyks-spacing-md) 0;
            border-bottom: 1px solid var(--onyks-surface-1-border);
        }
        .details-list dt {
            color: var(--onyks-accent);
            font-weight: bold;
            font-size: var(--_header-font);
            text-transform: uppercase;
        }
        .details-list dd { overflow-wrap: anywhere; }
        .details-list dt:last-of-type,
        .details-list dd:last-of-type { border-bottom: none; }
    `;
}

// =====================================================================
// RZĄD / ROW
// =====================================================================
@customElement('onyks-row')
export class Onyks_Row extends LitElement {
    @property({ type: Boolean, reflect: true }) header = false;
    @property({ type: Boolean, reflect: true }) expanded = false;

    toggle(expanded = !this.expanded) {
        if (expanded === this.expanded) return;
        this.expanded = expanded;
        this.dispatchEvent(new CustomEvent('row-toggle', { detail: { expanded }, bubbles: true }));
    }

    protected updated(changed: PropertyValues<this>) {
        if (changed.has('expanded')) {
            this.querySelectorAll<Onyks_Col>(':scope > onyks-col[expander]').forEach(col => {
                col.expanded = this.expanded;
            });
        }
    }

    render() {
        return html`<slot></slot><slot name="details"></slot>`;
    }

    static styles = css`
        :host {
            /* Wiersz korzysta z kolumn tabeli – dlatego komórki są równe. */
            display: grid;
            grid-template-columns: subgrid;
            grid-column: 1 / -1;
            transition: background-color 0.2s ease;
        }
        :host([hidden]) { display: none; }

        :host(:not([header]):hover) { background-color: var(--onyks-surface-1-hover); }

        :host([header]) {
            position: sticky;
            top: 0;
            z-index: 10;
        }

        :host([expanded]) {
            --_cell-border-color: transparent;
            box-shadow: inset 0 -1px 0 var(--onyks-surface-1-border);
        }

        ::slotted([slot='details']) {
            grid-column: 1 / -1;
            contain: inline-size;
            margin: 0 var(--onyks-spacing-xl) var(--onyks-spacing-md);
            padding: var(--onyks-spacing-md) var(--onyks-spacing-lg);
            font-size: var(--_cell-font);
            text-align: left;
            white-space: normal;
        }
        :host(:not([expanded])) ::slotted([slot='details']) { display: none; }
    `;
}

// =====================================================================
// KOLUMNA / COL
// =====================================================================
@customElement('onyks-col')
export class Onyks_Col extends LitElement {
    @property({ type: Boolean, reflect: true }) header = false;
    @property({ type: Boolean, reflect: true }) checkbox = false;
    @property({ type: Boolean }) checked = false;
    @property({ type: Boolean, reflect: true }) expander = false;
    @property({ type: Boolean, reflect: true }) expanded = false;
    @property({ type: String, reflect: true }) size?: TableSize;
    @property({ type: Boolean, reflect: true }) hide = false;

    connectedCallback() {
        super.connectedCallback();
        if (this.expander) this.expanded = !!this.closest('onyks-row')?.hasAttribute('expanded');
    }

    render() {
        if (this.expander && !this.header) {
            return html`
                <button
                    class="expander"
                    type="button"
                    aria-expanded=${this.expanded ? 'true' : 'false'}
                    aria-label=${this.expanded ? 'Collapse row' : 'Expand row'}
                    @click=${this._onExpanderClick}
                >
                    <svg viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M6 3.5 10.5 8 6 12.5" fill="none" stroke="currentColor"
                              stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
            `;
        }
        if (this.checkbox) {
            return html`
                <onyks-checkbox
                    size=${this.size ?? 'm'}
                    .checked=${live(this.checked)}
                    @change=${this._onCheckboxChange}
                ></onyks-checkbox>
            `;
        }
        return html`<slot></slot>`;
    }

    private _onExpanderClick() {
        (this.closest('onyks-row') as Onyks_Row | null)?.toggle();
    }

    private _onCheckboxChange(e: Event) {
        this.checked = Boolean((e.target as { checked?: boolean }).checked);
        this.dispatchEvent(new CustomEvent('checkbox-change', {
            detail: { checked: this.checked },
            bubbles: true,
            composed: true,
        }));
    }

    static styles = css`
        :host {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: var(--onyks-spacing-md) var(--onyks-spacing-lg);
            border-bottom: 1px solid var(--_cell-border-color, var(--onyks-surface-1-border));
            color: var(--onyks-on-surface-1);
            font-size: var(--_cell-font, var(--onyks-size-md));
            white-space: nowrap;
        }
        :host([hide]) { display: none !important; }

        /* :first-of-type / :last-of-type, bo za komórkami może stać panel szczegółów */
        :host(:first-of-type) { padding-left: var(--onyks-spacing-xl); }
        :host(:last-of-type) { padding-right: var(--onyks-spacing-xl); }

        :host([checkbox]),
        :host([expander]) {
            padding-left: var(--onyks-spacing-xl);
            padding-right: var(--onyks-spacing-md);
        }

        :host([size='s']) { font-size: var(--onyks-size-sm); }
        :host([size='m']) { font-size: var(--onyks-size-md); }
        :host([size='l']) { font-size: var(--onyks-size-lg); }
        :host([size='xl']) { font-size: var(--onyks-size-xl); }
        :host([header]) {
            color: var(--onyks-accent);
            font-weight: bold;
            font-size: var(--_header-font, var(--onyks-size-sm));
            text-transform: uppercase;
            background-color: var(--onyks-surface-1-hover);
            border-bottom: none;
            box-shadow: inset 0 -2px 0 var(--onyks-accent);
        }
        :host([header]:first-of-type) { border-top-left-radius: var(--onyks-radius-lg); }
        :host([header]:last-of-type) { border-top-right-radius: var(--onyks-radius-lg); }

        :host([header][size='s']) { font-size: calc(var(--onyks-size-sm) * 0.85); }
        :host([header][size='m']) { font-size: var(--onyks-size-sm); }
        :host([header][size='l']) { font-size: var(--onyks-size-md); }
        :host([header][size='xl']) { font-size: var(--onyks-size-lg); }

        onyks-checkbox {
            display: inline-flex;
            justify-content: center;
            align-items: center;
        }

        .expander {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 1.75em;
            height: 1.75em;
            padding: 0;
            border: none;
            border-radius: var(--onyks-radius-md);
            background: transparent;
            color: var(--onyks-accent);
            font-size: inherit;
            cursor: pointer;
        }
        .expander:focus-visible { outline: 2px solid var(--onyks-accent); outline-offset: 1px; }
        .expander svg {
            width: 1em;
            height: 1em;
            transition: transform 0.2s ease;
        }
        :host([expanded]) .expander svg { transform: rotate(90deg); }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        'onyks-table': Onyks_Table;
        'onyks-row': Onyks_Row;
        'onyks-col': Onyks_Col;
    }
}
