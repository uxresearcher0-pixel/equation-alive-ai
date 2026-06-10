const equationInput = document.querySelector("#equationInput");
const exampleSelect = document.querySelector("#exampleSelect");
const generateButton = document.querySelector("#generateButton");
const errorBox = document.querySelector("#errorBox");
const statusPill = document.querySelector("#statusPill");
const parameterControls = document.querySelector("#parameterControls");
const canvas = document.querySelector("#graphCanvas");
const ctx = canvas.getContext("2d");
const graphSummary = document.querySelector("#graphSummary");
const symbolicVisualization = document.querySelector("#symbolicVisualization");
const typeMetric = document.querySelector("#typeMetric");
const sampleMetric = document.querySelector("#sampleMetric");
const errorMetric = document.querySelector("#errorMetric");
const verifyMetric = document.querySelector("#verifyMetric");
const explainTab = document.querySelector("#explainTab");
const verifyTab = document.querySelector("#verifyTab");
const exportTab = document.querySelector("#exportTab");
const recentProjects = document.querySelector("#recentProjects");
const meterFill = document.querySelector("#meterFill");
const mathPreview = document.querySelector("#mathPreview");
const mathPresenter = document.querySelector("#mathPresenter");
const mathLatexSource = document.querySelector("#mathLatexSource");
const mathTextbookForm = document.querySelector("#mathTextbookForm");
const mathAccessibleText = document.querySelector("#mathAccessibleText");
const formulaStatus = document.querySelector("#formulaStatus");
const structuredComposer = document.querySelector("#structuredComposer");
const composerOutput = document.querySelector("#composerOutput");
const composerPalette = document.querySelector("#composerPalette");
const composerAddExpression = document.querySelector("#composerAddExpression");
const composerReset = document.querySelector("#composerReset");
const solveTarget = document.querySelector("#solveTarget");
const languageSelect = document.querySelector("#languageSelect");
const solverSupportBadge = document.querySelector("#solverSupportBadge");
const solverSupportTitle = document.querySelector("#solverSupportTitle");
const solverSupportNote = document.querySelector("#solverSupportNote");
const solverFamilyTag = document.querySelector("#solverFamilyTag");
const structureOutput = document.querySelector("#structureOutput");
const algorithmOutput = document.querySelector("#algorithmOutput");
const pseudocodeOutput = document.querySelector("#pseudocodeOutput");
const codeOutput = document.querySelector("#codeOutput");
const solverOutput = document.querySelector("#solverOutput");
const librarySearch = document.querySelector("#librarySearch");
const libraryCategory = document.querySelector("#libraryCategory");
const libraryDifficulty = document.querySelector("#libraryDifficulty");
const libraryCount = document.querySelector("#libraryCount");
const libraryList = document.querySelector("#libraryList");
const libraryDetailCategory = document.querySelector("#libraryDetailCategory");
const libraryDetailDifficulty = document.querySelector("#libraryDetailDifficulty");
const libraryDetailTitle = document.querySelector("#libraryDetailTitle");
const libraryFormula = document.querySelector("#libraryFormula");
const libraryAccessibleText = document.querySelector("#libraryAccessibleText");
const libraryDescription = document.querySelector("#libraryDescription");
const libraryInputs = document.querySelector("#libraryInputs");
const libraryOutputs = document.querySelector("#libraryOutputs");
const libraryVisualization = document.querySelector("#libraryVisualization");
const libraryVerification = document.querySelector("#libraryVerification");
const librarySolverSupport = document.querySelector("#librarySolverSupport");
const librarySolverTargets = document.querySelector("#librarySolverTargets");
const libraryConcept = document.querySelector("#libraryConcept");
const libraryExampleProblem = document.querySelector("#libraryExampleProblem");
const libraryWorkedExample = document.querySelector("#libraryWorkedExample");
const libraryVerificationSteps = document.querySelector("#libraryVerificationSteps");
const libraryPrerequisites = document.querySelector("#libraryPrerequisites");
const libraryRelatedTopics = document.querySelector("#libraryRelatedTopics");
const libraryApplications = document.querySelector("#libraryApplications");
const libraryStats = document.querySelector("#libraryStats");
const libraryLearningPath = document.querySelector("#libraryLearningPath");
const libraryAlgorithm = document.querySelector("#libraryAlgorithm");
const loadLibraryFormula = document.querySelector("#loadLibraryFormula");
const copyLibraryCode = document.querySelector("#copyLibraryCode");
const verificationReport = document.querySelector("#verificationReport");
const accessibilityNarration = document.querySelector("#accessibilityNarration");
const mathMlOutput = document.querySelector("#mathMlOutput");
const graphAltText = document.querySelector("#graphAltText");
const keyboardGraphGuide = document.querySelector("#keyboardGraphGuide");
const graphExplorerRange = document.querySelector("#graphExplorerRange");
const graphExplorerOutput = document.querySelector("#graphExplorerOutput");
const theoremExplorer = document.querySelector("#theoremExplorer");
const knowledgeGraphPanel = document.querySelector("#knowledgeGraphPanel");
const sandboxBlueprint = document.querySelector("#sandboxBlueprint");
const professorMode = document.querySelector("#professorMode");
const inputIntentPanel = document.querySelector("#inputIntentPanel");
const projectNameInput = document.querySelector("#projectNameInput");
const saveProjectButton = document.querySelector("#saveProjectButton");
const clearProjectsButton = document.querySelector("#clearProjectsButton");

const TWO_PI = Math.PI * 2;
const EPSILON = 1e-6;
const SAMPLE_COUNT = 720;
const state = {
  equation: equationInput.value,
  analysis: null,
  pipeline: null,
  view: "graph",
  frame: 0,
  animationId: null,
  audio: null,
  formulaModel: null,
  composerBlocks: [],
  selectedLibraryId: "rk4_method",
  projects: JSON.parse(localStorage.getItem("equationAliveProjects") || "[]"),
  explorerIndex: 0,
  inputIntent: null,
  currentProjectId: null,
  params: {
    amplitude: 1,
    frequency: 1,
    phase: 0,
    terms: 12,
    radius: 5,
    u: 8,
    a: -1.8,
  },
};

const examples = Array.from(exampleSelect.options).map((option) => option.value);
const formulaLibrary = [
  {
    id: "rk4_method",
    title: "Runge-Kutta 4th Order Method",
    category: "Numerical Methods",
    difficulty: "Advanced",
    formula: "y_{n+1}=y_n + h/6(k1 + 2k2 + 2k3 + k4)",
    description: "A fourth-order numerical method for approximating solutions of ordinary differential equations y' = f(x,y).",
    inputs: ["x0", "y0", "h", "n", "f(x,y)"],
    outputs: ["approximate y value"],
    visualization: ["step curve", "slope field"],
    verification: "Compare with an analytical solution or reduce h and confirm convergence.",
    algorithm: ["Read x0, y0, step size h, number of steps n, and derivative f(x,y).", "For each step compute k1, k2, k3, and k4.", "Update y using weighted average h/6(k1+2k2+2k3+k4).", "Advance x by h.", "Return the final approximation."],
    pseudocode: "FOR i = 1 to n\n  k1 = f(x, y)\n  k2 = f(x+h/2, y+h*k1/2)\n  k3 = f(x+h/2, y+h*k2/2)\n  k4 = f(x+h, y+h*k3)\n  y = y + h*(k1+2*k2+2*k3+k4)/6\n  x = x + h\nEND",
    code: {
      python: "def rk4(f, x0, y0, h, n):\n    x, y = x0, y0\n    for _ in range(n):\n        k1 = f(x, y)\n        k2 = f(x + h/2, y + h*k1/2)\n        k3 = f(x + h/2, y + h*k2/2)\n        k4 = f(x + h, y + h*k3)\n        y += h * (k1 + 2*k2 + 2*k3 + k4) / 6\n        x += h\n    return y",
      javascript: "function rk4(f, x0, y0, h, n) {\n  let x = x0, y = y0;\n  for (let i = 0; i < n; i += 1) {\n    const k1 = f(x, y);\n    const k2 = f(x + h / 2, y + h * k1 / 2);\n    const k3 = f(x + h / 2, y + h * k2 / 2);\n    const k4 = f(x + h, y + h * k3);\n    y += h * (k1 + 2 * k2 + 2 * k3 + k4) / 6;\n    x += h;\n  }\n  return y;\n}",
    },
  },
  {
    id: "euler_method",
    title: "Euler Method",
    category: "Numerical Methods",
    difficulty: "Intermediate",
    formula: "y_{n+1}=y_n + h f(x_n,y_n)",
    description: "First-order method for approximating an ODE by stepping along the local tangent slope.",
    inputs: ["x0", "y0", "h", "n", "f(x,y)"],
    outputs: ["approximate y value"],
    visualization: ["step curve", "slope field"],
    verification: "Check error decreases roughly linearly as h decreases.",
    algorithm: ["Read starting point and step size.", "Evaluate slope at current point.", "Update y by h times slope.", "Advance x.", "Repeat n times."],
    pseudocode: "FOR i = 1 to n\n  y = y + h*f(x,y)\n  x = x + h\nEND",
    code: { python: "def euler(f, x0, y0, h, n):\n    x, y = x0, y0\n    for _ in range(n):\n        y = y + h * f(x, y)\n        x = x + h\n    return y" },
  },
  {
    id: "dijkstra",
    title: "Dijkstra Shortest Path Algorithm",
    category: "Graph Algorithms",
    difficulty: "Advanced",
    formula: "dist[v] = min(dist[v], dist[u] + w(u,v))",
    description: "Finds shortest paths from one source to all vertices in a graph with nonnegative edge weights.",
    inputs: ["graph", "source"],
    outputs: ["distance map", "predecessor map"],
    visualization: ["weighted graph", "frontier expansion"],
    verification: "Every relaxed edge must satisfy dist[v] <= dist[u] + w(u,v).",
    algorithm: ["Initialize all distances to infinity except source = 0.", "Push source into a priority queue.", "Pop the closest unsettled node.", "Relax each outgoing edge.", "Repeat until the queue is empty."],
    pseudocode: "dist[source] = 0\nPUSH source\nWHILE queue not empty\n  u = POP_MIN(queue)\n  FOR each edge u -> v\n    IF dist[u] + w < dist[v]\n      dist[v] = dist[u] + w\n      parent[v] = u\nEND",
    code: { python: "import heapq\n\ndef dijkstra(graph, source):\n    dist = {node: float('inf') for node in graph}\n    dist[source] = 0\n    pq = [(0, source)]\n    while pq:\n        current, u = heapq.heappop(pq)\n        if current > dist[u]:\n            continue\n        for v, w in graph[u]:\n            alt = current + w\n            if alt < dist[v]:\n                dist[v] = alt\n                heapq.heappush(pq, (alt, v))\n    return dist" },
  },
  {
    id: "gradient_descent",
    title: "Gradient Descent",
    category: "Optimization",
    difficulty: "Intermediate",
    formula: "θ_{t+1}=θ_t - α∇J(θ_t)",
    description: "Iteratively updates parameters in the negative gradient direction to minimize a cost function.",
    inputs: ["theta", "alpha", "gradient"],
    outputs: ["optimized parameters"],
    visualization: ["loss curve", "contour path"],
    verification: "Confirm the objective decreases or use a smaller learning rate.",
    algorithm: ["Read initial parameters and learning rate.", "Compute gradient.", "Move parameters opposite the gradient.", "Repeat until convergence."],
    pseudocode: "REPEAT\n  theta = theta - alpha * gradient(theta)\nUNTIL convergence",
    code: { python: "def gradient_descent(theta, alpha, grad, steps):\n    for _ in range(steps):\n        theta = theta - alpha * grad(theta)\n    return theta" },
  },
  {
    id: "kmeans",
    title: "K-means Clustering",
    category: "Machine Learning Mathematics",
    difficulty: "Intermediate",
    formula: "argmin_C Σ_i ||x_i - μ_{c_i}||²",
    description: "Partitions data into k clusters by alternating assignment and centroid update steps.",
    inputs: ["data", "k"],
    outputs: ["centroids", "labels"],
    visualization: ["cluster scatter", "centroid movement"],
    verification: "Within-cluster sum of squares should not increase after an iteration.",
    algorithm: ["Choose k initial centroids.", "Assign each point to the nearest centroid.", "Recompute each centroid as the mean of assigned points.", "Repeat until labels stabilize."],
    pseudocode: "INITIALIZE centroids\nREPEAT\n  assign each point to nearest centroid\n  update centroids by cluster mean\nUNTIL no labels change",
    code: { python: "def kmeans_step(points, centroids):\n    labels = [min(range(len(centroids)), key=lambda i: distance(p, centroids[i])) for p in points]\n    return labels" },
  },
  {
    id: "bayes",
    title: "Bayes Theorem",
    category: "Probability & Statistics",
    difficulty: "Foundation",
    formula: "P(A|B)=P(B|A)P(A)/P(B)",
    description: "Updates the probability of a hypothesis after observing evidence.",
    inputs: ["P(B|A)", "P(A)", "P(B)"],
    outputs: ["P(A|B)"],
    visualization: ["probability tree", "area model"],
    verification: "Posterior probability must remain between 0 and 1.",
    algorithm: ["Read likelihood, prior, and evidence probability.", "Multiply likelihood by prior.", "Divide by evidence probability.", "Return posterior."],
    pseudocode: "posterior = likelihood * prior / evidence",
    code: { python: "def bayes(likelihood, prior, evidence):\n    return likelihood * prior / evidence" },
  },
  {
    id: "fourier_series",
    title: "Fourier Series",
    category: "Signal Processing",
    difficulty: "Advanced",
    formula: "f(x)=a0/2 + Σ(n=1 to ∞)[a_n cos(nx)+b_n sin(nx)]",
    description: "Represents a periodic function as a weighted sum of sine and cosine harmonics.",
    inputs: ["a_n", "b_n", "x", "n"],
    outputs: ["harmonic approximation"],
    visualization: ["waveform", "frequency spectrum", "harmonic construction"],
    verification: "Compare partial sums against sampled function values.",
    algorithm: ["Choose number of harmonics.", "Compute sine and cosine terms.", "Accumulate weighted harmonics.", "Return partial sum."],
    pseudocode: "total = a0/2\nFOR n = 1 to N\n  total += a[n]*cos(n*x) + b[n]*sin(n*x)\nEND",
    code: { python: "import math\n\ndef fourier_partial(a, b, x, N):\n    total = a[0] / 2\n    for n in range(1, N + 1):\n        total += a[n] * math.cos(n*x) + b[n] * math.sin(n*x)\n    return total" },
  },
  {
    id: "matrix_multiplication",
    title: "Matrix Multiplication",
    category: "Linear Algebra",
    difficulty: "Foundation",
    formula: "C_{ij}=Σ(k=1 to n) A_{ik}B_{kj}",
    description: "Computes each entry of a product matrix by dot product of a row and column.",
    inputs: ["A", "B"],
    outputs: ["C"],
    visualization: ["matrix grid", "row-column dot product"],
    verification: "Check dimensions and recompute sample entries manually.",
    algorithm: ["Check columns of A equal rows of B.", "For each output row and column, initialize sum.", "Multiply matching row-column entries.", "Store each sum."],
    pseudocode: "FOR i\n  FOR j\n    C[i][j] = SUM over k of A[i][k]*B[k][j]",
    code: { python: "def matmul(A, B):\n    rows, cols, inner = len(A), len(B[0]), len(B)\n    return [[sum(A[i][k] * B[k][j] for k in range(inner)) for j in range(cols)] for i in range(rows)]" },
  },
  {
    id: "eigenvalue",
    title: "Eigenvalue Equation",
    category: "Linear Algebra",
    difficulty: "Advanced",
    formula: "Av = λv",
    description: "An eigenvector keeps its direction under a linear transformation and is scaled by λ.",
    inputs: ["A", "v"],
    outputs: ["λ", "v"],
    visualization: ["linear transform", "vector field"],
    verification: "Confirm Av and λv are equal within tolerance.",
    algorithm: ["Form characteristic equation det(A-λI)=0.", "Solve for λ.", "For each λ solve (A-λI)v=0.", "Normalize eigenvectors."],
    pseudocode: "roots = solve(det(A - lambda*I) = 0)\nFOR lambda in roots\n  solve nullspace(A - lambda*I)",
    code: { python: "import numpy as np\n\ndef eig(A):\n    return np.linalg.eig(A)" },
  },
  {
    id: "chain_rule",
    title: "Chain Rule",
    category: "Differential Calculus",
    difficulty: "Foundation",
    formula: "d/dx f(g(x)) = f'(g(x))g'(x)",
    description: "Differentiates a composite function by multiplying outer derivative by inner derivative.",
    inputs: ["f", "g", "x"],
    outputs: ["derivative"],
    visualization: ["composition diagram"],
    verification: "Compare with symbolic expansion when possible.",
    algorithm: ["Identify inner function g(x).", "Differentiate outer function at g(x).", "Differentiate inner function.", "Multiply both derivatives."],
    pseudocode: "derivative = outer_prime(inner(x)) * inner_prime(x)",
    code: { python: "def chain_rule(outer_prime, inner, inner_prime, x):\n    return outer_prime(inner(x)) * inner_prime(x)" },
  },
];

const librarySeed = [
  ["limit_definition", "Limit Definition", "Calculus I", "Foundation", "lim(x→a) f(x)=L", "Describes the value approached by a function near a point."],
  ["product_rule", "Product Rule", "Differential Calculus", "Foundation", "(fg)'=f'g+fg'", "Derivative rule for a product of two functions."],
  ["quotient_rule", "Quotient Rule", "Differential Calculus", "Foundation", "(f/g)'=(f'g-fg')/g²", "Derivative rule for a quotient."],
  ["taylor_series", "Taylor Series", "Calculus II", "Advanced", "f(x)=Σ(n=0 to ∞)[f^(n)(a)(x-a)^n/n!]", "Polynomial approximation around a center."],
  ["maclaurin_series", "Maclaurin Series", "Calculus II", "Intermediate", "f(x)=Σ(n=0 to ∞)[f^(n)(0)x^n/n!]", "Taylor series centered at zero."],
  ["integration_by_parts", "Integration by Parts", "Integral Calculus", "Intermediate", "∫u dv = uv - ∫v du", "Integration rule derived from the product rule."],
  ["partial_fractions", "Partial Fractions", "Integral Calculus", "Intermediate", "P(x)/Q(x)=Σ A_i/(x-r_i)", "Decomposes rational functions for integration."],
  ["eulers_theorem", "Euler Theorem", "Calculus II", "Advanced", "e^{ix}=cos(x)+i sin(x)", "Connects exponential and trigonometric functions."],
  ["laplace_transform", "Laplace Transform", "Differential Equations", "Advanced", "F(s)=∫(0 to ∞) e^{-st}f(t)dt", "Transforms time-domain functions into s-domain."],
  ["determinant_2x2", "2x2 Determinant", "Linear Algebra", "Foundation", "det([[a,b],[c,d]])=ad-bc", "Area scale factor of a 2x2 matrix."],
  ["gaussian_elimination", "Gaussian Elimination", "Linear Algebra", "Intermediate", "Ax=b → Ux=c", "Solves linear systems with row operations."],
  ["newton_method", "Newton Method", "Numerical Methods", "Intermediate", "x_{n+1}=x_n-f(x_n)/f'(x_n)", "Root-finding by tangent-line iteration."],
  ["bisection_method", "Bisection Method", "Numerical Methods", "Foundation", "c=(a+b)/2", "Root-finding by repeatedly halving an interval."],
  ["trapezoidal_rule", "Trapezoidal Rule", "Numerical Methods", "Foundation", "∫_a^b f(x)dx≈h/2[f(a)+2Σf(x_i)+f(b)]", "Numerical integration using trapezoids."],
  ["simpson_rule", "Simpson Rule", "Numerical Methods", "Intermediate", "∫_a^b f(x)dx≈h/3[f0+4f1+2f2+...+fn]", "Numerical integration using quadratic arcs."],
  ["mean", "Arithmetic Mean", "Probability & Statistics", "Foundation", "μ=(1/n)Σx_i", "Average value of a dataset."],
  ["variance", "Variance", "Probability & Statistics", "Foundation", "σ²=(1/n)Σ(x_i-μ)²", "Average squared deviation from the mean."],
  ["normal_pdf", "Normal Distribution PDF", "Probability & Statistics", "Intermediate", "f(x)=1/(σ√(2π))e^{-1/2((x-μ)/σ)^2}", "Bell-shaped probability density."],
  ["knn", "K-nearest Neighbor", "Machine Learning Mathematics", "Foundation", "class(x)=mode(labels of k nearest points)", "Classifies by nearest labeled examples."],
  ["linear_regression", "Linear Regression", "Machine Learning Mathematics", "Foundation", "ŷ=Xβ", "Fits a linear model to data."],
  ["logistic_regression", "Logistic Regression", "Machine Learning Mathematics", "Intermediate", "p=1/(1+e^{-z})", "Maps linear score to probability."],
  ["cross_entropy", "Cross Entropy Loss", "Machine Learning Mathematics", "Intermediate", "L=-Σ y log(p)", "Measures prediction probability error."],
  ["pagerank", "PageRank", "Graph Algorithms", "Advanced", "PR(u)=(1-d)/N+dΣ PR(v)/L(v)", "Ranks graph nodes by incoming importance."],
  ["bfs", "Breadth-first Search", "Graph Algorithms", "Foundation", "visit nodes by queue layers", "Explores graph in increasing distance layers."],
  ["dfs", "Depth-first Search", "Graph Algorithms", "Foundation", "visit nodes by recursion/stack", "Explores graph deeply before backtracking."],
  ["newtons_second_law", "Newton's Second Law", "Physics Mathematics", "Foundation", "F=ma", "Relates force, mass, and acceleration."],
  ["kinematic_displacement", "Kinematic Displacement", "Physics Mathematics", "Foundation", "s=ut+1/2at²", "Computes displacement under constant acceleration."],
  ["mass_energy_equivalence", "Mass-Energy Equivalence", "Physics Mathematics", "Foundation", "E=mc²", "Relates energy to mass and the speed of light."],
  ["ohms_law", "Ohm's Law", "Physics Mathematics", "Foundation", "V=IR", "Relates voltage, current, and resistance."],
  ["momentum_relation", "Momentum Relation", "Physics Mathematics", "Foundation", "p=mv", "Relates momentum to mass and velocity."],
  ["hookes_law_seed", "Hooke's Law", "Physics Mathematics", "Foundation", "F=-kx", "Relates restoring force to displacement in a spring."],
  ["pressure_relation", "Pressure Relation", "Physics Mathematics", "Foundation", "P=F/A", "Relates pressure to force over area."],
  ["density_relation", "Density Relation", "Physics Mathematics", "Foundation", "rho=m/V", "Relates density to mass and volume."],
  ["power_relation", "Electric Power Relation", "Physics Mathematics", "Foundation", "P=VI", "Relates electric power to voltage and current."],
  ["kinetic_energy_relation", "Kinetic Energy", "Physics Mathematics", "Foundation", "KE=1/2mv²", "Relates kinetic energy to mass and speed."],
  ["velocity_equation", "Velocity Equation", "Physics Mathematics", "Foundation", "v=u+at", "Relates final velocity to initial velocity, acceleration, and time."],
  ["average_velocity_equation", "Average Velocity Displacement", "Physics Mathematics", "Foundation", "s=(u+v)t/2", "Relates displacement to average velocity over time."],
  ["simple_interest_formula", "Simple Interest", "Optimization", "Foundation", "I=Prt", "Relates simple interest to principal, rate, and time."],
  ["compound_interest_formula", "Compound Interest", "Optimization", "Intermediate", "A=P*(1+r/n)^(n*t)", "Models periodic compounding growth over time."],
  ["circumference_formula", "Circle Circumference", "Physics Mathematics", "Foundation", "C=2*pi*r", "Computes the distance around a circle."],
  ["sphere_volume_formula", "Sphere Volume", "Physics Mathematics", "Intermediate", "V=4/3*pi*r^3", "Computes the volume enclosed by a sphere."],
  ["wave_speed_formula", "Wave Speed", "Physics Mathematics", "Foundation", "v=f*lambda", "Relates wave speed, frequency, and wavelength."],
  ["frequency_period_formula", "Frequency Period Relation", "Signal Processing", "Foundation", "f=1/T", "Converts between cycle frequency and period."],
  ["slope_two_point_formula", "Two-point Slope", "Linear Algebra", "Foundation", "m=(y2-y1)/(x2-x1)", "Computes the slope of a line from two points."],
  ["distance_2d_formula", "2D Distance Formula", "Linear Algebra", "Foundation", "d=sqrt((x2-x1)^2+(y2-y1)^2)", "Computes Euclidean distance between two points."],
  ["gravitational_force_formula", "Newtonian Gravitational Force", "Physics Mathematics", "Advanced", "F=G*m1*m2/r^2", "Computes gravitational attraction between two masses."],
  ["projectile_range_seed", "Projectile Range", "Physics Mathematics", "Intermediate", "R=v²sin(2θ)/g", "Horizontal range of an ideal projectile."],
  ["wave_equation", "Wave Equation", "Physics Mathematics", "Advanced", "∂²u/∂t²=c²∂²u/∂x²", "Models wave propagation."],
  ["heat_equation", "Heat Equation", "Differential Equations", "Advanced", "∂u/∂t=α∂²u/∂x²", "Models diffusion of heat."],
  ["divergence", "Divergence", "Multivariable Calculus", "Intermediate", "∇·F=∂P/∂x+∂Q/∂y+∂R/∂z", "Measures outward flow density."],
  ["gradient", "Gradient", "Multivariable Calculus", "Foundation", "∇f=<∂f/∂x,∂f/∂y,∂f/∂z>", "Vector of steepest increase."],
  ["lagrange_multiplier", "Lagrange Multipliers", "Optimization", "Advanced", "∇f=λ∇g", "Optimizes under equality constraints."],
  ["convolution", "Convolution", "Signal Processing", "Intermediate", "(f*g)(t)=∫f(τ)g(t-τ)dτ", "Combines signals by sliding overlap."],
  ["z_transform", "Z-transform", "Signal Processing", "Advanced", "X(z)=Σ x[n]z^{-n}", "Discrete-time transform for sequences."],
  ["discrete_fourier_transform", "Discrete Fourier Transform", "Signal Processing", "Advanced", "X_k=Σ(n=0 to N-1)x_n e^{-i2πkn/N}", "Converts sampled signals into frequency components."],
  ["nyquist_rate", "Nyquist Sampling Rate", "Signal Processing", "Intermediate", "f_s ≥ 2f_max", "Minimum sampling rate needed to avoid aliasing."],
  ["master_theorem", "Master Theorem", "Discrete Mathematics", "Advanced", "T(n)=aT(n/b)+f(n)", "Solves many divide-and-conquer recurrences."],
  ["inclusion_exclusion", "Inclusion-Exclusion", "Discrete Mathematics", "Intermediate", "|A∪B|=|A|+|B|-|A∩B|", "Counts unions while removing double-counts."],
  ["pigeonhole_principle", "Pigeonhole Principle", "Discrete Mathematics", "Foundation", "n+1 objects in n boxes ⇒ one box has at least 2", "Guarantees repetition under limited containers."],
  ["conditional_probability", "Conditional Probability", "Probability & Statistics", "Foundation", "P(A|B)=P(A∩B)/P(B)", "Probability of A after knowing B occurred."],
  ["central_limit_theorem", "Central Limit Theorem", "Probability & Statistics", "Advanced", "Z=(X̄-μ)/(σ/√n)", "Sample means approach a normal distribution."],
  ["least_squares", "Least Squares Normal Equation", "Optimization", "Intermediate", "XᵀXβ=Xᵀy", "Solves linear regression by minimizing squared residuals."],
  ["jacobian", "Jacobian Matrix", "Multivariable Calculus", "Intermediate", "J_ij=∂f_i/∂x_j", "Matrix of first-order partial derivatives."],
  ["hessian", "Hessian Matrix", "Multivariable Calculus", "Advanced", "H_ij=∂²f/∂x_i∂x_j", "Matrix of second-order partial derivatives."],
  ["separable_ode", "Separable Differential Equation", "Differential Equations", "Intermediate", "dy/dx=g(x)h(y)", "ODE form solved by separating variables."],
  ["logistic_growth", "Logistic Growth", "Differential Equations", "Intermediate", "dP/dt=rP(1-P/K)", "Models bounded population growth."],
  ["markov_chain", "Markov Chain Step", "Probability & Statistics", "Intermediate", "π_{t+1}=π_tP", "Updates state probabilities through a transition matrix."],
  ["softmax", "Softmax Function", "Machine Learning Mathematics", "Intermediate", "softmax(z_i)=e^{z_i}/Σe^{z_j}", "Converts scores into class probabilities."],
  ["backpropagation", "Backpropagation Chain Rule", "Machine Learning Mathematics", "Advanced", "∂L/∂w=∂L/∂a · ∂a/∂z · ∂z/∂w", "Computes neural network gradients layer by layer."],
  ["momentum_optimizer", "Momentum Optimizer", "Optimization", "Advanced", "v_t=βv_{t-1}+α∇J(θ); θ=θ-v_t", "Smooths gradient descent updates."],
  ["projectile_range", "Projectile Range", "Physics Mathematics", "Intermediate", "R=v²sin(2θ)/g", "Horizontal range under ideal projectile motion."],
  ["hookes_law", "Hooke's Law", "Physics Mathematics", "Foundation", "F=-kx", "Restoring force of an ideal spring."],
].map(([id, title, category, difficulty, formula, description]) => ({
  id,
  title,
  category,
  difficulty,
  formula,
  description,
  inputs: ["problem parameters"],
  outputs: ["computed result"],
  visualization: ["formula diagram"],
  verification: "Check assumptions, units, and substitute a sample value.",
  algorithm: ["Identify the known values.", "Substitute values into the formula.", "Simplify step by step.", "Verify the result against constraints."],
  pseudocode: "INPUT known_values\nresult = evaluate_formula(known_values)\nOUTPUT result",
  code: { python: "def evaluate_formula(*values):\n    # Replace with the selected formula computation.\n    return values" },
}));

