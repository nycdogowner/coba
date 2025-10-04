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
    `<h2>Results</h2><div>${generateAnalysis(step, answers[step] || {})}</div>`;
}

// === Generate Full Analysis (Deep Dive + Roadmap + Narrative) ===
function generateAnalysis(step, fields) {
  if (!fields) return "Please complete the fields.";
  
  let output = `<h2>Professional Deep-Dive Analysis</h2>`;
  output += `<p><b>Category:</b> ${categories.find(c => c.id === step).title}</p>`;

  // Contoh analisa khusus (nanti tiap kategori bisa punya analisa berbeda)
  output += `
  <h2>A. Affiliate Product Analysis</h2>
  <p><b>A.1. Core Value Proposition</b><br>
  This product solves key pain points by offering efficiency, affordability, and accessibility.</p>

  <p><b>A.2. Target Audience Insights</b><br>
  Freelancers, small businesses, marketers, students — all benefit in unique ways.</p>

  <p><b>A.3. Pain Points Solved</b><br>
  Lack of skills, limited budget, time constraints.</p>

  <p><b>A.4. Unique Differentiators</b><br>
  Large resource library, ease of use, collaborative features, affordable pricing.</p>

  <p><b>A.5. Affiliate Positioning Strategy</b><br>
  Emphasize saving time and money, highlight transformation stories, offer bonuses.</p>

  <p><b>A.6. Success Roadmap</b><br>
  Content creation → Audience targeting → Conversion funnels with tutorials and guides.</p>

  <p><b>A.7. Revenue Potential</b><br>
  With optimized promotion, affiliates can scale earnings from a few hundred to thousands monthly.</p>

  <h2>🚀 Roadmap to Success</h2>
  <ul>
    <li><b>Week 1:</b> Research target audience, analyze competitors, define USP.</li>
    <li><b>Week 2:</b> Build landing page, create first bonus resources, set up social channels.</li>
    <li><b>Week 3:</b> Publish tutorials, test campaigns, collect engagement data.</li>
    <li><b>Week 4:</b> Review validation results, refine content, optimize funnels.</li>
    <li><b>Month 2-3:</b> Scale consistent weekly content, build email list, achieve $500/month milestone.</li>
    <li><b>Month 4-6:</b> Expand authority with advanced resources, optimize conversions, aim for $2,000–$5,000/month.</li>
  </ul>

  <h2>Narrative Analysis</h2>
  <p>Paragraph 1: Understanding affiliate digital products requires clarity on your chosen niche and the audience you want to serve. By aligning your skills and experiences with market demand, you gain a natural edge in credibility and trust.</p>
  <p>Paragraph 2: Affiliates often underestimate the value of identifying pain points. Yet, the deeper you know your audience's struggles, the easier it is to position your offer as the most practical solution they need right now.</p>
  <p>Paragraph 3: Beyond theory, execution matters. Affiliates who document their journey — tutorials, blogs, case studies — not only market the product but also showcase authenticity, which increases conversions.</p>
  <p>Paragraph 4: Pricing and positioning are two sides of the same coin. By understanding the real transformation provided, you can set pricing strategies and highlight the cost-benefit advantage over traditional solutions.</p>
  <p>Paragraph 5: Building irresistible offers is not about the product alone but about the package — bonuses, emotional benefits, and storytelling that reduce buyer hesitation and amplify perceived value.</p>
  <p>Paragraph 6: Ultimately, success comes from consistent action and refinement. Start lean, validate fast, scale wisely. Affiliate digital product success is a marathon of learning, testing, and optimizing — but with the right framework, your growth is inevitable.</p>
  `;

  return output;
}

// === PDF Export ===
function exportPDF(content, filename) {
  const doc = new jsPDF("p", "pt", "a4");
  doc.setFont("calibri", "normal");
  doc.setFontSize(14);
  doc.text(content, 40, 60, { maxWidth: 500 });
  doc.save(filename);
}

// === Navigation ===
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

// Init
renderForm();
renderResults();
