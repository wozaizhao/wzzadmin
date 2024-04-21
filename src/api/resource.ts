import { request } from '@/utils/request';

export function getResources() {
  return request.get({
    url: '/resources',
  });
}

export function addResource(data: any) {
  return request.post({
    url: '/admin/resources',
    data,
  });
}

export function editResource(data: any) {
  return request.put({
    url: '/admin/resources',
    data,
  });
}

export function deleteResource(id: any) {
  return request.delete({
    url: `/admin/resources/${id}`,
  });
}

export function toggleResourceStatus(data: any) {
  return request.post({
    url: `/admin/resources/toggleStatus`,
    data,
  });
}