librarySeed.push(
  ...[
    ["work_formula", "Mechanical Work", "Physics Mathematics", "Foundation", "W = F*d", "Computes work from force and displacement."],
    ["speed_distance_time", "Speed Distance Time", "Physics Mathematics", "Foundation", "v = d/t", "Relates constant speed, distance, and time."],
    ["rectangle_area_formula", "Rectangle Area", "Physics Mathematics", "Foundation", "A = l*w", "Computes area from length and width."],
    ["triangle_area_formula", "Triangle Area", "Physics Mathematics", "Foundation", "A = 1/2*b*h", "Computes area from base and height."],
    ["arithmetic_mean_formula", "Arithmetic Mean", "Probability & Statistics", "Foundation", "mean = sum/n", "Computes average from a total and count."],
    ["percent_change_formula", "Percent Change", "Probability & Statistics", "Foundation", "percent_change = (new-old)/old*100", "Measures relative change from an old value to a new value."],
  ].map(([id, title, category, difficulty, formula, description]) => ({
    id,
    title,
    category,
    difficulty,
    formula,
    description,
    inputs: ["known values"],
    outputs: ["requested unknown"],
    visualization: ["solver card", "verification cards"],
    verification: "Substitute the solved value back into the original formula.",
    algorithm: ["Identify known values and solve target.", "Choose the matching formula arrangement.", "Substitute values.", "Verify by substituting the result back."],
    pseudocode: "INPUT known_values, target\nresult = solve_formula(target, known_values)\nVERIFY result\nOUTPUT result",
    code: { python: "def solve_formula(**values):\n    # Generated workspace code will specialize this template.\n    return values" },
  })),
);

formulaLibrary.push(...librarySeed);

function setError(message) {
  errorBox.hidden = !message;
  errorBox.textContent = message || "";
  statusPill.textContent = message ? "Needs attention" : "Ready";
}

function normalizeEquation(input) {
  return input
    .replace(/[−]/g, "-")
    .replace(/[∑]/g, "Σ")
    .replace(/[π]/g, "pi")
    .replace(/[θ]/g, "theta")
    .replace(/[λ]/g, "lambda")
    .replace(/[μ]/g, "mu")
    .replace(/[σ]/g, "sigma")
    .replace(/[×·]/g, "*")
    .replace(/[÷]/g, "/")
    .replace(/[¹]/g, "^1")
    .replace(/[²]/g, "^2")
    .replace(/[³]/g, "^3")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeForCode(input) {
  return normalizeEquation(input)
    .replace(/\\frac\s*\{([^{}]+)\}\s*\{([^{}]+)\}/g, "($1)/($2)")
    .replace(/√\s*\(([^)]+)\)/g, "sqrt($1)")
    .replace(/\bVI\b/g, "V*I")
    .replace(/\bIR\b/g, "I*R")
    .replace(/\bmc\b/g, "m*c")
    .replace(/\bmv\b/g, "m*v")
    .replace(/\bKE\b/g, "KE")
    .replace(/\brho\b/g, "rho")
    .replace(/\bma\b/g, "m*a")
    .replace(/\but\b/g, "u*t")
    .replace(/\bat\b/g, "a*t")
    .replace(/\bkx\b/g, "k*x")
    .replace(/(\d)\s*([A-Za-z])/g, "$1*$2")
    .replace(/\*at\b/g, "*a*t")
    .replace(/\*ut\b/g, "*u*t")
    .replace(/\*kx\b/g, "*k*x")
    .replace(/\)\s*([A-Za-z])/g, ")*$1")
    .replace(/\s+/g, " ")
    .trim();
}

