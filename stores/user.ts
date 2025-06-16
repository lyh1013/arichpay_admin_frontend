import UserService from '@/services/api/user';

import { MD5 } from 'crypto-es/lib/md5.js';

export const useUser = defineStore('user', () => {
  const tableData = ref();
  const exportData = ref();
  const companyOptions = ref();

  async function getUserStatusSetting() {
    const res = await UserService.getUserStatusSetting();

    const values: Record<string, any> = {};
    const uuidMap: Record<string, string> = {};

    for (const item of res.Data) {
      const { UUID, Code, DefaultValue } = item;

      values[Code] = DefaultValue ?? null;

      uuidMap[Code] = UUID;
    }

    return { values, uuidMap };
  }

  async function getTable() {
    const res = await UserService.getTable();

    tableData.value = res.Data.map((item: any) => ({
      ...item,
      CompanyCode: item.BelongDepartmentInfo[0]?.CompanyCode,
      Code: item.BelongDepartmentInfo[0]?.Code,
      IDCardNumber: item.UserStatusInfo[0]?.IDCardNumber,
    }));

    setExportData(tableData.value);

    return tableData.value;
  }

  async function get(id: string) {
    const { Data: res } = await UserService.get(id);

    const { company, department } = getUserCompanyAndDepartment(res.BelongDepartmentInfo);

    const roles = res.Roles.map((item: Record<string, string>) => {
      return item.UUID_Role;
    });

    const { values: otherInfo, uuidMap: otherInfoUUIDs } = getUserOtherInfo(res.UserStatusInfo);

    const newRes = {
      ...res,
      UUID_Roles: roles,
      Company: company,
      Department: department,
      ...otherInfo,
      otherInfoUUIDs,
    };

    return newRes;
  }

  function getUserCompanyAndDepartment(res: any) {
    const [company] = res.map((item: any) => {
      return item.UUID_Company;
    });

    const [department] = res.map((item: any) => {
      return item.UUID_Department;
    });

    return { company, department };
  }

  function getUserOtherInfo(settingList: any[] = []) {
    const values: Record<string, any> = {};
    const uuidMap: Record<string, string> = {};

    for (const item of settingList) {
      const entry = Object.entries(item).find(([key]) => key !== 'UUID');

      if (!entry) continue;

      const [key, value] = entry;

      values[key] = value;
      uuidMap[key] = item.UUID;
    }

    return { values, uuidMap };
  }

  async function getFilters(filterColumns: string[]) {
    if (!filterColumns.length) return;

    const filterData = {
      Active: [
        { label: '啟用', value: 'Y' },
        { label: '停用', value: 'N' },
      ],
    };

    return filterData;
  }

  async function getOptions() {
    const { getCachedOption, formatOptions } = useOptions();

    const { getTable: getRoleTable } = useRole();
    const { getTable: getCompanyTable } = useLocation();
    const { getTable: getDepartmentTable } = useDepartment();

    const [role, company, department] = await Promise.all([
      getRoleTable(),
      getCachedOption('company', getCompanyTable),
      getCachedOption('department', getDepartmentTable),
    ]);

    return {
      role: formatOptions(role),
      company: formatOptions(company),
      department: formatOptions(department, false, true),
    };
  }

  function buildOtherInfo(form: Record<string, any>, uuidMap: Record<string, string>) {
    return Object.entries(uuidMap).map(([field, uuid]) => ({
      UUID: uuid,
      Value: form[field] ?? null,
    }));
  }

  async function create(data: any) {
    const hashedPassword = MD5(data.Password).toString();

    const otherDefaultData = {
      Language: '60290329-0000-BF03-0001-000000000001',
      Gender: '60290329-0000-BF03-0002-000000000001',
      Type: '60290329-0000-BF03-0003-000000000003',
    };

    const { uuidMap } = await getUserStatusSetting();

    const UserStatus = buildOtherInfo(data, uuidMap);

    const newData = [
      {
        ...data,
        ...otherDefaultData,
        Password: hashedPassword,
        UserStatus,
      },
    ];

    const res = await UserService.create(newData);

    const [uuid] = res.Data;

    await Promise.all([
      createUserCompany(uuid, data.Company),
      createUserDepartment(uuid, data.Department),
    ]);
  }

  async function set(id: string, data: any) {
    const otherDefaultData = {
      Language: '60290329-0000-BF03-0001-000000000001',
      Gender: '60290329-0000-BF03-0002-000000000001',
      Type: '60290329-0000-BF03-0003-000000000003',
    };

    const { uuidMap } = await getUserStatusSetting();

    const UserStatus = buildOtherInfo(data, uuidMap);

    const newData = [
      {
        ...data,
        ...otherDefaultData,
        UserStatus,
        UUID: id,
      },
    ];

    const { companyData, departmentData, userRoleData } = await checkAndGetUUIDs(id);

    const { Password, UserID, Company, Department, Active, UUID_Roles } = data;

    await Promise.all([
      UserService.set(newData),
      Password ? setPassword(id, Password) : null,
      UserID ? setUserId(id, UserID) : null,
      actions(id, Active),
      setRole(id, userRoleData, UUID_Roles),
      setUserCompany(id, companyData, Company),
      setUserDepartment(id, departmentData, Department),
    ]);
  }

  async function createUserCompany(id: string, companyData: string) {
    if (!id) return;

    const data = [{ UUID_User: id, UUID_Company: companyData }];

    UserService.createUserCompany(data);
  }

  async function createUserDepartment(id: string, departmentData: string[]) {
    if (!id) return;

    const data = [{ UUID_User: id, UUID_Department: departmentData }];

    UserService.createUserDepartment(data);
  }

  async function setPassword(id: string, password: string) {
    await UserService.setPassword(id, { password });
  }

  async function setUserId(id: string, userID: string) {
    await UserService.setUserId(id, { UserID: userID });
  }

  async function setRole(id: string, existData: Record<string, string>[], newData: string[]) {
    return syncUserAssociation(
      id,
      existData,
      newData,
      'UUID_Role',
      UserService.createUserRole,
      UserService.removeUserRole,
    );
  }

  async function setUserCompany(id: string, existData: Record<string, string>[], newData: string) {
    return syncUserAssociation(
      id,
      existData,
      newData,
      'UUID_Company',
      UserService.createUserCompany,
      UserService.removeUserCompany,
    );
  }

  async function setUserDepartment(
    id: string,
    existData: Record<string, string>[],
    newData: string,
  ) {
    return syncUserAssociation(
      id,
      existData,
      newData,
      'UUID_Department',
      UserService.createUserDepartment,
      UserService.removeUserDepartment,
    );
  }

  async function checkAndGetUUIDs(userID: string) {
    const { getAllCompanyUser, getAllDepartmentUser, getAllUserRole } = UserService;

    const [companyRes, departmentRes, userRoleRes] = await Promise.all([
      getAllCompanyUser(),
      getAllDepartmentUser(),
      getAllUserRole(),
    ]);

    const companyData = companyRes.Data.filter((item: any) => item.UUID_User === userID);
    const departmentData = departmentRes.Data.filter((item: any) => item.UUID_User === userID);
    const userRoleData = userRoleRes.Data.filter((item: any) => item.UUID_User === userID);

    return {
      companyData,
      departmentData,
      userRoleData,
    };
  }

  async function syncUserAssociation(
    id: string,
    existData: Record<string, string>[],
    newData: string[] | string,
    fieldKey: string,
    createFn: (data: any[]) => Promise<void>,
    removeFn: (ids: string[]) => Promise<void>,
  ) {
    if (!id) return;

    const newArray = Array.isArray(newData) ? newData : [newData];

    const oldSet = new Set(existData.map(item => item[fieldKey]));
    const newSet = new Set(newArray);

    const toDelete = existData.filter(item => !newSet.has(item[fieldKey]));
    const toAdd = [...newSet].filter(item => !oldSet.has(item));

    if (toDelete.length) {
      await removeFn(toDelete.map(item => item.UUID));
    }

    if (toAdd.length) {
      await createFn(toAdd.map(val => ({ UUID_User: id, [fieldKey]: val })));
    }
  }

  async function remove(data: any) {
    return UserService.remove(data);
  }

  async function actions(uuid: string | string[], value: string) {
    const uuids = Array.isArray(uuid) ? uuid : [uuid];

    const data = uuids.map(id => ({ UUID: id, Active: value }));

    await UserService.setActive(data);
  }

  function setExportData(data: any) {
    const { dateFormat } = useFormat();

    exportData.value = data.map((item: any) => [
      item.UserName,
      item.UserID,
      item.IdNumber ?? '',
      item.CompanyName ?? '',
      item.DepartmentName ?? '',
      item.Email ?? '',
      dateFormat(item.UpdatedDate),
    ]);
  }

  return {
    exportData,
    companyOptions,

    getTable,
    get,
    getFilters,
    getOptions,
    create,
    set,
    setExportData,
    remove,
    actions,
  };
});
