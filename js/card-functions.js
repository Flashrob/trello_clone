const getCards = () => {
    //get request for cards
    let req = new XMLHttpRequest;
    req.open("GET", "http://localhost:3000/cards", true);
    req.send();
    req.addEventListener("readystatechange", createCards, false);

    //render cards
    function createCards() {
        if (req.readyState == 4 && req.status == 200) {
            const result = JSON.parse(req.responseText);

            //create cards
            for (let i = 0; i < result.length; i++) {
                const column = document.querySelector(`#col${result[i].column_id}`);
                if (column) {
                    const div = column.shadowRoot.childNodes[5];
                    const card = document.createElement("card-display");
                    card.setAttribute("id", result[i].id);
                    card.setAttribute("title", result[i].title);
                    card.setAttribute("description", result[i].description);
                    //append card
                    div.appendChild(card);

                    //click listener to delete a card
                    deleteCard(card);

                    //click listener to edit a card
                    editCard(card, column);
                }



            }
        }
    }

    //edit card title
    function editCard(card, column) {

        const cardParagraph = card.shadowRoot.childNodes[3]
        //replace title and delete button with input and edit button
        cardParagraph.addEventListener("click", () => {

            const card_id = card.id;

            const deleteButton = card.shadowRoot.childNodes[3].childNodes[1];
            //remove delete button
            cardParagraph.removeChild(deleteButton);
            const title = cardParagraph.textContent;
            //assemble form
            const div = document.createElement("div");
            const form = document.createElement("form");
            const input = document.createElement("input");
            input.value = title.trim();
            input.placeholder = "Enter card title";
            input.required = true;
            const button = document.createElement("button");
            button.className = "edit-card";
            button.textContent = "EDIT";
            //remove paragraph to make space for input
            card.shadowRoot.removeChild(cardParagraph);
            //append input and button to form
            form.appendChild(input);
            form.appendChild(button);

            //put request on form submit
            form.addEventListener("submit", (e) => {
                e.preventDefault();

                let title = e.target.elements[0].value

                let editReq = new XMLHttpRequest;
                editReq.open("PUT", "http://localhost:3000/cards/" + card_id, true);
                editReq.setRequestHeader("content-type", "application/json");

                const data = {
                    title: title,
                    column_id: column.id[3],
                    description: ""
                }

                editReq.send(JSON.stringify(data));

                setTimeout(() => {
                    render();
                }, 50);

            })
            //append form to div as replacement for p tag
            div.appendChild(form);
            //append div to card
            card.shadowRoot.appendChild(div);
        })
    }

    //delete request for single card
    function deleteCard(card) {

        card.shadowRoot.childNodes[3].childNodes[1].addEventListener("click", function (e) {

            const card_id = card.id;
            //delete request
            let req = new XMLHttpRequest;
            req.open("DELETE", "http://localhost:3000/cards/" + card_id, true);
            req.send();
            req.addEventListener("readystatechange", function () {

                if (req.readyState == 4 && req.status == 200) {
                    setTimeout(() => {
                        render();
                    }, 50)

                }

            }, false);
        })
    }

}