const CUTOFF = 42;

const SECTIONAL_CUTOFF = {
  vocab: 15,
  ca: 15,
  desc: 12
};

const USERS = {
  "9151701": {
    password: "91517001",
    dob: "05-07-2000",
    name: "Deepanshu Yadav",
    vocab: { scored: 20, total: 20 },
    ca: { scored: 20, total: 20 },
    desc: { scored: null, total: 30 }
  },

  "8504002": {
    password: "85040002",
    dob: "25-11-2004",
    name: "Nikita Soni",
    vocab: { scored: 18, total: 20 },
    ca: { scored: 11, total: 20 },
    desc: { scored: null, total: 30 }
  },

  "8756203": {
    password: "87562003",
    dob: "10-08-2002",
    name: "Jyoti Yadav",
    vocab: { scored: 20, total: 20 },
    ca: { scored: 18, total: 20 },
    desc: { scored: null, total: 30 }
  },

  "6001104": {
    password: "60011004",
    dob: "29-11-1999",
    name: "Priyanka Dev",
    vocab: { scored: 20, total: 20 },
    ca: { scored: 16, total: 20 },
    desc: { scored: null, total: 30 }
  },

  "6205705": {
    password: "62057005",
    dob: "25-12-2003",
    name: "Priyanka Verma",
    vocab: { scored: 12, total: 20 },
    ca: { scored: 8, total: 20 },
    desc: { scored: null, total: 30 }
  },

  "8303906": {
    password: "83039006",
    dob: "27-07-2003",
    name: "Adweta Sen",
    vocab: { scored: null, total: 20 },
    ca: { scored: null, total: 20 },
    desc: { scored: null, total: 30 }
  },

  /* ✅ CORRECTED */
  "7878107": {
    password: "78781007",
    dob: "02-02-2002",
    name: "Shivani Jha",
    vocab: { scored: 12, total: 20 },
    ca: { scored: 10, total: 20 },
    desc: { scored: null, total: 30 }
  },

  /* ✅ CORRECTED */
  "8534808": {
    password: "85348008",
    dob: "06-06-2002",
    name: "Shweta Yadav",
    vocab: { scored: 16, total: 20 },
    ca: { scored: 13, total: 20 },
    desc: { scored: null, total: 30 }
  }
};

// ⏰ Unlock time
const RESULT_UNLOCK_TIME = { hour: 22, minute: 35 };

function isResultUnlocked() {
  const now = new Date();
  const unlock = new Date();
  unlock.setHours(RESULT_UNLOCK_TIME.hour, RESULT_UNLOCK_TIME.minute, 0, 0);
  return now >= unlock;
}

function login() {
  const err = document.getElementById("error");
  const lockMsg = document.getElementById("lockMsg");

  if (!isResultUnlocked()) {
    lockMsg.textContent = "⏰ Results will be available after 10:35 PM.";
    err.textContent = "";
    return;
  }

  const roll = rollInput.value.trim();
  const password = passwordInput.value.trim();
  const dob = dobInput.value.trim();

  if (!USERS[roll] || USERS[roll].password !== password || USERS[roll].dob !== dob) {
    err.textContent = "Invalid credentials.";
    return;
  }

  const u = USERS[roll];

  const vs = u.vocab.scored ?? 0;
  const cs = u.ca.scored ?? 0;
  const ds = u.desc.scored ?? 0;

  const total = vs + cs + ds;

  const final =
    vs >= SECTIONAL_CUTOFF.vocab &&
    cs >= SECTIONAL_CUTOFF.ca &&
    ds >= SECTIONAL_CUTOFF.desc &&
    total >= CUTOFF;

  name.textContent = u.name;
  rollShow.textContent = roll;
  vocab.textContent = `${vs}/${u.vocab.total}${vs >= 15 ? "" : " *"}`;
  ca.textContent = `${cs}/${u.ca.total}${cs >= 15 ? "" : " *"}`;
  desc.textContent = u.desc.scored === null ? "Not Attempted *" : `${ds}/30`;
  totalEl.textContent = `${total} / 70`;
  cutoff.textContent = CUTOFF;

  status.textContent = final ? "Qualified" : "Not Qualified";
  status.className = final ? "pass" : "fail";

  loginCard.style.display = "none";
  resultCard.style.display = "block";
}

function logout() {
  loginCard.style.display = "block";
  resultCard.style.display = "none";
  roll.value = password.value = dob.value = "";
  error.textContent = "";
}
