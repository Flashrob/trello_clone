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

        .edit-column {
            width: 70%;
            margin-left: -20px;
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
            margin-left: auto;
            margin-right: 20px;
            background-color: #463cde;
            border-radius: 20px;
            color: white;
            padding: 7px;
        }

        .edit-button {
            box-shadow:inset 0px 1px 3px 0px #91b8b3;
            background:linear-gradient(to bottom, #768d87 5%, #6c7c7c 100%);
            background-color:#768d87;
            border-radius:20px;
            border:1px solid #566963;
            display:inline-block;
            cursor:pointer;
            color:#ffffff;
            font-family:Arial;
            font-size:15px;
            font-weight:bold;
            padding:10px 13px;
            text-decoration:none;
            text-shadow:0px -1px 0px #2b665e;
            width: 60px;
        }
        .edit-button:hover {
            background:linear-gradient(to bottom, #6c7c7c 5%, #768d87 100%);
            background-color:#6c7c7c;
        }
        .edit-button:active {
            position:relative;
            top:1px;
        }

        .edit-col {
            margin-left: auto;
            margin-right: 20px;
            box-shadow:inset 0px 1px 3px 0px #91b8b3;
            background:linear-gradient(to bottom, #768d87 5%, #6c7c7c 100%);
            background-color:#768d87;
            border-radius:20px;
            border:1px solid #566963;
            display:inline-block;
            cursor:pointer;
            color:#ffffff;
            font-family:Arial;
            font-size:15px;
            font-weight:bold;
            padding:10px 13px;
            text-decoration:none;
            text-shadow:0px -1px 0px #2b665e;
            width: 60px;
        }
        .edit-col:hover {
            background:linear-gradient(to bottom, #6c7c7c 5%, #768d87 100%);
            background-color:#6c7c7c;
        }
        .edit-col:active {
            position:relative;
            top:1px;
        }

        form {
            margin-top: 0px;
        }
        

        </style>
            <p><u>${this.title}</u><button class="edit-col">EDIT</button></p>
            <div class="card"></div>
        `;

        this.shadow.innerHTML = template;
    }
}

window.customElements.define('column-display', Column);