function hasExplicitSummation(input) {
  return /Σ|∑|\bsigma\s*\(|\bsum\s*\(|Σ\s*\(/i.test(input);
}

function classifyEquation(input) {
  const lower = input.toLowerCase();
  if (/dy\s*\/\s*dx|differentiat|derivative|d\/dx/.test(lower)) return "differentiation request";
  if (hasExplicitSummation(input)) return "finite series equation";
  if (/cases\s*\{|if .*;|≠/.test(lower)) return "piecewise equation";
  if (/\[\[.*\]\]|\bmatrix\b/.test(lower)) return "matrix expression";
  if (/p\(a\|b\)|bayes/.test(lower)) return "probability relation";
  if (/^\s*F\s*=|\bF\s*=\s*m\s*a|\bF\s*=\s*ma\b/.test(input)) return "force equation";
  if (/x\^2\s*\+\s*y\^2|y\^2\s*\+\s*x\^2/.test(lower)) return "geometry circle";
  if (/s\s*=|ut|at\^2|1\/2a/.test(lower)) return "kinematics simulation";
  if (/(sin|cos|tan)/.test(lower)) return "trigonometric function";
  if (/x\^2|x\*\*2/.test(lower)) return "quadratic function";
  if (/x\^3|x\*\*3/.test(lower)) return "polynomial function";
  if (/log|ln/.test(lower)) return "logarithmic function";
  if (/exp|e\^/.test(lower)) return "exponential function";
  return "general function";
}

function parseEquation(input) {
  const normalizedInput = normalizeEquation(input);
  const codeInput = normalizeForCode(normalizedInput);
  const parts = codeInput.split("=");
  const left = parts.length > 1 ? parts[0].trim() : "";
  const right = parts.length > 1 ? parts.slice(1).join("=").trim() : codeInput;
  const equationType = classifyEquation(normalizedInput);
  const parsed = {
    rawInput: input,
    normalizedInput,
    codeInput,
    latex: toCleanLatex(normalizedInput),
    ast: null,
    variables: [],
    constants: [],
    functions: [],
    operators: [],
    equationType,
    isGraphable: false,
    left,
    right,
    errors: [],
  };
  parsed.isGraphable = isGraphableType(parsed.equationType, parsed.left, parsed.variables);

  const astInput = sanitizeForMathParser(right || codeInput);
  const mathApi = window.math || globalThis.math;
  if (mathApi?.parse) {
    try {
      const node = mathApi.parse(astInput);
      const collected = collectMathAst(node);
      parsed.ast = {
        type: node.type,
        expression: node.toString(),
      };
      parsed.variables = mergeUnique([left, ...collected.variables]).filter(Boolean);
      parsed.constants = collected.constants;
      parsed.functions = collected.functions;
      parsed.operators = collected.operators;
      parsed.isGraphable = isGraphableType(parsed.equationType, parsed.left, parsed.variables);
      return parsed;
    } catch (error) {
      parsed.errors.push(error.message);
    }
  } else {
    parsed.errors.push("Math.js parser unavailable; using fallback parser.");
  }

  const fallback = fallbackParseTokens(`${left} ${right}`);
  parsed.ast = {
    type: "FallbackExpression",
    expression: astInput,
  };
  parsed.variables = mergeUnique([left, ...fallback.variables]).filter(Boolean);
  parsed.constants = fallback.constants;
  parsed.functions = fallback.functions;
  parsed.operators = fallback.operators;
  parsed.isGraphable = isGraphableType(parsed.equationType, parsed.left, parsed.variables);
  return parsed;
}

function sanitizeForMathParser(expression) {
  return String(expression || "0")
    .replace(/Math\.PI/g, "pi")
    .replace(/Math\.E/g, "e")
    .replace(/\*\*/g, "^")
    .replace(/\{|\}/g, "")
    .replace(/_/g, "")
    .replace(/([A-Za-z])([0-9]+)/g, "$1$2")
    .trim() || "0";
}

function collectMathAst(node) {
  const data = {
    variables: [],
    constants: [],
    functions: [],
    operators: [],
  };
  node.traverse((child) => {
    if (child.isSymbolNode) {
      const name = child.name;
      if (["pi", "e", "Infinity"].includes(name)) data.constants.push(name);
      else data.variables.push(name);
    }
    if (child.isConstantNode) data.constants.push(String(child.value));
    if (child.isFunctionNode) data.functions.push(child.fn?.name || child.name || "function");
    if (child.isOperatorNode) data.operators.push(child.op);
  });
  return {
    variables: mergeUnique(data.variables),
    constants: mergeUnique(data.constants),
    functions: mergeUnique(data.functions),
    operators: mergeUnique(data.operators),
  };
}

function fallbackParseTokens(expression) {
  const normalized = String(expression || "");
  const reserved = new Set(["sin", "cos", "tan", "sqrt", "log", "ln", "exp", "sum", "sigma", "cases", "if", "to", "Math"]);
  const symbols = normalized.match(/[A-Za-zαβλμσθ]+/g) || [];
  const functions = mergeUnique((normalized.match(/\b(sin|cos|tan|sqrt|log|ln|exp|sum|sigma|cases)\b/g) || []));
  const variables = mergeUnique(symbols.filter((symbol) => !reserved.has(symbol) && !["pi", "e"].includes(symbol) && symbol.length <= 4));
  const constants = mergeUnique([
    ...(normalized.match(/\b\d+(?:\.\d+)?\b/g) || []),
    ...(normalized.match(/\b(pi|e)\b/g) || []),
  ]);
  const operators = mergeUnique(normalized.match(/[+\-*/^=]/g) || []);
  return { variables, constants, functions, operators };
}

function mergeUnique(items) {
  return [...new Set(items.filter((item) => item !== undefined && item !== null && String(item).trim() !== ""))];
}

function extractRightSide(input) {
  const parts = input.split("=");
  return parts.length > 1 ? parts.slice(1).join("=") : input;
}

function transformMathExpression(expression) {
  let output = expression.toLowerCase();
  output = output.replace(/[\[\{]/g, "(").replace(/[\]\}]/g, ")");
  output = output.replace(/\by\s*=/g, "");
  output = output.replace(/\bpi\b/g, "Math.PI");
  output = output.replace(/\be\b/g, "Math.E");
  output = output.replace(/\bln\s*\(/g, "Math.log(");
  output = output.replace(/\blog\s*\(/g, "Math.log10(");
  output = output.replace(/\bsin\s*\(/g, "Math.sin(");
  output = output.replace(/\bcos\s*\(/g, "Math.cos(");
  output = output.replace(/\btan\s*\(/g, "Math.tan(");
  output = output.replace(/\bsqrt\s*\(/g, "Math.sqrt(");
  output = output.replace(/\babs\s*\(/g, "Math.abs(");
  output = output.replace(/\bexp\s*\(/g, "Math.exp(");
  output = output.replace(/(\d|\)|x|k|t|r)(Math\.)/g, "$1*$2");
  output = output.replace(/(\d)([a-zA-Z(])/g, "$1*$2");
  output = output.replace(/(x|k|t|r|\))(\d)/g, "$1*$2");
  output = output.replace(/(x|k|t|r|\))(\()/g, "$1*$2");
  output = output.replace(/(\))(x|k|t|r)/g, "$1*$2");
  output = output.replace(/(x|k|t|r)(x|k|t|r)/g, "$1*$2");
  output = output.replace(/\^/g, "**");
  if (/[^-+*/().,\d\s\w*]/.test(output)) {
    throw new Error("The expression contains unsupported symbols for the MVP parser.");
  }
  return output;
}

function compileExpression(expression) {
  const transformed = transformMathExpression(expression);
  return new Function("x", "k", "t", "r", "u", "a", `"use strict"; return (${transformed});`);
}

function parseSeries(input) {
  const source = normalizeEquation(input).trim();
  const functionStyle = source.match(/^(.*?)\b(?:sum|sigma)\s*\(\s*k\s*=\s*([+-]?\d+)\s*(?:\.\.|to|,)\s*([+-]?\d+)\s*,\s*(.*)\s*\)\s*$/i);
  if (functionStyle) {
    return {
      coefficient: functionStyle[1].trim(),
      start: Number(functionStyle[2]),
      end: Number(functionStyle[3]),
      expression: stripMathGrouping(functionStyle[4]),
    };
  }

  const sigmaParen = source.match(/^(.*?)Σ\s*\(\s*k\s*=\s*([+-]?\d+)\s*(?:\.\.|to|,)\s*([+-]?\d+)\s*\)\s*(.*)$/i);
  if (sigmaParen) {
    return {
      coefficient: sigmaParen[1].trim(),
      start: Number(sigmaParen[2]),
      end: Number(sigmaParen[3]),
      expression: stripMathGrouping(sigmaParen[4]),
    };
  }

  const sigmaScript = source.match(/^(.*?)Σ\s*_\s*(?:\{\s*)?k\s*=\s*([+-]?\d+)\s*(?:\}\s*)?\^\s*(?:\{\s*)?([+-]?\d+)\s*(?:\}\s*)?(.*)$/i);
  if (sigmaScript) {
    return {
      coefficient: sigmaScript[1].trim(),
      start: Number(sigmaScript[2]),
      end: Number(sigmaScript[3]),
      expression: stripMathGrouping(sigmaScript[4]),
    };
  }

  return null;
}

function stripMathGrouping(expression) {
  let output = expression.trim();
  if ((output.startsWith("[") && output.endsWith("]")) || (output.startsWith("{") && output.endsWith("}"))) {
    output = output.slice(1, -1).trim();
  }
  return output;
}

function buildAnalysis(input) {
  const model = typeof input === "string" ? buildFormulaModel(input) : input;
  const normalized = model.normalized;
  const type = model.type;
  const selectedModes = Array.from(document.querySelectorAll(".mode-grid input:checked")).map((inputEl) => inputEl.value);

  if (type === "geometry circle") {
    return buildCircleAnalysis(model, selectedModes);
  }
  if (type === "kinematics simulation") {
    return buildKinematicsAnalysis(model, selectedModes);
  }
  if (type === "finite series equation") {
    return buildSeriesAnalysis(model, selectedModes);
  }
  return buildFunctionAnalysis(model, selectedModes);
}

function buildFunctionAnalysis(model, selectedModes) {
  const expression = model.right || extractRightSide(model.normalized);
  const fn = compileExpression(expression);
  const points = sampleFunction((x) => state.params.amplitude * fn(state.params.frequency * x + state.params.phase, 1, 0, state.params.radius, state.params.u, state.params.a));
  return finalizeAnalysis({
    input: model.normalized,
    type: model.type,
    selectedModes,
    points,
    components: [],
    evaluator: (x) => state.params.amplitude * fn(state.params.frequency * x + state.params.phase, 1, 0, state.params.radius, state.params.u, state.params.a),
    domain: [-Math.PI * 2, Math.PI * 2],
  });
}

function buildSeriesAnalysis(model, selectedModes) {
  const series = parseSeries(extractRightSide(model.normalized));
  if (!series) {
    throw new Error("Use natural series notation like: y = 6 Σ(k=1 to 12) [sin((2k + 1)x)/(2k + 1)]");
  }
  const terms = Math.max(series.start, Math.min(state.params.terms, series.end));
  const coefficientText = String(series.coefficient || "").trim();
  const coefficient = coefficientText ? compileExpression(coefficientText)(1, 1, 0, state.params.radius, state.params.u, state.params.a) : 1;
  const termFn = compileExpression(String(series.expression));
  const evaluator = (x) => {
    let y = 0;
    for (let k = series.start; k <= terms; k += 1) {
      y += termFn(x, k, 0, state.params.radius, state.params.u, state.params.a);
    }
    return coefficient * y;
  };
  const points = sampleFunction(evaluator);
  const components = [];
  for (let k = series.start; k <= Math.min(terms, series.start + 11); k += 1) {
    components.push({
      label: `k=${k}`,
      points: sampleFunction((x) => coefficient * termFn(x, k, 0, state.params.radius, state.params.u, state.params.a), 240),
    });
  }
  return finalizeAnalysis({
    input: model.normalized,
    type: "finite series equation",
    selectedModes,
    points,
    components,
    evaluator,
    domain: [-Math.PI, Math.PI],
    series: { ...series, terms },
  });
}

function buildCircleAnalysis(model, selectedModes) {
  const radiusMatch = model.normalized.match(/=\s*([0-9.]+)/);
  const radius = radiusMatch ? Math.sqrt(Number(radiusMatch[1])) : state.params.radius;
  state.params.radius = Number.isFinite(radius) ? radius : state.params.radius;
  const points = [];
  for (let i = 0; i <= SAMPLE_COUNT; i += 1) {
    const angle = (i / SAMPLE_COUNT) * TWO_PI;
    points.push({ x: Math.cos(angle) * state.params.radius, y: Math.sin(angle) * state.params.radius });
  }
  return finalizeAnalysis({
    input: model.normalized,
    type: "geometry circle",
    selectedModes,
    points,
    components: [],
    evaluator: (x) => Math.sqrt(Math.max(0, state.params.radius ** 2 - x ** 2)),
    domain: [-state.params.radius, state.params.radius],
    geometry: { radius: state.params.radius },
  });
}

function buildKinematicsAnalysis(model, selectedModes) {
  const u = state.params.u;
  const a = state.params.a;
  const points = [];
  const velocity = [];
  for (let i = 0; i <= SAMPLE_COUNT; i += 1) {
    const t = (i / SAMPLE_COUNT) * 10;
    const s = u * t + 0.5 * a * t * t;
    points.push({ x: t, y: s });
    velocity.push({ x: t, y: u + a * t });
  }
  return finalizeAnalysis({
    input: model.normalized,
    type: "kinematics simulation",
    selectedModes,
    points,
    components: [{ label: "velocity", points: velocity }],
    evaluator: (t) => u * t + 0.5 * a * t * t,
    domain: [0, 10],
    physics: { u, a },
  });
}

function sampleFunction(fn, count = SAMPLE_COUNT) {
  const points = [];
  const start = -Math.PI * 2;
  const end = Math.PI * 2;
  for (let i = 0; i <= count; i += 1) {
    const x = start + (i / count) * (end - start);
    const y = fn(x);
    if (Number.isFinite(y)) points.push({ x, y });
  }
  return points;
}

function finalizeAnalysis(data) {
  const audio = normalizeAudio(data.points);
  const analysisWithAudio = { ...data, audio };
  const verification = verifyAnalysis(analysisWithAudio);
  const explanation = generateExplanation(analysisWithAudio, verification);
  return { ...analysisWithAudio, verification, explanation };
}

function verifyAnalysis(analysis) {
  if (!analysis.points.length) {
    return { status: "failed", maxError: Infinity, averageError: Infinity, checks: ["No finite sample points were generated."] };
  }
  const errors = analysis.type === "geometry circle"
    ? analysis.points.map((point) => Math.abs(point.x ** 2 + point.y ** 2 - analysis.geometry.radius ** 2))
    : analysis.points.map((point) => Math.abs(point.y - analysis.evaluator(point.x)));
  const maxError = Math.max(...errors);
  const averageError = errors.reduce((sum, value) => sum + value, 0) / errors.length;
  const checks = [
    `${analysis.points.length} finite sample points generated.`,
    `Max graph error ${formatNumber(maxError)} against epsilon ${EPSILON}.`,
  ];
  if (analysis.audio.length) {
    const maxAudio = Math.max(...analysis.audio.map((value) => Math.abs(value)));
    checks.push(`Audio normalization peak ${formatNumber(maxAudio)} within [-1, 1].`);
  }
  if (analysis.type === "kinematics simulation") {
    checks.push("Velocity and acceleration are derived from s(t) = ut + 1/2at^2.");
  }
  return {
    status: maxError < EPSILON ? "passed" : "review",
    maxError,
    averageError,
    checks,
  };
}

function buildMathPipeline(input) {
  const formulaModel = typeof input === "string" ? buildFormulaModel(input) : input;
  const pipeline = {
    input: formulaModel.original,
    normalized: formulaModel.normalized,
    type: formulaModel.type,
    formulaModel,
    analysis: null,
    graphable: formulaModel.graphable,
    mode: formulaModel.graphable ? "graph" : "symbolic",
    parser: formulaModel.parsedEquation?.errors?.length ? "fallback" : "Math.js",
    issues: [],
    verification: null,
  };

  if (!formulaModel.graphable) {
    pipeline.verification = {
      status: "linked",
      checks: [
        "Formula linked successfully.",
        `Parser: ${pipeline.parser}.`,
        `Detected variables: ${formulaModel.variables.join(", ") || "none"}.`,
      ],
    };
    return pipeline;
  }

  try {
    pipeline.analysis = buildAnalysis(formulaModel);
    pipeline.verification = pipeline.analysis.verification;
  } catch (error) {
    pipeline.mode = "symbolic";
    pipeline.issues.push(error.message);
    pipeline.verification = {
      status: "graph-skipped",
      checks: [
        "Formula linked successfully.",
        `Graph generation skipped: ${error.message}`,
        `Parser: ${pipeline.parser}.`,
      ],
    };
  }

  return pipeline;
}

function normalizeAudio(points) {
  const values = points.map((point) => point.y).filter(Number.isFinite);
  const max = Math.max(1e-9, ...values.map((value) => Math.abs(value)));
  return values.slice(0, 2400).map((value) => value / max);
}

function generateExplanation(analysis, verification) {
  const type = analysis.type;
  const recommendations = [];
  if (type.includes("series")) recommendations.push("combined waveform", "harmonic components", "audio playback", "frequency spectrum");
  else if (type.includes("circle")) recommendations.push("geometry diagram", "radius control", "area and circumference notes");
  else if (type.includes("kinematics")) recommendations.push("motion simulation", "position-time graph", "velocity overlay");
  else recommendations.push("2D graph", "parameter transformation controls", "step-by-step explanation");

  return {
    recommendations,
    steps: [
      `The input is classified as a ${type}.`,
      `The parser samples the equation across a numeric domain and removes non-finite values.`,
      `The visualization engine maps x-values to horizontal position and y-values to vertical position.`,
      `The verification engine recomputes each plotted value and compares it with epsilon ${EPSILON}.`,
      verification.status === "passed" ? "The generated graph passes the current numerical verification." : "The graph rendered, but the verification result should be reviewed.",
    ],
  };
}

function buildFormulaModel(input) {
  const parsedEquation = parseEquation(input);
  const normalized = parsedEquation.normalizedInput;
  const codeNormalized = parsedEquation.codeInput;
  const type = parsedEquation.equationType;
  const left = parsedEquation.left;
  const right = parsedEquation.right;
  const variables = parsedEquation.variables;
  const solveTargets = getSolveTargets({ type, left, variables, normalized });
  const target = solveTarget.value && solveTargets.includes(solveTarget.value) ? solveTarget.value : solveTargets[0] || left || variables[0] || "result";
  const solution = solveForTarget({ type, left, right, target, normalized, codeNormalized });
  const codeExpression = solution.expression || right;
  const inputs = solution.family === "power_rule_derivative" ? ["x"] : orderInputs({ type, normalized }, variables.filter((variable) => variable !== target));

  return {
    original: input,
    normalized,
    codeNormalized,
    cleanLatex: parsedEquation.latex,
    parsedEquation,
    type,
    left,
    right,
    variables,
    solveTargets,
    target,
    solution,
    inputs,
    graphable: parsedEquation.isGraphable,
    structure: {
      left: left || null,
      operator: left ? "=" : null,
      right,
      variables,
      constants: parsedEquation.constants,
      functions: parsedEquation.functions,
      operators: parsedEquation.operators,
      type,
      ast: parsedEquation.ast,
      parser: parsedEquation.errors.length ? "fallback" : "Math.js",
      parserErrors: parsedEquation.errors,
      operations: detectOperations(normalized),
    },
    algorithm: buildAlgorithm(type, target, inputs, codeExpression, solution),
    pseudocode: buildPseudocode(target, inputs, codeExpression, solution),
  };
}

function extractVariables(expression) {
  const matches = expression.match(/[A-Za-zαβ]+/g) || [];
  const reserved = new Set(["sin", "cos", "tan", "sqrt", "log", "ln", "exp", "sum", "sigma", "cases", "if", "to", "Math", "pi", "e"]);
  return [...new Set(matches.filter((item) => !reserved.has(item) && item.length <= 3))];
}

function getSolveTargets(model) {
  const { type, left, variables, normalized } = model;
  if (type === "differentiation request" || /dy\s*\/\s*dx|derivative|differentiate|d\/dx/i.test(normalized)) return ["dy/dx"];
  const family = identifyFormulaFamily({ normalized });
  const template = getSolverTemplate(family);
  if (template?.targets?.length) return template.targets;
  if (type === "finite series equation") return [left || "y"];
  if (type === "piecewise equation") return [left || "fx"];
  if (left) return [left, ...variables.filter((variable) => variable !== left)];
  return variables;
}

function orderInputs(model, inputs) {
  const family = identifyFormulaFamily(model);
  const template = getSolverTemplate(family);
  const preferred = template?.preferredInputs || {
    "finite series equation": ["x", "k", "y"],
  }[model.type];
  if (!preferred) return inputs;
  return [...inputs].sort((a, b) => {
    const ai = preferred.includes(a) ? preferred.indexOf(a) : 99;
    const bi = preferred.includes(b) ? preferred.indexOf(b) : 99;
    return ai - bi;
  });
}

function compactMathText(value) {
  return normalizeForCode(String(value || ""))
    .replace(/\s+/g, "")
    .replace(/0\.5/g, "1/2");
}

const SOLVER_TEMPLATES = {
  force_law: {
    signatures: ["F=m*a"],
    targets: ["F", "m", "a"],
    preferredInputs: ["m", "a", "F"],
    formulas: {
      F: "m*a",
      m: "F/a",
      a: "F/m",
    },
    note(target) {
      return `${target} solved from F = m*a.`;
    },
  },
  kinematics_displacement: {
    signatures: ["s=u*t+1/2*a*t^2"],
    targets: ["s", "u", "a", "t"],
    preferredInputs: ["u", "a", "t", "s"],
    formulas: {
      s: "u*t + 0.5*a*t^2",
      u: "(s - 0.5*a*t^2)/t",
      a: "2*(s - u*t)/(t^2)",
      t: "quadratic_root(0.5*a, u, -s)",
    },
    note(target) {
      return target === "t" ? "Solving for t uses the quadratic formula." : `${target} isolated from s = u*t + 0.5*a*t^2.`;
    },
  },
  circle_area: {
    signatures: ["A=pi*r^2"],
    targets: ["A", "r"],
    preferredInputs: ["r", "A"],
    formulas: {
      A: "pi*r^2",
      r: "sqrt(A/pi)",
    },
    note(target) {
      return `${target} solved from A = pi*r^2.`;
    },
  },
  mass_energy: {
    signatures: ["E=m*c^2", "E=mc^2"],
    targets: ["E", "m", "c"],
    preferredInputs: ["m", "c", "E"],
    formulas: {
      E: "m*c^2",
      m: "E/(c^2)",
      c: "sqrt(E/m)",
    },
    note(target) {
      return `${target} solved from E = m*c^2.`;
    },
  },
  ohms_law: {
    signatures: ["V=I*R", "V=IR"],
    targets: ["V", "I", "R"],
    preferredInputs: ["I", "R", "V"],
    formulas: {
      V: "I*R",
      I: "V/R",
      R: "V/I",
    },
    note(target) {
      return `${target} solved from Ohm's law V = I*R.`;
    },
  },
  momentum: {
    signatures: ["p=m*v", "p=mv"],
    targets: ["p", "m", "v"],
    preferredInputs: ["m", "v", "p"],
    formulas: {
      p: "m*v",
      m: "p/v",
      v: "p/m",
    },
    note(target) {
      return `${target} solved from momentum p = m*v.`;
    },
  },
  hookes_law: {
    signatures: ["F=-k*x", "F=-kx"],
    targets: ["F", "k", "x"],
    preferredInputs: ["k", "x", "F"],
    formulas: {
      F: "-k*x",
      k: "-F/x",
      x: "-F/k",
    },
    note(target) {
      return `${target} solved from Hooke's law F = -k*x.`;
    },
  },
  projectile_range: {
    signatures: ["R=v^2*sin(2*theta)/g", "R=v^2*sin(2θ)/g", "R=v^2sin(2θ)/g", "R=v^2sin(2*theta)/g"],
    targets: ["R", "v", "g"],
    preferredInputs: ["v", "g", "theta", "R"],
    formulas: {
      R: "v^2*sin(2*theta)/g",
      v: "sqrt(R*g/sin(2*theta))",
      g: "v^2*sin(2*theta)/R",
    },
    note(target) {
      return `${target} solved from projectile range R = v^2*sin(2*theta)/g.`;
    },
  },
  average_velocity: {
    signatures: ["s=(u+v)*t/2", "s=(u+v)t/2"],
    targets: ["s", "u", "v", "t"],
    preferredInputs: ["u", "v", "t", "s"],
    formulas: {
      s: "(u+v)*t/2",
      u: "(2*s/t)-v",
      v: "(2*s/t)-u",
      t: "2*s/(u+v)",
    },
    note(target) {
      return `${target} solved from s = (u+v)*t/2.`;
    },
  },
  linear_velocity: {
    signatures: ["v=u+a*t", "v=u+at"],
    targets: ["v", "u", "a", "t"],
    preferredInputs: ["u", "a", "t", "v"],
    formulas: {
      v: "u+a*t",
      u: "v-a*t",
      a: "(v-u)/t",
      t: "(v-u)/a",
    },
    note(target) {
      return `${target} solved from v = u + a*t.`;
    },
  },
  simple_interest: {
    signatures: ["I=P*r*t"],
    targets: ["I", "P", "r", "t"],
    preferredInputs: ["P", "r", "t", "I"],
    formulas: {
      I: "P*r*t",
      P: "I/(r*t)",
      r: "I/(P*t)",
      t: "I/(P*r)",
    },
    note(target) {
      return `${target} solved from I = P*r*t.`;
    },
  },
  pressure: {
    signatures: ["P=F/A"],
    targets: ["P", "F", "A"],
    preferredInputs: ["F", "A", "P"],
    formulas: {
      P: "F/A",
      F: "P*A",
      A: "F/P",
    },
    note(target) {
      return `${target} solved from pressure P = F/A.`;
    },
  },
  density: {
    signatures: ["rho=m/V", "density=m/V"],
    targets: ["rho", "m", "V"],
    preferredInputs: ["m", "V", "rho"],
    formulas: {
      rho: "m/V",
      m: "rho*V",
      V: "m/rho",
    },
    note(target) {
      return `${target} solved from density rho = m/V.`;
    },
  },
  power_law: {
    signatures: ["P=V*I", "P=VI"],
    targets: ["P", "V", "I"],
    preferredInputs: ["V", "I", "P"],
    formulas: {
      P: "V*I",
      V: "P/I",
      I: "P/V",
    },
    note(target) {
      return `${target} solved from power law P = V*I.`;
    },
  },
  kinetic_energy: {
    signatures: ["KE=1/2*m*v^2", "KE=1/2mv^2", "KE=1/2*mv^2", "KE=1/2m*v^2"],
    targets: ["KE", "m", "v"],
    preferredInputs: ["m", "v", "KE"],
    formulas: {
      KE: "0.5*m*v^2",
      m: "2*KE/(v^2)",
      v: "sqrt(2*KE/m)",
    },
    note(target) {
      return `${target} solved from kinetic energy KE = 1/2*m*v^2.`;
    },
  },
  circumference: {
    signatures: ["C=2*pi*r"],
    targets: ["C", "r"],
    preferredInputs: ["r", "C"],
    formulas: {
      C: "2*pi*r",
      r: "C/(2*pi)",
    },
    concept: "Relates a circle's radius to the distance around the circle.",
    note(target) {
      return `${target} solved from circumference C = 2*pi*r.`;
    },
  },
  sphere_volume: {
    signatures: ["V=4/3*pi*r^3", "V=(4/3)*pi*r^3"],
    targets: ["V", "r"],
    preferredInputs: ["r", "V"],
    formulas: {
      V: "(4/3)*pi*r^3",
      r: "((3*V)/(4*pi))^(1/3)",
    },
    concept: "Computes the volume enclosed by a sphere from its radius.",
    note(target) {
      return `${target} solved from sphere volume V = 4/3*pi*r^3.`;
    },
  },
  wave_speed: {
    signatures: ["v=f*lambda", "v=lambda*f"],
    targets: ["v", "f", "lambda"],
    preferredInputs: ["f", "lambda", "v"],
    formulas: {
      v: "f*lambda",
      f: "v/lambda",
      lambda: "v/f",
    },
    concept: "Connects wave speed, frequency, and wavelength.",
    note(target) {
      return `${target} solved from wave speed v = f*lambda.`;
    },
  },
  frequency_period: {
    signatures: ["f=1/T", "T=1/f"],
    targets: ["f", "T"],
    preferredInputs: ["T", "f"],
    formulas: {
      f: "1/T",
      T: "1/f",
    },
    concept: "Converts between frequency and period for repeating motion.",
    note(target) {
      return `${target} solved from reciprocal relation f = 1/T.`;
    },
  },
  slope_two_point: {
    signatures: ["m=(y2-y1)/(x2-x1)"],
    targets: ["m"],
    preferredInputs: ["x1", "y1", "x2", "y2"],
    formulas: {
      m: "(y2-y1)/(x2-x1)",
    },
    concept: "Computes the slope of a line through two points.",
    note(target) {
      return `${target} solved from two-point slope m = (y2-y1)/(x2-x1).`;
    },
  },
  distance_2d: {
    signatures: ["d=sqrt((x2-x1)^2+(y2-y1)^2)"],
    targets: ["d"],
    preferredInputs: ["x1", "y1", "x2", "y2"],
    formulas: {
      d: "sqrt((x2-x1)^2+(y2-y1)^2)",
    },
    concept: "Computes Euclidean distance between two coordinate points.",
    note(target) {
      return `${target} solved from the 2D distance formula.`;
    },
  },
  compound_interest: {
    signatures: ["A=P*(1+r/n)^(n*t)"],
    targets: ["A", "P"],
    preferredInputs: ["P", "r", "n", "t", "A"],
    formulas: {
      A: "P*(1+r/n)^(n*t)",
      P: "A/((1+r/n)^(n*t))",
    },
    concept: "Models growth when interest is compounded periodically.",
    note(target) {
      return `${target} solved from compound interest A = P*(1+r/n)^(n*t).`;
    },
  },
  gravitational_force: {
    signatures: ["F=G*m1*m2/r^2"],
    targets: ["F", "G", "m1", "m2", "r"],
    preferredInputs: ["G", "m1", "m2", "r", "F"],
    formulas: {
      F: "G*m1*m2/(r^2)",
      G: "F*r^2/(m1*m2)",
      m1: "F*r^2/(G*m2)",
      m2: "F*r^2/(G*m1)",
      r: "sqrt(G*m1*m2/F)",
    },
    concept: "Computes gravitational attraction between two masses.",
    note(target) {
      return `${target} solved from Newtonian gravitation F = G*m1*m2/r^2.`;
    },
  },
  work_formula: {
    signatures: ["W=F*d", "W=d*F"],
    targets: ["W", "F", "d"],
    preferredInputs: ["F", "d", "W"],
    formulas: {
      W: "F*d",
      F: "W/d",
      d: "W/F",
    },
    concept: "Computes mechanical work as force applied through a displacement.",
    note(target) {
      return `${target} solved from work W = F*d.`;
    },
  },
  speed_distance_time: {
    signatures: ["v=d/t", "d=v*t", "t=d/v"],
    targets: ["v", "d", "t"],
    preferredInputs: ["d", "t", "v"],
    formulas: {
      v: "d/t",
      d: "v*t",
      t: "d/v",
    },
    concept: "Connects constant speed, distance, and time.",
    note(target) {
      return `${target} solved from speed relation v = d/t.`;
    },
  },
  rectangle_area: {
    signatures: ["A=l*w", "A=w*l", "A=length*width"],
    targets: ["A", "l", "w"],
    preferredInputs: ["l", "w", "A"],
    formulas: {
      A: "l*w",
      l: "A/w",
      w: "A/l",
    },
    concept: "Computes rectangular area from length and width.",
    note(target) {
      return `${target} solved from rectangle area A = l*w.`;
    },
  },
  triangle_area: {
    signatures: ["A=1/2*b*h", "A=0.5*b*h", "A=b*h/2"],
    targets: ["A", "b", "h"],
    preferredInputs: ["b", "h", "A"],
    formulas: {
      A: "0.5*b*h",
      b: "2*A/h",
      h: "2*A/b",
    },
    concept: "Computes triangular area from base and height.",
    note(target) {
      return `${target} solved from triangle area A = 1/2*b*h.`;
    },
  },
  arithmetic_mean: {
    signatures: ["mean=sum/n", "mu=sum/n", "xbar=sum/n"],
    targets: ["mean", "mu", "xbar", "sum", "n"],
    preferredInputs: ["sum", "n", "mean"],
    formulas: {
      mean: "sum/n",
      mu: "sum/n",
      xbar: "sum/n",
      sum: "mean*n",
      n: "sum/mean",
    },
    concept: "Computes the average by dividing a total by the number of observations.",
    note(target) {
      return `${target} solved from arithmetic mean = sum/n.`;
    },
  },
  percent_change: {
    signatures: ["percent_change=(new-old)/old*100", "p=(new-old)/old*100"],
    targets: ["percent_change", "p", "new", "old"],
    preferredInputs: ["old", "new", "percent_change"],
    formulas: {
      percent_change: "(new-old)/old*100",
      p: "(new-old)/old*100",
      new: "old*(1+percent_change/100)",
      old: "new/(1+percent_change/100)",
    },
    concept: "Measures relative change from an old value to a new value.",
    note(target) {
      return `${target} solved from percent change = (new - old)/old * 100.`;
    },
  },
};

function getSolverTemplate(family) {
  return family ? SOLVER_TEMPLATES[family] || null : null;
}

function identifyFormulaFamily(model) {
  const compact = compactMathText(model.normalized);
  for (const [family, template] of Object.entries(SOLVER_TEMPLATES)) {
    if (template.signatures.includes(compact)) return family;
  }
  return null;
}

function linkLibraryToSolverFamilies() {
  formulaLibrary.forEach((item) => {
    const solverFamily = identifyFormulaFamily({ normalized: item.formula });
    const template = getSolverTemplate(solverFamily);
    item.solverFamily = solverFamily || null;
    item.solverTargets = template?.targets || [];
    item.solverSupport = template ? "linked solver" : "reference only";
    item.concept = item.concept || item.description;
    item.exampleProblem = item.exampleProblem || buildExampleProblem(item);
    item.workedExample = item.workedExample || buildWorkedExample(item);
    item.verificationSteps = item.verificationSteps || buildVerificationSteps(item);
    item.prerequisites = item.prerequisites || buildPrerequisites(item);
    item.relatedTopics = item.relatedTopics || buildRelatedTopics(item);
    item.applications = item.applications || buildApplications(item);
  });
}

function buildExampleProblem(item) {
  if (item.solverFamily === "force_law") return "Given mass m = 4 kg and acceleration a = 3 m/s^2, compute the force F.";
  if (item.solverFamily === "circle_area") return "Given a radius r = 5 units, compute the area A of the circle.";
  if (item.solverFamily === "mass_energy") return "Given mass m = 2 kg and the speed of light c, compute the equivalent energy E.";
  if (item.solverFamily === "ohms_law") return "Given current I = 2 A and resistance R = 6 ohms, compute the voltage V.";
  if (item.solverFamily === "momentum") return "Given mass m = 8 kg and velocity v = 5 m/s, compute the momentum p.";
  if (item.solverFamily === "hookes_law") return "Given spring constant k = 12 N/m and displacement x = 0.2 m, compute the restoring force F.";
  if (item.solverFamily === "projectile_range") return "Given launch speed v = 20 m/s, angle theta = 45 degrees, and gravity g = 9.8 m/s^2, compute the range R.";
  if (item.solverFamily === "average_velocity") return "Given initial velocity u = 4 m/s, final velocity v = 10 m/s, and time t = 3 s, compute the displacement s.";
  if (item.solverFamily === "linear_velocity") return "Given u = 5 m/s, a = 2 m/s^2, and t = 4 s, compute the final velocity v.";
  if (item.solverFamily === "simple_interest") return "Given principal P = 1000, rate r = 0.05, and time t = 2 years, compute the simple interest I.";
  if (item.solverFamily === "pressure") return "Given force F = 60 N acting on area A = 3 m^2, compute the pressure P.";
  if (item.solverFamily === "density") return "Given mass m = 12 kg and volume V = 3 m^3, compute the density rho.";
  if (item.solverFamily === "power_law") return "Given voltage V = 12 V and current I = 2 A, compute the electric power P.";
  if (item.solverFamily === "kinetic_energy") return "Given mass m = 4 kg and velocity v = 6 m/s, compute the kinetic energy KE.";
  if (item.solverFamily === "circumference") return "Given radius r = 7 units, compute the circumference C of the circle.";
  if (item.solverFamily === "sphere_volume") return "Given radius r = 3 units, compute the volume V of the sphere.";
  if (item.solverFamily === "wave_speed") return "Given frequency f = 12 Hz and wavelength lambda = 2 m, compute wave speed v.";
  if (item.solverFamily === "frequency_period") return "Given period T = 0.25 s, compute frequency f.";
  if (item.solverFamily === "slope_two_point") return "Given points (2, 3) and (6, 11), compute the slope m.";
  if (item.solverFamily === "distance_2d") return "Given points (1, 2) and (4, 6), compute the distance d.";
  if (item.solverFamily === "compound_interest") return "Given P = 1000, r = 0.06, n = 12, and t = 3, compute final amount A.";
  if (item.solverFamily === "gravitational_force") return "Given two masses m1 and m2 separated by distance r, compute gravitational force F.";
  if (item.solverFamily === "work_formula") return "Given force F = 25 N and displacement d = 4 m, compute mechanical work W.";
  if (item.solverFamily === "speed_distance_time") return "Given distance d = 120 km and time t = 3 h, compute speed v.";
  if (item.solverFamily === "rectangle_area") return "Given length l = 8 and width w = 5, compute rectangle area A.";
  if (item.solverFamily === "triangle_area") return "Given base b = 10 and height h = 6, compute triangle area A.";
  if (item.solverFamily === "arithmetic_mean") return "Given total sum = 84 across n = 7 observations, compute the mean.";
  if (item.solverFamily === "percent_change") return "Given old = 80 and new = 100, compute percent change.";
  if (item.id === "rk4_method") return "Use RK4 with h = 0.1 for y' = x + y, y(0) = 1, to estimate y(0.1).";
  if (item.id === "dijkstra") return "Find the shortest distances from source node A in a weighted graph with nonnegative edges.";
  return `Use ${item.title} on a small example with known input values, then compare the computed result with expectations.`;
}

function buildWorkedExample(item) {
  if (item.solverFamily === "force_law") return "1. Write F = m*a\n2. Substitute m = 4 and a = 3\n3. Compute F = 12 N";
  if (item.solverFamily === "circle_area") return "1. Write A = pi*r^2\n2. Substitute r = 5\n3. Compute A = 25pi square units";
  if (item.solverFamily === "mass_energy") return "1. Write E = m*c^2\n2. Substitute the known mass\n3. Multiply by c^2 to obtain energy";
  if (item.solverFamily === "ohms_law") return "1. Write V = I*R\n2. Substitute I = 2 and R = 6\n3. Compute V = 12 V";
  if (item.solverFamily === "momentum") return "1. Write p = m*v\n2. Substitute m = 8 and v = 5\n3. Compute p = 40 kg*m/s";
  if (item.solverFamily === "hookes_law") return "1. Write F = -k*x\n2. Substitute k = 12 and x = 0.2\n3. Compute F = -2.4 N";
  if (item.solverFamily === "projectile_range") return "1. Write R = v^2*sin(2*theta)/g\n2. Substitute v = 20, theta = 45 degrees, and g = 9.8\n3. Since sin(90 degrees) = 1, compute R ≈ 40.82 m";
  if (item.solverFamily === "average_velocity") return "1. Write s = (u+v)*t/2\n2. Substitute u = 4, v = 10, and t = 3\n3. Compute s = 21 m";
  if (item.solverFamily === "linear_velocity") return "1. Write v = u + a*t\n2. Substitute u = 5, a = 2, and t = 4\n3. Compute v = 13 m/s";
  if (item.solverFamily === "simple_interest") return "1. Write I = P*r*t\n2. Substitute P = 1000, r = 0.05, and t = 2\n3. Compute I = 100";
  if (item.solverFamily === "pressure") return "1. Write P = F/A\n2. Substitute F = 60 and A = 3\n3. Compute P = 20 Pa";
  if (item.solverFamily === "density") return "1. Write rho = m/V\n2. Substitute m = 12 and V = 3\n3. Compute rho = 4 kg/m^3";
  if (item.solverFamily === "power_law") return "1. Write P = V*I\n2. Substitute V = 12 and I = 2\n3. Compute P = 24 W";
  if (item.solverFamily === "kinetic_energy") return "1. Write KE = 1/2*m*v^2\n2. Substitute m = 4 and v = 6\n3. Compute KE = 72 J";
  if (item.solverFamily === "circumference") return "1. Write C = 2*pi*r\n2. Substitute r = 7\n3. Compute C = 14pi units";
  if (item.solverFamily === "sphere_volume") return "1. Write V = 4/3*pi*r^3\n2. Substitute r = 3\n3. Compute V = 36pi cubic units";
  if (item.solverFamily === "wave_speed") return "1. Write v = f*lambda\n2. Substitute f = 12 and lambda = 2\n3. Compute v = 24 m/s";
  if (item.solverFamily === "frequency_period") return "1. Write f = 1/T\n2. Substitute T = 0.25\n3. Compute f = 4 Hz";
  if (item.solverFamily === "slope_two_point") return "1. Write m = (y2-y1)/(x2-x1)\n2. Substitute the two points\n3. Compute m = (11-3)/(6-2) = 2";
  if (item.solverFamily === "distance_2d") return "1. Write d = sqrt((x2-x1)^2+(y2-y1)^2)\n2. Substitute the two points\n3. Compute d = 5";
  if (item.solverFamily === "compound_interest") return "1. Write A = P*(1+r/n)^(n*t)\n2. Substitute P, r, n, and t\n3. Evaluate the exponent n*t and return A";
  if (item.solverFamily === "gravitational_force") return "1. Write F = G*m1*m2/r^2\n2. Substitute masses, distance, and G\n3. Divide by r^2 to compute attraction force";
  if (item.solverFamily === "work_formula") return "1. Write W = F*d\n2. Substitute F = 25 and d = 4\n3. Compute W = 100 J";
  if (item.solverFamily === "speed_distance_time") return "1. Write v = d/t\n2. Substitute d = 120 and t = 3\n3. Compute v = 40 km/h";
  if (item.solverFamily === "rectangle_area") return "1. Write A = l*w\n2. Substitute l = 8 and w = 5\n3. Compute A = 40 square units";
  if (item.solverFamily === "triangle_area") return "1. Write A = 1/2*b*h\n2. Substitute b = 10 and h = 6\n3. Compute A = 30 square units";
  if (item.solverFamily === "arithmetic_mean") return "1. Write mean = sum/n\n2. Substitute sum = 84 and n = 7\n3. Compute mean = 12";
  if (item.solverFamily === "percent_change") return "1. Write percent_change = (new-old)/old*100\n2. Substitute old = 80 and new = 100\n3. Compute percent_change = 25%";
  return item.algorithm.map((step, index) => `${index + 1}. ${step}`).join("\n");
}

function buildVerificationSteps(item) {
  const steps = [
    "Check that the chosen formula matches the problem conditions.",
    "Substitute values carefully and keep units consistent.",
    item.verification,
  ];
  if (item.solverTargets?.length) {
    steps.push(`Confirm the result remains consistent when solving for: ${item.solverTargets.join(", ")}.`);
  }
  return steps.join("\n");
}

function buildPrerequisites(item) {
  if (item.category.includes("Calculus")) return "Function notation, algebraic simplification, and graph interpretation.";
  if (item.category === "Linear Algebra") return "Matrix notation, arithmetic operations, and systems of equations.";
  if (item.category === "Numerical Methods") return "Functions, approximation error, and iterative computation.";
  if (item.category === "Probability & Statistics") return "Basic probability, fractions, and interpretation of events.";
  if (item.category === "Graph Algorithms") return "Graphs, edges, weights, and traversal ideas.";
  if (item.category === "Machine Learning Mathematics") return "Algebra, vectors, and optimization intuition.";
  if (item.category === "Physics Mathematics") return "Units, algebraic rearrangement, and the underlying physical quantities.";
  return "Basic algebra, notation reading, and substitution of known values.";
}

function buildRelatedTopics(item) {
  const topicMap = {
    force_law: "Momentum, Hooke's law, kinematics, energy methods",
    kinematics_displacement: "Velocity equation, projectile motion, average velocity",
    circle_area: "Circumference, geometry of circles, polar coordinates",
    mass_energy: "Relativity, momentum, wave energy",
    ohms_law: "Power law, circuit analysis, resistance networks",
    momentum: "Impulse, Newton's laws, conservation of momentum",
    hookes_law: "Oscillation, energy in springs, simple harmonic motion",
    projectile_range: "Kinematics, trigonometry, optimization of launch angle",
    average_velocity: "Kinematics, displacement-time graphs, velocity-time area",
    linear_velocity: "Acceleration, kinematics, motion graphs",
    simple_interest: "Finance mathematics, percentages, growth models",
    circumference: "Circle area, radius, diameter, arc length",
    sphere_volume: "Surface area, geometry solids, scaling laws",
    wave_speed: "Frequency, wavelength, oscillation, signal processing",
    frequency_period: "Periodic motion, angular frequency, waves",
    slope_two_point: "Linear functions, rate of change, graph interpretation",
    distance_2d: "Coordinate geometry, vectors, Pythagorean theorem",
    compound_interest: "Exponential growth, finance mathematics, logarithms",
    gravitational_force: "Newton's laws, orbital mechanics, inverse-square laws",
    work_formula: "Energy, force diagrams, displacement, mechanics",
    speed_distance_time: "Velocity, motion graphs, unit conversion",
    rectangle_area: "Perimeter, coordinate geometry, measurement",
    triangle_area: "Geometry, trigonometry, vector cross products",
    arithmetic_mean: "Median, variance, descriptive statistics",
    percent_change: "Ratios, growth models, finance mathematics",
  };
  return topicMap[item.solverFamily] || `${item.category}, verification methods, and implementation patterns around ${item.title}.`;
}

function buildApplications(item) {
  const appMap = {
    force_law: "Motion prediction, mechanics simulation, engineering estimation",
    kinematics_displacement: "Vehicle motion, falling-body problems, classroom simulation",
    circle_area: "Geometry measurement, design dimensions, physical area estimation",
    mass_energy: "Physics education, energy conversion concepts, scientific modeling",
    ohms_law: "Basic circuits, electronics learning, sensor calculations",
    momentum: "Collision analysis, motion systems, sports physics",
    hookes_law: "Spring systems, material response, oscillation models",
    projectile_range: "Ballistics education, game physics, launch optimization",
    average_velocity: "Motion summaries, travel estimation, acceleration comparisons",
    linear_velocity: "Mechanics, simulation step updates, velocity forecasting",
    simple_interest: "Financial literacy, classroom finance models, loan estimation",
    pressure: "Fluid mechanics, structural loading, contact-force estimation",
    density: "Material science, buoyancy intuition, mass-volume comparison",
    power_law: "Electronics learning, circuit budgeting, device power estimation",
    kinetic_energy: "Mechanics, collision studies, energy-based modeling",
    circumference: "Geometry measurement, circular design, wheel travel estimation",
    sphere_volume: "3D geometry, container sizing, scientific measurement",
    wave_speed: "Sound waves, electromagnetic waves, signal timing",
    frequency_period: "Oscillations, audio signals, repeating events",
    slope_two_point: "Line fitting, graph reading, rate calculation",
    distance_2d: "Navigation, geometry, game coordinate systems",
    compound_interest: "Savings estimates, loan growth, investment simulation",
    gravitational_force: "Astronomy, orbital simulation, physics education",
    work_formula: "Mechanical systems, energy calculations, engineering estimation",
    speed_distance_time: "Travel planning, simulation, motion exercises",
    rectangle_area: "Floor plans, UI layout, surface measurement",
    triangle_area: "Geometry learning, graphics meshes, surveying",
    arithmetic_mean: "Data summaries, grading, dashboard metrics",
    percent_change: "Analytics, finance, experiment comparison",
  };
  return appMap[item.solverFamily] || "Learning, worked examples, quick verification, and starter code generation.";
}

function parseDerivativeRequest(model) {
  const source = normalizeForCode(model.normalized || model.original || "");
  const sentenceMatch = source.match(/(?:if\s+)?y\s*=\s*([^,;]+?)\s*,?\s*then\s*(?:dy\s*\/\s*dx|d\s*\/\s*dx)/i);
  if (sentenceMatch) return parsePowerRuleTerm(sentenceMatch[1]);
  const derivativeMatch = source.match(/(?:dy\s*\/\s*dx|d\s*\/\s*dx|derivative(?:\s+of)?|differentiate)\s*[:=]?\s*(.+)$/i);
  const expressionSource = derivativeMatch ? derivativeMatch[1] : source;
  const right = extractRightSide(expressionSource).trim();
  return parsePowerRuleTerm(right || expressionSource);
}

function parsePowerRuleTerm(expression) {
  const clean = normalizeForCode(expression)
    .replace(/\s+/g, "")
    .replace(/\*\*/g, "^")
    .replace(/^\((.*)\)$/, "$1");
  const match = clean.match(/^([+-]?(?:\d+(?:\.\d+)?|\.\d+)?)\*?x(?:\^([+-]?\d+(?:\.\d+)?))?$/i);
  if (!match) return null;
  const coefficientText = match[1];
  const coefficient = coefficientText === "" || coefficientText === "+" ? 1 : coefficientText === "-" ? -1 : Number(coefficientText);
  const exponent = match[2] === undefined ? 1 : Number(match[2]);
  if (!Number.isFinite(coefficient) || !Number.isFinite(exponent)) return null;
  const derivativeCoefficient = coefficient * exponent;
  const derivativeExponent = exponent - 1;
  return {
    coefficient,
    exponent,
    derivativeCoefficient,
    derivativeExponent,
    originalExpression: `${formatCoefficient(coefficient)}x${exponent === 1 ? "" : `^${formatNumber(exponent)}`}`,
    derivativeExpression: formatPowerDerivative(derivativeCoefficient, derivativeExponent),
    ruleStep: `dy/dx = ${formatNumber(exponent)} * ${formatCoefficient(coefficient)}x^(${formatNumber(exponent)}-1) = ${formatPowerDerivative(derivativeCoefficient, derivativeExponent)}`,
  };
}

function formatCoefficient(value) {
  if (value === 1) return "";
  if (value === -1) return "-";
  return formatNumber(value);
}

function formatPowerDerivative(coefficient, exponent) {
  if (Math.abs(coefficient) < EPSILON) return "0";
  const coeff = formatNumber(coefficient);
  if (Math.abs(exponent) < EPSILON) return coeff;
  if (Math.abs(exponent - 1) < EPSILON) return `${coeff}*x`;
  return `${coeff}*x^${formatNumber(exponent)}`;
}

function solveForTarget(model) {
  const { type, left, right, target } = model;
  const family = identifyFormulaFamily(model);
  const template = getSolverTemplate(family);
  const derivative = parseDerivativeRequest(model);
  if (derivative) {
    return {
      target: "dy/dx",
      expression: derivative.derivativeExpression,
      note: `Power rule: ${derivative.ruleStep}.`,
      supported: true,
      family: "power_rule_derivative",
      derivative,
    };
  }
  if (type === "finite series equation") {
    const series = parseSeries(extractRightSide(model.normalized));
    return {
      target: left || "y",
      expression: series ? `${series.coefficient || 1} * sum(${series.expression}, k=${series.start}..${series.end})` : right,
      note: "Evaluate each term over k, accumulate the sum, then apply the coefficient.",
      supported: true,
      family: "finite_series",
    };
  }
  if (type === "piecewise equation") {
    return { target: left || "fx", expression: model.normalized.split("=").slice(1).join("=").trim(), note: "Evaluate conditions in order and return the matching branch.", supported: true, family: "piecewise" };
  }
  if (template?.formulas?.[target]) {
    return {
      target,
      expression: template.formulas[target],
      note: template.note ? template.note(target) : `${target} solved from ${family}.`,
      supported: true,
      family,
    };
  }
  if (left && target === left) {
    return {
      target,
      expression: right,
      note: `${left} can be evaluated directly from the right side.`,
      supported: true,
      family: family || "direct_evaluation",
    };
  }
  if (left && target !== left) {
    return {
      target,
      expression: `unsupported_target(${target})`,
      note: `Automatic isolation for ${target} is not available for this formula yet.`,
      supported: false,
      family: family || "unsupported_symbolic",
    };
  }
  return {
    target: target || left || "result",
    expression: right,
    note: "Expression is converted into executable steps.",
    supported: true,
    family: family || "general_expression",
  };
}

function detectOperations(input) {
  const operations = [];
  if (hasExplicitSummation(input)) operations.push("summation");
  if (/sin|cos|tan/i.test(input)) operations.push("trigonometric function");
  if (/√|sqrt/i.test(input)) operations.push("root");
  if (/∫|integral/i.test(input)) operations.push("integral");
  if (/\//.test(input)) operations.push("division");
  if (/\^|²|³/.test(input)) operations.push("power");
  if (/cases|if|≠/.test(input)) operations.push("piecewise condition");
  if (/\[\[.*\]\]/.test(input)) operations.push("matrix layout");
  if (/[*/]|[A-Za-z]\s*[A-Za-z]/.test(input)) operations.push("multiplication");
  return operations.length ? operations : ["direct expression"];
}

function isGraphableType(type, left, variables = []) {
  if (["finite series equation", "geometry circle", "kinematics simulation"].includes(type)) return true;
  if (!["trigonometric function", "quadratic function", "polynomial function", "logarithmic function", "exponential function", "general function"].includes(type)) return false;
  if (left === "F") return false;
  return variables.includes("x");
}

function formatDisplayMath(input) {
  return String(input || "")
    .replace(/\bargmin_([A-Za-z])/g, "argmin_$1")
    .replace(/(\d)([A-Za-z])(\d+)\b/g, "$1$2_$3")
    .replace(/\b([A-Za-z]+)(\d+)\b/g, "$1_$2")
    .replace(/\b([A-Za-z])_(\d+)\b/g, "$1_{$2}")
    .replace(/\b([A-Za-z])_([A-Za-z]+\+\d+)\b/g, "$1_{$2}")
    .replace(/\b([A-Za-z])_([A-Za-z][A-Za-z0-9]*)\b/g, "$1_{$2}")
    .replace(/\bdist\[([^\]]+)\]/g, "dist($1)")
    .replace(/\|\|/g, "‖")
    .replace(/P\(([^|]+)\|([^)]+)\)/g, "P($1 ∣ $2)")
    .replace(/Σ_([A-Za-z])\b/g, "Σ($1)")
    .trim();
}

function formatTextbookMath(input) {
  return formatDisplayMath(input)
    .replace(/\bmod\b/g, " mod ")
    .replace(/root\(([^,]+),\s*([^)]+)\)/g, "√[$1]($2)")
    .replace(/vec\(([^)]+)\)/g, "→$1")
    .replace(/hat\(([^)]+)\)/g, "$1̂")
    .replace(/bar\(([^)]+)\)/g, "$1̄")
    .replace(/\s+/g, " ")
    .trim();
}

function latexifyMatrices(input) {
  return String(input || "").replace(/\[\[([^\]]+)\],\s*\[([^\]]+)\]\]/g, (_, rowA, rowB) => {
    const firstRow = rowA.split(",").map((cell) => cell.trim()).join(" & ");
    const secondRow = rowB.split(",").map((cell) => cell.trim()).join(" & ");
    return `\\begin{bmatrix} ${firstRow} \\\\ ${secondRow} \\end{bmatrix}`;
  });
}

function latexifyCases(input) {
  return String(input || "").replace(/cases\{([^{}]+?)\s+if\s+([^;]+);\s*([^{}]+?)\s+if\s+([^}]+)\}/g, (_, firstExpr, firstCond, secondExpr, secondCond) => {
    return `\\begin{cases} ${firstExpr.trim()} & \\text{if } ${firstCond.trim()} \\\\ ${secondExpr.trim()} & \\text{if } ${secondCond.trim()} \\end{cases}`;
  });
}

function toCleanLatex(input) {
  let output = latexifyCases(latexifyMatrices(formatDisplayMath(input)))
    .replace(/π/g, "\\pi")
    .replace(/\bpi\b/g, "\\pi")
    .replace(/\btheta\b/g, "\\theta")
    .replace(/\blambda\b/g, "\\lambda")
    .replace(/\bmu\b/g, "\\mu")
    .replace(/\bsigma\b/g, "\\sigma")
    .replace(/\bmod\b/g, "\\bmod")
    .replace(/vec\(([^)]+)\)/g, "\\vec{$1}")
    .replace(/hat\(([^)]+)\)/g, "\\hat{$1}")
    .replace(/bar\(([^)]+)\)/g, "\\bar{$1}")
    .replace(/√\(([^)]+)\)/g, "\\sqrt{$1}")
    .replace(/root\(([^,]+),\s*([^)]+)\)/g, "\\sqrt[$1]{$2}")
    .replace(/1\/2/g, "\\frac{1}{2}")
    .replace(/([A-Za-z0-9_{}\\]+)\/([A-Za-z0-9_{}\\]+)/g, "\\frac{$1}{$2}")
    .replace(/([A-Za-z])_\{([^}]+)\}/g, "$1_{$2}")
    .replace(/([A-Za-z])_(\d+)/g, "$1_{$2}")
    .replace(/\b([A-Za-z])(\d+)\b/g, "$1_{$2}")
    .replace(/\^2/g, "^{2}")
    .replace(/\^3/g, "^{3}")
    .replace(/Σ\(k=([0-9-]+) to ([0-9-]+)\)\s*\[([^\]]+)\]/g, "\\sum_{k=$1}^{$2} $3")
    .replace(/Σ\(n=([0-9-]+) to ([^)]+)\)\s*\[([^\]]+)\]/g, "\\sum_{n=$1}^{$2} $3")
    .replace(/Σ\(([^)]+)\)/g, "\\sum_{$1}")
    .replace(/argmin_([A-Za-z])/g, "\\operatorname*{arg\\,min}_{$1}")
    .replace(/dist\(([^)]+)\)/g, "\\operatorname{dist}\\!\\left($1\\right)")
    .replace(/min\(([^)]+)\)/g, "\\min\\left($1\\right)")
    .replace(/sin\(([^)]+)\)/g, "\\sin\\left($1\\right)")
    .replace(/cos\(([^)]+)\)/g, "\\cos\\left($1\\right)")
    .replace(/tan\(([^)]+)\)/g, "\\tan\\left($1\\right)")
    .replace(/f\(([^)]+)\)/g, "f\\left($1\\right)")
    .replace(/P\(([^∣]+) ∣ ([^)]+)\)/g, "P\\left($1 \\mid $2\\right)")
    .replace(/‖([^‖]+)‖/g, "\\lVert $1 \\rVert")
    .replace(/([A-Za-z])\s*\\left\(([A-Za-z])\\right\)/g, "$1\\left($2\\right)")
    .replace(/∞/g, "\\infty")
    .replace(/θ/g, "\\theta")
    .replace(/α/g, "\\alpha")
    .replace(/β/g, "\\beta")
    .replace(/λ/g, "\\lambda")
    .replace(/μ/g, "\\mu")
    .replace(/σ/g, "\\sigma")
    .replace(/∇/g, "\\nabla")
    .replace(/∂/g, "\\partial")
    .replace(/≈/g, "\\approx")
    .replace(/≥/g, "\\ge")
    .replace(/≤/g, "\\le")
    .replace(/≠/g, "\\ne")
    .replace(/→/g, "\\to");
  output = output
    .replace(/\s+/g, " ")
    .trim();
  return output;
}

