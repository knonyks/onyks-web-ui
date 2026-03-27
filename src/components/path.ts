import {LitElement, css, html} from 'lit'
import {customElement, property} from 'lit/decorators.js'



export class oPath
{
    id: string;
    ui: any;
    data: any = [];

    constructor(id: string, data: any)
    {
        this.id = id
        this.ui = document.querySelector(this.id)
        this.data = data
    }



    
    prev_folder()
    {

    }

    // get_current_path(style = 'linux', type = 'str')
    // {
        // let slash = '/'
        // let result = ''
        // if(style == 'windows')
        // {
        //     slash = '\\'
        // }
        // if(type == 'str')
        // {
            // result = slash
            // this.data.forEach(element => {
            //     result += element
            //     result += slash
            // });
            // return result
        // }
        // else
        // {
        //     return this.data
        // }
    // }

    append(chains: any)
    {
        if(typeof(chains) == 'string')
        {
            this.data.push(chains)
        }
        else
        {
            this.data.push(...chains)
        }
        this.update()
    }

    update()
    {

    }
}

@customElement('onyks-path')
export class Onyks_Path extends LitElement 
{
    @property({type: String, reflect: true})
    size = 'l';

    @property({type: String, reflect: true})
    background = 'red';

    private add_separators(e: Event) 
    {
        const slot = e.target as HTMLSlotElement;
        const all = slot.assignedElements(); 
    
        const chains = all.filter(el => el.tagName !== 'onyks-path-separator'.toUpperCase());
        const separators = all.filter(el => el.tagName === 'onyks-path-separator'.toUpperCase());

        const to_delete = new Set(separators);

        for (let i = chains.length - 1; i > 0; i--) 
        {
            const current_chain = chains[i];
        
            const potential_separator = current_chain.previousElementSibling;

            if (potential_separator && potential_separator.tagName === 'onyks-path-separator'.toUpperCase()) 
            {
                to_delete.delete(potential_separator);
            } 
            else 
            {
                const elementZ = document.createElement('onyks-path-separator');
                elementZ.textContent = '▶';
                current_chain.parentNode?.insertBefore(elementZ, current_chain);
            }
        }
        to_delete.forEach(z => z.remove());
    }

    render() 
    {
        return html`
            <slot class="size-${this.size}" @slotchange=${this.add_separators}></slot>
        `
    }

    static styles = css`
        :host 
        {
            display: flex;
            flex-direction: row;
            gap: 10px;
            overflow: auto;
            padding: 10px;
            background-color: var(--surface-hover);
            border-radius: 10px;
            height: fit-content;
        }

        .size-s
        {
            font-size: var(--size-sm);
        }

        .size-m
        {
            font-size: var(--size-md);
        }

        .size-l
        {
            font-size: var(--size-lg);
        }

        .size-xl
        {
            font-size: var(--size-xl);
        }
    `
}

@customElement('onyks-path-chain')
export class Onyks_Path_Chain extends LitElement 
{
    @property({type: Number, reflect: true})
    index = 0

    constructor() 
    {
        super();
        this.addEventListener('click', this.clicked_path);
    }

    render() 
    {
        return html`
            <slot></slot>
        `
    }

    private clicked_path()
    {
        const event = new CustomEvent('path-clicked', 
        {
            detail: {index: this.index},
            bubbles: true,
            composed: true
    });
    this.dispatchEvent(event);
  }

    static styles = css`
        :host
        {
            background-color: black;
            padding: 10px 20px;
            border-radius: 5px;
            flex-shrink: 0;
            cursor: pointer;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 200px;
        }
    `
}

@customElement('onyks-path-separator')
export class Onyks_Path_Separator extends LitElement 
{
    render() 
    {
        return html`
            <slot></slot>
        `
    }

    static styles = css`
        :host
        {
            border-radius: 5px;
            flex-shrink: 0;
            cursor: pointer;
            text-aling: center;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    `
}

declare global 
{
    interface HTMLElementTagNameMap 
    {
        'onyks-path': Onyks_Path
    }
}