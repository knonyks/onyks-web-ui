import {LitElement, css, html} from 'lit'
import {customElement, property} from 'lit/decorators.js'

@customElement('onyks-explorer')
export class Onyks_Explorer extends LitElement 
{
    @property({type: Number, reflect: true})
    col = 5

    @property({type: String, reflect: true})
    view = "detailed"

    render() 
    {
        return html`
            <slot></slot>
        `
    }

    static styles = css`
        :host 
        {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            grid-template-rows: repeat(1, 1fr);
            grid-column-gap: 20px;
            grid-row-gap: 20px;
        }
    
    `
}

@customElement('onyks-explorer-object')
export class Onyks_Explorer_Object extends LitElement 
{
    @property({type: String, reflect: true})
    name = "Object"

    @property({type: String, reflect: true})
    icon = "📂"

    render() 
    {
        return html`
            <div class="icon">${this.icon}</div>
            <div class="name">${this.name}</div>
        `
    }

    static styles = css`
        :host 
        {
            display: flex;
            flex-direction: column;
            background-color: red;
            height: 100px;
            padding: 20px;
            border-radius: 15px;
        }
            
        .icon
        {
            display: block;
            width: 100%;
            height: 100%;
            font-size: 3rem;
            text-aling: center;
        }

        .name
        {
            display: block;
            width: 100%;
            text-align: center;
        }
        `
    
}

@customElement('onyks-file')
export class Onyks_File extends Onyks_Explorer_Object 
{
    @property({type: String, reflect: true})
    name = "File!"
}

@customElement('onyks-folder')
export class Onyks_Folder extends Onyks_Explorer_Object 
{
    @property({type: String, reflect: true})
    name = "Folder!"
}

declare global 
{
    interface HTMLElementTagNameMap 
    {
        'onyks-explorer': Onyks_Explorer,
        'onyks-file': Onyks_File,
        'onyks-folder': Onyks_Folder
    }
}