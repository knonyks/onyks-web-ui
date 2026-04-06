import {LitElement, css, html, type PropertyValues} from 'lit'
import {customElement, property, queryAssignedElements, state} from 'lit/decorators.js'
import { style_size, style_scrollbar } from './styles';

export class Onyks_Path_Manager
{
    private _folders: string[];

    constructor(initial: string[]) 
    {
        this._folders = initial;
    }

    get current_path(): string[]
    {
        return this._folders;
    }

    public back_to(index: number) 
    {
        this._folders = this._folders.slice(0, index + 1);
    }

    public add_folder(name: string): void
    {
        this._folders = [...this._folders, name]
    }
}

@customElement('onyks-path-chain')
export class Onyks_Path_Chain extends LitElement 
{
    render()
    {
        return html`<div class="content"><slot></slot></div>`;
    }

    static styles = css`
        :host 
        {
            display: flex;
            flex-shrink: 0;
        }

        .content
        {
            // background-color: #044B7F;
            background-color: var(--color-primary);
            display: block;
            padding: 10px;
            border-radius: 5px;
            cursor: pointer;
            height: fit-content;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 300px;
            color: black;
        }
    `;
}

@customElement('onyks-path')
export class Onyks_Path extends LitElement 
{
    @property({ type: String, reflect: true }) size = "m";

    @queryAssignedElements({ flatten: true })
    private _slot_elements!: Array<HTMLElement>;

    private manager = new Onyks_Path_Manager([]);

    @state()
    private initialized = false;

    protected firstUpdated(_changedProperties: PropertyValues): void 
    {
        const initial_folders = this._slot_elements.map(el => el.textContent?.trim() || '').filter(t => t !== '');
        if (initial_folders.length > 0) 
        {
            this.manager = new Onyks_Path_Manager(initial_folders);
        }
        this.initialized = true;
        this.requestUpdate();
    }

    private _handleItemClick(index: number) 
    {
        this.manager.back_to(index);    
        this.requestUpdate();
    
        this.dispatchEvent(new CustomEvent('path-changed', 
        {
            detail: { path: this.manager.current_path},
            bubbles: true,
            composed: true
        }));
    }

    protected async updated(_changedProperties: PropertyValues): Promise<void> 
    {
        super.updated(_changedProperties); 
        await this.updateComplete;
        setTimeout(() => {
            this.scrollLeft = this.scrollWidth;
        }, 0);
    }

    public add_folder(name: string) 
    {
        this.manager.add_folder(name);
        this.requestUpdate();
    }

    render()
    {
        if (!this.initialized) 
        {
            return html`<div style="display: none;"><slot></slot></div>`;
        }

        return html`
        ${this.manager.current_path.map((folder, i) => html`
            <onyks-path-chain class="item" @click=${() => this._handleItemClick(i)}>
                ${folder}
            </onyks-path-chain>
        `)}
        `;
    }

    static styles = [css`
        :host
        {
            // background-color: #E3B505;
            background-color: #161619;
            width: 100%;
            height: fit-content;
            display: flex;
            flex-direction: row;
            border-radius: 5px;
            padding: 10px;
            box-sizing: border-box;
            overflow-x: auto;
            gap: 10px; /* Odstęp między elementami a ikoną */
        }

        onyks-path-chain:not(:last-child)::after 
        {
            font-family: 'bootstrap-icons' !important;
            content: '\\f231';
            color: white;
            align-items: center;
            display: flex;
            margin-left: 10px;
        }
    `, style_scrollbar(':host'), style_size(':host')];
}

declare global 
{
    interface HTMLElementTagNameMap 
    {
        'onyks-path': Onyks_Path,
        'onyks-path-chain': Onyks_Path_Chain
    }
}