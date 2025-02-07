// Writing Pad Script
function saveText() {
    let text = document.getElementById("writingArea").value.trim();
    if (!text) {
        alert("Write something to save!");
        return;
    }
    let fileName = prompt("Enter a name for your saving (max 20 characters):").trim();
    if (!fileName || fileName.length > 20) {
        alert("Invalid name! Please enter a name within 20 characters.");
        return;
    }
    let savedFiles = JSON.parse(localStorage.getItem("savedFiles")) || [];
    savedFiles.push({ name: fileName, text: text });
    localStorage.setItem("savedFiles", JSON.stringify(savedFiles));
    alert("Saved successfully!");
    document.getElementById("writingArea").value = "";
    loadSavedFiles();
}

function downloadPDF() {
    let text = document.getElementById("writingArea").value;
    if (!text.trim()) {
        alert("Write something before downloading!");
        return;
    }
    let blob = new Blob([text], { type: "application/pdf" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "My_Writing.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Savings Page Script
function loadSavedFiles() {
    let savedFiles = JSON.parse(localStorage.getItem("savedFiles")) || [];
    let list = document.getElementById("savedList");
    list.innerHTML = "";
    
    savedFiles.forEach((file, index) => {
        let li = document.createElement("li");
        li.innerHTML = `<span onclick="viewFile(${index})">${file.name}</span> 
                        <button class="delete-btn" onclick="confirmDelete(${index})">Delete</button>`;
        list.appendChild(li);
    });
}

function viewFile(index) {
    let savedFiles = JSON.parse(localStorage.getItem("savedFiles")) || [];
    if (savedFiles[index]) {
        alert(`Saved Content:\n${savedFiles[index].text}`);
    } else {
        alert("Error: File not found.");
    }
}

function confirmDelete(index) {
    if (confirm("Are you sure you want to delete this?") === true) {
        deleteFile(index);
    }
}

function deleteFile(index) {
    let savedFiles = JSON.parse(localStorage.getItem("savedFiles")) || [];
    if (savedFiles[index]) {
        savedFiles.splice(index, 1);
        localStorage.setItem("savedFiles", JSON.stringify(savedFiles));
        loadSavedFiles();
    } else {
        alert("Error: File not found.");
    }
}

function searchFiles() {
    let query = document.getElementById("searchBox").value.toLowerCase();
    let savedFiles = JSON.parse(localStorage.getItem("savedFiles")) || [];
    let list = document.getElementById("savedList");
    list.innerHTML = "";
    
    savedFiles.forEach((file, index) => {
        if (file.name.toLowerCase().includes(query)) {
            let li = document.createElement("li");
            li.innerHTML = `<span onclick="viewFile(${index})">${file.name}</span> 
                            <button class="delete-btn" onclick="confirmDelete(${index})">Delete</button>`;
            list.appendChild(li);
        }
    });
}

document.addEventListener("DOMContentLoaded", loadSavedFiles);
