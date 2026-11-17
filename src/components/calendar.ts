import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

const months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const weekdays: string[] = ['S','M','T','W','T','F','S']
const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    timeZone: "UTC",
};

@customElement('onyks-calendar')
export class Onyks_Calendar extends LitElement {

    @property({ type: String, reflect: true }) value = "";
    @property({ type: String, reflect: true }) size: 's' | 'm' | 'l' | 'xl' = 'l';
    @property({ type: String, reflect: true }) min = "";
    @property({ type: String, reflect: true }) max = "";
    @state() private _visibleMonth = 0;
    @state() private _visibleYear = 0;


    private _splitDate(date: string): void {
        const splitDate = date.split("-");
        this._visibleMonth = Number(splitDate[1]) - 1;
        this._visibleYear = Number(splitDate[0]);
        if(Number.isNaN(this._visibleMonth) || Number.isNaN(this._visibleYear)) {
            const date = new Date();
            this._visibleMonth = date.getMonth();
            this._visibleYear = date.getFullYear();
        }
    }

    private _daysInMonth(year: number, month: number): number {
        return new Date(year, month + 1, 0).getDate();
    }

    private _firstWeekday(year: number, month: number): number {
        return new Date(year, month, 1).getDay();
    }

    protected willUpdate(changedProperties: any): void {
        if(changedProperties.has('value'))
            this._splitDate(this.value);
    }

    private _prevMonth() {
        this._visibleMonth --
        if(this._visibleMonth < 0) {
            this._visibleMonth = 11;
            this._visibleYear --
        }
    }

    private _isPrevDisabled(): boolean {
        return (this.min != "" && this._toDateString(this._visibleYear, this._visibleMonth, 1) <= this.min) ;
    }

    private _isNextDisabled(): boolean {
        return (this.max != "" && this._toDateString(this._visibleYear, this._visibleMonth, this._daysInMonth(this._visibleYear, this._visibleMonth)) >= this.max);
    }

    private _nextMonth(){
        this._visibleMonth ++
        if(this._visibleMonth > 11) {
            this._visibleMonth = 0;
            this._visibleYear ++
        }
    }

    private _toDateString(year: number, month: number, day: number): string{
        return `${String(year)}-${String(month + 1).padStart(2,"0")}-${String(day).padStart(2,"0")}`
    }

    private _selectedDay(day: number): void {
        this.value = this._toDateString(this._visibleYear, this._visibleMonth, day);
        this.dispatchEvent(new CustomEvent('change', 
        {
            detail: {value: this.value},
            bubbles: true,
            composed: true
        }));
    }

    private _isDisabled(data: string): boolean {
        if(this.min && data < this.min) {
            return true;
        }
        if(this.max && data > this.max) {
            return true;
        }
        return false;
    }

    render() {
        const days = [];
        let emptyDays = this._firstWeekday(this._visibleYear, this._visibleMonth);
        let totalDays = this._daysInMonth(this._visibleYear, this._visibleMonth);
        for(let i = 0; i < emptyDays; i++) {
            days.push(0);
        }
        for(let i = 0; i < totalDays; i++) {
            days.push(i + 1);
        }

        return html`
            <div class = "label">${this.value === "" ? `Select Date` : `${new Date(this.value).toLocaleDateString("en-US", options)}`}</div>
            <div class = "header">
                <span>${months[this._visibleMonth]} ${this._visibleYear}</span>
                <div>
                    <button class=" btn prev" ?disabled=${this._isPrevDisabled()} @click="${() => this._prevMonth()}"></button>
                    <button class= "btn next" ?disabled=${this._isNextDisabled()} @click="${() => this._nextMonth()}"></button>
                </div>
            </div>
            <div class = "grid">
                ${weekdays.map(p => html`<div class = "weekday">${p}</div>`)}
                ${days.map(p => html`
                    ${p === 0 ? html`<div></div>` : html`<button class="btn ${this._toDateString(this._visibleYear,this._visibleMonth, p) === this.value ? 'active' : ''}" ?disabled=${this._isDisabled(this._toDateString(this._visibleYear, this._visibleMonth, p))} @click="${() => this._selectedDay(p)}">${p}</button>`}
                `)}
            </div>
        `;
    }

    static styles = css`
        :host
        {
            display: flex;
            width: var(--cal-width);
            background-color: var(--onyks-surface-1);
            border-radius: var(--onyks-radius-xl);
            padding: var(--onyks-spacing-md);
            flex-direction: column;
            gap: var(--onyks-spacing-sm);
            font-family: var(--onyks-font);
        }

        .btn
        {
            border-radius: 50%;
            font-size: var(--cal-font);
            padding: var(--onyks-spacing-sm);
            text-align: center;
            border: none;
            background-color: transparent;
            color: inherit;
            cursor: pointer;
            outline: none;
            flex-shrink: 0;
            font-family: inherit;
            aspect-ratio: 1;
            transition: background-color 0.3s ease;
        }

        .btn:hover
        {
            background-color: var(--onyks-surface-1-hover);
        }

        .active
        {
            background-color: var(--onyks-accent);
            color: var(--onyks-on-accent);
        }

        .btn:disabled 
        {
            cursor: not-allowed;
            opacity: 0.5;
        }

        .prev::before
        {
            content: '\\F284';
            font-family: 'bootstrap-icons';
            display: block;
        }

        .next::before
        {
            content: '\\F285';
            font-family: 'bootstrap-icons';
            display: block;
        }

        .grid
        {
            display: grid;
            gap: var(--onyks-spacing-sm);
            grid-template-columns: repeat(7, 1fr);
        }

        .header
        {
            font-size: var(--cal-font);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
            
        .label
        {
            font-size: var(--onyks-size-3xl);
            border-bottom: 1px solid var(--onyks-surface-1-border);
        }

        .weekday
        {
            text-align: center;
            font-size: var(--cal-font);
            padding: var(--onyks-spacing-sm) 0;
        }

        :host([size="s"]) {
            --cal-font: var(--onyks-size-sm);
            --cal-width: 280px;
        }

        :host([size="m"]) {
            --cal-font: var(--onyks-size-md);
            --cal-width: 320px;
        }

        :host([size="l"]) {
            --cal-font: var(--onyks-size-lg);
            --cal-width: 360px;
        }

        :host([size="xl"]) {
            --cal-font: var(--onyks-size-xl);
            --cal-width: 420px;
        }
    `
}

declare global 
{
    interface HTMLElementTagNameMap 
    {
        'onyks-calendar': Onyks_Calendar
    }
}