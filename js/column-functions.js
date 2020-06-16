const getColumns = () => {
    //get request for columns
    let req = new XMLHttpRequest;
    req.open("GET", "http://localhost:3000/columns", true);
    req.send();
    req.addEventListener("readystatechange", createColumns, false);

    //render columns
    function createColumns() {
        //column to add new column
        if (req.readyState == 4 && req.status == 200) {
            const result = JSON.parse(req.responseText);
            const main = document.querySelector("main");

            for (let i = 0; i < result.length; i++) {
                //create column-display tags
                const column = document.createElement("column-display");
                column.setAttribute("id", `col${result[i].id}`);
                column.setAttribute("title", result[i].title);
                //append to main
                main.appendChild(column);

                //create button within column
                const addButton = document.createElement("h4");
                addButton.className = "add-button";
                addButton.id = i;
                addButton.className = `col${result[i].id}`;
                addButton.textContent = "+ Add Card";
                //replace button with input on click
                addButton.addEventListener("click", (e) => {
                    replaceButton(e, column);
                });
                //append button to column
                column.shadowRoot.appendChild(addButton);

                editColumn(column);
            }
            //event listener
            addColumn();

        }

    }

    function editColumn(column) {
        //edit button
        const editButton = column.shadowRoot.childNodes[3].childNodes[1];
        editButton.addEventListener("click", (e) => {
            const title = column.shadowRoot.childNodes[3].childNodes[0].textContent;
            const column_id = column.id[3];

            const u = column.shadowRoot.childNodes[3].childNodes[0];
            const p = u.parentElement;
            p.removeChild(u);
            p.removeChild(editButton);
            const form = document.createElement("form");
            const input = document.createElement("input");
            input.value = title;
            input.className = "edit-column";
            input.placeholder = "Enter column title";
            input.required = true;
            const button = document.createElement("button");
            button.textContent = "EDIT";
            button.className = "edit-button";
            form.appendChild(input);
            form.appendChild(button);

            form.addEventListener("submit", (e) => {
                e.preventDefault();
                const title = e.target.elements[0].value;

                let editReq = new XMLHttpRequest;
                editReq.open("PUT", "http://localhost:3000/columns/" + column_id, true);
                editReq.setRequestHeader("content-type", "application/json");

                const data = {
                    title: title
                }

                editReq.send(JSON.stringify(data));

                setTimeout(() => {
                    render();
                }, 50)
            })

            p.prepend(form);
        })
    }

    //replace button with form input on click
    function replaceButton(e, column) {
        const column_id = parseInt(e.target.id) + 1;
        //select card div
        const shadow = e.target.parentNode;
        //remove button
        shadow.removeChild(e.target);
        //create form and input/button
        const form = document.createElement("form");
        const input = document.createElement("input");
        const button = document.createElement("button");
        input.placeholder = "Enter card title";
        input.required = true;
        button.textContent = "ADD";
        button.className = "add";
        //append input/button to form
        form.appendChild(input);
        form.appendChild(button);
        //add form submit
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            let title = e.target.elements[0].value
            //post request for new cards
            addCard(title, column_id);

        })
        //append form to column
        column.shadowRoot.appendChild(form);

    }

    //post request for new card, part of column
    function addCard(title, column_id) {
        let addReq = new XMLHttpRequest;
        addReq.open("POST", "http://localhost:3000/cards", true);
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
        setTimeout(() => {
            render();
        }, 50)
    }

//end getColumn
}

//render add column input
const addColumn = () => {

    //append add-column component to main
    const main = document.querySelector("main");
    const addCard = document.createElement("add-column");
    main.appendChild(addCard);

    //POST request for new column after submit
    addCard.shadowRoot.childNodes[5].addEventListener("submit", (e) => {
        e.preventDefault();
        //input value
        const title = e.target.elements[0].value;

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
        setTimeout(() => {
            render();
        }, 100)
    })
}