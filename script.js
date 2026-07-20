let likes = 0;

const likeButton = document.querySelector(".Like");

likeButton.addEventListener("click", () => {

    likes++;

    likeButton.textContent = `Like 👍🏻 ${likes}`;

});