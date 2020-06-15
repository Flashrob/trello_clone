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
            font-size: 20px;
            font-weight: 600;
            padding-left: 20px;
            text-decoration: underline;
        }
        
        card-display {
            margin: 10px 0;
            background-color: #ebecf0;
        }

        h4 {
            margin: 10px;
            padding-top: 5px;
            padding-bottom: 5px;
            padding-left: 20px;
            border-radius: 10px;
        }

        h4:hover {
            background-color: #ccced8;
        }

        </style>
            <p>${this.title}</p>
            <div class="card"></div>
        `;

        this.shadow.innerHTML = template;
    }
}

window.customElements.define('column-display', Column);