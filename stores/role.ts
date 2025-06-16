import RoleService from '@/services/api/role';

import { navigation } from '@configs/menu/navigation';
import { actions } from '@configs/actions';

export const useRole = defineStore('role', () => {
  const exportData = ref();
  const permissionData = ref();

  const [isPermissionCreate, setPermissionCreate] = useCustomState(false);

  async function getTable() {
    const { Data: res } = await RoleService.getTable();

    setExportData(res);

    return res;
  }

  async function get(id: string) {
    const [res] = await Promise.all([RoleService.get(id), getRolePermission(id)]);

    const [value] = res.Data;

    return value;
  }

  async function getRolePermission(id: string) {
    const { Data: res } = await RoleService.getRolePermission(id);

    permissionData.value = res;

    return res;
  }

  function getRoleCheckList() {
    const { menu } = storeToRefs(useMenu());

    const result: any[] = [];
    const groupMap: Record<string, any> = {};
    const parentKeys = new Set<string>();

    const defaultPermissions = {
      Insert: 'N',
      Update: 'N',
      Delete: 'N',
      Import: 'N',
      Export: 'N',
      Approval: 'N',
      Audit: 'N',
      Review: 'N',
      Random: 'N',
    };

    permissionData.value?.length ? setPermissionCreate(false) : setPermissionCreate(true);

    const source = isPermissionCreate.value ? menu.value : permissionData.value;

    source.forEach((item: any) => {
      const menuId = isPermissionCreate.value
        ? item.MenuID
        : menu.value.find((menu: any) => menu.UUID === item.UUID_Menu)?.MenuID;

      const uuid = item.UUID;
      const menuUUID = item.UUID_Menu || item.UUID;

      const navMenu = navigation[menuId];

      if (!menuId || !navMenu) return;

      const parentKey = menuId.includes('-') ? menuId.split('-')[0] : null;

      if (parentKey && navigation[parentKey]) parentKeys.add(parentKey);

      const { Insert, Update, Delete, Import, Export, Approval, Others } = item;

      const permissions = isPermissionCreate.value
        ? { ...defaultPermissions }
        : {
            Insert,
            Update,
            Delete,
            Import,
            Export,
            Approval,
            Audit: Others?.Audit,
            Review: Others?.Review,
            Random: Others?.Random,
          };

      const selected = isPermissionCreate.value
        ? false
        : isMenuSelected(navMenu.title as string, permissions);

      if (parentKey && navigation[parentKey]) {
        if (!groupMap[parentKey]) {
          groupMap[parentKey] = {
            menuId: parentKey,
            label: navigation[parentKey].title,
            children: [],
          };

          result.push(groupMap[parentKey]);
        }

        groupMap[parentKey].children.push({
          uuid,
          menuId: menuUUID,
          label: navMenu.title,
          permissions,
          selected,
        });
      } else {
        if (parentKeys.has(menuId)) {
          if (!groupMap[menuId]) {
            groupMap[menuId] = {
              uuid,
              menuId: menuId,
              label: navMenu.title,
              children: [],
            };
            result.push(groupMap[menuId]);
          }
        } else {
          result.push({
            uuid,
            menuId: menuUUID,
            label: navMenu.title,
            permissions,
            selected,
          });
        }
      }
    });

    return result;
  }

  function showCheckbox(menu: any, actionValue: string): boolean {
    const maintenanceActions = ['Approval', 'Audit', 'Review', 'Random'];
    const importAllowedMenus = ['據點管理', '部門管理', '料件管理', '人員資料'];

    if (maintenanceActions.includes(actionValue)) {
      return menu.label === '檢驗單維護';
    }

    if (actionValue === 'Delete' && menu.label === '人員資料') {
      return false;
    }

    if (actionValue === 'Import' && !importAllowedMenus.includes(menu.label)) {
      return false;
    }

    return true;
  }

  function isMenuSelected(menuLabel: string, permissions: Record<string, string>): boolean {
    const activeActionKeys = actions
      .map(action => action.value)
      .filter(action => showCheckbox({ label: menuLabel }, action));

    return activeActionKeys.every(action => permissions[action] === 'Y');
  }

  async function createPermission(id: string, data: any) {
    const payload = data.flatMap((menu: any) => {
      const items = menu.children ?? [menu];

      return items.map((item: any) => {
        const { Insert, Update, Delete, Import, Export, Approval, Audit, Review, Random } =
          item?.permissions || {};

        return {
          UUID_Role: id,
          UUID_Menu: item.menuId,
          Active: 'Y',
          RoleMenuPermission: {
            Insert,
            Update,
            Delete,
            Import,
            Export,
            Approval,
            Others: {
              Audit,
              Review,
              Random,
            },
          },
        };
      });
    });

    return RoleService.createPermission(payload);
  }

  async function setPermission(data: any) {
    const { getLocalStorage } = useStorage();
    const { tokenRefresh } = useAuth();

    const refreshToken = getLocalStorage('refreshToken') || null;

    const payload = data.flatMap((menu: any) => {
      const items = menu.children ?? [menu];

      return items.map((item: any) => {
        const { Insert, Update, Delete, Import, Export, Approval, Audit, Review, Random } =
          item?.permissions || {};

        return {
          UUID: item.uuid,
          Insert,
          Update,
          Delete,
          Import,
          Export,
          Approval,
          Others: {
            Audit,
            Review,
            Random,
          },
        };
      });
    });

    await RoleService.setPermission(payload);

    tokenRefresh(refreshToken);
  }

  async function create(data: any) {
    const { Data: res } = await RoleService.create(data);

    const [value] = res;

    return value;
  }

  async function set(data: any) {
    const { Data: res } = await RoleService.set(data);

    const [value] = res;

    return value;
  }

  function setExportData(data: any) {
    const { dateFormat } = useFormat();

    exportData.value = data.map((item: any) => [
      item.Code,
      item.Name,
      item.Memo,
      dateFormat(item.UpdatedDate),
    ]);
  }

  async function remove(data: any) {
    return RoleService.remove(data);
  }

  return {
    exportData,
    permissionData,

    getTable,
    get,
    getRoleCheckList,
    showCheckbox,
    createPermission,
    setPermission,
    create,
    set,
    setExportData,
    remove,
  };
});
