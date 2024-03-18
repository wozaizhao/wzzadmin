import { request } from '@/utils/request';
import { MenuListResult } from '@/types/interface';

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
