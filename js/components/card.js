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
        <style>
        p {
            padding: 10px 5px;
            background-color: white;
            margin: 20px;
            box-shadow: 0 1px 0 rgba(9,30,66,.25);
        }

        p:hover {
            background-color: #ccced8;
        }

        button {
            background-color: #ffb06d;
            color: white;
            border: none;
            border-radius: 15px;
            float: right;
            font-size: 10px;
            height: 20px;
            min-width: 50px;
        }

        button .edit-card {
            margin-right: 20px;
        }

        input {
            width: 60%;
            
            height: 20px;
        }

        div {
            padding: 10px 5px;
            background-color: white;
            margin: 20px;
            box-shadow: 0 1px 0 rgba(9,30,66,.25);
        }
        
        </style>
            <p>${this.title} <button id="card-${this.id}">DELETE</button></p>
        `;

        this.shadow.innerHTML = template;
    }
}

window.customElements.define('card-display', Card);