function buildAlgorithm(type, target, inputs, expression, solution = {}) {
  const title = readableTarget(target);
  const lines = [`Algorithm: Calculate ${title}`, "", "Input:"];
  if (inputs.length) inputs.forEach((input) => lines.push(`- ${input}`));
  else lines.push("- formula values");
  const template = getSolverTemplate(solution.family);
  if (template?.concept) {
    lines.push("", "Formula family:", `- ${template.concept}`);
  }
  lines.push("", "Steps:");
  if (expression.startsWith("unsupported_target(")) {
    lines.push("1. Read the currently known formula values.");
    lines.push("2. Check whether this formula has a stored symbolic rearrangement.");
    lines.push(`3. Stop and report that ${target} cannot be isolated automatically yet.`);
    lines.push("4. Suggest solving it manually or adding a new solver template.");
    return lines.join("\n");
  }
  if (solution.family === "power_rule_derivative") {
    const derivative = solution.derivative;
    lines.push("1. Identify the monomial as y = a*x^n.");
    lines.push(`2. Read coefficient a = ${formatNumber(derivative.coefficient)} and exponent n = ${formatNumber(derivative.exponent)}.`);
    lines.push("3. Apply the power rule: d/dx(a*x^n) = n*a*x^(n-1).");
    lines.push(`4. Multiply n*a = ${formatNumber(derivative.derivativeCoefficient)}.`);
    lines.push(`5. Reduce the exponent n-1 = ${formatNumber(derivative.derivativeExponent)}.`);
    lines.push(`6. Return dy/dx = ${derivative.derivativeExpression}.`);
  } else if (type === "finite series equation") {
    lines.push("1. Read the coefficient, start index, end index, and variable value.");
    lines.push("2. Initialize total = 0.");
    lines.push("3. For each k in the finite range, evaluate the term.");
    lines.push("4. Add the term to total.");
    lines.push(`5. Return ${target} = coefficient * total.`);
  } else if (type === "piecewise equation") {
    lines.push("1. Read all condition variables.");
    lines.push("2. Test the first condition.");
    lines.push("3. Return the expression for the first matching branch.");
    lines.push("4. If no condition matches, return the fallback branch.");
  } else {
    lines.push(`1. Read ${inputs.join(", ") || "the required values"}.`);
    lines.push("2. Validate that denominators and square-root inputs are allowed for the chosen formula.");
    lines.push(`3. Evaluate the expression: ${expression}.`);
    lines.push(`4. Store the result as ${target}.`);
    lines.push(`5. Return ${target}.`);
  }
  if (solution.note) {
    lines.push("", "Verification:");
    lines.push(`- ${solution.note}`);
    lines.push("- Substitute the result back into the original formula and check consistency.");
  }
  return lines.join("\n");
}

function buildPseudocode(target, inputs, expression, solution = {}) {
  const lines = ["START"];
  if (solution.family && !["direct_evaluation", "general_expression"].includes(solution.family)) {
    lines.push(`FORMULA_FAMILY ${solution.family}`);
  }
  inputs.forEach((input) => lines.push(`INPUT ${input}`));
  if (expression.startsWith("unsupported_target(")) {
    lines.push(`OUTPUT "Automatic isolation for ${target} is not available yet"`);
    lines.push("END");
    return lines.join("\n");
  }
  if (solution.family === "power_rule_derivative") {
    lines.push("INPUT coefficient a");
    lines.push("INPUT exponent n");
    lines.push("derivative_coefficient = a * n");
    lines.push("derivative_exponent = n - 1");
    lines.push("dy_dx = derivative_coefficient * x ^ derivative_exponent");
    lines.push("OUTPUT dy_dx");
    lines.push("END");
    return lines.join("\n");
  }
  lines.push("VALIDATE inputs");
  lines.push(`${target} = ${expression}`);
  lines.push("VERIFY result against original formula");
  lines.push(`OUTPUT ${target}`);
  lines.push("END");
  return lines.join("\n");
}

function generateCode(model, language) {
  if (String(model.solution.expression || "").startsWith("unsupported_target(")) {
    const message = `Automatic isolation for ${model.target} is not available for this formula yet.`;
    if (language === "python") return `def calculate_${sanitizeIdentifier(model.target)}(*_values):\n    raise NotImplementedError("${message}")`;
    if (language === "javascript" || language === "typescript") return `function ${camelName(functionName(model.target))}() {\n  throw new Error("${message}");\n}`;
    return `UNSUPPORTED: ${message}`;
  }
  if (model.type === "finite series equation") return generateSeriesCode(model, language);
  if (model.type === "piecewise equation") return generatePiecewiseCode(model, language);
  if (model.solution.family === "power_rule_derivative") {
    const expression = expressionForLanguage(model.solution.expression, language);
    if (language === "python") return `def derivative(x: float) -> float:\n    return ${expression}`;
    if (language === "javascript" || language === "typescript") return `function derivative(x) {\n  return ${expression};\n}`;
    return `derivative(x) = ${model.solution.expression}`;
  }

  const name = functionName(model.target);
  const params = model.inputs.length ? model.inputs : ["value"];
  const expression = expressionForLanguage(model.solution.expression, language);
  const target = sanitizeIdentifier(model.target);
  const pythonPrefix = language === "python" && expression.includes("math.") ? "import math\n\n" : "";
  const signatures = {
    python: `${pythonPrefix}def ${name}(${params.map((p) => `${sanitizeIdentifier(p)}: float`).join(", ")}) -> float:\n    return ${expression}`,
    javascript: `function ${camelName(name)}(${params.map(sanitizeIdentifier).join(", ")}) {\n  return ${expression};\n}`,
    typescript: `function ${camelName(name)}(${params.map((p) => `${sanitizeIdentifier(p)}: number`).join(", ")}): number {\n  return ${expression};\n}`,
    java: `public static double ${camelName(name)}(${params.map((p) => `double ${sanitizeIdentifier(p)}`).join(", ")}) {\n    return ${expression};\n}`,
    cpp: `double ${camelName(name)}(${params.map((p) => `double ${sanitizeIdentifier(p)}`).join(", ")}) {\n    return ${expression};\n}`,
    matlab: `function ${target} = ${camelName(name)}(${params.map(sanitizeIdentifier).join(", ")})\n${target} = ${expression};\nend`,
    r: `${camelName(name)} <- function(${params.map(sanitizeIdentifier).join(", ")}) {\n  ${expression}\n}`,
    dart: `double ${camelName(name)}(${params.map((p) => `double ${sanitizeIdentifier(p)}`).join(", ")}) {\n  return ${expression};\n}`,
    swift: `func ${camelName(name)}(${params.map((p) => `${sanitizeIdentifier(p)}: Double`).join(", ")}) -> Double {\n    return ${expression}\n}`,
    kotlin: `fun ${camelName(name)}(${params.map((p) => `${sanitizeIdentifier(p)}: Double`).join(", ")}): Double {\n    return ${expression}\n}`,
  };
  return signatures[language] || signatures.python;
}

function generateSeriesCode(model, language) {
  const series = parseSeries(extractRightSide(model.normalized));
  if (!series) return generateCode({ ...model, type: "general function" }, language);
  const coeff = series.coefficient || "1";
  const term = expressionForLanguage(series.expression, language);
  const target = sanitizeIdentifier(model.target || "y");
  if (language === "python") return `import math\n\ndef calculate_series(x: float) -> float:\n    total = 0.0\n    for k in range(${series.start}, ${series.end + 1}):\n        total += ${term}\n    return (${coeff}) * total`;
  if (language === "javascript" || language === "typescript") return `function calculateSeries(x${language === "typescript" ? ": number" : ""})${language === "typescript" ? ": number" : ""} {\n  let total = 0;\n  for (let k = ${series.start}; k <= ${series.end}; k += 1) {\n    total += ${term};\n  }\n  return (${coeff}) * total;\n}`;
  return `${target} = 0\nfor k = ${series.start} to ${series.end}\n  ${target} = ${target} + ${term}\nreturn (${coeff}) * ${target}`;
}

function generatePiecewiseCode(model, language) {
  if (language === "python") return `def evaluate_piecewise(a, alpha, beta):\n    if a == beta:\n        return alpha\n    return beta`;
  if (language === "javascript" || language === "typescript") return `function evaluatePiecewise(a, alpha, beta) {\n  if (a === beta) return alpha;\n  return beta;\n}`;
  return `if condition is true\n  return first branch\nelse\n  return second branch`;
}

