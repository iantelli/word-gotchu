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
    
    const mainScreen = document.querySelector(".startScreenBg");
    mainScreen.appendChild(backButton);
  }
  
  if (targetClassList.includes("backButton")) {
    const card = document.querySelector(".gotchuCard");
    if (card) card.remove();
    if (!card) window.location.href = "/start";
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


  // Confirm selection
  if (targetClassList.includes("selectButton")) {
    const selectedEgg = event.target.parentElement;
    const selectedGotchu = selectedEgg.className.split(" ")[1].split("Card")[0] + "chu";
    window.location.href = `/`;
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

  // Add view gotchu select event listeners
  let selectedEgg;

  const viewRedEggButton = document.querySelector(".viewRedEggButton");
  viewRedEggButton.addEventListener("click", function() {
    selectedEgg = {
      cardName: "catCard",
      extraClass: "",
      title: "CATCHU",
      class: "catchu",
      description: "This catchu is cool. Take a nap.",
      atk: "**",
      speed: "***",
      defense: "*"
    }
    mainScreen.appendChild(populateEggCard(selectedEgg));
  });

  const viewBlueEggButton = document.querySelector(".viewBlueEggButton");
  viewBlueEggButton.addEventListener("click", function() {
    selectedEgg = {
      cardName: "dogCard",
      extraClass: "",
      title: "DOGCHU",
      class: "dogchu",
      description: "This dogchu is cool. Play fetch.",
      atk: "**",
      speed: "**",
      defense: "**"
    }
    mainScreen.appendChild(populateEggCard(selectedEgg));

  });

  const viewGreenEggButton = document.querySelector(".viewGreenEggButton");
  viewGreenEggButton.addEventListener("click", function() {
    selectedEgg = {
      cardName: "turtleCard",
      extraClass: " turtleTitle",
      title: "TURTLECHU",
      class: "turtlechu",
      description: "This turtlechu is cool. Save the turtles.",
      attack: "**",
      speed: "*",
      defense: "***"
    }
    mainScreen.appendChild(populateEggCard(selectedEgg));

  });

  
}

function populateEggCard(selectedEgg) {
  const cardFragment = document.createDocumentFragment();
  const card = document.createElement("div");
  card.className = `gotchuCard ${selectedEgg.cardName}`;
  card.innerHTML = `
    <div class="title${selectedEgg.extraClass}"><h3>${selectedEgg.title}</h3></div>
    <div class="${selectedEgg.class}"></div> 
    <div class="description"><h3>${selectedEgg.description}</h3></div>
    <div class="level"><h3>LVL 01</h3></div>
    <div class="xp"><h3>XP 0 / 50</h3></div>
    <div class="attack"><h3>ATTACK</h3><h4>${selectedEgg.attack}</h4></div>
    <div class="speed"><h3>SPEED</h3><h4>${selectedEgg.speed}</h4></div>
    <div class="defense"><h3>DEFENSE</h3><h4>${selectedEgg.defense}</h4></div>
    <div class="selectButton select${selectedEgg.class}"><h2>SELECT</h2></div>
  `;
  cardFragment.appendChild(card);
  return cardFragment;
}