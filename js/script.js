// Get the page elements
const form = document.getElementById("register-form");
const message = document.getElementById("message");
const tableBody = document.getElementById("saved-body");
const clearBtn = document.getElementById("clear-btn");

// Read saved registrations from localStorage (empty list if none)
function getRegistrations() {
  const saved = localStorage.getItem("registrations");
  return saved ? JSON.parse(saved) : [];
}

// Show all saved registrations in the table
function showRegistrations() {
  const list = getRegistrations();
  tableBody.textContent = "";

  list.forEach(function (item) {
    const row = document.createElement("tr");
    [item.fullname, item.email, item.phone, item.event, item.source].forEach(function (value) {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    });
    tableBody.appendChild(row);
  });
}

// Save a new registration when the form is submitted
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const registration = {
    fullname: document.getElementById("fullname").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    event: document.getElementById("event").value,
    source: document.querySelector('input[name="source"]:checked').value
  };

  const list = getRegistrations();
  list.push(registration);
  localStorage.setItem("registrations", JSON.stringify(list));

  message.textContent = "Thank you, " + registration.fullname + "! You are registered for " + registration.event + ".";
  form.reset();
  showRegistrations();
});

// Remove all saved registrations
clearBtn.addEventListener("click", function () {
  localStorage.removeItem("registrations");
  message.textContent = "All registrations cleared.";
  showRegistrations();
});

// Show saved registrations when the page opens
showRegistrations();