function expressionForLanguage(expression, language) {
  let output = normalizeForCode(String(expression || "0")).replace(/\^/g, "**");
  if (language !== "python") {
    output = output.replace(/\bpi\b/g, "Math.PI").replace(/\be\b/g, "Math.E");
    output = output.replace(/\(([^()]+)\)\s*\*\*\s*\(([^()]+)\)/g, "Math.pow(($1), ($2))");
    output = output.replace(/\(([^()]+)\)\s*\*\*\s*([A-Za-z0-9_.]+)/g, "Math.pow(($1), $2)");
    output = output.replace(/([A-Za-z0-9_.()]+)\s*\*\*\s*([A-Za-z0-9_.()]+)/g, "Math.pow($1, $2)");
    output = output.replace(/\bsin\(/g, "Math.sin(").replace(/\bcos\(/g, "Math.cos(").replace(/\btan\(/g, "Math.tan(").replace(/\bsqrt\(/g, "Math.sqrt(");
  } else {
    output = output.replace(/\bpi\b/g, "math.pi").replace(/\be\b/g, "math.e");
    output = output.replace(/\bsin\(/g, "math.sin(").replace(/\bcos\(/g, "math.cos(").replace(/\btan\(/g, "math.tan(").replace(/\bsqrt\(/g, "math.sqrt(");
  }
  return output;
}

function readableTarget(target) {
  const names = { s: "displacement", F: "force", m: "mass", a: "acceleration", u: "initial velocity", t: "time", y: "y value" };
  return names[target] || target || "result";
}

function functionName(target) {
  return `calculate_${readableTarget(target).replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, "") || "result"}`;
}

function camelName(name) {
  return name.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
}

function sanitizeIdentifier(value) {
  const fallback = "value";
  return String(value || fallback).replace(/[^A-Za-z0-9_]/g, "") || fallback;
}

function getSolverPresentation(model) {
  const solution = model.solution || {};
  if (solution.supported === false) {
    return {
      badge: "Needs template",
      support: "unsupported",
      title: `Automatic solve for ${model.target} is not available yet`,
      note: solution.note || "This formula can be stored and added as a solver template later.",
    };
  }

  if (solution.family === "direct_evaluation" || solution.family === "general_expression") {
    return {
      badge: "Direct",
      support: "direct",
      title: `${model.left || model.target} can be evaluated directly`,
      note: solution.note || "The system can evaluate the right side without rearranging the formula.",
    };
  }

  return {
    badge: "Solved",
    support: "solved",
    title: `${model.target} has a stored solver path`,
    note: solution.note || "The system knows how to isolate and compute this target.",
  };
}

const composerTemplateFactories = {
  expression: () => ({ type: "expression", label: "Expression", prefix: "", value: "" }),
  fraction: () => ({ type: "fraction", label: "Fraction", prefix: "", numerator: "a", denominator: "b" }),
  power: () => ({ type: "power", label: "Power", prefix: "", base: "x", exponent: "2" }),
  subscript: () => ({ type: "subscript", label: "Subscript", prefix: "", base: "a", subscript: "n+1" }),
  root: () => ({ type: "root", label: "Root", prefix: "", radicand: "x", index: "" }),
  sum: () => ({ type: "sum", label: "Summation", prefix: "", variable: "k", start: "1", end: "n", body: "sin(kx)/k" }),
  integral: () => ({ type: "integral", label: "Integral", prefix: "", lower: "a", upper: "b", integrand: "f(x)", differential: "x" }),
  limit: () => ({ type: "limit", label: "Limit", prefix: "", variable: "x", approach: "a", expression: "f(x)" }),
  vector: () => ({ type: "vector", label: "Vector accent", prefix: "", notation: "vec", value: "AB" }),
  matrix: () => ({ type: "matrix", label: "Matrix", prefix: "", rows: "a11, a12; a21, a22" }),
  cases: () => ({ type: "cases", label: "Cases", prefix: "", rows: "α if a = b; β if a ≠ b" }),
  aligned: () => ({ type: "aligned", label: "Aligned equations", prefix: "", lines: "y = mx + b; m = (y2-y1)/(x2-x1)" }),
  theorem: () => ({ type: "theorem", label: "Theorem", prefix: "", title: "Theorem", statement: "If conditions hold, then the result follows." }),
  proof: () => ({ type: "proof", label: "Proof", prefix: "", steps: "Given the assumptions; apply the rule; therefore the result follows" }),
  bracket: () => ({ type: "bracket", label: "Bracket layout", prefix: "", open: "(", value: "x + y", close: ")" }),
  modulo: () => ({ type: "modulo", label: "Modulo", prefix: "", left: "a", modulus: "n" }),
};

const nestedComposerFields = {
  fraction: ["numerator", "denominator"],
  power: ["base", "exponent"],
  subscript: ["base", "subscript"],
  root: ["radicand", "index"],
  sum: ["body"],
  integral: ["integrand"],
  limit: ["expression"],
  vector: ["value"],
  bracket: ["value"],
  modulo: ["left", "modulus"],
};

function nestedComposerFieldKey(field) {
  return `${field}Blocks`;
}

function createComposerBlock(type = "expression", values = {}) {
  const factory = composerTemplateFactories[type] || composerTemplateFactories.expression;
  return hydrateComposerBlock({ ...factory(), ...values });
}

function hydrateComposerBlock(block) {
  if (block.type === "matrix") hydrateMatrixBlock(block);
  if (block.type === "cases") hydrateCasesBlock(block);
  const fields = nestedComposerFields[block.type] || [];
  fields.forEach((field) => {
    const value = String(block[field] || "").trim();
    if (!value) {
      delete block[nestedComposerFieldKey(field)];
      return;
    }
    const parsed = buildComposerFromEquation(value);
    const isSingleExpression = parsed.length === 1 && parsed[0].type === "expression" && String(parsed[0].value || "").trim() === value;
    if (isSingleExpression) {
      delete block[nestedComposerFieldKey(field)];
      return;
    }
    block[nestedComposerFieldKey(field)] = parsed;
  });
  return block;
}

function expressionBlocksForValue(value) {
  const parsed = buildComposerFromEquation(value || "");
  const text = String(value || "").trim();
  const isSingleExpression = parsed.length === 1 && parsed[0].type === "expression" && String(parsed[0].value || "").trim() === text;
  return isSingleExpression ? null : parsed;
}

function parseMatrixCells(rows) {
  return String(rows || "")
    .split(";")
    .map((row) => row.trim())
    .filter(Boolean)
    .map((row) => row.split(",").map((cell) => {
      const value = cell.trim();
      const blocks = expressionBlocksForValue(value);
      return blocks ? { value, blocks } : { value };
    }));
}

function matrixCellsToRows(cells) {
  return (cells || [])
    .map((row) => row.map((cell) => composerBlocksToEquation(cell.blocks || [{ type: "expression", value: cell.value || "" }], { compact: true })).join(", "))
    .join("; ");
}

function hydrateMatrixBlock(block) {
  if (!Array.isArray(block.cells) || !block.cells.length) {
    block.cells = parseMatrixCells(block.rows || "a11, a12; a21, a22");
  }
  block.rows = matrixCellsToRows(block.cells);
  return block;
}

function parseCaseBranches(rows) {
  return String(rows || "")
    .split(";")
    .map((row) => row.trim())
    .filter(Boolean)
    .map((row) => {
      const match = row.match(/^([\s\S]+?)\s+if\s+([\s\S]+)$/);
      const expression = (match ? match[1] : row).trim();
      const condition = (match ? match[2] : "condition").trim();
      const expressionBlocks = expressionBlocksForValue(expression);
      const conditionBlocks = expressionBlocksForValue(condition);
      return {
        expression,
        condition,
        ...(expressionBlocks ? { expressionBlocks } : {}),
        ...(conditionBlocks ? { conditionBlocks } : {}),
      };
    });
}

function caseBranchesToRows(branches) {
  return (branches || [])
    .map((branch) => {
      const expression = composerBlocksToEquation(branch.expressionBlocks || [{ type: "expression", value: branch.expression || "" }], { compact: true });
      const condition = composerBlocksToEquation(branch.conditionBlocks || [{ type: "expression", value: branch.condition || "" }], { compact: true });
      return `${expression} if ${condition}`;
    })
    .join("; ");
}

function hydrateCasesBlock(block) {
  if (!Array.isArray(block.branches) || !block.branches.length) {
    block.branches = parseCaseBranches(block.rows || "α if a = b; β if a ≠ b");
  }
  block.rows = caseBranchesToRows(block.branches);
  return block;
}

function composerFieldValue(block, field) {
  const nestedBlocks = block[nestedComposerFieldKey(field)];
  if (Array.isArray(nestedBlocks) && nestedBlocks.length) {
    return composerBlocksToEquation(nestedBlocks, { compact: true });
  }
  return String(block[field] || "").trim();
}

function syncParentFieldFromNested(block, field) {
  const key = nestedComposerFieldKey(field);
  const nestedBlocks = block[key];
  if (!Array.isArray(nestedBlocks) || !nestedBlocks.length) {
    delete block[key];
    block[field] = "";
    return block;
  }
  block[field] = composerBlocksToEquation(nestedBlocks, { compact: true });
  return hydrateComposerBlock(block);
}

function addNestedComposerChild(block, field, type = "expression") {
  const key = nestedComposerFieldKey(field);
  if (!Array.isArray(block[key]) || !block[key].length) {
    block[key] = buildComposerFromEquation(block[field] || "");
  }
  if (!Array.isArray(block[key]) || !block[key].length) {
    block[key] = [createComposerBlock(type, { value: "term" })];
  } else {
    block[key].push(createComposerBlock(type, { prefix: block[key].length ? "+" : "", value: "term" }));
  }
  return syncParentFieldFromNested(block, field);
}

function removeNestedComposerChild(block, field, childIndex) {
  const key = nestedComposerFieldKey(field);
  if (!Array.isArray(block[key]) || !block[key][childIndex]) return block;
  block[key].splice(childIndex, 1);
  if (block[key][0]) block[key][0].prefix = "";
  return syncParentFieldFromNested(block, field);
}

function updateNestedComposerChild(block, field, childIndex, part, value) {
  const key = nestedComposerFieldKey(field);
  if (!Array.isArray(block[key]) || !block[key][childIndex]) return block;
  const child = block[key][childIndex];
  if (part === "type") {
    const nextChild = createComposerBlock(value || "expression", { prefix: child.prefix || "" });
    block[key].splice(childIndex, 1, nextChild);
    return syncParentFieldFromNested(block, field);
  }
  if (part === "prefix") {
    child.prefix = value;
    return syncParentFieldFromNested(block, field);
  }
  const parsed = buildComposerFromEquation(value || "");
  const nextChild = parsed[0] ? { ...parsed[0], prefix: child.prefix || "" } : createComposerBlock("expression", { value: "", prefix: child.prefix || "" });
  block[key].splice(childIndex, 1, nextChild);
  return syncParentFieldFromNested(block, field);
}

function switchComposerBlockType(blocks, index, type) {
  if (!blocks[index]) return blocks;
  const previous = blocks[index];
  blocks[index] = createComposerBlock(type || "expression", { prefix: previous.prefix || "" });
  return blocks;
}

function moveComposerBlock(blocks, index, direction) {
  const nextIndex = index + direction;
  if (!blocks[index] || !blocks[nextIndex]) return blocks;
  const [block] = blocks.splice(index, 1);
  blocks.splice(nextIndex, 0, block);
  return blocks;
}

function moveComposerBlockTo(blocks, fromIndex, toIndex) {
  if (!blocks[fromIndex] || toIndex < 0 || toIndex >= blocks.length || fromIndex === toIndex) return blocks;
  const [block] = blocks.splice(fromIndex, 1);
  blocks.splice(toIndex, 0, block);
  return blocks;
}

function syncInlineBlockList(owner, key, valueKey) {
  const blocks = owner[key];
  if (!Array.isArray(blocks) || !blocks.length) {
    delete owner[key];
    owner[valueKey] = "";
    return owner;
  }
  owner[valueKey] = composerBlocksToEquation(blocks, { compact: true });
  return owner;
}

function addInlineBlockChild(owner, key, valueKey, type = "expression") {
  if (!Array.isArray(owner[key]) || !owner[key].length) {
    owner[key] = buildComposerFromEquation(owner[valueKey] || "");
  }
  if (!Array.isArray(owner[key]) || !owner[key].length) {
    owner[key] = [createComposerBlock(type, { value: "term" })];
  } else {
    owner[key].push(createComposerBlock(type, { prefix: owner[key].length ? "+" : "", value: "term" }));
  }
  return syncInlineBlockList(owner, key, valueKey);
}

function removeInlineBlockChild(owner, key, valueKey, childIndex) {
  if (!Array.isArray(owner[key]) || !owner[key][childIndex]) return owner;
  owner[key].splice(childIndex, 1);
  if (owner[key][0]) owner[key][0].prefix = "";
  return syncInlineBlockList(owner, key, valueKey);
}

function updateInlineBlockChild(owner, key, valueKey, childIndex, part, value) {
  if (!Array.isArray(owner[key]) || !owner[key][childIndex]) return owner;
  const child = owner[key][childIndex];
  if (part === "type") {
    owner[key].splice(childIndex, 1, createComposerBlock(value || "expression", { prefix: child.prefix || "" }));
    return syncInlineBlockList(owner, key, valueKey);
  }
  if (part === "prefix") {
    child.prefix = value;
    return syncInlineBlockList(owner, key, valueKey);
  }
  const parsed = buildComposerFromEquation(value || "");
  const nextChild = parsed[0] ? { ...parsed[0], prefix: child.prefix || "" } : createComposerBlock("expression", { value: "", prefix: child.prefix || "" });
  owner[key].splice(childIndex, 1, nextChild);
  return syncInlineBlockList(owner, key, valueKey);
}

function syncMatrixCell(block, rowIndex, cellIndex) {
  const cell = block.cells?.[rowIndex]?.[cellIndex];
  if (!cell) return block;
  cell.value = composerBlocksToEquation(cell.blocks || [{ type: "expression", value: cell.value || "" }], { compact: true });
  block.rows = matrixCellsToRows(block.cells);
  return hydrateComposerBlock(block);
}

function addMatrixCellChild(block, rowIndex, cellIndex, type = "expression") {
  const cell = block.cells?.[rowIndex]?.[cellIndex];
  if (!cell) return block;
  addInlineBlockChild(cell, "blocks", "value", type);
  return syncMatrixCell(block, rowIndex, cellIndex);
}

function removeMatrixCellChild(block, rowIndex, cellIndex, childIndex) {
  const cell = block.cells?.[rowIndex]?.[cellIndex];
  if (!cell) return block;
  removeInlineBlockChild(cell, "blocks", "value", childIndex);
  return syncMatrixCell(block, rowIndex, cellIndex);
}

function updateMatrixCellChild(block, rowIndex, cellIndex, childIndex, part, value) {
  const cell = block.cells?.[rowIndex]?.[cellIndex];
  if (!cell) return block;
  updateInlineBlockChild(cell, "blocks", "value", childIndex, part, value);
  return syncMatrixCell(block, rowIndex, cellIndex);
}

function updateMatrixCell(block, rowIndex, cellIndex, value) {
  const cell = block.cells?.[rowIndex]?.[cellIndex];
  if (!cell) return block;
  cell.value = value;
  const blocks = expressionBlocksForValue(value);
  if (blocks) cell.blocks = blocks;
  else delete cell.blocks;
  block.rows = matrixCellsToRows(block.cells);
  return hydrateComposerBlock(block);
}

function addMatrixRow(block) {
  hydrateMatrixBlock(block);
  const width = Math.max(1, ...block.cells.map((row) => row.length));
  block.cells.push(Array.from({ length: width }, (_, index) => ({ value: `m${block.cells.length + 1}${index + 1}` })));
  block.rows = matrixCellsToRows(block.cells);
  return hydrateComposerBlock(block);
}

function addMatrixColumn(block) {
  hydrateMatrixBlock(block);
  block.cells.forEach((row, rowIndex) => row.push({ value: `m${rowIndex + 1}${row.length + 1}` }));
  block.rows = matrixCellsToRows(block.cells);
  return hydrateComposerBlock(block);
}

function removeMatrixRow(block, rowIndex) {
  hydrateMatrixBlock(block);
  if (block.cells.length > 1) block.cells.splice(rowIndex, 1);
  block.rows = matrixCellsToRows(block.cells);
  return hydrateComposerBlock(block);
}

function removeMatrixColumn(block, cellIndex) {
  hydrateMatrixBlock(block);
  block.cells.forEach((row) => {
    if (row.length > 1) row.splice(cellIndex, 1);
  });
  block.rows = matrixCellsToRows(block.cells);
  return hydrateComposerBlock(block);
}

function syncCaseBranch(block, branchIndex, part) {
  const branch = block.branches?.[branchIndex];
  if (!branch) return block;
  const key = `${part}Blocks`;
  branch[part] = composerBlocksToEquation(branch[key] || [{ type: "expression", value: branch[part] || "" }], { compact: true });
  block.rows = caseBranchesToRows(block.branches);
  return hydrateComposerBlock(block);
}

function addCaseBranchChild(block, branchIndex, part, type = "expression") {
  const branch = block.branches?.[branchIndex];
  if (!branch) return block;
  addInlineBlockChild(branch, `${part}Blocks`, part, type);
  return syncCaseBranch(block, branchIndex, part);
}

function removeCaseBranchChild(block, branchIndex, part, childIndex) {
  const branch = block.branches?.[branchIndex];
  if (!branch) return block;
  removeInlineBlockChild(branch, `${part}Blocks`, part, childIndex);
  return syncCaseBranch(block, branchIndex, part);
}

function updateCaseBranchChild(block, branchIndex, part, childIndex, childPart, value) {
  const branch = block.branches?.[branchIndex];
  if (!branch) return block;
  updateInlineBlockChild(branch, `${part}Blocks`, part, childIndex, childPart, value);
  return syncCaseBranch(block, branchIndex, part);
}

function updateCaseBranch(block, branchIndex, part, value) {
  const branch = block.branches?.[branchIndex];
  if (!branch) return block;
  branch[part] = value;
  const blocks = expressionBlocksForValue(value);
  if (blocks) branch[`${part}Blocks`] = blocks;
  else delete branch[`${part}Blocks`];
  block.rows = caseBranchesToRows(block.branches);
  return hydrateComposerBlock(block);
}

function addCaseBranch(block) {
  hydrateCasesBlock(block);
  block.branches.push({ expression: "value", condition: "condition" });
  block.rows = caseBranchesToRows(block.branches);
  return hydrateComposerBlock(block);
}

function removeCaseBranch(block, branchIndex) {
  hydrateCasesBlock(block);
  if (block.branches.length > 1) block.branches.splice(branchIndex, 1);
  block.rows = caseBranchesToRows(block.branches);
  return hydrateComposerBlock(block);
}

function splitComposerRows(value) {
  return String(value || "")
    .replace(/^\[\[|\]\]$/g, "")
    .split(/\],\s*\[/)
    .map((row) => row.trim())
    .filter(Boolean)
    .join("; ");
}

function splitTopLevelFraction(input) {
  const text = String(input || "").trim();
  if (!text || /[=]/.test(text)) return null;
  let depth = 0;
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    if ("([{".includes(char)) depth += 1;
    if (")]}".includes(char)) depth = Math.max(0, depth - 1);
    if (char === "/" && depth === 0) {
      const left = text.slice(0, index).trim().replace(/^\((.*)\)$/s, "$1");
      const right = text.slice(index + 1).trim().replace(/^\((.*)\)$/s, "$1");
      if (left && right) {
        return { numerator: left, denominator: right };
      }
    }
  }
  return null;
}

function parseExactComposerBlock(segment) {
  const trimmed = String(segment || "").trim();
  if (!trimmed) return null;

  let match = trimmed.match(/^\[\[([\s\S]+)\]\]$/);
  if (match) {
    return createComposerBlock("matrix", { rows: splitComposerRows(trimmed) });
  }

  match = trimmed.match(/^cases\{([\s\S]+)\}$/);
  if (match) {
    return createComposerBlock("cases", { rows: match[1].trim() });
  }

  match = trimmed.match(/^align\{([\s\S]+)\}$/);
  if (match) {
    return createComposerBlock("aligned", { lines: match[1].trim() });
  }

  match = trimmed.match(/^theorem\{title:\s*([^;]+);\s*statement:\s*([\s\S]+)\}$/);
  if (match) {
    return createComposerBlock("theorem", { title: match[1].trim(), statement: match[2].trim() });
  }

  match = trimmed.match(/^proof\{([\s\S]+)\}$/);
  if (match) {
    return createComposerBlock("proof", { steps: match[1].trim() });
  }

  match = trimmed.match(/^bracket\{([^,]+),\s*([\s\S]+),\s*([^,]+)\}$/);
  if (match) {
    return createComposerBlock("bracket", { open: match[1].trim(), value: match[2].trim(), close: match[3].trim() });
  }

  match = trimmed.match(/^Σ\(([^=]+)=([^)]+?) to ([^)]+?)\)\s*\[([\s\S]+)\]$/);
  if (match) {
    return createComposerBlock("sum", {
      variable: match[1].trim(),
      start: match[2].trim(),
      end: match[3].trim(),
      body: match[4].trim(),
    });
  }

  match = trimmed.match(/^∫\(([^)]+?) to ([^)]+?)\)\s*([\s\S]+?)\s*d([A-Za-z]+)$/);
  if (match) {
    return createComposerBlock("integral", {
      lower: match[1].trim(),
      upper: match[2].trim(),
      integrand: match[3].trim(),
      differential: match[4].trim(),
    });
  }

  match = trimmed.match(/^lim\(([^→]+)→([^)]+)\)\s*([\s\S]+)$/);
  if (match) {
    return createComposerBlock("limit", {
      variable: match[1].trim(),
      approach: match[2].trim(),
      expression: match[3].trim(),
    });
  }

  match = trimmed.match(/^sqrt\(([\s\S]+)\)$/);
  if (match) {
    return createComposerBlock("root", { radicand: match[1].trim() });
  }

  match = trimmed.match(/^root\(([^,]+),\s*([\s\S]+)\)$/);
  if (match) {
    return createComposerBlock("root", { index: match[1].trim(), radicand: match[2].trim() });
  }

  match = trimmed.match(/^(vec|hat|bar)\(([\s\S]+)\)$/);
  if (match) {
    return createComposerBlock("vector", { notation: match[1], value: match[2].trim() });
  }

  match = trimmed.match(/^(.+?)\s+mod\s+(.+)$/);
  if (match && !/[=]/.test(trimmed)) {
    return createComposerBlock("modulo", { left: match[1].trim(), modulus: match[2].trim() });
  }

  const fractionParts = splitTopLevelFraction(trimmed);
  if (fractionParts) {
    return createComposerBlock("fraction", fractionParts);
  }

  match = trimmed.match(/^([A-Za-z][A-Za-z0-9]*)_\{?([^}]+)\}?$/);
  if (match) {
    return createComposerBlock("subscript", { base: match[1].trim(), subscript: match[2].trim() });
  }

  match = trimmed.match(/^(.+?)\^\{?([^}]+)\}?$/);
  if (match && !/[=]/.test(trimmed)) {
    return createComposerBlock("power", { base: match[1].trim(), exponent: match[2].trim() });
  }

  return null;
}

function findNextComposerMatch(input) {
  const patterns = [
    { type: "matrix", regex: /\[\[[\s\S]+?\]\]/g },
    { type: "cases", regex: /cases\{[\s\S]+?\}/g },
    { type: "aligned", regex: /align\{[\s\S]+?\}/g },
    { type: "theorem", regex: /theorem\{title:\s*[^;]+;\s*statement:\s*[\s\S]+?\}/g },
    { type: "proof", regex: /proof\{[\s\S]+?\}/g },
    { type: "bracket", regex: /bracket\{[^,]+,\s*[\s\S]+?,\s*[^,]+\}/g },
    { type: "sum", regex: /Σ\(([^=]+)=([^)]+?) to ([^)]+?)\)\s*\[[\s\S]+?\]/g },
    { type: "integral", regex: /∫\(([^)]+?) to ([^)]+?)\)\s*[\s\S]+?\s*d[A-Za-z]+/g },
    { type: "limit", regex: /lim\(([^→]+)→([^)]+)\)\s*[\s\S]+/g },
    { type: "rootIndexed", regex: /root\(([^,]+),\s*[\s\S]+?\)/g },
    { type: "root", regex: /sqrt\([\s\S]+?\)/g },
    { type: "vector", regex: /(vec|hat|bar)\([\s\S]+?\)/g },
    { type: "modulo", regex: /[^=\n]+?\s+mod\s+[^=\n]+/g },
  ];

  let best = null;
  patterns.forEach((pattern) => {
    pattern.regex.lastIndex = 0;
    const match = pattern.regex.exec(input);
    if (!match) return;
    if (!best || match.index < best.index || (match.index === best.index && match[0].length > best.text.length)) {
      best = { index: match.index, text: match[0], type: pattern.type };
    }
  });
  return best;
}

function splitTopLevelOperators(input) {
  const text = String(input || "").trim();
  if (!text) return [];
  const parts = [];
  let depth = 0;
  let current = "";
  let pendingPrefix = "";

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    if ("([{".includes(char)) depth += 1;
    if (")]}".includes(char)) depth = Math.max(0, depth - 1);

    const isComparisonEquals = char === "=" && ["<", ">", "!"].includes(text[index - 1]);
    if (depth === 0 && ["=", "+", "-", "*"].includes(char) && !isComparisonEquals) {
      const value = current.trim();
      if (value) parts.push({ prefix: pendingPrefix, value });
      pendingPrefix = char;
      current = "";
      continue;
    }
    current += char;
  }

  const tail = current.trim();
  if (tail) parts.push({ prefix: pendingPrefix, value: tail });
  return parts;
}

function parseInlineExpressionBlocks(fragment) {
  const parts = splitTopLevelOperators(fragment);
  if (parts.length <= 1) return [createComposerBlock("expression", { value: String(fragment || "").trim() })];
  return parts.map((part) => {
    const parsed = parseExactComposerBlock(part.value) || createComposerBlock("expression", { value: part.value });
    parsed.prefix = part.prefix || "";
    return parsed;
  });
}

function buildComposerFromEquation(equation) {
  const trimmed = String(equation || "").trim();
  if (!trimmed) return [createComposerBlock("expression", { value: "" })];
  const exactBlock = splitTopLevelOperators(trimmed).length === 1 ? parseExactComposerBlock(trimmed) : null;
  if (exactBlock) return [exactBlock];

  const blocks = [];
  let remaining = trimmed;

  while (remaining) {
    const match = findNextComposerMatch(remaining);
    if (!match) {
      blocks.push(...parseInlineExpressionBlocks(remaining));
      break;
    }

    const leading = remaining.slice(0, match.index).trim();
    if (leading) blocks.push(...parseInlineExpressionBlocks(leading));

    const matchedBlock = parseExactComposerBlock(match.text);
    blocks.push(matchedBlock || createComposerBlock("expression", { value: match.text.trim() }));
    remaining = remaining.slice(match.index + match.text.length).trim();
  }

  return blocks.filter((block) => {
    if (block.type !== "expression") return true;
    return String(block.value || "").trim().length > 0;
  }).length
    ? blocks.filter((block) => block.type !== "expression" || String(block.value || "").trim().length > 0)
    : [createComposerBlock("expression", { value: trimmed })];
}

function wrapComposerTerm(value) {
  const trimmed = String(value || "").trim();
  if (!trimmed) return "";
  return /[\s+\-*/]/.test(trimmed) && !/^\(.+\)$/.test(trimmed) ? `(${trimmed})` : trimmed;
}

function composerBlockToExpression(block, options = {}) {
  const prefix = block.prefix ? (options.compact ? block.prefix : `${block.prefix} `) : "";
  switch (block.type) {
    case "fraction":
      return `${prefix}${wrapComposerTerm(composerFieldValue(block, "numerator") || "a")}/${wrapComposerTerm(composerFieldValue(block, "denominator") || "b")}`;
    case "power":
      return `${prefix}${wrapComposerTerm(composerFieldValue(block, "base") || "x")}^{${composerFieldValue(block, "exponent") || "2"}}`;
    case "subscript":
      return `${prefix}${composerFieldValue(block, "base") || "a"}_{${composerFieldValue(block, "subscript") || "n"}}`;
    case "root":
      return `${prefix}${composerFieldValue(block, "index") ? `root(${composerFieldValue(block, "index")}, ${composerFieldValue(block, "radicand") || "x"})` : `sqrt(${composerFieldValue(block, "radicand") || "x"})`}`;
    case "sum":
      return `${prefix}Σ(${block.variable || "k"}=${block.start || "1"} to ${block.end || "n"}) [${composerFieldValue(block, "body") || "sin(kx)/k"}]`;
    case "integral":
      return `${prefix}∫(${block.lower || "a"} to ${block.upper || "b"}) ${composerFieldValue(block, "integrand") || "f(x)"} d${block.differential || "x"}`;
    case "limit":
      return `${prefix}lim(${block.variable || "x"}→${block.approach || "a"}) ${composerFieldValue(block, "expression") || "f(x)"}`;
    case "vector":
      return `${prefix}${block.notation || "vec"}(${composerFieldValue(block, "value") || "AB"})`;
    case "matrix":
      return `${prefix}[[${matrixCellsToRows(block.cells || parseMatrixCells(block.rows || "a11, a12; a21, a22")).split(";").map((row) => row.trim()).join("], [")}]]`;
    case "cases":
      return `${prefix}cases{${caseBranchesToRows(block.branches || parseCaseBranches(block.rows || "α if a = b; β if a ≠ b"))}}`;
    case "aligned":
      return `${prefix}align{${block.lines || "y = mx + b; m = (y2-y1)/(x2-x1)"}}`;
    case "theorem":
      return `${prefix}theorem{title: ${block.title || "Theorem"}; statement: ${block.statement || "If conditions hold, then the result follows."}}`;
    case "proof":
      return `${prefix}proof{${block.steps || "Given the assumptions; apply the rule; therefore the result follows"}}`;
    case "bracket":
      return `${prefix}bracket{${block.open || "("}, ${composerFieldValue(block, "value") || "x + y"}, ${block.close || ")"}}`;
    case "modulo":
      return `${prefix}${composerFieldValue(block, "left") || "a"} mod ${composerFieldValue(block, "modulus") || "n"}`;
    case "expression":
    default:
      return `${prefix}${block.value || ""}`.trim();
  }
}

function composerBlocksToEquation(blocks = state.composerBlocks, options = {}) {
  return blocks
    .map((block) => composerBlockToExpression(block, options).trim())
    .filter(Boolean)
    .join(options.compact ? "" : " ");
}

function composerBlockPreviewExpression(block) {
  return composerBlockToExpression({ ...block, prefix: "" }).trim();
}

function renderInlineMiniComposer(blocks, context = {}) {
  if (!Array.isArray(blocks) || !blocks.length) return "";
  const typeOptions = Object.keys(composerTemplateFactories);
  const attrs = Object.entries(context).map(([key, value]) => `data-${key}="${escapeHtml(value)}"`).join(" ");
  return `
    <div class="inline-mini-composer">
      ${blocks.map((childBlock, childIndex) => `
        <div class="nested-chip">
          <div class="nested-chip-row">
            <span>${escapeHtml(childBlock.type)}</span>
            <button type="button" class="nested-remove" data-inline-action="remove" ${attrs} data-inline-child-index="${childIndex}">×</button>
          </div>
          <div class="nested-chip-controls">
            <select class="nested-type" data-inline-part="type" ${attrs} data-inline-child-index="${childIndex}">
              ${typeOptions.map((type) => `<option value="${type}" ${childBlock.type === type ? "selected" : ""}>${type}</option>`).join("")}
            </select>
            <input type="text" class="nested-prefix" value="${escapeHtml(childBlock.prefix || "")}" data-inline-part="prefix" ${attrs} data-inline-child-index="${childIndex}" placeholder="+ or -" />
            <input type="text" class="nested-expression" value="${escapeHtml(composerBlockPreviewExpression(childBlock))}" data-inline-part="expression" ${attrs} data-inline-child-index="${childIndex}" />
          </div>
          <strong>${renderMathPreview(composerBlockPreviewExpression(childBlock))}</strong>
        </div>
      `).join("")}
    </div>
  `;
}

