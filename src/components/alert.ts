import {LitElement, css, html} from 'lit'
import {customElement, property} from 'lit/decorators.js'
import { applyStyle } from './_styles';

@customElement('onyks-alert')
export class OnyksAlert extends LitElement 
{
    @property({type: String, reflect: true})
    size = 'm';

    @property({type: String, reflect: true})
    type = 'info';

    render()
    {
       return html`<span id="icon" part="icon"></span><span id="text" part="text"><slot></slot></span>`;
    }

    static styles = [css`
        :host
        {
            font-family: var(--font);
            border-radius: var(--radius-sm);
            display: flex;
            gap: 10px;
            height: fit-content;
            padding: var(--spacing-md);
            box-sizing: border-box;
            flex-shrink: 0;
            vertical-align: middle;
        }

        #text
        {
            align-items: center;
            display: flex;
            text-align: inherit;
        }


        :host([size="s"]) > #icon::before
        {
            font-size: calc(var(--size-sm)*2);
            font-weight: normal;
            display: inline-block;
            height: calc(var(--size-sm)*2);
            width: calc(var(--size-sm)*2);
            line-height:  calc(var(--size-sm)*2);
            text-align: center;
            vertical-align: middle;
        }

        :host([size="m"]) > #icon::before
        {
            font-size: calc(var(--size-md)*2);
            font-weight: normal;
            display: inline-block;
            height: calc(var(--size-md)*2);
            width: calc(var(--size-md)*2);
            line-height:  calc(var(--size-md)*2);
            text-align: center;
            vertical-align: middle;
        }

        :host([size="l"]) > #icon::before
        {
            font-size: calc(var(--size-lg)*2);
            font-weight: normal;
            display: inline-block;
            height: calc(var(--size-lg)*2);
            width: calc(var(--size-lg)*2);
            line-height:  calc(var(--size-lg)*2);
            text-align: center;
            vertical-align: middle;
        }

        :host([size="xl"]) > #icon::before
        {
            font-size: calc(var(--size-xl)*2);
            font-weight: normal;
            display: inline-block;
            height: calc(var(--size-xl)*2);
            width: calc(var(--size-xl)*2);
            line-height:  calc(var(--size-xl)*2);
            text-align: center;
            vertical-align: middle;
        }
            
        :host([type="info"])
        { 
            background-color: var(--alert-info-background);
            color: var(--alert-info-text-color);
            border: 1px solid var(--alert-info-border-color);
        }

        :host([type="warning"])
        { 
            background-color: var(--alert-warning-background);
            color: var(--alert-warning-text-color);
            border: 1px solid var(--alert-warning-border-color);
        }

        :host([type="error"])
        { 
            background-color: var(--alert-error-background);
            color: var(--alert-error-text-color);
            border: 1px solid var(--alert-error-border-color);
        }

        :host([type="success"])
        { 
            background-color: var(--alert-success-background);
            color: var(--alert-success-text-color);
            border: 1px solid var(--alert-success-border-color);
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
    `, applyStyle('size')]
}

declare global
{
    interface HTMLElementTagNameMap 
    {
        'onyks-alert': OnyksAlert
    }
}