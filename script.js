const fileInput = document.getElementById("fileInput");
const chooseFilesBtn = document.getElementById("chooseFilesBtn");
const dropZone = document.getElementById("dropZone");
const filesList = document.getElementById("filesList");
const nbFiles = document.getElementById("nbFiles");
const totalSize = document.getElementById("totalSize");
const applyBox = document.getElementById("applyAll");
const applyAllBtn = document.getElementById("applyAllBtn");
const globalFormat = document.getElementById("globalFormat");
const singleConvertBtn = document.getElementById("singleConvert");
const convertAllBtn = document.getElementById("convertButton");
const historyList = document.getElementById("historyList");
const historyEmpty = document.getElementById("historyEmpty");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");
const tabButtons = document.querySelectorAll(".tabBtn");
const panels = document.querySelectorAll(".panel");
const ocrInput = document.getElementById("ocrInput");
const ocrPreview = document.getElementById("ocrPreview");
const ocrPlaceholder = document.getElementById("ocrPlaceholder");
const ocrButton = document.getElementById("ocrButton");
const ocrOutput = document.getElementById("ocrOutput");
const copyOcrBtn = document.getElementById("copyOcrBtn");
const downloadOcrBtn = document.getElementById("downloadOcrBtn");
const ocrProgressWrap = document.getElementById("ocrProgressWrap");
const ocrProgressFill = document.getElementById("ocrProgressFill");
const ocrProgressText = document.getElementById("ocrProgressText");
const ocrStatus = document.getElementById("ocrStatus");
const ocrFormatSelect = document.getElementById("ocrFormatSelect");
const compressDropZone = document.getElementById("compressDropZone");
const chooseCompressBtn = document.getElementById("chooseCompressBtn");
const compressInput = document.getElementById("compressInput");
const compressCount = document.getElementById("compressCount");
const compressSize = document.getElementById("compressSize");
const compressList = document.getElementById("compressList");
const compressSettings = document.getElementById("compressSettings");
const compressBtn = document.getElementById("compressBtn");
const qualityRange = document.getElementById("qualityRange");
const qualityValue = document.getElementById("qualityValue");
const maxWidthSelect = document.getElementById("maxWidthSelect");

const editorToolbar = document.getElementById("editorWorkspace");
const editorArea = document.getElementById("editorArea");
const fontNameSelect = document.getElementById("fontNameSelect");
const fontSizeSelect = document.getElementById("fontSizeSelect");
const fontColorInput = document.getElementById("fontColorInput");
const editorFormatSelect = document.getElementById("editorFormatSelect");
const editorDownloadBtn = document.getElementById("editorDownloadBtn");
const editorImportPdfBtn = document.getElementById("editorImportPdfBtn");
const editorPdfInput = document.getElementById("editorPdfInput");
const editorImportStatus = document.getElementById("editorImportStatus");

const btnNewDoc = document.getElementById("btnNewDoc");
const btnOpenDoc = document.getElementById("btnOpenDoc");
const openDocInput = document.getElementById("openDocInput");
const btnPrint = document.getElementById("btnPrint");
const recentDocsSelect = document.getElementById("recentDocsSelect");
const btnDeleteSel = document.getElementById("btnDeleteSel");
const btnSelectAll = document.getElementById("btnSelectAll");
const btnInsertDate = document.getElementById("btnInsertDate");
const btnFindReplace = document.getElementById("btnFindReplace");
const findReplaceBox = document.getElementById("findReplaceBox");
const findInput = document.getElementById("findInput");
const replaceInput = document.getElementById("replaceInput");
const findNextBtn = document.getElementById("findNextBtn");
const replaceAllBtn = document.getElementById("replaceAllBtn");
const closeFindBtn = document.getElementById("closeFindBtn");
const highlightColorInput = document.getElementById("highlightColorInput");
const lineHeightSelect = document.getElementById("lineHeightSelect");
const btnInsertImage = document.getElementById("btnInsertImage");
const insertImageInput = document.getElementById("insertImageInput");
const btnImproveImage = document.getElementById("btnImproveImage");
const btnImageLeft = document.getElementById("btnImageLeft");
const btnImageCenter = document.getElementById("btnImageCenter");
const btnImageRight = document.getElementById("btnImageRight");
const btnInsertLink = document.getElementById("btnInsertLink");
const btnInsertTable = document.getElementById("btnInsertTable");
const zoomInBtn = document.getElementById("zoomInBtn");
const zoomOutBtn = document.getElementById("zoomOutBtn");
const zoomResetBtn = document.getElementById("zoomResetBtn");
const zoomLabel = document.getElementById("zoomLabel");
const editorStatusBar = document.getElementById("editorStatusBar");
const pageScrollArea = document.getElementById("pageScrollArea");
const marginInput = document.getElementById("marginInput");
const orientationSelect = document.getElementById("orientationSelect");
const paperSizeSelect = document.getElementById("paperSizeSelect");
const headerInput = document.getElementById("headerInput");
const footerInput = document.getElementById("footerInput");

const html2canvasReady = () => loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js");

function loadScript(url) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${url}"]`);
    if (existing) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

const librariesReady = Promise.all([
  loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"),
  loadScript("https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"),
  loadScript("https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js")
]);

async function jsZipReady() {
  if (window.JSZip) return;

  const sources = [
    "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js",
    "https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js"
  ];

  let lastError = null;
  for (const src of sources) {
    try {
      await loadScript(src);
      if (window.JSZip) return;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error("JSZip indisponible");
}

const ocrLibraryReady = () => loadScript("https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js");

let pdfjsConfigured = false;
async function pdfLibraryReady() {
  const sources = [
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js",
    "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.js"
  ];

  if (window.pdfjsLib) return;

  let lastError = null;
  for (const src of sources) {
    try {
      await loadScript(src);
      if (window.pdfjsLib) break;
    } catch (error) {
      lastError = error;
    }
  }

  if (!window.pdfjsLib) {
    throw lastError || new Error("PDF.js indisponible");
  }

  if (!pdfjsConfigured) {
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
    pdfjsConfigured = true;
  }
}

let filesData = [];
let history = loadHistory();
let conversionsReady = false;
let ocrFile = null;
let compressData = [];
let compressReady = false;
let selectedEditorImage = null;
let pageMetrics = {
  widthPx: 794,
  heightPx: 1123,
  marginPx: 76,
  pageGapPx: 0
};

const CATEGORIES = {
  document: ["pdf", "doc", "docx", "txt", "rtf", "odt", "xls", "xlsx", "csv", "ppt", "pptx", "md", "html", "htm", "ods", "odp", "pages", "numbers", "key"],
  image: ["jpg", "jpeg", "png", "webp", "gif", "bmp", "tiff", "ico", "svg", "avif", "heic", "heif", "psd", "raw", "cr2", "nef"],
  audio: ["mp3", "wav", "flac", "ogg", "aac", "m4a", "wma", "aiff", "amr", "opus"],
  video: ["mp4", "avi", "mov", "mkv", "webm", "flv", "wmv", "m4v", "3gp", "ts", "mts"],
  archive: ["zip", "rar", "7z", "tar", "gz", "tgz", "iso"],
  ebook: ["epub", "mobi"],
  font: ["ttf", "otf", "woff", "woff2"],
  design3d: ["stl", "obj", "fbx", "gcode", "step", "dxf"]
};

const FORMATS = {
  txt: ["PDF", "DOCX", "HTML"],
  csv: ["XLSX"],
  xlsx: ["CSV"],
  pdf: ["TXT", "PNG", "JPG", "DOCX"],
  docx: ["TXT", "PDF"],
  md: ["HTML", "TXT", "PDF"],
  html: ["TXT", "PDF"],
  htm: ["TXT", "PDF"],
  png: ["JPG", "WEBP", "PDF"],
  jpg: ["PNG", "WEBP", "PDF"],
  jpeg: ["PNG", "WEBP", "PDF"],
  webp: ["PNG", "JPG", "PDF"],
  bmp: ["PNG", "JPG", "WEBP", "PDF"],
  gif: ["PNG", "JPG", "WEBP", "PDF"],
  image: ["JPG", "PNG", "WEBP", "TXT"]
};

const CATEGORY_COLORS = {
  document: "#3562E9",
  image: "#A855F7",
  audio: "#F59E0B",
  video: "#EF4444",
  archive: "#64748B",
  ebook: "#10B981",
  font: "#EC4899",
  design3d: "#06B6D4",
  autre: "#9CA3AF"
};

const CATEGORY_ICONS = {
  document: "Doc",
  image: "Img",
  audio: "Aud",
  video: "Vid",
  archive: "Arc",
  ebook: "Book",
  font: "Font",
  design3d: "3D",
  autre: "File"
};

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    panels.forEach((panel) => panel.classList.remove("active"));
    button.classList.add("active");
    document.getElementById(button.dataset.tab).classList.add("active");
  });
});

chooseFilesBtn.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", () => {
  addFiles(fileInput.files);
  fileInput.value = "";
});

setupDropZone(dropZone, (fileList) => addFiles(fileList));

function addFiles(fileListObj) {
  conversionsReady = false;

  for (const file of fileListObj) {
    filesData.push({
      file,
      format: "",
      convertedBlob: null,
      convertedName: ""
    });
  }

  refreshUI();
}

