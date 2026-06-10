const fs = require("fs");
const path = require("path");
const vm = require("vm");

const appPath = path.join(__dirname, "..", "app.js");
const source = fs.readFileSync(appPath, "utf8");
const bootstrapSource = source.split('document.querySelectorAll("[data-insert]")')[0];

function createElement(overrides = {}) {
  return {
    value: "",
    textContent: "",
    innerHTML: "",
    hidden: false,
    options: [],
    dataset: {},
    style: {},
    classList: {
      add() {},
      remove() {},
      toggle() {},
      contains() {
        return false;
      },
    },
    addEventListener() {},
    getContext() {
      return createCanvasContext();
    },
    ...overrides,
  };
}

function createCanvasContext() {
  return {
    beginPath() {},
    moveTo() {},
    lineTo() {},
    stroke() {},
    fill() {},
    fillRect() {},
    clearRect() {},
    arc() {},
    fillText() {},
    measureText(text) {
      return { width: String(text).length * 8 };
    },
    set fillStyle(value) {},
    set strokeStyle(value) {},
    set lineWidth(value) {},
    set font(value) {},
    set lineJoin(value) {},
    set lineCap(value) {},
  };
}

function buildSandbox() {
  const elements = new Map();
  const ids = [
    "equationInput",
    "exampleSelect",
    "generateButton",
    "errorBox",
    "statusPill",
    "parameterControls",
    "graphCanvas",
    "graphSummary",
    "symbolicVisualization",
    "typeMetric",
    "sampleMetric",
    "errorMetric",
    "verifyMetric",
    "explainTab",
    "verifyTab",
    "exportTab",
    "recentProjects",
    "meterFill",
    "mathPreview",
    "mathPresenter",
    "mathLatexSource",
    "mathTextbookForm",
    "mathAccessibleText",
    "formulaStatus",
    "structuredComposer",
    "composerOutput",
    "composerPalette",
    "composerAddExpression",
    "composerReset",
    "solveTarget",
    "languageSelect",
    "solverSupportBadge",
    "solverSupportTitle",
    "solverSupportNote",
    "solverFamilyTag",
    "structureOutput",
    "algorithmOutput",
    "pseudocodeOutput",
    "codeOutput",
    "solverOutput",
    "librarySearch",
    "libraryCategory",
    "libraryDifficulty",
    "libraryCount",
    "libraryList",
    "libraryDetailCategory",
    "libraryDetailDifficulty",
    "libraryDetailTitle",
    "libraryFormula",
    "libraryDescription",
    "libraryInputs",
    "libraryOutputs",
    "libraryVisualization",
    "libraryVerification",
    "librarySolverSupport",
    "librarySolverTargets",
    "libraryConcept",
    "libraryExampleProblem",
    "libraryWorkedExample",
    "libraryVerificationSteps",
    "libraryPrerequisites",
    "libraryRelatedTopics",
    "libraryApplications",
    "libraryStats",
    "libraryLearningPath",
    "libraryAlgorithm",
    "loadLibraryFormula",
    "copyLibraryCode",
    "verificationReport",
    "accessibilityNarration",
    "mathMlOutput",
    "graphAltText",
    "keyboardGraphGuide",
    "graphExplorerRange",
    "graphExplorerOutput",
    "theoremExplorer",
    "knowledgeGraphPanel",
    "sandboxBlueprint",
    "professorMode",
    "inputIntentPanel",
    "projectNameInput",
    "saveProjectButton",
    "clearProjectsButton",
  ];

  ids.forEach((id) => elements.set(`#${id}`, createElement()));
  elements.get("#equationInput").value = "s = ut + 1/2at²";
  elements.get("#exampleSelect").options = [];
  elements.get("#languageSelect").value = "python";
  elements.get("#librarySearch").value = "";
  elements.get("#libraryCategory").value = "All categories";
  elements.get("#libraryDifficulty").value = "all";
  elements.set("#graphCanvas", createElement({ width: 1100, height: 640 }));

  const document = {
    querySelector(selector) {
      if (!elements.has(selector)) elements.set(selector, createElement());
      return elements.get(selector);
    },
    querySelectorAll(selector) {
      if (selector === ".mode-grid input:checked") {
        return ["graph", "animation", "diagram", "sound", "verification", "explanation"].map((value) => ({ value }));
      }
      return [];
    },
    createElement() {
      return createElement({ click() {} });
    },
    body: createElement(),
  };

  return {
    console,
    document,
    window: {},
    localStorage: {
      getItem() {
        return "[]";
      },
      setItem() {},
    },
    requestAnimationFrame() {
      return 0;
    },
    getComputedStyle() {
      return {
        getPropertyValue() {
          return "#ffffff";
        },
      };
    },
    URL: {
      createObjectURL() {
        return "blob:test";
      },
      revokeObjectURL() {},
    },
    Blob,
    navigator: {
      clipboard: {
        writeText() {},
      },
    },
    AudioContext: function AudioContext() {},
  };
}

