// AJAX for sign out and destroying session request
// checks the web if the sign-out-btn class is available
document.addEventListener("DOMContentLoaded", () => {
  const signOutButton = document.querySelector('.sign-out-btn');

  if(!signOutButton) {
    document.body.classList.remove(signOutButton);  // Destroy class name if not found
  }
  else {
    signOutButton.addEventListener("click", async () => {
      try {
        const response = await fetch(`/sign-out`,{
          method: "GET"
        });
    
        if(!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const result = await response.json();
        alert(result.message);
        return window.location.href = "/product-connection"; // Redirect user after destroying session
      } 
      catch (error) {
        console.error('Error sign out...', error);
      }
    });
  }
});