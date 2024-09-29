let names = [];
let selectedIndex = null;
let highlightInterval = null;

function startSelection() {
    const chooseButton = document.getElementById('chooseButton');
    if (names.length === 0) {
        // Only initialize names if it's the first time or the list is empty
        const input = document.getElementById("nameInput").value.trim();
        names = input.split("\n").filter(name => name.trim() !== "");
        if (names.length === 0) return;
    }
    
    displayNames();
    startHighlighting();
    chooseButton.textContent = "Choose Next";
}

function displayNames() {
    const input = document.getElementById("nameInput")
    const nameList = document.getElementById("nameList");
    nameList.innerHTML = ""; // Clear any existing names
    names.forEach((name, index) => {
        const nameDiv = document.createElement("div");
        nameDiv.className = "name";
        nameDiv.id = `name-${index}`;
        nameDiv.textContent = name;
        nameList.appendChild(nameDiv);
        input.style.display = 'none';
    });
}

function startHighlighting() {
    clearInterval(highlightInterval);
    let currentIndex = 0;
    const nameDivs = document.getElementsByClassName("name");

    highlightInterval = setInterval(() => {
        if (nameDivs[currentIndex]) nameDivs[currentIndex].classList.remove("highlight");
        currentIndex = (currentIndex + 1) % names.length;
        nameDivs[currentIndex].classList.add("highlight");
    }, 75);

    // Randomly stop after some time
    setTimeout(() => {
        clearInterval(highlightInterval);
        selectedIndex = currentIndex;
        nameDivs[selectedIndex].classList.add("highlight");
        showOptions();
    }, Math.random() * 3000 + 2000); // Random duration between 2 and 5 seconds
}

function showOptions() {
    document.getElementById("removeSelectedBtn").style.display = "inline";
    document.getElementById("keepSelectedBtn").style.display = "inline";
}

function removeSelected() {
    if (selectedIndex !== null) {
        names.splice(selectedIndex, 1);  // Remove the selected name
        displayNames();
        resetOptions();
    }
}

function keepSelected() {
    resetOptions();
}

function resetOptions() {
    document.getElementById("removeSelectedBtn").style.display = "none";
    document.getElementById("keepSelectedBtn").style.display = "none";
    selectedIndex = null;
}