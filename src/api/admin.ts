import { MenuListResult } from '@/types/interface';
import { request } from '@/utils/request';

export function Login(data: any) {
  return request.post(
    {
      url: '/adminLogin',
      data,
    },
    {
      isTransformResponse: false,
    },
  );
}

export function AdminInfo() {
  return request.get({
    url: '/admin/current',
  });
}

export function getMenuList() {
  return request.get<MenuListResult>({
    url: '/admin/menuList',
  });
}

export function uploadByUrl(data: any) {
  return request.post({
    url: '/admin/uploadByUrl',
    data,
  });
}