function loadApp() {
  const sandbox = buildSandbox();
  vm.createContext(sandbox);
  vm.runInContext(`${bootstrapSource}\nlinkLibraryToSolverFamilies();\nglobalThis.formulaLibrary = formulaLibrary;`, sandbox, { filename: "app.js" });
  return sandbox;
}

function loadAppWithMath() {
  const sandbox = buildSandbox();
  const math = require("mathjs");
  sandbox.window.math = math;
  sandbox.math = math;
  vm.createContext(sandbox);
  vm.runInContext(`${bootstrapSource}\nlinkLibraryToSolverFamilies();\nglobalThis.formulaLibrary = formulaLibrary;`, sandbox, { filename: "app.js" });
  return sandbox;
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function assertAnalysis(app, equation, expectedType) {
  const analysis = app.buildAnalysis(equation);
  assert(analysis.type === expectedType, `${equation}: expected ${expectedType}, got ${analysis.type}`);
  assert(analysis.points.length > 100, `${equation}: expected generated sample points`);
  assert(analysis.verification.status === "passed", `${equation}: expected verification passed`);
}

function assertFormula(app, equation, expectedType, expectedCodePart) {
  const model = app.buildFormulaModel(equation);
  assert(model.type === expectedType, `${equation}: expected ${expectedType}, got ${model.type}`);
  const code = app.generateCode(model, "python");
  assert(code.includes(expectedCodePart), `${equation}: generated code missing ${expectedCodePart}`);
}

function assertTargetSolve(app, equation, target, expectedExpression, supported = true) {
  app.document.querySelector("#solveTarget").value = target;
  const model = app.buildFormulaModel(equation);
  assert(model.target === target, `${equation}: expected solve target ${target}, got ${model.target}`);
  assert(model.solution.expression === expectedExpression, `${equation}: expected ${target} => ${expectedExpression}, got ${model.solution.expression}`);
  assert(model.solution.supported === supported, `${equation}: expected supported=${supported}, got ${model.solution.supported}`);
}

function assertPipeline(app, equation, expectedMode, expectedType) {
  const pipeline = app.buildMathPipeline(equation);
  assert(pipeline.type === expectedType, `${equation}: expected pipeline type ${expectedType}, got ${pipeline.type}`);
  assert(pipeline.mode === expectedMode, `${equation}: expected pipeline mode ${expectedMode}, got ${pipeline.mode}`);
  assert(pipeline.formulaModel, `${equation}: expected formula model in pipeline`);
  if (expectedMode === "graph") {
    assert(pipeline.analysis, `${equation}: expected analysis in graph pipeline`);
    assert(pipeline.verification.status === "passed", `${equation}: expected passed verification in graph pipeline`);
  } else {
    assert(!pipeline.analysis, `${equation}: expected no analysis in symbolic pipeline`);
  }
}

const app = loadApp();
const appWithMath = loadAppWithMath();

assertAnalysis(app, "y = x", "general function");
assertAnalysis(app, "y = x^2", "quadratic function");
assertAnalysis(app, "y = sin(x)", "trigonometric function");
assertAnalysis(app, "s = ut + 1/2at²", "kinematics simulation");
assertAnalysis(app, "y = 6 Σ(k=1 to 12) [sin((2k + 1)x) / (2k + 1)]", "finite series equation");

assertFormula(app, "F = ma", "force equation", "return m*a");
assertFormula(app, "s = ut + 1/2at²", "kinematics simulation", "return u*t + 0.5*a*t**2");
assertFormula(app, "A = pi*r^2", "general function", "return math.pi*r**2");
assertFormula(app, "E = m*c^2", "general function", "return m*c**2");
assertFormula(app, "V = I*R", "general function", "return I*R");
assertFormula(app, "p = m*v", "general function", "return m*v");
assertFormula(app, "F = -k*x", "force equation", "return -k*x");
assertFormula(app, "v = u + a*t", "general function", "return u+a*t");
assertFormula(app, "I = P*r*t", "general function", "return P*r*t");
assertFormula(app, "P = F/A", "general function", "return F/A");
assertFormula(app, "rho = m/V", "general function", "return m/V");
assertFormula(app, "P = V*I", "general function", "return V*I");
assertFormula(app, "KE = 1/2*m*v^2", "general function", "return 0.5*m*v**2");
assertFormula(app, "s = (u+v)*t/2", "kinematics simulation", "return (u+v)*t/2");
assertFormula(app, "C = 2*pi*r", "general function", "return 2*math.pi*r");
assertFormula(app, "v = f*lambda", "general function", "return f*lambda");
assertFormula(app, "f = 1/T", "general function", "return 1/T");
assertFormula(app, "m = (y2-y1)/(x2-x1)", "general function", "return (y2-y1)/(x2-x1)");
assertFormula(app, "d = sqrt((x2-x1)^2+(y2-y1)^2)", "general function", "return math.sqrt((x2-x1)**2+(y2-y1)**2)");
assertFormula(app, "A = P*(1+r/n)^(n*t)", "general function", "return P*(1+r/n)**(n*t)");
assertFormula(app, "F = G*m1*m2/r^2", "force equation", "return G*m1*m2/(r**2)");
assertFormula(app, "W = F*d", "general function", "return F*d");
assertFormula(app, "v = d/t", "general function", "return d/t");
assertFormula(app, "A = l*w", "general function", "return l*w");
assertFormula(app, "A = 1/2*b*h", "general function", "return 0.5*b*h");
assertFormula(app, "mean = sum/n", "general function", "return sum/n");
assertFormula(app, "percent_change = (new-old)/old*100", "general function", "return (new-old)/old*100");
assertFormula(app, "dy/dx = y = 5x^3", "differentiation request", "return 15*x**2");

assertTargetSolve(app, "A = pi*r^2", "r", "sqrt(A/pi)");
assertTargetSolve(app, "E = m*c^2", "c", "sqrt(E/m)");
assertTargetSolve(app, "V = I*R", "R", "V/I");
assertTargetSolve(app, "p = m*v", "v", "p/m");
assertTargetSolve(app, "F = -k*x", "x", "-F/k");
assertTargetSolve(app, "R = v^2*sin(2*theta)/g", "v", "sqrt(R*g/sin(2*theta))");
assertTargetSolve(app, "v = u + a*t", "a", "(v-u)/t");
assertTargetSolve(app, "I = P*r*t", "t", "I/(P*r)");
assertTargetSolve(app, "P = F/A", "A", "F/P");
assertTargetSolve(app, "rho = m/V", "V", "m/rho");
assertTargetSolve(app, "P = V*I", "I", "P/V");
assertTargetSolve(app, "KE = 1/2*m*v^2", "v", "sqrt(2*KE/m)");
assertTargetSolve(app, "s = (u+v)*t/2", "u", "(2*s/t)-v");
assertTargetSolve(app, "C = 2*pi*r", "r", "C/(2*pi)");
assertTargetSolve(app, "V = 4/3*pi*r^3", "r", "((3*V)/(4*pi))^(1/3)");
assertTargetSolve(app, "v = f*lambda", "lambda", "v/f");
assertTargetSolve(app, "f = 1/T", "T", "1/f");
assertTargetSolve(app, "m = (y2-y1)/(x2-x1)", "m", "(y2-y1)/(x2-x1)");
assertTargetSolve(app, "d = sqrt((x2-x1)^2+(y2-y1)^2)", "d", "sqrt((x2-x1)^2+(y2-y1)^2)");
assertTargetSolve(app, "A = P*(1+r/n)^(n*t)", "P", "A/((1+r/n)^(n*t))");
assertTargetSolve(app, "F = G*m1*m2/r^2", "r", "sqrt(G*m1*m2/F)");
assertTargetSolve(app, "W = F*d", "d", "W/F");
assertTargetSolve(app, "v = d/t", "t", "d/v");
assertTargetSolve(app, "A = l*w", "w", "A/l");
assertTargetSolve(app, "A = 1/2*b*h", "h", "2*A/b");
assertTargetSolve(app, "mean = sum/n", "sum", "mean*n");
assertTargetSolve(app, "percent_change = (new-old)/old*100", "new", "old*(1+percent_change/100)");
assertTargetSolve(app, "P = I*V", "V", "unsupported_target(V)", false);
assertTargetSolve(app, "dy/dx = y = 5x^3", "dy/dx", "15*x^2");

assertPipeline(app, "y = sin(x)", "graph", "trigonometric function");
assertPipeline(app, "F = ma", "symbolic", "force equation");
assertPipeline(app, "y = 6 Σ(k=1 to 12) [sin((2k + 1)x) / (2k + 1)]", "graph", "finite series equation");
assertPipeline(app, "A = pi*r^2", "symbolic", "general function");

const fallbackParsed = app.parseEquation("A = pi*r^2");
assert(fallbackParsed.ast.type === "FallbackExpression", "expected fallback parser without Math.js");
assert(fallbackParsed.variables.includes("A") && fallbackParsed.variables.includes("r"), "expected fallback variables A and r");
assert(fallbackParsed.isGraphable === false, "expected area formula to remain symbolic");

const parsed = appWithMath.parseEquation("A = pi*r^2");
assert(parsed.ast.type, "expected Math.js AST type");
assert(parsed.variables.includes("A") && parsed.variables.includes("r"), "expected parsed variables A and r");
assert(parsed.constants.includes("pi") || parsed.constants.includes("3.141592653589793"), "expected pi constant");
assert(parsed.operators.includes("^"), "expected power operator");

const rk4Model = app.buildFormulaModel("y_{n+1}=y_n + h/6(k1 + 2k2 + 2k3 + k4)");
assert(rk4Model.cleanLatex.includes("y_{n+1}"), "expected RK4 latex to preserve indexed subscript");
assert(rk4Model.cleanLatex.includes("\\frac{h}{6}"), "expected RK4 latex to format the fraction");
assert(rk4Model.cleanLatex.includes("k_{1}"), "expected RK4 latex to format indexed terms");

const bayesModel = app.buildFormulaModel("P(A|B)=P(B|A)P(A)/P(B)");
assert(bayesModel.cleanLatex.includes("\\mid"), "expected Bayes latex to use conditional-probability bar");

const fourierModel = app.buildFormulaModel("f(x)=a0/2 + Σ(n=1 to ∞)[a_n cos(nx)+b_n sin(nx)]");
assert(fourierModel.cleanLatex.includes("\\sum_{n=1}^{\\infty}"), "expected Fourier latex to render sigma notation");

const matrixModel = app.buildFormulaModel("A = [[a11, a12], [a21, a22]]");
assert(matrixModel.cleanLatex.includes("\\begin{bmatrix}"), "expected matrix latex to use bmatrix layout");

const casesModel = app.buildFormulaModel("fx = cases{α if a = b; β if a ≠ b}");
assert(casesModel.cleanLatex.includes("\\begin{cases}"), "expected cases latex to use cases layout");

const modularModel = app.buildFormulaModel("a mod n");
assert(modularModel.cleanLatex.includes("\\bmod"), "expected modular notation to use bmod");
const derivativeModel = app.buildFormulaModel("If y = 5x^3, then dy/dx");
assert(derivativeModel.solution.family === "power_rule_derivative", "expected power rule derivative family");
assert(derivativeModel.solution.derivative.ruleStep.includes("15*x^2"), "expected derivative rule step");
assert(derivativeModel.algorithm.includes("Apply the power rule"), "expected derivative algorithm to explain power rule");
assert(derivativeModel.pseudocode.includes("derivative_exponent = n - 1"), "expected derivative pseudocode");
assert(app.generateCode(derivativeModel, "python").includes("def derivative"), "expected derivative code template");

assert(app.formulaLibrary.length >= 50, `expected at least 50 library items, got ${app.formulaLibrary.length}`);
const rk4 = app.formulaLibrary.find((item) => item.id === "rk4_method");
assert(rk4, "expected RK4 library item");
assert(rk4.algorithm.length >= 4, "expected RK4 algorithm steps");
assert(rk4.code.python.includes("def rk4"), "expected RK4 Python template");
assert(rk4.solverSupport === "reference only", "expected RK4 to stay reference-only");
assert(rk4.exampleProblem.includes("RK4"), "expected enriched example problem for RK4");
assert(rk4.verificationSteps.includes("Check that the chosen formula"), "expected verification checklist text");

const newtonForce = app.formulaLibrary.find((item) => item.id === "newtons_second_law");
assert(newtonForce, "expected Newton's second law library item");
assert(newtonForce.solverFamily === "force_law", "expected Newton's second law to link to force solver family");
assert(newtonForce.solverTargets.includes("m"), "expected linked solver targets for Newton's second law");

const ohmsLaw = app.formulaLibrary.find((item) => item.id === "ohms_law");
assert(ohmsLaw, "expected Ohm's law library item");
assert(ohmsLaw.solverFamily === "ohms_law", "expected Ohm's law to link to its solver family");

const momentumRelation = app.formulaLibrary.find((item) => item.id === "momentum_relation");
assert(momentumRelation, "expected momentum library item");
assert(momentumRelation.solverFamily === "momentum", "expected momentum library item to link to momentum solver");

const kineticEnergy = app.formulaLibrary.find((item) => item.id === "kinetic_energy_relation");
assert(kineticEnergy, "expected kinetic energy library item");
assert(kineticEnergy.solverFamily === "kinetic_energy", "expected kinetic energy item to link to its solver family");
const compoundInterest = app.formulaLibrary.find((item) => item.id === "compound_interest_formula");
assert(compoundInterest, "expected compound interest library item");
assert(compoundInterest.solverFamily === "compound_interest", "expected compound interest to link to solver family");
const waveSpeed = app.formulaLibrary.find((item) => item.id === "wave_speed_formula");
assert(waveSpeed?.solverTargets.includes("lambda"), "expected wave speed to expose wavelength solve target");
const distanceFormula = app.formulaLibrary.find((item) => item.id === "distance_2d_formula");
assert(distanceFormula?.solverFamily === "distance_2d", "expected distance formula to link to solver family");
const workFormula = app.formulaLibrary.find((item) => item.id === "work_formula");
assert(workFormula?.solverFamily === "work_formula", "expected work formula to link to solver family");
const triangleArea = app.formulaLibrary.find((item) => item.id === "triangle_area_formula");
assert(triangleArea?.solverTargets.includes("h"), "expected triangle area to expose height solve target");
const arithmeticMean = app.formulaLibrary.find((item) => item.id === "arithmetic_mean_formula");
assert(arithmeticMean?.solverFamily === "arithmetic_mean", "expected arithmetic mean to link to solver family");
const compoundModel = app.buildFormulaModel("A = P*(1+r/n)^(n*t)");
assert(compoundModel.algorithm.includes("Formula family"), "expected algorithm to include formula family context");
assert(compoundModel.algorithm.includes("Validate"), "expected algorithm to include validation step");
assert(compoundModel.pseudocode.includes("FORMULA_FAMILY compound_interest"), "expected pseudocode to include formula family");
assert(compoundModel.pseudocode.includes("VERIFY result"), "expected pseudocode to include verification line");
const compoundJs = app.generateCode(compoundModel, "javascript");
assert(compoundJs.includes("Math.pow"), "expected JavaScript compound interest code to convert powers");
const symbolicCards = app.buildSymbolicVisualizationCards(compoundModel);
assert(symbolicCards.some((card) => card.label === "Growth"), "expected compound interest visualization to include growth card");
const matrixCards = app.buildSymbolicVisualizationCards(app.buildFormulaModel("A = [[a11, a12], [a21, a22]]"));
assert(matrixCards.some((card) => card.label === "Matrix"), "expected matrix visualization card");
const verificationCards = app.buildFormulaVerificationCards(app.buildFormulaModel("v = f*lambda"));
assert(verificationCards.some((card) => card.label === "Units"), "expected verification cards to include units");
const verificationReport = app.buildVerificationReport(app.buildFormulaModel("A = P*(1+r/n)^(n*t)"));
assert(verificationReport.checks.some((check) => check.includes("Detected variables")), "expected verification report to include variable check");
assert(verificationReport.substitution.includes("Substitute"), "expected verification report to include substitution plan");
assert(verificationReport.numericCheck.status === "passed", "expected compound interest numeric substitution to pass");
assert(verificationReport.domainRestrictions.length > 0, "expected domain restrictions in verification report");
assert(verificationReport.unitProfile.summary.includes("P:"), "expected unit profile summary");
const forceCheck = app.verifySubstitutionNumerically(app.buildFormulaModel("F = ma"));
assert(forceCheck.status === "passed", "expected force substitution check to pass");
const intent = app.detectInputIntent("Explain Dijkstra");
assert(intent.intent === "learn concept", "expected natural language explain intent");
assert(intent.outputs.includes("quiz"), "expected tutor output list");
const accessibilityBundle = app.buildAccessibilityBundle(app.buildFormulaModel("y = sin(x)"), app.buildAnalysis("y = sin(x)"));
assert(accessibilityBundle.mathMl.includes("MathML"), "expected accessibility bundle to include MathML");
assert(accessibilityBundle.graphAlt.includes("sampled"), "expected graph alt text to describe sampled graph");
assert(accessibilityBundle.explorer.total > 100, "expected graph explorer sample count");
const explorerPoint = app.buildGraphExplorer(app.buildAnalysis("y = sin(x)"), 10);
assert(explorerPoint.text.includes("Point 11"), "expected graph explorer to describe selected point");
const theoremView = app.buildTheoremExplorerModel(app.formulaLibrary.find((item) => item.id === "eulers_theorem"), app.buildFormulaModel("e^{ix}=cos(x)+i sin(x)"));
assert(theoremView.statement.includes("e^{ix}"), "expected theorem explorer to preserve statement");
const graphModel = app.buildKnowledgeGraphModel(app.formulaLibrary.find((item) => item.id === "rk4_method"), app.buildFormulaModel("y = sin(x)"));
assert(graphModel.nodes.some((node) => node.type === "current"), "expected knowledge graph to include current node");
assert(graphModel.nodes.every((node) => Number.isFinite(node.x) && Number.isFinite(node.y)), "expected knowledge graph nodes to include map positions");
assert(graphModel.edges.length > 0, "expected knowledge graph edges");
const sandboxPlan = app.buildSandboxBlueprint(app.buildFormulaModel("F = ma"));
assert(sandboxPlan.blocks.length >= 6, "expected sandbox blueprint blocks");
assert(sandboxPlan.connections.includes("Equation -> Solver"), "expected sandbox connection to solver");
assert(sandboxPlan.blocks.some((block) => block.ports.includes("formula out")), "expected sandbox blocks to expose ports");
const professorPlan = app.buildProfessorModeModel(app.formulaLibrary.find((item) => item.id === "rk4_method"), app.buildFormulaModel("F = ma"));
assert(professorPlan.hints.length >= 3, "expected professor mode hints");
assert(professorPlan.quiz.includes("Runge-Kutta"), "expected professor quiz to use selected topic");
assert(professorPlan.lessonFlow.includes("Assessment"), "expected professor lesson flow");

const previewTarget = createElement();
app.renderMathInto(previewTarget, "s = ut + 1/2at²");
assert(previewTarget.dataset.renderer === "fallback", "expected fallback renderer without KaTeX in tests");
assert(previewTarget.innerHTML.includes("frac"), "expected fallback fraction markup");
const matrixPreviewTarget = createElement();
app.renderMathInto(matrixPreviewTarget, "A = [[a11, a12], [a21, a22]]");
assert(matrixPreviewTarget.innerHTML.includes("matrix"), "expected fallback matrix markup");
assert(app.describeMath("y = sin(x)") === "y equals sin(x)", "expected accessible math description");
assert(app.composerBlockToExpression(app.createComposerBlock("fraction", { numerator: "a+b", denominator: "n" })) === "(a+b)/n", "expected fraction block to serialize");
assert(app.composerBlockToExpression(app.createComposerBlock("vector", { notation: "vec", value: "AB" })) === "vec(AB)", "expected vector block to serialize");
assert(app.composerBlocksToEquation([
  app.createComposerBlock("expression", { value: "y =" }),
  app.createComposerBlock("sum", { body: "sin(kx)/k", variable: "k", start: "1", end: "10" }),
]) === "y = Σ(k=1 to 10) [sin(kx)/k]", "expected composer blocks to join into one equation");
const composerSeed = app.buildComposerFromEquation("A = pi*r^2");
assert(composerSeed.length === 3, "expected simple equation to split around top-level operators");
assert(composerSeed[0].type === "expression" && composerSeed[0].value === "A", "expected left side expression block");
assert(composerSeed[1].type === "expression" && composerSeed[1].prefix === "=" && composerSeed[1].value === "pi", "expected equals-prefixed middle block");
assert(composerSeed[2].type === "power" && composerSeed[2].prefix === "*" && composerSeed[2].base === "r", "expected power block for squared term");
const sumComposer = app.buildComposerFromEquation("y = 6 Σ(k=1 to 12) [sin((2k + 1)x) / (2k + 1)]");
assert(sumComposer.length === 3, "expected sum equation to preserve leading operator structure and summation");
assert(sumComposer[0].type === "expression" && sumComposer[0].value === "y", "expected leading lhs block before summation");
assert(sumComposer[1].type === "expression" && sumComposer[1].prefix === "=" && sumComposer[1].value === "6", "expected equals-prefixed scalar block");
assert(sumComposer[2].type === "sum" && sumComposer[2].variable === "k", "expected parsed summation block");
const matrixComposer = app.buildComposerFromEquation("A = [[a1, b1], [c1, d1]]");
assert(matrixComposer.length === 2, "expected matrix equation to split into expression and matrix blocks");
assert(matrixComposer[1].type === "matrix" && matrixComposer[1].rows === "a1, b1; c1, d1", "expected parsed matrix rows");
const casesComposer = app.buildComposerFromEquation("fx = cases{α if a = b; β if a ≠ b}");
assert(casesComposer.length === 2, "expected cases equation to split into expression and cases blocks");
assert(casesComposer[1].type === "cases", "expected parsed cases block");
const vectorComposer = app.buildComposerFromEquation("u = vec(AB)");
assert(vectorComposer.length === 2 && vectorComposer[1].type === "vector", "expected parsed vector block");
const integralComposer = app.buildComposerFromEquation("∫(0 to 1) x^2 dx");
assert(integralComposer.length === 1 && integralComposer[0].type === "integral", "expected parsed integral block");
const moduloComposer = app.buildComposerFromEquation("a mod n");
assert(moduloComposer.length === 1 && moduloComposer[0].type === "modulo", "expected parsed modulo block");
const alignedComposer = app.buildComposerFromEquation("align{y = mx + b; m = (y2-y1)/(x2-x1)}");
assert(alignedComposer.length === 1 && alignedComposer[0].type === "aligned", "expected parsed aligned block");
const theoremComposer = app.buildComposerFromEquation("theorem{title: Euler theorem; statement: e^{ix}=cos(x)+i sin(x)}");
assert(theoremComposer.length === 1 && theoremComposer[0].type === "theorem", "expected parsed theorem block");
const proofComposer = app.buildComposerFromEquation("proof{Given A; apply B; therefore C}");
assert(proofComposer.length === 1 && proofComposer[0].type === "proof", "expected parsed proof block");
const bracketComposer = app.buildComposerFromEquation("bracket{[, x+y, ]}");
assert(bracketComposer.length === 1 && bracketComposer[0].type === "bracket", "expected parsed bracket block");
assert(app.composerBlockToExpression(app.createComposerBlock("aligned", { lines: "a=b; b=c" })) === "align{a=b; b=c}", "expected aligned block serialization");
assert(app.composerBlockToExpression(app.createComposerBlock("theorem", { title: "T", statement: "a=b" })) === "theorem{title: T; statement: a=b}", "expected theorem block serialization");
assert(app.composerBlockToExpression(app.createComposerBlock("proof", { steps: "A; B" })) === "proof{A; B}", "expected proof block serialization");
assert(app.composerBlockToExpression(app.createComposerBlock("bracket", { open: "[", value: "a+b", close: "]" })) === "bracket{[, a+b, ]}", "expected bracket block serialization");
const quadraticComposer = app.buildComposerFromEquation("x^2 + y^2");
assert(quadraticComposer.length === 2, "expected top-level additive expression to split into two blocks");
assert(quadraticComposer[0].type === "power" && quadraticComposer[1].type === "power", "expected powers to become atomic composer blocks");
assert(quadraticComposer[1].prefix === "+", "expected plus joiner on second power block");
assert(app.composerBlockPreviewExpression(app.createComposerBlock("fraction", { numerator: "a+b", denominator: "n" })) === "(a+b)/n", "expected composer preview serialization");
const nestedFraction = app.createComposerBlock("fraction", { numerator: "a+b", denominator: "n" });
assert(Array.isArray(nestedFraction.numeratorBlocks) && nestedFraction.numeratorBlocks.length === 2, "expected fraction numerator to keep nested child blocks");
assert(!nestedFraction.denominatorBlocks, "expected simple denominator to stay scalar");
const nestedSum = app.buildComposerFromEquation("Σ(k=1 to 10) [sin(kx)/k]");
assert(Array.isArray(nestedSum[0].bodyBlocks) && nestedSum[0].bodyBlocks[0].type === "fraction", "expected summation body to expose nested fraction block");
const nestedPower = app.createComposerBlock("power", { base: "a+b", exponent: "n+1" });
assert(Array.isArray(nestedPower.baseBlocks) && nestedPower.baseBlocks.length === 2, "expected power base to keep nested additive structure");
assert(Array.isArray(nestedPower.exponentBlocks) && nestedPower.exponentBlocks.length === 2, "expected power exponent to keep nested additive structure");
const editableFraction = app.createComposerBlock("fraction", { numerator: "a+b", denominator: "n" });
app.updateNestedComposerChild(editableFraction, "numerator", 1, "expression", "c");
assert(app.composerBlockToExpression(editableFraction) === "(a+c)/n", "expected nested child edit to update parent fraction");
app.addNestedComposerChild(editableFraction, "numerator");
assert(editableFraction.numeratorBlocks.length === 3, "expected nested child add helper to append a new child");
app.updateNestedComposerChild(editableFraction, "numerator", 2, "expression", "d");
assert(app.composerBlockToExpression(editableFraction) === "(a+c+d)/n", "expected appended nested child to serialize into parent");
app.removeNestedComposerChild(editableFraction, "numerator", 1);
assert(app.composerBlockToExpression(editableFraction) === "(a+d)/n", "expected nested child removal to update parent fraction");
const typedNestedFraction = app.createComposerBlock("fraction", { numerator: "a+b", denominator: "n" });
app.updateNestedComposerChild(typedNestedFraction, "numerator", 1, "type", "fraction");
assert(typedNestedFraction.numeratorBlocks[1].type === "fraction", "expected nested child type switching to replace child block");
assert(app.composerBlockToExpression(typedNestedFraction) === "(a+a/b)/n", "expected switched nested child type to serialize");
const switchableBlocks = [
  app.createComposerBlock("expression", { value: "a" }),
  app.createComposerBlock("power", { base: "x", exponent: "2", prefix: "+" }),
];
app.switchComposerBlockType(switchableBlocks, 0, "root");
assert(switchableBlocks[0].type === "root", "expected top-level block type switching");
app.moveComposerBlock(switchableBlocks, 1, -1);
assert(switchableBlocks[0].type === "power" && switchableBlocks[1].type === "root", "expected top-level block reordering");
app.moveComposerBlockTo(switchableBlocks, 0, 1);
assert(switchableBlocks[1].type === "power", "expected drag/drop-style block reordering helper");
const structuredMatrix = app.createComposerBlock("matrix", { rows: "x^2, a+b; sin(kx)/k, d" });
assert(structuredMatrix.cells.length === 2 && structuredMatrix.cells[0].length === 2, "expected matrix to hydrate into cell grid");
assert(structuredMatrix.cells[0][0].blocks?.[0]?.type === "power", "expected matrix cell to keep structured power");
assert(structuredMatrix.cells[0][1].blocks?.length === 2, "expected matrix cell to keep additive children");
app.updateMatrixCell(structuredMatrix, 1, 1, "y^2");
assert(structuredMatrix.cells[1][1].blocks?.[0]?.type === "power", "expected edited matrix cell to parse structure");
assert(app.composerBlockToExpression(structuredMatrix).includes("y^{2}"), "expected edited matrix cell to serialize");
app.addMatrixRow(structuredMatrix);
app.addMatrixColumn(structuredMatrix);
assert(structuredMatrix.cells.length === 3, "expected matrix row add helper");
assert(structuredMatrix.cells[0].length === 3, "expected matrix column add helper");
app.removeMatrixRow(structuredMatrix, 2);
app.removeMatrixColumn(structuredMatrix, 2);
assert(structuredMatrix.cells.length === 2 && structuredMatrix.cells[0].length === 2, "expected matrix remove helpers");
app.addMatrixCellChild(structuredMatrix, 0, 1);
assert(structuredMatrix.cells[0][1].blocks.length === 3, "expected matrix cell nested child add");
app.updateMatrixCellChild(structuredMatrix, 0, 1, 2, "expression", "z");
assert(structuredMatrix.cells[0][1].value.includes("z"), "expected matrix cell nested child edit to sync cell value");
app.updateMatrixCellChild(structuredMatrix, 0, 1, 2, "type", "root");
assert(structuredMatrix.cells[0][1].blocks[2].type === "root", "expected matrix cell nested child type switching");
app.removeMatrixCellChild(structuredMatrix, 0, 1, 2);
assert(structuredMatrix.cells[0][1].blocks.length === 2, "expected matrix cell nested child removal");
const structuredCases = app.createComposerBlock("cases", { rows: "x^2 if x > 0; -x if x <= 0" });
assert(structuredCases.branches.length === 2, "expected cases to hydrate into branch models");
assert(structuredCases.branches[0].expressionBlocks?.[0]?.type === "power", "expected case expression to keep structured power");
app.updateCaseBranch(structuredCases, 1, "expression", "sqrt(x)");
assert(structuredCases.branches[1].expressionBlocks?.[0]?.type === "root", "expected edited case branch to parse root");
app.addCaseBranch(structuredCases);
assert(structuredCases.branches.length === 3, "expected add case branch helper");
app.removeCaseBranch(structuredCases, 2);
assert(structuredCases.branches.length === 2, "expected remove case branch helper");
assert(app.composerBlockToExpression(structuredCases).includes("sqrt(x) if x <= 0"), "expected case branch serialization after edit");
app.addCaseBranchChild(structuredCases, 0, "expression");
assert(structuredCases.branches[0].expressionBlocks.length === 2, "expected case expression child add");
app.updateCaseBranchChild(structuredCases, 0, "expression", 1, "expression", "y");
assert(structuredCases.branches[0].expression.includes("y"), "expected case expression child edit to sync branch");
app.updateCaseBranchChild(structuredCases, 0, "expression", 1, "type", "fraction");
assert(structuredCases.branches[0].expressionBlocks[1].type === "fraction", "expected case expression child type switching");
app.removeCaseBranchChild(structuredCases, 0, "expression", 1);
assert(structuredCases.branches[0].expressionBlocks.length === 1, "expected case expression child removal");
assert(app.renderMathPreview("align{a=b; b=c}").includes("aligned"), "expected aligned fallback preview");
assert(app.renderMathPreview("theorem{title: T; statement: a=b}").includes("theorem-preview"), "expected theorem fallback preview");
assert(app.renderMathPreview("proof{A; B}").includes("proof-preview"), "expected proof fallback preview");
assert(app.renderMathPreview("bracket{[, a+b, ]}").includes("bracket-preview"), "expected bracket fallback preview");

const supportedModel = app.buildFormulaModel("A = pi*r^2");
app.renderFormulaModule(supportedModel);
assert(app.document.querySelector("#solverSupportBadge").textContent === "Solved", "expected solved badge for stored area formula");
assert(app.document.querySelector("#solverFamilyTag").textContent === "circle_area", "expected area family tag");
assert(app.document.querySelector("#symbolicVisualization").innerHTML.includes("Geometry"), "expected symbolic visualization cards for area formula");
assert(app.document.querySelector("#verificationReport").innerHTML.includes("Confidence"), "expected verification report panel to render");
assert(app.document.querySelector("#accessibilityNarration").textContent.includes("This formula reads as"), "expected accessibility narration to render");
assert(app.document.querySelector("#mathMlOutput").textContent.includes("<math"), "expected MathML output to render");
assert(app.document.querySelector("#knowledgeGraphPanel").innerHTML.includes("data-node-type"), "expected knowledge graph panel to render nodes");
assert(app.document.querySelector("#sandboxBlueprint").innerHTML.includes("Equation block"), "expected sandbox blueprint to render");
assert(app.document.querySelector("#professorMode").innerHTML.includes("Practice"), "expected professor mode panel to render");
assert(app.document.querySelector("#graphExplorerOutput").textContent.length > 0, "expected graph explorer output to render");
app.renderInputIntelligence("solve F = ma");
assert(app.document.querySelector("#inputIntentPanel").innerHTML.includes("solve problem"), "expected input intent panel to render solve intent");
const snapshot = app.createProjectSnapshot("Regression project");
assert(snapshot.name === "Regression project", "expected named project snapshot");
assert(snapshot.verification.confidence > 0, "expected project snapshot verification metadata");

app.document.querySelector("#solveTarget").value = "V";
const unsupportedModel = app.buildFormulaModel("P = I*V");
app.renderFormulaModule(unsupportedModel);
assert(app.document.querySelector("#solverSupportBadge").textContent === "Needs template", "expected unsupported badge");
assert(app.document.querySelector("#solverOutput").textContent.includes("Support: Needs template"), "expected solver output support line");

app.renderLibraryDetail(newtonForce);
assert(app.document.querySelector("#librarySolverSupport").textContent === "linked solver", "expected linked solver metadata in library detail");
assert(app.document.querySelector("#librarySolverTargets").textContent.includes("F"), "expected solver targets in library detail");
assert(app.document.querySelector("#libraryExampleProblem").textContent.includes("mass"), "expected example problem in library detail");
assert(app.document.querySelector("#libraryWorkedExample").textContent.includes("Substitute"), "expected worked example in library detail");
assert(app.document.querySelector("#libraryPrerequisites").textContent.includes("Units"), "expected prerequisites in library detail");
assert(app.document.querySelector("#libraryLearningPath").innerHTML.includes("Current"), "expected library learning path to render");
app.renderLibraryStats(app.formulaLibrary);
assert(app.document.querySelector("#libraryStats").innerHTML.includes("Linked"), "expected library stats to render linked count");
assert(app.document.querySelector("#libraryApplications").textContent.includes("simulation"), "expected applications in library detail");

console.log("Regression tests passed");