function getExtension(filename) {
  return filename.includes(".") ? filename.split(".").pop().toLowerCase() : "";
}

function getCategory(extension) {
  for (const [category, extensions] of Object.entries(CATEGORIES)) {
    if (extensions.includes(extension)) return category;
  }
  return "autre";
}

function getFormatsFor(extension) {
  const category = getCategory(extension);
  let formats = [];
  if (FORMATS[extension]) formats = [...FORMATS[extension]];
  else if (FORMATS[category]) formats = [...FORMATS[category]];
  if (category !== "archive") formats.push("ZIP");
  return formats;
}

function showFiles() {
  filesList.innerHTML = "";

  filesData.forEach((item, index) => {
    const extension = getExtension(item.file.name);
    const category = getCategory(extension);
    const formats = getFormatsFor(extension);
    const color = CATEGORY_COLORS[category];
    const icon = CATEGORY_ICONS[category];

    const div = document.createElement("div");
    div.className = "file";
    div.style.setProperty("--cat-color", color);

    const optionsHtml = formats
      .map((format) => `<option value="${format}" ${item.format === format ? "selected" : ""}>${format}</option>`)
      .join("");

    div.innerHTML = `
      <div class="fileTitle">${icon} - ${escapeHtml(item.file.name)}</div>
      <div class="fileInfos">
        <span class="badge">${extension.toUpperCase() || "FICHIER"}</span>${formatSize(item.file.size)}
      </div>
      <div id="action-area-${index}">
        <label for="format-${index}">Convertir vers :</label>
        <select id="format-${index}" data-index="${index}" class="formatSelect">
          <option value="" ${item.format === "" ? "selected" : ""}>Choisir...</option>
          ${optionsHtml}
        </select>
      </div>
      <div class="progressWrap hidden" id="progressWrap-${index}">
        <div class="progressTrack">
          <div class="progressFill" id="progressFill-${index}"></div>
        </div>
        <div class="progressLabel">
          <span id="progressPercent-${index}">0%</span>
          <span id="status-${index}" class="statusText"></span>
        </div>
      </div>
      <br>
      <button type="button" class="remove" data-index="${index}">Supprimer</button>
    `;

    filesList.appendChild(div);

    if (item.convertedBlob && item.convertedName) {
      injectDownloadButton(index);
      updateProgress(index, 100, "Prêt");
    }
  });
}

filesList.addEventListener("change", (e) => {
  if (e.target.classList.contains("formatSelect")) {
    const index = Number(e.target.dataset.index);
    filesData[index].format = e.target.value;
    filesData[index].convertedBlob = null;
    filesData[index].convertedName = "";
    conversionsReady = false;
    updateConvertButtons();
  }
});

filesList.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove")) {
    const index = Number(e.target.dataset.index);
    filesData.splice(index, 1);
    conversionsReady = false;
    refreshUI();
  }
});

applyAllBtn.addEventListener("click", () => {
  const format = globalFormat.value;

  filesData.forEach((item) => {
    const extension = getExtension(item.file.name);
    if (getFormatsFor(extension).includes(format)) {
      item.format = format;
      item.convertedBlob = null;
      item.convertedName = "";
    }
  });

  conversionsReady = false;
  showFiles();
  updateConvertButtons();
});

singleConvertBtn.addEventListener("click", handleMainAction);
convertAllBtn.addEventListener("click", handleMainAction);

async function handleMainAction() {
  if (conversionsReady) {
    await downloadConvertedFiles();
    return;
  }

  const missing = filesData.filter((item) => !item.format);
  if (missing.length > 0) {
    alert("Veuillez choisir un format pour tous les fichiers.");
    return;
  }

  try {
    await librariesReady;
  } catch (error) {
    alert("Impossible de charger les modules de conversion. Vérifiez votre connexion internet.");
    return;
  }

  setMainButtonsLoading(true);

  for (let i = 0; i < filesData.length; i++) {
    await processConversion(i);
  }

  conversionsReady = filesData.length > 0 && filesData.every((item) => item.convertedBlob && item.convertedName);
  setMainButtonsLoading(false);
  updateConvertButtons();
}

function setMainButtonsLoading(isLoading) {
  const btn = filesData.length === 1 ? singleConvertBtn : convertAllBtn;
  btn.disabled = isLoading;
  if (isLoading) btn.textContent = "Conversion en cours...";
}

function updateResume() {
  nbFiles.textContent = filesData.length;
  const total = filesData.reduce((sum, item) => sum + item.file.size, 0);
  totalSize.textContent = formatSize(total);
  updateConvertButtons();
}

function updateGlobalFormatOptions() {
  if (filesData.length <= 1) {
    applyBox.classList.add("hidden");
    return;
  }

  applyBox.classList.remove("hidden");

  const formats = new Set();
  filesData.forEach((item) => {
    const extension = getExtension(item.file.name);
    getFormatsFor(extension).forEach((format) => formats.add(format));
  });

  globalFormat.innerHTML = [...formats].map((f) => `<option value="${f}">${f}</option>`).join("");
}

function updateConvertButtons() {
  singleConvertBtn.classList.toggle("hidden", filesData.length !== 1);
  convertAllBtn.classList.toggle("hidden", filesData.length <= 1);

  if (filesData.length === 1) {
    singleConvertBtn.disabled = false;
    singleConvertBtn.style.backgroundColor = conversionsReady ? "#16A34A" : "";
    singleConvertBtn.textContent = conversionsReady ? "Télécharger le fichier converti" : "Convertir";
  }

  if (filesData.length > 1) {
    convertAllBtn.disabled = false;
    convertAllBtn.style.backgroundColor = conversionsReady ? "#16A34A" : "";
    convertAllBtn.textContent = conversionsReady ? "Télécharger tous les fichiers" : "Convertir tous les fichiers";
  }
}

function updateProgress(index, pct, statusText = "") {
  const fill = document.getElementById(`progressFill-${index}`);
  const percentLabel = document.getElementById(`progressPercent-${index}`);
  const wrap = document.getElementById(`progressWrap-${index}`);
  const status = document.getElementById(`status-${index}`);

  if (wrap) wrap.classList.remove("hidden");
  if (fill) fill.style.width = pct + "%";
  if (percentLabel) percentLabel.textContent = Math.floor(pct) + "%";
  if (status && statusText) status.textContent = statusText;
}

async function processConversion(index) {
  const item = filesData[index];
  if (!item || !item.format) return;

  const extIn = getExtension(item.file.name);
  const category = getCategory(extIn);
  let extOut = item.format.toLowerCase();
  const baseName = removeExtension(item.file.name);

  updateProgress(index, 20, "Analyse...");

  try {
    let blob;

    if (extOut === "zip") {
      await jsZipReady();
      const buffer = await item.file.arrayBuffer();
      const zip = new JSZip();
      zip.file(item.file.name, buffer);
      blob = await zip.generateAsync({ type: "blob" });
    } else if (["jpg", "jpeg", "png", "webp", "bmp", "gif"].includes(extIn) && ["jpg", "png", "webp", "pdf"].includes(extOut)) {
      await librariesReady;
      blob = await convertImage(item.file, extOut);
    } else if (category === "image" && extOut === "txt") {
      updateProgress(index, 30, "Extraction du texte (OCR)...");
      await ocrLibraryReady();
      const result = await Tesseract.recognize(item.file, "fra+eng", {
        logger: (m) => {
          if (m.status === "recognizing text") updateProgress(index, 30 + m.progress * 60, "Extraction...");
        }
      });
      blob = new Blob([result.data.text.trim()], { type: "text/plain;charset=utf-8" });
    } else if (extIn === "txt" && extOut === "pdf") {
      await librariesReady;
      blob = await convertTxtToPdf(item.file);
    } else if (extIn === "txt" && extOut === "docx") {
      blob = await docxFromParagraphs(paragraphsFromPlainText(await item.file.text()));
    } else if (extIn === "txt" && extOut === "html") {
      const text = await item.file.text();
      blob = new Blob(
        [`<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"></head><body><pre>${escapeHtml(text)}</pre></body></html>`],
        { type: "text/html;charset=utf-8" }
      );
    } else if (extIn === "csv" && extOut === "xlsx") {
      await librariesReady;
      blob = await convertCsvToXlsx(item.file);
    } else if (extIn === "xlsx" && extOut === "csv") {
      await librariesReady;
      blob = await convertXlsxToCsv(item.file);
    } else if (extIn === "pdf" && extOut === "txt") {
      await pdfLibraryReady();
      blob = await pdfToTextBlob(item.file);
    } else if (extIn === "pdf" && ["png", "jpg"].includes(extOut)) {
      await pdfLibraryReady();
      await librariesReady;
      const result = await pdfToImageResult(item.file, extOut);
      blob = result.blob;
      extOut = result.extension;
    } else if (extIn === "pdf" && extOut === "docx") {
      await pdfLibraryReady();
      const text = await pdfExtractText(item.file);
      blob = await docxFromParagraphs(paragraphsFromPlainText(text));
    } else if (extIn === "docx" && extOut === "txt") {
      await mammothReady();
      const buffer = await item.file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer: buffer });
      blob = new Blob([result.value || ""], { type: "text/plain;charset=utf-8" });
    } else if (extIn === "docx" && extOut === "pdf") {
      await mammothReady();
      await librariesReady;
      const buffer = await item.file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer: buffer });
      blob = await convertTextStringToPdf(result.value || "");
    } else if (["md", "html", "htm"].includes(extIn) && extOut === "txt") {
      const raw = await item.file.text();
      const text = extIn === "md" ? raw : stripHtmlTags(raw);
      blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    } else if (["md", "html", "htm"].includes(extIn) && extOut === "pdf") {
      await librariesReady;
      const raw = await item.file.text();
      const text = extIn === "md" ? raw : stripHtmlTags(raw);
      blob = await convertTextStringToPdf(text);
    } else if (extIn === "md" && extOut === "html") {
      const raw = await item.file.text();
      blob = new Blob(
        [`<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"></head><body><pre>${escapeHtml(raw)}</pre></body></html>`],
        { type: "text/html;charset=utf-8" }
      );
    } else {
      throw new Error("Conversion non prise en charge");
    }

    if (!blob) throw new Error("Conversion impossible");

    const newName = `${baseName}.${extOut}`;
    item.convertedBlob = blob;
    item.convertedName = newName;

    updateProgress(index, 100, "Prêt");
    addHistoryEntry(item);
    injectDownloadButton(index);
  } catch (err) {
    console.error(err);
    updateProgress(index, 100, "Échec : " + (err && err.message ? err.message : "non pris en charge"));
  }
}

