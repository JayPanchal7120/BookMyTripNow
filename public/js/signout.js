const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");



const PNM = document.getElementById("PNM");
const container = document.querySelector(".container");
const cpassOk=(password===cpassword);


function check()
{
  const cpassword = document.getElementById("cpassword").value;
  const password = document.getElementById("password").value;
  if(password!=cpassword)
  {
    PNM.style.display = "block";
    document.getElementById("signupsubmit").disabled=true;
  }
  else if(password==cpassword){
    PNM.style.display = "none";
    document.getElementById("signupsubmit").disabled=false;
  }
}

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});
