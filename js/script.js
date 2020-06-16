const getColumns = () => {
    //get request for columns
    let req = new XMLHttpRequest;
    req.open("GET", "http://localhost:3000/columns", true);
    req.send();
    req.addEventListener("readystatechange", createColumns, false);

    //render columns
    function createColumns(){
        if(req.readyState == 4 && req.status == 200){
            const result = JSON.parse(req.responseText);
            const main = document.querySelector("main");

        for(let i = 0; i < result.length; i++){
            //create column-display tags
            const column = document.createElement("column-display");
            column.setAttribute("id", `col${result[i].id}`);
            column.setAttribute("title", result[i].title);
            //append to main
            main.appendChild(column);

            //create button within column
            const addButton = document.createElement("h4");
            addButton.className = "add-button";
            addButton.id = i
            addButton.className = `col${result[i].id}`
            addButton.textContent = "+ Add Card"
            //replace button with input on click
            addButton.addEventListener("click", (e) => {
                replaceButton(e, column);
            });
            //append button to column
            column.shadowRoot.appendChild(addButton);

            //add delete column function to X button
            const deleteButton = column.shadowRoot.childNodes[3].childNodes[1]
            deleteButton.addEventListener("click", (e)=>{
                deleteColumn(e, column);
            })
        }
            //column to add new column
            addColumn();
        }
    }

    function deleteColumn(e, column){
        const cards = Array.from(column.shadow.childNodes[5].childNodes);

        for(let i = 0; i < cards.length; i++){
            //delete all cards in column
            const card_id = cards[i].id
            let req = new XMLHttpRequest;
            req.open("DELETE", "http://localhost:3000/cards/"+card_id, true);
            req.send();    
        }

        //delete column
        const column_id = e.target.id[3];
        let deleteReq = new XMLHttpRequest;
        deleteReq.open("DELETE", "http://localhost:3000/columns/"+column_id, true);
        deleteReq.send();
        
        setTimeout(()=>{
            render();
        }, 50)
        
}
    
    //replace button with form input on click
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
        input.placeholder = "Enter card title"
        input.required = true;
        button.textContent = "ADD";
        button.className = "add"
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

        //rerender page with new card
        //with timeout, there seems to be a problem with updating db.json fast enough
        setTimeout(()=>{
            render();
        }, 50)
    }


}

const addColumn = () => {

    const main = document.querySelector("main");
    const addCard = document.createElement("add-column");
    main.appendChild(addCard)
    
    //POST request for new column after submit
    addCard.shadowRoot.childNodes[5].addEventListener("submit", (e) => {
        e.preventDefault();
        //input value
        const title = e.target.elements[0].value

        let req = new XMLHttpRequest;
        req.open("POST", "http://localhost:3000/columns", true);
        req.setRequestHeader("content-type", "application/json");

        //column data
        const data = {
            "title": title
        }

        req.send(JSON.stringify(data));

        //rerender page with new column
        //with timeout, there seems to be a problem with updating db.json fast enough
        setTimeout(()=>{
            render();
        }, 50)

    })

}

const getCards = () => {
    //get request for cards
    let req = new XMLHttpRequest;
    req.open("GET", "http://localhost:3000/cards", true);
    req.send();
    req.addEventListener("readystatechange", createCards, false);

    //render cards
    function createCards() {
        if(req.readyState == 4 && req.status == 200){
            const result = JSON.parse(req.responseText);

            //create cards
            for(let i = 0; i < result.length; i++){
                const column = document.querySelector(`#col${result[i].column_id}`);
                if(column){
                    const div = column.shadowRoot.childNodes[5];
                    const card = document.createElement("card-display");
                    card.setAttribute("id", result[i].id);
                    card.setAttribute("title", result[i].title);
                    card.setAttribute("description", result[i].description);
                    //append card
                    div.appendChild(card);
                    //click listener to delete a card

                    deleteCard(card, div);
                }
                
                
                
            }
        }
    }

    //delete request for single card
    function deleteCard(card, div){

        card.shadowRoot.childNodes[3].childNodes[1].addEventListener("click", function(e) {

            const card_id = card.id
            //delete request
            let req = new XMLHttpRequest;
            req.open("DELETE", "http://localhost:3000/cards/"+card_id, true);
            req.send();
            req.addEventListener("readystatechange", function(){

                if(req.readyState == 4 && req.status == 200){
                    render();
                }

            }, false);
        })
    }
}



const render = () => {
    const main = document.querySelector("main");
    main.innerHTML = ""
    getColumns();
    getCards();
}

render()