// --- Nouvelles fonctions de conversion réelle ajoutées pour corriger les bugs ---

const mammothReady = () => loadScript("https://cdn.jsdelivr.net/npm/[email protected]/mammoth.browser.min.js");

async function pdfExtractText(file) {
  const buffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
  let text = "";
  for (let p = 1; p <= pdf.numPages; p++) {
    const page = await pdf.getPage(p);
    const content = await page.getTextContent();
    text += content.items.map((i) => i.str).join(" ") + "\n\n";
  }
  return text;
}

async function pdfToTextBlob(file) {
  const text = await pdfExtractText(file);
  return new Blob([text], { type: "text/plain;charset=utf-8" });
}

// Une seule page -> image directe. Plusieurs pages -> ZIP d'images
// (honnête : on ne peut pas empiler plusieurs pages dans un seul .png/.jpg).
async function pdfToImageResult(file, extOut) {
  const buffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
  const mime = extOut === "png" ? "image/png" : "image/jpeg";

  if (pdf.numPages === 1) {
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 2 });
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
    const blob = await new Promise((resolve, reject) => {
      canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Conversion impossible"))), mime, 0.92);
    });
    return { blob, extension: extOut };
  }

  await jsZipReady();
  const zip = new JSZip();
  for (let p = 1; p <= pdf.numPages; p++) {
    const page = await pdf.getPage(p);
    const viewport = page.getViewport({ scale: 2 });
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
    const dataUrl = canvas.toDataURL(mime, 0.92);
    zip.file(`page-${p}.${extOut}`, dataUrl.split(",")[1], { base64: true });
  }
  const blob = await zip.generateAsync({ type: "blob" });
  return { blob, extension: "zip" };
}

async function convertTextStringToPdf(text) {
  await librariesReady;
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();
  const lines = pdf.splitTextToSize(text || "", 180);
  pdf.text(lines, 15, 15);
  return pdf.output("blob");
}

function stripHtmlTags(html) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}

function injectDownloadButton(index) {
  const area = document.getElementById(`action-area-${index}`);
  const item = filesData[index];
  if (!area || !item.convertedBlob || !item.convertedName) return;

  const url = URL.createObjectURL(item.convertedBlob);
  area.innerHTML = `
    <a href="${url}" download="${escapeHtml(item.convertedName)}" class="downloadLink">
      Télécharger ce fichier
    </a>
  `;
}

async function downloadConvertedFiles() {
  const convertedFiles = filesData.filter((item) => item.convertedBlob && item.convertedName);

  if (convertedFiles.length === 0) {
    alert("Aucun fichier converti à télécharger.");
    return;
  }

  if (convertedFiles.length === 1) {
    downloadBlob(convertedFiles[0].convertedBlob, convertedFiles[0].convertedName);
    return;
  }

  await downloadAllAsZip(convertedFiles);
}

async function downloadAllAsZip(convertedFiles) {
  if (typeof JSZip === "undefined") {
    alert("Le module ZIP n'est pas encore chargé. Réessayez dans un instant.");
    return;
  }

  const zip = new JSZip();
  convertedFiles.forEach((item) => zip.file(item.convertedName, item.convertedBlob));

  convertAllBtn.disabled = true;
  convertAllBtn.textContent = "Création du fichier...";

  const content = await zip.generateAsync({ type: "blob" });
  downloadBlob(content, "converto-fichiers.zip");

  convertAllBtn.disabled = false;
  updateConvertButtons();
}

ocrInput.addEventListener("change", () => {
  const file = ocrInput.files[0];
  ocrFile = file || null;
  ocrOutput.value = "";
  copyOcrBtn.disabled = true;
  downloadOcrBtn.disabled = true;

  if (!file) {
    ocrPreview.classList.add("hidden");
    ocrPlaceholder.classList.remove("hidden");
    ocrButton.disabled = true;
    return;
  }

  ocrPreview.src = URL.createObjectURL(file);
  ocrPreview.classList.remove("hidden");
  ocrPlaceholder.classList.add("hidden");
  ocrButton.disabled = false;
});

ocrButton.addEventListener("click", async () => {
  if (!ocrFile) return;

  ocrButton.disabled = true;
  ocrProgressWrap.classList.remove("hidden");
  setOcrProgress(5, "Chargement...");

  try {
    await ocrLibraryReady();
    setOcrProgress(15, "Lecture...");

    const result = await Tesseract.recognize(ocrFile, "fra+eng", {
      logger: (message) => {
        if (message.status === "recognizing text") {
          setOcrProgress(Math.max(20, message.progress * 100), "Extraction...");
        }
      }
    });

    ocrOutput.value = result.data.text.trim();
    setOcrProgress(100, "Terminé");
    copyOcrBtn.disabled = ocrOutput.value.length === 0;
    downloadOcrBtn.disabled = ocrOutput.value.length === 0;
  } catch (error) {
    console.error(error);
    setOcrProgress(100, "Erreur");
    alert("Impossible d'extraire le texte de cette image.");
  } finally {
    ocrButton.disabled = false;
  }
});

copyOcrBtn.addEventListener("click", async () => {
  ocrOutput.select();
  try {
    await navigator.clipboard.writeText(ocrOutput.value);
    copyOcrBtn.textContent = "Copié";
    setTimeout(() => copyOcrBtn.textContent = "Copier", 1200);
  } catch (error) {
    document.execCommand("copy");
  }
});

downloadOcrBtn.addEventListener("click", async () => {
  const text = ocrOutput.value;
  if (!text) return;

  const format = ocrFormatSelect.value;

  if (format === "txt") {
    downloadBlob(new Blob([text], { type: "text/plain;charset=utf-8" }), "texte-extrait.txt");
    return;
  }

  if (format === "html") {
    const html = `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><title>Texte extrait</title></head><body><pre style="font-family: Arial, sans-serif; white-space: pre-wrap;">${escapeHtml(text)}</pre></body></html>`;
    downloadBlob(new Blob([html], { type: "text/html;charset=utf-8" }), "texte-extrait.html");
    return;
  }

  if (format === "pdf") {
    downloadOcrBtn.disabled = true;
    downloadOcrBtn.textContent = "Génération...";
    try {
      await librariesReady;
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF();
      const lines = pdf.splitTextToSize(text, 180);
      pdf.text(lines, 15, 15);
      downloadBlob(pdf.output("blob"), "texte-extrait.pdf");
    } catch (error) {
      console.error(error);
      alert("Impossible de générer le PDF. Vérifiez votre connexion internet.");
    } finally {
      downloadOcrBtn.disabled = false;
      downloadOcrBtn.textContent = "Télécharger";
    }
  }
});

function setOcrProgress(percent, label) {
  const value = Math.min(100, Math.floor(percent));
  ocrProgressFill.style.width = `${value}%`;
  ocrProgressText.textContent = `${value}%`;
  ocrStatus.textContent = label;
}

chooseCompressBtn.addEventListener("click", () => compressInput.click());
compressInput.addEventListener("change", () => {
  addCompressFiles(compressInput.files);
  compressInput.value = "";
});

setupDropZone(compressDropZone, (fileList) => addCompressFiles(fileList));

qualityRange.addEventListener("input", () => {
  qualityValue.textContent = `${qualityRange.value}%`;
  resetCompressedResults();
});

maxWidthSelect.addEventListener("change", resetCompressedResults);
compressBtn.addEventListener("click", handleCompressAction);

function addCompressFiles(fileListObj) {
  compressData = [
    ...compressData,
    ...Array.from(fileListObj).map((file) => ({
      file,
      compressedBlob: null,
      compressedName: "",
      status: ""
    }))
  ];

  compressReady = false;
  renderCompress();
}

