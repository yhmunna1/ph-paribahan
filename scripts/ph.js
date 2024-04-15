// Navigated Ticket Section
function navigateToSection(sectionId) {
  const section = document.getElementById(sectionId);
  section.scrollIntoView({ behavior: "smooth" });
}

// Seat Section
document.addEventListener("DOMContentLoaded", function () {
  const seatButtons = document.querySelectorAll(".btn");
  const seatAvailable = document.getElementById("seat-available");
  const seatDetails = document.getElementById("seat-details");
  const specificSeatDetails = document.getElementById("specific-seat-details");
  const totalPrice = document.querySelector(".total-price");
  const grandPrice = document.querySelector(".grand-price");
  console.log(specificSeatDetails);

  let totalSeats = 0;
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

        // Update Total Price
        const totalPriceValue = totalSeats * perTicketPrice;
        totalPrice.textContent = totalPriceValue;
        grandPrice.textContent = totalPriceValue;
      }

      console.log(`Selected button number: ${buttonNumber}`);
      console.log(`Total selected seats: ${totalSeats}`);
    });
  });
});
