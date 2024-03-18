import { request } from '@/utils/request';

export function addRole(data: any) {
  return request.post({
    url: '/admin/roles',
    data,
  });
}

export function getRoles(params: any) {
  return request.get({
    url: '/admin/roles',
    params,
  });
}

export function deleteRole(id: number) {
  return request.delete({
    url: `'/admin/roles'/${id}`,
  });
}

export function editRole(data: any) {
  return request.put({
    url: '/admin/roles',
    data,
  });
}

export function getAllRoles() {
  return request.get({
    url: '/admin/allRoles',
  });
}

export function addAdmin(data: any) {
  return request.post({
    url: '/admin/admins',
    data,
  });
}

export function getAdmins(params: any) {
  return request.get({
    url: '/admin/admins',
    params,
  });
}

export function exportAdmins(data: any) {
  return request.post(
    {
      url: `/admin/admins/export`,
      responseType: 'blob',
      data,
    },
    {
      isTransformResponse: false,
      isReturnNativeResponse: true,
    },
  );
}

export function deleteAdmin(id: number) {
  return request.delete({
    url: `'/admin/admins'/${id}`,
  });
}

export function editAdmin(data: any) {
  return request.put({
    url: '/admin/admins',
    data,
  });
}

export function addMenu(data: any) {
  return request.post({
    url: '/admin/menus',
    data,
  });
}

export function editMenu(data: any) {
  return request.put({
    url: '/admin/menus',
    data,
  });
}

export function getAllMenus() {
  return request.get({
    url: '/admin/menus',
  });
}

export function deleteMenu(id: number) {
  return request.delete({
    url: `/admin/menus/${id}`,
  });
}

export function getMenu(id: number) {
  return request.get({
    url: `/admin/menus/${id}`,
  });
}

export function getRoleMenus(id: number) {
  return request.get({
    url: `/admin/roles/${id}/menus`,
  });
}

export function toggleAdminStatus(data: any) {
  return request.post({
    url: `/admin/admins/toggleStatus`,
    data,
  });
}

export function getDicts(params: any) {
  return request.get({
    url: '/common/dicts',
    params,
  });
}
