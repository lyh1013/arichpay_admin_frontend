<script setup lang="ts">
import { userFields as updateFields } from '@/utils/form/update-fields';

const { id, show, isAdd, setLoading, setSpinner, setTitle, setModal } = inject(
  useModalKey,
) as ModalProps;

setTitle('人員資料');

const { get, getTable, getOptions, create, set, actions } = useUser();

const validationSchema = computed(() => ({
  UUID_Roles: 'required',
  UserName: 'required',
  UserID: 'required',
  IDCardNumber: 'required',
  Password: isAdd.value ? 'required' : '',
  Email: 'email',
  Company: 'required',
  Department: 'required',
  ConfirmPassword: 'confirmed:@Password',
}));

const { handleSubmit, resetForm, setFieldValue, values } = useForm({
  validationSchema,
});

const options = ref<{ role: OptionItem[]; company: OptionItem[]; department: OptionItem[] }>({
  role: [],
  company: [],
  department: [],
});
const filterDepartmentOption = ref();

watch([show, id], async ([isShow, id]) => {
  if (!isShow) return;

  setLoading(true);

  options.value = await getOptions();

  if (!id) {
    setLoading(false);

    return;
  }

  const [res, optionsRes] = await Promise.all([get(id), getOptions()]);

  options.value = optionsRes;

  const { formUpdate } = useFormUpdate(updateFields, setFieldValue);

  formUpdate(res);
  setLoading(false);
});

watch(
  () => values.Company,
  (newUUID, oldUUID) => {
    if (!newUUID) return;

    if (oldUUID) setFieldValue('Department', '');

    const companies = options.value.company.filter(company => newUUID.includes(company.value));

    filterDepartmentOption.value = options.value.department.filter(item =>
      companies.some(company => company.label === item.company),
    );
  },
);

const onSubmit = handleSubmit(async values => {
  setSpinner(true);

  isAdd.value ? await create(values) : await set(id.value as string, values);

  getTable();
  setSpinner(false);
  setModal(false);
});
</script>

<template>
  <Modal width="600px" @hide="resetForm">
    <template #content>
      <q-form id="create-edit-form" @submit="onSubmit">
        <div class="row">
          <div class="col-12 q-px-sm">
            <Select label="角色權限" name="UUID_Roles" :options="options.role" use-chips multiple />
          </div>

          <div class="col-12 col-sm-6 q-px-sm">
            <TextField label="使用者名稱" name="UserName" />
          </div>

          <div class="col-12 col-sm-6 q-px-sm">
            <TextField label="使用者編號" name="UserID" />
          </div>

          <div class="col-12 col-sm-6 q-px-sm">
            <TextField label="識別證卡號" name="IDCardNumber" />
          </div>

          <div class="col-12 col-sm-6 q-px-sm">
            <TextField label="E-mail" name="Email" />
          </div>

          <!-- <div class="col-12 col-sm-6 q-px-sm">
            <TextField label="代理人編號" name="substitute" />
          </div>

          <div class="col-12 col-sm-6 q-px-sm">
            <TextField label="派發代理人簽核日期區間" name="dateRange" :datepicker="true" />
          </div> -->

          <div class="col-12 col-sm-6 q-px-sm">
            <Select label="歸屬營運據點" name="Company" :options="options.company" />
          </div>

          <div class="col-12 col-sm-6 q-px-sm">
            <Select label="歸屬部門" name="Department" :options="filterDepartmentOption" />
          </div>

          <div class="col-12 col-sm-6 q-px-sm">
            <TextField type="password" label="密碼" name="Password" />
          </div>

          <div class="col-12 col-sm-6 q-px-sm">
            <TextField type="password" label="密碼確認" name="ConfirmPassword" />
          </div>

          <div class="col-12 col-sm-6 q-px-sm flex items-center">
            <Toggle label="狀態" name="Active" />
          </div>
        </div>
      </q-form>
    </template>
  </Modal>
</template>
