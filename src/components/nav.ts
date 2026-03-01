import { LitElement, html, css, type PropertyValueMap } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';


@customElement('onyks-nav')
export class Onyks_Nav extends LitElement 
{
  @property({ type: Boolean }) 
  rounded = false;

  @property({ type: String, reflect: true }) 
  size = 'm';

  @state() private is_mobile_menu_open = false;

  static styles = css`
    * {
      font-family: var(--font, inherit);
      color: var(--text-primary);
    }
    
    :host {
      display: block;
      width: 100%;
      position: relative;
    }

    :host([size="s"]) { font-size: var(--size-sm); --nav-height: 50px; }
    :host([size="m"]) { font-size: var(--size-md); --nav-height: 64px; }
    :host([size="l"]) { font-size: var(--size-lg); --nav-height: 72px; }
    :host([size="xl"]) { font-size: var(--size-xl); --nav-height: 80px; }

    nav {
      background-color: var(--surface-element);
      color: var(--text-primary);
      height: var(--nav-height);
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      position: relative; 
      transition: all 0.3s ease;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      border-bottom: 1px solid var(--surface-border);
    }

    .rounded { 
      border-radius: var(--radius-xl); 
      margin: var(--spacing-sm);
      border: 1px solid var(--surface-border);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    }
    
    .rounded.menu-open { 
      border-bottom-left-radius: 0; 
      border-bottom-right-radius: 0; 
    }
  `;
  constructor() 
  {
    super();
    this.addEventListener('mobile-menu-toggle', this._handleMenuToggle as EventListener);
  }

  private _handleMenuToggle(e: CustomEvent) 
  {
    this.is_mobile_menu_open = e.detail.isOpen;
    this.requestUpdate();
  }

  render() 
  {
    const classes = 
    {
      rounded: this.rounded,
      'menu-open': this.is_mobile_menu_open
    };
    return html`
      <nav class="${classMap(classes)}">
        <slot></slot>
      </nav>
    `;
  }
}

@customElement('onyks-nav-content')
export class Onyks_Nav_Content extends LitElement 
{
  @property({ type: Number, reflect: true }) mobilebreakpoint = 900;
  @property({ type: Number, reflect: true  }) maxviewitems = 3;

  @state() private is_mobile = false;
  @state() private is_menu_open = false;
  @state() private current_page = 0;

