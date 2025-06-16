import AuthService from '@/services/api/auth';

import { MD5 } from 'crypto-es/lib/md5.js';
import { jwtDecode } from 'jwt-decode';

import { actions } from '@configs/actions';

interface User {
  id: string;
  account: string;
  permissions: Record<string, any>[];
}

export const useAuth = defineStore('authentication', () => {
  const router = useRouter();

  const user = ref<User>({ id: '', account: '', permissions: [] });
  const loginToken = ref();
  const userPermissions = ref<{ action: string; subject: string }[]>([]);

  async function login(data: { account: string; password: string }) {
    const rst = MD5(data.password).toString();

    const newData = {
      account: data.account,
      password: rst,
    };

    // const { Data: res } = await AuthService.login(newData);

    // loginToken.value = res.Token;

    router.push('/');
  }

  async function authorization(defaultEntry: any, otherEntry?: Record<string, string>) {
    const targetEntry = otherEntry ?? defaultEntry.find((entry: any) => entry.Code === 'QCstage');

    const { Data: res } = await AuthService.authorization(
      { UUID_Entry: targetEntry.UUID },
      loginToken.value,
    );

    const { AccessToken, RefreshToken } = res;

    setTokens(AccessToken, RefreshToken);

    router.push('/');
  }

  async function checkTokenAndRefresh(): Promise<void> {
    const { getLocalStorage } = useStorage();

    const accessToken = getLocalStorage('accessToken') || null;
    const refreshToken = getLocalStorage('refreshToken') || null;
    const customExpireAt = Number(getLocalStorage('accessTokenCustomExpire')) || 0;

    if (!accessToken) return;

    const now = Math.floor(Date.now() / 1000);

    const timeLeft = customExpireAt - now;

    if (timeLeft > 60) return;

    tokenRefresh(refreshToken);
  }

  async function tokenRefresh(token: string | null) {
    try {
      const { Data: res } = await AuthService.refresh(token);

      if (!res) return;

      const { AccessToken, RefreshToken } = res;

      setTokens(AccessToken, RefreshToken);
    } catch (error) {
      if (!error) return;

      const { notify } = useNotify();

      notify('登入閒置逾期，請重新登入', 'error');

      clearAuth();
    }
  }

  function setTokens(access: string, refresh: string) {
    const { setLocalStorage } = useStorage();

    setLocalStorage('accessToken', access);
    setLocalStorage('refreshToken', refresh);

    const now = Math.floor(Date.now() / 1000);
    const customExpireAt = now + 60 * 3; // temp

    setLocalStorage('accessTokenCustomExpire', customExpireAt);
  }

  function setUser(token: any) {
    const decodedToken: {
      UUID_User: string;
      UserID: string;
      UUID_Entry: string;
      Permissions: string;
    } = jwtDecode(token);

    const { UUID_User, UserID, UUID_Entry, Permissions } = decodedToken;

    user.value.id = UUID_User;
    user.value.account = UserID;
    user.value.entry = UUID_Entry;
    user.value.permissions = JSON.parse(Permissions);
  }

  async function getPermission() {
    userPermissions.value = [];

    const { getSideMenu } = useMenu();
    const { menu } = storeToRefs(useMenu());

    await getSideMenu();

    user.value.permissions.forEach((item: Record<string, string>) => {
      const matched = menu.value.find((menu: Record<string, string>) => menu.UUID === item.UUID);

      if (!matched) return;

      const menuId = matched.MenuID;

      const mergedPerms = [
        ...item.Perms,
        ...Object.entries(item.Others)
          .filter(([, value]) => value === 'Y')
          .map(([key]) => key),
      ];

      actions.forEach(({ value, sortValue }) => {
        if (mergedPerms.includes(sortValue))
          userPermissions.value.push({
            action: value.toLowerCase(),
            subject: menuId,
          });
      });
    });
  }

  function logout() {
    const { notify } = useNotify();

    notify('您已經登出', 'success');

    clearAuth();
  }

  function clearAuth() {
    user.value = { id: '', account: '', permissions: [] };

    const { removeLocalStorage } = useStorage();

    removeLocalStorage('accessToken');
    removeLocalStorage('refreshToken');
    removeLocalStorage('accessTokenCustomExpire');

    router.push('/auth/login');
  }

  return {
    user,
    userPermissions,

    login,
    logout,
    authorization,
    tokenRefresh,
    setUser,
    getPermission,
    checkTokenAndRefresh,
    clearAuth,
  };
});
