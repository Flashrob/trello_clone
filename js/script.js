const getColumns = () => {

    const getResult = (e) =>{
        if(req.readyState == 4 && req.status == 200){
            const result = JSON.parse(req.responseText);
            const main = document.querySelector("main");

            for(let i = 0; i < result.length; i++){
                const column = document.createElement("column-display");
                column.setAttribute("id", `col${i+1}`);
                column.setAttribute("title", result[i].title);
                main.appendChild(column);

                const addButton = document.createElement("h4");
                addButton.className = "add-button";
                addButton.id = i
                addButton.className = `col${i+1}`
                addButton.textContent = "+ Add Button"

                addButton.addEventListener("click", (e) => {
                    const column_id = e.target.id;
                    const shadow = e.target.parentNode;
                    shadow.removeChild(e.target)

                    const form = document.createElement("form");
                    const input = document.createElement("input");
                    const input_hidden = document.createElement("input");
                    // input_hidden.setAttribute("name", column_id);
                    const button = document.createElement("button");
                    button.textContent = "Add";
                    form.appendChild(input);
                    form.appendChild(button);
                    form.setAttribute("method", "POST");
                    form.setAttribute("action", "http://localhost:3000/cards");
                    form.setAttribute("onsubmit", "addCard()")
                    // form.setAttribute("title", "title");
                    column.shadowRoot.appendChild(form);
                });

                column.shadowRoot.appendChild(addButton);
            }
            // console.log(document.querySelector("#col1"));
        }
    }

    let req = new XMLHttpRequest;
    req.open("GET", "http://localhost:3000/columns", true);
    req.send();

    req.addEventListener("readystatechange", getResult, false);
    
}

const getCards = () => {

    const getResult = (e) =>{
        if(req.readyState == 4 && req.status == 200){
            const result = JSON.parse(req.responseText);
            
            for(let i = 0; i < result.length; i++){
                const column = document.querySelector(`#col${result[i].column_id}`);
                const div = column.shadowRoot.childNodes[5];
                const card = document.createElement("card-display");
                card.setAttribute("id", result[i].id);
                card.setAttribute("title", result[i].title);
                card.setAttribute("description", result[i].description);
                div.appendChild(card);
                const icon = document.createElement("i");
                icon.className = "far fa-comment";
                div.appendChild(icon);
            }

        }
    }

    let req = new XMLHttpRequest;
    req.open("GET", "http://localhost:3000/cards", true);
    req.send();

    req.addEventListener("readystatechange", getResult, false);

}

getColumns();
getCards();

const addCard = (e) => {
    e.preventDefault();
    console.log("works")
}