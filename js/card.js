class Card extends HTMLElement {

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

    get description(){
        return this.getAttribute("description");
    }

    connectedCallback() {
        this.render()
    }

    render(){
        const template = 
        `
            <p>${this.title}</p>
        `;

        this.shadow.innerHTML = template;
    }
}

window.customElements.define('card-display', Card);