function resetCompressedResults() {
  compressReady = false;
  compressData = compressData.map((item) => ({
    ...item,
    compressedBlob: null,
    compressedName: "",
    status: ""
  }));
  renderCompress();
}

function renderCompress() {
  compressCount.textContent = compressData.length;
  compressSize.textContent = formatSize(compressData.reduce((sum, item) => sum + item.file.size, 0));
  compressSettings.classList.toggle("hidden", compressData.length === 0);
  compressBtn.classList.toggle("hidden", compressData.length === 0);
  compressBtn.textContent = compressReady ? "Télécharger les fichiers compressés" : "Compresser les fichiers";
  compressBtn.style.backgroundColor = compressReady ? "#16A34A" : "";

  compressList.innerHTML = "";

  compressData.forEach((item, index) => {
    const extension = getExtension(item.file.name);
    const category = getCategory(extension);
    const color = CATEGORY_COLORS[category];
    const icon = CATEGORY_ICONS[category];
    const after = item.compressedBlob ? ` -> ${formatSize(item.compressedBlob.size)} (${savedPercent(item.file.size, item.compressedBlob.size)})` : "";
    const div = document.createElement("div");
    div.className = "file";
    div.style.setProperty("--cat-color", color);
    div.innerHTML = `
      <div class="fileTitle">${icon} - ${escapeHtml(item.file.name)}</div>
      <div class="fileInfos"><span class="badge">${extension.toUpperCase() || "FICHIER"}</span>${formatSize(item.file.size)}${after}</div>
      <div class="statusText">${item.status}</div>
      <br>
      <button type="button" class="remove" data-compress-index="${index}">Supprimer</button>
    `;
    compressList.appendChild(div);
  });
}

compressList.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove")) {
    const index = Number(event.target.dataset.compressIndex);
    compressData.splice(index, 1);
    compressReady = false;
    renderCompress();
  }
});

async function handleCompressAction() {
  if (compressReady) {
    await downloadCompressedFiles();
    return;
  }

  compressBtn.disabled = true;
  compressBtn.textContent = "Compression en cours...";

  const quality = Number(qualityRange.value) / 100;
  const maxWidth = Number(maxWidthSelect.value);

  for (const item of compressData) {
    item.status = "Compression...";
    renderCompress();

    const extension = getExtension(item.file.name);
    const category = getCategory(extension);

    try {
      let result;
      if (category === "image") {
        result = await compressImage(item.file, quality, maxWidth);
        item.status = result.blob.size < item.file.size ? "Image réduite" : "Image optimisée";
      } else if (extension === "pdf") {
        await pdfLibraryReady();
        await librariesReady;
        result = await compressPdf(item.file, quality);
        item.status = result.blob.size < item.file.size ? "PDF réduit" : "PDF optimisé";
      } else {
        await jsZipReady();
        result = await compressOtherFile(item.file);
        item.status = "Archivé en ZIP";
      }

      item.compressedBlob = result.blob;
      item.compressedName = result.name;
    } catch (error) {
      console.error(error);
      item.status = "Échec : " + (error && error.message ? error.message : "erreur inconnue");
    }
    renderCompress();
  }

  compressReady = compressData.some((item) => item.compressedBlob);
  compressBtn.disabled = false;
  renderCompress();
}

async function downloadCompressedFiles() {
  const readyFiles = compressData.filter((item) => item.compressedBlob && item.compressedName);
  if (readyFiles.length === 0) {
    alert("Aucun fichier compressé à télécharger.");
    return;
  }

  if (readyFiles.length === 1) {
    downloadBlob(readyFiles[0].compressedBlob, readyFiles[0].compressedName);
    return;
  }

  await downloadCompressedAsZip(readyFiles);
}

async function downloadCompressedAsZip(readyFiles) {
  try {
    await jsZipReady();
  } catch (error) {
    console.error(error);
    alert("Le module ZIP n'est pas disponible. Vérifiez votre connexion puis réessayez.");
    return;
  }

  compressBtn.disabled = true;
  compressBtn.textContent = "Création du ZIP...";

  try {
    const zip = new JSZip();
    readyFiles.forEach((item) => {
      zip.file(item.compressedName, item.compressedBlob);
    });

    const blob = await zip.generateAsync({
      type: "blob",
      compression: "DEFLATE",
      compressionOptions: { level: 6 }
    });

    downloadBlob(blob, "converto-fichiers-compresses.zip");
  } catch (error) {
    console.error(error);
    alert("Impossible de créer le fichier ZIP.");
  } finally {
    compressBtn.disabled = false;
    renderCompress();
  }
}

function compressImage(file, quality, maxWidth) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const image = new Image();

      image.onload = () => {
        const scale = maxWidth > 0 && image.width > maxWidth ? maxWidth / image.width : 1;
        const width = Math.round(image.width * scale);
        const height = Math.round(image.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, width, height);

        const outputType = file.type === "image/png" ? "image/webp" : "image/jpeg";
        const extension = outputType === "image/webp" ? "webp" : "jpg";
        const name = `${removeExtension(file.name)}-reduit.${extension}`;

        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error("Compression impossible"));
            return;
          }
          resolve({ blob, name });
        }, outputType, quality);
      };

      image.onerror = () => reject(new Error("Image illisible"));
      image.src = reader.result;
    };

    reader.onerror = () => reject(new Error("Lecture impossible"));
    reader.readAsDataURL(file);
  });
}

// PDF : chaque page est ré-encodée en JPEG compressé puis réassemblée en PDF.
// Gain de taille réel et important sur les PDF scannés/riches en images.
// Contrepartie honnête : le texte n'est plus sélectionnable après coup.
async function compressPdf(file, quality) {
  await pdfLibraryReady();
  await librariesReady;

  const buffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
  const { jsPDF } = window.jspdf;
  let doc = null;

  for (let p = 1; p <= pdf.numPages; p++) {
    const page = await pdf.getPage(p);
    const basePoints = page.getViewport({ scale: 1 });
    const renderViewport = page.getViewport({ scale: 1.3 });

    const canvas = document.createElement("canvas");
    canvas.width = renderViewport.width;
    canvas.height = renderViewport.height;
    await page.render({ canvasContext: canvas.getContext("2d"), viewport: renderViewport }).promise;

    const imgData = canvas.toDataURL("image/jpeg", quality);
    const pageWidth = basePoints.width;
    const pageHeight = basePoints.height;

    if (!doc) doc = new jsPDF({ unit: "pt", format: [pageWidth, pageHeight] });
    else doc.addPage([pageWidth, pageHeight]);
    doc.addImage(imgData, "JPEG", 0, 0, pageWidth, pageHeight);
  }

  const blob = doc.output("blob");
  return { blob, name: `${removeExtension(file.name)}-compresse.pdf` };
}

// Pour tout autre type de fichier (audio, vidéo, document Office, archive...),
// il n'existe pas de vraie compression fiable en JavaScript pur. La seule
// réduction honnête et réelle possible ici est l'archivage en ZIP.
async function compressOtherFile(file) {
  await librariesReady;
  const buffer = await file.arrayBuffer();
  const zip = new JSZip();
  zip.file(file.name, buffer);
  const blob = await zip.generateAsync({ type: "blob" });
  return { blob, name: `${removeExtension(file.name)}.zip` };
}

function savedPercent(before, after) {
  if (after >= before) return "0% gagné";
  return `${Math.round((1 - after / before) * 100)}% gagné`;
}

function setupDropZone(zone, onFiles) {
  zone.addEventListener("dragover", (e) => {
    e.preventDefault();
    zone.classList.add("drag");
  });

  zone.addEventListener("dragleave", () => {
    zone.classList.remove("drag");
  });

  zone.addEventListener("drop", (e) => {
    e.preventDefault();
    zone.classList.remove("drag");
    onFiles(e.dataTransfer.files);
  });
}

function downloadBlob(blob, filename) {
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function convertImage(file, targetExt) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (e) {
      const img = new Image();

      img.onload = function () {
        if (targetExt === "pdf") {
          const { jsPDF } = window.jspdf;
          const pdf = new jsPDF({
            orientation: img.width > img.height ? "l" : "p",
            unit: "px",
            format: [img.width, img.height]
          });
          const imgFormat = file.type === "image/png" ? "PNG" : file.type === "image/webp" ? "WEBP" : "JPEG";
          pdf.addImage(e.target.result, imgFormat, 0, 0, img.width, img.height);
          resolve(pdf.output("blob"));
          return;
        }

        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        let type = `image/${targetExt}`;
        if (targetExt === "jpg") type = "image/jpeg";

        canvas.toBlob((blob) => {
          blob ? resolve(blob) : reject(new Error("Image impossible à convertir"));
        }, type, 0.9);
      };

      img.onerror = () => reject(new Error("Image illisible"));
      img.src = e.target.result;
    };

    reader.onerror = () => reject(new Error("Lecture impossible"));
    reader.readAsDataURL(file);
  });
}

function convertTxtToPdf(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF();
      const lines = pdf.splitTextToSize(e.target.result, 180);
      pdf.text(lines, 15, 15);
      resolve(pdf.output("blob"));
    };
    reader.readAsText(file);
  });
}