function renderNestedComposerLane(block, blockIndex, field) {
  const nestedBlocks = block[nestedComposerFieldKey(field)];
  if (!Array.isArray(nestedBlocks) || !nestedBlocks.length) return "";
  const typeOptions = Object.keys(composerTemplateFactories);
  return `
    <div class="nested-lane">
      <div class="nested-lane-header">
        <span class="mini-label">Nested structure</span>
        <button type="button" class="nested-add" data-nested-action="add" data-composer-index="${blockIndex}" data-nested-field="${field}">Add part</button>
      </div>
      <div class="nested-block-list">
        ${nestedBlocks.map((childBlock, childIndex) => `
          <div class="nested-chip">
            <div class="nested-chip-row">
              <span>${escapeHtml(childBlock.type)}</span>
              <button type="button" class="nested-remove" data-nested-action="remove" data-composer-index="${blockIndex}" data-nested-field="${field}" data-nested-child-index="${childIndex}">×</button>
            </div>
            <div class="nested-chip-controls">
              <select class="nested-type" data-nested-part="type" data-composer-index="${blockIndex}" data-nested-field="${field}" data-nested-child-index="${childIndex}">
                ${typeOptions.map((type) => `<option value="${type}" ${childBlock.type === type ? "selected" : ""}>${type}</option>`).join("")}
              </select>
              <input type="text" class="nested-prefix" value="${escapeHtml(childBlock.prefix || "")}" data-nested-part="prefix" data-composer-index="${blockIndex}" data-nested-field="${field}" data-nested-child-index="${childIndex}" placeholder="+ or -" />
              <input type="text" class="nested-expression" value="${escapeHtml(composerBlockPreviewExpression(childBlock))}" data-nested-part="expression" data-composer-index="${blockIndex}" data-nested-field="${field}" data-nested-child-index="${childIndex}" />
            </div>
            <strong>${renderMathPreview(composerBlockPreviewExpression(childBlock))}</strong>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function renderMatrixEditor(block, index) {
  hydrateMatrixBlock(block);
  return `
    <div class="matrix-editor">
      <div class="matrix-actions">
        <button type="button" data-matrix-action="add-row" data-composer-index="${index}">Add row</button>
        <button type="button" data-matrix-action="add-column" data-composer-index="${index}">Add column</button>
      </div>
      <div class="matrix-cell-grid" style="--matrix-cols: ${Math.max(1, ...block.cells.map((row) => row.length))}">
        ${block.cells.map((row, rowIndex) => row.map((cell, cellIndex) => `
          <div class="matrix-cell-editor">
            <input type="text" value="${escapeHtml(cell.value || "")}" data-matrix-part="cell" data-composer-index="${index}" data-matrix-row="${rowIndex}" data-matrix-cell="${cellIndex}" />
            <div class="matrix-cell-tools">
              <button type="button" data-inline-action="add" data-inline-scope="matrix" data-composer-index="${index}" data-matrix-row="${rowIndex}" data-matrix-cell="${cellIndex}">Add part</button>
            </div>
            ${cell.blocks ? renderInlineMiniComposer(cell.blocks, { "inline-scope": "matrix", "composer-index": index, "matrix-row": rowIndex, "matrix-cell": cellIndex }) : ""}
          </div>
        `).join("")).join("")}
      </div>
      <div class="matrix-actions subtle">
        ${block.cells.map((_, rowIndex) => `<button type="button" data-matrix-action="remove-row" data-composer-index="${index}" data-matrix-row="${rowIndex}">Remove row ${rowIndex + 1}</button>`).join("")}
        ${Array.from({ length: Math.max(1, ...block.cells.map((row) => row.length)) }, (_, cellIndex) => `<button type="button" data-matrix-action="remove-column" data-composer-index="${index}" data-matrix-cell="${cellIndex}">Remove col ${cellIndex + 1}</button>`).join("")}
      </div>
    </div>
  `;
}

function renderCasesEditor(block, index) {
  hydrateCasesBlock(block);
  return `
    <div class="cases-editor">
      <div class="matrix-actions">
        <button type="button" data-case-action="add-branch" data-composer-index="${index}">Add branch</button>
      </div>
      ${block.branches.map((branch, branchIndex) => `
        <div class="case-branch-editor">
          <div class="composer-field">
            <label>Expression</label>
            <input type="text" value="${escapeHtml(branch.expression || "")}" data-case-part="expression" data-composer-index="${index}" data-case-branch="${branchIndex}" />
            <div class="matrix-cell-tools"><button type="button" data-inline-action="add" data-inline-scope="case" data-composer-index="${index}" data-case-branch="${branchIndex}" data-case-part="expression">Add part</button></div>
            ${branch.expressionBlocks ? renderInlineMiniComposer(branch.expressionBlocks, { "inline-scope": "case", "composer-index": index, "case-branch": branchIndex, "case-part": "expression" }) : ""}
          </div>
          <div class="composer-field">
            <label>Condition</label>
            <input type="text" value="${escapeHtml(branch.condition || "")}" data-case-part="condition" data-composer-index="${index}" data-case-branch="${branchIndex}" />
            <div class="matrix-cell-tools"><button type="button" data-inline-action="add" data-inline-scope="case" data-composer-index="${index}" data-case-branch="${branchIndex}" data-case-part="condition">Add part</button></div>
            ${branch.conditionBlocks ? renderInlineMiniComposer(branch.conditionBlocks, { "inline-scope": "case", "composer-index": index, "case-branch": branchIndex, "case-part": "condition" }) : ""}
          </div>
          <button type="button" class="nested-remove" data-case-action="remove-branch" data-composer-index="${index}" data-case-branch="${branchIndex}">×</button>
        </div>
      `).join("")}
    </div>
  `;
}

function renderComposerField(block, index, field, label, options = {}) {
  const value = block[field] || "";
  const wide = options.wide ? " wide" : "";
  const type = options.multiline ? "textarea" : "input";
  const placeholder = options.placeholder ? ` placeholder="${escapeHtml(options.placeholder)}"` : "";
  const control = type === "textarea"
    ? `<textarea data-composer-index="${index}" data-composer-field="${field}">${escapeHtml(value)}</textarea>`
    : `<input type="text" value="${escapeHtml(value)}" data-composer-index="${index}" data-composer-field="${field}"${placeholder} />`;
  return `
    <div class="composer-field${wide}">
      <label>${escapeHtml(label)}</label>
      ${control}
      ${renderNestedComposerLane(block, index, field)}
    </div>
  `;
}

function syncComposerOutput() {
  const nextEquation = composerBlocksToEquation();
  composerOutput.textContent = nextEquation;
  equationInput.value = nextEquation;
  state.equation = nextEquation;
  try {
    state.formulaModel = buildFormulaModel(nextEquation || " ");
    renderFormulaModule();
    setError("");
  } catch {
    formulaStatus.textContent = "Editing";
  }
}

function renderComposer() {
  if (!structuredComposer) return;
  structuredComposer.innerHTML = state.composerBlocks.map((block, index) => {
    const title = block.label || block.type;
    const commonPrefix = `
      <div class="composer-field">
        <label>Joiner</label>
        <input type="text" value="${escapeHtml(block.prefix || "")}" data-composer-index="${index}" data-composer-field="prefix" placeholder="+, =, -, or blank" />
      </div>
    `;

    let fields = "";
    switch (block.type) {
      case "fraction":
        fields = `
          <div class="composer-grid compact">
            ${commonPrefix}
            ${renderComposerField(block, index, "numerator", "Numerator")}
            ${renderComposerField(block, index, "denominator", "Denominator")}
          </div>`;
        break;
      case "power":
        fields = `
          <div class="composer-grid compact">
            ${commonPrefix}
            ${renderComposerField(block, index, "base", "Base")}
            ${renderComposerField(block, index, "exponent", "Exponent")}
          </div>`;
        break;
      case "subscript":
        fields = `
          <div class="composer-grid compact">
            ${commonPrefix}
            ${renderComposerField(block, index, "base", "Base")}
            ${renderComposerField(block, index, "subscript", "Subscript")}
          </div>`;
        break;
      case "root":
        fields = `
          <div class="composer-grid">
            ${commonPrefix}
            ${renderComposerField(block, index, "radicand", "Radicand")}
            ${renderComposerField(block, index, "index", "Index", { placeholder: "optional" })}
          </div>`;
        break;
      case "sum":
        fields = `
          <div class="composer-grid">
            ${commonPrefix}
            <div class="composer-field"><label>Variable</label><input type="text" value="${escapeHtml(block.variable || "")}" data-composer-index="${index}" data-composer-field="variable" /></div>
            <div class="composer-field"><label>Start</label><input type="text" value="${escapeHtml(block.start || "")}" data-composer-index="${index}" data-composer-field="start" /></div>
            <div class="composer-field"><label>End</label><input type="text" value="${escapeHtml(block.end || "")}" data-composer-index="${index}" data-composer-field="end" /></div>
            ${renderComposerField(block, index, "body", "Body", { multiline: true, wide: true })}
          </div>`;
        break;
      case "integral":
        fields = `
          <div class="composer-grid">
            ${commonPrefix}
            <div class="composer-field"><label>Lower</label><input type="text" value="${escapeHtml(block.lower || "")}" data-composer-index="${index}" data-composer-field="lower" /></div>
            <div class="composer-field"><label>Upper</label><input type="text" value="${escapeHtml(block.upper || "")}" data-composer-index="${index}" data-composer-field="upper" /></div>
            <div class="composer-field"><label>Differential</label><input type="text" value="${escapeHtml(block.differential || "")}" data-composer-index="${index}" data-composer-field="differential" /></div>
            ${renderComposerField(block, index, "integrand", "Integrand", { multiline: true, wide: true })}
          </div>`;
        break;
      case "limit":
        fields = `
          <div class="composer-grid">
            ${commonPrefix}
            <div class="composer-field"><label>Variable</label><input type="text" value="${escapeHtml(block.variable || "")}" data-composer-index="${index}" data-composer-field="variable" /></div>
            <div class="composer-field"><label>Approaches</label><input type="text" value="${escapeHtml(block.approach || "")}" data-composer-index="${index}" data-composer-field="approach" /></div>
            ${renderComposerField(block, index, "expression", "Expression", { multiline: true, wide: true })}
          </div>`;
        break;
      case "vector":
        fields = `
          <div class="composer-grid">
            ${commonPrefix}
            <div class="composer-field"><label>Accent</label><select data-composer-index="${index}" data-composer-field="notation">
              ${["vec", "hat", "bar"].map((notation) => `<option value="${notation}" ${block.notation === notation ? "selected" : ""}>${notation}</option>`).join("")}
            </select></div>
            ${renderComposerField(block, index, "value", "Value")}
          </div>`;
        break;
      case "matrix":
        fields = `
          <div class="composer-grid compact">
            ${commonPrefix}
            <div class="composer-field wide"><label>Rows</label><textarea data-composer-index="${index}" data-composer-field="rows" placeholder="a11, a12; a21, a22">${escapeHtml(block.rows || "")}</textarea></div>
            <div class="composer-field wide">${renderMatrixEditor(block, index)}</div>
          </div>`;
        break;
      case "cases":
        fields = `
          <div class="composer-grid compact">
            ${commonPrefix}
            <div class="composer-field wide"><label>Branches</label><textarea data-composer-index="${index}" data-composer-field="rows" placeholder="α if a = b; β if a ≠ b">${escapeHtml(block.rows || "")}</textarea></div>
            <div class="composer-field wide">${renderCasesEditor(block, index)}</div>
          </div>`;
        break;
      case "aligned":
        fields = `
          <div class="composer-grid compact">
            ${commonPrefix}
            <div class="composer-field wide"><label>Aligned lines</label><textarea data-composer-index="${index}" data-composer-field="lines" placeholder="y = mx + b; m = (y2-y1)/(x2-x1)">${escapeHtml(block.lines || "")}</textarea></div>
          </div>`;
        break;
      case "theorem":
        fields = `
          <div class="composer-grid compact">
            ${commonPrefix}
            <div class="composer-field"><label>Title</label><input type="text" value="${escapeHtml(block.title || "")}" data-composer-index="${index}" data-composer-field="title" /></div>
            <div class="composer-field wide"><label>Statement</label><textarea data-composer-index="${index}" data-composer-field="statement">${escapeHtml(block.statement || "")}</textarea></div>
          </div>`;
        break;
      case "proof":
        fields = `
          <div class="composer-grid compact">
            ${commonPrefix}
            <div class="composer-field wide"><label>Proof steps</label><textarea data-composer-index="${index}" data-composer-field="steps" placeholder="Given; apply; therefore">${escapeHtml(block.steps || "")}</textarea></div>
          </div>`;
        break;
      case "bracket":
        fields = `
          <div class="composer-grid">
            ${commonPrefix}
            <div class="composer-field"><label>Open</label><select data-composer-index="${index}" data-composer-field="open">
              ${["(", "[", "{", "|", "||", "<"].map((item) => `<option value="${escapeHtml(item)}" ${block.open === item ? "selected" : ""}>${escapeHtml(item)}</option>`).join("")}
            </select></div>
            ${renderComposerField(block, index, "value", "Value")}
            <div class="composer-field"><label>Close</label><select data-composer-index="${index}" data-composer-field="close">
              ${[")", "]", "}", "|", "||", ">"].map((item) => `<option value="${escapeHtml(item)}" ${block.close === item ? "selected" : ""}>${escapeHtml(item)}</option>`).join("")}
            </select></div>
          </div>`;
        break;
      case "modulo":
        fields = `
          <div class="composer-grid compact">
            ${commonPrefix}
            ${renderComposerField(block, index, "left", "Left value")}
            ${renderComposerField(block, index, "modulus", "Modulus")}
          </div>`;
        break;
      case "expression":
      default:
        fields = `
          <div class="composer-grid compact">
            ${commonPrefix}
            <div class="composer-field wide"><label>Expression</label><textarea data-composer-index="${index}" data-composer-field="value">${escapeHtml(block.value || "")}</textarea></div>
          </div>`;
        break;
    }

    return `
      <article class="composer-block" data-composer-block="${index}" draggable="true">
        <div class="composer-block-header">
          <div class="composer-block-title">
            <span class="composer-chip">${escapeHtml(block.type)}</span>
            <strong>${escapeHtml(title)}</strong>
          </div>
          <div class="composer-block-actions">
            <select class="composer-type-select" aria-label="Block type" data-composer-action="type" data-composer-index="${index}">
              ${Object.keys(composerTemplateFactories).map((type) => `<option value="${type}" ${block.type === type ? "selected" : ""}>${type}</option>`).join("")}
            </select>
            <button type="button" class="composer-icon" aria-label="Move block up" data-composer-action="move-up" data-composer-index="${index}">↑</button>
            <button type="button" class="composer-icon" aria-label="Move block down" data-composer-action="move-down" data-composer-index="${index}">↓</button>
            <button type="button" class="composer-icon" aria-label="Duplicate block" data-composer-action="duplicate" data-composer-index="${index}">+</button>
            <button type="button" class="composer-icon" aria-label="Remove block" data-composer-action="remove" data-composer-index="${index}">×</button>
          </div>
        </div>
        ${fields}
        <div class="composer-block-preview">
          <span class="mini-label">Preview</span>
          <div class="composer-block-math">${renderMathPreview(composerBlockPreviewExpression(block))}</div>
          <p class="composer-block-text">${escapeHtml(composerBlockPreviewExpression(block))}</p>
        </div>
      </article>
    `;
  }).join("");
  composerOutput.textContent = composerBlocksToEquation();
}

function buildSymbolicVisualizationCards(model = state.formulaModel) {
  if (!model) return [];
  const family = model.solution?.family || identifyFormulaFamily(model) || "";
  const operations = model.structure?.operations || detectOperations(model.normalized || model.formula || "");
  const variables = model.variables || [];
  const cards = [];

  if (model.graphable) {
    cards.push({
      label: "Graph",
      title: "Sampled curve",
      body: "The equation is numeric over x, so the canvas plots sampled points and simulation overlays.",
      code: `${model.normalized}`,
    });
  } else if (family === "finite_series" || operations.includes("summation")) {
    cards.push({
      label: "Series",
      title: "Term accumulator",
      body: "The visualization treats the expression as repeated terms, then accumulates the partial sum.",
      code: "for k = start..end: total += term(k)",
    });
  } else if (family === "piecewise" || operations.includes("piecewise")) {
    cards.push({
      label: "Cases",
      title: "Branch selector",
      body: "Each condition is checked in order; the first true branch supplies the output.",
      code: "if condition_1: return value_1\nelse if condition_2: return value_2",
    });
  } else if (operations.includes("matrix") || operations.includes("matrix layout")) {
    cards.push({
      label: "Matrix",
      title: "Grid layout",
      body: "Rows and columns are preserved as a structured matrix block, ready for linear algebra operations.",
      code: "A[i][j] -> row i, column j",
    });
  } else if (family === "compound_interest") {
    cards.push({
      label: "Growth",
      title: "Compounding loop",
      body: "Principal is repeatedly multiplied by the periodic growth factor across n*t periods.",
      code: "A = P * (1 + r/n)^(n*t)",
    });
  } else if (family === "wave_speed" || family === "frequency_period") {
    cards.push({
      label: "Wave",
      title: "Cycle relation",
      body: "Frequency, wavelength, and period are reciprocal or multiplicative wave quantities.",
      code: family === "wave_speed" ? "v = f * lambda" : "f = 1 / T",
    });
  } else if (["circle_area", "circumference", "sphere_volume", "rectangle_area", "triangle_area"].includes(family)) {
    cards.push({
      label: "Geometry",
      title: "Shape measure",
      body: "The formula maps geometric dimensions into area, length, or volume with unit-aware verification.",
      code: model.solution?.expression || model.normalized,
    });
  } else if (["slope_two_point", "distance_2d"].includes(family)) {
    cards.push({
      label: "Coordinate",
      title: "Point comparison",
      body: "The solver compares coordinate differences and reduces them into slope or Euclidean distance.",
      code: model.solution?.expression || model.normalized,
    });
  } else if (["force_law", "work_formula", "gravitational_force", "kinetic_energy", "momentum"].includes(family)) {
    cards.push({
      label: "Physics",
      title: "Quantity relation",
      body: "Known physical quantities are substituted, units are checked, and the requested variable is isolated.",
      code: model.solution?.expression || model.normalized,
    });
  } else {
    cards.push({
      label: "Symbolic",
      title: "Linked expression",
      body: "This expression is normalized into an algorithm, pseudocode, and executable code template.",
      code: model.solution?.expression || model.normalized,
    });
  }

  cards.push({
    label: "Variables",
    title: variables.length ? variables.join(", ") : "No variables",
    body: `Detected operations: ${operations.join(", ") || "direct expression"}.`,
    code: `target = ${model.target || model.left || "result"}`,
  });

  cards.push({
    label: "Solver",
    title: model.solution?.supported ? "Template linked" : "Template needed",
    body: model.solution?.note || "The formula is available for rendering and code generation.",
    code: `${model.solution?.target || model.target || "result"} = ${model.solution?.expression || model.right || model.normalized}`,
  });

  return cards;
}

function buildFormulaVerificationCards(model = state.formulaModel) {
  if (!model) return [];
  const variables = model.variables || [];
  const operations = model.structure?.operations || [];
  const target = model.solution?.target || model.target || model.left || "result";
  return [
    {
      label: "Domain",
      title: operations.includes("root") ? "Check nonnegative radicands" : operations.includes("division") ? "Check denominators" : "Check input assumptions",
      body: "Reject values that make the expression undefined before evaluating.",
    },
    {
      label: "Substitution",
      title: `Solve for ${target}`,
      body: `Compute ${target}, then substitute it back into the original formula to confirm equality.`,
    },
    {
      label: "Units",
      title: variables.length ? "Keep units consistent" : "No unit-bearing variables",
      body: variables.length ? `${variables.join(", ")} should be measured in compatible units.` : "This expression does not expose variables in the parser.",
    },
    {
      label: "Engine",
      title: model.solution?.supported ? "Supported solver family" : "General symbolic pipeline",
      body: model.solution?.family ? `Family: ${model.solution.family}.` : "The engine can still render, explain, and generate code.",
    },
  ];
}

function renderCardGrid(cards, className = "symbolic-card") {
  return cards.map((card) => `
    <article class="${className}">
      <span>${escapeHtml(card.label)}</span>
      <strong>${escapeHtml(card.title)}</strong>
      <p>${escapeHtml(card.body)}</p>
      ${card.code ? `<code>${escapeHtml(card.code)}</code>` : ""}
    </article>
  `).join("");
}

function renderSymbolicVisualization(model = state.formulaModel) {
  if (!symbolicVisualization) return;
  symbolicVisualization.innerHTML = renderCardGrid(buildSymbolicVisualizationCards(model));
}

function renderVerificationCards(model = state.formulaModel) {
  return `<div class="verification-card-grid">${buildFormulaVerificationCards(model).map((card) => `
    <div>
      <span>${escapeHtml(card.label)}</span>
      <strong>${escapeHtml(card.title)}</strong>
      <p>${escapeHtml(card.body)}</p>
    </div>
  `).join("")}</div>`;
}

const FAMILY_DIMENSIONS = {
  force_law: { F: "force", m: "mass", a: "acceleration" },
  kinematics_displacement: { s: "length", u: "speed", v: "speed", a: "acceleration", t: "time" },
  circle_area: { A: "area", r: "length" },
  circumference: { C: "length", r: "length" },
  sphere_volume: { V: "volume", r: "length" },
  ohms_law: { V: "voltage", I: "current", R: "resistance" },
  momentum: { p: "momentum", m: "mass", v: "speed" },
  kinetic_energy: { KE: "energy", m: "mass", v: "speed" },
  work_formula: { W: "energy", F: "force", d: "length" },
  speed_distance_time: { v: "speed", d: "length", t: "time" },
  wave_speed: { v: "speed", f: "frequency", lambda: "length" },
  frequency_period: { f: "frequency", T: "time" },
  pressure: { P: "pressure", F: "force", A: "area" },
  density: { rho: "density", m: "mass", V: "volume" },
  power_law: { P: "power", V: "voltage", I: "current" },
  rectangle_area: { A: "area", l: "length", w: "length" },
  triangle_area: { A: "area", b: "length", h: "length" },
  arithmetic_mean: { mean: "average", mu: "average", xbar: "average", sum: "total", n: "count" },
  percent_change: { percent_change: "percent", p: "percent", old: "baseline", new: "measurement" },
};

function detectInputIntent(input = equationInput.value) {
  const text = String(input || "").trim();
  const lower = text.toLowerCase();
  const hasFormula = /[=Σ∑^*/]|sqrt|sin|cos|tan|cases|\[\[/i.test(text);
  let intent = hasFormula ? "visualize equation" : "ask tutor";
  if (/explain|teach|what is|meaning/.test(lower)) intent = "learn concept";
  if (/solve|calculate|find|compute/.test(lower)) intent = "solve problem";
  if (/algorithm|pseudocode|code|program/.test(lower)) intent = "generate algorithm and code";
  if (/search|library|theorem|formula|browse/.test(lower)) intent = "search library";
  if (/graph|plot|visual/.test(lower) && hasFormula) intent = "visualize equation";
  const matches = formulaLibrary
    .filter((item) => lower && `${item.title} ${item.category} ${item.description} ${item.formula}`.toLowerCase().includes(lower.replace(/^(explain|solve|search|find|plot|graph)\s+/, "")))
    .slice(0, 4);
  const topic = matches[0]?.title || (hasFormula ? classifyEquation(text) : text || "Current input");
  const outputs = {
    "visualize equation": ["graph or symbolic visual", "explanation", "verification", "code"],
    "learn concept": ["concept", "theorem view", "example", "quiz"],
    "solve problem": ["solver target", "algorithm", "substitution check", "code"],
    "generate algorithm and code": ["algorithm", "pseudocode", "Python/JavaScript", "verification"],
    "search library": ["library matches", "related topics", "learning path", "examples"],
    "ask tutor": ["concept explanation", "practice problem", "hints", "assessment"],
  }[intent];
  return { intent, topic, hasFormula, outputs, matches };
}

function renderInputIntelligence(input = equationInput.value) {
  state.inputIntent = detectInputIntent(input);
  if (!inputIntentPanel) return;
  inputIntentPanel.innerHTML = `
    <article>
      <span>Intent</span>
      <strong>${escapeHtml(state.inputIntent.intent)}</strong>
      <p>${escapeHtml(state.inputIntent.topic)}</p>
    </article>
    <article>
      <span>Outputs</span>
      <p>${escapeHtml(state.inputIntent.outputs.join(", "))}</p>
    </article>
    <article>
      <span>Library matches</span>
      <p>${escapeHtml(state.inputIntent.matches.map((item) => item.title).join(", ") || "No direct library match yet.")}</p>
    </article>
  `;
}

function buildSampleValues(model) {
  const defaults = {
    x: 2, y: 3, k: 2, n: 4, t: 3, r: 5, theta: Math.PI / 4, pi: Math.PI, e: Math.E,
    m: 4, a: 3, F: 12, s: 42, u: 5, v: 11, A: 78.5, P: 1000, I: 2, R: 6,
    E: 18, c: 3, p: 20, KE: 72, V: 12, rho: 4, C: 31.4, G: 6.67,
    m1: 10, m2: 20, lambda: 2, f: 12, T: 0.25, d: 40, l: 8, w: 5, b: 10,
    h: 6, mean: 12, sum: 84, old: 80, new: 100, percent_change: 25,
    x1: 1, y1: 2, x2: 4, y2: 6,
  };
  const values = {};
  (model?.variables || []).forEach((variable, index) => {
    values[variable] = defaults[variable] ?? index + 2;
  });
  return values;
}

function toJavaScriptExpression(expression) {
  let output = normalizeForCode(String(expression || "0"))
    .replace(/\^/g, "**")
    .replace(/\bpi\b/g, "Math.PI")
    .replace(/\be\b/g, "Math.E")
    .replace(/\bsqrt\s*\(/g, "Math.sqrt(")
    .replace(/\bsin\s*\(/g, "Math.sin(")
    .replace(/\bcos\s*\(/g, "Math.cos(")
    .replace(/\btan\s*\(/g, "Math.tan(")
    .replace(/\blog\s*\(/g, "Math.log10(")
    .replace(/\bln\s*\(/g, "Math.log(")
    .replace(/\bexp\s*\(/g, "Math.exp(");
  output = output.replace(/([A-Za-z_][A-Za-z0-9_]*)/g, (token) => token.startsWith("Math") ? token : token);
  return output;
}

function evaluateWithValues(expression, values) {
  const names = Object.keys(values);
  const args = names.map((name) => values[name]);
  const body = `"use strict"; return (${toJavaScriptExpression(expression)});`;
  return Function(...names, body)(...args);
}

function verifySubstitutionNumerically(model) {
  if (!model || !model.solution?.supported || String(model.solution.expression || "").startsWith("unsupported_target(")) {
    return { status: "skipped", message: "No supported solver expression is available for numeric substitute-back.", sampleValues: {} };
  }
  const sampleValues = buildSampleValues(model);
  try {
    const solvedValue = evaluateWithValues(model.solution.expression, sampleValues);
    const substituted = { ...sampleValues, [model.solution.target || model.target]: solvedValue };
    const lhs = model.left ? evaluateWithValues(model.left, substituted) : solvedValue;
    const rhs = model.right ? evaluateWithValues(model.right, substituted) : solvedValue;
    const error = Math.abs(lhs - rhs);
    return {
      status: Number.isFinite(error) && error < 1e-6 ? "passed" : "review",
      solvedValue,
      lhs,
      rhs,
      error,
      sampleValues,
      message: `Sample substitution produced left=${formatNumber(lhs)}, right=${formatNumber(rhs)}, error=${formatNumber(error)}.`,
    };
  } catch (error) {
    return { status: "skipped", message: `Numeric substitute-back skipped: ${error.message}`, sampleValues };
  }
}

function buildDomainRestrictions(model) {
  const operations = model?.structure?.operations || [];
  const restrictions = [];
  if (operations.includes("division")) restrictions.push("Denominators must not be zero.");
  if (operations.includes("root")) restrictions.push("Real square-root inputs must be greater than or equal to zero.");
  if (operations.includes("logarithmic function")) restrictions.push("Logarithm inputs must be positive.");
  if (/\/\s*([A-Za-z][A-Za-z0-9_]*)/.test(model?.right || "")) restrictions.push(`Check denominator variable ${RegExp.$1} != 0.`);
  if (!restrictions.length) restrictions.push("No special domain restrictions detected beyond valid numeric input.");
  return restrictions;
}

function buildUnitProfile(model) {
  const family = model?.solution?.family || identifyFormulaFamily(model || {});
  const dimensions = FAMILY_DIMENSIONS[family] || {};
  const variables = model?.variables || [];
  return {
    family: family || "general_expression",
    dimensions,
    summary: variables.length
      ? variables.map((variable) => `${variable}: ${dimensions[variable] || "scalar/unknown"}`).join(", ")
      : "No unit-bearing variables detected.",
    consistent: Boolean(FAMILY_DIMENSIONS[family]) || variables.length <= 2,
  };
}

function buildVerificationReport(model = state.formulaModel, analysis = state.analysis) {
  if (!model) return { status: "No formula", confidence: 0, checks: [], issues: ["Enter a formula first."], method: "Waiting for input." };
  const operations = model.structure?.operations || [];
  const variables = model.variables || [];
  const numericCheck = verifySubstitutionNumerically(model);
  const domainRestrictions = buildDomainRestrictions(model);
  const unitProfile = buildUnitProfile(model);
  const checks = [
    `Parser mode: ${model.parsedEquation?.errors?.length ? "fallback parser" : "Math.js or normalized parser"}.`,
    `Detected variables: ${variables.join(", ") || "none"}.`,
    `Detected operations: ${operations.join(", ") || "direct expression"}.`,
    `Solve target: ${model.solution?.target || model.target || model.left || "result"}.`,
    `Numeric substitute-back: ${numericCheck.status}. ${numericCheck.message}`,
    `Units: ${unitProfile.summary}.`,
  ];
  const issues = [];
  if (operations.includes("division")) issues.push("Check every denominator is nonzero before substitution.");
  if (operations.includes("root")) issues.push("Check square-root radicands are nonnegative in real-valued mode.");
  if (!model.solution?.supported) issues.push("No dedicated isolation template exists for the selected target yet.");
  if (numericCheck.status === "review") issues.push("Numeric substitute-back produced a nonzero difference.");
  if (analysis?.verification?.status && analysis.verification.status !== "passed") issues.push("Graph sampling verification did not pass.");
  const confidence = Math.max(45, 98 - issues.length * 12 - (numericCheck.status === "skipped" ? 6 : 0) - (model.parsedEquation?.errors?.length ? 10 : 0));
  return {
    status: issues.length ? "Needs review" : "Verified",
    confidence,
    checks,
    issues: issues.length ? issues : ["No blocking verification issues detected."],
    method: analysis ? `Sampled ${analysis.points.length} graph points and checked max error ${formatNumber(analysis.verification.maxError)}.` : "Symbolic verification uses domain, substitution, unit, and solver-family checks.",
    substitution: `Substitute ${model.solution?.target || model.target || "result"} = ${model.solution?.expression || model.right || model.normalized} back into ${model.normalized}.`,
    numericCheck,
    domainRestrictions,
    unitProfile,
  };
}

function buildMathMl(model = state.formulaModel) {
  if (!model) return "<math></math>";
  const tokens = String(model.normalized || "")
    .replace(/([=+\-*/^()])/g, " $1 ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  const body = tokens.map((token) => {
    if (/^[=+\-*/^()]$/.test(token)) return `<mo>${escapeHtml(token)}</mo>`;
    if (/^\d+(\.\d+)?$/.test(token)) return `<mn>${escapeHtml(token)}</mn>`;
    return `<mi>${escapeHtml(token)}</mi>`;
  }).join("");
  return `<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow>${body}</mrow></math>`;
}

function buildGraphAltText(analysis = state.analysis, model = state.formulaModel) {
  if (!model) return "No equation has been loaded.";
  if (!analysis) {
    return `Symbolic formula ${describeMath(model.normalized)}. It has ${model.variables.length || "no"} detected variables and solver status ${model.solution?.supported ? "linked" : "general"}.`;
  }
  const ys = analysis.points.map((point) => point.y).filter(Number.isFinite);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  return `Graph of ${describeMath(model.normalized)}. It is a ${analysis.type} sampled with ${analysis.points.length} points. The y-values range from ${formatNumber(minY)} to ${formatNumber(maxY)}.`;
}

function buildGraphExplorer(analysis = state.analysis, index = state.explorerIndex) {
  if (!analysis?.points?.length) {
    return {
      index: 0,
      total: 0,
      text: "No graph samples are available. Symbolic formulas can still be explored through the structure and verification cards.",
      point: null,
    };
  }
  const safeIndex = Math.max(0, Math.min(analysis.points.length - 1, Number(index) || 0));
  const point = analysis.points[safeIndex];
  return {
    index: safeIndex,
    total: analysis.points.length,
    point,
    text: `Point ${safeIndex + 1} of ${analysis.points.length}: x = ${formatNumber(point.x)}, y = ${formatNumber(point.y)}.`,
  };
}

function buildAccessibilityBundle(model = state.formulaModel, analysis = state.analysis) {
  const explorer = buildGraphExplorer(analysis);
  return {
    narration: model ? `This formula reads as: ${describeMath(model.normalized)}. The selected target is ${model.solution?.target || model.target || "result"}. ${model.solution?.note || "The expression is linked to the solver pipeline."}` : "Enter a formula to generate narration.",
    mathMl: buildMathMl(model),
    graphAlt: buildGraphAltText(analysis, model),
    keyboardGuide: analysis ? "Use the graph sample slider to inspect points. Keyboard users can focus the slider and press ArrowLeft or ArrowRight to move sample by sample." : "Symbolic mode exposes formula structure, verification checks, MathML, and narrated text without requiring a visual graph.",
    explorer,
    sonification: analysis ? `Audio uses ${analysis.audio.length} normalized samples. Higher y-values are mapped to louder waveform amplitudes.` : "No audio samples are generated for symbolic-only formulas.",
  };
}

function buildTheoremExplorerModel(item = getSelectedLibraryItem(), model = state.formulaModel) {
  const sourceTitle = item?.title || model?.type || "Current formula";
  const sourceFormula = item?.formula || model?.normalized || "";
  const isTheorem = /theorem|law|rule|identity|principle/i.test(sourceTitle) || /theorem\{/i.test(sourceFormula);
  return {
    title: isTheorem ? sourceTitle : "Formula theorem view",
    statement: isTheorem ? sourceFormula : `For ${sourceTitle}, the stated relationship holds under its listed assumptions.`,
    meaning: item?.description || model?.solution?.note || "The theorem explorer turns a selected formula into statement, meaning, proof sketch, example, use case, and related concepts.",
    proof: [
      "State assumptions and allowed input domain.",
      "Apply the definition or transformation rule step by step.",
      "Verify the final expression by substitution or a known special case.",
    ],
    example: item?.exampleProblem || "Load a formula from the library to generate a concrete theorem-style example.",
    useCase: item?.applications || "Learning, verification, and code-backed explanation.",
  };
}

function buildKnowledgeGraphModel(item = getSelectedLibraryItem(), model = state.formulaModel) {
  const current = item?.title || model?.type || "Current formula";
  const prerequisites = String(item?.prerequisites || "Algebra, notation, substitution").split(/,\s*/).filter(Boolean).slice(0, 3);
  const related = String(item?.relatedTopics || model?.structure?.operations?.join(", ") || "Verification, code generation").split(/,\s*/).filter(Boolean).slice(0, 5);
  const nodes = [
    ...prerequisites.map((label, index) => ({ label, type: "prerequisite", level: 0, x: 12, y: 20 + index * 22 })),
    { label: current, type: "current", level: 1, x: 48, y: 42 },
    ...related.map((label, index) => ({ label, type: "related", level: 2, x: 82, y: 12 + index * 18 })),
  ];
  const edges = [
    ...prerequisites.map((label) => `${label} -> ${current}`),
    ...related.map((label) => `${current} -> ${label}`),
  ];
  return { nodes, edges };
}

function buildSandboxBlueprint(model = state.formulaModel) {
  const equationLabel = model?.normalized || "Equation";
  const graphable = Boolean(model?.graphable);
  const blocks = [
    { title: "Equation block", body: equationLabel, ports: ["formula out"], status: "active" },
    { title: graphable ? "Graph block" : "Symbolic visual block", body: graphable ? "Receives sampled points from the equation." : "Receives formula structure and operations.", ports: ["formula in", "visual out"], status: graphable ? "graph" : "symbolic" },
    { title: "Solver block", body: `Target: ${model?.solution?.target || model?.target || "result"}`, ports: ["formula in", "result out"], status: model?.solution?.supported ? "linked" : "template needed" },
    { title: "Code block", body: "Generates Python or JavaScript from the same formula model.", ports: ["solver in", "code out"], status: "ready" },
    { title: "Verification block", body: "Runs domain, substitution, unit, and parser checks.", ports: ["solver in", "report out"], status: "ready" },
    { title: "Narration block", body: "Produces accessible text, MathML, and graph alt text.", ports: ["visual in", "audio/text out"], status: "ready" },
  ];
  const connections = ["Equation -> Visual", "Equation -> Solver", "Solver -> Code", "Solver -> Verification", "Visual -> Narration"];
  return { blocks, connections };
}

function buildProfessorModeModel(item = getSelectedLibraryItem(), model = state.formulaModel) {
  const topic = item?.title || model?.type || "Current formula";
  return {
    concept: item?.concept || item?.description || model?.solution?.note || "Understand the formula, identify inputs, solve the target, and verify the result.",
    demonstration: item?.workedExample || model?.algorithm || "Use the generated algorithm panel for the step-by-step demonstration.",
    hints: [
      "Start by naming the target variable.",
      "List known values before substituting.",
      "Check domain and units before trusting the numeric result.",
    ],
    lessonFlow: ["Concept", "Visual demo", "Guided solve", "Hint", "Quiz", "Practice", "Assessment"],
    quiz: `Which variables must be known before solving ${topic}?`,
    practice: item?.exampleProblem || `Create one numerical example for ${topic}, solve it, then substitute the answer back.`,
    assessment: "Ready when the user can explain the formula, solve one target, and verify with substitution.",
  };
}

function renderAdvancedLayers(model = state.formulaModel) {
  const item = getSelectedLibraryItem();
  const verification = buildVerificationReport(model, state.analysis);
  const accessibility = buildAccessibilityBundle(model, state.analysis);
  const theorem = buildTheoremExplorerModel(item, model);
  const graph = buildKnowledgeGraphModel(item, model);
  const sandbox = buildSandboxBlueprint(model);
  const professor = buildProfessorModeModel(item, model);

  if (verificationReport) {
    verificationReport.innerHTML = `
      <article><span>Status</span><strong>${escapeHtml(verification.status)}</strong><p>Confidence: ${verification.confidence}%</p></article>
      <article><span>Method</span><strong>${escapeHtml(verification.method)}</strong><p>${escapeHtml(verification.substitution)}</p></article>
      <article><span>Checks</span><ul>${verification.checks.map((check) => `<li>${escapeHtml(check)}</li>`).join("")}</ul></article>
      <article><span>Issues</span><ul>${verification.issues.map((issue) => `<li>${escapeHtml(issue)}</li>`).join("")}</ul></article>
      <article><span>Domain</span><ul>${verification.domainRestrictions.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></article>
      <article><span>Units</span><strong>${escapeHtml(verification.unitProfile.family)}</strong><p>${escapeHtml(verification.unitProfile.summary)}</p></article>
      <article><span>Numeric substitute-back</span><strong>${escapeHtml(verification.numericCheck.status)}</strong><p>${escapeHtml(verification.numericCheck.message)}</p></article>
      <article><span>Sample values</span><p>${escapeHtml(Object.entries(verification.numericCheck.sampleValues || {}).map(([key, value]) => `${key}=${formatNumber(value)}`).join(", ") || "No sample values.")}</p></article>
    `;
  }
  if (accessibilityNarration) accessibilityNarration.textContent = accessibility.narration;
  if (mathMlOutput) mathMlOutput.textContent = accessibility.mathMl;
  if (graphAltText) graphAltText.textContent = accessibility.graphAlt;
  if (keyboardGraphGuide) keyboardGraphGuide.textContent = `${accessibility.keyboardGuide} ${accessibility.sonification}`;
  if (graphExplorerRange) {
    graphExplorerRange.max = Math.max(0, accessibility.explorer.total - 1);
    graphExplorerRange.value = String(accessibility.explorer.index);
    graphExplorerRange.disabled = !accessibility.explorer.total;
  }
  if (graphExplorerOutput) graphExplorerOutput.textContent = accessibility.explorer.text;
  if (theoremExplorer) {
    theoremExplorer.innerHTML = `
      <article><span>Statement</span><strong>${escapeHtml(theorem.title)}</strong><p>${escapeHtml(theorem.statement)}</p></article>
      <article><span>Meaning</span><p>${escapeHtml(theorem.meaning)}</p></article>
      <article><span>Proof sketch</span><ol>${theorem.proof.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol></article>
      <article><span>Example and use</span><p>${escapeHtml(theorem.example)}</p><p>${escapeHtml(theorem.useCase)}</p></article>
    `;
  }
  if (knowledgeGraphPanel) {
    knowledgeGraphPanel.innerHTML = `
      <div class="knowledge-map">${graph.nodes.map((node) => `<span data-node-type="${escapeHtml(node.type)}" style="--node-x:${node.x}%;--node-y:${node.y}%">${escapeHtml(node.label)}</span>`).join("")}</div>
      <pre>${escapeHtml(graph.edges.join("\n"))}</pre>
    `;
  }
  if (sandboxBlueprint) {
    sandboxBlueprint.innerHTML = `
      <div class="sandbox-block-grid">${sandbox.blocks.map((block) => `<article data-sandbox-status="${escapeHtml(block.status)}"><span>${escapeHtml(block.title)}</span><p>${escapeHtml(block.body)}</p><small>${escapeHtml(block.ports.join(" -> "))}</small></article>`).join("")}</div>
      <pre>${escapeHtml(sandbox.connections.join("\n"))}</pre>
    `;
  }
  if (professorMode) {
    professorMode.innerHTML = `
      <article><span>Concept</span><p>${escapeHtml(professor.concept)}</p></article>
      <article><span>Demonstration</span><pre>${escapeHtml(professor.demonstration)}</pre></article>
      <article><span>Lesson flow</span><p>${escapeHtml(professor.lessonFlow.join(" -> "))}</p></article>
      <article><span>Hints</span><ul>${professor.hints.map((hint) => `<li>${escapeHtml(hint)}</li>`).join("")}</ul></article>
      <article><span>Quiz</span><p>${escapeHtml(professor.quiz)}</p></article>
      <article><span>Practice</span><p>${escapeHtml(professor.practice)}</p></article>
      <article><span>Assessment</span><p>${escapeHtml(professor.assessment)}</p></article>
    `;
  }
}

function renderFormulaModule(model = state.formulaModel) {
  if (!model) return;
  renderMathInto(mathPreview, model.normalized);
  renderMathInto(mathPresenter, model.normalized, { displayMode: true });
  mathLatexSource.textContent = model.cleanLatex;
  mathTextbookForm.textContent = formatTextbookMath(model.normalized);
  mathAccessibleText.textContent = `Accessible math: ${describeMath(model.normalized)}`;
  formulaStatus.textContent = model.graphable ? "Linked + visual" : "Linked";
  const solverPresentation = getSolverPresentation(model);
  solverSupportBadge.textContent = solverPresentation.badge;
  solverSupportBadge.dataset.support = solverPresentation.support;
  solverSupportTitle.textContent = solverPresentation.title;
  solverSupportNote.textContent = solverPresentation.note;
  solverFamilyTag.textContent = model.solution.family || "general_expression";
  solveTarget.innerHTML = model.solveTargets.map((target) => `<option value="${escapeHtml(target)}">${escapeHtml(target)}</option>`).join("");
  solveTarget.value = model.target;
  structureOutput.textContent = JSON.stringify(model.structure, null, 2);
  algorithmOutput.textContent = model.algorithm;
  pseudocodeOutput.textContent = model.pseudocode;
  codeOutput.textContent = generateCode(model, languageSelect.value);
  solverOutput.textContent = [
    `Support: ${solverPresentation.badge}`,
    `Solve target: ${model.target}`,
    `Result: ${model.target} = ${model.solution.expression}`,
    `Family: ${model.solution.family || "general_expression"}`,
    `Note: ${model.solution.note}`,
    `Clean LaTeX: ${model.cleanLatex}`,
  ].join("\n");
  renderSymbolicVisualization(model);
  renderAdvancedLayers(model);
}

function getSelectedLibraryItem() {
  return formulaLibrary.find((item) => item.id === state.selectedLibraryId) || formulaLibrary[0];
}

function renderLibraryFilters() {
  const categories = ["All categories", ...Array.from(new Set(formulaLibrary.map((item) => item.category))).sort()];
  libraryCategory.innerHTML = categories.map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`).join("");
}

function getFilteredLibraryItems() {
  const query = librarySearch.value.trim().toLowerCase();
  const category = libraryCategory.value;
  const difficulty = libraryDifficulty.value;
  return formulaLibrary.filter((item) => {
    const searchable = `${item.title} ${item.category} ${item.difficulty} ${item.formula} ${item.description} ${item.solverSupport} ${item.solverFamily || ""} ${item.solverTargets.join(" ")}`.toLowerCase();
    const matchesQuery = !query || searchable.includes(query);
    const matchesCategory = !category || category === "All categories" || item.category === category;
    const matchesDifficulty = difficulty === "all" || item.difficulty === difficulty;
    return matchesQuery && matchesCategory && matchesDifficulty;
  });
}

function renderLibrary() {
  const items = getFilteredLibraryItems();
  libraryCount.textContent = `${items.length} stored`;
  renderLibraryStats(items);
  if (!items.some((item) => item.id === state.selectedLibraryId) && items[0]) {
    state.selectedLibraryId = items[0].id;
  }
  libraryList.innerHTML = items.map((item) => `
    <button class="library-card ${item.id === state.selectedLibraryId ? "active" : ""}" type="button" data-library-id="${escapeHtml(item.id)}">
      <span>${escapeHtml(item.category)}</span>
      <strong>${escapeHtml(item.title)}</strong>
      <small>${escapeHtml(item.difficulty)} · ${escapeHtml(item.solverSupport)} · ${escapeHtml(item.formula)}</small>
    </button>
  `).join("") || `<p class="empty-state">No stored formula matched this search.</p>`;
  renderLibraryDetail(getSelectedLibraryItem());
}

function renderLibraryStats(items = getFilteredLibraryItems()) {
  if (!libraryStats) return;
  const linked = items.filter((item) => item.solverSupport === "linked solver").length;
  const categories = new Set(items.map((item) => item.category)).size;
  const advanced = items.filter((item) => item.difficulty === "Advanced").length;
  const visual = items.filter((item) => item.visualization?.length).length;
  libraryStats.innerHTML = [
    ["Stored", String(items.length), "Filtered formulas and algorithms."],
    ["Linked", String(linked), "Items connected to solver templates."],
    ["Categories", String(categories), "Higher-study topic groups."],
    ["Visual-ready", String(visual || advanced), "Items with visualization metadata."],
  ].map(([label, value, body]) => `
    <article class="library-stat-card">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
      <p>${escapeHtml(body)}</p>
    </article>
  `).join("");
}

function renderLibraryLearningPath(item) {
  if (!libraryLearningPath || !item) return;
  const prerequisite = item.prerequisites || buildPrerequisites(item);
  const related = item.relatedTopics || buildRelatedTopics(item);
  libraryLearningPath.innerHTML = [
    ["Prerequisite", prerequisite],
    ["Current", item.title],
    ["Next", related],
  ].map(([label, value]) => `
    <div>
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
    </div>
  `).join("");
}

function renderLibraryDetail(item) {
  if (!item) return;
  libraryDetailCategory.textContent = item.category;
  libraryDetailDifficulty.textContent = item.difficulty;
  libraryDetailTitle.textContent = item.title;
  renderMathInto(libraryFormula, item.formula);
  libraryAccessibleText.textContent = `Accessible math: ${describeMath(item.formula)}`;
  libraryDescription.textContent = item.description;
  libraryInputs.textContent = item.inputs.join(", ");
  libraryOutputs.textContent = item.outputs.join(", ");
  libraryVisualization.textContent = item.visualization.join(", ");
  libraryVerification.textContent = item.verification;
  librarySolverSupport.textContent = item.solverSupport;
  librarySolverTargets.textContent = item.solverTargets.length ? item.solverTargets.join(", ") : "Reference only";
  libraryConcept.textContent = item.concept;
  libraryExampleProblem.textContent = item.exampleProblem;
  libraryWorkedExample.textContent = item.workedExample;
  libraryVerificationSteps.textContent = item.verificationSteps;
  libraryPrerequisites.textContent = item.prerequisites;
  libraryRelatedTopics.textContent = item.relatedTopics;
  libraryApplications.textContent = item.applications;
  renderLibraryLearningPath(item);
  renderAdvancedLayers(state.formulaModel || buildFormulaModel(item.formula));
  libraryAlgorithm.textContent = [
    "Algorithm",
    ...item.algorithm.map((step, index) => `${index + 1}. ${step}`),
    "",
    "Engine link",
    item.solverFamily ? `Solver family: ${item.solverFamily}` : "No stored solver family linked yet.",
    "",
    "Pseudocode",
    item.pseudocode,
    "",
    "Python template",
    item.code.python || "Template coming soon.",
  ].join("\n");
}

function loadLibraryItem(item = getSelectedLibraryItem()) {
  if (!item) return;
  equationInput.value = item.formula;
  state.composerBlocks = buildComposerFromEquation(item.formula);
  renderComposer();
  languageSelect.value = item.code[languageSelect.value] ? languageSelect.value : "python";
  setError("");
  state.pipeline = buildMathPipeline(item.formula);
  state.formulaModel = state.pipeline.formulaModel;
  state.analysis = state.pipeline.analysis;
  renderFormulaModule();
  drawFormulaPlaceholder({
    type: item.category,
    normalized: item.formula,
  });
  renderSymbolicInsights(state.formulaModel);
  statusPill.textContent = item.solverFamily ? "Library linked" : "Library reference";
  algorithmOutput.textContent = item.algorithm.map((step, index) => `${index + 1}. ${step}`).join("\n");
  pseudocodeOutput.textContent = item.pseudocode;
  if (item.code[languageSelect.value] || item.code.python) {
    codeOutput.textContent = item.code[languageSelect.value] || item.code.python;
  }
  solverOutput.textContent = [
    `Library item: ${item.title}`,
    `Category: ${item.category}`,
    `Difficulty: ${item.difficulty}`,
    `Solver support: ${item.solverSupport}`,
    `Solver family: ${item.solverFamily || "none"}`,
    `Verification: ${item.verification}`,
  ].join("\n");
}

function renderMathPreview(input) {
  return escapeHtml(formatTextbookMath(input))
    .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '<span class="frac"><span>$1</span><span>$2</span></span>')
    .replace(/\b(\d+)\/(\d+)(?=[A-Za-zα-ωΑ-Ω])/g, '<span class="frac"><span>$1</span><span>$2</span></span>')
    .replace(/\b(\d+)\/(\d+)\b/g, '<span class="frac"><span>$1</span><span>$2</span></span>')
    .replace(/\[\[([^\]]+)\],\s*\[([^\]]+)\]\]/g, '<span class="matrix"><span>$1</span><span>$2</span></span>')
    .replace(/cases\{([^{}]+?) if ([^;]+);\s*([^{}]+?) if ([^}]+)\}/g, '<span class="cases"><span>$1 if $2</span><span>$3 if $4</span></span>')
    .replace(/align\{([^}]+)\}/g, (_, lines) => `<span class="aligned">${lines.split(";").map((line) => `<span>${line.trim()}</span>`).join("")}</span>`)
    .replace(/theorem\{title: ([^;]+);\s*statement: ([^}]+)\}/g, '<span class="theorem-preview"><b>$1</b><span>$2</span></span>')
    .replace(/proof\{([^}]+)\}/g, (_, steps) => `<span class="proof-preview">${steps.split(";").map((step, index) => `<span>${index + 1}. ${step.trim()}</span>`).join("")}</span>`)
    .replace(/bracket\{([^,]+),\s*([^,]+),\s*([^}]+)\}/g, '<span class="bracket-preview">$1<span>$2</span>$3</span>')
    .replace(/Σ\(k=([0-9-]+) to ([0-9-]+)\)/g, '<span class="sum-symbol">Σ</span><sub>k=$1</sub><sup>$2</sup>')
    .replace(/Σ\(n=([0-9-]+) to ([^)]+)\)/g, '<span class="sum-symbol">Σ</span><sub>n=$1</sub><sup>$2</sup>')
    .replace(/√\[([^\]]+)\]\(([^)]+)\)/g, '<span class="root"><sup>$1</sup><span>$2</span></span>')
    .replace(/sqrt\(([^)]+)\)/g, '<span class="root">√<span>$1</span></span>')
    .replace(/\^2/g, "<sup>2</sup>")
    .replace(/\^3/g, "<sup>3</sup>")
    .replace(/\n/g, "<br>");
}

function renderMathInto(element, input, options = {}) {
  const latex = toCleanLatex(input);
  if (window.katex) {
    try {
      window.katex.render(latex, element, {
        throwOnError: false,
        displayMode: Boolean(options.displayMode),
        strict: "ignore",
        trust: false,
      });
      element.dataset.renderer = "katex";
      return;
    } catch {
      // Fall through to the local renderer.
    }
  }
  element.innerHTML = renderMathPreview(input);
  element.dataset.renderer = "fallback";
}

function describeMath(input) {
  return normalizeEquation(input)
    .replace(/Σ/g, "summation ")
    .replace(/√/g, "square root ")
    .replace(/π|\bpi\b/g, " pi ")
    .replace(/\^2/g, " squared")
    .replace(/\^3/g, " cubed")
    .replace(/\*/g, " times ")
    .replace(/\//g, " divided by ")
    .replace(/=/g, " equals ")
    .replace(/\+/g, " plus ")
    .replace(/-/g, " minus ")
    .replace(/\s+/g, " ")
    .trim();
}

function drawFormulaPlaceholder(model) {
  clearCanvas();
  ctx.fillStyle = getCss("--text");
  ctx.font = "700 24px system-ui";
  ctx.fillText(model.type, 58, 80);
  ctx.font = "16px system-ui";
  ctx.fillStyle = getCss("--muted");
  wrapCanvasText(`This formula is linked to the solver/code module. It may not have a numeric graph, but it can still be converted into algorithm, pseudocode, code, and solver steps.`, 58, 122, canvas.width - 116, 28);
  ctx.fillStyle = "#0f766e";
  ctx.font = "700 20px system-ui";
  wrapCanvasText(model.normalized, 58, 230, canvas.width - 116, 34);
}

function wrapCanvasText(text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  words.forEach((word) => {
    const testLine = `${line}${word} `;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      ctx.fillText(line, x, y);
      line = `${word} `;
      y += lineHeight;
    } else {
      line = testLine;
    }
  });
  ctx.fillText(line, x, y);
}

function renderSymbolicInsights(model) {
  typeMetric.textContent = model.type;
  sampleMetric.textContent = "symbolic";
  errorMetric.textContent = "-";
  verifyMetric.textContent = "linked";
  graphSummary.textContent = `This ${model.type} is linked to the formula-to-code solver. Use the lower panel to inspect the math tree, algorithm, pseudocode, code, and solver output.`;
  explainTab.innerHTML = `<ol><li>The input is parsed as ${escapeHtml(model.type)}.</li><li>The formula is normalized into a code-ready expression.</li><li>Variables are extracted and connected to solve targets.</li><li>The solver panel generates algorithm, pseudocode, and programming code from the same linked structure.</li></ol>`;
  verifyTab.innerHTML = `<ul><li>Formula linked successfully.</li><li>Parser: ${escapeHtml(model.parsedEquation?.errors?.length ? "fallback" : "Math.js")}</li><li>Detected variables: ${escapeHtml(model.variables.join(", ") || "none")}.</li><li>Detected operations: ${escapeHtml(model.structure.operations.join(", "))}.</li></ul>${renderVerificationCards(model)}`;
  renderSymbolicVisualization(model);
}

function drawAnalysis() {
  if (!state.analysis) return;
  clearCanvas();
  const analysis = state.analysis;
  if (state.view === "components" && analysis.components.length) {
    drawAxes(analysis.points, "Component view");
    analysis.components.forEach((component, index) => drawLine(component.points, colorFor(index), 1.4));
    drawLegend(analysis.components.map((component, index) => ({ label: component.label, color: colorFor(index) })));
  } else {
    drawAxes(analysis.points, analysis.type);
    drawLine(analysis.points, "#0f766e", 3);
    if (state.view === "simulation") drawSimulationOverlay(analysis);
  }
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = getComputedStyle(document.body).getPropertyValue("--surface").trim() || "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function getBounds(points) {
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  let minX = Math.min(...xs);
  let maxX = Math.max(...xs);
  let minY = Math.min(...ys);
  let maxY = Math.max(...ys);
  if (Math.abs(maxX - minX) < 1e-9) {
    minX -= 1;
    maxX += 1;
  }
  if (Math.abs(maxY - minY) < 1e-9) {
    minY -= 1;
    maxY += 1;
  }
  const yPad = (maxY - minY) * 0.16;
  const xPad = (maxX - minX) * 0.06;
  minX -= xPad;
  maxX += xPad;
  minY -= yPad;
  maxY += yPad;

  const plotAspect = (canvas.width - 116) / (canvas.height - 116);
  const dataAspect = (maxX - minX) / (maxY - minY);
  if (dataAspect < plotAspect) {
    const targetWidth = (maxY - minY) * plotAspect;
    const extra = (targetWidth - (maxX - minX)) / 2;
    minX -= extra;
    maxX += extra;
  } else {
    const targetHeight = (maxX - minX) / plotAspect;
    const extra = (targetHeight - (maxY - minY)) / 2;
    minY -= extra;
    maxY += extra;
  }

  return { minX, maxX, minY, maxY };
}

function project(point, bounds) {
  const margin = 58;
  const width = canvas.width - margin * 2;
  const height = canvas.height - margin * 2;
  return {
    x: margin + ((point.x - bounds.minX) / (bounds.maxX - bounds.minX)) * width,
    y: canvas.height - margin - ((point.y - bounds.minY) / (bounds.maxY - bounds.minY)) * height,
  };
}

function drawAxes(points, title) {
  const bounds = getBounds(points);
  state.bounds = bounds;
  ctx.strokeStyle = getCss("--line");
  ctx.lineWidth = 1;
  ctx.font = "15px system-ui";
  ctx.fillStyle = getCss("--muted");
  for (let i = 0; i <= 8; i += 1) {
    const x = 58 + (i / 8) * (canvas.width - 116);
    ctx.beginPath();
    ctx.moveTo(x, 58);
    ctx.lineTo(x, canvas.height - 58);
    ctx.stroke();
    const label = bounds.minX + (i / 8) * (bounds.maxX - bounds.minX);
    ctx.fillText(formatNumber(label), x - 18, canvas.height - 24);
  }
  for (let i = 0; i <= 6; i += 1) {
    const y = 58 + (i / 6) * (canvas.height - 116);
    ctx.beginPath();
    ctx.moveTo(58, y);
    ctx.lineTo(canvas.width - 58, y);
    ctx.stroke();
    const label = bounds.maxY - (i / 6) * (bounds.maxY - bounds.minY);
    ctx.fillText(formatNumber(label), 10, y + 5);
  }
  ctx.fillStyle = getCss("--text");
  ctx.font = "700 20px system-ui";
  ctx.fillText(title, 58, 34);
}

function drawLine(points, color, width) {
  if (!points.length) return;
  const bounds = state.bounds || getBounds(points);
  ctx.beginPath();
  points.forEach((point, index) => {
    const projected = project(point, bounds);
    if (index === 0) ctx.moveTo(projected.x, projected.y);
    else ctx.lineTo(projected.x, projected.y);
  });
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.stroke();
}

function drawSimulationOverlay(analysis) {
  const points = analysis.points;
  const index = Math.floor((state.frame % 240) / 240 * (points.length - 1));
  const point = points[index];
  const projected = project(point, state.bounds);
  ctx.fillStyle = "#2563eb";
  ctx.beginPath();
  ctx.arc(projected.x, projected.y, 11, 0, TWO_PI);
  ctx.fill();
  ctx.fillStyle = getCss("--text");
  ctx.font = "700 14px system-ui";
  ctx.fillText(`(${formatNumber(point.x)}, ${formatNumber(point.y)})`, projected.x + 15, projected.y - 12);
}

function drawLegend(items) {
  ctx.font = "700 13px system-ui";
  items.forEach((item, index) => {
    const y = 62 + index * 20;
    ctx.fillStyle = item.color;
    ctx.fillRect(canvas.width - 150, y - 10, 24, 4);
    ctx.fillStyle = getCss("--text");
    ctx.fillText(item.label, canvas.width - 116, y);
  });
}

function colorFor(index) {
  return ["#0f766e", "#2563eb", "#b45309", "#7c3aed", "#be123c", "#15803d", "#0369a1", "#a16207", "#4f46e5", "#dc2626", "#047857", "#9333ea"][index % 12];
}

function getCss(variableName) {
  return getComputedStyle(document.body).getPropertyValue(variableName).trim();
}

function renderInsights() {
  const analysis = state.analysis;
  typeMetric.textContent = analysis.type;
  sampleMetric.textContent = String(analysis.points.length);
  errorMetric.textContent = formatNumber(analysis.verification.maxError);
  verifyMetric.textContent = analysis.verification.status;
  graphSummary.textContent = `This ${analysis.type} visualization uses ${analysis.points.length} sampled points. Recommended views: ${analysis.explanation.recommendations.join(", ")}.`;
  explainTab.innerHTML = `<ol>${analysis.explanation.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol>`;
  verifyTab.innerHTML = `<ul>${analysis.verification.checks.map((check) => `<li>${escapeHtml(check)}</li>`).join("")}</ul>${renderVerificationCards(state.formulaModel)}`;
  renderSymbolicVisualization(state.formulaModel);
}

function renderParameters() {
  const config = [
    ["amplitude", "Amplitude", 0.1, 4, 0.1],
    ["frequency", "Frequency", 0.2, 6, 0.1],
    ["phase", "Phase", -3.14, 3.14, 0.01],
    ["terms", "Terms", 1, 40, 1],
    ["radius", "Radius", 1, 12, 0.1],
    ["u", "Velocity", -20, 20, 0.1],
    ["a", "Accel.", -12, 12, 0.1],
  ];
  parameterControls.innerHTML = config.map(([key, label, min, max, step]) => `
    <label class="param-row">
      <span>${label}</span>
      <input type="range" min="${min}" max="${max}" step="${step}" value="${state.params[key]}" data-param="${key}" />
      <output>${formatNumber(state.params[key])}</output>
    </label>
  `).join("");
}

function generate() {
  try {
    setError("");
    state.equation = equationInput.value;
    renderInputIntelligence(state.equation);
    exampleSelect.value = examples.includes(state.equation) ? state.equation : "";
    state.pipeline = buildMathPipeline(state.equation);
    state.formulaModel = state.pipeline.formulaModel;
    state.analysis = state.pipeline.analysis;
    renderFormulaModule();

    if (state.analysis) {
      statusPill.textContent = "Generated";
      drawAnalysis();
      renderInsights();
    } else {
      statusPill.textContent = "Formula linked";
      drawFormulaPlaceholder(state.formulaModel);
      renderSymbolicInsights(state.formulaModel);
      if (state.pipeline.issues.length) {
        setError(`Graph skipped: ${state.pipeline.issues[0]}`);
      }
    }
    saveRecent();
  } catch (error) {
    try {
      state.pipeline = buildMathPipeline(equationInput.value);
      state.formulaModel = state.pipeline.formulaModel;
      state.analysis = state.pipeline.analysis;
      renderFormulaModule();
      drawFormulaPlaceholder(state.formulaModel);
      renderSymbolicInsights(state.formulaModel);
      statusPill.textContent = "Formula linked";
      setError(`Graph skipped: ${error.message}`);
    } catch (formulaError) {
      setError(formulaError.message);
    }
  }
}

function saveRecent() {
  const project = createProjectSnapshot();
  if (!project) return;
  state.projects = [project, ...state.projects.filter((item) => item.equation !== project.equation)].slice(0, 8);
  localStorage.setItem("equationAliveProjects", JSON.stringify(state.projects));
  renderRecent();
}

function createProjectSnapshot(name = projectNameInput?.value) {
  const source = state.analysis || state.formulaModel || state.pipeline?.formulaModel;
  if (!source) return null;
  const model = state.formulaModel || state.pipeline?.formulaModel;
  return {
    id: Date.now(),
    name: String(name || source.type || "Workspace snapshot").trim(),
    equation: source.input || source.original,
    type: source.type,
    createdAt: new Date().toISOString(),
    solveTarget: model?.target || "",
    language: languageSelect.value,
    params: { ...state.params },
    verification: buildVerificationReport(model, state.analysis),
    accessibility: buildAccessibilityBundle(model, state.analysis),
    intent: detectInputIntent(source.input || source.original),
    code: codeOutput.textContent || "",
  };
}

function saveNamedProject() {
  const project = createProjectSnapshot(projectNameInput?.value || `Project ${state.projects.length + 1}`);
  if (!project) return;
  state.currentProjectId = project.id;
  state.projects = [project, ...state.projects.filter((item) => item.id !== project.id && item.name !== project.name)].slice(0, 20);
  localStorage.setItem("equationAliveProjects", JSON.stringify(state.projects));
  if (projectNameInput) projectNameInput.value = project.name;
  renderRecent();
}

function loadProjectSnapshot(projectIdOrEquation) {
  const project = state.projects.find((item) => String(item.id) === String(projectIdOrEquation) || item.equation === projectIdOrEquation);
  if (!project) return;
  state.currentProjectId = project.id;
  equationInput.value = project.equation;
  if (projectNameInput) projectNameInput.value = project.name || "";
  languageSelect.value = project.language || languageSelect.value;
  state.params = { ...state.params, ...(project.params || {}) };
  state.composerBlocks = buildComposerFromEquation(project.equation);
  renderComposer();
  renderParameters();
  generate();
}

function clearSavedProjects() {
  state.projects = [];
  state.currentProjectId = null;
  localStorage.setItem("equationAliveProjects", "[]");
  renderRecent();
}

function renderRecent() {
  recentProjects.innerHTML = state.projects.length
    ? state.projects.map((project) => `<button class="recent-item" type="button" data-project-id="${escapeHtml(project.id)}" data-equation="${escapeHtml(project.equation)}"><strong>${escapeHtml(project.name || project.type)}</strong><small>${escapeHtml(project.type)} · ${new Date(project.createdAt).toLocaleString()}</small><br>${escapeHtml(project.equation)}</button>`).join("")
    : "<p>No saved simulations yet.</p>";
}

function animate() {
  state.frame += 1;
  if (state.view === "simulation" || !document.body.classList.contains("reduce-motion")) {
    drawAnalysis();
  }
  state.animationId = requestAnimationFrame(animate);
}

function playAudio() {
  if (!state.analysis?.audio.length) return;
  stopAudio();
  const audioContext = new AudioContext();
  const buffer = audioContext.createBuffer(1, state.analysis.audio.length * 40, audioContext.sampleRate);
  const channel = buffer.getChannelData(0);
  for (let i = 0; i < channel.length; i += 1) {
    channel[i] = state.analysis.audio[i % state.analysis.audio.length] * 0.28;
  }
  const source = audioContext.createBufferSource();
  const gain = audioContext.createGain();
  source.buffer = buffer;
  source.loop = true;
  source.connect(gain);
  gain.connect(audioContext.destination);
  source.start();
  state.audio = { audioContext, source };
  meterFill.style.width = "85%";
}

function stopAudio() {
  if (state.audio) {
    state.audio.source.stop();
    state.audio.audioContext.close();
    state.audio = null;
  }
  meterFill.style.width = "0";
}

function exportPng() {
  const link = document.createElement("a");
  link.download = "equation-alive-graph.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

function exportJson() {
  download("equation-alive-project.json", JSON.stringify({
    project: createProjectSnapshot(projectNameInput?.value || "Exported workspace"),
    pipeline: state.pipeline,
    visualization: state.analysis,
    formula: state.formulaModel,
    verification: buildVerificationReport(state.formulaModel, state.analysis),
    accessibility: buildAccessibilityBundle(state.formulaModel, state.analysis),
    platform: {
      theorem: buildTheoremExplorerModel(getSelectedLibraryItem(), state.formulaModel),
      knowledgeGraph: buildKnowledgeGraphModel(getSelectedLibraryItem(), state.formulaModel),
      sandbox: buildSandboxBlueprint(state.formulaModel),
      professor: buildProfessorModeModel(getSelectedLibraryItem(), state.formulaModel),
    },
    code: codeOutput.textContent,
  }, null, 2), "application/json");
}

function exportSvg() {
  if (!state.analysis) return;
  const bounds = getBounds(state.analysis.points);
  const path = state.analysis.points.map((point, index) => {
    const p = project(point, bounds);
    return `${index === 0 ? "M" : "L"}${p.x.toFixed(2)} ${p.y.toFixed(2)}`;
  }).join(" ");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}" viewBox="0 0 ${canvas.width} ${canvas.height}">
  <rect width="100%" height="100%" fill="#ffffff"/>
  <path d="${path}" fill="none" stroke="#0f766e" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="40" y="44" font-family="system-ui" font-size="24" font-weight="700">${escapeHtml(state.analysis.type)}</text>
</svg>`;
  download("equation-alive-graph.svg", svg, "image/svg+xml");
}

function download(name, content, type) {
  const blob = new Blob([content], { type });
  const link = document.createElement("a");
  link.download = name;
  link.href = URL.createObjectURL(blob);
  link.click();
  URL.revokeObjectURL(link.href);
}

function formatNumber(value) {
  if (!Number.isFinite(value)) return "-";
  if (Math.abs(value) >= 1000 || Math.abs(value) < 0.001 && value !== 0) return value.toExponential(2);
  return Number(value.toFixed(3)).toString();
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
}

function applyEditorInsertion(startText, endText = "") {
  const start = equationInput.selectionStart ?? equationInput.value.length;
  const end = equationInput.selectionEnd ?? equationInput.value.length;
  const selected = equationInput.value.slice(start, end);
  const nextValue = equationInput.value.slice(0, start) + startText + selected + endText + equationInput.value.slice(end);
  equationInput.value = nextValue;
  equationInput.focus();
  const cursorStart = start + startText.length;
  const cursorEnd = cursorStart + selected.length;
  equationInput.setSelectionRange(cursorStart, endText ? cursorEnd : cursorStart);
  state.formulaModel = buildFormulaModel(equationInput.value);
  state.composerBlocks = buildComposerFromEquation(equationInput.value);
  renderComposer();
  renderFormulaModule();
}

function resetComposerFromEditor() {
  state.composerBlocks = buildComposerFromEquation(equationInput.value);
  renderComposer();
  syncComposerOutput();
}

document.querySelectorAll("[data-insert], [data-wrap-start]").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.wrapStart) {
      const endText = button.dataset.wrapEnd === "/{ }" ? "}{ }" : button.dataset.wrapEnd || "";
      const startText = button.dataset.wrapEnd === "/{ }" ? "\\frac{" : button.dataset.wrapStart;
      applyEditorInsertion(startText, endText);
      return;
    }
    applyEditorInsertion(button.dataset.insert || "");
  });
});

exampleSelect.addEventListener("change", () => {
  equationInput.value = exampleSelect.value;
  state.composerBlocks = buildComposerFromEquation(exampleSelect.value);
  renderComposer();
  generate();
});

parameterControls.addEventListener("input", (event) => {
  const key = event.target.dataset.param;
  if (!key) return;
  state.params[key] = Number(event.target.value);
  event.target.nextElementSibling.textContent = formatNumber(state.params[key]);
  generate();
});

equationInput.addEventListener("input", () => {
  try {
    renderInputIntelligence(equationInput.value);
    state.formulaModel = buildFormulaModel(equationInput.value);
    state.composerBlocks = buildComposerFromEquation(equationInput.value);
    renderComposer();
    renderFormulaModule();
    setError("");
  } catch {
    formulaStatus.textContent = "Editing";
  }
});

solveTarget.addEventListener("change", () => {
  state.formulaModel = buildFormulaModel(equationInput.value);
  renderFormulaModule();
});

languageSelect.addEventListener("change", () => {
  renderFormulaModule();
});

composerPalette?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-composer-template]");
  if (!button) return;
  state.composerBlocks.push(createComposerBlock(button.dataset.composerTemplate));
  renderComposer();
  syncComposerOutput();
});

structuredComposer?.addEventListener("input", (event) => {
  if (event.target.dataset.inlinePart) {
    const index = Number(event.target.dataset.composerIndex);
    const childIndex = Number(event.target.dataset.inlineChildIndex);
    const scope = event.target.dataset.inlineScope;
    const part = event.target.dataset.inlinePart;
    if (!Number.isInteger(index) || !Number.isInteger(childIndex) || !state.composerBlocks[index]) return;
    if (scope === "matrix") {
      updateMatrixCellChild(state.composerBlocks[index], Number(event.target.dataset.matrixRow), Number(event.target.dataset.matrixCell), childIndex, part, event.target.value);
    }
    if (scope === "case") {
      updateCaseBranchChild(state.composerBlocks[index], Number(event.target.dataset.caseBranch), event.target.dataset.casePart, childIndex, part, event.target.value);
    }
    renderComposer();
    syncComposerOutput();
    return;
  }
  if (event.target.dataset.matrixPart) {
    const index = Number(event.target.dataset.composerIndex);
    const rowIndex = Number(event.target.dataset.matrixRow);
    const cellIndex = Number(event.target.dataset.matrixCell);
    if (!Number.isInteger(index) || !Number.isInteger(rowIndex) || !Number.isInteger(cellIndex) || !state.composerBlocks[index]) return;
    updateMatrixCell(state.composerBlocks[index], rowIndex, cellIndex, event.target.value);
    renderComposer();
    syncComposerOutput();
    return;
  }
  if (event.target.dataset.casePart) {
    const index = Number(event.target.dataset.composerIndex);
    const branchIndex = Number(event.target.dataset.caseBranch);
    const part = event.target.dataset.casePart;
    if (!Number.isInteger(index) || !Number.isInteger(branchIndex) || !part || !state.composerBlocks[index]) return;
    updateCaseBranch(state.composerBlocks[index], branchIndex, part, event.target.value);
    renderComposer();
    syncComposerOutput();
    return;
  }
  if (event.target.dataset.nestedPart) {
    const parentIndex = Number(event.target.dataset.composerIndex);
    const childIndex = Number(event.target.dataset.nestedChildIndex);
    const field = event.target.dataset.nestedField;
    const part = event.target.dataset.nestedPart;
    if (!Number.isInteger(parentIndex) || !Number.isInteger(childIndex) || !field || !state.composerBlocks[parentIndex]) return;
    updateNestedComposerChild(state.composerBlocks[parentIndex], field, childIndex, part, event.target.value);
    renderComposer();
    syncComposerOutput();
    return;
  }
  const field = event.target.dataset.composerField;
  const index = Number(event.target.dataset.composerIndex);
  if (!field || !Number.isInteger(index) || !state.composerBlocks[index]) return;
  state.composerBlocks[index][field] = event.target.value;
  if (field === "rows" && state.composerBlocks[index].type === "matrix") delete state.composerBlocks[index].cells;
  if (field === "rows" && state.composerBlocks[index].type === "cases") delete state.composerBlocks[index].branches;
  hydrateComposerBlock(state.composerBlocks[index]);
  renderComposer();
  syncComposerOutput();
});

structuredComposer?.addEventListener("change", (event) => {
  if (event.target.dataset.inlinePart) {
    const index = Number(event.target.dataset.composerIndex);
    const childIndex = Number(event.target.dataset.inlineChildIndex);
    const scope = event.target.dataset.inlineScope;
    const part = event.target.dataset.inlinePart;
    if (!Number.isInteger(index) || !Number.isInteger(childIndex) || !state.composerBlocks[index]) return;
    if (scope === "matrix") {
      updateMatrixCellChild(state.composerBlocks[index], Number(event.target.dataset.matrixRow), Number(event.target.dataset.matrixCell), childIndex, part, event.target.value);
    }
    if (scope === "case") {
      updateCaseBranchChild(state.composerBlocks[index], Number(event.target.dataset.caseBranch), event.target.dataset.casePart, childIndex, part, event.target.value);
    }
    renderComposer();
    syncComposerOutput();
    return;
  }
  if (event.target.dataset.composerAction === "type") {
    const index = Number(event.target.dataset.composerIndex);
    if (!Number.isInteger(index)) return;
    switchComposerBlockType(state.composerBlocks, index, event.target.value);
    renderComposer();
    syncComposerOutput();
    return;
  }
  if (event.target.dataset.nestedPart) {
    const parentIndex = Number(event.target.dataset.composerIndex);
    const childIndex = Number(event.target.dataset.nestedChildIndex);
    const field = event.target.dataset.nestedField;
    const part = event.target.dataset.nestedPart;
    if (!Number.isInteger(parentIndex) || !Number.isInteger(childIndex) || !field || !state.composerBlocks[parentIndex]) return;
    updateNestedComposerChild(state.composerBlocks[parentIndex], field, childIndex, part, event.target.value);
    renderComposer();
    syncComposerOutput();
    return;
  }
  const field = event.target.dataset.composerField;
  const index = Number(event.target.dataset.composerIndex);
  if (!field || !Number.isInteger(index) || !state.composerBlocks[index]) return;
  state.composerBlocks[index][field] = event.target.value;
  hydrateComposerBlock(state.composerBlocks[index]);
  renderComposer();
  syncComposerOutput();
});

structuredComposer?.addEventListener("click", (event) => {
  const inlineActionButton = event.target.closest("[data-inline-action]");
  if (inlineActionButton) {
    const index = Number(inlineActionButton.dataset.composerIndex);
    const scope = inlineActionButton.dataset.inlineScope;
    const childIndex = Number(inlineActionButton.dataset.inlineChildIndex);
    if (!Number.isInteger(index) || !state.composerBlocks[index]) return;
    if (scope === "matrix") {
      const rowIndex = Number(inlineActionButton.dataset.matrixRow);
      const cellIndex = Number(inlineActionButton.dataset.matrixCell);
      if (inlineActionButton.dataset.inlineAction === "add") addMatrixCellChild(state.composerBlocks[index], rowIndex, cellIndex);
      if (inlineActionButton.dataset.inlineAction === "remove") removeMatrixCellChild(state.composerBlocks[index], rowIndex, cellIndex, childIndex);
    }
    if (scope === "case") {
      const branchIndex = Number(inlineActionButton.dataset.caseBranch);
      const part = inlineActionButton.dataset.casePart;
      if (inlineActionButton.dataset.inlineAction === "add") addCaseBranchChild(state.composerBlocks[index], branchIndex, part);
      if (inlineActionButton.dataset.inlineAction === "remove") removeCaseBranchChild(state.composerBlocks[index], branchIndex, part, childIndex);
    }
    renderComposer();
    syncComposerOutput();
    return;
  }
  const matrixActionButton = event.target.closest("[data-matrix-action]");
  if (matrixActionButton) {
    const index = Number(matrixActionButton.dataset.composerIndex);
    if (!Number.isInteger(index) || !state.composerBlocks[index]) return;
    const action = matrixActionButton.dataset.matrixAction;
    if (action === "add-row") addMatrixRow(state.composerBlocks[index]);
    if (action === "add-column") addMatrixColumn(state.composerBlocks[index]);
    if (action === "remove-row") removeMatrixRow(state.composerBlocks[index], Number(matrixActionButton.dataset.matrixRow));
    if (action === "remove-column") removeMatrixColumn(state.composerBlocks[index], Number(matrixActionButton.dataset.matrixCell));
    renderComposer();
    syncComposerOutput();
    return;
  }
  const caseActionButton = event.target.closest("[data-case-action]");
  if (caseActionButton) {
    const index = Number(caseActionButton.dataset.composerIndex);
    if (!Number.isInteger(index) || !state.composerBlocks[index]) return;
    const action = caseActionButton.dataset.caseAction;
    if (action === "add-branch") addCaseBranch(state.composerBlocks[index]);
    if (action === "remove-branch") removeCaseBranch(state.composerBlocks[index], Number(caseActionButton.dataset.caseBranch));
    renderComposer();
    syncComposerOutput();
    return;
  }
  const nestedActionButton = event.target.closest("[data-nested-action]");
  if (nestedActionButton) {
    const index = Number(nestedActionButton.dataset.composerIndex);
    const field = nestedActionButton.dataset.nestedField;
    const childIndex = Number(nestedActionButton.dataset.nestedChildIndex);
    if (!Number.isInteger(index) || !field || !state.composerBlocks[index]) return;
    if (nestedActionButton.dataset.nestedAction === "add") {
      addNestedComposerChild(state.composerBlocks[index], field);
    }
    if (nestedActionButton.dataset.nestedAction === "remove") {
      removeNestedComposerChild(state.composerBlocks[index], field, childIndex);
    }
    renderComposer();
    syncComposerOutput();
    return;
  }
  const button = event.target.closest("[data-composer-action]");
  if (!button) return;
  const index = Number(button.dataset.composerIndex);
  if (!Number.isInteger(index) || !state.composerBlocks[index]) return;
  if (button.dataset.composerAction === "remove") {
    state.composerBlocks.splice(index, 1);
    if (!state.composerBlocks.length) state.composerBlocks.push(createComposerBlock("expression"));
  }
  if (button.dataset.composerAction === "duplicate") {
    state.composerBlocks.splice(index + 1, 0, { ...state.composerBlocks[index] });
  }
  if (button.dataset.composerAction === "move-up") {
    moveComposerBlock(state.composerBlocks, index, -1);
  }
  if (button.dataset.composerAction === "move-down") {
    moveComposerBlock(state.composerBlocks, index, 1);
  }
  renderComposer();
  syncComposerOutput();
});

structuredComposer?.addEventListener("dragstart", (event) => {
  const block = event.target.closest("[data-composer-block]");
  if (!block) return;
  event.dataTransfer?.setData("text/plain", block.dataset.composerBlock);
  block.classList.add("dragging");
});

structuredComposer?.addEventListener("dragend", (event) => {
  event.target.closest("[data-composer-block]")?.classList.remove("dragging");
});

structuredComposer?.addEventListener("dragover", (event) => {
  if (event.target.closest("[data-composer-block]")) event.preventDefault();
});

structuredComposer?.addEventListener("drop", (event) => {
  const block = event.target.closest("[data-composer-block]");
  if (!block) return;
  event.preventDefault();
  const fromIndex = Number(event.dataTransfer?.getData("text/plain"));
  const toIndex = Number(block.dataset.composerBlock);
  if (!Number.isInteger(fromIndex) || !Number.isInteger(toIndex)) return;
  moveComposerBlockTo(state.composerBlocks, fromIndex, toIndex);
  renderComposer();
  syncComposerOutput();
});

structuredComposer?.addEventListener("keydown", (event) => {
  const block = event.target.closest("[data-composer-block]");
  const index = Number(block?.dataset.composerBlock);
  if (!block || !Number.isInteger(index)) return;
  if (event.altKey && event.key === "ArrowUp") {
    event.preventDefault();
    moveComposerBlock(state.composerBlocks, index, -1);
    renderComposer();
    syncComposerOutput();
  }
  if (event.altKey && event.key === "ArrowDown") {
    event.preventDefault();
    moveComposerBlock(state.composerBlocks, index, 1);
    renderComposer();
    syncComposerOutput();
  }
});

equationInput.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
    event.preventDefault();
    generate();
  }
  if ((event.metaKey || event.ctrlKey) && event.key === "/") {
    event.preventDefault();
    resetComposerFromEditor();
  }
});

