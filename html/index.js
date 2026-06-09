function renderHeader() {
    const header = document.querySelector("#header");
    if (!header) return;

    header.className = "top_bar";
    header.innerHTML = `
        <a href="/index.html">
            <img src="/assets/text/frag-z-text.png" alt="Frag-Z" style="height: 70px;">
        </a>
        <ul>
            <li><a href="https://discord.gg/FDkzF3C7C6"><h2>Discord</h2></a></li>
            <li><a href="/download.html"><h2>Download</h2></a></li>
            <li><a href="/wiki/wiki.html"><h2>Wiki</h2></a></li>
        </ul>
    `;
}

window.addEventListener("load", (event) => {
    renderHeader();

    if (!window.cursoreffects || !document.querySelector("#character")) return;

    new cursoreffects.characterCursor({ // rocket smoke
        element: document.querySelector("#character"),
        characters: [ // For each color you need a character, this is a bug in my original pr.
            "*",
            "*",
            "*",
            "*",
            "*",
            "*",
            "*",
        ] ,
        font: "15px serif",
        colors: [
            "#000000",
            "#000000",
            "#444343",
            "#444343",
            "#d29c40",
            "#63231e",
            "#fb1f00",
        ],
        cursorOffset: {
            x : 24, y : 24
        },
        characterLifeSpanFunction: function() {
            return Math.floor(Math.random() * 60 + 80);
        },
        initialCharacterVelocityFunction: function() {
            return {
                x: 1 + (Math.random() < 0.5 ? -1 : 1) * Math.random() / 2,
                y: 1 + Math.random(),
            }
        },
        characterVelocityChangeFunctions: {
            x_func: function(age , lifeSpan) {
                return (Math.random() < 0.5 ? -1 : 1)/30;
            },
            y_func: function(age, lifeSpan) {
                return (Math.random() < 0.5 ? -1 : 1)/ 15;
            },
        },
        characterScalingFunction: function(age, lifeSpan) {
            let lifeLeft = lifeSpan - age;
            return Math.max(lifeLeft / lifeSpan , 0) * 1.5;
        },
        characterNewRotationDegreesFunction: function(age, lifeSpan) {
            let lifeLeft = lifeSpan - age;
            return lifeLeft / 5;
        }
    })
});