function convertCsvToXlsx(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const workbook = XLSX.read(e.target.result, { type: "string" });
      const out = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      resolve(new Blob([out], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      }));
    };
    reader.readAsText(file);
  });
}

function convertXlsxToCsv(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheetName = workbook.SheetNames[0];
      const csvData = XLSX.utils.sheet_to_csv(workbook.Sheets[firstSheetName]);
      resolve(new Blob([csvData], { type: "text/csv" }));
    };
    reader.readAsArrayBuffer(file);
  });
}

function simulateDelay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function formatSize(bytes) {
  if (bytes === 0) return "0 o";
  const units = ["o", "Ko", "Mo", "Go", "To", "Po"];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / Math.pow(1024, index);
  return `${value.toFixed(value >= 10 || index === 0 ? 0 : 1)} ${units[index]}`;
}

function removeExtension(filename) {
  return filename.includes(".") ? filename.substring(0, filename.lastIndexOf(".")) : filename;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function loadHistory() {
  try {
    const raw = localStorage.getItem("convertoHistory");
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveHistory() {
  try {
    localStorage.setItem("convertoHistory", JSON.stringify(history));
  } catch (e) {}
}

function addHistoryEntry(item) {
  const extension = getExtension(item.file.name);

  history.unshift({
    name: item.file.name,
    from: extension.toUpperCase(),
    to: item.format,
    date: new Date().toLocaleString("fr-FR")
  });

  history = history.slice(0, 50);
  saveHistory();
  renderHistory();
}

function renderHistory() {
  historyList.innerHTML = history
    .map((h) => `<li><span class="hName">${escapeHtml(h.name)} - ${h.from} vers ${h.to}</span><span class="hMeta">${h.date}</span></li>`)
    .join("");
  historyEmpty.classList.toggle("hidden", history.length > 0);
}

clearHistoryBtn.addEventListener("click", () => {
  if (history.length === 0 || !confirm("Vider tout l'historique ?")) return;
  history = [];
  saveHistory();
  renderHistory();
});

function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function rgbToHex(rgb) {
  const match = rgb.match(/\d+/g);
  if (!match) return "1B2430";
  return match.slice(0, 3).map((n) => Number(n).toString(16).padStart(2, "0")).join("").toUpperCase();
}

// Transforme du texte brut (ex: résultat OCR) en paragraphes exploitables
// par les mêmes générateurs RTF/DOCX/ODT que l'éditeur de texte.
function paragraphsFromPlainText(text, opts = {}) {
  const { bold = false, italic = false, underline = false, color = "1B2430", font = "Arial", size = 12 } = opts;
  return text.split("\n").map((line) => [{ text: line, bold, italic, underline, color, font, size }]);
}

// Parcourt le contenu HTML de l'éditeur et le transforme en paragraphes de
// "runs" (texte + mise en forme réelle lue via le style calculé du navigateur).
function extractParagraphs(root) {
  const paragraphs = [];
  let currentRuns = [];

  function pushParagraph() {
    if (currentRuns.length > 0) paragraphs.push(currentRuns);
    currentRuns = [];
  }

  function walk(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      if (text) {
        const style = window.getComputedStyle(node.parentElement);
        const weight = style.fontWeight;
        currentRuns.push({
          text,
          bold: weight === "bold" || parseInt(weight, 10) >= 600,
          italic: style.fontStyle === "italic",
          underline: (style.textDecorationLine || style.textDecoration || "").includes("underline"),
          color: rgbToHex(style.color),
          font: (style.fontFamily || "Arial").split(",")[0].replace(/["']/g, "").trim(),
          size: Math.max(8, Math.round(parseFloat(style.fontSize) || 16)),
        });
      }
      return;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) return;

    if (node.tagName === "BR") {
      pushParagraph();
      return;
    }

    const isBlock = ["DIV", "P", "LI", "H1", "H2", "H3", "H4", "H5", "H6"].includes(node.tagName);
    node.childNodes.forEach(walk);
    if (isBlock) pushParagraph();
  }

  root.childNodes.forEach(walk);
  pushParagraph();

  return paragraphs.length ? paragraphs : [[]];
}

function plainTextFromParagraphs(paragraphs) {
  return paragraphs.map((p) => p.map((r) => r.text).join("")).join("\n");
}

function markdownFromParagraphs(paragraphs) {
  return paragraphs
    .map((p) =>
      p
        .map((r) => {
          let t = r.text;
          if (r.bold && r.italic) t = `***${t}***`;
          else if (r.bold) t = `**${t}**`;
          else if (r.italic) t = `*${t}*`;
          return t;
        })
        .join("")
    )
    .join("\n\n");
}

// Génère un fichier RTF valide (police, taille, couleur, gras/italique/souligné).
function rtfFromParagraphs(paragraphs) {
  const fonts = [];
  const colors = ["000000"];

  const fontIndex = (font) => {
    let idx = fonts.indexOf(font);
    if (idx === -1) {
      fonts.push(font);
      idx = fonts.length - 1;
    }
    return idx;
  };

  const colorIndex = (hex) => {
    let idx = colors.indexOf(hex);
    if (idx === -1) {
      colors.push(hex);
      idx = colors.length - 1;
    }
    return idx;
  };

  paragraphs.forEach((p) => p.forEach((r) => { fontIndex(r.font); colorIndex(r.color); }));

  const fontTable = fonts.map((f, i) => `{\\f${i}\\fnil ${f};}`).join("");
  const colorTable = colors
    .map((hex) => {
      const r = parseInt(hex.substr(0, 2), 16) || 0;
      const g = parseInt(hex.substr(2, 2), 16) || 0;
      const b = parseInt(hex.substr(4, 2), 16) || 0;
      return `\\red${r}\\green${g}\\blue${b};`;
    })
    .join("");

  const escapeRtf = (text) =>
    text.replace(/\\/g, "\\\\").replace(/{/g, "\\{").replace(/}/g, "\\}").replace(/\n/g, "\\line ");

  const body = paragraphs
    .map((p) => {
      const runs = p
        .map((r) => {
          const f = fontIndex(r.font);
          const c = colorIndex(r.color);
          const sizeHalfPoints = Math.round((r.size || 12) * 2);
          let controls = `\\f${f}\\fs${sizeHalfPoints}\\cf${c} `;
          if (r.bold) controls += "\\b ";
          if (r.italic) controls += "\\i ";
          if (r.underline) controls += "\\ul ";
          return `{${controls}${escapeRtf(r.text)}}`;
        })
        .join("");
      return runs + "\\par";
    })
    .join("\n");

  return `{\\rtf1\\ansi\\deff0{\\fonttbl${fontTable}}{\\colortbl;${colorTable}}\n${body}\n}`;
}

// Génère un vrai fichier DOCX (OOXML minimal mais valide) via JSZip.
async function docxFromParagraphs(paragraphs) {
  await librariesReady;
  const zip = new JSZip();

  const contentTypes = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>`;

  const rels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>`;

  const bodyXml = paragraphs
    .map((p) => {
      const runsXml = p
        .map((r) => {
          const props = [
            r.bold ? "<w:b/>" : "",
            r.italic ? "<w:i/>" : "",
            r.underline ? '<w:u w:val="single"/>' : "",
            `<w:color w:val="${r.color}"/>`,
            `<w:rFonts w:ascii="${escapeXml(r.font)}" w:hAnsi="${escapeXml(r.font)}"/>`,
            `<w:sz w:val="${Math.round((r.size || 12) * 2)}"/>`,
          ].join("");
          return `<w:r><w:rPr>${props}</w:rPr><w:t xml:space="preserve">${escapeXml(r.text)}</w:t></w:r>`;
        })
        .join("");
      return `<w:p>${runsXml}</w:p>`;
    })
    .join("");

  const documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>${bodyXml}<w:sectPr/></w:body></w:document>`;

  zip.file("[Content_Types].xml", contentTypes);
  zip.folder("_rels").file(".rels", rels);
  zip.folder("word").file("document.xml", documentXml);

  return zip.generateAsync({ type: "blob" });
}

// Génère un vrai fichier ODT (OpenDocument Text minimal mais valide) via JSZip.
async function odtFromParagraphs(paragraphs) {
  await librariesReady;
  const zip = new JSZip();

  const styleMap = new Map();
  const styles = [];
  const styleKey = (r) => `${r.bold}|${r.italic}|${r.underline}|${r.font}|${r.size}|${r.color}`;

  paragraphs.forEach((p) =>
    p.forEach((r) => {
      const key = styleKey(r);
      if (!styleMap.has(key)) {
        const name = `T${styleMap.size + 1}`;
        styleMap.set(key, name);
        styles.push({ name, ...r });
      }
    })
  );

  const automaticStyles = styles
    .map(
      (s) =>
        `<style:style style:name="${s.name}" style:family="text"><style:text-properties ${
          s.bold ? 'fo:font-weight="bold"' : ""
        } ${s.italic ? 'fo:font-style="italic"' : ""} ${
          s.underline ? 'style:text-underline-style="solid" style:text-underline-type="single"' : ""
        } fo:color="#${s.color}" style:font-name="${escapeXml(s.font)}" fo:font-size="${s.size}pt"/></style:style>`
    )
    .join("");

  const bodyXml = paragraphs
    .map((p) => {
      const spans = p.map((r) => `<text:span text:style-name="${styleMap.get(styleKey(r))}">${escapeXml(r.text)}</text:span>`).join("");
      return `<text:p>${spans}</text:p>`;
    })
    .join("");

  const contentXml = `<?xml version="1.0" encoding="UTF-8"?><office:document-content xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0" xmlns:style="urn:oasis:names:tc:opendocument:xmlns:style:1.0" xmlns:fo="urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0" office:version="1.2"><office:automatic-styles>${automaticStyles}</office:automatic-styles><office:body><office:text>${bodyXml}</office:text></office:body></office:document-content>`;

  const manifest = `<?xml version="1.0" encoding="UTF-8"?><manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2"><manifest:file-entry manifest:full-path="/" manifest:media-type="application/vnd.oasis.opendocument.text"/><manifest:file-entry manifest:full-path="content.xml" manifest:media-type="text/xml"/></manifest:manifest>`;

  zip.file("mimetype", "application/vnd.oasis.opendocument.text", { compression: "STORE" });
  zip.folder("META-INF").file("manifest.xml", manifest);
  zip.file("content.xml", contentXml);

  return zip.generateAsync({ type: "blob" });
}

// PDF haute-fidélité : capture exactement le rendu visuel de l'éditeur
// (police, couleur, gras, alignement...) via html2canvas, puis le découpe
// en pages A4 dans le PDF. Ce que vous voyez à l'écran est ce qui est imprimé.
async function pdfFromEditor() {
  await html2canvasReady();
  await librariesReady;

  const canvas = await html2canvas(editorArea, { backgroundColor: "#ffffff", scale: 2 });
  const { jsPDF } = window.jspdf;

  const marginPt = (Number(marginInput.value) || 0) * 2.834645; // mm -> pt
  const orientation = orientationSelect.value === "l" ? "l" : "p";
  const paper = paperSizeSelect.value || "a4";

  const pdf = new jsPDF({ unit: "pt", format: paper, orientation });
  const pageWidth = pdf.internal.pageSize.getWidth() - marginPt * 2;
  const pageHeight = pdf.internal.pageSize.getHeight() - marginPt * 2;
  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  const imgData = canvas.toDataURL("image/jpeg", 0.92);

  const addHeaderFooter = () => {
    pdf.setFontSize(9);
    pdf.setTextColor(120);
    if (headerInput.value) pdf.text(headerInput.value, marginPt, marginPt / 2 + 4);
    if (footerInput.value) pdf.text(footerInput.value, marginPt, pdf.internal.pageSize.getHeight() - marginPt / 3);
  };

  let heightLeft = imgHeight;
  let position = marginPt;

  pdf.addImage(imgData, "JPEG", marginPt, position, imgWidth, imgHeight);
  addHeaderFooter();
  heightLeft -= pageHeight;

  while (heightLeft > 0) {
    position = marginPt - (imgHeight - heightLeft);
    pdf.addPage();
    pdf.addImage(imgData, "JPEG", marginPt, position, imgWidth, imgHeight);
    addHeaderFooter();
    heightLeft -= pageHeight;
  }

  downloadBlob(pdf.output("blob"), "document.pdf");
}

// Importe le texte d'un PDF dans l'éditeur en reconstituant les lignes et
// paragraphes à partir des positions réelles du texte fournies par PDF.js.
// Cela préserve la structure (sauts de ligne, paragraphes, ordre) bien mieux
// qu'un simple bloc de texte — mais une mise en page complexe (colonnes,
// tableaux, positionnement exact) reste hors de portée en JavaScript pur.
async function importPdfIntoEditor(file) {
  await pdfLibraryReady();
  const buffer = await file.arrayBuffer();
  let pdf;
  try {
    pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
  } catch (error) {
    pdf = await pdfjsLib.getDocument({ data: buffer, disableWorker: true }).promise;
  }
  let html = "";

  for (let p = 1; p <= pdf.numPages; p++) {
    const page = await pdf.getPage(p);
    const content = await page.getTextContent();

    // Regroupe les fragments de texte par ligne selon leur position verticale
    const lines = [];
    let currentLine = null;
    let lastY = null;

    content.items.forEach((item) => {
      const y = item.transform[5];
      if (lastY === null || Math.abs(y - lastY) > 2) {
        currentLine = [];
        lines.push(currentLine);
        lastY = y;
      }
      currentLine.push(item.str);
    });

    // Une ligne vide entre deux lignes de texte = saut de paragraphe
    let blankStreak = 0;
    lines.forEach((line) => {
      const text = line.join(" ").replace(/\s+/g, " ").trim();
      if (text === "") {
        blankStreak++;
        if (blankStreak === 1) html += `<div><br></div>`;
      } else {
        blankStreak = 0;
        html += `<div>${escapeXml(text)}</div>`;
      }
    });

    if (p < pdf.numPages) html += `<div><br></div><div>— Page ${p + 1} —</div>`;
  }

  editorArea.innerHTML = html || "<div><br></div>";
  updateEditorStatus();
}

editorImportPdfBtn.addEventListener("click", () => editorPdfInput.click());

editorPdfInput.addEventListener("change", async () => {
  const file = editorPdfInput.files[0];
  editorPdfInput.value = "";
  if (!file) return;

  editorImportPdfBtn.disabled = true;
  editorImportStatus.textContent = "Extraction du texte en cours...";

  try {
    await importPdfIntoEditor(file);
    editorImportStatus.textContent = `Texte importé depuis "${file.name}" — vous pouvez le modifier ci-dessous.`;
  } catch (err) {
    console.error(err);
    editorImportStatus.textContent = "";
    alert("Impossible de lire ce PDF.");
  } finally {
    editorImportPdfBtn.disabled = false;
  }
});

// --- Onglets du ruban (façon Google Docs : un seul groupe visible à la fois) ---
const ribbonTabs = document.querySelectorAll(".ribbonTabBtn[data-group]");
const ribbonGroups = document.querySelectorAll(".ribbonGroup[data-group]");

ribbonTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    ribbonTabs.forEach((t) => t.classList.remove("active"));
    ribbonGroups.forEach((g) => g.classList.remove("active"));
    tab.classList.add("active");
    document.querySelector(`.ribbonGroup[data-group="${tab.dataset.group}"]`).classList.add("active");
  });
});

