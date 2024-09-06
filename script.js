const translations = {
  pl: {
    title: "Szarlotka",
    description:
      "Podstawowy i najprostszy przepis na szarlotkę na kruchym cieście. To bardzo szybka do zrobienia szarlotka, którą polecam każdemu. Poradzą z nią sobie nawet osoby, które rzadziej pieką i gotują. Jest pyszna!",
    ingredients: "Składniki",
    apples: "Jabłka",
    dough: "Ciasto",
    powderSugar: "Cukier puder",
    instructions: "Instrukcja",
    portionsLabel: "Liczba porcji:",
    subscribeLabel: "Zapisz się na newsletter:",
    submitButton: "Zapisz się",
    footerText: "© 2024 [Agnieszka Sak]. Wszelkie prawa zastrzeżone."
  },
  en: {
    title: "Apple Pie",
    description:
      "The basic and simplest recipe for apple pie with shortcrust pastry. This is a very quick apple pie that I recommend to everyone. Even people who bake and cook less often can handle it. It's delicious!",
    ingredients: "Ingredients",
    apples: "Apples",
    dough: "Dough",
    powderSugar: "Powdered Sugar",
    instructions: "Instructions",
    portionsLabel: "Number of portions:",
    subscribeLabel: "Subscribe to our newsletter:",
    submitButton: "Subscribe",
    footerText: "© 2024 [Agnieszka Sak]. All rights reserved."
  },
};
document.querySelectorAll(".language-switcher a").forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    const selectedLanguage = this.getAttribute('href').split('?lang=')[1];
    if (['pl', 'en'].includes(selectedLanguage)) {
      translatePage(selectedLanguage);
      localStorage.setItem('preferredLanguage', selectedLanguage);
    } else {
      console.error('Niepoprawny język:', selectedLanguage);
    }
  });
});
function translatePage(language) {
  const translation = translations[language];
  if (!translation) {
    console.error('Translation not found for:', language);
    return;
  }

  const elementsToTranslate = {
    "h1": translation.title,
    ".wstęp p": translation.description,
    ".składniki h2 span": translation.ingredients,
    ".instrukcja h2 span": translation.instructions,
    "label[for='liczbaPorcji']": translation.portionsLabel,
    "form label": translation.subscribeLabel,
    "form input[type='submit']": translation.submitButton,
    "footer p": translation.footerText
  };

  for (const selector in elementsToTranslate) {
    const element = document.querySelector(selector);
    if (element) {
      if (element.tagName.toLowerCase() === 'input' && element.type === 'submit') {
        element.value = elementsToTranslate[selector];
      } else {
        element.textContent = elementsToTranslate[selector];
      }
    }
  }
}
function detectLocationAndSetLanguage() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      if (lat >= 49 && lat <= 55 && lon >= 14 && lon <= 24) {
        translatePage('pl');
        localStorage.setItem('preferredLanguage', 'pl');
      } else {
        translatePage('en');
        localStorage.setItem('preferredLanguage', 'en');
      }
    }, () => {
      console.error('Geolokalizacja jest wyłączona. Używam domyślnego języka.');
      const savedLanguage = localStorage.getItem('preferredLanguage') || 'pl';
      translatePage(savedLanguage);
    });
  } else {
    console.error('Geolokalizacja nie jest obsługiwana przez tę przeglądarkę.');
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'pl';
    translatePage(savedLanguage);
  }
}
document.addEventListener('DOMContentLoaded', function () {
  const savedLanguage = localStorage.getItem('preferredLanguage');
  if (savedLanguage) {
    translatePage(savedLanguage);
  } else {
    detectLocationAndSetLanguage();
  }
});
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
    count % 10 >= 2 &&
    count % 10 <= 4 &&
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
          <li>${formatValue(
            baseIngredients.apples * portions,
            false
          )} kg jabłek</li>
          <li>${formatValue(
            baseIngredients.sugar * portions,
            false
          )} łyżki cukru</li>
          <li>Cukier waniliowy</li>
          <li>${formatValue(
            baseIngredients.cinnamon * portions,
            false
          )} łyżeczki cynamonu</li>
        </ul>
        <h3>Ciasto:</h3>
        <ul>
          <li>${formatValue(
            baseIngredients.flour * portions,
            false
          )} szklanki mąki</li>
          <li>${formatValue(
            baseIngredients.yolks * portions,
            true
          )} ${getPluralForm(
    baseIngredients.yolks * portions,
    "żółtko",
    "żółtka",
    "żółtek"
  )}</li>
          <li>${formatValue(
            baseIngredients.bakingPowder * portions,
            false
          )} łyżeczki proszku do pieczenia</li>
          <li>Szczypta soli</li>
          <li>${formatValue(
            baseIngredients.butter * portions,
            false
          )} g masła</li>
          <li>Cukier waniliowy</li>
          <li>${formatValue(
            baseIngredients.sugar * portions,
            false
          )} szklanki cukru</li>
          <li>${formatValue(
            baseIngredients.breadCrumbs * portions,
            false
          )} łyżki bułki tartej</li>
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
