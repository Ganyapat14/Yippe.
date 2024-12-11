document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("showtimeModal");
    const closeModal = document.querySelector(".close-btn");
    const confirmBtn = document.querySelector(".confirm-btn");
    const selectedMovie = document.getElementById("selected-movie");
    const selectedTime = document.getElementById("selected-time");

    const seats = document.querySelectorAll(".seat");
    const selectedSeats = document.getElementById("selected-seats");
    const totalPrice = document.getElementById("total-price");

    let selected = [];
    let total = 0;

    // Show Modal on Showtime Button Click
    const showtimeButtons = document.querySelectorAll(".showtime-btn");
    showtimeButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const movieTitle = btn.closest(".movie-card").querySelector("h3").innerText;
            const showtime = btn.getAttribute("data-time");
            
            selectedMovie.textContent = `ภาพยนตร์: ${movieTitle}`;
            selectedTime.textContent = `รอบฉาย: ${showtime}`;
            
            modal.style.display = "block";
        });
    });

    // Close Modal
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Close Modal on Outside Click
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Handle Seat Selection
    seats.forEach((seat) => {
        seat.addEventListener("click", () => {
            const seatNumber = seat.textContent;
            const price = parseInt(seat.dataset.price);

            if (!seat.classList.contains("selected")) {
                seat.classList.add("selected");
                selected.push(seatNumber);
                total += price;
            } else {
                seat.classList.remove("selected");
                selected = selected.filter((s) => s !== seatNumber);
                total -= price;
            }

            // Update Summary (แสดงที่นั่งที่เลือกและราคา)
            selectedSeats.innerHTML = selected.map((s) => `<li>${s}</li>`).join("");
            totalPrice.textContent = total;
        });
    });

    // Confirm Button
    confirmBtn.addEventListener("click", () => {
        alert(`ที่นั่งที่เลือก: ${selected.join(", ")}\nรวมราคา: ${total} บาท`);
        
        // Reset selections (Optional)
        seats.forEach(seat => seat.classList.remove("selected"));
        selected = [];
        total = 0;
        selectedSeats.innerHTML = "";
        totalPrice.textContent = total;
        
        // Close the modal
        modal.style.display = "none";
    });
});


function logout() {
    // ล้างข้อมูลการเข้าสู่ระบบ (ตัวอย่างเช่น การลบ session หรือ cookies)
    window.location.href = '/login';  // เปลี่ยนเส้นทางไปหน้า login หรือหน้าอื่น ๆ ที่ต้องการ
}