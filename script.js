let botao = document.querySelector('.meu-botao');
let paragrafos = document.querySelectorAll('p');
const chars = {
    lower: "abcdefghijklmnopqrstuvwxyz",
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{}|;:,.<>/?"
  };

  function generatePassword() {
    const length = parseInt(document.getElementById('length').value);
    const upper = document.getElementById('upper').checked;
    const lower = document.getElementById('lower').checked;
    const numbers = document.getElementById('numbers').checked;
    const symbols = document.getElementById('symbols').checked;

    let pool = "";
    if (upper) pool += chars.upper;
    if (lower) pool += chars.lower;
    if (numbers) pool += chars.numbers;
    if (symbols) pool += chars.symbols;

    if (pool === "") {
      pool = chars.lower + chars.upper;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
      password += pool[Math.floor(Math.random() * pool.length)];
    }

    document.getElementById('password').textContent = password;
    updateStrength(password);
  }

  function changeLength(amount) {
    let lengthInput = document.getElementById('length');
    let newLength = parseInt(lengthInput.value) + amount;
    if (newLength >= 4 && newLength <= 64) {
      lengthInput.value = newLength;
      generatePassword();
    }
  }

  function updateStrength(password) {
    const bar = document.getElementById('strength-bar');
    const text = document.getElementById('strength-text');
    
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score >= 4) {
      bar.style.background = "linear-gradient(90deg, #22c55e, #86efac)";
      bar.style.width = "100%";
      text.textContent = "Forte";
      text.style.color = "#86efac";
    } else if (score >= 3) {
      bar.style.background = "linear-gradient(90deg, #eab308, #fde047)";
      bar.style.width = "70%";
      text.textContent = "Média";
      text.style.color = "#fde047";
    } else {
      bar.style.background = "linear-gradient(90deg, #ef4444, #f87171)";
      bar.style.width = "40%";
      text.textContent = "Fraca";
      text.style.color = "#f87171";
    }
  }

  // Copiar senha ao clicar
  document.getElementById('password').addEventListener('click', function() {
    const password = this.textContent;
    if (password && password !== "Clique em Gerar") {
      navigator.clipboard.writeText(password).then(() => {
        const original = this.textContent;
        this.textContent = "✓ Copiado!";
        setTimeout(() => this.textContent = original, 2000);
      });
    }
  });

  // Gerar senha ao carregar a página
  window.onload = generatePassword;