import axios from "./index";

export const addDepartment = async (id, cookie, data) => {
  try {
    const res = await axios.patch(
      `/workspace/department/${id}`,
      { name: data },
      {
        headers: {
          authorization: `Bearer ${cookie}`,
        },
      }
    );
    return res.data.status;
  } catch (error) {
    return error.response.data;
  }
};

export const fetchTask = async ({ id, cookies }) => {
  const res = await axios.get(`/workspace/tasks/${id}/list`, {
    headers: { authorization: `Bearer ${cookies}` },
  });
  localStorage.setItem("Tasks", JSON.stringify({ ...res.data.tasks }));
  return res.data.tasks;
};

export const userAuthorization = async (data) => {
  try {
    const res = await axios.get("/user/isUserValid", {
      headers: {
        authorization: `Bearer ${data}`,
      },
    });
    localStorage.setItem("User", JSON.stringify({ ...res.data.user }));
    return true;
  } catch (error) {
    localStorage.clear();
    return false;
  }
};

export const addTask = async ({ cookie, data }) => {
  try {
    const formData = new FormData();
    formData.append("taskName", data.taskName);
    formData.append("projectId", data.projectId);
    formData.append("description", data.Description);
    formData.append("dueDate", data.dueDate);
    formData.append("attachedFile", data.file[0]);
    const res = await axios.post(
      `/workspace/${data.workspaceId}/task`,
      formData,
      {
        headers: { authorization: `Bearer ${cookie}` },
      }
    );
    return res;
  } catch (error) {
    return error;
  }
};

export const fetchData = (namess) => {
  return { name: "workspace", namess };
};

export const fetchTaskData = async ({ id, cookie }) => {
  const res = await axios.get(`/workspace/task/${id}`, {
    headers: { authorization: `Bearer ${cookie}` },
  });
  if (res.data.status == "success") {
    return res.data.task;
  }
};

export const changeStatus = async (id, status, workspaceId, cookie) => {
  const res = await axios.patch(
    `/workspace/task/status/${id}`,
    { status, workspaceId },
    { headers: { authorization: `Bearer ${cookie}` } }
  );
  if (res.data.status == "success") {
    return res.data.status;
  }
};

export const deleteTask = async (id, workspaceId, cookie) => {
  const res = await axios.delete(`/workspace/${workspaceId}/task/${id}`, {
    headers: { authorization: `Bearer ${cookie}` },
  });
  if (res.status == 204) {
    return res;
  }
};

export const changeTaskPrioriy = async (id, priority, workspaceId, cookie) => {
  const res = await axios.patch(
    `/workspace/task/priority/${id}`,
    { priority, workspaceId },
    { headers: { authorization: `Bearer ${cookie}` } }
  );
  if (res.data.status == "success") {
    return res;
  }
};

export const sendInvitationApi = async (email, role, cookie, workspaceId) => {
  try {
    const res = await axios.post(
      `/workspace/invitation/${workspaceId}`,
      { memberEmail: email, role },
      {
        headers: {
          authorization: `Bearer ${cookie}`,
        },
      }
    );
    return res;
  } catch (error) {
    return error;
  }
};

export const addUserIntoWorkspace = async (id) => {
  return await axios.patch(`/workspace/member/${id}`);
};

export const AssignTask = async (taskId, userId, cookie) => {
  return await axios.patch(
    `/workspace/task/assign`,
    { taskId, userId },
    { headers: { authorization: `Bearer ${cookie}` } }
  );
};
