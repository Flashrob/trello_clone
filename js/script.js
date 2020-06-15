const getColumns = () => {

    const getResult = (e) =>{
        if(req.readyState == 4 && req.status == 200){
            const result = JSON.parse(req.responseText);
            const main = document.querySelector("main");

            for(let i = 0; i < result.length; i++){
                const div = document.createElement("div");
                div.innerHTML = result[i].title;
                main.appendChild(div);
            }

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
            console.log(result)
        }
    }

    let req = new XMLHttpRequest;
    req.open("GET", "http://localhost:3000/cards", true);
    req.send();

    req.addEventListener("readystatechange", getResult, false);

}

getColumns()