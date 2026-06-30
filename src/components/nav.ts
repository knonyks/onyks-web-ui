import { LitElement, html, css, type PropertyValueMap, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { onyksStyleScrollbar, onyksStyleSize } from './_styles';

@customElement('onyks-nav')
export class OnyksNav extends LitElement 
{
  @property({ type: String, reflect: true }) 
  size = 'm';

  @property({ type: Number, reflect: true, attribute: 'mobile-breakpoint' }) 
  mobileBreakPoint = 900;

  @property({ type: Number, reflect: true, attribute: 'max-view-items' }) 
  maxViewItems = 3;

  @state() private isMobile = false;
  @state() private isMenuOpen = false;
  @state() private currentPage = 0;

  static styles = [css`
    * 
    {
      box-sizing: border-box;
      color: var(--onyks-on-surface-1);
    }
    
    :host 
    {
      display: block;
      width: 100%;
      position: relative;
      background-color: var(--onyks-surface-1);
      z-index: 1;
    }

    :host([size="s"])
    {
      --nav-height: 50px; 
    }

    :host([size="m"]) 
    {
      --nav-height: 64px;
    }

    :host([size="l"])
    {
      --nav-height: 72px;
    }

    :host([size="xl"])
    {
      --nav-height: 80px;
    }

    nav 
    {
      height: var(--nav-height);
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative; 
      transition: all 0.3s ease;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      /* border-bottom: 1px solid var(--onyks-surface-1-border); */
    }

    .desktopWrapper
    {
      display: flex;
      height: 100%;
      flex: 1;
      align-items: center;
      justify-content: center;
    }

    .nextBtn, .openMenuBtn
    {
      background: transparent;
      border: 1px solid var(--onyks-surface-1-border);
      border-radius: var(--onyks-radius-md);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      margin: 8px;
      transition: all 0.2s ease;
      height: 60%;
      aspect-ratio: 1 / 1;
    }
 
    .nextBtn:hover 
    {
      background: var(--onyks-surface-1-hover);
    }

    .nextBtn::before
    {
      font-family: 'bootstrap-icons';
      content: '\\F231';
    }


    .openMenuBtn::before
    {
      font-family: 'bootstrap-icons';
      content: '\\F479';
    }

    .mobileWrapper 
    {
      display: flex;
      flex: 1;
      justify-content: flex-end;
      height: 100%;
      align-items: center;
    }

    .mobileDropdownWrapper 
    {
      position: absolute;
      top: calc(100% + 1px); 
      left: 0;
      width: 100%; 
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      background-color: var(--onyks-surface-1);
      z-index: 999;
      box-shadow: 0 10px 30px rgba(0,0,0,0.15);
      border-bottom-left-radius: var(--onyks-radius-md);
      border-bottom-right-radius: var(--onyks-radius-md);
      overflow: hidden;
    }
    
    .mobileDropdownWrapper.open 
    {
      grid-template-rows: 1fr;
    }

    .dropdownInner 
    { 
      overflow: hidden; 
    }
    
    .dropdownContentScroll 
    { 
      display: flex;
      flex-direction: column;
      max-height: calc(60vh - var(--nav-height) - 20px); 
      overflow-y: auto;
    }


    ::slotted([slot="nav"])
    {
      padding: 0 var(--onyks-spacing-md);
      box-sizing: border-box;
      margin: 0;
      height: 100%;
      display: flex;
      align-items: center;
      white-space: nowrap;
      text-decoration: none;
      transition: all 0.2s ease;
      /* border-bottom: 3px solid transparent; */
      cursor: pointer;
      background: transparent;
      /* border-top: none; */
      border-left: none;
      border-right: none;
      color: var(--onyks-on-surface-1);
    }

    ::slotted([slot="nav"]:hover) 
    { 
      background-color: var(--surface-hover); 
    }

    ::slotted([slot="nav"][selected]) 
    {
      background-color: var(--onyks-surface-1-selected);
      border-bottom: 3px solid var(--onyks-accent);
    }

    :host([mobile-mode]) ::slotted([slot="nav"]) 
    {
      height: fit-content;
      padding: var(--onyks-spacing-md);
      width: 100%;
      border-bottom: none;
    }
    
    :host([mobile-mode]) ::slotted([slot="nav"][selected])
    { 
      border-left: 10px solid var(--onyks-accent); 
      border-bottom: none;
      background-color: var(--onyks-surface-1-hover);
    }
  `, onyksStyleSize, onyksStyleScrollbar];

  constructor() 
  {
    super();
    this._handleResize = this._handleResize.bind(this);
    this._handleOptionClick = this._handleOptionClick.bind(this);
  }

  connectedCallback() 
  {
    super.connectedCallback();
    this._checkMobile();
    window.addEventListener('resize', this._handleResize);
    this.addEventListener('click', this._handleOptionClick);
  }

  disconnectedCallback() 
  {
    window.removeEventListener('resize', this._handleResize);
    this.removeEventListener('click', this._handleOptionClick);
    super.disconnectedCallback();
  }

  protected updated(_changedProperties: PropertyValueMap<any>): void 
  {
    if (_changedProperties.has('mobileBreakPoint') || _changedProperties.has('maxViewItems') || _changedProperties.has('currentPage') || _changedProperties.has('isMobile')) 
    {
      this._updateVisibility();
    }
    this._updateVisibility();
  }

  private _handleResize() 
  {
    this._checkMobile();
  }

  private _checkMobile() 
  {
    const wasMobile = this.isMobile;
    this.isMobile = window.innerWidth <= this.mobileBreakPoint;

    if (this.isMobile) 
    {
      this.setAttribute('mobile-mode', '');
    } 
    else 
    {
      this.removeAttribute('mobile-mode');
    }

    if (wasMobile !== this.isMobile) 
    {
      this.toggleMenu(false);
      this.currentPage = 0;
      this.requestUpdate(); 
    }
  }

  private toggleMenu(forceState?: boolean) 
  {
    this.isMenuOpen = forceState !== undefined ? forceState : !this.isMenuOpen;
  }

  private get _slottedElements(): HTMLElement[] 
  {
    const slot = this.shadowRoot?.querySelector('slot[name="nav"]') as HTMLSlotElement;
    if (!slot) return [];
    return slot.assignedElements({ flatten: true }) as HTMLElement[];
  }

  private _handleSlotChange()
  {
    this._updateVisibility();
    this.requestUpdate();
  }

  private _updateVisibility() 
  {
    const elements = this._slottedElements;
    const limit = Number(this.maxViewItems);

    elements.forEach((el, index) => 
    {
      if (this.isMobile) 
      {
        el.style.display = 'flex';
      } 
      else 
      {
        const start = this.currentPage * limit;
        const end = start + limit;
        el.style.display = (index >= start && index < end) ? '' : 'none';
      }
    });
  }

  private _nextPage = (e: Event) => 
  {
    e.stopPropagation();
    const elements = this._slottedElements;
    const limit = Number(this.maxViewItems);
    if (!elements.length) return;
    const totalPages = Math.ceil(elements.length / limit);
    this.currentPage = (this.currentPage + 1) % totalPages;
  };

  private _handleOptionClick(e: Event) 
  {
    const target = e.target as HTMLElement;
    const slottedElements = this._slottedElements;
    
    const clickedItem = slottedElements.find(el => el === target || el.contains(target));
    
    if (clickedItem) 
    {
      slottedElements.forEach(el => el.removeAttribute('selected'));
      clickedItem.setAttribute('selected', '');
      if (this.isMobile) this.toggleMenu(false);
    }
  }

  render()
  {
    const elements = this._slottedElements;
    const limit = Number(this.maxViewItems);
    const showNextBtn = !this.isMobile && elements.length > limit;

    return html`
      <nav class="${this.isMenuOpen? 'menu-open':nothing}">
        
        ${this.isMobile ? html`
          <div class="mobileWrapper onyks-size">
             <button class="openMenuBtn onyks-size ${classMap({ active: this.isMenuOpen })}" @click="${() => this.toggleMenu()}">
             </button>
             
             <div class="mobileDropdownWrapper ${classMap({ open: this.isMenuOpen })}">
               <div class="dropdownInner">
                  <div class="dropdownContentScroll onyks-scrollbar">
                     <slot name="nav" @slotchange="${this._handleSlotChange}"></slot>
                  </div>
               </div>
             </div>
          </div>
        ` : html`
          <div class="desktopWrapper onyks-size">
            <slot name="nav" @slotchange="${this._handleSlotChange}"></slot>
            ${showNextBtn ? html`<button class="nextBtn onyks-size" @click="${this._nextPage}"></button>` : ''}
          </div>
        `}
      </nav>
    `;
  }
}

declare global 
{
  interface HTMLElementTagNameMap 
  {
    'onyks-nav': OnyksNav
  }
}