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
                // console.log(column.shadowRoot.childNodes[5])
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