// --- Bouton "Mise en page" : affiche/masque le panneau de réglages ---
document.getElementById("btnPageSetup").addEventListener("click", () => {
  document.getElementById("pageSetupBox").classList.toggle("hidden");
});

// --- Plein écran natif : la barre d'outils reste fixe, le texte défile ---
const editorWorkspace = document.getElementById("editorWorkspace");
const btnFullscreenEl = document.getElementById("btnFullscreen");

btnFullscreenEl.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    (editorWorkspace.requestFullscreen || editorWorkspace.webkitRequestFullscreen)?.call(editorWorkspace);
  } else {
    (document.exitFullscreen || document.webkitExitFullscreen)?.call(document);
  }
});

document.addEventListener("fullscreenchange", () => {
  btnFullscreenEl.textContent = document.fullscreenElement ? "✕ Quitter le plein écran" : "⛶ Plein écran";
});

// --- Page A4/Letter réelle avec repères de saut de page ---
// Recalcule la largeur, la hauteur de page et les marges en pixels réels
// (96 DPI), et dessine une ligne de repère tous les X px = une hauteur de
// page. Se met à jour dès que le format, l'orientation ou les marges
// changent dans "Mise en page".
function applyPageStyle() {
  const mmToPx = (mm) => Math.round((mm * 96) / 25.4);
  const paperMm = paperSizeSelect.value === "letter" ? { w: 215.9, h: 279.4 } : { w: 210, h: 297 };
  const landscape = orientationSelect.value === "l";
  const widthMm = landscape ? paperMm.h : paperMm.w;
  const heightMm = landscape ? paperMm.w : paperMm.h;
  const marginMm = Number(marginInput.value) || 20;

  const widthPx = mmToPx(widthMm);
  const heightPx = mmToPx(heightMm);
  const marginPx = mmToPx(marginMm);
  const pageGapPx = 0;

  pageMetrics = { widthPx, heightPx, marginPx, pageGapPx };
  editorArea.style.width = widthPx + "px";
  editorArea.style.padding = marginPx + "px";
  editorArea.style.backgroundImage = `repeating-linear-gradient(to bottom, #ffffff 0 ${heightPx - 3}px, #d6dce7 ${heightPx - 3}px ${heightPx}px)`;
  editorArea.style.backgroundSize = `100% ${heightPx}px`;
  editorArea.style.filter = "drop-shadow(0 6px 20px rgba(20, 30, 60, .15))";
  editorArea.style.setProperty("--page-width-print", `${widthMm}mm`);
  editorArea.style.setProperty("--page-height-print", `${heightMm}mm`);
  editorArea.style.setProperty("--page-margin-print", `${marginMm}mm`);
  updateEditorPages();
}