  static styles = css`
    :host {
      position: static; 
      display: flex;
      align-items: center;
      flex: 1;
      height: 100%;
      justify-content: center;
      z-index: 1;
    }

    :host([mobile-mode]) {
      justify-content: flex-end;
    }

    .desktop-wrapper {
      display: flex;
      height: 100%;
    }

    .next-btn {
      background: transparent;
      border: none;
      color: var(--text-secondary);
      height: calc(100% - 16px);
      margin: 8px;
      width: fit-content;
      padding: 0 var(--spacing-md);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-md);
      transition: all 0.2s ease;
    }
    
    .next-btn:hover {
        background: var(--surface-hover);
        color: var(--text-primary);
    }

    .mobile-wrapper { position: static; }

    .hamburger {
      background: transparent;
      border: none;
      color: inherit;
      padding: 10px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .line { display: block; width: 24px; height: 2px; background-color: currentColor; transition: 0.3s; }
    .hamburger.active .line:nth-child(1) { transform: translateY(8px) rotate(45deg); }
    .hamburger.active .line:nth-child(2) { opacity: 0; }
    .hamburger.active .line:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }

    .mobile-dropdown-wrapper {
      position: absolute;
      top: 100%; 
      left: 0;
      width: 100%; 
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      background-color: var(--surface-element);
      z-index: 999;
      box-shadow: 0 10px 30px rgba(0,0,0,0.15);
    }
    
    .mobile-dropdown-wrapper.open {
      grid-template-rows: 1fr;
      border-top: 1px solid var(--surface-border); 
    }

    :host-context(onyks-nav[rounded]) .mobile-dropdown-wrapper.open {
      border-bottom-left-radius: var(--radius-xl);
      border-bottom-right-radius: var(--radius-xl);
      margin: 0 var(--spacing-sm);
      width: calc(100% - calc(var(--spacing-sm) * 2));
      border: 1px solid var(--surface-border);
      border-top: none;
    }

    .dropdown-inner { overflow: hidden; }
    .dropdown-content-scroll { padding: 8px 0; }
    ::slotted(*) { display: flex; }
  `;

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
    if (_changedProperties.has('maxviewitems') || _changedProperties.has('current_page') || _changedProperties.has('is_mobile')) 
    {
      this._updateVisibility();
    }
  }

  private _handleResize() 
  {
    this._checkMobile();
  }

  private _checkMobile() 
  {
    const wasMobile = this.is_mobile;
    this.is_mobile = window.innerWidth <= this.mobilebreakpoint;

    if (this.is_mobile) 
    {
      this.setAttribute('mobile-mode', '');
    } 
    else 
    {
      this.removeAttribute('mobile-mode');
    }

    if (wasMobile !== this.is_mobile) 
    {
      this.toggleMenu(false);
      this.current_page = 0;
      this.requestUpdate(); 
    }
  }

  private toggleMenu(forceState?: boolean) 
  {
    const newState = forceState !== undefined ? forceState : !this.is_menu_open;
    this.is_menu_open = newState;
    this.dispatchEvent(new CustomEvent('mobile-menu-toggle', 
    {
        detail: 
        { 
          isOpen: this.is_menu_open 
        },
        bubbles: true,
        composed: true
    }));
  }

  private _handleSlotChange()
  {
    this._updateVisibility();
    this.requestUpdate();
  }

  private get _slottedElements(): HTMLElement[] 
  {
    const slot = this.shadowRoot?.querySelector('slot');
    if (!slot) return [];
    return (slot.assignedElements({ flatten: true }) as HTMLElement[]);
  }

  private _updateVisibility() 
  {
    const elements = this._slottedElements;
    const limit = Number(this.maxviewitems);

    elements.forEach((el, index) => 
    {
      if (this.is_mobile) 
      {
        el.style.display = 'flex';
        el.style.width = '100%';
        el.style.height = '50px'; 
        el.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
        el.style.padding = '0'; 
      } 
      else 
      {
        el.style.width = '';
        el.style.height = '100%';
        el.style.borderBottom = '';
        const start = this.current_page * limit;
        const end = start + limit;
        el.style.display = (index >= start && index < end) ? '' : 'none';
      }
    });
  }

  private _nextPage = (e: Event) => 
  {
    e.stopPropagation();
    const elements = this._slottedElements;
    const limit = Number(this.maxviewitems);
    if (!elements.length) return;
    const totalPages = Math.ceil(elements.length / limit);
    this.current_page = (this.current_page + 1) % totalPages;
  };

  private _handleOptionClick(e: Event) 
  {
    const target = e.target as HTMLElement;
    const option = target.closest('onyks-nav-option');
    if (option && option instanceof Onyks_Nav_Option) 
    {
      this._slottedElements.forEach(el => 
      {
        if (el instanceof Onyks_Nav_Option) el.selected = false;
      });
      option.selected = true;
      if (this.is_mobile) this.toggleMenu(false);
    }
  }

  render() 
  {
    const elements = this._slottedElements;
    const limit = Number(this.maxviewitems);
    const showNextBtn = !this.is_mobile && elements.length > limit;

    if (this.is_mobile) {
      return html`
        <div class="mobile-wrapper">
           <button class="hamburger ${classMap({ active: this.is_menu_open })}" @click="${() => this.toggleMenu()}">
              <span class="line"></span>
              <span class="line"></span>
              <span class="line"></span>
           </button>
           
           <div class="mobile-dropdown-wrapper ${classMap({ open: this.is_menu_open })}">
             <div class="dropdown-inner">
                <div class="dropdown-content-scroll">
                   <slot @slotchange="${this._handleSlotChange}"></slot>
                </div>
             </div>
           </div>
        </div>
      `;
    }

    return html`
      <div class="desktop-wrapper">
        <slot @slotchange="${this._handleSlotChange}"></slot>
        ${showNextBtn ? html`<div class="next-btn" @click="${this._nextPage}">&#10140;</div>` : ''}
      </div>
    `;
  }
}

@customElement('onyks-nav-option')
export class Onyks_Nav_Option extends LitElement 
{
  @property({type: String}) href = '';
  @property({type: Boolean, reflect: true}) selected = false;

  static styles = css`
    :host { 
        display: block; 
        cursor: pointer; 
        height: 100%;
    }
    
    .nav-item {
        padding: 0 var(--spacing-md);
        margin: 0; 
        height: 100%; 
        display: flex;
        align-items: center;
        white-space: nowrap;
        color: var(--text-secondary);
        text-decoration: none;
        box-sizing: border-box;
        transition: all 0.2s ease;
        width: 100%;
        font-size: inherit;
        font-weight: 500;
        border-radius: 0; 
        border-bottom: 3px solid transparent; 
    }

    .nav-item:hover { 
        background-color: var(--surface-hover); 
        color: var(--text-primary);
    }

    :host([selected]) .nav-item {
        color: var(--color-primary);
        background-color: var(--surface-hover);
        font-weight: 600;
        border-bottom: 3px solid var(--color-primary);
    }

    @media (max-width: 900px) {   
        .nav-item {
            margin: 2px 8px;
            height: 44px;
            border-radius: var(--radius-sm);
            border-bottom: none; 
        }
        
        :host([selected]) .nav-item { 
            border-left: 3px solid var(--color-primary); 
            border-bottom: none;
            background-color: var(--surface-hover);
        }
    }
  `;

  render() 
  {
    return this.href 
      ? html`<a class="nav-item" href="${this.href}"><slot></slot></a>`
      : html`<div class="nav-item"><slot></slot></div>`;
  }
}

declare global 
{
  interface HTMLElementTagNameMap 
  {
    'onyks-nav': Onyks_Nav,
    'onyks-nav-content': Onyks_Nav_Content,
    "onyks-nav-option":Onyks_Nav_Option
  }
}