composerAddExpression?.addEventListener("click", () => {
  state.composerBlocks.push(createComposerBlock("expression"));
  renderComposer();
  syncComposerOutput();
});

composerReset?.addEventListener("click", resetComposerFromEditor);

document.querySelectorAll(".segmented button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".segmented button").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    state.view = button.dataset.view;
    drawAnalysis();
  });
});

document.querySelectorAll(".tabs button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".tabs button").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    explainTab.hidden = button.dataset.tab !== "explain";
    verifyTab.hidden = button.dataset.tab !== "verify";
    exportTab.hidden = button.dataset.tab !== "export";
  });
});

recentProjects.addEventListener("click", (event) => {
  const button = event.target.closest("[data-equation]");
  if (!button) return;
  loadProjectSnapshot(button.dataset.projectId || button.dataset.equation);
});

libraryList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-library-id]");
  if (!button) return;
  state.selectedLibraryId = button.dataset.libraryId;
  renderLibrary();
});

[librarySearch, libraryCategory, libraryDifficulty].forEach((control) => {
  control.addEventListener("input", renderLibrary);
  control.addEventListener("change", renderLibrary);
});

loadLibraryFormula.addEventListener("click", () => {
  loadLibraryItem();
});

copyLibraryCode.addEventListener("click", () => {
  const item = getSelectedLibraryItem();
  const code = item?.code?.[languageSelect.value] || item?.code?.python || "";
  navigator.clipboard?.writeText(code);
});

