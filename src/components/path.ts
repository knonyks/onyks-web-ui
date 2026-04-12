import {LitElement, css, html, type PropertyValues} from 'lit'
import {customElement, property, state} from 'lit/decorators.js'
import { style_size, style_scrollbar } from './styles';

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

    @property({ type: Array, reflect: true}) content: string[] = [];

    @state()
    private _current_path: string[] = [];

    protected willUpdate(_changedProperties: PropertyValues) 
    {
        super.willUpdate(_changedProperties);
        if (_changedProperties.has('content')) 
        {
            this._current_path = [...this.content];
        }
    }

    protected updated(_changedProperties: PropertyValues) 
    {
        super.updated(_changedProperties);
        if (_changedProperties.has('_current_path')) 
        {
            setTimeout(() => 
            {
                this.scrollLeft = this.scrollWidth;
            }, 0);
        }
    }

    private _handleItemClick(index: number) 
    {
        this._current_path = this._current_path.slice(0, index + 1);
        
        this.dispatchEvent(new CustomEvent('path-changed', 
        {
            detail: { path: [...this._current_path] },
            bubbles: true,
            composed: true
        }));
    }

    public add_folder(name: string) 
    {
        this._current_path = [...this._current_path, name];
    }

    public current_path()
    {
        return [...this._current_path];
    }

    render()
    {
        return html`
        ${this._current_path.map((folder, i) => html`
            <onyks-path-chain class="item" @click=${() => this._handleItemClick(i)}>
                ${folder}
            </onyks-path-chain>
        `)}
        `;
    }

    static styles = [css`
        :host
        {
            background-color: var(--surface-element);
            width: 100%;
            height: fit-content;
            display: flex;
            flex-direction: row;
            border-radius: 5px;
            padding: 10px;
            box-sizing: border-box;
            overflow-x: auto;
            gap: 10px;
            border: 1px solid var(--surface-border);
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