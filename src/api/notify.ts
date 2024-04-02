import { request } from '@/utils/request';

export function getNotifies() {
  return request.get({
    url: '/admin/notifies',
  });
}

export function addNotify(data: any) {
  return request.post({
    url: '/admin/notifies',
    data,
  });
}

export function editNotify(data: any) {
  return request.put({
    url: '/admin/notifies',
    data,
  });
}

export function deleteNotify(id: any) {
  return request.delete({
    url: `/admin/notifies${id}`,
  });
}

export function editNofity(data: any) {
  return request.put({
    url: '/admin/notifies',
    data,
  });
}

export function getNofity(id: any) {
  return request.get({
    url: `/admin/notifies${id}`,
  });
}
