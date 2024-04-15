// Navigated Ticket Section
function navigateToSection(sectionId) {
  const section = document.getElementById(sectionId);
  section.scrollIntoView({ behavior: "smooth" });
}

// Seat Section
document.addEventListener("DOMContentLoaded", function () {
  const seatButtons = document.querySelectorAll(".seat-btn");
  const seatAvailable = document.getElementById("seat-available");
  const specificSeatDetails = document.getElementById("specific-seat-details");
  const totalPrice = document.querySelector(".total-price");
  const grandPrice = document.querySelector(".grand-price");
  const phoneNumberInput = document.querySelector("input[type='number']");
  const nameInput = document.querySelector("input[type='text']");
  const emailInput = document.querySelector("input[type='email']");
  const nextButton = document.querySelector(".btn.btn-disabled");
  const totalSeatsText = document.getElementById("total-seats");

  let totalSeats = 0;

  function updateNextButtonState() {
    const isSeatSelected = totalSeats > 0;
    const isPhoneNumberValid = phoneNumberInput.value.trim() !== "";

    nextButton.classList.toggle(
      "btn-disabled",
      !(isSeatSelected && isPhoneNumberValid)
    );
  }

  function clearSelectedSeats() {
    seatButtons.forEach((button) => {
      button.classList.remove("bg-[#1DD100]", "text-white");
    });

    specificSeatDetails.innerHTML = "";
    totalSeatsText.innerText = "0";
    totalPrice.textContent = "0";
    grandPrice.textContent = "0";
    totalSeats = 0;
  }

  seatButtons.forEach((button) => {
    button.addEventListener("click", function () {
      this.classList.toggle("bg-[#1DD100]");
      this.classList.toggle("text-white");

      const buttonNumber = this.id;
      const perTicketPrice = 550;

      // Update total seat count
      if (this.classList.contains("bg-[#1DD100]")) {
        totalSeats++;
        seatAvailable.innerText = parseInt(seatAvailable.innerText, 10) - 1;

        // Add seat number on the right side
        const seatDetailDiv = document.createElement("div");
        seatDetailDiv.classList.add("flex", "justify-between", "py-2");
        seatDetailDiv.innerHTML = `
                    <div>${buttonNumber}</div>
                    <div>Economy</div>
                    <div>550</div>
                `;
        specificSeatDetails.appendChild(seatDetailDiv);

        // Total Seat Indicator
        totalSeatsText.innerText = parseInt(totalSeatsText.innerText, 10) + 1;

        // Update Total Price
        const totalPriceValue = totalSeats * perTicketPrice;
        totalPrice.textContent = totalPriceValue;
        grandPrice.textContent = totalPriceValue;
      } else {
        totalSeats--;
        seatAvailable.innerText = parseInt(seatAvailable.innerText, 10) + 1;

        // Remove seat number on the right side
        const seatDetailDiv = specificSeatDetails.querySelectorAll("div");
        seatDetailDiv.forEach((div) => {
          if (div.textContent.trim() === buttonNumber) {
            div.parentNode.remove();
          }
        });

        // Total Seat Indicator
        totalSeatsText.innerText = parseInt(totalSeatsText.innerText, 10) - 1;

        // Update Total Price
        const totalPriceValue = totalSeats * perTicketPrice;
        totalPrice.textContent = totalPriceValue;
        grandPrice.textContent = totalPriceValue;
      }

      updateNextButtonState();

      console.log(`Selected button number: ${buttonNumber}`);
      console.log(`Total selected seats: ${totalSeats}`);
    });
  });

  phoneNumberInput.addEventListener("input", updateNextButtonState);

  const continueButton = document.querySelector(
    "#my_modal_1 .modal-action button"
  );
  continueButton.addEventListener("click", function () {
    clearSelectedSeats();
    phoneNumberInput.value = "";
    nameInput.value = "";
    emailInput.value = "";
    updateNextButtonState();
    my_modal_1.close();
  });
});
