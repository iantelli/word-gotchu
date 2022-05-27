window.onclick = function(event) {
  const targetClassList = event.target.className.split(" ");

  if (targetClassList.includes("loginButton") || targetClassList.includes("signupButton")) {

    const signupButton = document.querySelector(".signupButton");
    const loginButton = document.querySelector(".loginButton");
    const guestSignIn = document.querySelector(".guestSignIn");
    guestSignIn.remove();
    signupButton.classList.add("hidden");
    loginButton.classList.add("hidden");

    const backButton = document.createElement("div");
    backButton.className = "backButton";
    backButton.innerHTML = `<h1>BACK</h1>`;

    backButton.addEventListener("click", function() {
      window.location.href = "/start";
    })
    
    const mainScreen = document.querySelector(".startScreenBg");
    mainScreen.appendChild(backButton);
  }

  if (targetClassList.includes("loginButton")) {

    const loginFormFragment = document.createDocumentFragment();
    const loginScreen = document.createElement("div");
    loginScreen.classList.add("loginScreen");
    loginScreen.innerHTML = `
      <form action="" onsubmit="window.location.href='/'">
        <div class="formContainer">
          <h1>LOG IN</h1>
          <label for="username">username</label>
          <input type="text" placeholder="" name="username" required>
          <label for="password">password</label>
          <input type="password" placeholder="" name="password" required>
        </div>
        <button type="submit" class="loginSubmit">
          <h2>LOG IN</h2>
        </button>
      </form>
    `;
    loginFormFragment.appendChild(loginScreen);

    const mainScreen = document.querySelector(".startScreenBg");
    mainScreen.appendChild(loginFormFragment);
  }

  if (targetClassList.includes("signupButton")) {

    const signupFormFragment = document.createDocumentFragment();
    const signupScreen = document.createElement("div");
    signupScreen.classList.add("signupScreen");
    signupScreen.innerHTML = `
      <form action="" onsubmit="pickGotchu()">
        <div class="formContainer">
          <h1>SIGN UP</h1>
          <label for="username">USERNAME</label>
          <input type="text" placeholder="" name="username" required>
          <label for="email">EMAIL</label>
          <input type="text" placeholder="" name="email" required>
          <label for="password">PASSWORD</label>
          <input type="password" placeholder="" name="password" required>
          <label for="verifyPassword">VERIFY PASSWORD</label>
          <input type="password" placeholder="" name="verifyPassword" required>
        </div>
        <button type="submit" class="signupSubmit">
          <h2>SIGN UP</h2>
        </button>
      </form>
    `;
    signupFormFragment.appendChild(signupScreen);

    const mainScreen = document.querySelector(".startScreenBg");
    mainScreen.appendChild(signupFormFragment);
  }
}

function pickGotchu() {

  // Remove signup form
  const signupForm = document.querySelector(".signupScreen");
  signupForm.remove();

  const wordGotchuTitle = document.querySelector(".wordGotchuTitle");
  wordGotchuTitle.classList.add("hidden");

  // Add gotchu select popup
  const pickGotchuFragment = document.createDocumentFragment();
  const pickGotchuScreen = document.createElement("div");
  pickGotchuScreen.classList.add("chooseStarterGotchu");
  pickGotchuScreen.innerHTML = `            
    <div class="pickGotchuEggs">
      <h1>Pick your Gotchu!</h1>
      <div class="redEgg">
        <div class="viewRedEggButton">
          <h2>VIEW</h2>
        </div>
      </div>
      <div class="blueEgg">
        <div class="viewBlueEggButton">
          <h2>VIEW</h2>
        </div>
      </div>
      <div class="greenEgg">
        <div class="viewGreenEggButton">
          <h2>VIEW</h2>
        </div>
      </div>
    </div>
  `;
  pickGotchuFragment.appendChild(pickGotchuScreen);
  const mainScreen = document.querySelector(".startScreenBg");
  mainScreen.appendChild(pickGotchuFragment);
}


// Change the link
function goToHomepage() {
  window.location.href = "/";
}