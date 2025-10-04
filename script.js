const { jsPDF } = window.jspdf;

const categories = [
  {
    id: 1,
    title: "Affiliate Product Idea Helper",
    fields: [
      "Questions people ask me are…",
      "My hobbies are…",
      "I’m well researched in…",
      "I’m good at…",
      "I’ve had good results with…",
      "My transformation story is…"
    ]
  },
  {
    id: 2,
    title: "Validate Your Affiliate Product Idea",
    fields: [
      "My idea is…",
      "My target audience is…",
      "The problem they have is…",
      "Current solutions are…",
      "What makes my idea unique is…",
      "They would be willing to pay…"
    ]
  },
  {
    id: 3,
    title: "Affiliate Product Content & Promotion Outline",
    fields: [
      "The main outcome I want my audience to achieve is…",
      "The big 3–5 steps they need to take are…",
      "The format I want (PDF, video, toolkit, etc.) is…"
    ]
  },
  {
    id: 4,
    title: "Affiliate Product Pricing & Commission Strategy",
    fields: [
      "The transformation I’m providing is…",
      "The value of this transformation is…",
      "Competitors charge around…",
      "My audience income level is…"
    ]
  },
  {
    id: 5,
    title: "Make Your Affiliate Offer Irresistible",
    fields: [
      "The unique promise of my product is…",
      "The objections my audience has are…",
      "The emotional benefit is…",
      "The bonuses I can add are…"
    ]
  }
];

let step = 1;
let answers = {};

function renderForm() {
  const category = categories.find(c => c.id === step);
  const formDiv = document.getElementById("form-steps");
  formDiv.innerHTML = `<h2>${category.title}</h2>`;
  category.fields.forEach(field => {
    const value = answers[step]?.[field] || "";
    formDiv.innerHTML += `
      <label>${field}</label>
      <input type="text" 
        value="${value}" 
        oninput="handleChange('${field}', this.value)">
    `;
  });

  document.getElementById("fullBlueprint").classList.toggle("hidden", step !== categories.length);
}

function handleChange(field, value) {
  answers[step] = { ...(answers[step] || {}), [field]: value };
  renderResults();
}

function renderResults() {
  document.getElementById("results").innerHTML =
    `<h2>Results</h2><p>${generateAnalysis(step, answers[step] || {})}</p>`;
}

// Dummy analysis generator (replace with real logic)
function generateAnalysis(step, fields) {
  if (!fields) return "Please complete the fields.";
  return `Analysis for ${categories.find(c => c.id === step).title} based on inputs.`;
}

// PDF export
function exportPDF(content, filename) {
  const doc = new jsPDF("p", "pt", "a4");
  doc.setFont("calibri", "normal");
  doc.setFontSize(14);
  doc.text(content, 40, 60, { maxWidth: 500 });
  doc.save(filename);
}

// Navigation
document.getElementById("nextBtn").onclick = () => {
  if (step < categories.length) step++;
  renderForm();
  renderResults();
};

document.getElementById("prevBtn").onclick = () => {
  if (step > 1) step--;
  renderForm();
  renderResults();
};

// Export current step
document.getElementById("resultsPDF").onclick = () => {
  const content = document.getElementById("results").innerText;
  exportPDF(content, `${categories.find(c => c.id === step).title}.pdf`);
};

// Results view
document.getElementById("resultsView").onclick = () => {
  const content = document.getElementById("results").innerHTML;
  const newWindow = window.open("", "_blank");
  newWindow.document.write(`
    <html><head><title>Results</title></head><body>
      <h1>${categories.find(c => c.id === step).title}</h1>
      ${content}
    </body></html>
  `);
};

// Full blueprint
document.getElementById("fullBlueprint").onclick = () => {
  let fullContent = "";
  categories.forEach(cat => {
    const analysis = generateAnalysis(cat.id, answers[cat.id] || {});
    fullContent += `\n${cat.title}\n${analysis}\n\n`;
  });
  exportPDF(fullContent, "Affiliate_Digital_Product_Success_Blueprint.pdf");
};

// Initialize
renderForm();
renderResults();
