document.querySelector("form").addEventListener("submit", function (event) {
    const emailField = document.getElementById("email");
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  
    if (!emailPattern.test(emailField.value)) {
      alert("Proszę wprowadzić poprawny adres e-mail.");
      event.preventDefault();
    }
  });
  function getPluralForm(count, singular, plural1, plural2) {
    if (count % 10 === 1 && count % 100 !== 11) {
      return singular;
    } else if (
      (count % 10 >= 2 && count % 10 <= 4) &&
      !(count % 100 >= 12 && count % 100 <= 14)
    ) {
      return plural1;
    } else {
      return plural2;
    }
  }
  function formatValue(value, isWholeNumber) {
    if (isWholeNumber) {
      return value.toFixed(0); 
    } else {
      return value % 1 === 0 ? value.toFixed(0) : value.toFixed(1); 
    }
  }
  document.getElementById("liczbaPorcji").addEventListener("input", function () {
    const portions = parseFloat(this.value) || 0;
    const baseIngredients = {
      apples: 1.5,
      sugar: 3,
      vanillaSugar: 1,
      cinnamon: 0.5,
      flour: 2,
      yolks: 4,
      bakingPowder: 2,
      salt: 0.125,
      butter: 180,
      vanillaSugarCake: 1,
      breadCrumbs: 2,
    };
    document.querySelector(".składniki").innerHTML = `
        <h2><span>Składniki</span></h2>
        <h3>Jabłka:</h3>
        <ul>
          <li>${formatValue(baseIngredients.apples * portions, false)} kg jabłek</li>
          <li>${formatValue(baseIngredients.sugar * portions, false)} łyżki cukru</li>
          <li>Cukier waniliowy</li>
          <li>${formatValue(baseIngredients.cinnamon * portions, false)} łyżeczki cynamonu</li>
        </ul>
        <h3>Ciasto:</h3>
        <ul>
          <li>${formatValue(baseIngredients.flour * portions, false)} szklanki mąki</li>
          <li>${formatValue(baseIngredients.yolks * portions, true)} ${getPluralForm(baseIngredients.yolks * portions, "żółtko", "żółtka", "żółtek")}</li>
          <li>${formatValue(baseIngredients.bakingPowder * portions, false)} łyżeczki proszku do pieczenia</li>
          <li>Szczypta soli</li>
          <li>${formatValue(baseIngredients.butter * portions, false)} g masła</li>
          <li>Cukier waniliowy</li>
          <li>${formatValue(baseIngredients.sugar * portions, false)} szklanki cukru</li>
          <li>${formatValue(baseIngredients.breadCrumbs * portions, false)} łyżki bułki tartej</li>
        </ul>
        <h3>Do posypania:</h3>
        <ul>
          <li>Cukier puder</li>
        </ul>`;
  });
  const emailInput = document.getElementById("email");
  const submitButton = document.querySelector('input[type="submit"]');
  
  emailInput.addEventListener("focus", function () {
    submitButton.style.backgroundColor = "#666666";
    submitButton.style.transform = "scale(1.05)";
  });
  
  emailInput.addEventListener("blur", function () {
    submitButton.style.backgroundColor = "#444444";
    submitButton.style.transform = "scale(1)";
  });
  