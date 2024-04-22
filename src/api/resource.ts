import { request } from '@/utils/request';

export function getResources(params: any) {
  return request.get({
    url: '/admin/resources',
    params
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

export function toggleResourceVisible(data: any) {
  return request.post({
    url: `/admin/resources/setVisible`,
    data,
  });
}
