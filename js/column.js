class Column extends HTMLElement {

    constructor() {
        super();

        if (!this.shadowRoot) {
            this.shadow = this.attachShadow({mode: 'open'});
            this.shadowRoot.innerHTML = ``;
        }
    }

    connectedCallback() {
        this.render()
    }

    render(){
        const template = 
        `
        <div>
            <h1>Hello World</h1>
        </div>
        `;

        this.shadow.innerHTML = template;
    }
}

window.customElements.define('column-display', Column);