function updateEditorPages() {
  const { heightPx, pageGapPx } = pageMetrics;
  const currentMinHeight = editorArea.style.minHeight;
  editorArea.style.minHeight = heightPx + "px";
  const contentHeight = Math.max(editorArea.scrollHeight, heightPx);
  const pageCount = Math.max(1, Math.ceil(contentHeight / heightPx));
  const visualHeight = pageCount * heightPx + (pageCount - 1) * pageGapPx;
  editorArea.style.minHeight = visualHeight + "px";
  editorArea.dataset.pages = String(pageCount);
}

marginInput.addEventListener("input", applyPageStyle);
paperSizeSelect.addEventListener("change", applyPageStyle);
orientationSelect.addEventListener("change", applyPageStyle);

// --- Compteur de mots / caractères (barre d'état) ---
function updateEditorStatus() {
  updateEditorPages();
  const text = editorArea.innerText || "";
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const pages = editorArea.dataset.pages || "1";
  editorStatusBar.textContent = `${words} mot(s) · ${text.length} caractère(s) · ${pages} page(s)`;
}
editorArea.addEventListener("input", updateEditorStatus);

// --- Fichier : Nouveau / Ouvrir / Imprimer / Documents récents ---
btnNewDoc.addEventListener("click", () => {
  if (editorArea.innerText.trim() && !confirm("Effacer le document actuel ?")) return;
  editorArea.innerHTML = "<div><br></div>";
  updateEditorStatus();
});

btnOpenDoc.addEventListener("click", () => openDocInput.click());

openDocInput.addEventListener("change", async () => {
  const file = openDocInput.files[0];
  openDocInput.value = "";
  if (!file) return;

  const ext = getExtension(file.name);
  const category = getCategory(ext);

  editorImportStatus.textContent = "Ouverture en cours...";

  try {
    if (ext === "docx") {
      await mammothReady();
      const buffer = await file.arrayBuffer();
      const result = await mammoth.convertToHtml({ arrayBuffer: buffer });
      editorArea.innerHTML = result.value || "<div><br></div>";
    } else if (ext === "pdf") {
      await importPdfIntoEditor(file);
    } else if (ext === "html" || ext === "htm") {
      editorArea.innerHTML = await file.text();
    } else if (ext === "rtf") {
      const raw = await file.text();
      editorArea.innerHTML = rtfToHtml(raw);
    } else if (ext === "odt") {
      editorArea.innerHTML = await odtToHtml(file);
    } else if (ext === "csv") {
      const raw = await file.text();
      editorArea.innerHTML = csvToHtmlTable(raw);
    } else if (ext === "md") {
      const raw = await file.text();
      editorArea.innerHTML = raw.split("\n").map((l) => `<div>${escapeXml(l)}</div>`).join("");
    } else if (category === "image" || category === "audio" || category === "video" || category === "archive") {
      editorImportStatus.textContent = "";
      alert("Ce type de fichier ne peut pas être chargé comme texte (image, audio, vidéo ou archive). Utilise plutôt l'onglet Convertisseur ou Extraire texte.");
      return;
    } else {
      const text = await file.text();
      editorArea.innerHTML = text.split("\n").map((l) => `<div>${escapeXml(l)}</div>`).join("");
    }

    addRecentDoc(file.name);
    updateEditorStatus();
    editorImportStatus.textContent = `"${file.name}" ouvert dans l'éditeur.`;
  } catch (err) {
    console.error(err);
    editorImportStatus.textContent = "";
    alert("Impossible d'ouvrir ce fichier.");
  }
});

// RTF : extraction simple du texte (retire les commandes RTF, conserve les
// sauts de paragraphe). Ne restitue pas la mise en forme d'origine.
function rtfToHtml(raw) {
  let text = raw
    .replace(/\\par[d]?/g, "\n")
    .replace(/\\[a-zA-Z]+-?\d*\s?/g, "")
    .replace(/[{}]/g, "")
    .replace(/\\'[0-9a-fA-F]{2}/g, "");
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter((l, i, arr) => l !== "" || (i > 0 && arr[i - 1] !== ""))
    .map((l) => `<div>${escapeXml(l)}</div>`)
    .join("");
}

// ODT : c'est un ZIP contenant content.xml — on l'extrait avec JSZip puis on
// récupère le texte des paragraphes (<text:p>).
async function odtToHtml(file) {
  await jsZipReady();
  const zip = await JSZip.loadAsync(file);
  const contentXml = await zip.file("content.xml").async("string");
  const div = document.createElement("div");
  div.innerHTML = contentXml;
  const paragraphs = Array.from(div.querySelectorAll("text\\:p, p"));
  if (paragraphs.length === 0) {
    return `<div>${escapeXml(div.textContent || "")}</div>`;
  }
  return paragraphs.map((p) => `<div>${escapeXml(p.textContent || "")}</div>`).join("");
}

// CSV : affiché comme un tableau HTML pour rester lisible et modifiable.
function csvToHtmlTable(raw) {
  const rows = raw.split(/\r?\n/).filter((r) => r.length > 0);
  const html = rows
    .map((row) => {
      const cells = row.split(",").map((c) => `<td>${escapeXml(c.trim())}</td>`).join("");
      return `<tr>${cells}</tr>`;
    })
    .join("");
  return `<table>${html}</table><div><br></div>`;
}

btnPrint.addEventListener("click", () => {
  applyPageStyle();
  printEditorOnly();
});

function printEditorOnly() {
  const plainText = editorArea.innerText.trim();
  if (!plainText || plainText === "Écrivez votre texte ici...") {
    alert("La feuille est vide — écris ou importe du contenu avant d'imprimer.");
    return;
  }

  const paperMm = paperSizeSelect.value === "letter" ? { w: 215.9, h: 279.4, name: "letter" } : { w: 210, h: 297, name: "A4" };
  const landscape = orientationSelect.value === "l";
  const widthMm = landscape ? paperMm.h : paperMm.w;
  const heightMm = landscape ? paperMm.w : paperMm.h;
  const marginMm = Number(marginInput.value) || 20;
  const pageSize = `${paperMm.name} ${landscape ? "landscape" : "portrait"}`;
  const cleanedHtml = editorArea.innerHTML
    .replaceAll("selectedImage", "")
    .replaceAll("enhancedImage", "");

  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";
  document.body.appendChild(iframe);

  const doc = iframe.contentDocument || iframe.contentWindow.document;
  doc.open();
  doc.write(`<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>Impression</title>
<style>
  @page { size: ${pageSize}; margin: 0; }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; background: white; color: #000; font-family: Arial, "Times New Roman", sans-serif; }
  .printSheet {
    width: ${widthMm}mm;
    min-height: ${heightMm}mm;
    padding: ${marginMm}mm;
    background: white;
    color: #000;
    line-height: 1.6;
    overflow: visible;
    page-break-after: auto;
    break-after: auto;
  }
  .printSheet, .printSheet * {
    color: #000 !important;
    text-shadow: none !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  img { max-width: 100%; height: auto; outline: none !important; }
  table { border-collapse: collapse; }
  td { border: 1px solid #d8d8d8; padding: 6px 10px; }
  a { color: #000; }
</style>
</head>
<body>
  <main class="printSheet">${cleanedHtml || "<div><br></div>"}</main>
</body>
</html>`);
  doc.close();

  const cleanup = () => {
    if (iframe.parentNode) iframe.remove();
  };

  let printStarted = false;
  const startPrint = () => {
    if (printStarted) return;
    printStarted = true;
    try {
      iframe.contentWindow.focus();
      if (iframe.contentWindow.matchMedia) {
        iframe.contentWindow.addEventListener("afterprint", cleanup, { once: true });
      }
      iframe.contentWindow.print();
    } catch (err) {
      console.error("Erreur pendant l'impression :", err);
      alert("L'impression a échoué. Vérifie que ton navigateur autorise les fenêtres d'impression.");
    } finally {
      // filet de sécurité si l'évènement afterprint ne se déclenche pas
      setTimeout(cleanup, 2000);
    }
  };

  iframe.onload = startPrint;
  setTimeout(startPrint, 300);
}

// Note honnête : cette liste garde seulement les NOMS des fichiers récemment
// ouverts (pour référence) — elle ne peut pas ré-ouvrir leur contenu, qui
// n'est pas conservé après fermeture du navigateur.
function addRecentDoc(name) {
  let recents = [];
  try {
    recents = JSON.parse(localStorage.getItem("convertoRecentDocs") || "[]");
  } catch (e) {
    recents = [];
  }
  recents = [name, ...recents.filter((n) => n !== name)].slice(0, 8);
  try {
    localStorage.setItem("convertoRecentDocs", JSON.stringify(recents));
  } catch (e) {
    // stockage indisponible, tant pis pour la persistance
  }
  renderRecentDocs(recents);
}

function renderRecentDocs(recents) {
  recentDocsSelect.innerHTML =
    '<option value="">Documents récents</option>' + recents.map((n) => `<option>${escapeXml(n)}</option>`).join("");
}

try {
  renderRecentDocs(JSON.parse(localStorage.getItem("convertoRecentDocs") || "[]"));
} catch (e) {
  renderRecentDocs([]);
}

// --- Édition : Supprimer / Tout sélectionner / Date-heure / Rechercher-remplacer ---
btnDeleteSel.addEventListener("click", () => {
  editorArea.focus();
  document.execCommand("delete");
});

btnSelectAll.addEventListener("click", () => {
  editorArea.focus();
  const range = document.createRange();
  range.selectNodeContents(editorArea);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
});

btnInsertDate.addEventListener("click", () => {
  editorArea.focus();
  document.execCommand("insertText", false, new Date().toLocaleString("fr-FR"));
});

btnFindReplace.addEventListener("click", () => {
  findReplaceBox.classList.toggle("hidden");
  if (!findReplaceBox.classList.contains("hidden")) findInput.focus();
});

closeFindBtn.addEventListener("click", () => findReplaceBox.classList.add("hidden"));

findNextBtn.addEventListener("click", () => {
  const term = findInput.value;
  if (!term) return;
  const found = window.find ? window.find(term) : false;
  if (!found) alert("Aucune autre occurrence trouvée (ou navigateur non compatible avec la recherche native).");
});

replaceAllBtn.addEventListener("click", () => {
  const term = findInput.value;
  if (!term) return;
  const replacement = replaceInput.value;
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(escaped, "g");
  const walker = document.createTreeWalker(editorArea, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    regex.lastIndex = 0;
    if (regex.test(node.textContent)) {
      regex.lastIndex = 0;
      node.textContent = node.textContent.replace(regex, replacement);
    }
  }
  updateEditorStatus();
});

// --- Police : surlignage, indice/exposant (déjà gérés via data-cmd) ---
highlightColorInput.addEventListener("input", () => {
  editorArea.focus();
  if (!document.execCommand("hiliteColor", false, highlightColorInput.value)) {
    document.execCommand("backColor", false, highlightColorInput.value);
  }
});

// --- Paragraphe : interligne (non natif à execCommand, appliqué au bloc courant) ---
lineHeightSelect.addEventListener("change", () => {
  if (!lineHeightSelect.value) return;
  const sel = window.getSelection();
  if (!sel.rangeCount) return;
  let node = sel.getRangeAt(0).commonAncestorContainer;
  if (node.nodeType === Node.TEXT_NODE) node = node.parentElement;
  while (node && node !== editorArea && !["DIV", "P", "LI"].includes(node.tagName)) {
    node = node.parentElement;
  }
  if (node && node !== editorArea) node.style.lineHeight = lineHeightSelect.value;
});

// Tabulation : insère une tabulation visuelle au lieu de changer le focus
editorArea.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    e.preventDefault();
    document.execCommand("insertHTML", false, "&emsp;");
  }
});

