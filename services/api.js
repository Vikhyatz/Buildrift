

// --- MOCK DATA ---

const MOCK_USER = {
  id: "usr_123",
  name: "John Doe",
  email: "john@example.com",
  avatar: "JD",
  githubConnected: true,
};

const MOCK_PROJECTS = [
  {
    id: "prj_1",
    name: "my-portfolio",
    framework: "Next.js",
    repository: "johndoe/my-portfolio",
    lastDeploymentStatus: "Ready",
    lastDeploymentAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    url: "my-portfolio-git-main-johndoe.vercelmini.app",
  },
  {
    id: "prj_2",
    name: "ecommerce-api",
    framework: "Express",
    repository: "johndoe/ecommerce-api",
    lastDeploymentStatus: "Failed",
    lastDeploymentAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    url: "ecommerce-api.vercelmini.app",
  },
];

let MOCK_DEPLOYMENTS = [
  {
    id: "dep_101",
    projectId: "prj_1",
    projectName: "my-portfolio",
    status: "Ready",
    commitSha: "a1b2c3d",
    commitMessage: "Update hero section",
    branch: "main",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    duration: 45,
    url: "my-portfolio-a1b2c3d.vercelmini.app",
    creator: { name: MOCK_USER.name, avatar: MOCK_USER.avatar },
  },
  {
    id: "dep_102",
    projectId: "prj_2",
    projectName: "ecommerce-api",
    status: "Failed",
    commitSha: "f8e7d6c",
    commitMessage: "Fix database connection issue",
    branch: "main",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    duration: 120,
    creator: { name: MOCK_USER.name, avatar: MOCK_USER.avatar },
  },
  {
    id: "dep_103",
    projectId: "prj_1",
    projectName: "my-portfolio",
    status: "Ready",
    commitSha: "9x8y7z6",
    commitMessage: "Initial commit",
    branch: "main",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    duration: 62,
    url: "my-portfolio-9x8y7z6.vercelmini.app",
    creator: { name: MOCK_USER.name, avatar: MOCK_USER.avatar },
  },
];

const MOCK_ACTIVITY = [
  {
    id: "act_1",
    type: "deployment_success",
    description: "my-portfolio deployed successfully",
    timestamp: MOCK_DEPLOYMENTS[0].createdAt,
    userId: MOCK_USER.id,
  },
  {
    id: "act_2",
    type: "deployment_failed",
    description: "ecommerce-api deployment failed",
    timestamp: MOCK_DEPLOYMENTS[1].createdAt,
    userId: MOCK_USER.id,
  },
];

// --- SIMULATED DELAY ---
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// --- API METHODS ---

export const api = {
  async getUser() {
    await delay(500);
    return MOCK_USER;
  },

  async getProjects() {
    await delay(800);
    return MOCK_PROJECTS;
  },

  async getDeployments() {
    await delay(1000);
    return [...MOCK_DEPLOYMENTS].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  async getDeployment(id) {
    await delay(600);
    const dep = MOCK_DEPLOYMENTS.find(d => d.id === id);
    return dep || null;
  },

  async getActivity() {
    await delay(700);
    return [...MOCK_ACTIVITY].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  },

  async createDeployment(data) {
    await delay(1500);
    const newDeployment = {
      id: `dep_${Math.random().toString(36).substring(2, 9)}`,
      projectId: "prj_new",
      projectName: data.projectName,
      status: "Queued",
      commitSha: "pending",
      commitMessage: "Deploying from UI",
      branch: data.branch,
      createdAt: new Date().toISOString(),
      duration: null,
      creator: { name: MOCK_USER.name, avatar: MOCK_USER.avatar },
    };
    
    MOCK_DEPLOYMENTS = [newDeployment, ...MOCK_DEPLOYMENTS];
    
    // Simulate background deployment process (for realism when fetching it later)
    setTimeout(() => {
      const idx = MOCK_DEPLOYMENTS.findIndex(d => d.id === newDeployment.id);
      if (idx !== -1) MOCK_DEPLOYMENTS[idx].status = "Building";
    }, 5000);
    
    setTimeout(() => {
      const idx = MOCK_DEPLOYMENTS.findIndex(d => d.id === newDeployment.id);
      if (idx !== -1) MOCK_DEPLOYMENTS[idx].status = "Uploading";
    }, 10000);

    setTimeout(() => {
      const idx = MOCK_DEPLOYMENTS.findIndex(d => d.id === newDeployment.id);
      if (idx !== -1) {
        MOCK_DEPLOYMENTS[idx].status = "Ready";
        MOCK_DEPLOYMENTS[idx].duration = 15;
        MOCK_DEPLOYMENTS[idx].url = `${data.projectName}-preview.vercelmini.app`;
      }
    }, 15000);

    return newDeployment;
  }
};

