const getColumns = () => {
    //get request for columns
    let req = new XMLHttpRequest;
    req.open("GET", "http://localhost:3000/columns", true);
    req.send();
    req.addEventListener("readystatechange", getResult, false);

    //get request result
    function getResult(e) {
        if(req.readyState == 4 && req.status == 200){
            const result = JSON.parse(req.responseText);
            //render columns
            createColumns(result);
        }
    }

    //render columns
    function createColumns(result){
        const main = document.querySelector("main");
        for(let i = 0; i < result.length; i++){
            //create column-display tags
            const column = document.createElement("column-display");
            column.setAttribute("id", `col${i+1}`);
            column.setAttribute("title", result[i].title);
            //append to main
            main.appendChild(column);

            //create button within column
            const addButton = document.createElement("h4");
            addButton.className = "add-button";
            addButton.id = i
            addButton.className = `col${i+1}`
            addButton.textContent = "+ Add Card"
            //replace button with input on click
            addButton.addEventListener("click", (e) => {
                replaceButton(e, column);
            });
            //append button to column
            column.shadowRoot.appendChild(addButton);
        }
    }
    
    //replace button with input on click
    function replaceButton(e, column){
        const column_id = parseInt(e.target.id)+1;
        //select card div
        const shadow = e.target.parentNode;
        //remove button
        shadow.removeChild(e.target)
        //create form and input/button
        const form = document.createElement("form");
        const input = document.createElement("input");
        const button = document.createElement("button");
        button.textContent = "Add";
        //append input/button to form
        form.appendChild(input);
        form.appendChild(button);
        //add form submit
        form.addEventListener("submit", (e)=>{
            e.preventDefault()
            let title = e.target.elements[0].value
            //post request for new cards
            addCard(title, column_id);

        })
        //append form to column
        column.shadowRoot.appendChild(form);

    }
    
    //post request for new card
    function addCard(title, column_id) {
        let addReq = new XMLHttpRequest;
        addReq.open("POST", "http://localhost:3000/cards", false);
        addReq.setRequestHeader("content-type", "application/json");

        //data load
        const data = {
            "title": title,
            "column_id": column_id,
            "description": ""
        }

        addReq.send(JSON.stringify(data));

        //reload page to display
        //best way since the ajax requests don't seem to work well with json-server
        // location.reload()
        render()
    }
}


const getCards = () => {
    //get request for cards
    let req = new XMLHttpRequest;
    req.open("GET", "http://localhost:3000/cards", true);
    req.send();
    req.addEventListener("readystatechange", getResult, false);

    //get request response
    function getResult() {
        createCards();
    }

    //render cards
    function createCards() {
        if(req.readyState == 4 && req.status == 200){
            const result = JSON.parse(req.responseText);

            //create cards
            for(let i = 0; i < result.length; i++){
                const column = document.querySelector(`#col${result[i].column_id}`);
                const div = column.shadowRoot.childNodes[5];
                const card = document.createElement("card-display");
                card.setAttribute("id", result[i].id);
                card.setAttribute("title", result[i].title);
                card.setAttribute("description", result[i].description);
                //append card
                div.appendChild(card);
            }
        }
    }
}

const render = () => {
    const main = document.querySelector("main");
    main.innerHTML = ""
    getColumns();
    getCards();
}

render()
