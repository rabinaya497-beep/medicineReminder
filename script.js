function saveMedicine() {

    let medicineName = document.getElementById("medicineName").value;
    let dosage = document.getElementById("dosage").value;
    let reminderTime = document.getElementById("reminderTime").value;
    let startDate = document.getElementById("startDate").value;
    let endDate = document.getElementById("endDate").value;

    if (medicineName == "" || dosage == "" || reminderTime == "") {
        alert("Please enter all medicine details");
        return;
    }

    let medicine = {
        name: medicineName,
        dosage: dosage,
        time: reminderTime,
        startDate: startDate,
        endDate: endDate
    };

    localStorage.setItem("medicine", JSON.stringify(medicine));

    alert("Medicine saved successfully!");

    window.location.href = "dashboard.html";
}


function displayMedicine() {

    let medicineData = localStorage.getItem("medicine");

    if (medicineData == null) {
        return;
    }

    let medicine = JSON.parse(medicineData);

    let list = document.getElementById("medicineList");

    if (list == null) {
        return;
    }

    list.innerHTML = `
        <div class="medicine-card">

            <h3>${medicine.name}</h3>

            <p>
                <b>Dosage:</b> ${medicine.dosage}
            </p>

            <p>
                <b>Time:</b> ${medicine.time}
            </p>

            <button onclick="medicineTaken('${medicine.name}')">
                ✓ Taken
            </button>

            <button onclick="medicineMissed('${medicine.name}')">
                ✕ Missed
            </button>

        </div>
    `;
}


function medicineTaken(medicine) {

    alert("✓ " + medicine + " marked as Taken");
}


function medicineMissed(medicine) {

    alert("✕ " + medicine + " marked as Missed");
}


function checkReminder() {

    let medicineData = localStorage.getItem("medicine");

    if (medicineData == null) {
        return;
    }

    let medicine = JSON.parse(medicineData);

    let now = new Date();

    let hour = String(now.getHours()).padStart(2, "0");
    let minute = String(now.getMinutes()).padStart(2, "0");

    let currentTime = hour + ":" + minute;

    if (currentTime == medicine.time) {

        alert(
            "🔔 Time to take " +
            medicine.name +
            " - " +
            medicine.dosage
        );
    }
}


setInterval(checkReminder, 1000);

displayMedicine();

function medicineTaken(medicine) {

    saveHistory(medicine, "Taken");

    alert("✓ " + medicine + " marked as Taken");
}


function medicineMissed(medicine) {

    saveHistory(medicine, "Missed");

    alert("✕ " + medicine + " marked as Missed");
}


function saveHistory(medicine, status) {

    let history = JSON.parse(localStorage.getItem("history")) || [];

    let currentDate = new Date();

    let record = {
        date: currentDate.toLocaleDateString(),
        medicine: medicine,
        time: currentDate.toLocaleTimeString(),
        status: status
    };

    history.push(record);

    localStorage.setItem("history", JSON.stringify(history));
}

function displayHistory() {

    let history = JSON.parse(localStorage.getItem("history")) || [];

    let historyList = document.getElementById("historyList");

    if (historyList == null) {
        return;
    }

    historyList.innerHTML = "";

    for (let i = 0; i < history.length; i++) {

        let record = history[i];

        historyList.innerHTML += `
            <tr>
                <td>${record.date}</td>
                <td>${record.medicine}</td>
                <td>${record.time}</td>
                <td>${record.status}</td>
            </tr>
        `;
    }
}

displayHistory();