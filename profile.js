console.log("JavaScript Loaded");

document.addEventListener("DOMContentLoaded", () => {
 // Back button logic
document.getElementById("backButton").addEventListener("click", (event) => {
  event.preventDefault();
  window.location.href = "index.html"; // Make sure the file name matches your project structure
});


  // ✅ Open Modals
  document.getElementById("soundTherapyButton").addEventListener("click", () => openModal('soundModal'));
  document.getElementById("gratitudeJournalButton").addEventListener("click", () => openModal('gratitudeModal'));
  document.getElementById("moodTrackerButton").addEventListener("click", () => openModal('moodModal'));

  // ✅ Connect Button
  document.getElementById("connectButton").addEventListener("click", () => {
    alert("Connect feature coming soon!");
  });

  // ✅ Meditation Streak
  let meditationStreak = parseInt(localStorage.getItem("meditationStreak")) || 65;
  const updateStreakUI = () => {
    document.getElementById("meditationStreakCount").textContent = meditationStreak;
  };

  document.getElementById("meditationStreakButton").addEventListener("click", () => {
    meditationStreak++;
    localStorage.setItem("meditationStreak", meditationStreak);
    updateStreakUI();
    alert(`You've increased your meditation streak to ${meditationStreak} days! 🙏`);
  });

  updateStreakUI();

  // ✅ Gratitude Journal
  const gratitudeEntry = document.getElementById("gratitudeEntry");
  gratitudeEntry.value = localStorage.getItem("gratitudeJournal") || "";

  document.getElementById("saveGratitude").addEventListener("click", () => {
    const entry = gratitudeEntry.value.trim();
    if (entry) {
      localStorage.setItem("gratitudeJournal", entry);
      alert("Gratitude entry saved!");
      closeModal('gratitudeModal');
    } else {
      alert("Please write something.");
    }
  });

  // ✅ Mood Tracker
  const moodSelect = document.getElementById("moodSelect");
  const savedMood = localStorage.getItem("mood");
  if (savedMood) {
    moodSelect.value = savedMood;
  }

  document.getElementById("moodForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const selectedMood = moodSelect.value;
    if (selectedMood) {
      localStorage.setItem("mood", selectedMood);
      alert(`Mood saved as "${selectedMood}"!`);
      closeModal('moodModal');
      moodSelect.value = "";
    } else {
      alert("Please select a mood.");
    }
  });

});

// Daily Challenge Button Logic
document.getElementById("dailyChallengeButton").addEventListener("click", () => {
    openModal('dailyChallengeModal');
});

// Open and Close Modal Functions
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}


const soundPlayer = document.getElementById("soundPlayer");
soundPlayer.addEventListener("ended", () => {
  closeModal('soundModal');
  alert("Sound therapy session completed!");
});

// Open and close modal functions
function openModal(modalId) {
  document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}
