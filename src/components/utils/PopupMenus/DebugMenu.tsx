import debugIcon from '../../../assets/debug.svg';
import './DebugMenu.css';

const DebugMenu = () => {

    const closeMenu = () => {
        const menu = document.getElementById("menu");

        if(menu) {
            menu.style.transform = "translate(-50%, -50%)";
            menu.style.left = "50%";
            menu.style.top = "50%";
            menu.style.display = "none";
        }
    }

    const openDebugMenu = () => {
        const audioElement = document.querySelector("audio") as HTMLAudioElement | null;
        const deckOneSong = audioElement?.src.split("/").pop();

        let menu = document.getElementById("menu");

        if (!menu) {
            menu = document.createElement("div");
            menu.setAttribute("draggable", "true");
            menu.id = "menu";

            menu.innerHTML = `
                <h2>Debug</h2>
                <p id="deck1-song">Deck 1 Song: ${deckOneSong}</p>`;

            const closeBtn = document.createElement("button");
            closeBtn.type = "button";
            closeBtn.innerHTML = "&times;";
            closeBtn.classList.add("close-btn");
            closeBtn.addEventListener("click", closeMenu);

            menu.appendChild(closeBtn);

            enableDrag(menu);

            document.body.appendChild(menu);
        } else {
            const songText = menu.querySelector("#deck1-song");
            if (songText) {
                songText.textContent = `Deck 1 Song: ${deckOneSong}`;
            }
        }

        menu.style.display = "block";
    }

    const enableDrag = (menu: HTMLElement) => {
        let offsetX = 0;
        let offsetY = 0;
        let isDragging = false;

        const onMouseDown = (e: MouseEvent) => {
            if (e.button !== 0) return;

            isDragging = true;

            const rect = menu.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;

            menu.style.transform = "none";
            menu.style.left = `${rect.left}px`;
            menu.style.top = `${rect.top}px`;

            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);

            e.preventDefault();
        };

        const onMouseMove = (e: MouseEvent) => {
            if (!isDragging) return;
            menu.style.left = `${e.clientX - offsetX}px`;
            menu.style.top = `${e.clientY - offsetY}px`;
        };

        const onMouseUp = () => {
            isDragging = false;
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };

        menu.addEventListener("mousedown", onMouseDown);
    };

    return (
        <>
            <img
                className="debugMenuIcon"
                src={debugIcon}
                alt="debugMenuIcon"
                height="32"
                width="32"
                onClick={openDebugMenu}
            />
        </>
    )
}

export default DebugMenu