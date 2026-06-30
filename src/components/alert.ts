import {LitElement, css, html} from 'lit'
import {customElement, property} from 'lit/decorators.js'
import { onyksStyleSize } from './_styles';

@customElement('onyks-alert')
export class OnyksAlert extends LitElement 
{
    @property({type: String, reflect: true})
    size = 'm';

    @property({type: String, reflect: true})
    type = 'info';

    render()
    {
       return html`<span id="icon" part="icon"></span><span id="text" part="text" class="onyks-size"><slot></slot></span>`;
    }

    static styles = [css`
        :host
        {
            font-family: var(--onyks-font);
            border-radius: var(--onyks-radius-sm);
            display: flex;
            gap: 10px;
            height: fit-content;
            padding: var(--onyks-spacing-md);
            box-sizing: border-box;
            flex-shrink: 0;
            vertical-align: middle;
            user-select: none;
        }

        #text
        {
            align-items: center;
            display: flex;
            text-align: inherit;
        }


        :host([size="s"]) > #icon::before
        {
            font-size: calc(var(--onyks-size-sm)*2);
            font-weight: normal;
            display: inline-block;
            height: calc(var(--onyks-size-sm)*2);
            width: calc(var(--onyks-size-sm)*2);
            line-height:  calc(var(--onyks-size-sm)*2);
            text-align: center;
            vertical-align: middle;
        }

        :host([size="m"]) > #icon::before
        {
            font-size: calc(var(--onyks-size-md)*2);
            font-weight: normal;
            display: inline-block;
            height: calc(var(--onyks-size-md)*2);
            width: calc(var(--onyks-size-md)*2);
            line-height: calc(var(--onyks-size-md)*2);
            text-align: center;
            vertical-align: middle;
        }

        :host([size="l"]) > #icon::before
        {
            font-size: calc(var(--onyks-size-lg)*2);
            font-weight: normal;
            display: inline-block;
            height: calc(var(--onyks-size-lg)*2);
            width: calc(var(--onyks-size-lg)*2);
            line-height:  calc(var(--onyks-size-lg)*2);
            text-align: center;
            vertical-align: middle;
        }

        :host([size="xl"]) > #icon::before
        {
            font-size: calc(var(--onyks-size-xl)*2);
            font-weight: normal;
            display: inline-block;
            height: calc(var(--onyks-size-xl)*2);
            width: calc(var(--onyks-size-xl)*2);
            line-height:  calc(var(--onyks-size-xl)*2);
            text-align: center;
            vertical-align: middle;
        }
            
        :host([type="info"])
        { 
            background-color: var(--onyks-info);
            color: var(--onyks-on-info);
            border: 1px solid var(--onyks-surface-1-border);
        }

        :host([type="warning"])
        { 
            background-color: var(--onyks-warning);
            color: var(--onyks-on-warning);
            border: 1px solid var(--onyks-surface-1-border);
        }

        :host([type="error"])
        { 
            background-color: var(--onyks-error);
            color: var(--onyks-on-error);
            border: 1px solid var(--onyks-surface-1-border);
        }

        :host([type="success"])
        { 
            background-color: var(--onyks-success);
            color: var(--onyks-on-success);
            border: 1px solid var(--onyks-surface-1-border);
        }

        #icon
        {
            font-family: 'bootstrap-icons';
        }

        :host([type="warning"]) > #icon::before
        {
            content: '\\F335';
        }

        :host([type="success"]) > #icon::before
        {
            content: '\\F26B';
        }

        :host([type="info"]) > #icon::before
        {
            content: '\\F431';
        }

        :host([type="error"]) > #icon::before
        {
            content: '\\F337';
        }
    `, onyksStyleSize]
}

declare global
{
    interface HTMLElementTagNameMap 
    {
        'onyks-alert': OnyksAlert
    }
}