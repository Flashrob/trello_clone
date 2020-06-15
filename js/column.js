class Column extends HTMLElement {

    constructor() {
        super();

        if (!this.shadowRoot) {
            this.shadow = this.attachShadow({mode: 'open'});
            this.shadowRoot.innerHTML = ``;
        }
    }

    get id(){
        return this.getAttribute("id");
    }

    get title(){
        return this.getAttribute("title");
    }

    connectedCallback() {
        this.render()
    }

    render(){
        const template = 
        `
        <style>
        p {
            display: flex;
        }
        </style>
            <p>${this.title}</p>
            <div id="card"></div>
        `;

        this.shadow.innerHTML = template;
    }
}

window.customElements.define('column-display', Column);