// --- Insertion : image / lien / tableau ---
btnInsertImage.addEventListener("click", () => insertImageInput.click());

insertImageInput.addEventListener("change", () => {
  const file = insertImageInput.files[0];
  insertImageInput.value = "";
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    editorArea.focus();
    const imgId = `img-${Date.now()}`;
    document.execCommand(
      "insertHTML",
      false,
      `<img id="${imgId}" src="${reader.result}" class="editorImage" style="max-width:100%; height:auto;">`
    );
    const inserted = document.getElementById(imgId);
    if (inserted) selectEditorImage(inserted);
  };
  reader.readAsDataURL(file);
});

editorArea.addEventListener("click", (event) => {
  if (event.target.tagName === "IMG") {
    selectEditorImage(event.target);
  } else {
    clearSelectedEditorImage();
  }
});

btnImageLeft.addEventListener("click", () => alignSelectedImage("left"));
btnImageCenter.addEventListener("click", () => alignSelectedImage("center"));
btnImageRight.addEventListener("click", () => alignSelectedImage("right"));
btnImproveImage.addEventListener("click", improveSelectedImage);

function selectEditorImage(img) {
  clearSelectedEditorImage();
  selectedEditorImage = img;
  selectedEditorImage.classList.add("selectedImage");
}

function clearSelectedEditorImage() {
  if (selectedEditorImage) selectedEditorImage.classList.remove("selectedImage");
  selectedEditorImage = null;
}

function getSelectedImageOrWarn() {
  if (!selectedEditorImage || !editorArea.contains(selectedEditorImage)) {
    alert("Clique d'abord sur une image dans la feuille.");
    return null;
  }
  return selectedEditorImage;
}

function alignSelectedImage(position) {
  const img = getSelectedImageOrWarn();
  if (!img) return;

  img.style.display = "block";
  img.style.float = "none";

  if (position === "left") {
    img.style.marginLeft = "0";
    img.style.marginRight = "auto";
  } else if (position === "center") {
    img.style.marginLeft = "auto";
    img.style.marginRight = "auto";
  } else {
    img.style.marginLeft = "auto";
    img.style.marginRight = "0";
  }
}

function improveSelectedImage() {
  const img = getSelectedImageOrWarn();
  if (!img) return;

  const source = new Image();
  source.onload = () => {
    const scale = 2;
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, source.naturalWidth * scale);
    canvas.height = Math.max(1, source.naturalHeight * scale);
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.filter = "contrast(1.08) saturate(1.08) brightness(1.02)";
    ctx.drawImage(source, 0, 0, canvas.width, canvas.height);

    img.src = canvas.toDataURL("image/png");
    img.classList.add("enhancedImage");
    img.style.imageRendering = "auto";
    selectEditorImage(img);
  };
  source.onerror = () => alert("Impossible d'améliorer cette image.");
  source.src = img.src;
}

btnInsertLink.addEventListener("click", () => {
  const url = prompt("Adresse du lien (https://...) :");
  if (!url) return;
  editorArea.focus();
  document.execCommand("createLink", false, url);
});

btnInsertTable.addEventListener("click", () => {
  const rows = parseInt(prompt("Nombre de lignes :", "2"), 10) || 2;
  const cols = parseInt(prompt("Nombre de colonnes :", "2"), 10) || 2;
  let table = "<table>";
  for (let r = 0; r < rows; r++) {
    table += "<tr>";
    for (let c = 0; c < cols; c++) table += "<td>&nbsp;</td>";
    table += "</tr>";
  }
  table += "</table><div><br></div>";
  editorArea.focus();
  document.execCommand("insertHTML", false, table);
});

// --- Affichage : zoom ---
let editorZoom = 100;
function setZoom(value) {
  editorZoom = Math.min(200, Math.max(50, value));
  editorArea.style.zoom = editorZoom + "%";
  zoomLabel.textContent = editorZoom + "%";
}
zoomInBtn.addEventListener("click", () => setZoom(editorZoom + 10));
zoomOutBtn.addEventListener("click", () => setZoom(editorZoom - 10));
zoomResetBtn.addEventListener("click", () => setZoom(100));

// --- Barre d'outils de l'éditeur (façon WordPad) ---
editorToolbar.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-cmd]");
  if (!btn) return;
  editorArea.focus();
  document.execCommand(btn.dataset.cmd, false, null);
});

fontNameSelect.addEventListener("change", () => {
  editorArea.focus();
  document.execCommand("fontName", false, fontNameSelect.value);
});

fontSizeSelect.addEventListener("change", () => {
  editorArea.focus();
  document.execCommand("fontSize", false, fontSizeSelect.value);
});

fontColorInput.addEventListener("input", () => {
  editorArea.focus();
  document.execCommand("foreColor", false, fontColorInput.value);
});

editorArea.addEventListener(
  "focus",
  () => {
    if (editorArea.textContent.trim() === "Écrivez votre texte ici...") editorArea.innerHTML = "";
  },
  { once: true }
);

editorDownloadBtn.addEventListener("click", async () => {
  const format = editorFormatSelect.value;
  const paragraphs = extractParagraphs(editorArea);

  editorDownloadBtn.disabled = true;
  editorDownloadBtn.textContent = "Génération...";

  try {
    if (format === "txt") {
      downloadBlob(new Blob([plainTextFromParagraphs(paragraphs)], { type: "text/plain;charset=utf-8" }), "document.txt");
    } else if (format === "html") {
      const html = `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><title>Document</title></head><body>${editorArea.innerHTML}</body></html>`;
      downloadBlob(new Blob([html], { type: "text/html;charset=utf-8" }), "document.html");
    } else if (format === "md") {
      downloadBlob(new Blob([markdownFromParagraphs(paragraphs)], { type: "text/markdown;charset=utf-8" }), "document.md");
    } else if (format === "rtf") {
      downloadBlob(new Blob([rtfFromParagraphs(paragraphs)], { type: "application/rtf" }), "document.rtf");
    } else if (format === "docx") {
      downloadBlob(await docxFromParagraphs(paragraphs), "document.docx");
    } else if (format === "odt") {
      downloadBlob(await odtFromParagraphs(paragraphs), "document.odt");
    } else if (format === "pdf") {
      await pdfFromEditor();
    }
  } catch (err) {
    console.error(err);
    alert("Impossible de générer ce format. Vérifiez votre connexion internet.");
  } finally {
    editorDownloadBtn.disabled = false;
    editorDownloadBtn.textContent = "Télécharger";
  }
});

function refreshUI() {
  updateResume();
  showFiles();
  updateGlobalFormatOptions();
}

renderHistory();
refreshUI();
renderCompress();
updateEditorStatus();
applyPageStyle();
