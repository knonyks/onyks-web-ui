import { LitElement, html, css, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { onyksStyleScrollbar, onyksStyleSize } from './_styles.ts';

export interface OnyksItem 
{
  type: string;
  name: string;
}

export interface OnyksItemType
{
  type: string;
  icon: string;
  isLikeDir: boolean;
}

@customElement('onyks-file-explorer')
export class OnyksFileExplorer extends LitElement 
{
  @property({ type: String, reflect: true }) 
  size = "m";

  @property({ type: Boolean, reflect: true })
  multiple = false;

  @property({ type: Array })
  content: OnyksItem[] = [];

  @property({ type: String, reflect: true, attribute: 'empty-alert' })
  emptyAlert = "The folder is empty";

  @property({type: Array, reflect: true, attribute: 'types'})
  types: OnyksItemType[] = [{type: 'folder', icon: 'F3D9', isLikeDir: true}, {type: 'file', icon: 'F392', isLikeDir: false}];
  // 

  @state()
  private _selectedItems: Set<string> = new Set();

  static styles = [css`
    :host  
    {
      display: block;
      border-radius: var(--onyks-radius-md);
      padding: 10px;
      background: var(--onyks-surface-1);
      color: var(--onyks-on-surface-1);
      width: 600px;
      font-family: var(--onyks-font);
      box-sizing: border-box;
      height: 300px;
      border: 1px solid var(--onyks-surface-1-border);
      user-select: none;
    }

    .explorer
    {
      overflow: auto;
      width: 100%;
      height: 100%;
    }


    .item 
    {
      display: flex;
      align-items: center;
      padding: 8px;
      cursor: pointer;
      /* border-radius: var(--onyks-radius-sm); */
      user-select: none;
      transition: background 0.2s;
      border: 1px solid transparent;
    }
    
    .item:hover 
    {
      border: 1px solid var(--onyks-surface-1-border);
    }

    .item.selected 
    {
      background: var(--onyks-surface-1-selected);
    }

    .item:first-child 
    {
      border-top-left-radius: var(--onyks-radius-md);
      border-top-right-radius: var(--onyks-radius-md);
    }

    .item:last-child 
    {
      border-bottom-left-radius: var(--onyks-radius-md);
      border-bottom-right-radius: var(--onyks-radius-md);
    }

    .icon 
    {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
      line-height: 1;
    }

    .name 
    {
      line-height: 1.2; 
    }
  `, onyksStyleScrollbar, onyksStyleSize];
  
  getSelectedItems(): OnyksItem[] 
  {
    return this.content.filter((item) => this._selectedItems.has(item.name));
  }

  private handleItemClick(item: OnyksItem): void 
  {
    const newSelected = new Set(this._selectedItems);

    if (this.multiple) 
    {
      if (newSelected.has(item.name)) 
      {
        newSelected.delete(item.name);
      } 
      else 
      {
        newSelected.add(item.name);
      }
    } 
    else 
    {
      newSelected.clear();
      newSelected.add(item.name);
    }

    this._selectedItems = newSelected;
  }

  private handleItemDblClick(item: OnyksItem): void 
  {
    if (this.types.filter((obj) => obj.isLikeDir).find((obj) => obj.type == item.type)) 
    {
      this.triggerEnterFolder(item);
    }
  }

  private triggerEnterFolder(folder: OnyksItem): void 
  {
    this._selectedItems = new Set();
    
    this.dispatchEvent(
      new CustomEvent<{ folder: OnyksItem }>('enter-folder', 
      {
        detail: {folder},
        bubbles: true,
        composed: true,
      })
    );
  }

  protected render(): TemplateResult 
  {
    if (!this.content || this.content.length === 0) 
    {
      return html`<div style="padding: var(--onyks-spacing-md); color: var(--onyks-on-surface-1);">${this.emptyAlert}</div>`;
    }

    let itemsTypesStyles = ''
    this.types.forEach(element => 
    {
      itemsTypesStyles += `
        .icon.${element.type}::before 
        {
          content: "\\${element.icon}";
          font-family: "bootstrap-icons";
          font-size: 1.2em;
        }
      `;
    });

    return html`
      <style>
        ${itemsTypesStyles}
      </style>
      <div class="explorer onyks-size onyks-scrollbar">
        ${this.content.map(
          (item) => html`
            <div
              class="item ${this._selectedItems.has(item.name) ? 'selected' : ''}"
              @click=${() => this.handleItemClick(item)}
              @dblclick=${() => this.handleItemDblClick(item)}
            >
              <span class="icon ${item.type}"></span>
              <span class="name">${item.name}</span>
            </div>
          `
        )}
      </div>
    `;
  }
}

declare global 
{
  interface HTMLElementTagNameMap 
  {
    'onyks-file-explorer': OnyksFileExplorer
  }
}