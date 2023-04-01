import axios from "./index";

export const urls = {
  addMember: "/workspace/member/",
  createWorkspace: "/workspace",
  createTask: "/workspace/:workspaceId/task",
  createProject: "/workspace/project",
  sendInvitation: "/workspace/invitation/",
  addDepartment: "/workspace/department/",
  changeTaskStatus: "/workspace/task/status/",
  changePriority: "/workspace/task/priority/",
  taskUpdate: "/workspace/task/:id",
  assignTask: "/workspace/task/assign",
  deleteTask: "/workspace/:workspaceId/task/:id",
  workspace: "/workspace",
  groupAllTasks: "/workspace/tasks/:id/list",
  getOneTask: "/workspace/task/:id",
  projects: "/workspace/projects/",
  addSubTask: "/workspace/task/subtask/:id",
  deleteSubtask: "/workspace/task/:id/:subtaskId",
  submitTaskFile: "/workspace/task/submit/:id",
  deleteMember: "/workspace/member/:id/:subtaskId",
  workspaceMembers: "/workspace/member/:id",
  getWorkspace: "/workspace/:id",
  getUserWorkload: "/user/workload/:id",
  findMembers: "/workspace/members/:id",
  getUser: "/user/:id",
  findUserActivity: "/user/:id/activity",
  getAssignedTask: "/user/:id/task/:workspaceId",
  updateDescription: "/user/:id/description",
  findUserWorkspaces: "/user/member/:id/workspace",
  fetchNotification: "/user/:id/notification",
  fetchWorkspaceWorkload: "/workspace/:id/workload",
  fetchUserWorkload: "/workspace/:workspaceId/members/:id/workload",
  updateRole: "workspace/:workspaceId/member/:id/role",
  getAllUsersForAdmin: "/admin/getAllUser",
  blockUser: "/admin/blockuser",
};

export const sendRequest = async ({
  link,
  id = null,
  data = null,
  cookies: token,
  subtaskId = null,
  workspaceId,
  operation,
}) => {
  let url = urls[link];
  if (id) url = url.replace(":id", id);
  if (workspaceId) url = url.replace(":workspaceId", workspaceId);
  if (operation == "get") {
    const res = await axios.get(url, {
      headers: { authorization: `Bearer ${token}` },
    });
    return res;
  }
  if (operation == "post") {
    const res = await axios.post(url, data, {
      headers: { authorization: `Bearer ${token}` },
    });
    return res;
  }
  if (operation == "patch") {
    console.log({ data });
    const res = await axios.patch(url, data, {
      headers: { authorization: `Bearer ${token}` },
    });
    return res;
  }
  if (operation == "delete") {
    if (subtaskId) url = url.replace(":subtaskId", subtaskId);
    const res = await axios.delete(url, {
      headers: { authorization: `Bearer ${token}` },
    });
    return res;
  }
};
