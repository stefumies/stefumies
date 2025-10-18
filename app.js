const card = document.querySelector(".card");
const overcard = document.getElementById("overcard");
const popup = document.getElementById("email-popup");

document.addEventListener('click', (e) => {
  const clickedInsidePopup = popup.contains(e.target);
  const clickedOnCard = card.contains(e.target);

  if (!clickedInsidePopup && !clickedOnCard) {
    popup.classList.remove('visible');
  }
});

card.addEventListener('mouseenter', () => {
    card.classList.add('hoverd')
    overcard.classList.add('visible');
});

card.addEventListener('mouseleave', () => {
    card.classList.remove('hoverd');
    overcard.classList.remove('visible');
});

card.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent bubbling
    popup.classList.toggle('visible');
});




const skillset = ["Java", "JavaScript", "Typescript", "Python", "Go", "Spring", "AWS", "GCP", "PostGRES", "SW Architecture"];

skillset.forEach(s => {
    sk = document.createElement("span");
    sk.textContent = s + ", ";
    sk.style.fontSize = (Math.random() * 1.2 + 0.8).toFixed(2) + "rem";
    overcard.appendChild(sk);
});