saveProjectButton?.addEventListener("click", saveNamedProject);
clearProjectsButton?.addEventListener("click", clearSavedProjects);
graphExplorerRange?.addEventListener("input", (event) => {
  state.explorerIndex = Number(event.target.value);
  const explorer = buildGraphExplorer(state.analysis, state.explorerIndex);
  if (graphExplorerOutput) graphExplorerOutput.textContent = explorer.text;
  if (state.analysis && state.bounds) {
    drawAnalysis();
    const point = explorer.point;
    if (point) {
      const projected = project(point, state.bounds);
      ctx.fillStyle = "#be123c";
      ctx.beginPath();
      ctx.arc(projected.x, projected.y, 13, 0, TWO_PI);
      ctx.fill();
    }
  }
});

generateButton.addEventListener("click", generate);
document.querySelector("#playAudio").addEventListener("click", playAudio);
document.querySelector("#stopAudio").addEventListener("click", stopAudio);
document.querySelector("#exportPng").addEventListener("click", exportPng);
document.querySelector("#exportSvg").addEventListener("click", exportSvg);
document.querySelector("#exportJson").addEventListener("click", exportJson);
document.querySelector("#printReport").addEventListener("click", () => window.print());
document.querySelector("#copyCode").addEventListener("click", () => {
  navigator.clipboard?.writeText(codeOutput.textContent || "");
});
document.querySelector("#contrastToggle").addEventListener("click", () => document.body.classList.toggle("high-contrast"));
document.querySelector("#motionToggle").addEventListener("click", () => document.body.classList.toggle("reduce-motion"));

renderParameters();
renderRecent();
linkLibraryToSolverFamilies();
renderLibraryFilters();
renderLibrary();
state.composerBlocks = buildComposerFromEquation(equationInput.value);
renderComposer();
renderInputIntelligence(equationInput.value);
if (examples.includes(equationInput.value)) {
  exampleSelect.value = equationInput.value;
}
generate();
animate();
