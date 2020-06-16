const render = () => {
    const main = document.querySelector("main");
    main.innerHTML = "";
    getColumns();
    getCards();
}

render();