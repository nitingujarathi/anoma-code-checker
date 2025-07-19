const codeInput = document.getElementById("codeInput");
const resultEl = document.getElementById("result");
const checkBtn = document.getElementById("checkBtn");

checkBtn.addEventListener("click", checkCode);

async function checkCode() {
  const code = codeInput.value.trim();
  
  resultEl.className = "hidden";
  resultEl.textContent = "";
  
  if (!code) {
    showResult("Please enter a code.", "error");
    return;
  }

  showResult("Checking…", "info");

  try {
    const res = await fetch("https://api.prod.testnet.anoma.net/api/v1/invite/redeem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ invite_code: code })
    });

    if (res.status === 200) {
      showResult("✅ Code is valid and unused!", "success");
    } else if (res.status === 500) {
      showResult("⚠️ Code already used.", "warning");
    } else if (res.status === 401 || res.status === 404) {
      showResult("❌ Code is wrong", "error");
    } else {
      showResult(`❌ Unknown error (${res.status}).`, "error");
    }

  } catch (err) {
    showResult("❌ Error checking code. Please try again.", "error");
    console.error(err);
  }
}

function showResult(message, type) {
  resultEl.textContent = message;
  resultEl.className = "";
  resultEl.classList.add("visible");
  resultEl.classList.add(type);
}
