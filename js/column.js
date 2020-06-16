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
            width: 100%;
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

        input {
            width: 70%;
            margin-right: 5px;
            height: 20px;
        }

        form {
            margin: 10px;
            padding-left: 10px;
        }

        .add {
            background-color: green;
            color: white;
            border: none;
            border-radius: 15px;
            font-size: 13px;
            height: 25px;
        }

        span {
            position: relative;
            bottom: 30px;
            margin-left: auto;
            margin-right: 10px;
            background-color: #7bedff;
            border-radius: 20px;
            padding: 5px;
        }

        </style>
            <p><u>${this.title}</u><span class="delete" id="${this.id}">X</span></p>
            <div class="card"></div>
        `;

        this.shadow.innerHTML = template;
    }
}

window.customElements.define('column-display', Column);