class AddColumn extends HTMLElement {

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

        input {
            width: 70%;
            margin-right: 5px;
            height: 20px;
        }

        form {
            margin: 10px;
            padding-left: 10px;
        }

        button {
            background-color: green;
            color: white;
            border: none;
            border-radius: 15px;
            font-size: 12px;
            height: 25px;
        }
        </style>
            <p>Add Column</p>
            <form class="add-col">
                <input type="text" required placeholder="Enter column title"/>
                <button>ADD</button>
            <form>
        `;

        this.shadow.innerHTML = template;
    }
}

window.customElements.define('add-column', AddColumn);